import type { ExprCode } from "./expr";

export type OpType = "unary" | "binary" | "scalar" | "reduction";

export type OpSpec = {
    name: string;
    nnName?: string;
    torchName?: string;
    nnOp?: boolean;
    aliases?: string[];
    alpha?: boolean;
    type: OpType;
    precision?: number;
    forward: ExprCode;
    backward?: ExprCode;
}

export type UnaryOpSpec = OpSpec & {
    type: "unary";
}

export type BinaryOpSpec = OpSpec & {
    type: "binary";
}

export type ScalarOpSpec = OpSpec & {
    type: "scalar";
    num_args?: number;
}

export type ReductionOpSpec = OpSpec & {
    type: "reduction";
    init: ExprCode;
    combineOp: "+" | "*" | "&&" | "||";
    reduce?: ExprCode;
}

export type AnOpSpec = UnaryOpSpec | BinaryOpSpec | ScalarOpSpec | ReductionOpSpec;
