import ResourcesLoader from "./utils/ResourcesLoader";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component 
{
    start() {
        let dic = {};
        let promise = new Promise(function(resolve, reject) {
            console.log('Promise');

            ResourcesLoader.LoadStack("Prefabs/UINode",(prefab)=>
            {

                dic[prefab.name] = prefab;

                cc.log(dic[prefab.name],"预制名字",prefab.name);
                cc.log("load------>>>>",  prefab instanceof cc.Prefab );
            });

            resolve();
          });
          cc.log(promise.then(
              function () {
                  cc.log(" Promise successed ");
              }
          ));
    }


    


    
}
