/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { UIMessage, useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  ArrowUpIcon,
  CheckIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Loader, TextShimmerLoader } from "@/components/ui/loader";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { createWorkflowTransport } from "@/lib/workflow/transport";
import { getNodeConfig, NodeType } from "@/lib/workflow/node-config";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type NodeDisplayType = {
  id: string;
  nodeType: NodeType;
  nodeName: string;
  status: "loading" | "complete" | "error";
  type: "text-delta" | "tool-call" | "tool-result";
  toolCall?: { name: string };
  toolResult?: { toolCallId: string; name: string; result: any };
  output?: any;
  error?: any;
};

const ChatPanel = ({ workflowId }: { workflowId: string }) => {
  const [input, setInput] = useState<string>("");
  const [chatId, setChatId] = useState<string | null>(() =>
    crypto.randomUUID(),
  );

  const { messages, sendMessage, status } = useChat<UIMessage>({
    id: chatId ?? undefined,
    messages: [],
    transport: createWorkflowTransport({ workflowId }),
  });

  const isLoading =
    status === "submitted" ||
    (status === "streaming" &&
      !Boolean(
        messages[messages.length - 1]?.parts.some(
          (part) => part.type === "text" && Boolean(part.text),
        ),
      ));

  const handleSubmit = (message: PromptInputMessage) => {
    "";
    if (!message.text.trim()) return;

    sendMessage({ text: message.text });
    setInput("");
  };

  return (
    <div className="flex flex-col bg-background h-full overflow-hidden">
      {/* Chat Header */}
      <div className="bg-linear-to-br from-primary via-primary/90 to-primary/80 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between text-white">
          <h5 className="text-lg font-bold">Workflow Preview</h5>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChatId(crypto.randomUUID())}
          >
            New Chat <PlusIcon size={14} />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col flex-1 overflow-hidden">
        {messages.length > 0 ? (
          <Conversation className="flex-1">
            <ConversationContent className="pt-10 px-4">
              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent className="text-[14.5px]">
                    {message.parts.map((part, index) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <MessageResponse key={`${message.id}-${index}`}>
                              {part.text}
                            </MessageResponse>
                          );
                        case "data-workflow-node":
                          const data = part.data as NodeDisplayType;
                          return (
                            <NodeDisplay
                              key={`${message.id}-workflow-${index}`}
                              data={data}
                            />
                          );
                        default:
                          return null;
                      }
                    })}
                  </MessageContent>
                </Message>
              ))}
              {isLoading ? (
                <div className="px-2">
                  <Loader variant="dots" size="md" />
                </div>
              ) : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Empty className="border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SparklesIcon size={20} className="text-primary" />
                </EmptyMedia>
                <EmptyTitle>Preview your workflow</EmptyTitle>
                <EmptyDescription>
                  Write a prompt as if you&apos;re the user to test your
                  workflow.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
        <div className="p-4 bg-background border-t">
          <PromptInput
            className="rounded-xl shadow-sm border"
            onSubmit={handleSubmit}
          >
            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                placeholder="Send a message..."
                className="pt-3"
                onChange={(e) => setInput(e.target.value)}
              />
            </PromptInputBody>
            <PromptInputFooter className="flex justify-end p-2 pt-0">
              <PromptInputSubmit
                disabled={!input.trim() || isLoading}
                className="size-9! p-0! rounde-xl! bg-primary! text-primary-foreground!"
              >
                <ArrowUpIcon size={18} />
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export const NodeDisplay = ({ data }: { data: NodeDisplayType }) => {
  const nodeConfig = getNodeConfig(data.nodeType);
  if (!nodeConfig) return null;

  const Icon = nodeConfig.icon;
  const { status, output, error, toolCall, toolResult } = data;

  return (
    <div>
      <div
        className={cn(
          "px-1 py-2 flex items-center gap-2",
          status === "loading" && "animate-pulse",
        )}
      >
        {status === "loading" ? (
          <Spinner />
        ) : status === "error" ? (
          <AlertCircleIcon className="text-destructive size-4" />
        ) : (
          <Icon className="size-4" />
        )}
        <span className="text-sm font-medium">{data.nodeName}</span>
      </div>

      <div>
        {toolCall || toolResult ? (
          <div className="mx-3 my-2 p-3 bg-muted/50 rounded-lg border flex items-center gap-2">
            {toolResult ? (
              <>
                <CheckIcon className="size-4 text-green-500" />
                <span className="text-sm">{toolResult.name}</span>
              </>
            ) : (
              <TextShimmerLoader text={`Calling ${toolCall?.name} ...`} />
            )}
          </div>
        ) : null}
        {output && (
          <div className="px-3 py-2">
            <MessageResponse>
              {typeof output === "string"
                ? output
                : JSON.stringify(output, null, 2)}
            </MessageResponse>
          </div>
        )}

        {status === "error" && (
          <div className="p-3 bg-destructive text-destructive rounded-md">
            {JSON.stringify({ error })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
