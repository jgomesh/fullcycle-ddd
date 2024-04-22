import ProductFactory from "../domain/product/factory/product.factory";

describe("Product Factory tests", () => {
    it("should create a product type a", () => {

        const product = ProductFactory.create("a", "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product type b", () => {

        const product = ProductFactory.create("b", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw error when type is not supported", () => {

        expect(() => ProductFactory.create("c", "Product B", 1)).toThrow("Product type not supported");
    });
});