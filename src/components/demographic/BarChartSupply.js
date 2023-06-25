import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { GradientTealBlue } from "@visx/gradient";

export default function BarChartSupply({ data }) {
	const height = 500;
	const width = 500;
	const verticalMargin = 120;

	const getBucketFrequency = (d) => {
		return d.wallets.length / 20;
	};

	return (
		<svg width={width} height={height}>
			<GradientTealBlue id="teal" />
			<rect width={width} height={height} fill="url(#teal)" rx={14} />
			<Group top={verticalMargin / 2}>
				{data.groups.map((d, index) => {
					// const letter = (d);
					const barWidth = (width - 100) / data.groups.length;
					const barHeight = height * getBucketFrequency(d, data.count);
					const barX = (index / data.groups.length) * (width - 100);
					const barY = height - barHeight;
					console.log(barHeight, barX, barY);

					return (
						<Bar
							key={`bar-${index}`}
							x={barX + 50}
							y={barY}
							width={barWidth}
							height={barHeight}
							fill="rgba(23, 233, 217, .5)"
						/>
					);
				})}
			</Group>
		</svg>
	);
}
