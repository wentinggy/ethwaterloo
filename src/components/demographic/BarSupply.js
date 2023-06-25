import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export function BarSupply({ walletData, title, backgroundColor }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	const data = {
		labels: walletData.labels,
		datasets: [
			{
				label: title,
				data: walletData.data,
				backgroundColor,
			},
		],
	};
	return <Bar options={options} data={data} />;
}
