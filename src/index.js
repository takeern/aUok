import init from './lib/init'
import showPiess from './lib/showPiessPosition'
const debug = require('debug')('ok:index')

// @ctx canvas node
// @pieceLocation {array}
// @chessArr {doble arr}
// @nowChessMan {string}
// @beginPath {int}
// @distance {int}
let { ctx, pieceLocation, chessArr, nowChessMan, beginPath, distance } = init()

//  存储走的路径
const historyPath = []
debug(pieceLocation)
const keyPress = (e) => {
  const keyCode = e.which
  debug('show keycode', keyCode)
  let [ ...newPieceLocation ] = pieceLocation
  let command = 'move'
  switch(keyCode) {
  case(37): {
    //todo 触发向左
    newPieceLocation[0] -= 1
    break
  }
  case(38): {
    newPieceLocation[1] -= 1
    break
  }
  case(39): {
    newPieceLocation[0] += 1
    break
  }
  case(40): {
    newPieceLocation[1] += 1
    break
  }
  case(13): {
    command = 'input'
    break
  }
  default:return null
  }
  pieceLocation = showPiess ({ ctx, pieceLocation, newPieceLocation, beginPath, distance, chessArr, nowChessMan }, 'move') 
  return null
}

document.onkeydown = (e) => {
  // debug(nowChessMan)/ debug(nowChessMan)
  if(nowChessMan !== 'person') return
  keyPress(e)
}




