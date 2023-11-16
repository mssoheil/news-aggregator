export function createQuery(items) {
	const result = [];

	for (let item in items) {
		if (items[item] != null) {
			result.push(
				encodeURIComponent(item) + "=" + encodeURIComponent(items[item])
			);
		}
	}

	return result.join("&");
}
