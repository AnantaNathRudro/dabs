const shortid = require("shortid")

const Doctor = require("../models/doctor")
const Appointment = require("../models/appointment")
const getLastSerial = require("../../utils")

const loadAppointment = async (req, res) => {
	try {
		if (req.session.role === "patient" || "handler") {
			const info = await Doctor.findOne({
				username: req.params.username,
			})
			res.render("appointment", { doctor: info, role: req.session.role })
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const bookAppointment = async (req, res) => {
	try {
		if (req.session.role === "patient" || "handler") {
			let serial = (await getLastSerial(req.body.date)) + 1
			const token = shortid.generate()
			const appointment = await Appointment({
				doctor: req.params.username,
				patient: req.session.username,
				date: req.body.date,
				serial: serial,
				token: token,
			})
			await appointment.save()
			res.redirect("/appointment/booked")
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const cancelAppointment = async (req, res) => {
	try {
		if (req.session.role === "patient" || "handler") {
			await Appointment.updateOne(
				{
					_id: req.params.id,
				},
				{
					cancelled: true,
				}
			)
			res.redirect("/appointment/booked")
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const loadBookedAppointments = async (req, res) => {
	try {
		if (req.session.role === "patient") {
			const appointments = await Appointment.find({
				patient: req.session.username,
			})
			res.render("booked", {
				appointments: appointments,
				role: req.session.role,
			})
		} else if (req.session.role === "handler") {
			const doctor = await Doctor.findOne({
				handler: req.session.username,
			})

			const appointments = await Appointment.find({
				doctor: doctor.username,
			})
			res.render("booked", {
				appointments: appointments,
				role: req.session.role,
			})
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const loadVerification = async (req, res) => {
	try {
		if (req.session.role === "handler") {
			res.render("verification", { appointment: "none" })
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const verifyPatient = async (req, res) => {
	try {
		if (req.session.role === "handler") {
			const appointment = await Appointment.findOne({
				token: req.body.token,
			})
			res.render("verification", { appointment: appointment })
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	loadAppointment,
	bookAppointment,
	cancelAppointment,
	loadBookedAppointments,
	loadVerification,
	verifyPatient,
}
