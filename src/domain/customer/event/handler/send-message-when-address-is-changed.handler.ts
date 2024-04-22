import CustomerAddressChangedEvent from "../address-changed.event";
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class SendEmailWhenAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const eventData = (event as CustomerAddressChangedEvent).eventData;
    console.log(`Endereço do cliente ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.city}, ${eventData.address.street}, ${eventData.address.number}`);
  }
}