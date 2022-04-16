const router = require("express").Router()
const patientController = require("../MVC Structure/controllers/patientController")

router.get("", patientController.loadpatient)
router.get("/end", patientController.confirmEnd)
router.post("/end", patientController.endpatient)
router.post("/start", patientController.startpatient)
router.post("/submit", patientController.submitAnswer)

module.exports = router
