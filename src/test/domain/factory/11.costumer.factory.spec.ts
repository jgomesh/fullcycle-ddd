import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

describe("Customer Factory tests", () => {
    it("should create a customer type a", () => {

        const customer = CustomerFactory.create("Jhon");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 2", 2, "Zipcode 2", "City 2");

        const customer = CustomerFactory.createWithAddress("Jhon", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBe(address);
    });
});