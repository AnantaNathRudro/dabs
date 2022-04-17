const availabilityController = require("../MVC Structure/controllers/availabilityController")

jest.mock("../MVC Structure/controllers/availabilityController")

describe("Availability Controller Test Suite", () => {
	describe("Availability Update", () => {
		it("should return true", () => {
			const req = {
				session: {
					role: "handler",
					username: "handler",
				},
				body: {
					availability: "on",
				},
			}
			const res = {}
			const expectedAvailability = true

			const returnedAvailability = availabilityController.updateAvailability(
				req,
				res
			)
			expect(returnedAvailability).toBe(expectedAvailability)
		})

		it("should return false", () => {
			const req = {
				session: {
					role: "handler",
					username: "handler",
				},
				body: {
					availability: "off",
				},
			}
			const res = {}
			const expectedAvailability = false

			const returnedAvailability = availabilityController.updateAvailability(
				req,
				res
			)
			expect(returnedAvailability).toBe(expectedAvailability)
		})
	})
})
