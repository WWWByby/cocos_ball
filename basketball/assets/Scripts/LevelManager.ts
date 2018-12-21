import GameManager from './GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelManager extends cc.Component {

    @property(cc.Node)
    scenePrefab :cc.Node = null;

    private config = [];
    private level :number = 0;
    start ()
    {
        cc.director.getCollisionManager().enabled = true;   
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.config[0] = { time : 30, count : 10 };
        this.config[1] = { time : 20, count : 8 };
        this.config[2] = { time : 10, count : 5 };
        this.PushScene(0);

        cc.game.on("NEXT_GAME",()=>
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
