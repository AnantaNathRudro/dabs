const mongoose = require("mongoose")
const Schema = mongoose.Schema

const doctorSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	workplace: {
		type: String,
		required: true,
	},
	schedule: {
		type: Object,
		required: true,
	},
	availability: {
		type: Boolean,
		required: true,
		default: true,
	},
	handler: {
		type: String,
		required: true,
	},
	handlerPass: {
		type: String,
		required: true,
	},
})

const doctor = mongoose.model("doctors", doctorSchema)
module.exports = doctor
