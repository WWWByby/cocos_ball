import Dialog from "./Dialog";
import BasketManager from "./BasketManager";

const {ccclass, property} = cc._decorator;

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

@ccclass
export default class GameManager extends cc.Component {
    @property(cc.Node)
    ballParentNode : cc.Node = null;

    @property(cc.Node)
    UIParentNode : cc.Node = null;


    @property(Dialog)
    private uilog : Dialog = null;

    public get GetUINode() : Dialog {
        if (this.uilog == null) {
            this.uilog = this.UIParentNode.getComponent("Dialog");
        }
        return this.uilog;
    }
    private static instance :GameManager;
    public static get GetInstance() :  GameManager{
        return GameManager.instance;
    }

    @property
    currentCount : number = 0;

    @property
    currentLevel : number = 0;

    onLoad () {
        if (GameManager.instance == null) {
            GameManager.instance = this;
        }else
        {
            GameManager.instance.node.destroy();
            GameManager.instance = this;
        }
        cc.log(GameManager.GetInstance.GetUINode);
        // this.StartGame();
        
    }

    StartGame ( lev : number = 1 )
    {   
        this.currentCount = 0;
        this.currentLevel = lev;
        this.status = true;
        Dialog.GetInstance.ResetTimer(10);
    }

    status : Boolean = false;

    start ()
    {
        this.EnterNextGame();
        this.AddBall();
    }


    PushSettleLog()
    {
        Dialog.GetInstance.Push("settleLog");
    }

    AddBall ()
    {
        BasketManager.GetInstance.AddBasketBall();
    }

    AddScore ()
    {
        this.currentCount++;
        Dialog.GetInstance.FreshScore();
    }
    ResetScore ()
    {
        Dialog.GetInstance.FreshScore();
    }


    ResetStartGame()
    {
        this.StartGame(this.currentLevel);
        this.ResetScore();
        Dialog.GetInstance.ResetDialog();
        let currentConfig = levelConfig[this.currentLevel-1];
        Dialog.GetInstance.ResetTimer(currentConfig.time);
        this.AddBall();
    }


    EnterNextGame()
    {
        this.currentLevel +=1;
        this.ResetStartGame();
    }

    GetConfigLenth ()
    {
        return levelConfig.length; 
    }

    CheckOnNextLevel()
    {
        let currentConfig = levelConfig[this.currentLevel-1];

        if (this.currentCount >= currentConfig.basketBall) {
            return true;
        }
        return false;

    }
}