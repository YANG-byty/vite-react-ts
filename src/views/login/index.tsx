import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props:any) => {
  let navigate = useNavigate()

  return (
    <Fragment>
      <div>login</div>
      <div onClick={() => navigate('/')}>点击去Home</div>
    </Fragment>
  )
}

export default Home
