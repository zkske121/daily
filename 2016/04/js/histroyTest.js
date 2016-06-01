var btnBack = document.getElementById('btnBack'),
	histroys = [],
	actionHref,
	actions = document.getElementsByTagName('a'),
	reg = /\/([^/]*)\.html/;


window.onload = function() {
	var fromStr = getQuery(window.location.href, 'from');
	if(!fromStr) return;

	histroys = store('histroy');
	
	if(!histroys) histroys = [];
	
	histroys.push(fromStr);
	
	store('histroy', histroys);
}

Array.prototype.forEach.call(actions, function(a) {
	a.onclick = function() {
		if(window.location.href.indexOf(this.href) > -1) return;

		this.href += '?from=' + reg.exec(window.location.href)[1];
	}
});


btnBack.onclick = function() {
	histroys = store('histroy');

	if(!histroys.length) {
		console.log('没有历史记录!');
		return;
	}

	actionHref = histroys.pop();
	store('histroy', histroys);
	window.location.href = actionHref + '.html';
}

function getQuery(url, key) {
    var n = new RegExp('(\\?|&)' + key + '=([^&]+)(&|$)', 'i'),
        r = url.match(n);
    return r ? r[2] : '';
}

function store(key, value) {
	var result;

	try{
		result = JSON.parse(localStorage.getItem(key));
	} catch(e) {
		result = '';
	}
	
	if(arguments.length <= 1) return result;

	localStorage.setItem(key, JSON.stringify(value));
}