import GameManager from "./GameManager";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dialog extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Label)
    timerLabel: cc.Label = null;

    @property (GameManager)
    manager : GameManager = null;

    @property
    text: string = '进球数：';
    
    @property
    private timer : number = 0;

    @property
    private resettimer : number = 0;
    
    private completeAction : cc.Action = null;
    
     Compelete() {
        cc.log("执行完成");  
      }
    
    start () {
        this.FreshScore();
        
        // this.completeAction.clone = this.Compelete;
        // this.ResetTimer(10);
    }
    //分数刷新
    FreshScore()
    {
        this.label.string = this.text + this.manager.count;
    }

    //还原成新时间
    ResetTimer(_timer) {
        this.timer = -1;
        this.resettimer = _timer;

        this.timer =  this.resettimer;
        // cc.log("还原计时器",this.resettimer);

        if (this.timerLabel) {
            this.timerLabel.node.active = true;
        }
    }


    onLoad ()
    {
        if (this.timerLabel) {
            this.timerLabel.node.active = false;
        }
    }

    update (dt) {
        if(this.timer >0)
        {
            this.timer -= dt;

            this.timerLabel.string = (Math.ceil(this.timer)).toString();

            if (this.timer  <=0) {
                if (this.completeAction) {
                    this.node.runAction(this.completeAction);
                } 
            }
        }
    }
}
