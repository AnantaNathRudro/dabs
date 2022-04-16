const mongoose = require("mongoose")
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
	doctor: {
		type: String,
		required: true,
	},
	patient: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	serial: {
		type: Number,
		required: true,
	},
	token: {
		type: String,
		required: true,
		unique: true,
	},
	cancelled: {
		type: Boolean,
		required: true,
		default: false,
	},
})

const appointment = mongoose.model("appointment", appointmentSchema)
module.exports = appointment
