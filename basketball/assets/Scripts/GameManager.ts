import UIManager, { Panel } from './UIManager';
import TouchMove from './TouchMove';
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component 
{
    @property(cc.Node)
    ball : cc.Node = null;
    ///检测球是否在框的区域    
    @property(UIManager)
    uiManager :UIManager = null;

    private gamestatus :boolean = false;

    private timer:number = 0;
    private maxTimer:number = 0;
    private ballMaxCount:number = 0;
    private ballCount :number = 0;

    ///开始计时
    private timerStatus :boolean = false;

    private next :boolean = false;

    init(_timer:number,_count:number, _next:boolean = true)
    {
        this.timer = _timer;
        this.ballMaxCount = _count;
        this.maxTimer = _timer;
        this.next = _next;
    }
    

    private RegisterEvent()
    {
        this.ball.on("TOUCH_END",()=>
        {
            if (this.ball.getComponent(TouchMove).GetIsGoal() && this.gamestatus ) {
                this.AddScore();
            }
        },this);

        this.uiManager.node.on("START_GAME",()=>
        {
            this.StartGame();
        },this);

        this.uiManager.node.on("RESTART_GAME",()=>
        {
            this.uiManager.ChangePanel(Panel.Settle);
            this.init(this.maxTimer,this.ballMaxCount,this.next);
            this.StartGame();
        },this);

    }
    onLoad ()
    {
        
        this.RegisterEvent();

        // this.init(10,5);
    }


    EnterGame ()
    {
        // this.AddBasketBall();
        this.uiManager.ChangePanel(Panel.StartPanel,true);
    }
    

    private StartGame()
    {
        this.AddBasketBall();
        this.ballCount = 0;
        this.gamestatus = true;
        this.timerStatus = true;
        this.uiManager.ChangePanel(Panel.SceneUI,true);
        this.uiManager.FreshScore(this.ballCount);
    }


    localTimer :number = -1;
    update(dt)
    {
        if (this.timerStatus== false) {
            return;
        }
        
        if (this.localTimer != -1) 
        {
            this.timer -= dt;
            let tmp = Math.floor(this.timer);
            if (this.localTimer != tmp ) {
                this.uiManager.FreshTimer(this.localTimer);
            }
            this.localTimer = tmp;
        }
        else
        {
            this.localTimer = Math.floor(this.timer);
            this.uiManager.FreshTimer(this.localTimer);
        }
        
        if (this.timer< 0) {
            this.SettleGame();
            return;
        }
    }
    //结算游戏
    private SettleGame ()
    {
        this.DestroyBall()
        this.timerStatus= false;
        this.uiManager.ChangePanel(Panel.SceneUI);
        this.uiManager.ChangePanel(Panel.Settle,true);
        this.uiManager.FreshSettle(this.ballCount >= this.ballMaxCount,this.next);
    }
    //加分
    AddScore()
    {
        this.ballCount +=1;
        this.uiManager.FreshScore(this.ballCount);

        this.AddBasketBall();
    }

    //显示球 随机设置位置
    private AddBasketBall ()
    {
        if (this.ball == null) {
            return;
        }
        this.ball.active = true;
        this.ball.setPosition(GameManager.RandomBallPos());
    }

    //隐藏球
    private DestroyBall()
    {
        this.ball.active = false;
    }
    //随机位置
    private static RandomBallPos()
    {
        const x = cc.winSize.width * (Math.random() - .5);
        const y = cc.winSize.height * (Math.random() - .5);
        return cc.v2(x,y);
    }

    onDestroy ()
    {
        if (this.ball && this.ball.isValid ) {
            this.ball.destroy();
        }
    }
}
