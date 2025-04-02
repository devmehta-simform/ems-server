import express from 'express';
import { EventRoutes, UserRoutes } from '../types/types';
import auth from '../middlewares/auth';
import { getEvents } from '../controllers/event.controller';

const router = express.Router();

router.route(EventRoutes.event).get(auth, getEvents);

export default router;
