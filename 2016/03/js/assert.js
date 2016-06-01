function assert(fn, args, result) {
    return function(){
        try{
            return fn.apply(null, args) === result;
        }catch(e) {
            return false;
        }
    }
}