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

    //球当前节点
    @property(cc.Node)
    basketballNode: cc.Node = null;
    onEnable () {

        if(this.basketballNode == null)
        {   
            let tmpNode = this.node;
            while (tmpNode.parent != null && tmpNode.parent.name != "Canvas") {
                tmpNode = tmpNode.parent;
            }
            cc.log("root name" , tmpNode.name);
            this.basketballNode = tmpNode;
        }
        // 随机出现在屏幕上
        const x = cc.winSize.width * (Math.random() - .5);
        const y = cc.winSize.height * (Math.random() - .5);

        this.node.setPosition(cc.v2(x, y));
    }
}
