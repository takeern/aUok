const debug = require('debug')('ok:thunder')
import { checkOne } from './checkOk'


// @chessArr {arr}
// 对棋盘进行处理 计算棋盘上已有棋子的边界
const clipChessArr = (chessArr) => {
  const maxLength = chessArr.length
  let max, min
  const arrBorder = new Array(maxLength).fill(false)
  for(let i = 0; i < maxLength; i++) {
    max = -1
    min = maxLength + 1
    for(let j = 0; j < maxLength; j++) {
      if(chessArr[i][j] !== 0) {
        max = max < j ? j: max
        min = min > j ? j: min
      }
    }
    if(max !== -1) {
      arrBorder[i] = ({
        max,
        min,
      })
    }
  }
  return arrBorder
}

//得到棋盘边界 
//return rect 
const getBorder = (chessArr) => {
  const arrBorder = clipChessArr(chessArr)
  // debug(arrBorder, 'thunder arr')
  let border = 2
  let maxLength = arrBorder.length
  let top = maxLength+1
  let left = maxLength+1
  let right = -1
  let bottom = -1
  for(let i = 0; i < maxLength; i++) {
    if(arrBorder[i]) {
      top = top > i - border ? i - border : top
      bottom = bottom < i + border ? i + border : bottom
      left = left > arrBorder[i].min - border ? arrBorder[i].min - border : left
      right = right < arrBorder[i].max + border ? arrBorder[i].max + border :right
    }
  }
  top = top < 0 ? 0 : top
  bottom = bottom >= maxLength ? maxLength - 1 : bottom
  left = left < 0 ? 0 : left
  right = right >= maxLength ? maxLength - 1 : right
  // debug({ top, bottom, left, right }, ' border')
  return { top, bottom, left, right }
}

//遍历每个位置获取分数图
const getScoreMap = (x, y, chessArr) => {
  let checkDirectionForBlack = 8
  let checkDirectionForWhite = 8
  const whiteCode = 1
  const blackCode = 2
  const arrForBlack = new Array(checkDirectionForWhite).fill(true)
  const arrForwhite = new Array(checkDirectionForWhite).fill(true)
  const arrFractionForBlack = new Array(checkDirectionForWhite).fill(0)
  const arrFractionForWhite = new Array(checkDirectionForWhite).fill(0)
  for(let i = 1; i < 6; i++) {
    if(checkDirectionForWhite === 0 && checkDirectionForBlack === 0) {
      break
    }
    arrForBlack.map((item, index) => {
      if(item || arrForwhite[index]) {
        const xy = [ x, y ]
        const code = checkOne(index, chessArr, xy, i)
        if(code === blackCode) {
          if(item) arrFractionForBlack[index] += 1
          if(arrForwhite[index]) {
            checkDirectionForWhite -- 
            arrForwhite[index] = false
            arrFractionForWhite[index] += 0.5
          }
        }else if(code === 0) {
          if(item) {
            checkDirectionForBlack --
            arrForBlack[index] = false
          }
          if(arrForwhite[index]) {
            checkDirectionForWhite --
            arrForwhite[index] = false
          }
        }else if(code === whiteCode) {
          if(item) {
            checkDirectionForBlack --
            arrForBlack[index] = false
            arrFractionForBlack[index] += 0.5
          }
          if(arrForwhite[index]) arrFractionForWhite[index] += 1
        }else {
          if(item) {
            checkDirectionForBlack --
            arrForBlack[index] = false
            arrFractionForBlack[index] += 0.5
          }
          if(arrForwhite[index]) {
            checkDirectionForWhite --
            arrForwhite[index] =false
            arrFractionForWhite[index] += 0.5
          }
        }
      }
    })
  }

  return score(arrFractionForBlack, arrFractionForWhite)
}

//该位置分数最终结果
const score = (arrFractionForBlack, arrFractionForWhite) => {
  const blackScore = thinking(arrFractionForBlack, 'black')
  const whiteScore = thinking(arrFractionForWhite, 'white')
  // debug(blackScore, ' 黑棋得分')
  // debug(whiteScore, ' bai棋得分')
  return blackScore + whiteScore
}


//制定得分规则
const toolForFraction = (code, arrFraction, color) => {
  const other = 7 - code
  const death = (arrFraction[code] - parseInt(arrFraction[code]) + arrFraction[other] - parseInt(arrFraction[other])) * 2
  let fraction = 0
  const key = parseInt(arrFraction[code]) + parseInt(arrFraction[other]) 
  // debug(death, key, '得分规则')
  if(color === 'black') {
    if(key >= 4) fraction += 100000
    if(key === 3) {
      if(death === 0) fraction += 10000
      if(death === 1) fraction += 1500
    }
    if(key === 2) {
      if(death === 0) fraction += 1100
      if(death === 1) fraction += 110
    }
    if(key === 1) {
      if(death === 0) fraction += 110
      if(death === 1) fraction += 11
    }
    if(key === 0) {
      if(death === 0) fraction += 10
      if(death === 1) fraction += 1
    }
  }else{
    if(key >= 4) fraction += 100000
    if(key === 3) {
      if(death === 0) fraction += 10000
      if(death === 1) fraction += 1000
    }
    if(key === 2) {
      if(death === 0) fraction += 500
      if(death === 1) fraction += 50
    } if(key === 1) {
      if(death === 0) fraction += 50
      if(death === 1) fraction += 5
    }
    if(key === 0) {
      if(death === 0) fraction += 10
      if(death === 1) fraction += 1
    }
  }
  return fraction
}


//通过分数图分析 该位置分数
const thinking = (arrFraction, color) => {
  const arr = [ 0, 1, 2, 3 ]
  let fraction = 0
  arr.map((item) => {
    fraction += toolForFraction(item, arrFraction, color)
  })
  // debug(fraction)
  return fraction
}

export default (chessArr) => {
  const { top, bottom, left, right } = getBorder(chessArr)
  const chessLength = chessArr.length
  const fractionArr = []
  const locationArr = []
  let max = 0
  for(let i = 0; i < chessLength; i++) fractionArr.push(new Array(chessLength).fill(-1))
  for(let y = top; y <= bottom; y++) {
    for(let x = left; x <= right; x++) {
      if(chessArr[y][x] === 0) {
        let fraction = getScoreMap(x, y, chessArr)
        // debug(fraction, x, y, '该位置下分数')
        // max = max < fraction ? fraction : max
        if(max < fraction) {
          max = fraction
          locationArr.length = 0
          locationArr.push({
            x : x,
            y : y,
          })
        }else if(max === fraction) {
          locationArr.push({
            x : x,
            y : y,
          })
        }
        fractionArr[y][x] = fraction
      } 
    }
  }
  debug(fractionArr, '图表总分')
  debug(locationArr)
  return locationArr[Math.floor(Math.random() * locationArr.length)]
}