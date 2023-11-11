export function getFormattedDate(dateString) {
	const inputDate = new Date(dateString);

	const year = inputDate.getFullYear();
	const month = inputDate.getMonth() + 1;
	const day = inputDate.getDate();

	return `${year}/${month}/${day}`;
}
