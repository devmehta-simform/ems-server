import express from 'express';
import { auth, validate } from '../middlewares';
import * as EventService from '../services/event.service';
import { EventCreateSchema, EventUpdateSchema } from '../dto';

const eventRouter = express.Router();

eventRouter.route('/').get(auth, EventService.getEvents).post(auth('Host'), validate(EventCreateSchema), EventService.createEvent);

eventRouter
  .route('/:eventId')
  .get(auth, EventService.getEvent)
  .patch(auth('Host'), validate(EventUpdateSchema), EventService.updateEvent)
  .delete(auth('Host'), EventService.deleteEvent);

export { eventRouter };
