import { EventSchema } from '../models';

const EventCreateSchema = EventSchema.pick({
  dateOfEvent: true,
  name: true,
  numberOfTickets: true,
  description: true,
  ticketPrice: true,
  venue: true,
  images: true,
  isActive: true,
  startTime: true,
  endTime: true,
});

export { EventCreateSchema };
