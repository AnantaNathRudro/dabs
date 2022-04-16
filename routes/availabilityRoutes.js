const router = require("express").Router()
const availabilityController = require("../MVC Structure/controllers/availabilityController")

router.get("", availabilityController.loadAvailability)
router.post("/", availabilityController.updateAvailability)

module.exports = router
