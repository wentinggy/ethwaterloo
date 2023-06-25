import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchSparkWallets } from "./api/data";
import { extractBuckets, extractValueLength } from "./util/dataCleaner";
import BarChart from "./components/demographic/BarChart";

export default function Demographics({ error, tokenBalance }) {
	const [wallets, setWallets] = useState([]);

	// fetchSparkWallets().then((res) => {
	// 	setWallets(res);
	// });

	if (wallets.length < 1) return <div />;

	// console.log(extractBuckets(wallets, "supply", 5));
	return (
		<>
			{!error && (
				<Box>
					{/* <BarChart data={extractBuckets(wallets, "supply", 5)} /> */}
				</Box>
			)}
		</>
	);
}
