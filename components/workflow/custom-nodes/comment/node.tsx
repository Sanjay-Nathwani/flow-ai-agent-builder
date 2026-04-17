// import { Textarea } from "@/components/ui/textarea";
// import { cn } from "@/lib/utils";
// import { NodeProps, useReactFlow } from "@xyflow/react";
// import { useState } from "react";

// const CommentNode = ({ data, id }: NodeProps) => {
//   const { updateNodeData } = useReactFlow();
//   const comment_str = data?.comment as string;

//   const [comment, setComment] = useState(comment_str);

//   const handleCommentChange = (value: string) => {
//     updateNodeData(id, { comment: value });
//   };

//   return (
//     <div
//       className={cn(
//         "w-38.75 min-h-25 max-h-37.5 box-border p-1 border rounded-lg bg-amber-300 dark:bg-[#b08915]",
//       )}
//     >
//       <Textarea
//         value={comment || ""}
//         onChange={(e) => setComment(e.target.value)}
//         onBlur={() => handleCommentChange(comment)}
//         placeholder="Write a comment..."
//         className="size-full px-1! resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xs! shadow-none overflow-auto max-h-37.5 min-h-20 dark:text-black"
//       />
//     </div>
//   );
// };

// export default CommentNode;

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CommentNode = ({ data, id, selected }: NodeProps) => {
  const { updateNodeData, deleteElements } = useReactFlow();
  const comment_str = data?.comment as string;

  const [comment, setComment] = useState(comment_str);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleCommentChange = (value: string) => {
    updateNodeData(id, { comment: value });
  };

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div
      className={cn(
        "w-38.75 min-h-25 max-h-37.5 box-border p-1 border rounded-lg bg-amber-300 dark:bg-[#b08915] relative group",
        selected && "ring-2 ring-primary",
      )}
    >
      {/* Delete button - appears on hover or when selected */}
      <div
        className={cn(
          "absolute -top-2 -right-2 opacity-0 transition-opacity",
          (selected || showDeleteConfirm) && "opacity-100",
        )}
      >
        <Popover open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <PopoverTrigger asChild>
            <Button
              size="icon-xs"
              variant="destructive"
              className="size-6 rounded-full shadow-md cursor-pointer"
            >
              <Trash2Icon className="size-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-3" align="center" side="right">
            <div className="space-y-2">
              <p className="text-sm font-medium">Delete comment?</p>
              <p className="text-xs text-muted-foreground">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="h-7 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                  className="h-7 text-xs"
                >
                  Delete
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Textarea
        value={comment || ""}
        onChange={(e) => setComment(e.target.value)}
        onBlur={() => handleCommentChange(comment)}
        placeholder="Write a comment..."
        className="size-full px-1! resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xs! shadow-none overflow-auto max-h-37.5 min-h-20 dark:text-black"
      />
    </div>
  );
};

export default CommentNode;
