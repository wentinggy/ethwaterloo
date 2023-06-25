import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { fetchSparkWallets } from "./api/data";
import { calculateStatistics, extractBucketsFix } from "./util/dataCleaner";
import BarChartSupply from "./components/demographic/BarChartSupply";

export default function Demographics({ error, tokenBalance }) {
	const [wallets, setWallets] = useState([]);

	useEffect(() => {
		fetchSparkWallets(setWallets);
	}, []);

	if (wallets.length < 1) return <div />;
	// console.log(extractBucketsFix(wallets, "supply"));
	console.log(calculateStatistics(wallets, "supply"));
	return (
		<>
			{!error && (
				<Box>
					<BarChartSupply data={extractBucketsFix(wallets, "supply")} />
				</Box>
			)}
		</>
	);
}
