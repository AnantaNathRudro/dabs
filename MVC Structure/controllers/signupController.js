const bcrypt = require("bcrypt")
// import("../../node_modules/sernam/index.js").then((sernam) => {
// 	const options = {
// 		symbols: true,
// 		numbers: true,
// 	}
// 	const sn = sernam(options)
// })
const Credential = require("../models/credential")

const loadSignupForm = (req, res) => {
	if (req.session.authenticated === true) {
		res.redirect("/")
	} else {
		res.render("signup", { message: req.flash("message") })
	}
}
const signupUser = async (req, res) => {
	try {
		const { name, email, username, age, mobile, password, confirm_password } =
			req.body
		if (password === confirm_password) {
			const hashed = await bcrypt.hash(password, 10)
			// const username = sn.generateOne(name)
			const cred = new Credential({
				name: name,
				username: username,
				email: email,
				age: age,
				mobile: mobile,
				password: hashed,
			})
			await cred.save()
			req.flash("message", ["success", "Signup Successful"])
			res.redirect("login")
		} else {
			req.flash("message", ["error", "Password Mismatch"])
			res.render("signup", { message: req.flash("message") })
		}
	} catch (error) {
		console.log(error)
		return error
	}
}

module.exports = {
	loadSignupForm,
	signupUser,
}
