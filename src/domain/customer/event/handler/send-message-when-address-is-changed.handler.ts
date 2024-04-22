import CustomerAddressChangedEvent from "../address-changed.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";

export class SendEmailWhenAddressChangedHandler implements EventHandlerInterface {
    handle(event: EventInterface): void {
        const eventData = (event as CustomerAddressChangedEvent).eventData;
        console.log(`Endereço do cliente ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.city}, ${eventData.address.street}, ${eventData.address.number}`);
    }
}
