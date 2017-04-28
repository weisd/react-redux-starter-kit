"use strict";

import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";


var { CandlestickSeries, BarSeries, LineSeries, AreaSeries, MACDSeries,RSISeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, CurrentCoordinate } = coordinates;
var { EdgeIndicator } = coordinates;

var { OHLCTooltip, MovingAverageTooltip, HoverTooltip ,MACDTooltip,RSITooltip,SingleValueTooltip} = tooltip;
var { XAxis, YAxis } = axes;
var { ema, sma, heikinAshi,macd,rsi } = indicator;
var { fitWidth } = helper;

var dateFormat = timeFormat("%Y-%m-%d");
var numberFormat = format(".2f");
var minuteFormat = timeFormat("%H:%M")

function tooltipContent(calculators) {
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{ label: "open", value: currentItem.open && numberFormat(currentItem.open) },
				{ label: "high", value: currentItem.high && numberFormat(currentItem.high) },
				{ label: "low", value: currentItem.low && numberFormat(currentItem.low) },
				{ label: "close", value: currentItem.close && numberFormat(currentItem.close) },
			]
			.concat(calculators.map(each => ({
				label: each.tooltipLabel(),
				value: numberFormat(each.accessor()(currentItem)),
				stroke: each.stroke()
			})))
			.filter(line => line.value)
		};
	};
}

class HeikinAshi extends React.Component {
	render() {
		var { data, type, width, ratio,extType,chatType } = this.props;

		var firstClose = data[0].close

		var ha = heikinAshi();
		var ema20 = ema()
			.id(0)
			.windowSize(20)
			.merge((d, c) => { d.ema20 = c; })
			.accessor(d => d.ema20);

		var ema50 = ema()
			.id(2)
			.windowSize(50)
			.merge((d, c) => {d.ema50 = c})
			.accessor(d => d.ema50);

		var smaVolume50 = sma()
			.id(3)
			.windowSize(50)
			.sourcePath("volume")
			.merge((d, c) => {d.smaVolume50 = c})
			.accessor(d => d.smaVolume50);
		var macdCalculator = macd()
			.fast(20)
			.slow(50)
			.signal(9)
			.merge((d, c) => {d.macd = c;})
			.accessor(d => d.macd);

		var rsiCalculator = rsi()
			.windowSize(14)
			.merge((d, c) => {d.rsi = c})
			.accessor(d => d.rsi);



	   var renderExtChart = ()=>{

		   switch (extType) {
			   case 'vol':
				    return (
						<Chart id={3} origin={(w, h) => [0, h - 110]} height={80} yExtents={d => d.volume}>
							{/*<XAxis axisAt="bottom" orient="bottom"/>*/}
							<YAxis axisAt="left" orient="right" ticks={5} tickFormat={format(".0s")}/>
							<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
						</Chart>
					)
				   break;
		      case 'macd':
			  return (
				  <Chart id={4} height={80}
						yExtents={macdCalculator.accessor()}
						origin={(w, h) => [0, h - 110]} padding={{ top: 0, bottom: 0 }} >
					{/*<XAxis axisAt="bottom" orient="bottom"/>*/}
					<YAxis axisAt="right" orient="right" ticks={2} />

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<MACDSeries calculator={macdCalculator} />
					<MACDTooltip origin={[0, 0]} calculator={macdCalculator}/>
				</Chart>
			  )
			  case 'rsi':
			  return (
				  <Chart id={5} 
						yExtents={rsiCalculator.domain()}
						height={80} origin={(w, h) => [0, h - 110]} >
					<YAxis axisAt="right" orient="right" ticks={2} tickValues={rsiCalculator.tickValues()}/>
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<RSISeries calculator={rsiCalculator} />

					<RSITooltip origin={[0, 0]} calculator={rsiCalculator}/>
				</Chart>
			  )
			   default:
				   break;
		   }

		   return null;
	   } 

	   var renderDayChart = (
		   <ChartCanvas ratio={ratio} width={width} height={320}
					margin={{left: 30, right: 30, top:0, bottom: 0}} type={type}
					seriesName="MSFT2"
					data={data} calculator={[ha, ema20, ema50, smaVolume50,macdCalculator,rsiCalculator]}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					>

		   <Chart id={1} height={200}
						yExtents={[d => [d.high, d.low], ema20.accessor(), ema50.accessor()]}
						padding={{ top: 10, bottom: 20 }}>
					<XAxis axisAt="bottom" orient="top"/>
					<YAxis axisAt="right" orient="right" ticks={4} />
					<YAxis axisAt="left" orient="left" ticks={4} />
					<MouseCoordinateY
						at="right"
						orient="left"
						displayFormat={format(".1f")} />

					<CandlestickSeries />
					<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					<LineSeries yAccessor={ema50.accessor()} stroke={ema50.stroke()}/>

					<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					<CurrentCoordinate yAccessor={ema50.accessor()} fill={ema50.stroke()} />

					
					<OHLCTooltip origin={[0, 10]}/>
					<MovingAverageTooltip onClick={(e) => console.log(e)} origin={[0, 20]}
						calculators={[ema20, ema50]}
						fontSize={10}
						/>
				</Chart>
				{renderExtChart()}
			<CrossHairCursor />
			</ChartCanvas>
	   )

	   var m1MainChart = (
		   <ChartCanvas ratio={ratio} width={width} height={320}
					margin={{left: 0, right: 0, top:0, bottom: 0}} type={type}
					seriesName="MSFT1"
					data={data} calculator={[ha, ema20, ema50, smaVolume50,macdCalculator,rsiCalculator]}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					>
		   <Chart id={2} height={200}
						yExtents={d => {
							if(d.close == 0){
								return [firstClose,firstClose]
							}
							return [d.high, d.low]
						} }
						>
					<XAxis axisAt="bottom" orient="bottom"  ticks={6} tickFormat={d=>{
						return `${data[d].date.getHours()}:${data[d].date.getMinutes()}`						}} />
					<YAxis axisAt="left" orient="right" ticks={5} />
					<YAxis axisAt="right" orient="left" ticks={5} tickFormat={d=>{
							return numberFormat((d-firstClose)/firstClose*100)+'%'
						}} />

					<MouseCoordinateX
						at="bottom"
						orient="top"
						displayFormat={timeFormat("%H:%M")} />
					<MouseCoordinateY
						at="right"
						orient="left"
						displayFormat={format(".2f")} />

					<AreaSeries yAccessor={d => {
						if(d.close == 0){
							return
						}

						return d.close
					} }/>
					<LineSeries
					yAccessor={d => firstClose}
					stroke="#ff7f0e"
					strokeDasharray="Dot" />
					<SingleValueTooltip

						yLabel="C"
						yAccessor={d => d.close}

						yDisplayFormat={format(".2f")}
						/* valueStroke="green" - optional prop */
						/* labelStroke="#4682B4" - optional prop */
						origin={[50, 10]}/>
					<SingleValueTooltip
						yLabel="Volume" yAccessor={(d) => d.volume}
						origin={[100, 10]}/>
				</Chart>
				{renderExtChart()}
			<CrossHairCursor />
			</ChartCanvas>
	   )

	   var renderMainChart = () => {

		switch(chatType){
			case 'm1':
			return m1MainChart;
			break
			case 'day':
			case 'week':
			case 'month':
			return renderDayChart
		}
	   }
	  

		return renderMainChart()
			
				
				
					
			
	}
}

HeikinAshi.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	extType:React.PropTypes.oneOf(['macd','vol','rsi']).isRequired,
};

HeikinAshi.defaultProps = {
	type: "svg",
	extType: 'vol',
	chatType: 'm1',
};

HeikinAshi = fitWidth(HeikinAshi);

export default HeikinAshi;
