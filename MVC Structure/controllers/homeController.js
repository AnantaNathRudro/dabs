const loadHome = (req, res) => {
	res.render("home", { role: req.session.role })
}

module.exports = {
	loadHome,
}
