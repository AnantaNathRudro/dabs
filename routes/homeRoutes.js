const router = require("express").Router()
const homeController = require("../MVC Structure/controllers/homeController")

router.get("", homeController.loadHome)

module.exports = router
