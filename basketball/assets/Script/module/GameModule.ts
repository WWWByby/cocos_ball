// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
class levClass {
    readonly level:number = 0;
    readonly time:number = 0;
    readonly basketBall :number = 0;
    constructor( _lev, _time,count ) {
        this.level = _lev;
        this.time = _time;
        this.basketBall = count;
    }
}
var levelConfig = [
    new levClass(1,30,10),
    new levClass(2,20,8),
    new levClass(3,10,5),
];


const {ccclass, property} = cc._decorator;

@ccclass
export default class GameModule 
{
    private static score : number = 0;
    
    private static level : number = -1;

    static AddScore(count : number = 1)
    {
        GameModule.score += count;
    }

    static ResetScore()
    {
        GameModule.score = 0;
    }

    static GetScore()
    {
        return GameModule.score;
    }

    static CheckLevel()
    {
        let lev = GameModule.GetCurrentLevel();
        let score = GameModule.GetScore();
        if (GameModule.level == -1) {
            return true;
        }
        if (score >= levelConfig[GameModule.level].basketBall) {
            return true;
        }
        return false;
    }
    
    static AddLevel()
    {
        if (levelConfig[GameModule.level+1]) {
            GameModule.level +=1;
        }
    }

    static GetCurrentLevel()
    {
        return GameModule.level;
    }

    static GetCurrentTimer()
    {
        return levelConfig[GameModule.level].time;
    }

    private static gameStatus :boolean = false;

    static ChangeStatus(status:boolean)
    {
        GameModule.gameStatus = status;
    }

    static GetStatus()
    {
        return GameModule.gameStatus;
    }
}
