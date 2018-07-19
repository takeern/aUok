# API
### version 1.0
modul        |  description  |
:----------- | :-----------: |
[init](#init)             |初始化应用       | 
input        |五子棋输入模块   |
updateCav    |将输入展示到canvas|
checkOk      |判断胜利        |
thunder      |电脑算法        |
goBack       |悔棋            |

### version 2.0
modul        |  description  |
:----------- | :-----------: |
chatInput    |聊天输入模块     |


#### init()
- 初始化棋盘

参数          | 类型           | 默认        | 说明           |
:----------- | :-----------: |:-----------:|：------------- |
x            | int           | 15          | 棋盘宽         |
y            |int            | 15          | 棋盘长度        |
person       | string        | 1           | 对战人数        |
thunderLev   | string        | diffcult    |   电脑等级      |

- 返回值

参数          | 类型           | 说明          |
:----------- | :-----------:  |------------- |
boradArr     | [[]]           | 棋盘数组       |
pieceLocation| []            | 棋子位置        | 
ctx          | node          | canvas node   | 
nowChessMan  | string        | 当前下棋者      |  

#### input()
- 输入模块
1.  listen  keyboard
  > onMove(pieceLocation,ctx)
2. from form
3. listen mouse

- 返回值

参数          | 类型           | 说明          |
:----------- | :-----------:  |------------- |
chessedArr   | []             |  下棋位置      |

#### updateCav()
- 展示模块
将下棋位置输出到到棋盘

参数          | 类型           | 说明          |
:----------- | :-----------:  |------------- |
chessedArr   |  []            | 下棋位置      |
ctx          | node           | canvas       |
nowChessMan  | string         | 当前下棋者     |  

#### checkOk ()
- 判断当前棋盘胜负

#### thunder （）
- 电脑算法

#### goBack （）
- 悔棋