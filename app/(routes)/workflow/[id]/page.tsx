"use client";

import { useGetWorkflowById } from "@/features/use-workflow";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Header from "./_common/header";
import { WorkflowProvider } from "@/context/workflow-context";
import WorkflowCanvas from "./_common/workflow-canvas";
import { ReactFlowProvider } from "@xyflow/react";

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data: workflow, isPending } = useGetWorkflowById(id);

  const nodes = workflow?.flowObject?.nodes || [];
  const edges = workflow?.flowObject?.edges || [];

  if (!workflow && !isPending) {
    return <div>Workflow not found!F</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen relative">
        <ReactFlowProvider>
          <WorkflowProvider
            key={workflow?.id}
            initialNodes={nodes}
            initialEdges={edges}
          >
            <Header
              isLoading={isPending}
              name={workflow?.name}
              workflowId={workflow?.id}
            />
            <div className="flex-1 relative overflow-hidden">
              {isPending ? (
                <div className="flex items-center justify-center h-full">
                  <Spinner className="size-12 text-primary" />
                </div>
              ) : (
                <WorkflowCanvas workflowId={workflow.id} />
              )}
            </div>
          </WorkflowProvider>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Page;
