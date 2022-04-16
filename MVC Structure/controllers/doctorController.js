const bcrypt = require("bcrypt")

const Doctor = require("../models/doctor")
const Credential = require("../models/credential")

const loadDoctors = async (req, res) => {
	try {
		if (req.session.role === "admin" || "patient") {
			const infos = await Doctor.find({})
			res.render("doctor", { details: infos, role: req.session.role })
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const setDoctor = async (req, res) => {
	try {
		if (req.session.role === "admin") {
			const doctor = new Doctor({
				name: req.body.name,
				username: req.body.username,
				department: req.body.department,
				degree: req.body.degree,
				workplace: req.body.workplace,
				handler: req.body.handler,
				handlerPass: req.body.handlerPass,
				schedule: req.body.schedule,
			})
			await doctor.save()
			const email = `${req.body.handler}@gmail.com`
			const hashed = await bcrypt.hash(req.body.handlerPass, 10)
			const cred = new Credential({
				username: req.body.handler,
				email: email,
				password: hashed,
				role: "handler",
			})
			await cred.save()
			req.flash("success", "doctor details saved!")
			res.redirect("/doctor")
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const deleteDoctor = (req, res) => {
	try {
		if (req.session.role === "admin") {
			Doctor.deleteOne({
				username: req.params.username,
			})
				.then(() => {
					req.flash("message", "doctor deleted successfully")
					res.redirect("/doctor")
				})
				.catch((err) => {
					console.error(err)
				})
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const searchDoctor = async (req, res) => {
	try {
		if (req.session.role === "patient") {
			const searchText = req.body.search

			const doctor = await Doctor.find({
				$text: {
					$search: `\"${searchText}\"`,
				},
			})
			res.render("doctor", { details: doctor, role: req.session.role })
		} else {
			res.redirect("/")
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	loadDoctors,
	setDoctor,
	deleteDoctor,
	searchDoctor,
}
