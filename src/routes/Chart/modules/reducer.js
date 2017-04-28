import merge from 'lodash/merge';
import 'whatwg-fetch'
import config from '../../../config'

// ------------------------------------ Constants
// ------------------------------------
export const CHART_UPDATE_STOCK_INFO = 'CHART_UPDATE_STOCK_INFO'
export const CHART_UPDATE_KLINE_LIST = 'CHART_UPDATE_KLINE_LIST'
export const CHART_DATA_REFRESH = 'CHART_DATA_REFRESH'
export const CHART_UPDATE_KLINE_TYPE = 'CHART_UPDATE_KLINE_TYPE'
export const CHART_MODAL_SHOW = 'CHART_MODAL_SHOW'
export const CHART_UPDATE_EXT_TYPE = 'CHART_UPDATE_EXT_TYPE'

// // ------------------------------------ // Actions //
// ------------------------------------ 更新 stockinfo
export const updateStockInfo = (code, info = {}) => ({type: CHART_UPDATE_STOCK_INFO, code: code, info: info})

// 更新股票k线
export const updateKline = (code, typ, data = []) => ({type: CHART_UPDATE_KLINE_LIST, code: code, typ: typ, data: data})

export const updateKlineType = (typ) => ({type: CHART_UPDATE_KLINE_TYPE, typ: typ})

export const modelShow = (show = false, msg = '') => ({type: CHART_MODAL_SHOW, isModalOpen: show, modalMsg: msg})
export const updateExtType = (typ = 'vol') => ({type: CHART_UPDATE_EXT_TYPE, typ: typ})

export const actions = {
  updateStockInfo,
  updateKline,
  updateKlineType,
  modelShow
}

export const fetchStockInfo = (code, typ = 'base') => {

  return (dispatch, getState) => {
    var data = new FormData()
    data.append('type', typ)
    data.append('code', code)

    return fetch(config.quoteUrl + '/quote/1/stock/info', {
      method: 'POST',
      body: data,
      mode: 'cors'
    }).then((response) => {
      switch (response.status) {
        case 200:
          return response
          break;
        case 911:
          return response
          break
        default:
          var error = new Error(response.statusText)
          throw error
          break;
      }
    }).then((response) => {
      return response.json()
    }).then((json) => {
      console.log("stockinfo", json)
      if (json.code && json.code != 200) {
        throw new Error(json.message)
      }

      if (!json.refresh) {
        return
      }

      dispatch(updateStockInfo(code, json.data))
    })
  }
}

export const fetchKlineList = (code,) => {
  return (dispatch, getState) => {

    console.log('getState', getState())

    const state = getState()

     let url = config.quoteUrl + '/quote/1/line/kline/curr'
    var data = new FormData()
    data.append('code', code)
    data.append('type', state.chart.showTyp)

    if (state.chart.showTyp == 'm1') {
        url = config.quoteUrl+'/quote/1/line/timeline'
        data.append('count', 0)
    }

    let kline = {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      date: null
    }

    return fetch(url, {
      method: 'POST',
      body: data,
      mode: 'cors'
    }).then((response) => {
      switch (response.status) {
        case 200:
          return response
          break;
        case 911:
          return response
          //                   response.json().then((json)=>{ console.log("911",json) var
          // error = new Error(json.message)                 error.response = response
          // throw error   })

          break
        default:
          var error = new Error(response.statusText)
          throw error
          break;
      }
    }).then((response) => {
      let json = response.json()
      console.log('kline json', json)
      return json
    }).then((json) => {
      if (json.code && json.code != 200) {
        throw new Error(json.message)
      }

      let data = json.data;
      let kdata = []
      for (var i = 0; i < data.length; i++) {
        var element = data[i];
        let item = {}
        item.open = +data[i][0] / 1000
        item.high = +data[i][1] / 1000
        item.low = +data[i][2] / 1000
        item.close = +data[i][3] / 1000
        item.volume = +data[i][4]
        let ds = new Date();
        ds.setTime(data[i][6] * 1000)

        item.date = ds
        // item['adj close'] = null
        console.log(item.date)
        kdata.push(item)
      }
      console.log('fetch data', kdata)
      dispatch(updateKline(code,state.chart.showTyp, kdata))
    }).catch((err) => {
      dispatch(modelShow(true, err + ''))
    })
  }
}

// ------------------------------------ Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHART_DATA_REFRESH]: (state, action) => {
    return merge({}, state, {data: action.payload})
  },

  [CHART_UPDATE_STOCK_INFO]: (state, action) => {
    let cInfos = state.infos
    cInfos[action.code] = action.info
    return merge({}, state, {info: cInfos})
  },
  [CHART_UPDATE_KLINE_LIST]: (state, action) => {
    let cKlines = state.klines
    if (!cKlines[action.code]) {
      cKlines[action.code] = {}
    }
    cKlines[action.code][action.typ] = action.data
    return merge({}, state, {klines: cKlines})
  },
  [CHART_UPDATE_KLINE_TYPE]: (state, action) => {
    return merge({}, state, {showTyp: action.typ})
  },
  [CHART_MODAL_SHOW]: (state, action) => {
    return merge({}, state, {
      isModalOpen: action.isModalOpen,
      modalMsg: action.modalMsg
    })
  },
  [CHART_UPDATE_EXT_TYPE]:(state,action) => {
    return merge({}, state, {
      extType: action.typ
    })
  }
}

// ------------------------------------ Reducer
// ------------------------------------
const initialState = {
  infos: {}, // 股票详情 {code:{info}}
  klines: {}, // k线详情 {code:{m1:[],day:[]}}
  showTyp: 'day', // 显示k线类型 m1,day.month.week
  isModalOpen: false,
  modalMsg: '',
  extType:'vol'
}
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler
    ? handler(state, action)
    : state
}
