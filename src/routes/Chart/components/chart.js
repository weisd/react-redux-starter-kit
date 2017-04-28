import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Card,
  View,
  Modal,
  Grid,
  Col
} from 'amazeui-touch';
import CandleStickChart from './charts/M1Kline'
import {timeParse} from "d3-time-format";
import {tsv} from "d3-request";
import {csvParse, tsvParse} from "d3-dsv";
import 'whatwg-fetch';
// import {fetchStockInfo} from '../modules/reducer' import TSVDATA from
// '../tsv/MSFT_full.tsv' import './tsv/MSFT_full.tsv'

var parseDate = timeParse("%Y-%m-%d");

function doParseData(parse) {
  return function (d) {
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
  // constructor(props) {   super(props); }

  componentWillMount() {

    console.log('props', this.props)
    const {fetchStockInfo, fetchKlineList, params} = this.props

    const code = params.code

    fetchStockInfo(code, 'all')
    fetchKlineList(code)
  }

  renderKline() {
    console.log('this.refs.chartBox', this.refs.chartBox)
    let type = 'svg';
    let width = window.innerWidth;
    let ratio = 1;

    const {infos, klines, showTyp,extType, params} = this.props
    console.log('data', infos, klines, showTyp, params)

    let klineData = []

    if (klines[params.code]) {
      if (klines[params.code][showTyp]) {
        klineData = klines[params.code][showTyp]
      }
    }

    console.log('klineData',showTyp,  klineData)

    

    if (klineData.length > 0) {
      if(showTyp == 'm1'){
        // klineData.shift()
      
        let lastDate = klineData[klineData.length - 1].date;
        let endDate = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate(),15,0);
        let time12 = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate(),12,0);
        let time13 = new Date(lastDate.getFullYear(),lastDate.getMonth(),lastDate.getDate(),13,0);
        
        let nextTime = new Date()
        nextTime.setTime(lastDate.getTime())
       
        while (true) {
 
          let newDate = new Date()
          newDate.setTime( nextTime.getTime() + 60000)

          let info = {open:0,close:0,high:0,low:0,volume:0,date:newDate}

         
         if (newDate.getTime() > time12.getTime() && newDate.getTime() < time12.getTime() ){
            nextTime.setTime(time13.getTime())
            continue
         }

          if(newDate.getTime() > endDate.getTime()){

            break;
          }

           klineData.push(info)


          
          nextTime.setTime(newDate.getTime())

        }



console.log("add m1 klineData", klineData)

      }


      
      return (<CandleStickChart chatType={showTyp} extType={extType} data={klineData} width={width} type={type} ratio={ratio}/>)
    }

    return (
      <div>loading</div>
    );
  }

  closeModal() {
    console.log('close', this.props)
    const {modelShow} = this.props
    modelShow(false, '')
  }

  renderModal() {
    const {isModalOpen, modalMsg} = this.props
    console.log('isModalOpen', isModalOpen)
    return (
      <Modal
        role='alert'
        isOpen={isModalOpen}
        title="错误提示"
        onDismiss={this
        .closeModal
        .bind(this)}>
        {modalMsg}
      </Modal>
    )
  }

  // stock info
  renderStockInfo() {
    const {infos, params} = this.props

    let info = {
      "name": "",
      "code": "",
      "inc": 0,
      "incrate": 0,
      "preclose": 0,
      "open": 0,
      "close": 0,
      "high": 0,
      "low": 0,
      "vol": 0,
      "turnrate": 0,
      "amount": 0,
      "status": "读取中",
      "time": 0
    }

    if (infos[params.code]) {
      info = infos[params.code]
    }

    return (
      <Grid>
        <Col>{info.name}({info.code})</Col>
        <Col>{info.close}</Col>
      </Grid>
    )
  }

  changeKlinetype(typ) {
    console.log('props', this)
    const {fetchKlineList, updateKlineType, params, showTyp} = this.props;

    if (typ == showTyp) {
      return
    }
    updateKlineType(typ)
    fetchKlineList(params.code)
  }

  renderKlineType() {
    const typs = [
      {
        key: "m1",
        title: "分时"
      }, {
        key: "day",
        title: "日"
      }, {
        key: "week",
        title: "周"
      }, {
        key: "month",
        title: "月"
      }
    ];
    return (
      <Grid>
        {typs.map((item) => {
          return <Col
            key={item.key}
            onClick={this
            .changeKlinetype
            .bind(this, item.key)}>{item.title}</Col>
        })}
      </Grid>
    )
  }

  changeExtType(typ){
    const {updateExtType} = this.props
    if (typ == '') {
      return
    }
    updateExtType(typ)
  }

  renderExtList(){

    const typs = [
      {
        key: "vol",
        title: "volume"
      }, {
        key: "macd",
        title: "macd"
      }, {
        key: "rsi",
        title: "rsi"
      },{
        key:'',
        title:''
      }
    ];
    return (
      <Grid>
        {typs.map((item) => {
          return <Col
            key={item.key}
            onClick={this
            .changeExtType
            .bind(this, item.key)}>{item.title}</Col>
        })}
      </Grid>
    )
  }
  render() {

    return (
      <Container scrollable ref="chartBox">
        {this.renderStockInfo()}
        {this.renderKlineType()}
        {this.renderKline()}
        {this.renderExtList()}
        {this.renderModal()}
      </Container>
    )

  }
}

// Chart.propTypes = {   list : PropTypes.array.isRequired, }

export default Chart
