"use strict";

import React from "react";
import { scaleTime } from "d3-scale";

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";

var { CandlestickSeries } = series;
var { XAxis, YAxis } = axes;
var { fitWidth } = helper;

class CandleStickChart extends React.Component {
	render() {
		var { type, width, data, ratio } = this.props;
		console.log("data ==== ", data.length, data)
		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={d => {
						if(!d){
							return new Date();
						}
						 console.log('dddd',d.date);
						 d.date
					}}
					xScale={scaleTime()}
					xExtents={[new Date(2012, 12, 16), new Date(2013, 4, 24)]}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={1}/>
					<YAxis axisAt="left" orient="left" ticks={1} />
					<CandlestickSeries />
				</Chart>
			</ChartCanvas>
		);
	}
}

CandleStickChart.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
