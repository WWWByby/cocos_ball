import GameModule from "../module/GameModule";
import DialogStack from "./DialogStack";

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
export default class SceneUI extends cc.Component {

    timerLabel : cc.Label = null;

    infoLabel :cc.Label = null;

    timer : number = 0;
    start () {
        if (this.timerLabel== null) {
            this.timerLabel = this.node.getChildByName("timer").getComponent(cc.Label);
        }
        if (this.infoLabel== null) {
            this.infoLabel = this.node.getChildByName("score").getComponent(cc.Label);
        }
        this.fresh();

        this.timer = GameModule.GetCurrentTimer();
    }

    update (dt) {
        if(this.timer >0)
        {
            this.timer -= dt;

            this.timerLabel.string = (Math.ceil(this.timer)).toString();

            if (this.timer  <=0) 
            {
                DialogStack.Pop();
                DialogStack.Push("Settle");
                GameModule.ChangeStatus(false);
                return;
            }
        }
    }


    fresh()
    {
        this.infoLabel.string = "进球数：" + GameModule.GetScore();
    }

    // update (dt) {}
}
