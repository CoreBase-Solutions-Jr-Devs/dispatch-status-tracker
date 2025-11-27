import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetStatusTrackerQuery } from "@/features/status/statusprogressAPI";
import StatusTimeline from "../../components/status/StatusTimeline";
import StatusDetails from "../../components/status/StatusDetails";
import StatusMessage from "../../components/status/StatusMessage";
import StatusActions from "../../components/status/StatusActions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function StatusProgressPage() {
  const [searchParams] = useSearchParams();
  const docNo = searchParams.get('docNo');
  const token = searchParams.get('token');

  const { data, error, isLoading } = useGetStatusTrackerQuery(token, {
    skip: !docNo && !token,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading tracking details...</span>
      </div>
    );

  if (error) {
    toast.error("Unable to fetch tracking details.");
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load tracking information.
      </div>
    );
  }

  if (!docNo) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No document number provided.
      </div>
    );
  }

  if (!tracker && !isLoading && !error) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tracking data found for document number <b>{docNo}</b>.
      </div>
    );
  }

  const tracker = data?.value;

  return (
    <div className="max-w-md sm:max-w-sm mx-auto py-4 space-y-6">
      <StatusTimeline stages={tracker?.stages || []} />
      <StatusDetails tracker={tracker} />
      <StatusMessage
        message={tracker?.message}
        currentStage={tracker?.currentStage}
      />
      <StatusActions />
    </div>
  );
}
