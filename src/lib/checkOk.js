const debug = require('debug')('ok:checkOk')

// 数字九宫格控制方向 筛选
export const checkOne = (actionCode, chessArr, xy, num) => {
  let code
  let x, y
  const maxLength = chessArr.length
  switch(actionCode) {
  case(0): {
    x = xy[0] - num
    y = xy[1] - num
    break
  } 
  case(1): {
    x = xy[0]
    y = xy[1] - num
    break
  }
  case(2): {
    x = xy[0] + num
    y = xy[1] - num
    break
  }
  case(3): {
    x = xy[0] - num
    y = xy[1]
    break
  }
  case(4): {
    x = xy[0] + num
    y = xy[1]
    break
  }
  case(5): {
    x = xy[0] - num
    y = xy[1] + num
    break
  }
  case(6): {
    x = xy[0]
    y = xy[1] + num
    break
  }
  case(7): {
    x = xy[0] + num
    y = xy[1] + num
    break
  }
  default :return false
  }
  if(x < 0 || y < 0 || x >= maxLength || y >= maxLength) {
    return false
  }
  code = chessArr[y][x]
  return code 
}

// @xy {arr}
// @chessArr {arr}
// true => win 
export default (xy, chessArr) => {
  if(!xy) return debug('can not get piessLcation')
  let checkDirection = 8
  const piessCode = chessArr[xy[1]][xy[0]]
  const arr = new Array(checkDirection).fill(true)
  const arrFraction = new Array(checkDirection).fill(0)
  for(let i = 1; i < 6; i++) {
    if(checkDirection === 0) {
      if(
        arrFraction[0]+arrFraction[7] >= 4 ||
        arrFraction[1]+arrFraction[6] >= 4 ||
        arrFraction[2]+arrFraction[5] >= 4 ||
        arrFraction[3]+arrFraction[4] >= 4 
      ) {
        return true
      }
      return false
    }
    arr.map((item, index) => {
      if(item) {
        const code = checkOne(index, chessArr, xy, i)
        // debug(code)
        
        if(code !== piessCode) {
          checkDirection--
          arr[index] = false
        }else{
          arrFraction[index] += 1
        }
        // debug('checkDirection', checkDirection)
      }
    })
  }
  return true
}