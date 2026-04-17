/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileIcon,
  GitBranchIcon,
  GlobeIcon,
  MousePointer2Icon,
  PlayIcon,
  SquareIcon,
} from "lucide-react";
import React from "react";
import { generateId } from "../helper";
import { MODELS } from "./constants";
import { executeStartNode } from "./custom-executors/startnode-executor";
import { executeAgentNode } from "./custom-executors/agentnode-executor";
import { executeIfElseNode } from "./custom-executors/ifelsenode-executor";
import { executeEndNode } from "./custom-executors/endnode-executor";

export const NodeTypeEnum = {
  START: "start",
  AGENT: "agent",
  IF_ELSE: "if_else",
  END: "end",
  HTTP: "http",
  COMMENT: "comment",
} as const;

export type NodeType = (typeof NodeTypeEnum)[keyof typeof NodeTypeEnum];

// Node executors
export const NODE_EXECUTORS = {
  [NodeTypeEnum.START]: executeStartNode,
  [NodeTypeEnum.AGENT]: executeAgentNode,
  [NodeTypeEnum.IF_ELSE]: executeIfElseNode,
  [NodeTypeEnum.END]: executeEndNode,
};

type NodeConfigBase = {
  type: NodeType;
  label: string;
  icon: React.ElementType;
  color: string;

  inputs: Record<string, any>;
  outputs: string[];
};

export const NODE_CONFIG: Record<NodeType, NodeConfigBase> = {
  [NodeTypeEnum.START]: {
    type: NodeTypeEnum.START,
    label: "Start",
    icon: PlayIcon,
    color: "bg-emerald-500",
    inputs: {
      inputValue: "",
    },
    outputs: ["input"],
  },
  [NodeTypeEnum.AGENT]: {
    type: NodeTypeEnum.AGENT,
    label: "Agent",
    icon: MousePointer2Icon,
    color: "bg-blue-500",
    inputs: {
      label: "Agent",
      instructions: "",
      model: MODELS[0].value,
      tools: [],
      outputFormat: "text", // text or json
      responseSchema: null,
    },
    outputs: ["output.text"],
  },
  [NodeTypeEnum.IF_ELSE]: {
    type: NodeTypeEnum.IF_ELSE,
    label: "If/Else",
    icon: GitBranchIcon,
    color: "bg-orange-500",
    inputs: {
      conditions: [
        {
          caseName: "",
          variable: "",
          operator: "",
          value: "",
        },
      ],
    },
    outputs: ["output.result"],
  },
  [NodeTypeEnum.HTTP]: {
    type: NodeTypeEnum.HTTP,
    label: "HTTP",
    icon: GlobeIcon,
    color: "bg-blue-400",
    inputs: {
      method: "GET",
      url: "",
      headers: {},
      body: {},
    },
    outputs: ["output.body"],
  },
  [NodeTypeEnum.END]: {
    type: NodeTypeEnum.END,
    label: "End",
    icon: SquareIcon,
    color: "bg-red-400",
    inputs: {
      value: "",
    },
    outputs: ["output.text"],
  },
  [NodeTypeEnum.COMMENT]: {
    type: NodeTypeEnum.COMMENT,
    label: "Note",
    icon: FileIcon,
    color: "bg-gray-500",
    inputs: {
      comment: "",
    },
    outputs: [],
  },
};

export const getNodeConfig = (type: NodeType) => {
  const nodeType = NODE_CONFIG?.[type];
  if (!nodeType) return null;
  return nodeType;
};

export const getNodeExecutor = (type: NodeType) => {
  const executor = NODE_EXECUTORS?.[type as keyof typeof NODE_EXECUTORS];

  if (!executor) {
    throw new Error(`No executor found for node type ${type}`);
  }

  return executor;
};

export type CreateNodeOptions = {
  type: NodeType;
  position?: { x: number; y: number };
};

export function createNode({
  type,
  position = { x: 400, y: 200 },
}: CreateNodeOptions) {
  const config = getNodeConfig(type);

  if (!config) {
    throw new Error(`No node config found for node-type ${type}`);
  }

  const id = generateId(type);

  return {
    id,
    type,
    position,
    deletable: type === NodeTypeEnum.START ? false : true,
    data: {
      label: config.label,
      color: config.color,
      outputs: config.outputs,
      ...config.inputs,
    },
  };
}
