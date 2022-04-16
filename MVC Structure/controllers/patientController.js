const scheduler = require("node-schedule")

const doctor = require("../models/doctor")
const appointment = require("../models/appointment")

const loadpatient = async (req, res) => {
	try {
		if (req.session.role === "doctor") {
			const patient = await doctor.findOne()
			if (patient == null) {
				res.render("patient", {
					questions: "nopatientYet",
					message: req.flash("message"),
				})
			} else if (patient.status === "started") {
				const appointment = await appointment.findOne({
					username: req.session.username,
				})
				if (appointment != null && appointment.patientStarted === true) {
					const questions = await Question.find()
					res.render("patient", {
						questions: questions,
						message: req.flash("message"),
					})
				} else if (appointment != null && appointment.patientEnded === true) {
					res.render("patientEnded")
				} else {
					res.render("confirmStart", {
						message: null,
					})
				}
			} else if (patient.status === "unavailable") {
				res.render("confirmStart", {
					message: patient.schedule.toLocaleString("en-US", {
						timeZone: "Asia/Dhaka",
						dateStyle: "full",
						timeStyle: "full",
					}),
				})
			} else {
				res.render("patientEnded")
			}
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const startpatient = async (req, res) => {
	try {
		if (req.session.role === "doctor") {
			if (req.body.startConfirmed === "yes") {
				const appointment = new appointment({
					username: req.session.username,
					patientStarted: true,
				})
				await appointment.save()
				res.redirect("/patient")
			} else {
				res.redirect("/")
			}
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const confirmEnd = (req, res) => {
	if (req.session.role === "doctor") {
		res.render("confirmEnd")
	}
}

const endpatient = async (req, res) => {
	try {
		if (req.session.role === "doctor") {
			if (req.body.endConfirmed === "yes") {
				await appointment.updateOne(
					{ username: req.session.username },
					{
						$set: {
							patientStarted: false,
							patientEnded: true,
						},
					}
				)
				res.redirect("/patient")
			} else {
				res.redirect("/patient")
			}
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	loadpatient,
	startpatient,
	confirmEnd,
	endpatient,
	submitAnswer,
}
