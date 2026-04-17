import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { CopyIcon, FileTextIcon } from "lucide-react";
import { toast } from "sonner";

const StartNodeSetting = ({ nodeId }: { nodeId: string }) => {
  const inputVariable = `${nodeId}-input`;

  const onCopy = () => {
    navigator.clipboard.writeText(`{{${inputVariable}}`);
    toast.success("Variable copied to the clipboard");
  };

  return (
    <div className="space-y-2">
      <h5 className="font-medium">Input variable</h5>
      <InputGroup className="border!">
        <InputGroupAddon align="inline-start">
          <FileTextIcon className="size-4 text-primary" />
        </InputGroupAddon>
        <code className="flex-1 font-mono bg-background px-2 py-1 text-sm">{`{{${inputVariable}}`}</code>
        <InputGroupButton
          variant="ghost"
          size="icon-sm"
          className="h-6"
          onClick={onCopy}
        >
          <CopyIcon className="size-4 text-muted-foreground" />
        </InputGroupButton>
      </InputGroup>
    </div>
  );
};

export default StartNodeSetting;
