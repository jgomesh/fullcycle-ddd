import OrderFactory from "../../../domain/checkout/factory/order.factory";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import { v4 as uuid } from "uuid";

describe("Order Factory tests", () => {
    it("should create a order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product1",
                    productId: uuid(),
                    price: 10.0,
                    quantity: 1,
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(order.customerId);
        expect(order.items.length).toBe(1);
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 2", 2, "Zipcode 2", "City 2");

        const customer = CustomerFactory.createWithAddress("Jhon", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Jhon");
        expect(customer.address).toBe(address);
    });
});