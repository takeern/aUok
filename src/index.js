import init from './lib/init'
import showPiess from './lib/showPiessPosition'
const debug = require('debug')('ok:index')

// @ctx canvas node
// @pieceLocation {array}
// @chessArr {doble arr}
// @nowChessMan {string}
// @beginPath {int}
// @distance {int}
const { ctx, pieceLocation, chessArr, nowChessMan, beginPath, distance } = init()
//  存储走的路径
const historyPath = []

const keyPress = (e) => {
  const keyCode = e.which
  switch(keyCode) {
  case('37'): {
      //todo 触发向左
      return null
  }
  case('38'): {
    //todo 触发向上
    return null
  }
  case('39'): {
    //todo 触发向右
    return null
  }
  case('40'): {
    //todo 触发想下
    return null
  }
  case('13'): {
    //todo 触发enter
    return null
  }
  default:return null
  }
}

document.onkeydown = keyPress


showPiess({ ctx, pieceLocation, beginPath, distance, chessArr }, 'red')

