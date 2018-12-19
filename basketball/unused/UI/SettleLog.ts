import GameManager from "../GameManager";
import BasketManager from "../BasketManager";
import Dialog from "../Dialog";

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
export default class SettleLog extends cc.Component {

    @property(cc.Label)
    label :cc.Label = null;

    @property(cc.Button)
    restartbutton :cc.Button = null;

    @property(cc.Button)
    nextbutton :cc.Button = null;

    onEnable ()
    {
        this.restartbutton.node.active = true;
        this.restartbutton.node.on('click', this.ResetCallback,this);
        this.label.string = (GameManager.GetInstance.CheckOnNextLevel())? "过关了" : "失败了";

        this.nextbutton.node.active = GameManager.GetInstance.CheckOnNextLevel() && GameManager.GetInstance.currentLevel < GameManager.GetInstance.GetConfigLenth() ;
        this.nextbutton.node.on("click", this.EnterCallBack,this);
    }


    ResetCallback ()
    {
        cc.log("点击回调");
        GameManager.GetInstance.ResetStartGame();
    }

    EnterCallBack()
    {
        if (GameManager.GetInstance.CheckOnNextLevel()) {

            let moveTo = cc.moveTo(1,cc.p(-cc.winSize.width,0));

            let callF2 = cc.callFunc(function() {
                resetPos();
            }, this);


            let resetPos = ()=>
            {
                GameManager.GetInstance.node.setPosition(cc.winSize.width,0);
            };
            let moveTo2 = cc.moveTo(1,cc.p(0,0));
            let callF = cc.callFunc(function() {
                GameManager.GetInstance.EnterNextGame();
            }, this);

            let action = cc.sequence(moveTo,callF2,moveTo2,callF);
            GameManager.GetInstance.node.runAction(action);
        }
    }



    // update (dt) {}
}
