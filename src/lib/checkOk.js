const debug = require('debug')('ok:checkOk')

// 数字九宫格控制方向 筛选
const checkOne = (actionCode, chessArr, xy, num) => {
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
  debug(xy)
  const piessCode = chessArr[xy[1]][xy[0]]
  const arr = new Array(checkDirection).fill(true)
  for(let i = 1; i < 6; i++) {
    if(checkDirection === 0) return false
    arr.map((item, index) => {
      if(item) {
        const code = checkOne(index, chessArr, xy, i)
        // debug(code)
        if(code !== piessCode) {
          checkDirection--
          arr[index] = false
        }
        // debug('checkDirection', checkDirection)
      }
    })
    console.log(i)
  }
  return true
}