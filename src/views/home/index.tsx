import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actionCreators'
import './style.scss'
import * as requestRefers from '../../api/common'

// 获取静态资源
const getImageUrl = (name: string) => {
  return new URL(`../../assets/images/${name}`, import.meta.url).href
}

const Home = (props: any) => {
  const { myHomeData, setData } = props
  let navigate = useNavigate()
  // 数据
  let state = {
    list: [
      {
        title: '林业领域大数据监督应用',
        path: '/forestry',
        icon: getImageUrl('linye-icon.png'),
      },
      {
        title: '体育领域大数据监督应用',
        path: '/sport',
        icon: getImageUrl('tiyu-icon.png'),
      },
      {
        title: '信访领域大数据监督应用',
        path: '/letter-visit',
        icon: getImageUrl('xinfang-icon.png'),
      },
    ],
  }

  // 路由跳转
  const goToFn = (link: string) => {
    console.log(link)
    navigate(link)
  }

  // 请求接口
  const getInstanceByIdFn = () => {
    requestRefers
      .getInstanceById({ instanceId: '48a078d0f87b4e46ba9111d2ef4c701f' })
      .then((res: any) => {
        console.log(res)
      })
  }
  // getInstanceByIdFn()

  const clickFn = () => {
    React.$Message.error('666666')
  }

  return (
    <Fragment>
      <div className="home">
        <div className="screen-wrap">
          <div className="head-bar">
            <span >公权力大数据监督应用大屏</span>
          </div>
          <div className="menu flex-row row-center">
            {state.list.map((item, index) => {
              return (
                <div
                  key={index}
                  className="item flex-col col-center"
                  onClick={() => goToFn(item.path)}
                >
                  <img src={item.icon} alt="" />
                  <p className="name">{item.title}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

// 把store中的数据映射到组件的props
const mapStateToProps = (state: { getIn: (arg0: string[]) => any }) => {
  return {
    myHomeData: state.getIn(['myData']),
  }
}

// 把store的Dispatch映射到组件的props
const mapDispatchToProps = (dispatch: (arg0: { type: string; data: any }) => void) => ({
  setData(data: any) {
    const action = actionCreators.setData(data)
    dispatch(action)
  },
})
// connect(mapStateToProps, null)  如果不需要dispatch可以设置为null
export default connect(mapStateToProps, mapDispatchToProps)(Home)
