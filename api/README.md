# API
### version 1.0
modul        |  description  |
:----------- | :-----------: |
init         |初始化应用       | 
input        |五子棋输入模块   |
show         |将输入展示到canvas|
goBack       |悔棋            |
thunder      |智能算法        |
checkOk      |判断胜利        |

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

-返回值
参数          | 类型           | 说明          |
:----------- | :-----------:  |------------- |
boradArr     | [[]]           | 棋盘数组       |
pieceLocation| [][]          | 15            | 
ctx          | node          | canvas node   | 
nowChessMan  | string        | 当前下棋者      |  