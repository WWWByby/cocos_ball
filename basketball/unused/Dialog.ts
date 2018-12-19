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

    @property
    text: string = '进球数：';
    
    @property
    private timer : number = 0;

    @property
    private resettimer : number = 0;
    
    private completeAction : cc.Action = null;

    private static instance :Dialog;
    public static get GetInstance() :  Dialog{
        return Dialog.instance;
    }

    onLoad ()
    {
        if (Dialog.instance == null) {
            Dialog.instance = this;
        }else
        {
            Dialog.instance.node.destroy();
            Dialog.instance = this;
        }

        if (this.timerLabel) {
            this.timerLabel.node.active = false;
        }
    }

    start () {
        this.FreshScore();
        
        // this.completeAction.clone = this.Compelete;
        
    }
    //分数刷新
    FreshScore()
    {
        this.label.string = this.text + GameManager.GetInstance.currentCount;
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

    

    update (dt) {
        if(this.timer >0)
        {
            this.timer -= dt;

            this.timerLabel.string = (Math.ceil(this.timer)).toString();

            if (this.timer  <=0) 
            {
                GameManager.GetInstance.status = false;
                GameManager.GetInstance.PushSettleLog();
            }
        }
    }


    private stackList : cc.Node[] = [];

    Push ( name)
    {
        let _node = this.node.getChildByName(name);
        this.stackList.push(_node);
        if (_node) {
            _node.active = true;
        }
        else
            cc.error(name + " is not find");
    }

    GetStackLength ()
    {
        return this.stackList.length;
    }

    PopDialog ()
    {
        if (this.stackList.length == 0) {
            cc.error("pop is failed");
            return ;
        }
        let _node = this.stackList.pop();
        if (_node) {
            _node.active = false;
        }
        else
            cc.error(name + " is not find");
    }

    ResetDialog ()
    {
        while (this.GetStackLength()!=0 ) {
            this.PopDialog();
        }
    }
}
