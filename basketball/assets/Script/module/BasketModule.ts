import ResourcesLoader from "../utils/ResourcesLoader";
import StartUp from "../utils/StartUp";
import TouchMove from "../utils/TouchMove";

const {ccclass} = cc._decorator;

@ccclass
export default  class BasketModule
{
    static currentNode : cc.Node = null;
    
    static AddBasketBall()
    {

        BasketModule.DeleteBall(BasketModule.currentNode);
        ResourcesLoader.LoadStack("Prefabs/Ball",(prefab)=>
        {
            let node = cc.instantiate(prefab);
            node.setParent(StartUp.GetInstance.GetBallNode);
            let touch = node.addComponent(TouchMove);
            BasketModule.currentNode = node;
        });
    }

    static DeleteSaveBall()
    {
        BasketModule.DeleteBall(BasketModule.currentNode);
    }

    static DeleteBall(node : cc.Node)
    {
        if (node) {
            node.destroy();
        }
    }
}
