import { Sequelize } from "sequelize-typescript";
import Order from "../domain/entity/Order";
import OrderItem from "../domain/entity/OrderItem";
import Customer from "../domain/entity/customer";
import Address from "../domain/entity/address";
import Product from "../domain/entity/product";
import CustomerModel from "../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../infrastructure/repository/customer.repository";
import ProductModel from "../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../infrastructure/repository/product.repository";
import OrderItemModel from "../infrastructure/db/sequelize/model/order-item.model";
import OrderModel from "../infrastructure/db/sequelize/model/order.model";
import OrderRepository from "../infrastructure/repository/order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find an existing order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      2,
      product.id,
    );

    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      4,
      product.id,
    );

    const items = [orderItem, orderItem2];
    const order = new Order("123", "123", items);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });


    const foundOrder = await orderRepository.find("123");

    expect(foundOrder).toEqual(
      new Order(orderModel.id, orderModel.customer_id, items)
    );
  });

  it("should throw an error when order is not found", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("789")).rejects.toThrow("Order not found");
  });

  it("should return an empty array when no orders exist", async () => {
    const orderRepository = new OrderRepository();
    const orders = await orderRepository.findAll();
    expect(orders).toEqual([]);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const customer2 = new Customer("124", "Customer 2");
    const address2 = new Address("Street 2", 1, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);

    const product2 = new Product("1232", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("1", product1.name, product1.price, 2, product1.id);
    const orderItem2 = new OrderItem("2", product1.name, product1.price, 4, product1.id);
    const orderItem3 = new OrderItem("3", product2.name, product2.price, 2, product2.id);
    const orderItem4 = new OrderItem("4", product2.name, product2.price, 4, product2.id);

    const order1 = new Order("123", "123", [orderItem1, orderItem2]);
    const order2 = new Order("1253", "124", [orderItem3, orderItem4]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();
    const orders = [order1, order2];

    expect(foundOrders).toEqual(orders);

  });

  it("should update an existing order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();
  
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
  
    const product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);
  
    const product2 = new Product("124", "Product 2", 20);
    await productRepository.create(product2);
  
    const orderItem1 = new OrderItem("1", product1.name, product1.price, 2, product1.id);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, 4, product2.id);
    const items = [orderItem1, orderItem2];
    const order = new Order("123", customer.id, items);
    await orderRepository.create(order);
  
    const updatedOrderItem1 = new OrderItem("1", product1.name, product1.price, 3, product1.id);
    const updatedOrderItem2 = new OrderItem("2", product2.name, product2.price, 4, product2.id);
    const updatedItems = [updatedOrderItem1, updatedOrderItem2];
    const updatedOrder = new Order(order.id, customer.id, updatedItems);
    await orderRepository.update(updatedOrder);
  
    const updatedOrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
  
    expect(updatedOrderModel.toJSON()).toEqual({
      id: order.id,
      customer_id: customer.id,
      total: 110,
      items: [
        {
          id: updatedOrderItem1.id,
          name: updatedOrderItem1.name,
          price: updatedOrderItem1.price,
          quantity: 2,
          order_id: order.id,
          product_id: product1.id,
        },
        {
          id: updatedOrderItem2.id,
          name: updatedOrderItem2.name,
          price: updatedOrderItem2.price,
          quantity: 4,
          order_id: order.id,
          product_id: product2.id,
        },
      ],
    });
  });
});