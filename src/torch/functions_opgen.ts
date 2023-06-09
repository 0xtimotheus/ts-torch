import {
    AutoFunction,
    FunctionInput,
    GradientContext,
    GradientFunctionOutput,
} from "./autograd";
import { Tensor } from "./tensor";
import { shapeSize } from "./shape";

// ------------------------------------
// Start Custom
// ------------------------------------
export class DoubleFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("double", {"dtype":"float32"}, params, [input.shape])[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("floorGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class GeluFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("gelu", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("reluGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}

export class ScalarMulFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("smul", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class ScalarDivFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sdiv", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class ScalarAddFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sadd", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class ScalarSubFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("ssub", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class MinFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("min", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class MaxFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, alpha] = inputs as [Tensor, number];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("max", {"dtype":"float32"}, params, [input.shape], new Tensor([alpha]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class ClampFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, low, high] = inputs as [Tensor, number, number];
        const params = {
            size: shapeSize(input.shape),
            low: low,
            high: high
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("clamp", {"dtype":"float32"}, params, [input.shape], new Tensor([low, high]))[0];
    }
    // DOES NOT WORK
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    // DOES NOT WORK
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        console.warn("‼️ THIS HAS NOT BEEN IMPLEMENTED");
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
// ------------------------------------
// End Custom
// ------------------------------------

export class AbsFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("abs", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("absGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class AcosFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("acos", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("acosGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class AcoshFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("acosh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("acoshGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class AddFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha || 1.0,
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("add", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("addGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class AsinFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("asin", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("asinGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class AsinhFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("asinh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("asinhGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class AtanFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("atan", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("atanGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Atan2Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("atan2", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("atan2Grad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class CeilFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("ceil", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("ceilGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class CopysignFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("copysign", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("copysignGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class CosFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("cos", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("cosGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class CoshFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("cosh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("coshGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class CumprodFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("cosh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("cumprodGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Deg2radFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("deg2rad", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("deg2radGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class DivFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha || 1.0,
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("div", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("divGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class ExpFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("exp", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("expGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Exp2Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("exp2", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("exp2Grad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Expm1Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("expm1", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("expm1Grad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class FloorFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("floor", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("floorGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class FracFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("frac", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("fracGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class HypotFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("hypot", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("hypotGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class LdexpFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("ldexp", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("ldexpGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class LogFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("log", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("logGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Log10Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("log10", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("log10Grad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Log1pFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("log1p", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("log1pGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class Log2Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("log2", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("log2Grad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class LogaddexpFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("logaddexp", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("logaddexpGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class Logaddexp2Function extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("logaddexp2", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("logaddexp2Grad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class MulFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha || 1.0,
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("mul", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("mulGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class NegFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("neg", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("negGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class PositiveFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("positive", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("positiveGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class PowFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("pow", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("powGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class Rad2degFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("rad2deg", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("rad2degGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class ReciprocalFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("reciprocal", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("reciprocalGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class ReluFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("relu", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("reluGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class RoundFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("round", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("roundGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class RsqrtFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("rsqrt", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("rsqrtGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SigmoidFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sigmoid", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sigmoidGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SignFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sign", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("signGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SiluFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("silu", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("siluGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SinFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sin", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sinGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SincFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sinc", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sincGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SinhFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sinh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sinhGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SqrtFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sqrt", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sqrtGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SquareFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("square", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("squareGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class SubFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        const params = {
            size: shapeSize(input.shape),
            alpha: alpha || 1.0,
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("sub", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other, alpha] = inputs as [Tensor, Tensor, number|undefined];
        ctx.alpha = alpha;
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
            alpha: ctx.alpha || 1.0,
        };
        return input.runKernel("subGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class TanFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("tan", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("tanGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class TanhFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("tanh", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("tanhGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class TruncFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("trunc", {"dtype":"float32"}, params, [input.shape])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("truncGrad", {"dtype":"float32"}, params, [input.shape], outputGrad);
    }
}
export class XlogyFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input, other] = inputs as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        if (!other.isContiguous) { throw new Error("Other must be contiguous"); }
        return input.runKernel("xlogy", {"dtype":"float32"}, params, [input.shape], other)[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input, other] = inputs as [Tensor, Tensor];
        ctx.saveForBackward(input, other);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input, other] = ctx.savedTensors as [Tensor, Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("xlogyGrad", {"dtype":"float32"}, params, [input.shape, other.shape], other, outputGrad);
    }
}
export class AllFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("all", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("allGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class AnyFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("any", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("anyGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class MeanFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("mean", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("meanGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class NormFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("norm", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("normGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class ProdFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("prod", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("prodGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class SumFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("sum", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("sumGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
export class CountNonzeroFunction extends AutoFunction {
    static forward(inputs: FunctionInput[]): Tensor {
        const [input] = inputs as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        if (!input.isContiguous) { throw new Error("Input must be contiguous"); }
        return input.runKernel("countNonzero", {"dtype":"float32","workgroupSize":64}, params, [[]])[0];
    }
    static setupContext(
        ctx: GradientContext,
        inputs: FunctionInput[],
        output: Tensor
    ): void {
        const [input] = inputs as [Tensor];
        ctx.saveForBackward(input);
    }
    static backward(ctx: GradientContext, outputGrad: Tensor): GradientFunctionOutput[] {
        const [input] = ctx.savedTensors as [Tensor];
        const params = {
            size: shapeSize(input.shape),
        };
        return input.runKernel("countNonzeroGrad", {"dtype":"float32","workgroupSize":64}, params, [input.shape], outputGrad);
    }
}
