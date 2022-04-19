const Doctor = require("../models/doctor")

const loadAvailability = async (req, res) => {
	try {
		if (req.session.role === "handler") {
			const doctor = await Doctor.findOne({
				handler: req.session.username,
			})
			res.render("availability", {
				doctorName: doctor.name,
				doctorAvailability: doctor.availability,
			})
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

const updateAvailability = async (req, res) => {
	try {
		const availability = req.body.availability == "on" ? true : false
		await Doctor.updateOne(
			{
				handler: req.session.username,
			},
			{
				availability: availability,
			}
		)
		res.redirect("/availability")
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	loadAvailability,
	updateAvailability,
}
