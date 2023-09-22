/**
 *  流程日志 icon 枚举
 * */
export const iconEnumList = [
  {
    value: 1,
    label: '勾',
    class: 'green',
  },
  {
    value: 2,
    label: '时钟',
    class: 'blue',
  },
  {
    value: 3,
    label: '叉',
    class: 'red',
  },
  {
    value: 4,
    label: '回',
    class: 'yellow',
  },
]
/**
 *  报送状态枚举
 * */
export const reportStatusEnumList = [
  {
    value: 0,
    label: '未报送',
    class: 'yellow',
  },
  {
    value: 1,
    label: '已报送',
    class: 'blue',
  },
]
/**
 *  状态枚举
 * */
export const planStatusEnumList = [
  {
    value: 0,
    label: '已作废',
    class: 'red',
  },
  {
    value: 1,
    label: '进行中',
    class: 'blue',
  },
  {
    value: 2,
    label: '已结束',
    class: 'green',
  },
]
/**
 *  得牌枚举
 * */
export const boardList = [
  {
    value: 0,
    label: '不得牌',
    class: 'green',
  },
  {
    value: 1,
    label: '黄牌',
    class: 'blue',
  },
  {
    value: 2,
    label: '红牌',
    class: 'red',
  },
]
/**
 *  审核结果枚举
 * */
export const auditResultEnumList = [
  {
    value: 0,
    label: '未通过',
    class: 'red',
  },
  {
    value: 1,
    label: '未审核',
    class: 'yellow',
  },
  {
    value: 2,
    label: '审核中',
    class: 'blue',
  },
  {
    value: 3,
    label: '已通过',
    class: 'green',
  },
]
/**
 *  审核流程枚举
 * */
export const auditProcessEnumList = [
  {
    value: 1,
    label: '审核中',
    class: 'blue',
  },
  {
    value: 2,
    label: '已结束',
    class: 'green',
  },
]
// 流程状态
export function instanceStatus(val: number) {
  if (val === 0) {
    return '已作废'
  }
  if (val === 1) {
    return '进行中'
  }
  if (val === 2) {
    return '已结束'
  }
  return ''
}
// 审核结果
export function auditResultStatus(val: number) {
  if (val === 0) {
    return '未通过'
  }
  if (val === 1) {
    return '未送审'
  }
  if (val === 2) {
    return '审核中'
  }
  if (val === 3) {
    return '已通过'
  }
  return ''
}
// 得牌枚举
export function boardStatus(val: number) {
  if (val === 0) {
    return '不得牌'
  }
  if (val === 1) {
    return '黄牌'
  }
  if (val === 2) {
    return '红牌'
  }
  return ''
}
