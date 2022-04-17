const shortid = require("shortid")

const bookAppointment = (req, res) => {
	try {
		if (req.session.role === "patient" || "handler") {
			let serial = 1
			const token = shortid.generate()
			const appointment = {
				doctor: req.params.username,
				patient: req.session.username,
				date: req.body.date,
				serial: serial,
				token: token,
			}
			return appointment
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const cancelAppointment = (req, res) => {
	try {
		if (req.session.role === "patient" || "handler") {
			return true
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const verifyPatient = (req, res) => {
	try {
		if (req.session.role === "handler") {
			return req.body.token
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	bookAppointment,
	cancelAppointment,
	verifyPatient,
}
