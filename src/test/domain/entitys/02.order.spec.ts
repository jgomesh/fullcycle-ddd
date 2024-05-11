import Order from "../../../domain/checkout/entity/Order";
import OrderItem from "../../../domain/checkout/entity/OrderItem";

describe("Orderx' unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrow("custumerId is required");
    });
    
    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "321", [])
        }).toThrow("Item qt must be greater than 0");
    });

    it("should calculate total", () => {
        const item = new OrderItem('il', 'Item1', 100, 2, "s1");
        const item2 = new OrderItem('il2', 'Item2', 50, 1, "s2");
        const order1 = new Order("99", "123", [item, item2]);

        const total = order1.total();
        expect(total).toBe(250);
    });
})
