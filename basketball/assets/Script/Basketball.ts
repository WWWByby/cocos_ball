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
export default class Basketball extends cc.Component {

    @property(cc.Node)
    basketballNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        if ( this.basketballNode ==null ) {
            this.basketballNode = this.node;
        }
        // 随机出现在屏幕上
        const x = this.node.width * (Math.random() - .5);
        const y = this.node.height * (Math.random() - .5);

        cc.log("pos",x,y);
        this.basketballNode.setPosition(cc.v2(x, y))
    }

    // start () {}

    // update (dt) {}
}
