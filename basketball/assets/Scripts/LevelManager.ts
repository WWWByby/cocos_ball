import GameManager from './GameManager';
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
export default class NewClass extends cc.Component {

    @property(cc.Node)
    scenePrefab :cc.Node = null;

    config = [];
    level :number = 0;
    start ()
    {
        this.config[0] = { time : 5, count : 1 };
        this.config[1] = { time : 5, count : 1 };
        this.config[2] = { time : 5, count : 1 };
        this.PushScene(0);

        cc.game.on("NEXT_GAME",()=>
        {
            this.level = this.level +1;
            this.PushScene(this.level);
        });
    }

    currentNode :cc.Node = null;

    PushScene(level:number)
    {
        this.level = level;
        let config = this.config[level];

        cc.log(level,"=====>>>");
        if (this.currentNode==null) {
            let asset = cc.instantiate(this.scenePrefab);
            asset.active = true
            asset.setParent(this.node);
            asset.setPosition(cc.v2(0,0));

            
            this.currentNode = asset;
            let gm = asset.getComponent(GameManager);
            gm.init(config.time,config.count,level < (this.config.length-1));
            gm.EnterGame();
        }
        else{
            let asset = cc.instantiate(this.scenePrefab);
            asset.active = true
            asset.setParent(this.node);
            asset.setSiblingIndex(0);
            asset.setPosition(cc.winSize.width,0);
            let gm = asset.getComponent(GameManager);
            gm.init(config.time,config.count,level < (this.config.length-1));
            this.RunAction(this.currentNode,asset,()=>
            {
                this.currentNode = asset;
                gm.EnterGame();
            });
        }
    }


    RunAction(upNode:cc.Node,nextNode:cc.Node,callback : Function)
    {
        let callF = cc.callFunc(function() {
            upNode.destroy();
            if (callback) {
                callback();
            }
        }, this);

        let action = cc.sequence(cc.moveTo(1,cc.p(-cc.winSize.width,0)),callF)
        upNode.runAction(action);
        nextNode.runAction(cc.moveTo(1,cc.p(0,0)));
    }
}
