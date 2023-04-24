import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    kingRooms: { type: Number, default: 0 },
    queenRooms: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    hotelId: { type: Number, default: 0 },
    hotelName: { type: String, default: "" },
});


export default mongoose.model("Reservation", ReservationSchema);