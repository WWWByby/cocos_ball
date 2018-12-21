import UIManager, { Panel } from './UIManager';
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component 
{
    @property(cc.Node)
    ball : cc.Node = null;
    ///检测球是否在框的区域
    ballTriggger : boolean = false;    
    @property(UIManager)
    uiManager :UIManager = null;
    @property
    gamestatus :boolean = false;

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
        cc.game.on("TOUCH_END",()=>
        {
            if (this.ballTriggger == true) {
                this.AddScore();
            }
        },this);

        cc.game.on("LOCAL_ENTER_CHANGE",()=>
        {
            this.ballTriggger = true;
        },this);

        cc.game.on("LOCAL_EXIT_CHANGE",()=>
        {
            this.ballTriggger = false;
        },this);

        cc.game.on("START_GAME",()=>
        {
            this.StartGame();
        },this);

        cc.game.on("RESTART_GAME",()=>
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
    

    StartGame()
    {
        this.AddBasketBall();
        this.ballCount = 0;
        this.gamestatus = true;
        this.timerStatus = true;
        this.uiManager.ChangePanel(Panel.SceneUI,true);
        cc.game.emit("SCORE_CHANGE",{
            msg:this.ballCount
        })
    }


    localTimer :number = -1;
    update(dt)
    {
        if (this.timerStatus== false) {
            return;
        }
        
        if (this.localTimer != -1) {
            this.timer -= dt;
            let tmp = Math.floor(this.timer);
            if (this.localTimer != tmp ) {
                cc.game.emit("TIME_CHANGE", {
                    msg: this.localTimer
                  });
            }
            this.localTimer = tmp;
        }
        else{
            this.localTimer = Math.floor(this.timer);
            cc.game.emit("TIME_CHANGE", {
                msg: this.localTimer
              });
        }
        
        if (this.timer< 0) {
            this.SettleGame();
            return;
        }
    }
    //结算游戏
    SettleGame ()
    {
        this.DestroyBall()
        this.timerStatus= false;
        this.uiManager.ChangePanel(Panel.SceneUI);
        this.uiManager.ChangePanel(Panel.Settle,true);

        cc.game.emit("SETTLE_END",{
            msg:this.ballCount >= this.ballMaxCount,
            next:this.next
        })
    }

    AddScore()
    {
        this.ballCount +=1;
        cc.game.emit("SCORE_CHANGE",{
            msg:this.ballCount
        })

        this.AddBasketBall();
    }


    AddBasketBall ()
    {
        if (this.ball == null) {
            return;
        }
        this.ball.active = true;
        this.ball.setPosition(GameManager.RandomBallPos());
    }

    DestroyBall()
    {
        this.ball.active = false;
    }

    static RandomBallPos()
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
