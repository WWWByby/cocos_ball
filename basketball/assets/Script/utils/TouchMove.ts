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
    mouseDrag :Boolean = false;

    start () {
        this.mouseDrag = false;

        function onTouchMove(event) {
            var x = event.getDeltaX();
            var y = event.getDeltaY();
            this.x += x;
            this.y += y;
        }

        this.node.on('touchmove',onTouchMove, this.node);

        this.node.on('touchend',function(event)
        {
            cc.log("touchend");
        }  ,this);
    }

    onCollisionEnter  (other ,self)
    {
        this.mouseDrag = true;
    }

    onCollisionExit () 
    {
        this.mouseDrag = false;
    }
}
