import { createQuery } from "./query.util";

describe("getFormattedDate", () => {
	it("should create query from an object", () => {
		expect(
			createQuery({
				q1: 1,
				q2: undefined,
				q3: null,
				q4: "sport",
				q5: 0,
			})
		).toBe("q1=1&q4=sport&q5=0");
	});
});
