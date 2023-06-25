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
			var groupIndex = Math.floor((obj[value] - xMin) / rangeSize);
			if (groupIndex >= 5) groupIndex -= 1;
			groups[groupIndex].push(obj);
		}
	});
	console.log({ groups, xMin, xMax, rangeSize, count: wallets.length });

	return { groups, xMin, xMax, rangeSize, count: wallets.length };
}

export function extractBucketsFix(wallets, value) {
	// Find the minimum and maximum supply values
	const supplies = wallets.map((obj) => obj[value]);
	const xMin = Math.min(...supplies);
	const xMax = Math.max(...supplies);

	// Initialize an array of empty groups
	const data = [0, 0, 0, 0, 0, 0];

	const labels = [1000, 5000, 10000, 50000, 1000000, xMax];

	// Assign each object to the corresponding group
	wallets.forEach((obj) => {
		if (obj) {
			var found = false;
			var index = 0;
			while (!found) {
				if (labels[index] >= obj[value]) {
					data[index] += 1;
					break;
				} else {
					index += 1;
				}
			}
		}
	});

	return { data, xMin, xMax, count: wallets.length, labels };
}

export function calculateStatistics(arr, property) {
	// Extract the supply values into a separate array
	const supplyValues = arr.map((obj) => obj[property]);

	// Calculate the mean
	const sum = supplyValues.reduce((acc, val) => acc + val, 0);
	const mean = sum / supplyValues.length;

	// Calculate the mode
	const counts = {};
	let mode = null;
	let maxCount = 0;

	for (const value of supplyValues) {
		counts[value] = (counts[value] || 0) + 1;
		if (counts[value] > maxCount) {
			maxCount = counts[value];
			mode = value;
		}
	}

	// Calculate the median
	supplyValues.sort((a, b) => a - b);
	const middleIndex = Math.floor(supplyValues.length / 2);
	const median =
		supplyValues.length % 2 === 0
			? (supplyValues[middleIndex - 1] + supplyValues[middleIndex]) / 2
			: supplyValues[middleIndex];

	return { mean, mode, median };
}

export function countCollateralAssetTypes(wallet, enumType) {
	const counts = {};

	for (const obj of wallet) {
		const enums = obj[enumType];

		if (enums && Array.isArray(enums)) {
			for (const enumValue of enums) {
				counts[enumValue] = (counts[enumValue] || 0) + 1;
			}
		}
	}

	return counts;
}
