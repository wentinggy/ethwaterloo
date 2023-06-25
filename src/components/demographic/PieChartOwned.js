import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartOwned({ datasets, label }) {
	const data = {
		labels: ["Owned", "Unowned"],
		datasets: [
			{
				label: null,
				data: datasets,
				backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
		],
	};
	return <Pie data={data} />;
}
