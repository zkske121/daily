export function getSort(fn) {
    return function(a, b) {
        var ret = 0;

        if (fn.call(this, a, b)) {
            ret = -1;
        } else if (fn.call(this, b, a)) {
            ret = 1;
        }

        return ret;
    }
}

export function getMutipSort(arr) {
    return function(a, b) {
        var tmp, i = 0;

        do {
            tmp = arr[i++](a, b);
        } while (tmp == 0 && i < arr.length);

        return tmp;
    }
}
