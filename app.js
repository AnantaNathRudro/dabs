const express = require("express")
const logger = require("morgan")
const session = require("express-session")
const mongoSessionStore = require("connect-mongodb-session")(session)
const flash = require("connect-flash")
const mongoose = require("mongoose")
require("dotenv").config()

const homeRoutes = require("./routes/homeRoutes")
const loginRoutes = require("./routes/loginRoutes")
const logoutRoutes = require("./routes/logoutRoutes")
const signupRoutes = require("./routes/signupRoutes")
const appointmentRoutes = require("./routes/appointmentRoutes")
const doctorRoutes = require("./routes/doctorRoutes")
const availabilityRoutes = require("./routes/availabilityRoutes")

const authenticate = require("./middlewares/authenticator")

const app = express()

const dbURI = process.env.dbURI
const port = process.env.PORT || 3000
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((availability) => {
		console.log("Connected to database")
		app.listen(port, () => {
			console.log(`Server is listening to port ${port}\n`)
		})
	})
	.catch((err) => console.error(err))

app.set("views", "MVC Structure/views")

app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }))

app.use(logger("dev"))

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
		resave: false,
		saveUninitialized: false,
		store: mongoSessionStore({
			uri: dbURI,
			collection: "sessions",
		}),
	})
)

app.use(flash())

app.get("/", authenticate, (req, res) => {
	res.redirect("/home")
})

app.use("/home", authenticate, homeRoutes)

app.use("/login", loginRoutes)

app.use("/logout", authenticate, logoutRoutes)

app.use("/signup", signupRoutes)

app.use("/appointment", authenticate, appointmentRoutes)

app.use("/doctor", authenticate, doctorRoutes)

app.use("/availability", authenticate, availabilityRoutes)

app.use((req, res) => {
	res.status(404).render("error")
})
