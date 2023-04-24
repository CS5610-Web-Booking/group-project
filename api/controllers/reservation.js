import Reservation from '../models/reservation.js';

// CREATE reservation
export const createReservation = async (req, res) => {
    const { hotelName, hotelId, userId, kingRooms, queenRooms, startDate, endDate } = req.body;
    const reservation = new Reservation({
        userId,
        kingRooms,
        queenRooms,
        startDate,
        endDate,
        hotelId,
        hotelName,
    });

    try {
        const savedReservation = await reservation.save();
        res.status(201).json(savedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET reservations by user id
export const getReservationsByUserId = async (req, res) => {
    try {
        const reservations = await Reservation.find({ userId: req.params.userId });

        if (!reservations) {
            return res.status(404).json({ message: "Reservations not found" });
        }

        return res.status(200).json({ reservations });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// DELETE reservation
export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE reservation
export const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json({ message: "Reservation updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};