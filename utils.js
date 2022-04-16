const Appointment = require("./MVC Structure/models/appointment")

async function getLastSerial(date) {
	const appointment = await Appointment.findOne({
		date: date,
	}).sort({ _id: -1 })

	if (appointment != null) {
		let serial = appointment.serial
		return serial
	} else {
		return 0
	}
}

module.exports = getLastSerial
