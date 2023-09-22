import React, { Component } from 'react'
import classNames from 'classnames' //样式类合并器
import * as echarts from 'echarts'
import { Tooltip } from 'antd'
import data from './data'
import './style.scss'
import JsSeamlessScroll from '../../components/JsSeamlessScroll'
import SelectYear from '../../components/SelectYear'
import ProgressBar from '../../components/ProgressBar'
import CircinateChart from '../../components/CircinateChart'

type StateType = {
  areaMapTitle: string,
  modelTypeList: object[],
  modelTypeListActive: number,
  warningConditionObj: {
    total: number,
    redWarning: number,
    redPercentage: number,
    yellowWarning: number,
    yellowPercentage: number,
  },
  collapseList: any[],
  forestryModelId: string,
  listData: any[],
  areaMapTabIndex: number,
  areaMapList: any[],
  areaId: string,
  showMaxMap: boolean,
  maxMapObj: any,
  activeModel: number,
  activeModelId: string,
  tabBtnList: any[],
  warningConditionnArr: any[],
  disposeConditionArr: any[],
  disposeResultArr: any[],
  issueList: object[],
}
type PropType = {
}

class forestry extends Component<PropType, StateType> {
  constructor(props: PropType | Readonly<PropType>) {
    super(props)
    this.state = data
  }
  // 获取子组件的选中的时间
  setTime(data: Date) {
    console.log(data)
  }
  // 预警情况类型切换
  modelTypeListFn(index: number) {
    this.setState({
      modelTypeListActive: index,
    })
    // this.getModelType()
  }
  // 总预警量
  warningChart(data: any) {
    let myChart = echarts.init(document.getElementById('warning-chart'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let color = ['#ff4444', '#ffd159']
    let echartData = [
      {
        name: '红色预警量',
        value: data.redWarning,
      },
      {
        name: '黄色预警量',
        value: data.yellowWarning,
      },
    ]

    let formatNumber = function (num: string) {
      let reg = /(?=(\B)(\d{3})+$)/g
      return num.toString().replace(reg, ',')
    }
    let total: any = echartData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)

    let option = {
      color: color,
      tooltip: {
        trigger: 'item',
      },
      title: [
        {
          text: '{name|' + '}{val|' + formatNumber(total) + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 14,
                fontWeight: 'normal',
                color: '#fff',
                padding: [10, 0],
              },
              val: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderWidth: 2,
            },
          },
          labelLine: {
            show: false,
          },
          label: {
            normal: {
              show: false,
            },
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  // 显示悬浮框
  showModalFn(id: string) {
    if (id) {
      // this.parameter = {
      //   forestryModelId: id,
      //   areaId: this.areaId,
      //   endTime: this.endTime,
      //   startTime: this.startTime,
      // }
      // this.showModal = true
    }
  }
  // 折叠
  isDropupFn(index: number) {
    let collapseList = this.state.collapseList
    collapseList[index].isDropup = !collapseList[index].isDropup
    if (collapseList[index].isDropup) {
      this.setState({
        listData: []
      })
      // this.getWarningModelPageFn()
    }
    collapseList = collapseList.map((item: any, idx: number) => {
      if (index != idx) {
        item.isDropup = false
      }
      return item
    })
    this.setState({
      forestryModelId: this.state.collapseList[index].id,
      collapseList,
    })
  }
  // 渲染-预警模型
  renderCollapse() {
    return this.state.collapseList.map((item: any, index: number) => {
      return (
        <div key={index}>
          <div className="collapse disFlex">
            <div
              onClick={() => this.showModalFn(item.id)}
              style={{ width: '45%' }}
            >
              {item.name}
            </div>
            <div className="disFlex row-between" style={{ width: '55%' }}>
              <ProgressBar
                progressBar={'progress-bar' + item.id}
                data={[item.count, item.total]}
              />
              <div className="disFlex" style={{ marginLeft: '0.75rem' }}>
                {item.count}条
                <i
                  className={classNames(
                    'down iconfont',
                    item.isDropup ? 'icon-shangla' : 'icon-xiala'
                  )}
                  onClick={() => this.isDropupFn(index)}
                ></i>
              </div>
            </div>
          </div>
          {item.isDropup && (
            <div className="table-box">
              <div className="thead">
                <div className="column one">村名</div>
                <div className="column one">年度</div>
                <div className="column one">差额</div>
                <div className="column one">状态</div>
              </div>
              <div className="tbody">
                {this.state.listData.length > 0 ? (
                  <div className="seamless-warp list">
                    <JsSeamlessScroll
                      singleHeight={41}
                      singleWaitTime={2000}
                      hover={true}
                      scrollSwitch={this.state.listData.length > 3}
                    >
                      {this.state.listData.map((value: any, index: number) => {
                        return (
                          <div className="item" key={index}>
                            <div className="column one">{value.villageName}</div>
                            <div className="column one">{value.year}</div>
                            <div className="column one">{value.difference}元</div>
                            <div className="column one">
                              <span
                                className={classNames(
                                  value.warningType == 1 ? 'red' : 'yellow'
                                )}
                              >
                                {value.status}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </JsSeamlessScroll>
                  </div>
                ) : (
                  <div v-else className="no-data">
                    暂无数据
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    })
  }
  // 地图切换
  areaMapTabFn(index: number, item: any, flag?: number) {
    if (flag) {
      if (this.state.areaMapTabIndex != index) {
        this.setState({
          areaMapTabIndex: index,
          areaMapTitle: item.name,
          areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
        })
        if (index != 1) {
          this.setState({
            showMaxMap: true,
            maxMapObj: item,
          })
        }
      } else {
        this.cancelMap()
      }
    } else {
      if (this.state.areaMapTabIndex != index) {
        this.setState({
          areaMapTabIndex: index,
          areaMapTitle: item.name,
          areaId: index == 0 ? '' : this.state.areaMapList[index - 1].id,
        })
      }
      this.setState({
        showMaxMap: false,
      })
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
  // 点击具体模型
  activeModelFn(index: number, id: string) {
    if (this.state.activeModel == index) {
      return
    }
    this.setState({
      activeModel: index,
      activeModelId: id,
    })
  }
  // 各区县预警情况对比
  countyChart(data: object[]) {
    let xData: Array<[]> = [],
      arr: any[] = [[], []]
    data.map((item: any) => {
      xData.push(item.areaName)
      arr[0].push(item.yellowCount)
      arr[1].push(item.redCount)
    })
    let myChart = echarts.init(document.getElementById('county-chart'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
      },
      legend: {
        x: 'right',
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      grid: {
        borderWidth: 0,
        top: '16%',
        bottom: '10%',
        right: '2%',
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(0,115,221,1)',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,1)',
            fontSize: 12,
          },
          data: xData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,1)',
            fontSize: 12,
          },
          splitArea: {
            show: false,
          },
          //分格线
          splitLine: {
            lineStyle: {
              type: 'dashed', //虚线
              color: '#0073DD',
              opacity: 0.5,
            },
          },
        },
      ],
      series: [
        {
          name: '黄色预警',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 22,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(235, 255, 0, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(235, 255, 0, .2)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          data: arr[0],
        },
        {
          name: '红色预警',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 22,
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 92, 0, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 92, 0, .2)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              barBorderRadius: 0,
            },
          },
          data: arr[1],
        },
      ],
    }
    myChart.setOption(option)
  }
  // 历年预警趋势对比
  overYearsChart(data: any[]) {
    let xData: Array<[]> = [],
      arr: Array<[]> = []
    data.map((item: any) => {
      xData.push(item.year)
      arr.push(item.count)
    })
    let myChart = echarts.init(document.getElementById('overYears-chart'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let option = {
      tooltip: {
        trigger: 'axis',
        // padding: 0,
        // backgroundColor: 'transparent',
        // borderColor: 'none',
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
        formatter: function (val: any) {
          let index: number = val[0].dataIndex
          let list = data[index]?.areaJson
          let keys = Object.keys(list)
          let values = Object.values(list)
          var text = `<div class="flex-row row-between" style="color:#00F0FF">丽水市 <span style="margin-left:10px">${data[index]?.count}条</span></div>`
          keys.map((item, idx) => {
            text += `<div class="flex-row row-between">${item} <span style="margin-left:10px">${values[idx]}</span></div>`
          })
          return `<div >${text}</div>`
        },
      },
      grid: {
        borderWidth: 0,
        top: '6%',
        bottom: '10%',
        right: '2%',
        textStyle: {
          color: '#fff',
        },
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(0,115,221,1)',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,1)',
            fontSize: 12,
          },
          data: xData,
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255,255,255,1)',
            fontSize: 12,
          },
          splitArea: {
            show: false,
          },
          //分格线
          splitLine: {
            lineStyle: {
              type: 'dashed', //虚线
              color: '#0073DD',
              opacity: 0.5,
            },
          },
        },
      ],
      series: [
        {
          name: '黄色预警',
          type: 'bar',
          stack: '总量',
          barMaxWidth: 22,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 209, 255, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 209, 255, 0)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          data: arr,
        },
        {
          name: '总数',
          type: 'line',
          symbolSize: 8,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(0, 240, 255, 1)',
              barBorderRadius: 0,
            },
          },
          lineStyle: {
            normal: {
              width: 2,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 206, 245, 1)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 206, 245, 1)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          data: arr,
        },
      ],
    }
    myChart.setOption(option)
  }

  componentDidMount() {
    let data = {
      redPercentage: '100%',
      redWarning: 181,
      total: 181,
      yellowPercentage: '0%',
      yellowWarning: 0,
    }
    this.warningChart(data)

    let data2 = [
      {
        areaName: '市本级',
        redCount: 10,
        yellowCount: 2,
      },
      {
        areaName: '莲都',
        redCount: 20,
        yellowCount: 30,
      },
      {
        areaName: '龙泉',
        redCount: 22,
        yellowCount: 11,
      },
      {
        areaName: '青田',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '云和',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '庆元',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '缙云',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '遂昌',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '松阳',
        redCount: 12,
        yellowCount: 12,
      },
      {
        areaName: '景宁',
        redCount: 12,
        yellowCount: 12,
      },
    ]
    this.countyChart(data2)
    let data3 = [
      {
        year: 2018,
        count: 100,
        areaJson: {
          市本级: 10,
          莲都: 10,
          龙泉: 10,
          青田: 10,
          云和: 10,
          庆元: 10,
          缙云: 10,
          遂昌: 10,
          松阳: 10,
          景宁: 10,
        },
      },
      {
        year: 2019,
        count: 130,
        areaJson: {
          市本级: 10,
          莲都: 10,
          龙泉: 10,
          青田: 10,
          云和: 10,
          庆元: 10,
          缙云: 10,
          遂昌: 10,
          松阳: 10,
          景宁: 10,
        },
      },
      {
        year: 2020,
        count: 50,
        areaJson: {
          市本级: 10,
          莲都: 10,
          龙泉: 10,
          青田: 10,
          云和: 10,
          庆元: 10,
          缙云: 10,
          遂昌: 10,
          松阳: 10,
          景宁: 10,
        },
      },
      {
        year: 2021,
        count: 300,
        areaJson: {
          市本级: 10,
          莲都: 10,
          龙泉: 10,
          青田: 10,
          云和: 10,
          庆元: 10,
          缙云: 10,
          遂昌: 10,
          松阳: 10,
          景宁: 10,
        },
      },
      {
        year: 2022,
        count: 200,
        areaJson: {
          市本级: 10,
          莲都: 10,
          龙泉: 10,
          青田: 10,
          云和: 10,
          庆元: 10,
          缙云: 10,
          遂昌: 10,
          松阳: 10,
          景宁: 10,
        },
      },
    ]
    this.overYearsChart(data3)
  }
  render() {
    return (
      <div className="forestry">
        <div className="screen-wrap">
          <div className="head-bar">
            丽水市<span>林业领域</span>大数据监督应用
          </div>
          <div className="content">
            <SelectYear
              areaMapTitle={this.state.areaMapTitle}
              setTime={this.setTime}
            />
            <div className="inner">
              <div className="left-side">
                <div className="side-box">
                  <div className="side-title">预警情况</div>
                  <div className="line-box mt12">
                    <em></em>
                  </div>
                  <ul className="tab-wrap">
                    {this.state.modelTypeList.map((item: any, index: number) => {
                      return (
                        <li
                          onClick={() => this.modelTypeListFn(index)}
                          key={item.id}
                          className={classNames(
                            this.state.modelTypeListActive == index
                              ? 'warning-active'
                              : 'warning',
                            'disFlex',
                            'warning-text',
                            'omit'
                          )}
                        >
                          {item.name}
                        </li>
                      )
                    })}
                  </ul>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="disFlex chart-wrap">
                    <div className="title-wrap">
                      <div className="title">
                        总预警量： {this.state.warningConditionObj.total} 条
                      </div>
                      <div className="red">
                        红色预警量： {this.state.warningConditionObj.redWarning}{' '}
                        条 {this.state.warningConditionObj.redPercentage} %
                      </div>
                      <div className="yellow">
                        黄色预警量：{' '}
                        {this.state.warningConditionObj.yellowWarning} 条{' '}
                        {this.state.warningConditionObj.yellowPercentage} %
                      </div>
                    </div>
                    <div id="warning-chart"></div>
                  </div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="alert-box">预警模型</div>
                  <div className="collapse-wrap">{this.renderCollapse()}</div>
                </div>
              </div>
              <div className="middle-side">
                <div className="side-box">
                  <div className="side-title">各区县林业预警统计</div>
                  <div className="flex-row row-between col-center">
                    {/* 导航线 */}
                    <div className="map-type">
                      <div
                        className={classNames(
                          this.state.areaMapTabIndex == 0 ? 'active' : '',
                          'item',
                          'flex-row',
                          'col-center'
                        )}
                        onClick={() => this.areaMapTabFn(0, '')}
                      >
                        <em></em>
                        <span>丽水市</span>
                      </div>
                      {this.state.areaMapList.map((item, index) => (
                        <div
                          key={item.id}
                          className={classNames(
                            this.state.areaMapTabIndex == ++index
                              ? 'active'
                              : '',
                            'item',
                            'flex-row',
                            'col-center'
                          )}
                          onClick={() => this.areaMapTabFn(index, item)}
                        >
                          <em></em>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                    {/* 显示大图 */}
                    {/* 地图 */}
                    {this.state.showMaxMap ? (
                      <div
                        className="map-box"
                        style={{ backgroundImage: 'none', cursor: 'pointer' }}
                        onClick={() =>
                          this.setState({
                            showMaxMap: false,
                          })
                        }
                      >
                        <div
                          className={classNames(
                            'item',
                            'active-map',
                            this.state.maxMapObj.nameEn
                          )}
                          id="maxMap"
                        >
                          <div className="name">
                            {this.state.maxMapObj.name}
                          </div>
                          <div className="more" style={{ right: '27rem' }}>
                            <ul>
                              {this.state.maxMapObj.dataList.map(
                                (value: { name: string, count: number }, idx: number) => (
                                  <li className="flex-row col-center" key={idx}>
                                    <em></em>
                                    <span>
                                      {value.name + '（' + value.count + '）'}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="map-box">
                        {this.state.areaMapList.map((item, index) => (
                          <div
                            className={classNames(
                              'item',
                              this.state.areaMapTabIndex == ++index
                                ? 'active-map'
                                : '',
                              item.nameEn
                            )}
                            key={index}
                            onClick={() => this.areaMapTabFn(index, item, 1)}
                          >
                            <div className="name">{item.name}</div>
                            <div className="more">
                              {item.dataList.length > 0 ? (
                                <ul>
                                  {item.dataList.map((value: { name: string, count: number }, idx: number) => (
                                    <li
                                      className="flex-row col-center"
                                      key={idx}
                                    >
                                      <em></em>
                                      <span>
                                        {value.name + '（' + value.count + '）'}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <div
                                  style={{
                                    color: '#fff',
                                    fontSize: '0.875rem',
                                  }}
                                >
                                  暂无数据
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <div
                          className="map-name"
                          onClick={() => this.cancelMap()}
                        >
                          丽水市
                          {this.state.areaMapTitle
                            ? '·' + this.state.areaMapTitle
                            : ''}
                        </div>
                      </div>
                    )}
                  </div>
                  <ul className="model-wrap">
                    {this.state.tabBtnList.map((item: { name: string, id: string }, index:number) => (
                      <li
                        className={classNames(
                          'model-btn',
                          this.state.activeModel == index ? 'active-model' : ''
                        )}
                        key={index}
                        onClick={() => this.activeModelFn(index, item.id)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="situation-wrap">
                    <div className="title-wrap">
                      <div className="title">预警情况</div>
                      <div
                        className="situation"
                        onClick={() =>
                          this.showModalFn(
                            this.state.warningConditionnArr[0].forestryModelId
                          )
                        }
                      >
                        <CircinateChart
                          data={this.state.warningConditionnArr}
                        />
                        <div className="bar-wrap">
                          {this.state.warningConditionnArr.map(
                            (item, index) => (
                              <div key={index}>
                                <div className="title-num row-between flex-row">
                                  {item.name}：{' '}
                                  <span style={{ color: item.color }}>
                                    {item.count}
                                  </span>
                                  {item.percentage}
                                </div>
                                <ProgressBar
                                  progressBar={'progress-warning' + index}
                                  color={item.color}
                                  data={[item.count, item.total]}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="title-wrap">
                      <div className="title">处置情况</div>
                      <div
                        className="situation"
                        onClick={() =>
                          this.showModalFn(
                            this.state.disposeConditionArr[0].forestryModelId
                          )
                        }
                      >
                        <CircinateChart
                          data={this.state.disposeConditionArr}
                          circinateId={'disposal-chart'}
                          color={['#0073DD', '#00F0FF']}
                        />
                        <div className="bar-wrap">
                          {this.state.disposeConditionArr.map((item, index) => (
                            <div key={index}>
                              <div className="title-num row-between flex-row">
                                {item.name}：{' '}
                                <span style={{ color: item.color }}>
                                  {item.count}
                                </span>
                                {item.percentage}
                              </div>
                              <ProgressBar
                                progressBar={'progress-condition' + index}
                                color={item.color}
                                data={[item.count, item.total]}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="statistics-wrap">
                      <div className="title">处置成效</div>
                      <div className="wrap">
                        {this.state.disposeResultArr.map((item, index) => (
                          <div key={index}>
                            <span>{item.name}：</span>
                            <span>{item.num}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-side">
                <div className="side-box">
                  <div className="side-title">预警对比</div>
                  <div className="line-box mt12">
                    <em></em>
                  </div>
                  <div className="alert-box">高频问题</div>
                  <div className="option-wrap">
                    {this.state.issueList.map((item:any, index:number) => (
                      <div
                        className="option"
                        key={index}
                        onClick={() => this.showModalFn(item.id)}
                      >
                        <div className="title">{++index}</div>
                        <div className="text-content">
                          <div className="bar">
                            <span>{item.count}</span> 条
                          </div>
                          <div>{item.percentage}</div>
                          <div className="omit">
                            <Tooltip title={item.name} placement="bottom">
                              {item.name}
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="alert-box">各区县预警情况对比</div>
                  <div className="county-chart" id="county-chart"></div>
                  <div className="alert-box">历年预警趋势对比</div>
                  <div className="county-chart" id="overYears-chart"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default forestry
