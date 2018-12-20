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

    StartPanelInit()
    {
        let number = Panel.StartPanel.valueOf();
        const element = this.panelList[number];
        let start = element.getChildByName("start");
        let btn = start.getComponent(cc.Button);
        btn.node.on("click", ()=>
        {
            this.ChangePanel(Panel.StartPanel);
            cc.game.emit("START_GAME");
        } ,btn.node);
    }

    SceneUIInit ()
    {
        let number = Panel.SceneUI.valueOf();
        const element = this.panelList[number];
        let timerLabel = element.getChildByName("timer").getComponent(cc.Label);
        let infoLabel = element.getChildByName("score").getComponent(cc.Label);

        cc.game.on("TIME_CHANGE",(event)=>
        {
            timerLabel.string = event.detail.msg
        })
        cc.game.on("SCORE_CHANGE",(event)=>
        {
            infoLabel.string = event.detail.msg
        })
        // SCORE_CHANGE
    }

    SettleInit()
    {
        let number = Panel.Settle.valueOf();
        const element = this.panelList[number];
        let lb = element.getChildByName("result").getComponent(cc.Label);
        let next = element.getChildByName("next");

        cc.game.on("SETTLE_END",(event)=>
        {
            cc.log("====>>>",event.detail.msg);
            // result
        
            lb.string = event.detail.msg == true ? "过关了" : "失败了"
            next.active = event.detail.next && event.detail.msg ;
            // timerLabel.string = event.detail.msg
        })

        let restart = element.getChildByName("restart");
        restart.on('click', ()=>
        {
            cc.game.emit("RESTART_GAME")
        },this);


        next.on('click', ()=>
        {
            cc.game.emit("NEXT_GAME")
        },this);
    }

}
