import React, { Component } from 'react'
import classNames from 'classnames' //样式类合并器
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { CaretRightOutlined } from '@ant-design/icons'
import './style.scss'
import CountUp from 'react-countup'
import JsSeamlessScroll from '../../components/JsSeamlessScroll'
import data from './data'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

// 获取静态资源
const getImageUrl = (name: string) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}
type StateType = {
  fundsLatitudeObj: {
    yearTotal: number,
    restore: number,
    area: object,
  },
  nowTime: any[],
  showMaxMap: boolean,
  petitionModelTypeId: string,
  areaMapTitle: string,
  areaId: string,
  areaMapTabIndex: number,
  areaMapList: any[],
  maxMapObj: any,
  dayTime: string,
  trendContrastList: object[],
  typeImgList: any[],
  contrastList: any[],
  conditionsObj: {
    total: number,
    model: any[],
  },
  hotAttentionList: object[],
  modelTypeList: object[],
  warningObj: {
    redCount: number,
    yellowCount: number,
  },
  warningConditionObj: {
    red: any[],
    yellow: any[],
  },
  listData: any[],
  frequencyList: any[],
}
type PropType = {
}
class letterVisit extends Component<PropType, StateType> {
  constructor(props: PropType | Readonly<PropType>) {
    super(props)
    this.state = {
      ...data,
      nowTime: [
        dayjs(new Date()).format('YYYY-MM-DD').split('-'),
        dayjs(new Date()).format('HH:mm:ss'),
      ],
    }
  }

  // 增长趋势图
  leftChartBoxOne() {
    let keys = Object.keys(this.state.fundsLatitudeObj.area)
    let values = Object.values(this.state.fundsLatitudeObj.area)
    let colors = [
      ['#0262FD', '#022A7A'],
      ['#FA7524', '#232A5A'],
      ['#712CDD', '#081C65'],
      ['#BF702B', '#2E2B51'],
      ['#5FBF9B', '#163866'],
      ['#C7A122', '#24294D'],
      ['#82D1C4', '#44738E'],
      ['#5BBABF', '#0D2360'],
      ['#499DD1', '#132D70'],
      ['#57CE45', '#112E4D'],
    ]
    let datas: any[] = []
    values.map((item: string, index: number) => {
      datas.push({
        value: item,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[index][0] },
            { offset: 1, color: colors[index][1] },
          ]),
        },
      })
    })
    let myChart = echarts.init(document.getElementById('leftChartOne'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '40',
        left: '10',
        right: '10',
        bottom: '10',
        containLabel: true,
      },
      color: ['#F3921F'],
      xAxis: [
        {
          type: 'category',
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          data: keys,
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '万元',
          nameTextStyle: {
            color: '#fff',
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
            },
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 16,
          data: datas,
        },
      ],
    })
  }
  // 地图模型类型切换
  modelTypeFn(id: string) {
    this.setState({
      showMaxMap: false,
    })
    if (this.state.petitionModelTypeId != id) {
      this.setState({
        petitionModelTypeId: id,
      })
    }
  }
  // 地图切换
  areaMapTabFn(index: number, item: { title: string }) {
    if (this.state.areaMapTabIndex != index) {
      this.setState({
        areaMapTabIndex: index,
        areaMapTitle: item.title,
        areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
      })
      if (index != 1) {
        this.setState({
          maxMapObj: item,
          showMaxMap: true,
        })
      }
    } else {
      this.cancelMap()
    }
  }
  // 取消选中地图
  cancelMap() {
    this.setState({
      areaMapTabIndex: 0,
      areaMapTitle: '',
      areaId: '',
    })
  }
  getNowTime() {
    this.setState({
      nowTime: [
        dayjs(new Date()).format('YYYY-MM-DD').split('-'),
        dayjs(new Date()).format('HH:mm:ss'),
      ],
    })
  }
  getDayFn() {
    let index = new Date().getDay()
    let time = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六',
    ]
    this.setState({
      dayTime: time[index],
    })
  }
  // 历年预警趋势对比
  rightChartBoxOne() {
    let data: any[] = this.state.trendContrastList
    let xData: object[] = [],
      xDataBar: object[] = [],
      arr: object[] = []
    let colors = [
      ['#0262FD', '#022A7A'],
      ['#FA7524', '#232A5A'],
      ['#712CDD', '#081C65'],
      ['#BF702B', '#2E2B51'],
      ['#9EC857', '#182550'],
    ]
    for (let i = 0; i < Math.ceil(data.length / 5); i++) {
      colors = colors.concat(colors)
    }
    data.map((item: any, index: number) => {
      xData.push(item.year)
      arr.push(item.count)
      xDataBar.push({
        value: item.count,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: colors[index][0] },
            { offset: 1, color: colors[index][1] },
          ]),
        },
      })
    })
    let myChart = echarts.init(document.getElementById('rightChartOne'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        // padding: 0,
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
        formatter: function (val: any[]) {
          let index = val[0].dataIndex
          let list = data[index].areaJson
          let keys = Object.keys(list)
          let values = Object.values(list)
          var text = `<div class="flex-row row-between" style="color:#00F0FF">丽水市 <span style="margin-left:10px">${data[index].count}条</span></div>`
          keys.map((item, idx) => {
            text += `<div class="flex-row row-between">${item} <span style="margin-left:10px">${values[idx]}</span></div>`
          })
          return `<div >${text}</div>`
        },
      },
      grid: {
        top: '30',
        left: '10',
        right: '10',
        bottom: '10',
        containLabel: true,
      },
      color: ['#F3921F'],
      xAxis: [
        {
          type: 'category',
          axisTick: {
            //刻度线
            show: false,
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
          data: xData,
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '条',
          nameTextStyle: {
            color: '#fff',
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 12,
              formatter: '{value}',
            },
          },
          axisLine: {
            show: false,
          },
          //网格线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#525885',
              type: 'dotted',
            },
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 16,
          data: xDataBar,
        },
        {
          data: arr,
          type: 'line',
          smooth: true,
          symbolSize: 8,
          color: '#0E9CFF',
        },
      ],
    })
  }
  // 热点关注
  hotAttention() {
    let data: any[] = this.state.hotAttentionList
    let datas: object[] = []
    data.splice(data.length - 20).map((item, index) => {
      let colorStr = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      datas.push({
        name: item.name + '\n' + item.value,
        value: item.value,
        symbolSize: Number(60) + index * 2,
        draggable: true,
        itemStyle: {
          normal: {
            // borderColor: colorStr,
            // borderWidth: 4,
            // shadowBlur: 100,
            // shadowColor: colorStr,
            color: colorStr,
          },
        },
      })
    })
    let myChart = echarts.init(document.getElementById('hot-attention'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    myChart.setOption({
      animationDurationUpdate: function (idx) {
        // 越往后的数据延迟越大
        return idx * 100
      },
      animationEasingUpdate: 'bounceIn',
      color: ['#fff', '#fff', '#fff'],
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 200,
            edgeLength: 10,
          },
          roam: true,
          label: {
            normal: {
              show: true,
              lineHeight: 18,
            },
          },
          data: datas,
        },
      ],
    })
  }
  changeTimeFn() { }

  componentDidMount() {
    let contrastList: any[] = this.state.contrastList
    contrastList.map((item, index) => {
      return (item.iconImg = getImageUrl(this.state.typeImgList[index]))
    })
    this.setState({
      contrastList,
    })
    this.leftChartBoxOne()
    setInterval(() => this.getNowTime(), 1000)
    this.getDayFn()
    this.rightChartBoxOne()
    this.hotAttention()
  }

  render() {
    return (
      <div className="letter-visit">
        <div className="screen-wrap">
          <div className="head-bar">
            <div className="title">
              丽水市<span>信访领域</span>大数据监督应用
            </div>
          </div>
          <div className="content">
            <div className="main-side">
              <div className="left-side">
                <div className="flex-row col-center row-center">
                  <div className="year flex-row col-center row-center">
                    <div className="all">全部</div>
                    <RangePicker
                      bordered={false}
                      inputReadOnly={true}
                      picker="year"
                      onChange={this.changeTimeFn}
                    />
                  </div>
                  <div className="city">
                    丽水市{this.state.areaMapTitle ? ' ·' : ''}
                    <span>{this.state.areaMapTitle}</span>
                  </div>
                </div>
                <div className="side-box mt">
                  <div className="toptitle">
                    <span>主要情况</span>
                  </div>
                  <div className="inner">
                    <div className="petition-number flex-row col-center">
                      <div className="icon">
                        <img
                          src={getImageUrl('letter-visit/petition-icon.png')}
                          alt=""
                        />
                      </div>
                      <div className="flex-col">
                        <div className="text">总上访次数</div>
                        <div className="text">
                          <span className="number">
                            <CountUp
                              start={0}
                              end={this.state.conditionsObj.total}
                              duration={3}
                              redraw={false}
                              separator=","
                            />
                          </span>
                          次
                        </div>
                      </div>
                    </div>
                    <div className="petition-list flex-row">
                      {this.state.conditionsObj.model.map((item, index) => (
                        <div className="item flex-col row-center" key={index}>
                          <p>
                            <span className="number">{item.count}</span>次
                          </p>
                          <p className="omit">{item.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="petition-total">
                      年度总化解专项资金
                      <span className="number">
                        <CountUp
                          start={0}
                          end={this.state.fundsLatitudeObj.yearTotal}
                          duration={3}
                          redraw={false}
                          separator=","
                        />
                      </span>
                      元
                    </div>
                    <div className="chart-box">
                      <div
                        id="leftChartOne"
                        style={{ width: '100%', height: '100%' }}
                      ></div>
                    </div>
                    <div className="capital-total flex-row row-center col-center">
                      <span>
                        挽回化解
                        <br />
                        专项资金
                      </span>
                      <span className="number">
                        {' '}
                        <CountUp
                          start={0}
                          end={this.state.fundsLatitudeObj.restore}
                          duration={3}
                          redraw={false}
                          separator=","
                        />
                      </span>
                      <span>
                        <br />元
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="middle-side">
                <div className="total-list flex-row">
                  {this.state.modelTypeList.map((item: any, index: number) => (
                    <div className="item flex-row col-center" key={index}>
                      <div className="icon flex-row col-center row-center">
                        <img
                          src={getImageUrl('letter-visit/shixiangbanli.png')}
                          alt=""
                        />
                      </div>
                      <div className="flex-col">
                        <div className="number">
                          <CountUp
                            start={0}
                            end={item.count}
                            duration={2}
                            redraw={false}
                            separator=","
                          />
                        </div>
                        <div className="name">{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="map-side flex-row row-between">
                  <div className="type">
                    <div className="title">
                      <span>各区县信访类型</span>
                    </div>
                    <div
                      className={classNames(
                        this.state.petitionModelTypeId == '' ? 'active' : '',
                        'item',
                        'flex-row',
                        'row-between',
                        'col-center'
                      )}
                      onClick={() => this.modelTypeFn('')}
                    >
                      <span>全部</span>
                      <CaretRightOutlined />
                    </div>
                    {this.state.modelTypeList.map((item: any, index: number) => (
                      <div
                        className={classNames(
                          this.state.petitionModelTypeId == item.id
                            ? 'active'
                            : '',
                          'item',
                          'flex-row',
                          'row-between',
                          'col-center'
                        )}
                        key={index}
                        onClick={() => this.modelTypeFn(item.id)}
                      >
                        <span>{item.name}</span>
                        <CaretRightOutlined />
                      </div>
                    ))}
                  </div>
                  {/* 显示大图 */}
                  {/* 地图 */}
                  {this.state.showMaxMap ? (
                    <div
                      className="map-box"
                      style={{ backgroundImage: 'none', cursor: 'pointer' }}
                      onClick={() => this.setState({ showMaxMap: false })}
                    >
                      <div
                        className={classNames(
                          'item',
                          'active-map',
                          this.state.maxMapObj.nameEn
                        )}
                        id="maxMap"
                      >
                        <div className="name">{this.state.maxMapObj.name}</div>
                        <div className="more" style={{ right: '27rem' }}>
                          {this.state.maxMapObj.dataList.map((value: { name: string, value: any[] }, idx: number) => (
                            <dl key={idx}>
                              <dt>{value.name}</dt>
                              {value.value.map((val: { name: string; count: string }, idxs: number) => (
                                <dd key={idxs}>{val.name + ' ' + val.count}</dd>
                              ))}
                            </dl>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="map-box">
                      {this.state.areaMapList.map((item, index) => (
                        <div
                          className={classNames(
                            item.nameEn,
                            this.state.areaMapTabIndex == ++index
                              ? 'active-map'
                              : '',
                            'item'
                          )}
                          key={index}
                          onClick={() => this.areaMapTabFn(index, item)}
                        >
                          <div className="name">{item.name}</div>
                          <div className="more">
                            {item.dataList.map((value: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; value: any[] }, idx: React.Key | null | undefined) => (
                              <dl key={idx}>
                                <dt>{value.name}</dt>
                                {value.value.map((val: { name: string; count: string }, idxs: React.Key | null | undefined) => (
                                  <dd key={idxs}>
                                    {val.name + ' ' + val.count}
                                  </dd>
                                ))}
                              </dl>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="side-box">
                  <div className="toptitle">
                    <span>子场景预警占比</span>
                  </div>
                  <div className="inner">
                    <div className="model-proportion flex-row">
                      {this.state.contrastList.map((item, index) => (
                        <div
                          className="item flex-col flex-one col-center"
                          key={index}
                        >
                          <div className="icon flex-row col-center row-center">
                            <img src={item.iconImg} alt="" />
                          </div>
                          <div className="number">{item.percentage}</div>
                          <div className="name omit-two">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-side mt">
              <div className="side-box">
                <div className="toptitle">
                  <span>预警情况</span>
                </div>
                <div className="inner flex-row row-between">
                  <div className="warn-type flex-row">
                    <div className="item red flex-one">
                      <div className="flex-row">
                        <div className="icon flex-row col-center row-center">
                          <img
                            src={getImageUrl('letter-visit/red-warn.png')}
                            alt=""
                          />
                        </div>
                        <div className="flex-col">
                          <div className="name">红色预警量</div>
                          <div className="text">
                            <span className="number">
                              {this.state.warningObj.redCount}
                            </span>
                            条
                          </div>
                        </div>
                      </div>
                      <div className="progress">
                        <ul>
                          {this.state.warningConditionObj.red.map(
                            (item, index) => (
                              <li className="flex-row col-center" key={index}>
                                <div className="label">{item.name}</div>
                                <div className="number">{item.count}</div>
                                <div className="progress-bg">
                                  <span
                                    className={classNames(
                                      index == 0
                                        ? 'blue'
                                        : index == 1
                                          ? 'yellow'
                                          : 'green'
                                    )}
                                    style={{ width: item.percentage }}
                                  ></span>
                                </div>
                                <div>{item.percentage}</div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="item yellow flex-one">
                      <div className="flex-row">
                        <div className="icon flex-row col-center row-center">
                          <img
                            src={getImageUrl('letter-visit/yellow-warn.png')}
                            alt=""
                          />
                        </div>
                        <div className="flex-col">
                          <div className="name">流转预警量</div>
                          <div className="text">
                            <span className="number">
                              {this.state.warningObj.yellowCount}
                            </span>
                            条
                          </div>
                        </div>
                      </div>
                      <div className="progress">
                        <ul>
                          {this.state.warningConditionObj.yellow.map(
                            (item, index) => (
                              <li className="flex-row col-center" key={index}>
                                <div className="label">{item.name}</div>
                                <div className="number">{item.count}</div>
                                <div className="progress-bg">
                                  <span
                                    className={classNames(
                                      index == 0
                                        ? 'blue'
                                        : index == 1
                                          ? 'yellow'
                                          : 'green'
                                    )}
                                    style={{
                                      width: item.percentage,
                                    }}
                                  ></span>
                                </div>
                                <div>{item.percentage}</div>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="table-box">
                    <div className="thead">
                      <div className="column one">类型</div>
                      <div className="column two">预警时间</div>
                      <div className="column three">信访人姓名</div>
                      <div className="column five">预警内容</div>
                      <div className="column six">处理状态</div>
                    </div>
                    <div className="tbody">
                      {this.state.listData.length > 0 ? (
                        <div className="seamless-warp list">
                          <JsSeamlessScroll
                            singleHeight={31}
                            singleWaitTime={2000}
                            hover={true}
                            scrollSwitch={this.state.listData.length > 3}
                          >
                            {this.state.listData.map((item, index) => (
                              <div className="item" key={index}>
                                <div className="column one">
                                  <span
                                    className={classNames(
                                      item.status == '红' ? 'red' : 'yellow'
                                    )}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                                <div className="column two omit">
                                  {item.warningTime}
                                </div>
                                <div className="column three">{item.name}</div>
                                <div className="column five omit">
                                  {item.warningContent}
                                </div>
                                <div className="column six omit">
                                  {item.disposeStatusStr}
                                </div>
                              </div>
                            ))}
                          </JsSeamlessScroll>
                        </div>
                      ) : (
                        <div className="no-data">暂无数据</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side">
              <div className="time-info flex-row col-center">
                <div className="time">{this.state.nowTime[1]}</div>
                <div className="week">
                  {this.state.nowTime[0][0] +
                    '年' +
                    this.state.nowTime[0][1] +
                    '月' +
                    this.state.nowTime[0][2] +
                    '日'}
                  <span>{this.state.dayTime}</span>
                </div>
              </div>
              <div className="side-box mt">
                <div className="toptitle">
                  <span>高频问题</span>
                </div>
                <div className="inner">
                  <div className="problem-list flex-row">
                    {this.state.frequencyList.map((item, index) => (
                      <div className="item" key={index}>
                        <div className="order">
                          {index + 1 < 10 ? '0' + (index + 1) : index}
                        </div>
                        <div className="flex-col row-center">
                          <p>
                            <span className="number">{item.count}</span>条
                          </p>
                          <p>{item.percentage}</p>
                          <p className="omit">{item.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="side-box mt">
                <div className="toptitle">
                  <span>历年预警趋势对比</span>
                </div>
                <div className="inner">
                  <div className="chart-box">
                    <div
                      id="rightChartOne"
                      style={{ width: ' 100%', height: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="side-box mt">
                <div className="toptitle">
                  <span>热点关注</span>
                </div>
                <div className="inner" style={{ padding: 0 }}>
                  <div className="hot-attention-wrap">
                    <div
                      id="hot-attention"
                      style={{ width: '100%', height: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default letterVisit
