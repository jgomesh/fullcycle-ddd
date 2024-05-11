import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "../../../usecase/product/list/list.customer.usecase";

const product1 = ProductFactory.create("a", "Product B", 300);

const product2 = ProductFactory.create("a", "Product C", 100);

const product3 = ProductFactory.create("a", "Product F", 500);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2, product3])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test list product use case", () => {
    it("should list a product", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);
    
        const output = await useCase.execute({});
    
        expect(output.products.length).toBe(3);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

        expect(output.products[2].id).toBe(product3.id);
        expect(output.products[2].name).toBe(product3.name);
        expect(output.products[2].price).toBe(product3.price);
      });
});
