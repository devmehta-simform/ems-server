import express from 'express';
import { EventRoutes } from '../types';
import { auth } from '../middlewares';
import { getEvents } from '../services/event.service';

const eventRouter = express.Router();

eventRouter.route(EventRoutes.event).get(auth, getEvents);

export { eventRouter };
