import React, { useMemo } from "react";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { GradientPinkRed } from "@visx/gradient";
import { scaleLinear } from "@visx/scale";

export default function LineGraph({ points }) {
	const height = 500;
	const width = 500;

	console.log(points);

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
		<div>
			<svg width={width} height={height}>
				<GradientPinkRed id="dots-pink" />
				{/** capture all mouse events with a rect */}
				<rect width={width} height={height} rx={14} fill="url(#dots-pink)" />
				<Group pointerEvents="none">
					{points.map((point, i) => (
						<Circle
							key={`point-${point[0]}-${i}`}
							className="dot"
							cx={xScale(point["x"])}
							cy={yScale(point["y"])}
							r={i % 3 === 0 ? 2 : 3}
							fill={"#f6c431"}
						/>
					))}
				</Group>
			</svg>
		</div>
	);
}
