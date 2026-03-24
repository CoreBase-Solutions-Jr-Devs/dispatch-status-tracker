import React from "react";
import { PartyPopper } from "lucide-react";

export default function StatusMessage({ message, currentStage }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
  <div className="flex items-center space-x-2">
    <h3 className="text-base font-medium">
      Currently at : {currentStage || "Status Update"}
    </h3>
    <PartyPopper className="w-7 h-7 text-primary" />
  </div>

  <p className="text-gray-700 text-sm max-w-md">
    {message ||
      "Your order is currently being processed. Please check back later for updates."}
  </p>
</div>
  );
}
