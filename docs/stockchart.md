## stockchart文档

### ChartCanvas 默认属性值
```
ChartCanvas.propTypes = {
	width: _react.PropTypes.number.isRequired,
	height: _react.PropTypes.number.isRequired,
	margin: _react.PropTypes.object,
	ratio: _react.PropTypes.number.isRequired,
	// interval: PropTypes.oneOf(["D", "W", "M"]), // ,"m1", "m5", "m15", "W", "M"
	type: _react.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
	pointsPerPxThreshold: _react.PropTypes.number,
	data: _react.PropTypes.array.isRequired,
	// initialDisplay: PropTypes.number,
	// 其他线计算方式 calculator={[ema26, ema12, smaVolume50, macdCalculator]}
	calculator: _react.PropTypes.arrayOf(_react.PropTypes.func).isRequired,
	// X轴取值方法 xAccessor={d => d.date}
	xAccessor: _react.PropTypes.func,
	// X轴范围 [最值，最大值]
	xExtents: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	// xScale: PropTypes.func.isRequired,
	className: _react.PropTypes.string,
	seriesName: _react.PropTypes.string.isRequired,
	zIndex: _react.PropTypes.number,
	children: _react.PropTypes.node.isRequired,
	// X轴比例显示规则  xScaleProvider={discontinuousTimeScaleProvider}
	xScaleProvider: function xScaleProvider(props, propName /* , componentName */) {
		if ((0, _utils.isDefined)(props[propName]) && typeof props[propName] === "function" && (0, _utils.isDefined)(props.xScale)) {
			return new Error("Do not define both xScaleProvider and xScale choose only one");
		}
	},
	xScale: function xScale(props, propName /* , componentName */) {
		if ((0, _utils.isDefined)(props[propName]) && typeof props[propName] === "function" && (0, _utils.isDefined)(props.xScaleProvider)) {
			return new Error("Do not define both xScaleProvider and xScale choose only one");
		}
	},
	postCalculator: _react.PropTypes.func.isRequired,
	flipXScale: _react.PropTypes.bool.isRequired,
	useCrossHairStyleCursor: _react.PropTypes.bool.isRequired,
	drawMode: _react.PropTypes.bool.isRequired,
	padding: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
		left: _react.PropTypes.number,
		right: _react.PropTypes.number
	})]).isRequired,
	defaultFocus: _react.PropTypes.bool,
	zoomMultiplier: _react.PropTypes.number.isRequired,
	onLoadMore: _react.PropTypes.func,
	displayXAccessor: _react.PropTypes.func,
	mouseMoveEvent: _react.PropTypes.bool.isRequired,
	panEvent: _react.PropTypes.bool.isRequired,
	zoomEvent: _react.PropTypes.bool.isRequired,
	onSelect: _react.PropTypes.func
};


ChartCanvas.defaultProps = {
    // margin值
	margin: { top: 20, right: 30, bottom: 30, left: 80 }, 
	indexAccessor: function indexAccessor(d) {
		return d.idx;
	},
	indexMutator: function indexMutator(d, idx) {
		return _extends({}, d, { idx: idx });
	},
	map: _utils.identity,
    // 显示类型  svg or hybrid
	type: "hybrid",

	pointsPerPxThreshold: 2,
	calculator: [],
	className: "react-stockchart",
	zIndex: 1,
	
	xExtents: [_d3Array.min, _d3Array.max],
	// dataEvaluator: evaluator,
	postCalculator: _utils.identity,
	padding: 0,
	xAccessor: _utils.identity,
	flipXScale: false,
	useCrossHairStyleCursor: true,
	drawMode: false,
	defaultFocus: true,
	onLoadMore: _utils.noop,
	onSelect: _utils.noop,
	mouseMoveEvent: true,
	panEvent: true,
	zoomEvent: true,
	zoomMultiplier: 1.1
};
```

### Chart 默认属性
```
Chart.propTypes = {
	height: _react.PropTypes.number,
	width: _react.PropTypes.number,
	origin: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]).isRequired,
	id: _react.PropTypes.number.isRequired,
	// Y轴范围 多根线返回多组 yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]}
	yExtents: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.func]),
	yExtentsCalculator: function yExtentsCalculator(props, propName, componentName) {
		if ((0, _utils.isNotDefined)(props.yExtents) && typeof props.yExtentsCalculator !== "function") return new Error("yExtents or yExtentsCalculator must" + (" be present on " + componentName + ". Validation failed."));
	},
	onContextMenu: _react.PropTypes.func.isRequired,
	yScale: _react.PropTypes.func.isRequired,
	yMousePointerDisplayLocation: _react.PropTypes.oneOf(["left", "right"]),
	yMousePointerDisplayFormat: _react.PropTypes.func,
	flipYScale: _react.PropTypes.bool.isRequired,
	padding: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.shape({
		top: _react.PropTypes.number,
		bottom: _react.PropTypes.number
	})]).isRequired,
	children: _react.PropTypes.node
};

Chart.defaultProps = {
	id: 0,
	// 相对ChartCanvas的位置 origin={(w, h) => [0, h - 300]}
	origin: [0, 0],
	padding: 0,
	yScale: (0, _d3Scale.scaleLinear)(),
	flipYScale: false,
	yPan: true,
	onContextMenu: _utils.noop
};
```


### 显示十字光标 CrossHairCursor MouseCoordinateY
- CrossHairCursor 与 Chart同级 
```
<MouseCoordinateX
	at="bottom"
	orient="bottom"
	displayFormat={timeFormat("%Y-%m-%d")} />
<MouseCoordinateY
	at="right"
	orient="right"
	displayFormat={format(".2f")} />


<CrossHairCursor />
```

### 光标选中数据显示
```
<OHLCTooltip origin={[-40, 0]}/>
```

### 单独显示指定数据 SingleValueTooltip

```
<SingleValueTooltip
	xLabel="Date" /* xLabel is optional, absense will not show the x value */ yLabel="C"
	yAccessor={d => d.close}
	xDisplayFormat={timeFormat("%Y-%m-%d")} yDisplayFormat={format(".2f")}
	/* valueStroke="green" - optional prop */
	/* labelStroke="#4682B4" - optional prop */
	origin={[-40, 0]}/>
```

### 显示均线 LineSeries CurrentCoordinate 选中线上的点
- yAccessor 访问y值
- stroke 颜色
- strokeDasharray 线的类型
```
<LineSeries
yAccessor={d => d.AAPLClose}
stroke="#ff7f0e"
strokeDasharray="Dot" />

<LineSeries yAccessor={ema20.accessor()} stroke={ema20.stroke()}/>
					
<CurrentCoordinate yAccessor={ema20.accessor()} fill={ema20.stroke()} />
					
```

### 均线选中数据显示 MovingAverageTooltip
```
<MovingAverageTooltip onClick={(e) => console.log(e)} origin={[-38, 15]}
						calculators={[ema20, ema50]}/>
```

### EdgeIndicator 左右两边显示最新价
```
<EdgeIndicator itemType="last" orient="right" edgeAt="right"
	yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>
<EdgeIndicator itemType="first" orient="left" edgeAt="left"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>*/}

```



### 蜡烛图 
xScaleProvider={discontinuousTimeScaleProvider}
// 指定x范围
xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>

```
class CandleStickStockScaleChart extends React.Component {
	render() {
		var { type, data, width, ratio } = this.props;

		return (
			<ChartCanvas ratio={ratio} width={width} height={400}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					<CandlestickSeries />
				</Chart>
			</ChartCanvas>
		);
	}
}
```

### 成交量 BarSeries
- fill 填颜色
```
<Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
        <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
        <BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
    </Chart>
```

### Y轴值 YAxis
- ticks 显示个数
- showTicks 是否显示
- tickFormat 显示格式

```
 <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
```

### 跟随显示行情信息 HoverTooltip 
- chart同级
```
<HoverTooltip
					chartId={1}
					yAccessor={ema50.accessor()}
					tooltipContent={tooltipContent([ema20, ema50])}
					fontSize={15} />
```