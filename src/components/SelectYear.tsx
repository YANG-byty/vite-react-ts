import React, { Component } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
const { RangePicker } = DatePicker

type StateType = {
  timeObj: any,
  areaMapTitle: string
}
type PropType = {
  setTime: any,
  areaMapTitle: string
}

export default class Sidebar extends Component<PropType, StateType> {
  constructor(props: PropType | Readonly<PropType>) {
    super(props)
    this.state = {
      timeObj: {},
      areaMapTitle: '',
    }
  }
  // 选择时间
  changeTimeFn = (e: any) => {
    if (e == null) {
      this.setState({
        timeObj: {}
      })
    } else {
      let timeObj = {
        startTime: dayjs(e[0]).format('yyyy'),
        endTime: dayjs(e[1]).format('yyyy'),
      }
      this.setState({
        timeObj: timeObj
      })
    }
    // 向父组件传值
    this.props.setTime(this.state.timeObj)
  }

  // 监听props变化
  static getDerivedStateFromProps(
    props: { areaMapTitle: string },
    state: { areaMapTitle: string }
  ) {
    if (props.areaMapTitle != state.areaMapTitle) {
      return {
        areaMapTitle: props.areaMapTitle,
      }
    }
    return null
  }

  render() {
    return (
      <div className="select-year side-box info flex-row col-center row-center">
        <div className="year flex-row col-center">
          <div className="all">全部</div>
          <RangePicker
            bordered={false}
            inputReadOnly={true}
            picker="year"
            onChange={this.changeTimeFn}
          />
        </div>
        <div className="line-y"></div>
        <div className="city">
          丽水市{this.state.areaMapTitle ? ' · ' + this.state.areaMapTitle : ''}
        </div>
      </div>
    )
  }
}
