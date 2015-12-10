var p_module = (function() {
    var btn = document.createElement('button');

    function getBtn(text) {
        var ret = btn.cloneNode();
        ret.innerHTML = text;
        ret.className = 'btn btn-white';
        return ret;
    }

    function setPagination(container, index, total, curr) {
        var tmp = [],
            i = 1,
            len = total;

        if (index == curr || curr < 1 || curr > total) return;

        container.innerHTML = '';
        if (!curr) curr = index;
        addBtn('首页', 1);
        addBtn('上一页', curr - 1);

        if (total < 6) {
            step();
        } else {
            if (curr < 4) {
                len = 3;
                step();
                addBtn('...', 0, 1);
                addBtn(total, total);
            } else if (total - curr < 3) {
                addBtn(1, 1);
                addBtn('...', 0, 1);
                i = total - 2;
                step();
            } else {
                i = curr - 1;
                len = i + 2;
                step();
                addBtn('...', 0, 1);
                addBtn(total, total);
            }
        }

        addBtn('下一页', curr + 1);
        addBtn('尾页', total);

        addInput();

        tmp.forEach(function(v) {
            container.appendChild(v);
        });

        function addInput() {
            var span = document.createElement('span');
            var line = span.cloneNode();

            line.className = 'vertical-line';
            tmp.push(line);

            var di = span.cloneNode();
            di.innerHTML = '第';
            tmp.push(di);

            var input = document.createElement('input');
            input.className = 'form-control';
            input.setAttribute('maxlength', 3);

            var s_input = span.cloneNode();
            s_input.appendChild(input);
            tmp.push(s_input);

            var ye = span.cloneNode();
            ye.innerHTML = '第';
            tmp.push(ye);

            var action = document.createElement('button');
            action.className = 'btn btn-success';
            action.onclick = function() {
                var n = parseInt(input.value);
                n && n > 0 && n <= total && setPagination(container, curr, total, n);
            }
            action.innerHTML = '跳转';
            tmp.push(action);
        }

        function step() {
            for (; i <= len && i <= total; i++) {
                addBtn(i, i);
            }
        }

        function addBtn(t, n, dot) {
            var b = getBtn(t);
            tmp.push(b);
            if (n == curr && t == n) b.className = b.className.replace('white', 'success');
            if (dot) return;
            if (('首页 上一页'.indexOf(t) > -1 && curr == 1) || ('下一页 尾页'.indexOf(t) > -1 && curr == total)) {
                b.setAttribute('disabled', 'disabled');
                return;
            }
            b.onclick = setPagination.bind(null, container, curr, total, n);
        }
    }

    return {
        setPagination: setPagination
    }
})();

