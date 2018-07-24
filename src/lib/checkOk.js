const debug = require('debug')('ok:checkOk')

// 数字九宫格控制方向 筛选
const checkOne = (actionCode, chessArr, xy, num) => {
  let code
  switch(actionCode) {
  case(0): {
    debug(chessArr, 'chess arr')
    code = chessArr[xy[1] - num][xy[0] - num]
    debug(code)
    break
  } 
  case(1): {
    code = chessArr[xy[1] - num][xy[0]]
    break
  }
  case(2): {
    code = chessArr[xy[1] - num][xy[0] + num]
    break
  }
  case(3): {
    code = chessArr[xy[1]][xy[0] - num]
    break
  }
  case(4): {
    code = chessArr[xy[1]][xy[0] + num]
    break
  }
  case(5): {
    code = chessArr[xy[1] + num][xy[0] - num]
    break
  }
  case(6): {
    code = chessArr[xy[1] + num][xy[0]]
    break
  }
  case(7): {
    code = chessArr[xy[1] + num][xy[0] + num]
    break
  }
  default :return false
  }
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