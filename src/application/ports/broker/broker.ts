import { DomainEvent } from "../../../domain/events/implements/domain-event";
import { Handler } from "../../handlers/implements/handler";

export interface Broker {
  handlers: Handler[];
  register(handler: Handler): void;
  publish(action: DomainEvent): void;
}
