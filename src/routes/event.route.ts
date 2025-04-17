import express from 'express';
import { auth, validate } from '../middlewares';
import * as EventService from '../services/event.service';
import { EventCreateSchema, EventUpdateSchema } from '../dto';
import { RolesEnum } from '../types';

const eventRouter = express.Router();

eventRouter.route('/').get(auth(), EventService.getEvents).post(auth(RolesEnum['Host']), validate(EventCreateSchema), EventService.createEvent);

eventRouter
  .route('/:eventId')
  .get(auth(), EventService.getEvent)
  .patch(auth(RolesEnum['Host']), validate(EventUpdateSchema), EventService.updateEvent)
  .delete(auth(RolesEnum['Host']), EventService.deleteEvent);

export { eventRouter };
