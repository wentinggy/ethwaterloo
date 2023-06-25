import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import { fetchSparkWallets } from "./api/data";
import {
	calculateStatistics,
	countCollateralAssetTypes,
	extractBucketsFix,
} from "./util/dataCleaner";
import { BarSupply } from "./components/demographic/BarSupply";
import PieChartOwned from "./components/demographic/PieChartOwned";
import ValueCard from "./components/card";

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
	console.log(wallets);
	return (
		<>
			{!error && (
				<Container>
					<Grid container spacing={2} sx={{ py: 2 }}>
						<Grid item xs={6}>
							<Card>
								<CardContent paddingTop={"100px"}>
									<Box>
										<BarSupply
											walletData={extractBucketsFix(wallets, "supply")}
											title="User Supply Histogram ($USD)"
											backgroundColor={"rgba(0, 99, 132, 0.5)"}
										></BarSupply>
										<Typography> {`Median: ${supplyStats.median}`} </Typography>
										<Typography> {`Mean: ${supplyStats.mean}`} </Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={6}>
							<Card>
								<CardContent paddingTop={"100px"}>
									<Box>
										<BarSupply
											walletData={extractBucketsFix(wallets, "borrow")}
											title="User Borrow Histogram ($USD)"
											backgroundColor={"rgba(255, 99, 132, 0.5)"}
										></BarSupply>
										<Typography> {`Median: ${borrowStats.median}`} </Typography>
										<Typography> {`Mean: ${borrowStats.mean}`} </Typography>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Typography> Collateral Asset Types Owned</Typography>
					<Grid container spacing={2} sx={{ py: 2 }}>
						{Object.entries(collateralAssets).map(([key, value]) => (
							<>
								<Grid item xs={3}>
									<ValueCard
										key={key}
										title={key}
										graph={
											<PieChartOwned
												datasets={[value, wallets.length - value]}
												label={key}
											></PieChartOwned>
										}
									/>
								</Grid>
							</>
						))}
					</Grid>

					<Box paddingTop={"100px"}>
						<Typography> Debt Asset Types Owned</Typography>
						<Grid container spacing={2} sx={{ py: 2 }}>
							{Object.entries(debtAssets).map(([key, value]) => (
								<>
									<Grid item xs={3}>
										<ValueCard
											key={key}
											title={key}
											graph={
												<PieChartOwned
													datasets={[value, wallets.length - value]}
													label={key}
												></PieChartOwned>
											}
										/>
									</Grid>
								</>
							))}
						</Grid>
					</Box>
				</Container>
			)}
		</>
	);
}
