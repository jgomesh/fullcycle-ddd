import SendEmailWhenProductIsCreatedHandler from "../../../domain/product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "../../../domain/@shared/event/event-dispatcher";
import ProductCreatedEvent from "../../../domain/product/event/product-created.event";
import SendEmailWhenAddressChangedHandler from "../../../domain/customer/event/handler/send-message-when-address-is-changed.handler";
import CustomerCreatedEvent from "../../../domain/customer/event/customer-created.event";
import Address from "../../../domain/customer/value-object/address";
import CustomerAddressChangedEvent from "../../../domain/customer/event/address-changed.event";
import SendFirstMessageWhenCustomerIsCreatedHandler from "../../../domain/customer/event/handler/send-first-message-when-customer-is-created.handler";
import SendSecondMessageWhenCustomerIsCreatedHandler from "../../../domain/customer/event/handler/send-second-message-when-customer-is-created.handler";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            1
        );

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
            0
        );
    });

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify product event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product1",
            description: "Product 1 description",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("should notify customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const customerCreatedHandler1 = new SendFirstMessageWhenCustomerIsCreatedHandler();
        const customerCreatedHandler2 = new SendSecondMessageWhenCustomerIsCreatedHandler();
        const addressChangedHandler = new SendEmailWhenAddressChangedHandler();
        const spyHandler1 = jest.spyOn(customerCreatedHandler1, "handle");
        const spyHandler2 = jest.spyOn(addressChangedHandler, "handle");
        const spyHandler3 = jest.spyOn(customerCreatedHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler1);
        eventDispatcher.register("CustomerCreatedEvent", customerCreatedHandler2);
        eventDispatcher.register("CustomerAddressChangedEvent", addressChangedHandler);

        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");

        const customerData = {
            id: 1,
            name: "Customer1",
            address: address2,
        };

        const customerCreatedEvent = new CustomerCreatedEvent(customerData);
        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customerData);

        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyHandler1).toHaveBeenCalledWith(customerCreatedEvent);
        expect(spyHandler2).toHaveBeenCalledWith(customerAddressChangedEvent);
        expect(spyHandler3).toHaveBeenCalledWith(customerAddressChangedEvent);
    });
});