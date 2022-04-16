const router = require("express").Router()
const appointmentController = require("../MVC Structure/controllers/appointmentController")

router.post("/verify", appointmentController.verifyPatient)
router.post("/:username", appointmentController.bookAppointment)
router.get("/cancel/:id", appointmentController.cancelAppointment)
router.get("/booked", appointmentController.loadBookedAppointments)
router.get("/verify", appointmentController.loadVerification)
router.get("/:username", appointmentController.loadAppointment)

module.exports = router
