import { NodeProps } from "@xyflow/react";
import WorkflowNode from "../../workflow-node";
import { MousePointer2Icon } from "lucide-react";
import AgentNodeSetting from "./setting";

const AgentNode = (props: NodeProps) => {
  const { id, data, selected } = props;
  const bgColor = data?.color as string;
  const label = (data?.label as string) || "Agent";

  return (
    <>
      <WorkflowNode
        nodeId={id}
        label={label}
        subText="Agent"
        icon={MousePointer2Icon}
        selected={selected}
        handles={{ target: true, source: true }}
        color={bgColor}
        settingTitle={`${label} Settings`}
        settingDescription="Call the model with your instructions and tools"
        settingComponent={<AgentNodeSetting id={id} data={data} />}
      />
    </>
  );
};

export default AgentNode;
