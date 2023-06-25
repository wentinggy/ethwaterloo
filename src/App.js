import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { Box } from "@mui/material";
import Dashboard from "./dashboard";
import Demographics from "./demographics";

export default function App() {
	const [address, setAddress] = useState("");
	const [tokenBalance, setTokenBalance] = useState(undefined);
	const [transfers, setTransfers] = useState(undefined);
	const [macroScore, setMacroScore] = useState(undefined);
	const [error, setError] = useState("");

	return (
		<Box>
			<Navbar
				setAddress={setAddress}
				setError={setError}
				setTokenBalance={setTokenBalance}
				setTransfers={setTransfers}
				setMacroScore={setMacroScore}
			/>
			<Dashboard
				error={error}
				tokenBalance={tokenBalance}
				transfers={transfers}
				macroScore={macroScore}
				address={address}
			/>
			<Demographics> </Demographics>
		</Box>
	);
}
