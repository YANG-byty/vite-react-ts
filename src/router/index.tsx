import { Navigate } from 'react-router-dom'
import Home from '../views/home'
import Login from '../views/login'
import Forestry from '../views/forestry'
import LetterVisit from '../views/letter-visit'
import Sport from '../views/sport'

const indexRouter = [
  {
    path: '/',
    //使用Navigate进行重定向
    element: <Navigate to="/home"></Navigate>,
  },
  {
    path: '/home',
    //这里是你需要的路由组件
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/forestry',
    element: <Forestry />,
  },
  {
    path: '/letter-visit',
    element: <LetterVisit />,
  },
  {
    path: '/sport',
    element: <Sport />,
  },
]

export default indexRouter
