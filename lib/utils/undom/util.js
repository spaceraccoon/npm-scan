function assign(obj, props) {
	for (let i in props) obj[i] = props[i];
}

function toLower(str) {
	return String(str).toLowerCase();
}

function splice(arr, item, add, byValueOnly) {
	let i = arr ? findWhere(arr, item, true, byValueOnly) : -1;
	if (~i) add ? arr.splice(i, 0, add) : arr.splice(i, 1);
	return i;
}

function findWhere(arr, fn, returnIndex, byValueOnly) {
	let i = arr.length;
	while (i--) if (typeof fn==='function' && !byValueOnly ? fn(arr[i]) : arr[i]===fn) break;
	return returnIndex ? i : arr[i];
}

function createAttributeFilter(ns, name) {
	return o => o.ns===ns && toLower(o.name)===toLower(name);
}

module.exports = {
	assign,
	toLower,
	splice,
	findWhere,
	createAttributeFilter
}