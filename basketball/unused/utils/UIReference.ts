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
export default class UIReference extends cc.Component 
{
    // nodeDoc : map<String,cc.Node> = null ;

    onLoad ()
    {
        // this.nodeDoc = [,];
        // for (let index = 0; index < this.node.childrenCount; index++) {
        //     const element = this.node.children[index];
            
        //     this.nodeDoc[element.name] = element;
        // }

        // cc.log(this.nodeDoc);
    }
}
