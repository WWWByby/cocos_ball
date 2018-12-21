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

export enum Panel {
    SceneUI = 0,
    Settle = 1,
    StartPanel = 2
}
@ccclass
export default class UIManager extends cc.Component 
{

    @property(cc.Node)
    SceneUI :cc.Node = null;

    @property(cc.Node)
    Settle :cc.Node = null;

    @property(cc.Node)
    StartPanel :cc.Node = null;


    panelList : cc.Node[] = [];
    onLoad()
    {
        this.panelList.push(this.SceneUI);
        this.panelList.push(this.Settle);
        this.panelList.push(this.StartPanel);
    }

    start ()
    {
        
    }

    ChangePanel(name : Panel,status :boolean = false)
    {
        let number = name.valueOf();
        const element = this.panelList[number];
        element.active = status
        if (!status) {
            return
        }
        switch (name) {
            case Panel.StartPanel:

                this.StartPanelInit();
                break;
            case Panel.SceneUI:
                this.SceneUIInit();
                break;
            case Panel.Settle:
                this.SettleInit();
                break;
        }
    }

    private StartPanelInit()
    {
        let number = Panel.StartPanel.valueOf();
        const element = this.panelList[number];
        let start = element.getChildByName("start");
        let btn = start.getComponent(cc.Button);
        btn.node.on("click", ()=>
        {
            this.ChangePanel(Panel.StartPanel);
            this.node.emit("START_GAME");
        } ,this);
    }
    private scoreLabel :cc.Label = null;
    private timerLabel :cc.Label = null;
    

    FreshScore(msg:number)
    {
        this.scoreLabel.string = msg.toString();
    }

    FreshTimer(msg:number)
    {
        this.timerLabel.string = msg.toString();
    }

    private SceneUIInit ()
    {
        let number = Panel.SceneUI.valueOf();
        const element = this.panelList[number];
        if (this.timerLabel == null) {
            this.timerLabel = element.getChildByName("timer").getComponent(cc.Label);
        }
        if (this.scoreLabel == null) {
            this.scoreLabel = element.getChildByName("score").getComponent(cc.Label);
        }
    }

    private result :cc.Label = null;
    private next : cc.Node = null;

    FreshSettle(resultmsg:boolean,nt :boolean)
    {
        this.result.string = resultmsg == true ? "过关了" : "失败了"
        this.next.active = nt && resultmsg;
    }


    private SettleInit()
    {
        let number = Panel.Settle.valueOf();
        const element = this.panelList[number];
        if (this.result==null) {
            this.result = element.getChildByName("result").getComponent(cc.Label);
        }

        if (this.next == null) {
            this.next = element.getChildByName("next");
        }

        let restart = element.getChildByName("restart");
        restart.on('click', ()=>
        {
            this.node.emit("RESTART_GAME")
        },this);


        this.next.on('click', ()=>
        {
            this.node.emit("NEXT_GAME")
        },this);
    }

}
