import Product from "../domain/product/entity/product";
import ProductService from "../domain/product/service/product.service";

describe("Product Service unit tests", () => {
    it("should change price of all products", () => {
        
        const product1 = new Product("122", "Produto 1", 100);
        const product2 = new Product("123", "Produto 2", 200);

        const products = [product1, product2];

        ProductService.increasePrice(products, 100)

        expect(product1.price).toBe(200);

        expect(product2.price).toBe(400);
    });

});
