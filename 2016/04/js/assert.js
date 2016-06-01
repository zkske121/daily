function assert(fn, args, callback) {
    return function(){
        try{
            return callback(fn.apply(null, args));
        }catch(e) {
            return false;
        }
    }
}