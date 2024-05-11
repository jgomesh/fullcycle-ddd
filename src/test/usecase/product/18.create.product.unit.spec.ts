import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

const input = {
    name: "Product 1",
    price: 200
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateProductUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    });

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateProductUseCase(customerRepository);

        input.name = "";

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price is missing or wrong", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateProductUseCase(customerRepository);
        input.name = "Product 1";
        input.price = -10;

        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});
