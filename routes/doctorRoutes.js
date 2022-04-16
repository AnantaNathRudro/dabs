const router = require("express").Router()
const doctorController = require("../MVC Structure/controllers/doctorController")

router.post("/manage", doctorController.setDoctor)
router.get("/manage/delete/:username", doctorController.deleteDoctor)
router.get("/", doctorController.loadDoctors)
router.post("/", doctorController.searchDoctor)

module.exports = router
