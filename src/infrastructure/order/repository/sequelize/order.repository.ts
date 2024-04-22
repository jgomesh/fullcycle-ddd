import Order from "../../../../domain/checkout/entity/Order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderItem from "../../../../domain/checkout/entity/OrderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      }))
    }, {
      include: [ {model: OrderItemModel}]
    }
    );
  };

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [OrderItemModel],
      });
    } catch (error) {
      throw new Error("Order not found");
    }
  
    const orderItems: OrderItem[] = orderModel.items.map((item: OrderItemModel) => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.quantity,
      item.product_id
    ));
  
    return new Order(orderModel.id, orderModel.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    let orderModels;
    try {
      orderModels = await OrderModel.findAll({
        include: [OrderItemModel],
      });
    } catch (error) {
      throw new Error("Error fetching orders")
    }

      const orders: Order[] = orderModels.map(orderModel => {
        const orderItems: OrderItem[] = orderModel.items.map((item: OrderItemModel) => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        ));
        return new Order(orderModel.id, orderModel.customer_id, orderItems);
      });

      return orders;
      
  }

  async update(entity: Order): Promise<void> {
    const items: OrderItem[] = entity.items.map((item) => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.quantity,
      item.productId,
    ));

    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
          items: items,
        },
        {
          where: {
            id: entity.id,
          },
        }
      );
    } catch (error) {
      throw new Error("Something went wrong, check your data and try again");
    }
  }
}