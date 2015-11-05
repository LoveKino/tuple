/**
 * define tuple
 *
 * (a,(b,c)) == ((a,b),c) === (a,b,c)
 */

var Tuple = function() {
    this._list = [];
}

Tuple.prototype = {
    constructor: Tuple,
    // (a, b) + (c, d) = (a, b, c, d)
    append: function(...y){
       for (let i = 0; i < y.length; i++) {
            let item = wrapTuple(y[i]);
            this.setList(
              this.getList().concat(item.getList())
            );
       }
    },
    prepend: function(...y){
        for (let i = y.length - 1; i >= 0; i--) {
            let item = wrapTuple(y[i]);
            this.setList(
              item.getList().concat(this.getList())
            );
        }
    },
    getList: function() {
        return this._list;
    },
    setList: function(list) {
        if(!isArray(list)){
            throw new TypeError("Expect array.");
        }
        this._list = list;
    },
    getClassType: function(){
        return "tuple";
    }
}

var wrapTuple = v => {
    if (isTuple(v)) return v;
    let tuple = new Tuple();
    tuple.setList([v]);
    return tuple;
}

var isTuple = v => v && typeof v === "object" &&
    typeof v.getClassType === "function" &&
    v.getClassType() === "tuple";

var isArray = (v) => v && typeof v === "object" && typeof v.length === "number";

/**
 * ((x, y) , z) => [x, y, z]
 */
Tuple.unpack = (list = []) => {
    let params = [];
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (isTuple(item)){
            params = params.concat(item.getList());
        } else{
            params.push(item);
        }
    }
    return params;
}

Tuple.wrapTuple = wrapTuple;

Tuple.getList = (v) => {
    if (isTuple(v)) return v.getList();
    return [v];
}

export default Tuple;
