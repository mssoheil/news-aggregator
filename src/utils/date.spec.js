import { getFormattedDate } from "./date.util";

describe("getFormattedDate", () => {
	it("should return 2023-11-10 from 2023-11-10T15:54:30Z", () => {
		expect(getFormattedDate("2023-11-10T15:54:30Z")).toBe("2023/11/10");
	});
});
