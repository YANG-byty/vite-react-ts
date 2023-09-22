import React, { Component } from 'react'
import { connect } from 'react-redux'
export class Header extends Component {
  componentDidMount() { }

  render() {
    // 获取静态资源
    const getImageUrl = (name: string) => {
      return new URL(`../../assets/images/${name}`, import.meta.url).href
    }

    return (
      <div className="header-box flex-row col-center">
        <img className="logo" src={getImageUrl('logo.png')} alt="" />
      </div>
    )
  }
}

// 把store中的数据映射到组件的props
const mapStateToProps = (state: any) => {
  return {
    myHomeData: state.getIn(['myData']),
  }
}

export default connect(mapStateToProps, null)(Header)
