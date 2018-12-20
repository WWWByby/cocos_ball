import BasketModule from "../module/BasketModule";
import Test from "../Test";
import GameModule from "../module/GameModule";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMove extends cc.Component {
    mouseDrag :Boolean = false;

    private moveCallBack : Function;
    private moveEndCallBack : Function;
    

    start () 
    {
        this.moveCallBack = (event)=>
        {
            var x = event.getDeltaX();
            var y = event.getDeltaY();
            this.node.x += x;
            this.node.y += y;
        };
        this.moveEndCallBack = ( event) =>
        {
        };

        this.mouseDrag = false;
        this.node.on('touchmove', this.moveCallBack, this.node);
        this.node.on('touchend',this.moveEndCallBack ,this);
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
