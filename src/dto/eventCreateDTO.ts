import { EventSchema } from '../models';

const EventCreateSchema = EventSchema.pick({
  dateOfEvent: true,
  name: true,
  numberOfTickets: true,
  description: true,
  ticketPrice: true,
  address: true,
  city: true,
  state: true,
  country: true,
  zipcode: true,
  coverImage: true,
  images: true,
  isActive: true,
  startTime: true,
  endTime: true,
});

export { EventCreateSchema };
