import DialogStack from "./DialogStack";
import GameModule from "../module/GameModule";
import StartUp from "../utils/StartUp";
import BasketModule from "../module/BasketModule";

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
export default class Settle extends cc.Component {


    restart : cc.Node = null;

    next :cc.Node = null;
    start () {
        if (this.restart == null) {
            this.restart = this.node.getChildByName("restart");
        }

        if (this.next == null) {
            this.next = this.node.getChildByName("next");
        }

        this.next.active = GameModule.CheckLevel() && (GameModule.GetCurrentLevel() < 3);
        this.next.on('click', this.EnterCallBack,this);
        this.restart.on('click', ()=>
        {
            DialogStack.Pop();
            DialogStack.Push("StartPanel");
        },this);
    }
    EnterCallBack()
    {
        if (GameModule.CheckLevel()) {
            DialogStack.Pop();
            let moveTo = cc.moveTo(1,cc.p(-cc.winSize.width,0));

            let callF2 = cc.callFunc(function() {
                resetPos();
            }, this);


            let resetPos = ()=>
            {
                BasketModule.DeleteSaveBall();
                
                StartUp.GetInstance.SceneRoot.setPosition(cc.winSize.width,0);
            };
            let moveTo2 = cc.moveTo(1,cc.p(0,0));
            let callF = cc.callFunc(function() {
                
                DialogStack.Push("StartPanel");
            }, this);

            let action = cc.sequence(moveTo,callF2,moveTo2,callF);
            StartUp.GetInstance.SceneRoot.runAction(action);
        }
    }
    // update (dt) {}
}
