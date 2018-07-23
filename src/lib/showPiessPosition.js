const debug = require('debug')('ok:showPiessPosition')

//数组转换成canvas像素点
const xyToCav = (pieceLocation, beginPath, distance) => {
  return pieceLocation.map((coordinate) => distance * (coordinate) + beginPath)
}

//画棋
const drawArc = (x, y, distance, ctx, color) => {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(x, y, distance/2 - 5, 0, 2 * Math.PI)
  ctx.fill()
}

//移动棋子
const clearPiess = (oldxy, ctx, distance, pieceLocation, maxLength) => {
  let hStart = oldxy[0] - distance/2 + 5
  let hEnd = oldxy[0] + distance/2 - 5
  let sStart = oldxy[1] - distance/2 + 5
  let sEnd = oldxy[1] + distance/2 - 5
  ctx.fillStyle = 'rgb(213,176,146)'
  debug('maxle', maxLength)
  ctx.fillRect(oldxy[0]-distance/2 + 5, oldxy[1]-distance/2 + 5, distance-10, distance-10)
  if(pieceLocation[0] == 0) {
    hStart = oldxy[0]
  }
  if(pieceLocation[1] == 0) {
    sStart = oldxy[1]
  }
  if(pieceLocation[0] == maxLength - 1) {
    hEnd = oldxy[0]
  }
  if(pieceLocation[1] == maxLength - 1) {
    sEnd = oldxy[1]
  }
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.moveTo(hStart, oldxy[1])
  ctx.lineTo(hEnd, oldxy[1])
  ctx.moveTo(oldxy[0], sStart)
  ctx.lineTo(oldxy[0], sEnd)
  ctx.stroke()
}

export default ({ ctx, pieceLocation, newPieceLocation, beginPath, distance, chessArr, nowChessMan }, command) => {
  if(!ctx || !chessArr) return debug('初始化失败')
  let color
  //初始化棋子
  if(command === 'init') {
    color = 'red'
    const xy = xyToCav(pieceLocation, beginPath, distance)
    drawArc (xy[0], xy[1], distance, ctx, color)
  }

  // debug(command, 'in showpiess')
  //移动下棋
  if(command === 'move') {
    if(newPieceLocation[0] < 0 || newPieceLocation[1] < 0 || newPieceLocation[1] > chessArr.length-1 || newPieceLocation[0] > chessArr.length-1) {
      return pieceLocation
    } 
    [ ...newPieceLocation ] = newPieceLocation || pieceLocation
    color = 'red'
    const newxy = xyToCav(newPieceLocation, beginPath, distance)
    drawArc (newxy[0], newxy[1], distance, ctx, color)

    //  判断棋盘当前位置棋子 
    const key = chessArr[pieceLocation[1]][pieceLocation[0]]
    if(key == 0) {
      const oldxy = xyToCav(pieceLocation, beginPath, distance)
      debug('change move', pieceLocation)
      clearPiess(oldxy, ctx, distance, pieceLocation, chessArr.length)
      return newPieceLocation
    }
    if(key == 1) color = 'white'
    else color = 'black'
    const oldxy = xyToCav(pieceLocation, beginPath, distance)
    drawArc (oldxy[0], oldxy[1], distance, ctx, color)
    return newPieceLocation
  }

  //确定下棋
  if(command === 'input') {
    color = nowChessMan === 'person'? 'white' : 'black'
    const xy = xyToCav(pieceLocation, beginPath, distance)
    drawArc (xy[0], xy[1], distance, ctx, color)
  }
  return null
}