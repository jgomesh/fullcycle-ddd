import Order from "../domain/checkout/entity/Order";
import OrderItem from "../domain/checkout/entity/OrderItem";
import Customer from "../domain/customer/entity/customer";
import OrderService from "../domain/checkout/service/order.service";

describe("Order Service unit tests", () => {
    it("should get total of all orders", () => {
        
        const item1 = new OrderItem("1", "Item 1", 10, 1, "d3");
        const item2 = new OrderItem("2", "Item 2", 20, 2, "d3");

        const order = new Order("1", "247", [item1]);

        const order2 = new Order("2", "248", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(50);
    });

    it("should place an order", () => {
        const customer = new Customer("1", "João");
        
        const item1 = new OrderItem("1", "Item 1", 10, 1, "d3");
        const item2 = new OrderItem("2", "Item 2", 20, 2, "d3");

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

});
