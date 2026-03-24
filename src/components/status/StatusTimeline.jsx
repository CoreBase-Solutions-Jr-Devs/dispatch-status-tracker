import React from "react";
import ProcessStage from "../../features/status-progress/ProcessStage";

export default function StatusTimeline({ stages = [] }) {
  const stageOrder = ["Store", "Verification", "Dispatch", "Delivery"];
  const sortedStages = [...stages].sort(
    (a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)
  );

  return (
    <div className="flex flex-row mx-auto justify-between items-center">
      {sortedStages.length > 0 ? (
        sortedStages.map((stage, index) => (
          <ProcessStage key={index} stage={stage} />
        ))
      ) : (
        <p className="text-xs text-gray-500">No stage data available</p>
      )}
    </div>
  );
}