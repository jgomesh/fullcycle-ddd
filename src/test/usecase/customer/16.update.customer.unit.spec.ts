import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import UpdateCustomerUseCase from "../../../usecase/customer/update/update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address(
        "Street",
        123,
        "Zip",
        "City"
    )
);

const input = {
    id: customer.id,
    name: "John",
    address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            },
        })
    });

});
