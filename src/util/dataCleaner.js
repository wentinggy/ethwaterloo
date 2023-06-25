export function extractXY(wallets, xValue, yValue) {
	return wallets.map((obj) => {
		return { x: obj[xValue], y: obj[yValue] };
	});
}

export function extractValueLength(wallets, value) {
	return wallets.map((obj) => {
		return { x: obj[value], y: wallets.length };
	});
}

export function extractBuckets(wallets, value, numberOfGroups) {
	// Find the minimum and maximum supply values
	const supplies = wallets.map((obj) => obj[value]);
	const xMin = Math.min(...supplies);
	const xMax = Math.max(...supplies);

	// Calculate the range size for each group
	const rangeSize = (xMax - xMin) / numberOfGroups;

	// Initialize an array of empty groups
	const groups = new Array(numberOfGroups).fill().map(() => []);

	// Assign each object to the corresponding group
	wallets.forEach((obj) => {
		if (obj) {
			const groupIndex = Math.floor((obj[value] - xMin) / rangeSize);
			if (obj !== undefined) groups[groupIndex].push(obj);
		}
	});

	return { groups, xMin, xMax, rangeSize, count: wallets.length };
}
