import React , { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
} from 'amazeui-touch';
import CandleStickChart from './charts/CandleStickChartWithMACDIndicator'
import { timeParse } from "d3-time-format";
import { tsv } from "d3-request";
import { csvParse, tsvParse } from  "d3-dsv";
import  'whatwg-fetch';
// import TSVDATA from '../tsv/MSFT_full.tsv'

// import './tsv/MSFT_full.tsv'

 var parseDate = timeParse("%Y-%m-%d");

 function doParseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		return d;
	};
}


class Chart extends Component {
  constructor(props) {
    super(props);
  }

componentWillMount(){
      console.log('props', this.props)
    const {refresh,params} = this.props

    let url = 'https://v3quote.ktkt.com/quote/1/line/kline/curr'
    var data = new FormData()
    data.append('code', params.code)
    data.append('type', 'day')

    
    let kline = {open:0, high:0, low:0, close:0, volume:0, date:null}

    fetch(url,{
        method: 'POST',
        body: data,
        mode: 'cors',
    }).then((response)=>{
        switch (response.status) {
            case 200:
                return response
                break;
              case 911:
                  
                var error = new Error(response.json().message)
                error.response = response
                throw error
                break
        
            default:
                var error = new Error(response.statusText)
                error.response = response
                throw error
                break;
        }
    }).then((response)=>{
        return response.json()
    }).then((json)=>{
      let data = json.data;
        let kdata = []
        for (var i = 0; i < data.length; i++) {
          var element = data[i];
          let item = {}
          item.open = +data[i][0]/1000
          item.high = +data[i][1]/1000
          item.low = +data[i][2]/1000
          item.close = +data[i][3]/1000
          item.volume = +data[i][4]
          let ds = new Date();
          ds.setTime(data[i][6]*1000)
         
          item.date = ds
          // item['adj close'] = null
           console.log(item.date)
          kdata.push(item)
        }
        console.log('fetch data', kdata)
        refresh(kdata)
    }).catch((err)=>{
        console.log('fetch err', err)
    })
    return

      var promiseMSFTfull = fetch('http://rrag.github.io/stockcharts-demo/resources/data/MSFT_full.tsv')
		.then(response => response.text())
		.then(data => tsvParse(data, doParseData(parseDate)));
    promiseMSFTfull.then((data)=>{
      console.log('refresh ', data)
      /*
      {

      }
      */
        refresh(data)
    })
}


  render() {
      let type = 'svg';
     let width = 1280;
     let ratio = 1;

     const {data} = this.props
    console.log('data', data)
    if (data.length > 0){
 return (
          // <div>sdf</div>
            <CandleStickChart data={data} width={width} type={type} ratio={ratio} />
        )
    } else {
      return null;
    }
     
  }
}

// Chart.propTypes = {
//   list : PropTypes.array.isRequired,
// }

export default Chart
