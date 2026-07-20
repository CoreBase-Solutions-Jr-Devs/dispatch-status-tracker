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

  const { data, error, isLoading } = useGetStatusTrackerQuery(token);
  
const tracker = data; 

console.log("Tracker in StatusProgressPage:", tracker); 

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">Loading tracking details...</span>
      </div>
    );

// if (error) {
//   console.log("RTK Query Error:", error);

//   const apiMessage =
//     error?.data?.message || "Unable to fetch tracking details.";

//   toast.error(apiMessage);

//   return (
//     <div className="text-center text-red-600 mt-10">
//       {apiMessage}
//     </div>
//   );
// }

//   if (!tracker && !isLoading && !error) {
//     return (
//       <div className="text-center text-gray-500 mt-10">
//         No tracking data found for document number .
//       </div>
//     );
//   }


  let apiMessage =
    error?.data?.message || "Something went wrong. Please try again.";

    if (error) {
  console.log("RTK Query Error:", error);
  
  switch (error.status) {
    case 400:
      toast.error(apiMessage);
      break;

    case 401:
      toast.error(apiMessage);
      // Optional: navigate("/login");
      break;

    case 403:
      toast.error(apiMessage);
      break;

    case 404:
      toast.error(apiMessage);
      break;

    case 500:
      toast.error(apiMessage);
      break;

    case "FETCH_ERROR":
      apiMessage = "Please check your internet connection.";
      toast.error(apiMessage);
      break;

    case "PARSING_ERROR":
      apiMessage = "The server returned an invalid response.";
      toast.error(apiMessage);
      break;

    case "TIMEOUT_ERROR":
      apiMessage = "The request timed out. Please try again.";
      toast.error(apiMessage);
      break;

    default:
      toast.error(apiMessage);
      break;
  }

}

return (
 <div className="max-w-md mx-auto py-2">
  <div className="flex-1">
    {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-gray-600">
          Loading tracking details...
        </span>
      </div>
    ) : error ? (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <img
          src="src/assets/image/No tracking Found.png" 
          alt="Tracking Error"
          className="w-56 h-auto mb-6"
        />

        <h3 className=" font-semibold text-gray-900 mb-2">
          Tracking Unavailable
        </h3>

        <p className="text-destructive text-sm">
          {apiMessage}
        </p>
      </div>
    ) : !tracker ? (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <img
          src="src/assets/image/No tracking Found.png" 
          alt="No Tracking Data"
          className="w-56 h-auto mb-6"
        />

        <h3 className=" font-semibold text-gray-900 mb-2">
          No Tracking Information
        </h3>
        <p className="text-destructive text-sm"> 
  We couldn't find any tracking information for this shipment.
        </p>
      </div>
    ) : (
      <>
        <StatusTimeline stages={tracker.stages} />
        <StatusDetails tracker={tracker} />
        <StatusMessage
          message={tracker.message}
          currentStage={tracker.currentStage}
        />
      </>
    )}
  </div>

  <StatusActions
    showDriver={!error && tracker?.driver}
    driver={tracker?.driver?.name}
  />
</div>
);
}
