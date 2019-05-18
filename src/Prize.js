import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import useInterval from './useInterval'
// import TWEEN from '@tweenjs/tween.js'

const POSITION = {
  LEFT_TOP: 0,
  TOP_MIDDLE: 1,
  TOP_RIGHT: 2,
  RIGHT_MIDDLE: 3,
  RIGHT_BOTTOM: 4,
  BOTTOM_MIDDLE: 5,
  LEFT_BOTTOM: 6,
  LEFT_MIDDLE: 7,
  MIDDLE_CENTER: 8
}

const PRIZING_DELAY = 80

const classNameMap = {
  [POSITION.LEFT_TOP]: 'left-top',
  [POSITION.TOP_MIDDLE]: 'top-middle',
  [POSITION.TOP_RIGHT]: 'top-right',
  [POSITION.RIGHT_MIDDLE]: 'right-middle',
  [POSITION.RIGHT_BOTTOM]: 'right-bottom',
  [POSITION.BOTTOM_MIDDLE]: 'bottom-middle',
  [POSITION.LEFT_BOTTOM]: 'left-bottom',
  [POSITION.LEFT_MIDDLE]: 'left-middle'
}

const Prize = () => {
  const [prizeIndex, setPrizeIndex] = useState(0)
  const [prizing, setPrizing] = useState(false)
  const [delay, setDelay] = useState(null)
  const prizeList = ['iPhone 4', 'iPhone 4s', 'iPhone 5', 'iPhone 6', 'iPhone 7', 'iPhone 8', 'iPhone X', 'iPhone XS']

  // 依赖另外一个 effect 来决定 delay 的值
  useInterval(() => {
    setPrizeIndex(index => (index % 7 === 0 && index > 0 ? 0 : index + 1))
  }, delay)

  useEffect(
    () => {
      if (prizing) {
        // 每次抽奖，重置起点
        setPrizeIndex(0)
        // 设置抽奖间隔 100
        setDelay(PRIZING_DELAY)
      } else {
        // 停止抽奖
        setDelay(null)
      }
    },
    [prizing]
  )

  return (
    <div className='prize-list'>
      {prizeList.map((prize, index) => (
        <PrizeItem index={index} name={prize} key={prize} active={index === prizeIndex} />
      ))}
      <button className='prize-item prize-button' onClick={() => setPrizing(prizing => !prizing)}>
        {prizing ? '停止' : '抽奖'}
      </button>
    </div>
  )
}

const PrizeItem = ({ index = 0, name, active = false }) => {
  return (
    <div
      className={classnames('prize-item', classNameMap[index], {
        'prize-item-active': active
      })}
    >
      {name}
    </div>
  )
}

export default Prize
