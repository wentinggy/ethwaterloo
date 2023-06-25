import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { GradientTealBlue } from "@visx/gradient";

export default function BarChart({ data }) {
	const height = 500;
	const width = 500;
	const verticalMargin = 120;

	const getBucketFrequency = (b, totalCount) =>
		(Number(b.length) / totalCount) * 100;

	console.log(data);

	const xScale = useMemo(
		() =>
			scaleLinear({
				domain: [1.3, 2.2],
				range: [0, width],
				clamp: true,
			}),
		[width]
	);
	const yScale = useMemo(
		() =>
			scaleLinear({
				domain: [0.75, 1.6],
				range: [height, 0],
				clamp: true,
			}),
		[height]
	);
	return (
		<svg width={width} height={height}>
			<GradientTealBlue id="teal" />
			<rect width={width} height={height} fill="url(#teal)" rx={14} />
			<Group top={verticalMargin / 2}>
				{data.groups.map((d, index) => {
					// const letter = (d);
					const barWidth = xScale.bandwidth();
					const barHeight =
						data.yMax - (yScale(getBucketFrequency(d, data.count)) ?? 0);
					const barX = xScale(d.rangeSize * index);
					const barY = data.yMax - barHeight;
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
