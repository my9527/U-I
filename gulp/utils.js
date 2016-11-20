/**
 * Created by my on 2016/11/19.
 */
var utils = {
    slice: sliceFn,
    log: logFn
};

function sliceFn(obj) {
    return Array.prototype.slice.call(this, obj);
}

function logFn(msg, specfix, isObj) {
    var args = sliceFn(arguments);
    specfix = specfix || "Attention";
    // args.push("[----"+ specfix +"----]--->");
    // return console.log.apply(console, args);

    if(isObj){
        var str = "\n";
        var o = Object.keys(msg);
        o.forEach(function (item) {
            str += item +": "+msg[item]+"\n";
        });
        return console.log("[----"+ specfix +"----]--->" + str);
    }
    return console.log("[----"+ specfix +"----]--->" + msg);
}

module.exports = utils;