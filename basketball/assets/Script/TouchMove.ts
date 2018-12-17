import GameManager from "./GameManager";
import Dialog from "./Dialog";

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
export default class TouchMove extends cc.Component {

    @property(cc.Node)
    touchPt : cc.Node = null;
    @property (GameManager)

    manager : GameManager = null;

    @property (Dialog)
    uilog : Dialog = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    getTouchNode  () 
    {
        if(!this.touchPt)
        {
            this.touchPt = this.node;
        }

        return this.touchPt;
    }
    start () {

    }

    onLoad () {
        function onTouchMove(event) {
            var x = event.getDeltaX();
            var y = event.getDeltaY();
            this.x += x;
            this.y += y;
            }
        let touch = this.getTouchNode();
        touch.on('touchmove', onTouchMove, touch);

        cc.director.getCollisionManager().enabled = true;   
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }

    onCollisionEnter  (other ,self)
    {
        if (this.manager!=null) {
            // if(other.group == "win")
            // {
                cc.log("===========<>>>>>");
                this.manager.AddScore();
                this.uilog.FreshScore();
                this.node.destroy();
                
            // }
        }
        
    }
    // update (dt) {}
}
