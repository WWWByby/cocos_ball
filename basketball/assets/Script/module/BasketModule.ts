import ResourcesLoader from "../utils/ResourcesLoader";
import StartUp from "../utils/StartUp";
import TouchMove from "../utils/TouchMove";

const {ccclass} = cc._decorator;

@ccclass
export default  class BasketModule
{

    static AddBasketBall()
    {
        cc.log("========>>>");
        ResourcesLoader.LoadStack("Prefabs/Ball",(prefab)=>
        {
            cc.log("========>>>");
            let node = cc.instantiate(prefab);
            node.parent = StartUp.GetInstance.SceneRoot;
            node.addComponent(TouchMove);
        });
    }
}
