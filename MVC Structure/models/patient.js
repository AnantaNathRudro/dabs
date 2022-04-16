const mongoose = require("mongoose")
const Schema = mongoose.Schema

const patientSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	mobile: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
})

const patient = mongoose.model("patients", patientSchema)
module.exports = patient
