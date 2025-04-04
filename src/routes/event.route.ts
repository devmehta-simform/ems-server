import express from 'express';
import { auth, validate } from '../middlewares';
import * as EventService from '../services/event.service';
import { EventCreateSchema, EventUpdateSchema } from '../dto';

const eventRouter = express.Router();

eventRouter.route('/').get(auth, EventService.getEvents).post(auth, validate(EventCreateSchema), EventService.addEvent);

eventRouter
  .route('/:id')
  .get(auth, EventService.getEvent)
  .patch(auth, validate(EventUpdateSchema), EventService.updateEvent)
  .delete(auth, EventService.deleteEvent);

export { eventRouter };
