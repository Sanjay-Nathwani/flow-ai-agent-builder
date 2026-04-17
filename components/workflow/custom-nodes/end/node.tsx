import { NodeProps } from "@xyflow/react";
import WorkflowNode from "../../workflow-node";
import { SquareIcon } from "lucide-react";
import EndNodeSetting from "./setting";

const EndNode = ({ data, id, selected }: NodeProps) => {
  const bgColor = data.color as string;

  return (
    <>
      <WorkflowNode
        nodeId={id}
        label="End"
        subText=""
        className="min-w-fit!"
        isDeletable={true}
        icon={SquareIcon}
        selected={selected}
        handles={{ target: true, source: false }}
        color={bgColor}
        settingTitle="End Node Settings"
        settingDescription="Choose the workflow output"
        settingComponent={<EndNodeSetting id={id} data={data} />}
      />
    </>
  );
};

export default EndNode;
