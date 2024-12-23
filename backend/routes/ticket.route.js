import { Router } from "express";
import { addTicketHistory, assignedTickets, createTicket, getTicket, getTickets } from "../controller/ticket.controller.js";
import {authenticateToken} from "../middlewares/authenticateToken.js";

const router = Router();

router.route("/").post(createTicket)
router.route("/").get(authenticateToken,getTickets);
router.route("/assignedTickets").post(assignedTickets)
router.route("/:id").get(getTicket)
router.route("/:id").patch(addTicketHistory)

export default router;