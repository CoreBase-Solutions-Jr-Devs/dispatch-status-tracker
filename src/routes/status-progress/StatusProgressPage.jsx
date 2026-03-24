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

  const token = searchParams.get("token");

  console.log("Token:", token);

  const { data, error, isLoading } = useGetStatusTrackerQuery(token, {
    skip: !token,
  });
  
const tracker = data; 

console.log("Tracker in StatusProgressPage:", tracker); 

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

  if (!tracker && !isLoading && !error) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No tracking data found for document number .
      </div>
    );
  }



  return (
    <div className="max-w-md sm:max-w-sm mx-auto py-2 space-y-4">
      <StatusTimeline stages={tracker?.stages || []} />
      <StatusDetails tracker={tracker} />
      <StatusMessage
        message={tracker?.message}
        currentStage={tracker?.currentStage}
      />
      <StatusActions   driver={tracker?.driver.name}/>
    </div>
  );
}
