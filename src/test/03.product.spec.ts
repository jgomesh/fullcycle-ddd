import Product from "../domain/entity/product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "123", 12)
        }).toThrow("Id is required");
    });

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("123", "", 12)
        }).toThrow("Name is required");
    });

    it("should throw error when price is invalid", () => {
        expect(() => {
            let product = new Product("123", "Name", -12)
        }).toThrow("Price is invalid");
    });

    it("should throw error when price is invalid", () => {
        expect(() => {
            let product = new Product("123", "Name", 0)
        }).toThrow("Price is invalid");
    });

    it("should change name", () => {
        let product = new Product("123", "Name", 12);
        product.changeName("Bob");

        expect(product.name).toBe("Bob")
    });

    it("should change price", () => {
        let product = new Product("123", "Name", 12);
        product.changePrice(200);

        expect(product.price).toBe(200)
    });
})

