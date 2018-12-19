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
export default class BasketManager extends cc.Component {

    private static instance :BasketManager;
    public static get GetInstance() :  BasketManager{
        return BasketManager.instance;
    }

    @property(cc.Node)
    prefab : cc.Node = null ;
    public get GetPrefab() : cc.Node {
        if (!this.prefab) {
            cc.error(" prefab is null  ");
        }

        return this.prefab;
    }
    onLoad ()
    {
        // BasketManager.instance = this;
        if (BasketManager.instance == null) {
            BasketManager.instance = this;
        }else
        {
            // BasketManager.instance.node.destroy();
            BasketManager.instance = this;
        }
    }

    AddBasketBall ()
    {

        if (this.currentBall) {
            this.currentBall.destroy();
            this.currentBall = null;
        }
        let cnode = cc.instantiate(this.prefab);
        cnode.parent = this.node;
        cnode.active = true;

        this.currentBall = cnode;
    }

    currentBall :cc.Node = null;

    RestartBasket ()
    {
        if (this.currentBall) {
            this.currentBall.destroy();
            this.currentBall = null;
        }
    }

    // update (dt) {}
}
