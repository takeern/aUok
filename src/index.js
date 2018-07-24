import init from './lib/init'
import showPiess from './lib/showPiessPosition'
// const debug = require('debug')('ok:index')
import checkOk from './lib/checkOk'
import thunder from './lib/thunder'


// @ctx canvas node
// @pieceLocation {array}
// @chessArr {doble arr}
// @nowChessMan {string}
// @beginPath {int}
// @distance {int}
let { ctx, pieceLocation, chessArr, nowChessMan, beginPath, distance, personNum } = init()
//  存储走的路径
const historyPath = []
const histortPath1 = []

const onWin = () => {
  let palyer
  if(personNum === 1) {
    palyer = nowChessMan === 'person' ? 'thunder' : '玩家'
  }else{
    palyer = nowChessMan === 'person' ? '玩家2' : '玩家1'
  }
  const winText = `${ palyer }获胜`
  alert(winText)
  //重置应用
  //need change
  ;({ ctx, pieceLocation, chessArr, nowChessMan, beginPath, distance, personNum } = init())
}


const onInput = () => {
  const command = 'input'
  if(chessArr[pieceLocation[1]][pieceLocation[0]] !== 0) return
  const pro = new Promise((resolve) => {
    pieceLocation = showPiess ({ ctx, pieceLocation, beginPath, distance, chessArr, nowChessMan }, command) 
    resolve()
  })
  pro.then(() => {
    let key
    if(personNum === 1) {
      //确认输入 同步到参数
      chessArr[pieceLocation[1]][pieceLocation[0]] = nowChessMan === 'person'? 1 : 2
      historyPath.push(pieceLocation)
      key = checkOk(pieceLocation, chessArr)
      nowChessMan = nowChessMan === 'person'? 'thunder': 'person'
      if(key) onWin()
    }else{
      chessArr[pieceLocation[1]][pieceLocation[0]] = nowChessMan === 'person'? 1 : 2
      if(nowChessMan === 'person') {
        historyPath.push(pieceLocation)
      }else{
        histortPath1.push(pieceLocation)
      }
      key = checkOk(pieceLocation, chessArr)
      nowChessMan = nowChessMan === 'person'? 'otherPerson': 'person'
      if(key) onWin()
    }
  
    //如果电脑对战
    if(personNum === 1 && nowChessMan === 'thunder') {
      const { x, y } = thunder(chessArr)
      pieceLocation = [ x, y ]
      const pro = new Promise((resolve) => {
        pieceLocation = showPiess ({ ctx, pieceLocation, beginPath, distance, chessArr, nowChessMan }, command) 
        resolve()
      })
      pro.then(() => {
        chessArr[pieceLocation[1]][pieceLocation[0]] = 2
        key = checkOk(pieceLocation, chessArr)
        nowChessMan = 'person'
        if(key) onWin()
      })
    }
  })
  // return command
}

const keyPress = (e) => {
  const keyCode = e.which
  const [ ...newPieceLocation ] = pieceLocation
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
    onInput()
    break
  }
  default:return null
  }
  if(command === 'move') {
    pieceLocation = showPiess ({ ctx, pieceLocation, newPieceLocation, beginPath, distance, chessArr, nowChessMan }, command) 
  }
  return null
}

document.onkeydown = (e) => {
  // debug(nowChessMan)
  if(nowChessMan === 'thunder') return
  keyPress(e)
}




