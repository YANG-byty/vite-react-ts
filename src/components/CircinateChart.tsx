import React, { Component } from 'react'
import * as echarts from 'echarts'
type PropType = {
  circinateId?: string;
  color?: string[];
  data: object[]
};
export default class CircinateChart extends Component<PropType> {
  circinateId: string
  color: string[]
  data: object[]
  constructor(props: PropType | Readonly<PropType>) {
    super(props)
    this.circinateId = props.circinateId || 'circinate'
    this.color = props.color || ['#ff4444', '#ffd159']
    this.data = props.data || []
  }
  // 环形图
  circinateChart() {
    let myChart = echarts.init(document.getElementById(this.circinateId))
    window.addEventListener('resize', () => {
      myChart.resize()
    })
    let color = this.color
    let echartData: object[] = []
    this.data.map((item: any) => echartData.push({
      name: item.name,
      value: item.count,
    }))

    let option = {
      tooltip: {
        trigger: 'item',
        extraCssText: 'min-width:150px;',
      },
      color: color,
      grid: {
        borderWidth: 0,
        top: 0,
        bottom: 0,
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['100%', '60%'],
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
  componentDidMount() {
    this.circinateChart()
  }

  render() {
    return <div className="circinate" id={this.circinateId}></div>
  }
}
