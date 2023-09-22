import React, { Component } from 'react'
import './style.scss'
import * as echarts from 'echarts'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import CountUp from 'react-countup'
import JsSeamlessScroll from '../../components/JsSeamlessScroll'
import SelectYear from '../../components/SelectYear'
import ProgressBar from '../../components/ProgressBar'
import data from './data'

// 获取静态资源
const getImageUrl = (name: string) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}
type StateType = {
  warningSituation: object[],
  areaMapTabIndex: number,
  areaMapTitle: string,
  areaId: string,
  forestryModelId: string,
  areaMapList: any[],
  showMaxMap: boolean,
  maxMapObj: any,
  type: number,
  listData: object[],
  collapseList: any[],
  redObj: {
    count: number,
    percentage: string,
  },
  yellowObj: {
    count: number,
    percentage: string,
  },
  maxSportsModelObj: {
    id: number,
    name: string,
    value: number,
    percentage: string,
  },
  typeImgList: any[],
  modelTypeList: any[],
  analysisObj: {
    red: number,
    total: number,
    yellow: number,
    dispose: number,
    untreated: number,
  },
  disposeResultObj: {
    disposeCount: string,
    institutionResult: string,
    recoverDamage: string,
    supervisionModel: string,
  },
}
type PropType = {
}
class sport extends Component<PropType, StateType> {
  constructor(props: PropType | Readonly<PropType>) {
    super(props)
    this.state = data
  }
  // 获取子组件的选中的时间
  setTime(data: Date) {
    console.log(data)
  }
  //各预警情况
  leftChartBoxOne() {
    let data: any[] = this.state.warningSituation;
    let myChart = echarts.init(document.getElementById('leftChartOne'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let color = [
      '#6F2CFF',
      '#4659FF',
      '#0073DD',
      '#0098ED',
      '#00C1DB',
      '#00DBB3',
      '#3ACF52',
      '#A2DB00',
      '#DBD200',
      '#DB9E00',
    ]
    let arrValue = getArrayValue(data, 'value')
    let sumValue = eval(arrValue.join('+'))
    let optionData = getData(data)

    function getArrayValue(array: any[], key: string) {
      var key = key || 'value'
      var res: any[] = []
      if (array) {
        array.forEach(function (t: { [x: string]: any }) {
          res.push(t[key])
        })
      }
      return res
    }
    function getData(data: any[]) {
      let series: object[] = []
      for (let i: number = 0; i < data.length; i++) {
        series.push({
          name: '',
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [92 - i * 9 + '%', 96 - i * 9 + '%'],
          center: ['50%', '50%'],
          startAngle: 90,
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 3,
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name,
              id: data[i].id,
            },
            {
              value: sumValue - data[i].value,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        })
        series.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [92 - i * 9 + '%', 96 - i * 9 + '%'],
          center: ['50%', '50%'],
          label: {
            show: false,
          },
          itemStyle: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            borderWidth: 3,
          },
          data: [
            {
              value: 10,
              itemStyle: {
                color: 'rgb(0, 55, 117)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
            {
              value: 0,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0,
              },
              tooltip: {
                show: false,
              },
              hoverAnimation: false,
            },
          ],
        })
      }
      return {
        series,
        yAxis: []
      }
    }
    let option = {
      tooltip: {
        // triggerOn: 'click',
        show: true,
        trigger: 'item',
        padding: 0,
        axisPointer: {
          type: 'shadow',
          textStyle: {
            color: '#fff',
          },
        },
        position: function (point: any[], params: any, dom: any, rect: any, size: { contentSize: any[] }) {
          var x = 0 // x坐标位置
          var y = 0 // y坐标位置
          // 当前鼠标位置
          var pointX = point[0]
          var pointY = point[1]
          // 提示框大小
          var boxWidth = size.contentSize[0]
          var boxHeight = size.contentSize[1]

          // boxWidth > pointX 说明鼠标左边放不下提示框
          if (boxWidth > pointX) {
            x = pointX + 10
          } else {
            // 左边放的下
            x = pointX - boxWidth - 10
          }
          // boxHeight > pointY 说明鼠标上边放不下提示框
          if (boxHeight > pointY) {
            y = 5
          } else {
            // 上边放得下
            y = pointY - boxHeight
          }
          return [x, y]
        },
        formatter: function () {
          var text = ''
          for (var i = 0; i < data.length; i++) {
            text += `<div className="item" ><span style="background-color: ${color[i]};"></span> ${data[i].name}（${data[i].value}）</span></div>`
          }
          return `<div className="leftChart-mask">${text}</div>`
        },
      },
      color: color,
      yAxis: [
        {
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
            show: true,
          },
          data: optionData.yAxis,
        },
      ],
      xAxis: [
        {
          show: false,
        },
      ],
      series: optionData.series,
    }
    myChart.setOption(option)
    // myChart.on('click', (e) => {
    //   that.showModalFn(e.data.id)
    // })
  }
  // 地图切换
  areaMapTabFn(index: number, item: any, flag?: number | undefined) {
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
        return
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
      areaId: ''
    })
  }
  //预警情况分析
  rightChartBoxOne(data: { red: any; total?: number; yellow: any }) {
    let myChart = echarts.init(document.getElementById('rightChartOne'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let title = '总预警量'
    let color = ['#FF4444', '#FFD159']
    let echartData = [
      {
        name: '红色预警量',
        value: data.red,
      },
      {
        name: '黄色预警量',
        value: data.yellow,
      },
    ]

    let formatNumber = function (num: number) {
      let reg = /(?=(\B)(\d{3})+$)/g
      return num.toString().replace(reg, ',')
    }
    let total = echartData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)

    let option = {
      tooltip: {
        trigger: 'item',
      },
      color: color,
      title: [
        {
          text: '{val|' + formatNumber(total) + '}\n{name|' + title + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 16,
                fontWeight: 'normal',
                color: '#fff',
                padding: [5, 0],
              },
              val: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
                padding: [5, 0],
              },
            },
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['80%', '100%'],
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
            normal: {
              length: 20,
              length2: 120,
              lineStyle: {
                color: '#e6e6e6',
              },
            },
          },
          label: {
            show: false,
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  rightChartBoxTwo(data: { dispose: any; total?: number; untreated: any }) {
    let myChart = echarts.init(document.getElementById('rightChartTwo'))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let title = '总处理量'
    let color = ['#0073DD', '#00F0FF']
    let echartData = [
      {
        name: '已处理量',
        value: data.dispose,
      },
      {
        name: '未处理量',
        value: data.untreated,
      },
    ]

    let formatNumber = function (num: number) {
      let reg = /(?=(\B)(\d{3})+$)/g
      return num.toString().replace(reg, ',')
    }
    let total = echartData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)

    let option = {
      tooltip: {
        trigger: 'item',
      },
      color: color,
      title: [
        {
          text: '{val|' + formatNumber(total) + '}\n{name|' + title + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              name: {
                fontSize: 16,
                fontWeight: 'normal',
                color: '#fff',
                padding: [5, 0],
              },
              val: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff',
                padding: [5, 0],
              },
            },
          },
        },
      ],

      series: [
        {
          type: 'pie',
          radius: ['80%', '100%'],
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
            normal: {
              length: 20,
              length2: 120,
              lineStyle: {
                color: '#e6e6e6',
              },
            },
          },
          label: {
            show: false,
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  // 预警分析详情类型切换
  typeChangeFn(type: number) {
    this.setState({
      type: type,
      listData: [],
    })

    if (type == 1) {
      return
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
    }
    collapseList = collapseList.map((item: { isDropup: boolean }, idx: any) => {
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

  // 组件加载完成
  componentDidMount() {
    this.leftChartBoxOne()
    this.rightChartBoxOne({ red: 0, total: 0, yellow: 0 })
    this.rightChartBoxTwo({ dispose: 0, total: 0, untreated: 0 })
  }

  render() {
    return (
      <div className="sport">
        <div className="screen-wrap">
          <div className="head-bar">
            丽水市<span>体育领域</span>大数据监督应用
          </div>
          <div className="content">
            <SelectYear
              areaMapTitle={this.state.areaMapTitle}
              setTime={this.setTime}
            />
            <div className="inner">
              <div className="left-side">
                <div className="side-box">
                  <div className="side-title">预警情况统计</div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="warn-info flex-row">
                    <div className="flex-one flex-col col-center">
                      <div className="name">红色预警</div>
                      <div className="icon red">
                        <div className="bg"></div>
                        <img
                          src={getImageUrl('sport/red-warn-icon.png')}
                          alt=""
                        />
                      </div>
                      <div className="total flex-col row-center">
                        <p>
                          <span className="number">
                            <CountUp
                              start={0}
                              end={this.state.redObj.count}
                              duration={3.5}
                              redraw={false}
                              separator=","
                            />
                          </span>
                          条
                        </p>
                        <p>{this.state.redObj.percentage}</p>
                      </div>
                    </div>
                    <div className="flex-one flex-col col-center">
                      <div className="name">黄色预警</div>
                      <div className="icon yellow">
                        <div className="bg"></div>
                        <img
                          src={getImageUrl('sport/yellow-warn-icon.png')}
                          alt=""
                        />
                      </div>
                      <div className="total flex-col row-center">
                        <p>
                          <span className="number">
                            <CountUp
                              start={0}
                              end={this.state.yellowObj.count}
                              duration={3.5}
                              redraw={false}
                              separator=","
                            />
                          </span>
                          条
                        </p>
                        <p>{this.state.yellowObj.percentage}</p>
                      </div>
                    </div>
                  </div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="alert-box mt">各预警情况</div>
                  <div className="chart-box">
                    <div
                      id="leftChartOne"
                      style={{ width: '100%', height: '100%' }}
                    ></div>
                  </div>
                  <div className="chart-info">
                    最突出问题：{this.state.maxSportsModelObj.name}/
                    {this.state.maxSportsModelObj.value}条 占比：
                    {this.state.maxSportsModelObj.percentage}
                  </div>
                </div>
              </div>
              <div className="middle-side">
                <div className="side-box">
                  <div className="side-title">各区县体育专项监督</div>
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
                      {this.state.areaMapList.map((item: { id: string, name: string }, index: number) => (
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
                                (value: { name: string; count: string }, idx: React.Key | null | undefined) => (
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
                        {this.state.areaMapList.map((item: { nameEn: string, name: string, dataList: any[] }, index: number) => (
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
                                  {item.dataList.map((value: { name: string; count: string }, idx: React.Key | null | undefined) => (
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
                  <div className="list flex-row">
                    {this.state.modelTypeList.map((item: { name: string, count: number, red: string, yellow: string, total: number, percentage: string }, index: number) => (
                      <div className="item" key={index}>
                        <div className="top-info flex-row col-center">
                          <img
                            src={getImageUrl(this.state.typeImgList[index])}
                            alt=""
                          />
                          {item.name}
                        </div>
                        <div className="info">
                          <div className="text flex-row row-between col-center">
                            <div>
                              预警数<span>{item.count}</span>
                            </div>
                            <div>
                              <span>红色预警：{item.red}</span>
                              <span>黄色预警：{item.yellow}</span>
                            </div>
                          </div>
                          <div className="mt10 flex-row row-between col-center">
                            <div style={{ width: '100%' }}>
                              <ProgressBar
                                color={'#FF4444'}
                                progressBar={'progress-modelType' + index}
                                data={[item.count, item.total]}
                              />
                            </div>
                            <div className="per">{item.percentage}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="right-side">
                <div className="side-box">
                  <div className="side-title">预警情况分析</div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="early-warn flex-row">
                    <div className="item flex-one flex-col row-center col-center">
                      <div className="chart-box">
                        <div
                          id="rightChartOne"
                          style={{ width: '100%', height: '100%' }}
                        ></div>
                      </div>
                      <div className="info">
                        <p>
                          红色预警量：
                          <span className="red">
                            {this.state.analysisObj.red}
                          </span>
                          条
                        </p>
                        <p>
                          黄色预警量：
                          <span className="yellow">
                            {this.state.analysisObj.yellow}
                          </span>
                          条
                        </p>
                      </div>
                    </div>
                    <div className="item flex-one flex-col row-center col-center">
                      <div className="chart-box">
                        <div
                          id="rightChartTwo"
                          style={{ width: '100%', height: '100%' }}
                        ></div>
                      </div>
                      <div className="info">
                        <p>
                          已处理量：
                          <span className="blue">
                            {this.state.analysisObj.dispose}
                          </span>
                          条
                        </p>
                        <p>
                          未处理量：
                          <span className="green">
                            {this.state.analysisObj.untreated}
                          </span>
                          条
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="warning-statistics flex-row">
                    <div className="option one flex-row">
                      <div>处理人数</div>
                      <div>
                        {this.state.disposeResultObj.disposeCount || 0}
                        <span> 人</span>
                      </div>
                    </div>
                    <div className="option two flex-row">
                      <div>挽回损失</div>
                      <div>
                        {this.state.disposeResultObj.recoverDamage || 0}
                        <span> 万元</span>
                      </div>
                    </div>
                    <div className="option three flex-row">
                      <div>制度成效</div>
                      <div>
                        {this.state.disposeResultObj.institutionResult || 0}
                        <span> 个</span>
                      </div>
                    </div>
                    <div className="option four flex-row">
                      <div>监督模型</div>
                      <div>
                        {this.state.disposeResultObj.supervisionModel || 0}
                        <span> 个</span>
                      </div>
                    </div>
                  </div>
                  <div className="line-box">
                    <em></em>
                  </div>
                  <div className="tab flex-row">
                    <div
                      className={classNames(
                        this.state.type == 1 ? 'active' : '',
                        'item'
                      )}
                      onClick={() => this.typeChangeFn(1)}
                    >
                      预警详情
                    </div>
                    <div
                      className={classNames(
                        this.state.type == 2 ? 'active' : '',
                        'item'
                      )}
                      onClick={() => this.typeChangeFn(2)}
                    >
                      处置详情
                    </div>
                  </div>
                  {/* 预警详情 */}
                  {/* 处置详情 */}
                  {this.state.type == 1 ? (
                    <div className="collapse-wrap">
                      {this.state.collapseList.map((item: { name: string, warningDescribe: string, sportsModelType: string, count: number, isDropup: any; total: number }, index: number) => (
                        <div key={index}>
                          <div className="collapse flex-col">
                            <div className="first-row flex-row row-between col-center">
                              <div className="flex-row flex-one col-center">
                                <div className="name">{item.name}</div>
                                <Tooltip
                                  title={
                                    <p className="txt">
                                      <span>预警说明：</span>
                                      {item.warningDescribe}
                                    </p>
                                  }
                                  placement="top"
                                  max-width="460"
                                >
                                  <img
                                    src={getImageUrl('sport/tip.png')}
                                    className="icon"
                                    alt=""
                                  />
                                </Tooltip>
                                <div className="tag">
                                  {item.sportsModelType}
                                </div>
                              </div>
                              <div className="flex-row col-center">
                                <span>{item.count}条</span>
                                <i
                                  className={classNames(
                                    'down flex-row col-center row-center iconfont',
                                    item.isDropup
                                      ? 'icon-shangla'
                                      : 'icon-xiala'
                                  )}
                                  onClick={() => this.isDropupFn(index)}
                                ></i>
                              </div>
                            </div>
                            <ProgressBar
                              progressBar={'progress-detail' + index}
                              data={[item.count, item.total]}
                              color={'#FF4444'}
                            />
                          </div>
                          {item.isDropup ? (
                            <div>
                              <div className="table-box">
                                <div className="thead">
                                  <div className="column one">企业名称</div>
                                  <div className="column two">姓名/职位</div>
                                  <div className="column three">预警时间</div>
                                </div>
                                <div className="tbody">
                                  {this.state.listData.length > 0 ? (
                                    <div className="seamless-warp list">
                                      <JsSeamlessScroll
                                        singleHeight={41}
                                        singleWaitTime={2000}
                                        hover={true}
                                        scrollSwitch={
                                          this.state.listData.length > 3
                                        }
                                      >
                                        {this.state.listData.map(
                                          (item: any, index: number) => (
                                            <div className="item" key={index}>
                                              <div className="column one">
                                                {item.unit}
                                              </div>
                                              <div className="column two">
                                                {item.name}
                                              </div>
                                              <div className="column three">
                                                {item.warningTime}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </JsSeamlessScroll>
                                    </div>
                                  ) : (
                                    <div className="no-data">暂无数据</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="table-box chuzhi mt">
                      <div className="thead">
                        <div className="column one">对象名称</div>
                        <div className="column two">单位</div>
                        <div className="column three">职务</div>
                        <div className="column four">处理措施</div>
                        <div className="column five">措施使用时间</div>
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
                              {this.state.listData.map((item: any, index: number) => (
                                <div className="item" key={index}>
                                  <div className="column one">{item.name}</div>
                                  <div className="column two">{item.unit}</div>
                                  <div className="column three">
                                    {item.position}
                                  </div>
                                  <div className="column four omit">
                                    {item.disposeMeasure}
                                  </div>
                                  <div className="column five omit">
                                    {item.disposeTime}
                                  </div>
                                </div>
                              ))}
                            </JsSeamlessScroll>
                          </div>
                        ) : (
                          <div className="no-data">
                            暂无数据（省级平台对接中）
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default sport
