const debug = require('debug')('ok:showPiessPosition')


const xyToCav = ({ pieceLocation, beginPath, distance }) => {
  return pieceLocation.map((coordinate) => distance * (coordinate - 1) + beginPath)
}


export default ({ ctx, pieceLocation, beginPath, distance, chessArr }, color) => {
  if(!ctx || !chessArr) return debug('初始化失败')
  const xy = xyToCav({ pieceLocation, beginPath, distance })
  //debug('show xy', xy, distance, beginPath)
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(xy[0], xy[1], distance/2 - 5, 0, 2 * Math.PI)
  ctx.fill()
  return null
}