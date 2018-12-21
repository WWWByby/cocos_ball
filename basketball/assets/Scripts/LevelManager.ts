import GameManager from './GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelManager extends cc.Component {

    @property(cc.Prefab)
    scenePrefab :cc.Prefab = null;

    private config = [
       { time : 30, count : 10 },
       { time : 20, count : 8 },
       { time : 10, count : 5 },
    ];

    private level :number = 0;
    start ()
    {
        cc.director.getCollisionManager().enabled = true;   
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        
        this.PushScene(this.level);
        this.currentNode.getComponent(GameManager).uiManager.node.on("NEXT_GAME",()=>
        {
            this.level = this.level +1;
            this.PushScene(this.level);
        });
    }

    private currentNode :cc.Node = null;

    private PushScene(level:number)
    {
        this.level = level;
        let config = this.config[level];
        let asset = cc.instantiate(this.scenePrefab);
        
        asset.active = true
        asset.setParent(this.node);
        let gm = asset.getComponent(GameManager);
        gm.init(config.time,config.count,level < (this.config.length-1));
        if (this.currentNode==null) {
            asset.setPosition(cc.v2(0,0));
            gm.EnterGame();
        }
        else{
            asset.setPosition(cc.winSize.width,0);
            this.RunAction(this.currentNode,asset,()=>
            {   
                gm.EnterGame();
            });
        }
        this.currentNode = asset;
    }


    private RunAction(upNode:cc.Node,nextNode:cc.Node,callback : Function)
    {
        let callF = cc.callFunc(function() {
            upNode.destroy();
            // cc.log();
            if (callback) {
                callback();
            }
        }, this);

        let action = cc.sequence(cc.moveTo(1,cc.p(-cc.winSize.width,0)),callF)
        upNode.runAction(action);
        nextNode.runAction(cc.moveTo(1,cc.p(0,0)));
    }

    
}
