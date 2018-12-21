const {ccclass, property} = cc._decorator;

@ccclass
export default class TouchMove extends cc.Component {
    private isGoal :Boolean = false;

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
            this.node.emit("TOUCH_END");
        };

        this.isGoal = false;
        
        this.node.on('touchmove', this.moveCallBack, this.node);

        this.node.on('touchend',this.moveEndCallBack ,this);
    }

    onCollisionEnter  (other ,self)
    {
        this.isGoal = true;
    }

    onCollisionExit () 
    {
        this.isGoal = false;
    }

    GetIsGoal() {
        return this.isGoal;
    }
}
