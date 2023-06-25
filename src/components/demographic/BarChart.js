import React from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { GradientTealBlue } from "@visx/gradient";

export default function BarChart({ data }) {
	const height = 500;
	const width = 500;
	const verticalMargin = 120;

	const getBucketFrequency = (d, totalCount) => {
		return d.length / totalCount;
	};

	return (
		<svg width={width} height={height}>
			<GradientTealBlue id="teal" />
			<rect width={width} height={height} fill="url(#teal)" rx={14} />
			<Group top={verticalMargin / 2}>
				{data.groups.map((d, index) => {
					// const letter = (d);
					const barWidth = 20;
					const barHeight = height * getBucketFrequency(d, data.count);
					const barX = ((data.rangeSize * index) / data.xMax) * width;
					const barY = height - barHeight;
					return (
						<Bar
							key={`bar-${index}`}
							x={barX}
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
