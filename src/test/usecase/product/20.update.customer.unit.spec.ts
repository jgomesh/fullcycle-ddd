import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

const product = ProductFactory.create("a", "Product B", 300);

const input = {
    id: product.id,
    name: "Product M",
    price: 100
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test update product use case", () => {
    it("should update a product", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: "Product M",
            price: 100
        })
    });
});
