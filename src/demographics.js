import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchSparkWallets } from "./api/data";
import {
	calculateStatistics,
	countCollateralAssetTypes,
	extractBucketsFix,
} from "./util/dataCleaner";
import { BarSupply } from "./components/demographic/BarSupply";
import PieChart from "./components/demographic/PieChart";

export default function Demographics({ error, tokenBalance }) {
	const [wallets, setWallets] = useState([]);

	useEffect(() => {
		fetchSparkWallets(setWallets);
	}, []);

	if (wallets.length < 1) return <div />;

	const supplyStats = calculateStatistics(wallets, "supply");
	const borrowStats = calculateStatistics(wallets, "borrow");
	const collateralAssets = countCollateralAssetTypes(
		wallets,
		"collateral_assets"
	);
	const debtAssets = countCollateralAssetTypes(wallets, "debt_assets");
	console.log(collateralAssets);
	return (
		<>
			{!error && (
				<Box padding={"300px"}>
					<Box>
						<BarSupply
							walletData={extractBucketsFix(wallets, "supply")}
							title="User supply histogram"
							backgroundColor={"rgba(0, 99, 132, 0.5)"}
						></BarSupply>
						<Typography> {`Median: ${supplyStats.median}`} </Typography>
						<Typography> {`Mean: ${supplyStats.mean}`} </Typography>
					</Box>
					<Box paddingTop={"100px"}>
						<BarSupply
							walletData={extractBucketsFix(wallets, "borrow")}
							title="User borrow histogram"
							backgroundColor={"rgba(255, 99, 132, 0.5)"}
						></BarSupply>
						<Typography> {`Median: ${borrowStats.median}`} </Typography>
						<Typography> {`Mean: ${borrowStats.mean}`} </Typography>
					</Box>
					<Box paddingTop={"100px"}>
						{Object.entries(collateralAssets).map(([key, value]) => (
							<>
								<Typography> {key} </Typography>
								<PieChart
									datasets={[value, wallets.length - value]}
									label={key}
								></PieChart>
							</>
						))}
					</Box>
				</Box>
			)}
		</>
	);
}
