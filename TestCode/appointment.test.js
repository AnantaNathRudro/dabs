const appointmentController = require("../MVC Structure/controllers/appointmentController")

jest.mock("../MVC Structure/controllers/appointmentController")

const currentDate = Date.now()

describe("Appointment Controller Test Suite", () => {
	describe("Appointment Booking", () => {
		it("should return the newly created appointment for specified doctor", () => {
			const req = {
				session: {
					role: "patient",
					username: "patient",
				},
				params: {
					username: "rudro_deb_nath",
				},
				body: {
					date: currentDate,
				},
			}
			const res = {}
			const expectedAppointment = {
				doctor: "rudro_deb_nath",
				patient: "patient",
				date: currentDate,
			}

			const newAppointment = appointmentController.bookAppointment(req, res)
			expect(newAppointment.doctor).toEqual(expectedAppointment.doctor)
			expect(newAppointment.patient).toEqual(expectedAppointment.patient)
			expect(newAppointment.date).toEqual(expectedAppointment.date)
			expect(typeof newAppointment.serial).toBe("number")
			expect(typeof newAppointment.token).toBe("string")
		})
	})

	describe("Appointment Cancelling", () => {
		it("should return true after cancellation by patient", () => {
			const req = {
				session: {
					role: "patient",
					username: "patient",
				},
			}
			const res = {}

			const cancelled = appointmentController.cancelAppointment(req, res)
			expect(cancelled).toBeTruthy()
		})

		it("should return true after cancellation by handler", () => {
			const req = {
				session: {
					role: "handler",
					username: "handler",
				},
			}
			const res = {}

			const cancelled = appointmentController.cancelAppointment(req, res)
			expect(cancelled).toBeTruthy()
		})
	})

	describe("Appointment Verifying", () => {
		it("should return given token as there is no such appointment", () => {
			const req = {
				session: {
					role: "handler",
					username: "handler",
				},
				body: {
					token: "afdsff87",
				},
			}
			const res = {}
			const returned = appointmentController.verifyPatient(req, res)
			expect(typeof returned).toBe("string")
		})
	})
})
