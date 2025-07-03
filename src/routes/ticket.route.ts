import express from 'express';
import * as TicketService from '../services/ticket.service';
import { auth, validate } from '../middlewares';
import { TicketCreateSchema } from '../dto/ticketCreateDTO';

export const ticketRouter = express.Router();

ticketRouter.route('/:userId').get(auth(), TicketService.getAllTicketsForUser);
ticketRouter.route('/:userId/:ticketId').get(auth(), TicketService.getTicket);
ticketRouter.route('/').post(auth(), validate(TicketCreateSchema), TicketService.createTicket);
