import BasketModule from "../module/BasketModule";
import DialogStack from "../view/DialogStack";
import GameModule from "../module/GameModule";
import SceneUI from "../view/\bSceneUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartUp extends cc.Component {

    @property(cc.Node)
    SceneRoot :cc.Node = null;
    @property(cc.Node)
    UIRoot :cc.Node = null;
    @property(cc.Node)
    ballNode :cc.Node = null;

    private static instance : StartUp = null;

    public static get GetInstance() : StartUp {
        return StartUp.instance;
    }
    
    onLoad ()
    {
        StartUp.instance = this;
        cc.director.getCollisionManager().enabled = true;   
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
    }


    callback ()
    {
        GameModule.AddScore();

        let node = DialogStack.GetStackPanel("SceneUI");

        if (node) {
            let script = node.getComponent(SceneUI);
            if (script) {
                script.fresh();
            }
        }
        else{
            this.node.off("addScore",this.callback)
        }
    }

    start ()
    {
        DialogStack.InitSceneUI();
        this.node.on("addScore",this.callback);
    }

    ///创建球生成的父节点
    public get GetBallNode() : cc.Node {
        if (this.ballNode == null) {
            var node = new cc.Node("basketNode");
            node.parent = this.SceneRoot;
            this.ballNode = node;
        }
        return this.ballNode;
    }

    onDestroy ()
    {
        // this.node.removeFromParent();
        this.node.off("addScore");
    }

}
