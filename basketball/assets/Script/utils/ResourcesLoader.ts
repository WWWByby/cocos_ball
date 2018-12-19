// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass} = cc._decorator;

class Completed {
    url : string;
    complete:Function;
    constructor(_url,_complete = null) {
        this.url = _url;
        this.complete = _complete;
    }
}

@ccclass
export default class ResourcesLoader  {

    private static assetDic = {};

    static LoadPrefab ()
    {
        if (ResourcesLoader.loaderStack.length == 0 ) {
            return ;
        }

        if (ResourcesLoader.loadStatus) {
            return;
        }
        ResourcesLoader.loadStatus = true;
        let popData = ResourcesLoader.loaderStack.shift();
        let url = popData.url;
        let complete = popData.complete;

        if (ResourcesLoader.assetDic[url]) {
            if (complete) {
                complete(ResourcesLoader.assetDic[url]);
            }
            ResourcesLoader.loadStatus = false;
            ResourcesLoader.LoadPrefab();
            return;
        }

        cc.loader.loadRes( url ,function (err, prefab) {
            if (err) {
                cc.error("load error prefab " + url);
                ResourcesLoader.loadStatus = false;
                ResourcesLoader.LoadPrefab();
                return;
            }
            cc.log("加载完成" + url);
            if (complete) 
            {
                complete(prefab);
            }
            ResourcesLoader.assetDic[url] = prefab;

            ResourcesLoader.loadStatus = false;
            ResourcesLoader.LoadPrefab();
        });
    }
    static loaderStack : Completed[] = [];


    
    static loadStatus : boolean = false;

    static LoadStack(_url,_complete = null)
    {
        let complete_info = new Completed(_url,_complete);
        ResourcesLoader.loaderStack.push(complete_info);
        ResourcesLoader.LoadPrefab();
    }

    
    
}
