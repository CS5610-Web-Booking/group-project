import express from "express";
import {
    createReservation,
    deleteReservation,
    getReservationsByUserId,
    updateReservation
} from "../controllers/reservation.js";
import {verifyUser} from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/", createReservation);

//UPDATE
router.put("/:id", verifyUser, updateReservation);

//DELETE
router.delete("/:id", verifyUser, deleteReservation);

// GET
router.get("/user/:userId", getReservationsByUserId);

export default router;
