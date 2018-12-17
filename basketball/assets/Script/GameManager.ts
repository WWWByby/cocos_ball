const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    count : number = 0;
    onLoad () {
        this.count = 0;
    }


    AddScore ()
    {
        this.count++;
    }

    ResetScore ()
    {
        this.count = 0;
    }

}