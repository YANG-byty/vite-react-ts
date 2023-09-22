import { SET_DATA } from './constants'

export const getData = (data: any) => ({
  type: SET_DATA,
  data,
})

export const setData = (data: any) => ({
  type: SET_DATA,
  data,
})
