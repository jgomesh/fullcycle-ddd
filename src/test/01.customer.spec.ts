import Address from "../domain/entity/address";
import Customer from "../domain/entity/customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "João");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it("should change name", () => {
        const customer = new Customer("123", "João");
        customer.changeName("Joãozinho");
        expect(customer.name).toBe("Joãozinho");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "João")
        const address = new Address("Stree 1", 123, "881337=170", "Palhoça");
        customer.Address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "João");
        customer.deactivate();
        
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("123", "João");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });
})
