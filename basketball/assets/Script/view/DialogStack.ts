import ResourcesLoader from "../utils/ResourcesLoader";
import StartUp from "../utils/StartUp";

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
export default class DialogStack 
{
    private static panelList : string[] = [];

    private static panelDic : {} = {};
    static InitSceneUI()
    {
        DialogStack.Push("StartPanel");
    }

    static Push(name)
    {
        DialogStack.Create(name);
    }

    private static Create(_name : string)
    {
        ResourcesLoader.LoadStack("Prefabs/"+_name,(prefab)=>
        {
            let node = cc.instantiate(prefab);
            node.setParent(StartUp.GetInstance.UIRoot);
            DialogStack.panelList.push(_name);
            DialogStack.panelDic[_name] = node;
            cc.log(DialogStack.panelList);
        });
    }


    static Pop()
    {
        cc.log(DialogStack.panelList.length,"===>>>>");
        if (DialogStack.panelList.length == 0 ) {
            return;
        }
        let name = DialogStack.panelList.pop();
        DialogStack.Destroy(name);
        // DialogStack.
    }

    private static Destroy(name)
    {
        if(DialogStack.panelDic[name] == null)
        {
            return;
        }
        let node = DialogStack.panelDic[name];
        node.removeFromParent();
        DialogStack.panelDic[name] = null;
    }


    static GetStackPanel(name : string)
    {   
        if (DialogStack.panelDic[name]) {
            return DialogStack.panelDic[name];
        }
        return null;
    }
}
