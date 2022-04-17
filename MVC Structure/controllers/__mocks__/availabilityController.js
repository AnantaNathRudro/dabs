const updateAvailability = (req, res) => {
	try {
		const availability = req.body.availability == "on" ? true : false
		return availability
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	updateAvailability,
}
