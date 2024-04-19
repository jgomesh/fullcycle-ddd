import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import Order from './domain/entity/Order';
import OrderItem from './domain/entity/OrderItem';

let customer = new Customer("247", "João Gomes");

const address = new Address("Rua da saracura", 375, "88137-170", "Palhoça")
customer.Address = address;

customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, 1, "d2");
const item2 = new OrderItem("2", "Item 2", 20, 1, "d2");

const order = new Order("1", "247", [item1, item2])
