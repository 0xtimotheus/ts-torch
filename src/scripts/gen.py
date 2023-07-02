import torch;
import json;
import arithmetic_tests as at;
import functional_tests as ft;
import module_tests as mt
import reshape_tests as rt
import factory_tests as fact

# Configure and build the generated test file

tests = [

    # Arithmetic Tests --------------------------------------------------------

    #at.gen_scalar_add("Scalar add basic test", torch.ones(2, 2), 1),
    #at.gen_scalar_sub("Scalar sub basic test", torch.ones(2, 2), 1),
    #at.gen_scalar_mul("Scalar mul basic test", torch.ones(2, 2), 2),
    #at.gen_scalar_div("Scalar div basic test", torch.ones(2, 2), 2),

    #at.gen_scalar_add("Scalar performance test", torch.ones(256, 256), 1),
    #at.gen_scalar_sub("Scalar performance basic test", torch.ones(256, 256), 1),
    #at.gen_scalar_mul("Scalar performance basic test", torch.ones(256, 256), 2),
    #at.gen_scalar_div("Scalar performance basic test", torch.ones(256, 256), 2),

    #t.gen_mm("mm test 1 - 2 x 2", torch.randint(1, 5, [2, 2]), torch.randint(1, 5, [2, 2])),
    #t.gen_mm("mm test 1 - 3 x 3", torch.randint(1, 5, [3, 3]), torch.randint(1, 5, [3, 3])),
    #t.gen_mm("mm test 1 - 2 x 3", torch.randint(1, 5, [2, 3]), torch.randint(1, 5, [3, 2])),
    #t.gen_mm("mm test 1 - 2 x 3", torch.randint(1, 5, [1, 3]), torch.randint(1, 5, [3, 2])),
    #at.gen_mm("mm limits test 1 - 512 x 512", torch.randn([512, 512]), torch.randn([512, 512])),

    #t.gen_sum("Sum test small", torch.ones(2, 2)),
    #t.gen_sum("Sum test 100x100", torch.ones(100, 100)),
    #t.gen_sum("Sum test 1000x1000", torch.ones(1000, 1000)),


    # Functional Tests --------------------------------------------------------

    #ft.cumprod("Cumprod test 1", torch.randn(10, 10)),

    #ft.gen_upsample("Upsample test 1", torch.randn([1, 1, 2, 2]), scale_factor=[2, 2], mode="nearest"),
    #ft.gen_upsample("Upsample test 1", torch.randn([1, 1, 3, 3]), scale_factor=[4, 4], mode="bilinear"),
    #ft.gen_upsample("Upsample performance 1", torch.randn([1, 1, 256, 256]), scale_factor=[2, 2], mode="bilinear"),

    #ft.gen_softmax("Softmax basic test", torch.randn(10) * 10, 0),
    #ft.gen_softmax("Softmax basic test", torch.randn([2, 5]) * 10, 0),
    #ft.gen_softmax("Softmax basic test", torch.randn([2, 3, 3,]) * 10, 0),
    #ft.gen_softmax("Softmax basic test", torch.randn([2, 2, 3, 3,]) * 10, 0),
    #ft.gen_softmax("Softmax performance test 1", torch.randn([2, 128, 128]) * 10, 0),
    #ft.gen_softmax("Softmax performance test 2", torch.randn([2, 256, 256]) * 10, 0),

    #ft.gen_scaled_dot_product_attention("Scaled dot product attention test 1", torch.rand(1, 8, 128, 64), torch.rand(1, 8, 128, 64), torch.rand(1, 8, 128, 64)),
    #ft.gen_scaled_dot_product_attention("Scaled dot product attention performance test 1", torch.rand(1, 1, 64, 64), torch.rand(1, 1, 64, 64), torch.rand(1, 1, 64, 64)),
    #ft.gen_scaled_dot_product_attention("Scaled dot product attention performance test 2", torch.rand(1, 64, 64, 64), torch.rand(1, 64, 64, 64), torch.rand(1, 64, 64, 64)),

    #ft.gen_linear("Linear test 1 - small no bias", torch.randint(1, 5, [3]), torch.randint(1, 5, [2, 3])),
    #ft.gen_linear("Linear test 2 - small with bias", torch.randint(1, 5, [3]), torch.randint(1, 5, [2, 3]), torch.randint(0, 1, [2])),
    #ft.gen_linear("Linear test 3 - default", torch.randint(1, 5, [20]), torch.randint(1, 5, [50, 20]), torch.randint(1, 5, [50])),
    #ft.gen_linear("Linear test 4 - no bias", torch.randint(1, 5, [20]), torch.randint(1, 5, [50, 20])),
    #ft.gen_linear("Linear test 5 - special zeros", torch.tensor([1, 1]), torch.tensor([[0, 0], [1, 1]])),
    #ft.gen_linear("Linear performance test 1", torch.randn([128]), torch.randn([256, 128])),
    #ft.gen_linear("Linear performance test 2", torch.randn([256]), torch.randn([256, 256])),

    #ft.gen_layer_norm("layer_norm basic test", torch.randn(20, 5, 10, 10), [5, 10, 10], torch.ones([5, 10, 10]), torch.zeros([5, 10, 10])),
    #ft.gen_layer_norm("layer_norm performance test", torch.randn(128, 5, 10, 10), [5, 10, 10], torch.ones([5, 10, 10]), torch.zeros([5, 10, 10])),

    #ft.gen_group_norm("group_norm basic test", torch.randn(20, 6, 10, 10), 2, torch.ones(6), torch.zeros(6)),
    #ft.gen_group_norm("group_norm basic test", torch.randn(1, 6, 128, 128), 1, torch.ones(6), torch.zeros(6)),
    #ft.gen_group_norm("group_norm performance test", torch.randn(1, 6, 128, 128), 1, torch.ones(6), torch.zeros(6)),

    #ft.gen_conv2d("Conv2d test 1", torch.randn(1, 4, 5, 5), torch.randn(8, 4, 5, 5), None),
    #ft.gen_conv2d("Conv2d test 2", torch.randn(1, 4, 5, 5), torch.randn(8, 4, 5, 5), None),
    #ft.gen_conv2d("Conv2d test 3 - image dimensions", torch.randn(1, 3, 64, 64), torch.randn(3, 3, 64, 64), None),

    #ft.gen_max_pool2d("MaxPool2D test 1", torch.randn(4, 16, 16), 2),

    #ft.gen_clamp("Clamp basic test", torch.randn(10) * 2, -1, 1),

    #ft.gen_silu("SiLU basic test", torch.randn([1000, 1000])),
    #ft.gen_gelu("GeLU basic test", torch.randn([1000, 1000])),


    # Module Tests ------------------------------------------------------------

    mt.gen_nn_multihead_attention("Multihead Attention test 1", torch.randn([32, 8, 64]), torch.randn([32, 8, 64]), torch.randn([32, 8, 64]), 64, 8),

    mt.gen_nn_layernorm("LayerNorm test 1", torch.randn([20, 5, 10]), [10]),

    mt.gen_nn_groupnorm("GroupNorm test 1", torch.randn([20, 6, 10, 10]), 3, 6),

    mt.gen_nn_linear("Linear test 1", torch.randn([128,16]), 16, 8),

    mt.gen_nn_conv2d("Conv2d test 1", torch.randn([20, 16, 50, 100]), 16, 33, 3),

    mt.gen_nn_maxpool2d("Maxpool2d test 1", torch.randn([20, 16, 50 ,32]), 3)

    # Reshape Tests -----------------------------------------------------------


    #rt.gen_chunk("chunk test 1 - dim start", torch.randint(0, 10, [3, 5, 5]), 3, 0),
    #rt.gen_chunk("chunk test 1 - dim mid", torch.randint(0, 10, [5, 3, 5]), 3, 1),
    #rt.gen_chunk("chunk test 1 - dim end", torch.randint(0, 10, [5, 5, 3]), 3, 2),
    #rt.gen_chunk("chunk test 1 - non-one output shape", torch.randint(0, 10, [5, 6, 5]), 2, 1),
    
    #rt.gen_transpose("Transpose test 1 - 3 x 2", torch.randint(1, 10, [3, 2])),
    #rt.gen_transpose("Transpose test 2 - transpose dims: 1 & 2 for matrix: 3 x 2 x 2", torch.randint(1, 10, [3, 2, 2]), 1, 2),
    #rt.gen_transpose("Transpose test 3 - transpose dims: 0 & 2 for matrix: 3 x 2 x 2", torch.randint(1, 10, [3, 2, 2]), 0, 2),
    #rt.gen_transpose("Transpose test 4 - transpose dims: 0 & 2 for matrix: 2 x 3 x 2", torch.randint(1, 10, [2, 3, 2]), 0, 2),
    #rt.gen_transpose("Transpose test 5 - transpose dims: 0 & 2 for matrix: 2 x 2 x 3", torch.randint(1, 10, [2, 2, 3]), 0, 2),
    #rt.gen_transpose("Transpose test 6 - transpose dims: matrix: 128 x 256", torch.randint(1, 10, [256, 128])),
    #rt.gen_transpose("Transpose performance test - transpose dims: 1024 x 512", torch.randint(1, 10, [1024, 512])),

    #rt.gen_unsqueeze("Unsqueeze test 1", [10], 0),
    #rt.gen_unsqueeze("Unsqueeze test 2", [10, 3, 2], 0),
    #rt.gen_unsqueeze("Unsqueeze test 3", [10, 3, 2], 1),
    #rt.gen_unsqueeze("Unsqueeze test 3", [10, 3, 2], -1),

    #rt.gen_squeeze("Squeeze test 1", [10], 0),
    #rt.gen_squeeze("Squeeze test 2", [10, 1, 2, 1], None),
    #rt.gen_squeeze("Squeeze test 3", [10, 1, 2, 1], 1),
    #rt.gen_squeeze("Squeeze test 3", [10, 1, 2, 1], -1),

    #rt.gen_cat("Cat performance test", torch.randint(0, 5, [256, 256]), torch.randint(0, 5, [256, 256]), 0),


    # Factory Tests -----------------------------------------------------------

    #t.gen_linspace("Linspace test 1", 1, 10, 10),
    #t.gen_linspace("Linspace test 2", 1, 10, 100),
    #t.gen_linspace("Linspace test 3", 0, 1, 50),
]
    
    

def build():
    out = json.dumps(tests)
    fp = open("./tests.json", "w")
    fp.write(out)
    fp.close()

if __name__ == "__main__":
    build()