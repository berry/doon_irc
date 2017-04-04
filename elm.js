
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _canadaduane$typed_svg$TypedSvg_Core$map = _elm_lang$virtual_dom$VirtualDom$map;
var _canadaduane$typed_svg$TypedSvg_Core$text = _elm_lang$virtual_dom$VirtualDom$text;
var _canadaduane$typed_svg$TypedSvg_Core$attributeNS = _elm_lang$virtual_dom$VirtualDom$attributeNS;
var _canadaduane$typed_svg$TypedSvg_Core$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _canadaduane$typed_svg$TypedSvg_Core$svgNamespace = A2(
	_elm_lang$virtual_dom$VirtualDom$property,
	'namespace',
	_elm_lang$core$Json_Encode$string('http://www.w3.org/2000/svg'));
var _canadaduane$typed_svg$TypedSvg_Core$node = F3(
	function (name, attributes, children) {
		return A3(
			_elm_lang$virtual_dom$VirtualDom$node,
			name,
			{ctor: '::', _0: _canadaduane$typed_svg$TypedSvg_Core$svgNamespace, _1: attributes},
			children);
	});

var _canadaduane$typed_svg$TypedSvg$view = _canadaduane$typed_svg$TypedSvg_Core$node('view');
var _canadaduane$typed_svg$TypedSvg$style = _canadaduane$typed_svg$TypedSvg_Core$node('style');
var _canadaduane$typed_svg$TypedSvg$script = _canadaduane$typed_svg$TypedSvg_Core$node('script');
var _canadaduane$typed_svg$TypedSvg$filter = _canadaduane$typed_svg$TypedSvg_Core$node('filter');
var _canadaduane$typed_svg$TypedSvg$cursor = _canadaduane$typed_svg$TypedSvg_Core$node('cursor');
var _canadaduane$typed_svg$TypedSvg$colorProfile = _canadaduane$typed_svg$TypedSvg_Core$node('colorProfile');
var _canadaduane$typed_svg$TypedSvg$clipPath = _canadaduane$typed_svg$TypedSvg_Core$node('clipPath');
var _canadaduane$typed_svg$TypedSvg$tspan = _canadaduane$typed_svg$TypedSvg_Core$node('tspan');
var _canadaduane$typed_svg$TypedSvg$tref = _canadaduane$typed_svg$TypedSvg_Core$node('tref');
var _canadaduane$typed_svg$TypedSvg$text_ = _canadaduane$typed_svg$TypedSvg_Core$node('text');
var _canadaduane$typed_svg$TypedSvg$textPath = _canadaduane$typed_svg$TypedSvg_Core$node('textPath');
var _canadaduane$typed_svg$TypedSvg$glyphRef = _canadaduane$typed_svg$TypedSvg_Core$node('glyphRef');
var _canadaduane$typed_svg$TypedSvg$glyph = _canadaduane$typed_svg$TypedSvg_Core$node('glyph');
var _canadaduane$typed_svg$TypedSvg$use = _canadaduane$typed_svg$TypedSvg_Core$node('use');
var _canadaduane$typed_svg$TypedSvg$rect = _canadaduane$typed_svg$TypedSvg_Core$node('rect');
var _canadaduane$typed_svg$TypedSvg$polyline = _canadaduane$typed_svg$TypedSvg_Core$node('polyline');
var _canadaduane$typed_svg$TypedSvg$polygon = _canadaduane$typed_svg$TypedSvg_Core$node('polygon');
var _canadaduane$typed_svg$TypedSvg$path = _canadaduane$typed_svg$TypedSvg_Core$node('path');
var _canadaduane$typed_svg$TypedSvg$line = _canadaduane$typed_svg$TypedSvg_Core$node('line');
var _canadaduane$typed_svg$TypedSvg$image = _canadaduane$typed_svg$TypedSvg_Core$node('image');
var _canadaduane$typed_svg$TypedSvg$ellipse = _canadaduane$typed_svg$TypedSvg_Core$node('ellipse');
var _canadaduane$typed_svg$TypedSvg$circle = _canadaduane$typed_svg$TypedSvg_Core$node('circle');
var _canadaduane$typed_svg$TypedSvg$stop = _canadaduane$typed_svg$TypedSvg_Core$node('stop');
var _canadaduane$typed_svg$TypedSvg$radialGradient = _canadaduane$typed_svg$TypedSvg_Core$node('radialGradient');
var _canadaduane$typed_svg$TypedSvg$linearGradient = _canadaduane$typed_svg$TypedSvg_Core$node('linearGradient');
var _canadaduane$typed_svg$TypedSvg$font = _canadaduane$typed_svg$TypedSvg_Core$node('font');
var _canadaduane$typed_svg$TypedSvg$title = _canadaduane$typed_svg$TypedSvg_Core$node('title');
var _canadaduane$typed_svg$TypedSvg$metadata = _canadaduane$typed_svg$TypedSvg_Core$node('metadata');
var _canadaduane$typed_svg$TypedSvg$desc = _canadaduane$typed_svg$TypedSvg_Core$node('desc');
var _canadaduane$typed_svg$TypedSvg$symbol = _canadaduane$typed_svg$TypedSvg_Core$node('symbol');
var _canadaduane$typed_svg$TypedSvg$switch = _canadaduane$typed_svg$TypedSvg_Core$node('switch');
var _canadaduane$typed_svg$TypedSvg$pattern = _canadaduane$typed_svg$TypedSvg_Core$node('pattern');
var _canadaduane$typed_svg$TypedSvg$mask = _canadaduane$typed_svg$TypedSvg_Core$node('mask');
var _canadaduane$typed_svg$TypedSvg$marker = _canadaduane$typed_svg$TypedSvg_Core$node('marker');
var _canadaduane$typed_svg$TypedSvg$g = _canadaduane$typed_svg$TypedSvg_Core$node('g');
var _canadaduane$typed_svg$TypedSvg$defs = _canadaduane$typed_svg$TypedSvg_Core$node('defs');
var _canadaduane$typed_svg$TypedSvg$a = _canadaduane$typed_svg$TypedSvg_Core$node('a');
var _canadaduane$typed_svg$TypedSvg$set = _canadaduane$typed_svg$TypedSvg_Core$node('set');
var _canadaduane$typed_svg$TypedSvg$mpath = _canadaduane$typed_svg$TypedSvg_Core$node('mpath');
var _canadaduane$typed_svg$TypedSvg$animateTransform = _canadaduane$typed_svg$TypedSvg_Core$node('animateTransform');
var _canadaduane$typed_svg$TypedSvg$animateMotion = _canadaduane$typed_svg$TypedSvg_Core$node('animateMotion');
var _canadaduane$typed_svg$TypedSvg$animateColor = _canadaduane$typed_svg$TypedSvg_Core$node('animateColor');
var _canadaduane$typed_svg$TypedSvg$animate = _canadaduane$typed_svg$TypedSvg_Core$node('animate');
var _canadaduane$typed_svg$TypedSvg$svg = _canadaduane$typed_svg$TypedSvg_Core$node('svg');

var _elm_lang$core$Color$fmod = F2(
	function (f, n) {
		var integer = _elm_lang$core$Basics$floor(f);
		return (_elm_lang$core$Basics$toFloat(
			A2(_elm_lang$core$Basics_ops['%'], integer, n)) + f) - _elm_lang$core$Basics$toFloat(integer);
	});
var _elm_lang$core$Color$rgbToHsl = F3(
	function (red, green, blue) {
		var b = _elm_lang$core$Basics$toFloat(blue) / 255;
		var g = _elm_lang$core$Basics$toFloat(green) / 255;
		var r = _elm_lang$core$Basics$toFloat(red) / 255;
		var cMax = A2(
			_elm_lang$core$Basics$max,
			A2(_elm_lang$core$Basics$max, r, g),
			b);
		var cMin = A2(
			_elm_lang$core$Basics$min,
			A2(_elm_lang$core$Basics$min, r, g),
			b);
		var c = cMax - cMin;
		var lightness = (cMax + cMin) / 2;
		var saturation = _elm_lang$core$Native_Utils.eq(lightness, 0) ? 0 : (c / (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)));
		var hue = _elm_lang$core$Basics$degrees(60) * (_elm_lang$core$Native_Utils.eq(cMax, r) ? A2(_elm_lang$core$Color$fmod, (g - b) / c, 6) : (_elm_lang$core$Native_Utils.eq(cMax, g) ? (((b - r) / c) + 2) : (((r - g) / c) + 4)));
		return {ctor: '_Tuple3', _0: hue, _1: saturation, _2: lightness};
	});
var _elm_lang$core$Color$hslToRgb = F3(
	function (hue, saturation, lightness) {
		var normHue = hue / _elm_lang$core$Basics$degrees(60);
		var chroma = (1 - _elm_lang$core$Basics$abs((2 * lightness) - 1)) * saturation;
		var x = chroma * (1 - _elm_lang$core$Basics$abs(
			A2(_elm_lang$core$Color$fmod, normHue, 2) - 1));
		var _p0 = (_elm_lang$core$Native_Utils.cmp(normHue, 0) < 0) ? {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 1) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: x, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 2) < 0) ? {ctor: '_Tuple3', _0: x, _1: chroma, _2: 0} : ((_elm_lang$core$Native_Utils.cmp(normHue, 3) < 0) ? {ctor: '_Tuple3', _0: 0, _1: chroma, _2: x} : ((_elm_lang$core$Native_Utils.cmp(normHue, 4) < 0) ? {ctor: '_Tuple3', _0: 0, _1: x, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 5) < 0) ? {ctor: '_Tuple3', _0: x, _1: 0, _2: chroma} : ((_elm_lang$core$Native_Utils.cmp(normHue, 6) < 0) ? {ctor: '_Tuple3', _0: chroma, _1: 0, _2: x} : {ctor: '_Tuple3', _0: 0, _1: 0, _2: 0}))))));
		var r = _p0._0;
		var g = _p0._1;
		var b = _p0._2;
		var m = lightness - (chroma / 2);
		return {ctor: '_Tuple3', _0: r + m, _1: g + m, _2: b + m};
	});
var _elm_lang$core$Color$toRgb = function (color) {
	var _p1 = color;
	if (_p1.ctor === 'RGBA') {
		return {red: _p1._0, green: _p1._1, blue: _p1._2, alpha: _p1._3};
	} else {
		var _p2 = A3(_elm_lang$core$Color$hslToRgb, _p1._0, _p1._1, _p1._2);
		var r = _p2._0;
		var g = _p2._1;
		var b = _p2._2;
		return {
			red: _elm_lang$core$Basics$round(255 * r),
			green: _elm_lang$core$Basics$round(255 * g),
			blue: _elm_lang$core$Basics$round(255 * b),
			alpha: _p1._3
		};
	}
};
var _elm_lang$core$Color$toHsl = function (color) {
	var _p3 = color;
	if (_p3.ctor === 'HSLA') {
		return {hue: _p3._0, saturation: _p3._1, lightness: _p3._2, alpha: _p3._3};
	} else {
		var _p4 = A3(_elm_lang$core$Color$rgbToHsl, _p3._0, _p3._1, _p3._2);
		var h = _p4._0;
		var s = _p4._1;
		var l = _p4._2;
		return {hue: h, saturation: s, lightness: l, alpha: _p3._3};
	}
};
var _elm_lang$core$Color$HSLA = F4(
	function (a, b, c, d) {
		return {ctor: 'HSLA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$hsla = F4(
	function (hue, saturation, lightness, alpha) {
		return A4(
			_elm_lang$core$Color$HSLA,
			hue - _elm_lang$core$Basics$turns(
				_elm_lang$core$Basics$toFloat(
					_elm_lang$core$Basics$floor(hue / (2 * _elm_lang$core$Basics$pi)))),
			saturation,
			lightness,
			alpha);
	});
var _elm_lang$core$Color$hsl = F3(
	function (hue, saturation, lightness) {
		return A4(_elm_lang$core$Color$hsla, hue, saturation, lightness, 1);
	});
var _elm_lang$core$Color$complement = function (color) {
	var _p5 = color;
	if (_p5.ctor === 'HSLA') {
		return A4(
			_elm_lang$core$Color$hsla,
			_p5._0 + _elm_lang$core$Basics$degrees(180),
			_p5._1,
			_p5._2,
			_p5._3);
	} else {
		var _p6 = A3(_elm_lang$core$Color$rgbToHsl, _p5._0, _p5._1, _p5._2);
		var h = _p6._0;
		var s = _p6._1;
		var l = _p6._2;
		return A4(
			_elm_lang$core$Color$hsla,
			h + _elm_lang$core$Basics$degrees(180),
			s,
			l,
			_p5._3);
	}
};
var _elm_lang$core$Color$grayscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$greyscale = function (p) {
	return A4(_elm_lang$core$Color$HSLA, 0, 0, 1 - p, 1);
};
var _elm_lang$core$Color$RGBA = F4(
	function (a, b, c, d) {
		return {ctor: 'RGBA', _0: a, _1: b, _2: c, _3: d};
	});
var _elm_lang$core$Color$rgba = _elm_lang$core$Color$RGBA;
var _elm_lang$core$Color$rgb = F3(
	function (r, g, b) {
		return A4(_elm_lang$core$Color$RGBA, r, g, b, 1);
	});
var _elm_lang$core$Color$lightRed = A4(_elm_lang$core$Color$RGBA, 239, 41, 41, 1);
var _elm_lang$core$Color$red = A4(_elm_lang$core$Color$RGBA, 204, 0, 0, 1);
var _elm_lang$core$Color$darkRed = A4(_elm_lang$core$Color$RGBA, 164, 0, 0, 1);
var _elm_lang$core$Color$lightOrange = A4(_elm_lang$core$Color$RGBA, 252, 175, 62, 1);
var _elm_lang$core$Color$orange = A4(_elm_lang$core$Color$RGBA, 245, 121, 0, 1);
var _elm_lang$core$Color$darkOrange = A4(_elm_lang$core$Color$RGBA, 206, 92, 0, 1);
var _elm_lang$core$Color$lightYellow = A4(_elm_lang$core$Color$RGBA, 255, 233, 79, 1);
var _elm_lang$core$Color$yellow = A4(_elm_lang$core$Color$RGBA, 237, 212, 0, 1);
var _elm_lang$core$Color$darkYellow = A4(_elm_lang$core$Color$RGBA, 196, 160, 0, 1);
var _elm_lang$core$Color$lightGreen = A4(_elm_lang$core$Color$RGBA, 138, 226, 52, 1);
var _elm_lang$core$Color$green = A4(_elm_lang$core$Color$RGBA, 115, 210, 22, 1);
var _elm_lang$core$Color$darkGreen = A4(_elm_lang$core$Color$RGBA, 78, 154, 6, 1);
var _elm_lang$core$Color$lightBlue = A4(_elm_lang$core$Color$RGBA, 114, 159, 207, 1);
var _elm_lang$core$Color$blue = A4(_elm_lang$core$Color$RGBA, 52, 101, 164, 1);
var _elm_lang$core$Color$darkBlue = A4(_elm_lang$core$Color$RGBA, 32, 74, 135, 1);
var _elm_lang$core$Color$lightPurple = A4(_elm_lang$core$Color$RGBA, 173, 127, 168, 1);
var _elm_lang$core$Color$purple = A4(_elm_lang$core$Color$RGBA, 117, 80, 123, 1);
var _elm_lang$core$Color$darkPurple = A4(_elm_lang$core$Color$RGBA, 92, 53, 102, 1);
var _elm_lang$core$Color$lightBrown = A4(_elm_lang$core$Color$RGBA, 233, 185, 110, 1);
var _elm_lang$core$Color$brown = A4(_elm_lang$core$Color$RGBA, 193, 125, 17, 1);
var _elm_lang$core$Color$darkBrown = A4(_elm_lang$core$Color$RGBA, 143, 89, 2, 1);
var _elm_lang$core$Color$black = A4(_elm_lang$core$Color$RGBA, 0, 0, 0, 1);
var _elm_lang$core$Color$white = A4(_elm_lang$core$Color$RGBA, 255, 255, 255, 1);
var _elm_lang$core$Color$lightGrey = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$grey = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGrey = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightGray = A4(_elm_lang$core$Color$RGBA, 238, 238, 236, 1);
var _elm_lang$core$Color$gray = A4(_elm_lang$core$Color$RGBA, 211, 215, 207, 1);
var _elm_lang$core$Color$darkGray = A4(_elm_lang$core$Color$RGBA, 186, 189, 182, 1);
var _elm_lang$core$Color$lightCharcoal = A4(_elm_lang$core$Color$RGBA, 136, 138, 133, 1);
var _elm_lang$core$Color$charcoal = A4(_elm_lang$core$Color$RGBA, 85, 87, 83, 1);
var _elm_lang$core$Color$darkCharcoal = A4(_elm_lang$core$Color$RGBA, 46, 52, 54, 1);
var _elm_lang$core$Color$Radial = F5(
	function (a, b, c, d, e) {
		return {ctor: 'Radial', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Color$radial = _elm_lang$core$Color$Radial;
var _elm_lang$core$Color$Linear = F3(
	function (a, b, c) {
		return {ctor: 'Linear', _0: a, _1: b, _2: c};
	});
var _elm_lang$core$Color$linear = _elm_lang$core$Color$Linear;

var _fredcy$elm_parseint$ParseInt$charFromInt = function (i) {
	return (_elm_lang$core$Native_Utils.cmp(i, 10) < 0) ? _elm_lang$core$Char$fromCode(
		i + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('0'))) : ((_elm_lang$core$Native_Utils.cmp(i, 36) < 0) ? _elm_lang$core$Char$fromCode(
		(i - 10) + _elm_lang$core$Char$toCode(
			_elm_lang$core$Native_Utils.chr('A'))) : _elm_lang$core$Native_Utils.crash(
		'ParseInt',
		{
			start: {line: 158, column: 9},
			end: {line: 158, column: 20}
		})(
		_elm_lang$core$Basics$toString(i)));
};
var _fredcy$elm_parseint$ParseInt$toRadixUnsafe = F2(
	function (radix, i) {
		return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$String$fromChar(
			_fredcy$elm_parseint$ParseInt$charFromInt(i)) : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, (i / radix) | 0),
			_elm_lang$core$String$fromChar(
				_fredcy$elm_parseint$ParseInt$charFromInt(
					A2(_elm_lang$core$Basics_ops['%'], i, radix))));
	});
var _fredcy$elm_parseint$ParseInt$toOct = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(8);
var _fredcy$elm_parseint$ParseInt$toHex = _fredcy$elm_parseint$ParseInt$toRadixUnsafe(16);
var _fredcy$elm_parseint$ParseInt$isBetween = F3(
	function (lower, upper, c) {
		var ci = _elm_lang$core$Char$toCode(c);
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Char$toCode(lower),
			ci) < 1) && (_elm_lang$core$Native_Utils.cmp(
			ci,
			_elm_lang$core$Char$toCode(upper)) < 1);
	});
var _fredcy$elm_parseint$ParseInt$charOffset = F2(
	function (basis, c) {
		return _elm_lang$core$Char$toCode(c) - _elm_lang$core$Char$toCode(basis);
	});
var _fredcy$elm_parseint$ParseInt$InvalidRadix = function (a) {
	return {ctor: 'InvalidRadix', _0: a};
};
var _fredcy$elm_parseint$ParseInt$toRadix = F2(
	function (radix, i) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? ((_elm_lang$core$Native_Utils.cmp(i, 0) < 0) ? _elm_lang$core$Result$Ok(
			A2(
				_elm_lang$core$Basics_ops['++'],
				'-',
				A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, 0 - i))) : _elm_lang$core$Result$Ok(
			A2(_fredcy$elm_parseint$ParseInt$toRadixUnsafe, radix, i))) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$OutOfRange = function (a) {
	return {ctor: 'OutOfRange', _0: a};
};
var _fredcy$elm_parseint$ParseInt$InvalidChar = function (a) {
	return {ctor: 'InvalidChar', _0: a};
};
var _fredcy$elm_parseint$ParseInt$intFromChar = F2(
	function (radix, c) {
		var validInt = function (i) {
			return (_elm_lang$core$Native_Utils.cmp(i, radix) < 0) ? _elm_lang$core$Result$Ok(i) : _elm_lang$core$Result$Err(
				_fredcy$elm_parseint$ParseInt$OutOfRange(c));
		};
		var toInt = A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('0'),
			_elm_lang$core$Native_Utils.chr('9'),
			c) ? _elm_lang$core$Result$Ok(
			A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('0'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('a'),
			_elm_lang$core$Native_Utils.chr('z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('a'),
				c)) : (A3(
			_fredcy$elm_parseint$ParseInt$isBetween,
			_elm_lang$core$Native_Utils.chr('A'),
			_elm_lang$core$Native_Utils.chr('Z'),
			c) ? _elm_lang$core$Result$Ok(
			10 + A2(
				_fredcy$elm_parseint$ParseInt$charOffset,
				_elm_lang$core$Native_Utils.chr('A'),
				c)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidChar(c))));
		return A2(_elm_lang$core$Result$andThen, validInt, toInt);
	});
var _fredcy$elm_parseint$ParseInt$parseIntR = F2(
	function (radix, rstring) {
		var _p0 = _elm_lang$core$String$uncons(rstring);
		if (_p0.ctor === 'Nothing') {
			return _elm_lang$core$Result$Ok(0);
		} else {
			return A2(
				_elm_lang$core$Result$andThen,
				function (ci) {
					return A2(
						_elm_lang$core$Result$andThen,
						function (ri) {
							return _elm_lang$core$Result$Ok(ci + (ri * radix));
						},
						A2(_fredcy$elm_parseint$ParseInt$parseIntR, radix, _p0._0._1));
				},
				A2(_fredcy$elm_parseint$ParseInt$intFromChar, radix, _p0._0._0));
		}
	});
var _fredcy$elm_parseint$ParseInt$parseIntRadix = F2(
	function (radix, string) {
		return ((_elm_lang$core$Native_Utils.cmp(2, radix) < 1) && (_elm_lang$core$Native_Utils.cmp(radix, 36) < 1)) ? A2(
			_fredcy$elm_parseint$ParseInt$parseIntR,
			radix,
			_elm_lang$core$String$reverse(string)) : _elm_lang$core$Result$Err(
			_fredcy$elm_parseint$ParseInt$InvalidRadix(radix));
	});
var _fredcy$elm_parseint$ParseInt$parseInt = _fredcy$elm_parseint$ParseInt$parseIntRadix(10);
var _fredcy$elm_parseint$ParseInt$parseIntOct = _fredcy$elm_parseint$ParseInt$parseIntRadix(8);
var _fredcy$elm_parseint$ParseInt$parseIntHex = _fredcy$elm_parseint$ParseInt$parseIntRadix(16);

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _eskimoblood$elm_color_extra$Color_Convert$xyzToColor = function (_p0) {
	var _p1 = _p0;
	var c = function (ch) {
		var ch_ = (_elm_lang$core$Native_Utils.cmp(ch, 3.1308e-3) > 0) ? ((1.055 * Math.pow(ch, 1 / 2.4)) - 5.5e-2) : (12.92 * ch);
		return _elm_lang$core$Basics$round(
			A3(_elm_lang$core$Basics$clamp, 0, 255, ch_ * 255));
	};
	var z_ = _p1.z / 100;
	var y_ = _p1.y / 100;
	var x_ = _p1.x / 100;
	var r = ((x_ * 3.2404542) + (y_ * -1.5371385)) + (z_ * -0.4986);
	var g = ((x_ * -0.969266) + (y_ * 1.8760108)) + (z_ * 4.1556e-2);
	var b = ((x_ * 5.56434e-2) + (y_ * -0.2040259)) + (z_ * 1.0572252);
	return A3(
		_elm_lang$core$Color$rgb,
		c(r),
		c(g),
		c(b));
};
var _eskimoblood$elm_color_extra$Color_Convert$labToXyz = function (_p2) {
	var _p3 = _p2;
	var y = (_p3.l + 16) / 116;
	var c = function (ch) {
		var ch_ = (ch * ch) * ch;
		return (_elm_lang$core$Native_Utils.cmp(ch_, 8.856e-3) > 0) ? ch_ : ((ch - (16 / 116)) / 7.787);
	};
	return {
		y: c(y) * 100,
		x: c(y + (_p3.a / 500)) * 95.047,
		z: c(y - (_p3.b / 200)) * 108.883
	};
};
var _eskimoblood$elm_color_extra$Color_Convert$labToColor = function (_p4) {
	return _eskimoblood$elm_color_extra$Color_Convert$xyzToColor(
		_eskimoblood$elm_color_extra$Color_Convert$labToXyz(_p4));
};
var _eskimoblood$elm_color_extra$Color_Convert$xyzToLab = function (_p5) {
	var _p6 = _p5;
	var c = function (ch) {
		return (_elm_lang$core$Native_Utils.cmp(ch, 8.856e-3) > 0) ? Math.pow(ch, 1 / 3) : ((7.787 * ch) + (16 / 116));
	};
	var x_ = c(_p6.x / 95.047);
	var y_ = c(_p6.y / 100);
	var z_ = c(_p6.z / 108.883);
	return {l: (116 * y_) - 16, a: 500 * (x_ - y_), b: 200 * (y_ - z_)};
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToXyz = function (cl) {
	var _p7 = _elm_lang$core$Color$toRgb(cl);
	var red = _p7.red;
	var green = _p7.green;
	var blue = _p7.blue;
	var c = function (ch) {
		var ch_ = _elm_lang$core$Basics$toFloat(ch) / 255;
		var ch__ = (_elm_lang$core$Native_Utils.cmp(ch_, 4.045e-2) > 0) ? Math.pow((ch_ + 5.5e-2) / 1.055, 2.4) : (ch_ / 12.92);
		return ch__ * 100;
	};
	var r = c(red);
	var g = c(green);
	var b = c(blue);
	return {x: ((r * 0.4124) + (g * 0.3576)) + (b * 0.1805), y: ((r * 0.2126) + (g * 0.7152)) + (b * 7.22e-2), z: ((r * 1.93e-2) + (g * 0.1192)) + (b * 0.9505)};
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToLab = function (_p8) {
	return _eskimoblood$elm_color_extra$Color_Convert$xyzToLab(
		_eskimoblood$elm_color_extra$Color_Convert$colorToXyz(_p8));
};
var _eskimoblood$elm_color_extra$Color_Convert$toRadix = function (n) {
	var getChr = function (c) {
		return (_elm_lang$core$Native_Utils.cmp(c, 10) < 0) ? _elm_lang$core$Basics$toString(c) : _elm_lang$core$String$fromChar(
			_elm_lang$core$Char$fromCode(87 + c));
	};
	return (_elm_lang$core$Native_Utils.cmp(n, 16) < 0) ? getChr(n) : A2(
		_elm_lang$core$Basics_ops['++'],
		_eskimoblood$elm_color_extra$Color_Convert$toRadix((n / 16) | 0),
		getChr(
			A2(_elm_lang$core$Basics_ops['%'], n, 16)));
};
var _eskimoblood$elm_color_extra$Color_Convert$toHex = function (_p9) {
	return A3(
		_elm_lang$core$String$padLeft,
		2,
		_elm_lang$core$Native_Utils.chr('0'),
		_eskimoblood$elm_color_extra$Color_Convert$toRadix(_p9));
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToHex = function (cl) {
	var _p10 = _elm_lang$core$Color$toRgb(cl);
	var red = _p10.red;
	var green = _p10.green;
	var blue = _p10.blue;
	return A2(
		_elm_lang$core$String$join,
		'',
		A2(
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			'#',
			A2(
				_elm_lang$core$List$map,
				_eskimoblood$elm_color_extra$Color_Convert$toHex,
				{
					ctor: '::',
					_0: red,
					_1: {
						ctor: '::',
						_0: green,
						_1: {
							ctor: '::',
							_0: blue,
							_1: {ctor: '[]'}
						}
					}
				})));
};
var _eskimoblood$elm_color_extra$Color_Convert$hexToColor = function () {
	var pattern = A2(
		_elm_lang$core$Basics_ops['++'],
		'',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'^',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'#?',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'(?:',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'(?:([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2}))',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'|',
							A2(
								_elm_lang$core$Basics_ops['++'],
								'(?:([a-f\\d])([a-f\\d])([a-f\\d]))',
								A2(_elm_lang$core$Basics_ops['++'], ')', '$'))))))));
	var extend = function (token) {
		var _p11 = _elm_lang$core$String$toList(token);
		if ((_p11.ctor === '::') && (_p11._1.ctor === '[]')) {
			var _p12 = _p11._0;
			return _elm_lang$core$String$fromList(
				{
					ctor: '::',
					_0: _p12,
					_1: {
						ctor: '::',
						_0: _p12,
						_1: {ctor: '[]'}
					}
				});
		} else {
			return token;
		}
	};
	return function (_p13) {
		return A2(
			_elm_lang$core$Result$andThen,
			function (colors) {
				var _p15 = A2(
					_elm_lang$core$List$map,
					function (_p14) {
						return _fredcy$elm_parseint$ParseInt$parseIntHex(
							extend(_p14));
					},
					colors);
				if (((((((_p15.ctor === '::') && (_p15._0.ctor === 'Ok')) && (_p15._1.ctor === '::')) && (_p15._1._0.ctor === 'Ok')) && (_p15._1._1.ctor === '::')) && (_p15._1._1._0.ctor === 'Ok')) && (_p15._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Result$Ok(
						A3(_elm_lang$core$Color$rgb, _p15._0._0, _p15._1._0._0, _p15._1._1._0._0));
				} else {
					return _elm_lang$core$Result$Err('Parsing ints from hex failed');
				}
			},
			A2(
				_elm_lang$core$Result$fromMaybe,
				'Parsing hex regex failed',
				A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$List$filterMap(_elm_lang$core$Basics$identity),
					A2(
						_elm_lang$core$Maybe$map,
						function (_) {
							return _.submatches;
						},
						_elm_lang$core$List$head(
							A3(
								_elm_lang$core$Regex$find,
								_elm_lang$core$Regex$AtMost(1),
								_elm_lang$core$Regex$regex(pattern),
								_elm_lang$core$String$toLower(_p13)))))));
	};
}();
var _eskimoblood$elm_color_extra$Color_Convert$cssColorString = F2(
	function (kind, values) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			kind,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_elm_lang$core$String$join, ', ', values),
					')')));
	});
var _eskimoblood$elm_color_extra$Color_Convert$toPercentString = function (_p16) {
	return A3(
		_elm_lang$core$Basics$flip,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		'%',
		_elm_lang$core$Basics$toString(
			_elm_lang$core$Basics$round(
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					100,
					_p16))));
};
var _eskimoblood$elm_color_extra$Color_Convert$hueToString = function (_p17) {
	return _elm_lang$core$Basics$toString(
		_elm_lang$core$Basics$round(
			A3(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return x / y;
					}),
				_elm_lang$core$Basics$pi,
				A2(
					F2(
						function (x, y) {
							return x * y;
						}),
					180,
					_p17))));
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssHsla = function (cl) {
	var _p18 = _elm_lang$core$Color$toHsl(cl);
	var hue = _p18.hue;
	var saturation = _p18.saturation;
	var lightness = _p18.lightness;
	var alpha = _p18.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'hsla',
		{
			ctor: '::',
			_0: _eskimoblood$elm_color_extra$Color_Convert$hueToString(hue),
			_1: {
				ctor: '::',
				_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(saturation),
				_1: {
					ctor: '::',
					_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(lightness),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Basics$toString(alpha),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssHsl = function (cl) {
	var _p19 = _elm_lang$core$Color$toHsl(cl);
	var hue = _p19.hue;
	var saturation = _p19.saturation;
	var lightness = _p19.lightness;
	var alpha = _p19.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'hsl',
		{
			ctor: '::',
			_0: _eskimoblood$elm_color_extra$Color_Convert$hueToString(hue),
			_1: {
				ctor: '::',
				_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(saturation),
				_1: {
					ctor: '::',
					_0: _eskimoblood$elm_color_extra$Color_Convert$toPercentString(lightness),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba = function (cl) {
	var _p20 = _elm_lang$core$Color$toRgb(cl);
	var red = _p20.red;
	var green = _p20.green;
	var blue = _p20.blue;
	var alpha = _p20.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'rgba',
		{
			ctor: '::',
			_0: _elm_lang$core$Basics$toString(red),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(green),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(blue),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Basics$toString(alpha),
						_1: {ctor: '[]'}
					}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$colorToCssRgb = function (cl) {
	var _p21 = _elm_lang$core$Color$toRgb(cl);
	var red = _p21.red;
	var green = _p21.green;
	var blue = _p21.blue;
	var alpha = _p21.alpha;
	return A2(
		_eskimoblood$elm_color_extra$Color_Convert$cssColorString,
		'rgb',
		{
			ctor: '::',
			_0: _elm_lang$core$Basics$toString(red),
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(green),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Basics$toString(blue),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _eskimoblood$elm_color_extra$Color_Convert$XYZ = F3(
	function (a, b, c) {
		return {x: a, y: b, z: c};
	});
var _eskimoblood$elm_color_extra$Color_Convert$Lab = F3(
	function (a, b, c) {
		return {l: a, a: b, b: c};
	});

var _canadaduane$typed_svg$TypedSvg_Types$AccumulateSum = {ctor: 'AccumulateSum'};
var _canadaduane$typed_svg$TypedSvg_Types$AccumulateNone = {ctor: 'AccumulateNone'};
var _canadaduane$typed_svg$TypedSvg_Types$AdditiveReplace = {ctor: 'AdditiveReplace'};
var _canadaduane$typed_svg$TypedSvg_Types$AdditiveNone = {ctor: 'AdditiveNone'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignNone = {ctor: 'AlignNone'};
var _canadaduane$typed_svg$TypedSvg_Types$Align = F2(
	function (a, b) {
		return {ctor: 'Align', _0: a, _1: b};
	});
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentInherit = {ctor: 'AlignmentInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentMathematical = {ctor: 'AlignmentMathematical'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentHanging = {ctor: 'AlignmentHanging'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentAlphabetic = {ctor: 'AlignmentAlphabetic'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentIdeographic = {ctor: 'AlignmentIdeographic'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentTextAfterEdge = {ctor: 'AlignmentTextAfterEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentAfterEdge = {ctor: 'AlignmentAfterEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentCentral = {ctor: 'AlignmentCentral'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentMiddle = {ctor: 'AlignmentMiddle'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentTextBeforeEdge = {ctor: 'AlignmentTextBeforeEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentBeforeEdge = {ctor: 'AlignmentBeforeEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentBaseline = {ctor: 'AlignmentBaseline'};
var _canadaduane$typed_svg$TypedSvg_Types$AlignmentAuto = {ctor: 'AlignmentAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$AnchorEnd = {ctor: 'AnchorEnd'};
var _canadaduane$typed_svg$TypedSvg_Types$AnchorMiddle = {ctor: 'AnchorMiddle'};
var _canadaduane$typed_svg$TypedSvg_Types$AnchorStart = {ctor: 'AnchorStart'};
var _canadaduane$typed_svg$TypedSvg_Types$AnchorInherit = {ctor: 'AnchorInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$AnimateTransformTypeSkewY = {ctor: 'AnimateTransformTypeSkewY'};
var _canadaduane$typed_svg$TypedSvg_Types$AnimateTransformTypeSkewX = {ctor: 'AnimateTransformTypeSkewX'};
var _canadaduane$typed_svg$TypedSvg_Types$AnimateTransformTypeRotate = {ctor: 'AnimateTransformTypeRotate'};
var _canadaduane$typed_svg$TypedSvg_Types$AnimateTransformTypeScale = {ctor: 'AnimateTransformTypeScale'};
var _canadaduane$typed_svg$TypedSvg_Types$AnimateTransformTypeTranslate = {ctor: 'AnimateTransformTypeTranslate'};
var _canadaduane$typed_svg$TypedSvg_Types$AttributeTypeXml = {ctor: 'AttributeTypeXml'};
var _canadaduane$typed_svg$TypedSvg_Types$AttributeTypeCss = {ctor: 'AttributeTypeCss'};
var _canadaduane$typed_svg$TypedSvg_Types$AttributeTypeAuto = {ctor: 'AttributeTypeAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftInherit = {ctor: 'ShiftInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftLength = function (a) {
	return {ctor: 'ShiftLength', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftPercentage = function (a) {
	return {ctor: 'ShiftPercentage', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftSub = {ctor: 'ShiftSub'};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftSuper = {ctor: 'ShiftSuper'};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftBaseline = {ctor: 'ShiftBaseline'};
var _canadaduane$typed_svg$TypedSvg_Types$ShiftAuto = {ctor: 'ShiftAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$CalcModeSpline = {ctor: 'CalcModeSpline'};
var _canadaduane$typed_svg$TypedSvg_Types$CalcModePaced = {ctor: 'CalcModePaced'};
var _canadaduane$typed_svg$TypedSvg_Types$CalcModeLinear = {ctor: 'CalcModeLinear'};
var _canadaduane$typed_svg$TypedSvg_Types$CalcModeDiscrete = {ctor: 'CalcModeDiscrete'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipShape = F4(
	function (a, b, c, d) {
		return {ctor: 'ClipShape', _0: a, _1: b, _2: c, _3: d};
	});
var _canadaduane$typed_svg$TypedSvg_Types$ClipInherit = {ctor: 'ClipInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipAuto = {ctor: 'ClipAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipPathFunc = function (a) {
	return {ctor: 'ClipPathFunc', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$ClipPathInherit = {ctor: 'ClipPathInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipPathNone = {ctor: 'ClipPathNone'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipRuleInherit = {ctor: 'ClipRuleInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipRuleEvenOdd = {ctor: 'ClipRuleEvenOdd'};
var _canadaduane$typed_svg$TypedSvg_Types$ClipRuleNonZero = {ctor: 'ClipRuleNonZero'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorInterpolationInherit = {ctor: 'ColorInterpolationInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorInterpolationLinearRGB = {ctor: 'ColorInterpolationLinearRGB'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorInterpolationSRGB = {ctor: 'ColorInterpolationSRGB'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorInterpolationAuto = {ctor: 'ColorInterpolationAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorMatrixTypeLuminanceToAlpha = {ctor: 'ColorMatrixTypeLuminanceToAlpha'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorMatrixTypeHueRotate = {ctor: 'ColorMatrixTypeHueRotate'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorMatrixTypeSaturate = {ctor: 'ColorMatrixTypeSaturate'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorMatrixTypeMatrix = {ctor: 'ColorMatrixTypeMatrix'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorProfileInherit = {ctor: 'ColorProfileInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorProfile = function (a) {
	return {ctor: 'ColorProfile', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$ColorProfileSRGB = {ctor: 'ColorProfileSRGB'};
var _canadaduane$typed_svg$TypedSvg_Types$ColorProfileAuto = {ctor: 'ColorProfileAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorArithmetic = {ctor: 'CompositeOperatorArithmetic'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorXor = {ctor: 'CompositeOperatorXor'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorAtop = {ctor: 'CompositeOperatorAtop'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorOut = {ctor: 'CompositeOperatorOut'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorIn = {ctor: 'CompositeOperatorIn'};
var _canadaduane$typed_svg$TypedSvg_Types$CompositeOperatorOver = {ctor: 'CompositeOperatorOver'};
var _canadaduane$typed_svg$TypedSvg_Types$CoordinateSystemObjectBoundingBox = {ctor: 'CoordinateSystemObjectBoundingBox'};
var _canadaduane$typed_svg$TypedSvg_Types$CoordinateSystemUserSpaceOnUse = {ctor: 'CoordinateSystemUserSpaceOnUse'};
var _canadaduane$typed_svg$TypedSvg_Types$Cursor = function (a) {
	return {ctor: 'Cursor', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$CursorInherit = {ctor: 'CursorInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorHelp = {ctor: 'CursorHelp'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorWait = {ctor: 'CursorWait'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorText = {ctor: 'CursorText'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorWResize = {ctor: 'CursorWResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorSWResize = {ctor: 'CursorSWResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorSEResize = {ctor: 'CursorSEResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorNResize = {ctor: 'CursorNResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorNWResize = {ctor: 'CursorNWResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorNEResize = {ctor: 'CursorNEResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorEResize = {ctor: 'CursorEResize'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorMove = {ctor: 'CursorMove'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorPointer = {ctor: 'CursorPointer'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorCrosshair = {ctor: 'CursorCrosshair'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorDefault = {ctor: 'CursorDefault'};
var _canadaduane$typed_svg$TypedSvg_Types$CursorAuto = {ctor: 'CursorAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$DirectionInherit = {ctor: 'DirectionInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$DirectionRTL = {ctor: 'DirectionRTL'};
var _canadaduane$typed_svg$TypedSvg_Types$DirectionLTR = {ctor: 'DirectionLTR'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayInherit = {ctor: 'DisplayInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayNone = {ctor: 'DisplayNone'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableCaption = {ctor: 'DisplayTableCaption'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableCell = {ctor: 'DisplayTableCell'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableColumn = {ctor: 'DisplayTableColumn'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableColumnGroup = {ctor: 'DisplayTableColumnGroup'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableRow = {ctor: 'DisplayTableRow'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableFooterGroup = {ctor: 'DisplayTableFooterGroup'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableHeaderGroup = {ctor: 'DisplayTableHeaderGroup'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTableRowGroup = {ctor: 'DisplayTableRowGroup'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayInlineTable = {ctor: 'DisplayInlineTable'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayTable = {ctor: 'DisplayTable'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayMarker = {ctor: 'DisplayMarker'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayCompact = {ctor: 'DisplayCompact'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayRunIn = {ctor: 'DisplayRunIn'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayListItem = {ctor: 'DisplayListItem'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayBlock = {ctor: 'DisplayBlock'};
var _canadaduane$typed_svg$TypedSvg_Types$DisplayInline = {ctor: 'DisplayInline'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineInherit = {ctor: 'DominantBaselineInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineTextBeforeEdge = {ctor: 'DominantBaselineTextBeforeEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineTextAfterEdge = {ctor: 'DominantBaselineTextAfterEdge'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineMiddle = {ctor: 'DominantBaselineMiddle'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineCentral = {ctor: 'DominantBaselineCentral'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineMathematical = {ctor: 'DominantBaselineMathematical'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineHanging = {ctor: 'DominantBaselineHanging'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineAlphabetic = {ctor: 'DominantBaselineAlphabetic'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineIdeographic = {ctor: 'DominantBaselineIdeographic'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineResetSize = {ctor: 'DominantBaselineResetSize'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineNoChange = {ctor: 'DominantBaselineNoChange'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineUseScript = {ctor: 'DominantBaselineUseScript'};
var _canadaduane$typed_svg$TypedSvg_Types$DominantBaselineAuto = {ctor: 'DominantBaselineAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$DurationIndefinite = {ctor: 'DurationIndefinite'};
var _canadaduane$typed_svg$TypedSvg_Types$Duration = function (a) {
	return {ctor: 'Duration', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$EdgeModeNone = {ctor: 'EdgeModeNone'};
var _canadaduane$typed_svg$TypedSvg_Types$EdgeModeWrap = {ctor: 'EdgeModeWrap'};
var _canadaduane$typed_svg$TypedSvg_Types$EdgeModeDuplicate = {ctor: 'EdgeModeDuplicate'};
var _canadaduane$typed_svg$TypedSvg_Types$FillRuleEvenOdd = {ctor: 'FillRuleEvenOdd'};
var _canadaduane$typed_svg$TypedSvg_Types$FillRuleNonZero = {ctor: 'FillRuleNonZero'};
var _canadaduane$typed_svg$TypedSvg_Types$Filter = function (a) {
	return {ctor: 'Filter', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$FilterInherit = {ctor: 'FilterInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FilterNone = {ctor: 'FilterNone'};
var _canadaduane$typed_svg$TypedSvg_Types$FloodICC = function (a) {
	return {ctor: 'FloodICC', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$Flood = function (a) {
	return {ctor: 'Flood', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$FloodCurrentColor = {ctor: 'FloodCurrentColor'};
var _canadaduane$typed_svg$TypedSvg_Types$FloodInherit = {ctor: 'FloodInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontSizeAdjust = function (a) {
	return {ctor: 'FontSizeAdjust', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$FontSizeAdjustInherit = {ctor: 'FontSizeAdjustInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontSizeAdjustNone = {ctor: 'FontSizeAdjustNone'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchInherit = {ctor: 'FontStretchInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchUltraExpanded = {ctor: 'FontStretchUltraExpanded'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchExtraExpanded = {ctor: 'FontStretchExtraExpanded'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchExpanded = {ctor: 'FontStretchExpanded'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchSemiExpanded = {ctor: 'FontStretchSemiExpanded'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchSemiCondensed = {ctor: 'FontStretchSemiCondensed'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchCondensed = {ctor: 'FontStretchCondensed'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchExtraCondensed = {ctor: 'FontStretchExtraCondensed'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchUltraCondensed = {ctor: 'FontStretchUltraCondensed'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchNarrower = {ctor: 'FontStretchNarrower'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchWider = {ctor: 'FontStretchWider'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStretchNormal = {ctor: 'FontStretchNormal'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStyleInherit = {ctor: 'FontStyleInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStyleOblique = {ctor: 'FontStyleOblique'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStyleItalic = {ctor: 'FontStyleItalic'};
var _canadaduane$typed_svg$TypedSvg_Types$FontStyleNormal = {ctor: 'FontStyleNormal'};
var _canadaduane$typed_svg$TypedSvg_Types$FontVariantInherit = {ctor: 'FontVariantInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontVariantSmallCaps = {ctor: 'FontVariantSmallCaps'};
var _canadaduane$typed_svg$TypedSvg_Types$FontVariantNormal = {ctor: 'FontVariantNormal'};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeight = function (a) {
	return {ctor: 'FontWeight', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeightInherit = {ctor: 'FontWeightInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeightLighter = {ctor: 'FontWeightLighter'};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeightBolder = {ctor: 'FontWeightBolder'};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeightBold = {ctor: 'FontWeightBold'};
var _canadaduane$typed_svg$TypedSvg_Types$FontWeightNormal = {ctor: 'FontWeightNormal'};
var _canadaduane$typed_svg$TypedSvg_Types$FuncTypeGamma = {ctor: 'FuncTypeGamma'};
var _canadaduane$typed_svg$TypedSvg_Types$FuncTypeLinear = {ctor: 'FuncTypeLinear'};
var _canadaduane$typed_svg$TypedSvg_Types$FuncTypeDiscrete = {ctor: 'FuncTypeDiscrete'};
var _canadaduane$typed_svg$TypedSvg_Types$FuncTypeTable = {ctor: 'FuncTypeTable'};
var _canadaduane$typed_svg$TypedSvg_Types$FuncTypeIdentity = {ctor: 'FuncTypeIdentity'};
var _canadaduane$typed_svg$TypedSvg_Types$InReference = function (a) {
	return {ctor: 'InReference', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$InStrokePaint = {ctor: 'InStrokePaint'};
var _canadaduane$typed_svg$TypedSvg_Types$InFillPaint = {ctor: 'InFillPaint'};
var _canadaduane$typed_svg$TypedSvg_Types$InBackgroundAlpha = {ctor: 'InBackgroundAlpha'};
var _canadaduane$typed_svg$TypedSvg_Types$InSourceAlpha = {ctor: 'InSourceAlpha'};
var _canadaduane$typed_svg$TypedSvg_Types$InSourceGraphic = {ctor: 'InSourceGraphic'};
var _canadaduane$typed_svg$TypedSvg_Types$KerningLength = function (a) {
	return {ctor: 'KerningLength', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$KerningInherit = {ctor: 'KerningInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$KerningAuto = {ctor: 'KerningAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$Px = function (a) {
	return {ctor: 'Px', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$px = _canadaduane$typed_svg$TypedSvg_Types$Px;
var _canadaduane$typed_svg$TypedSvg_Types$Pt = function (a) {
	return {ctor: 'Pt', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$pt = _canadaduane$typed_svg$TypedSvg_Types$Pt;
var _canadaduane$typed_svg$TypedSvg_Types$Percent = function (a) {
	return {ctor: 'Percent', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$percent = _canadaduane$typed_svg$TypedSvg_Types$Percent;
var _canadaduane$typed_svg$TypedSvg_Types$Pc = function (a) {
	return {ctor: 'Pc', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$pc = _canadaduane$typed_svg$TypedSvg_Types$Pc;
var _canadaduane$typed_svg$TypedSvg_Types$Num = function (a) {
	return {ctor: 'Num', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$num = _canadaduane$typed_svg$TypedSvg_Types$Num;
var _canadaduane$typed_svg$TypedSvg_Types$Mm = function (a) {
	return {ctor: 'Mm', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$mm = _canadaduane$typed_svg$TypedSvg_Types$Mm;
var _canadaduane$typed_svg$TypedSvg_Types$In = function (a) {
	return {ctor: 'In', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$inch = _canadaduane$typed_svg$TypedSvg_Types$In;
var _canadaduane$typed_svg$TypedSvg_Types$Ex = function (a) {
	return {ctor: 'Ex', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$ex = _canadaduane$typed_svg$TypedSvg_Types$Ex;
var _canadaduane$typed_svg$TypedSvg_Types$Em = function (a) {
	return {ctor: 'Em', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$em = _canadaduane$typed_svg$TypedSvg_Types$Em;
var _canadaduane$typed_svg$TypedSvg_Types$Cm = function (a) {
	return {ctor: 'Cm', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$cm = _canadaduane$typed_svg$TypedSvg_Types$Cm;
var _canadaduane$typed_svg$TypedSvg_Types$LengthAdjustSpacingAndGlyphs = {ctor: 'LengthAdjustSpacingAndGlyphs'};
var _canadaduane$typed_svg$TypedSvg_Types$LengthAdjustSpacing = {ctor: 'LengthAdjustSpacing'};
var _canadaduane$typed_svg$TypedSvg_Types$MarkerCoordinateSystemStrokeWidth = {ctor: 'MarkerCoordinateSystemStrokeWidth'};
var _canadaduane$typed_svg$TypedSvg_Types$MarkerCoordinateSystemUserSpaceOnUse = {ctor: 'MarkerCoordinateSystemUserSpaceOnUse'};
var _canadaduane$typed_svg$TypedSvg_Types$Slice = {ctor: 'Slice'};
var _canadaduane$typed_svg$TypedSvg_Types$Meet = {ctor: 'Meet'};
var _canadaduane$typed_svg$TypedSvg_Types$ModeLighten = {ctor: 'ModeLighten'};
var _canadaduane$typed_svg$TypedSvg_Types$ModeDarken = {ctor: 'ModeDarken'};
var _canadaduane$typed_svg$TypedSvg_Types$ModeScreen = {ctor: 'ModeScreen'};
var _canadaduane$typed_svg$TypedSvg_Types$ModeMultiply = {ctor: 'ModeMultiply'};
var _canadaduane$typed_svg$TypedSvg_Types$ModeNormal = {ctor: 'ModeNormal'};
var _canadaduane$typed_svg$TypedSvg_Types$MorphologyOperatorDilate = {ctor: 'MorphologyOperatorDilate'};
var _canadaduane$typed_svg$TypedSvg_Types$MorphologyOperatorErode = {ctor: 'MorphologyOperatorErode'};
var _canadaduane$typed_svg$TypedSvg_Types$OpacityInherit = {ctor: 'OpacityInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$Opacity = function (a) {
	return {ctor: 'Opacity', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$RenderingInherit = {ctor: 'RenderingInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderingOptimizeQuality = {ctor: 'RenderingOptimizeQuality'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderingOptimizeSpeed = {ctor: 'RenderingOptimizeSpeed'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderingAuto = {ctor: 'RenderingAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$RepeatIndefinite = {ctor: 'RepeatIndefinite'};
var _canadaduane$typed_svg$TypedSvg_Types$RepeatCount = function (a) {
	return {ctor: 'RepeatCount', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$RestartNever = {ctor: 'RestartNever'};
var _canadaduane$typed_svg$TypedSvg_Types$RestartWhenNotActive = {ctor: 'RestartWhenNotActive'};
var _canadaduane$typed_svg$TypedSvg_Types$RestartAlways = {ctor: 'RestartAlways'};
var _canadaduane$typed_svg$TypedSvg_Types$ScaleMax = {ctor: 'ScaleMax'};
var _canadaduane$typed_svg$TypedSvg_Types$ScaleMid = {ctor: 'ScaleMid'};
var _canadaduane$typed_svg$TypedSvg_Types$ScaleMin = {ctor: 'ScaleMin'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderInherit = {ctor: 'RenderInherit'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderGeometricPrecision = {ctor: 'RenderGeometricPrecision'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderCrispEdges = {ctor: 'RenderCrispEdges'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderOptimizeSpeed = {ctor: 'RenderOptimizeSpeed'};
var _canadaduane$typed_svg$TypedSvg_Types$RenderAuto = {ctor: 'RenderAuto'};
var _canadaduane$typed_svg$TypedSvg_Types$Translate = F2(
	function (a, b) {
		return {ctor: 'Translate', _0: a, _1: b};
	});
var _canadaduane$typed_svg$TypedSvg_Types$SkewY = function (a) {
	return {ctor: 'SkewY', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$SkewX = function (a) {
	return {ctor: 'SkewX', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$Scale = F2(
	function (a, b) {
		return {ctor: 'Scale', _0: a, _1: b};
	});
var _canadaduane$typed_svg$TypedSvg_Types$Rotate = F3(
	function (a, b, c) {
		return {ctor: 'Rotate', _0: a, _1: b, _2: c};
	});
var _canadaduane$typed_svg$TypedSvg_Types$Matrix = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'Matrix', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _canadaduane$typed_svg$TypedSvg_Types$TimingIndefinite = {ctor: 'TimingIndefinite'};
var _canadaduane$typed_svg$TypedSvg_Types$TimingWallclockSyncValue = function (a) {
	return {ctor: 'TimingWallclockSyncValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TimingAccessKeyValue = function (a) {
	return {ctor: 'TimingAccessKeyValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TimingRepeatValue = function (a) {
	return {ctor: 'TimingRepeatValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TimingEventValue = function (a) {
	return {ctor: 'TimingEventValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TimingSyncBaseValue = function (a) {
	return {ctor: 'TimingSyncBaseValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TimingOffsetValue = function (a) {
	return {ctor: 'TimingOffsetValue', _0: a};
};
var _canadaduane$typed_svg$TypedSvg_Types$TurbulenceTypeTurbulence = {ctor: 'TurbulenceTypeTurbulence'};
var _canadaduane$typed_svg$TypedSvg_Types$TurbulenceTypeFractalNoise = {ctor: 'TurbulenceTypeFractalNoise'};
var _canadaduane$typed_svg$TypedSvg_Types$No = {ctor: 'No'};
var _canadaduane$typed_svg$TypedSvg_Types$Yes = {ctor: 'Yes'};

var _canadaduane$typed_svg$TypedSvg_TypesToStrings$yesNoToString = function (question) {
	var _p0 = question;
	if (_p0.ctor === 'Yes') {
		return 'yes';
	} else {
		return 'no';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$turbulenceTypeToString = function (turbulenceType) {
	var _p1 = turbulenceType;
	if (_p1.ctor === 'TurbulenceTypeFractalNoise') {
		return 'fractalNoise';
	} else {
		return 'turbulence';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$timingValueAsString = function (timingValue) {
	var _p2 = timingValue;
	switch (_p2.ctor) {
		case 'TimingOffsetValue':
			return _p2._0;
		case 'TimingSyncBaseValue':
			return _p2._0;
		case 'TimingEventValue':
			return _p2._0;
		case 'TimingRepeatValue':
			return _p2._0;
		case 'TimingAccessKeyValue':
			return _p2._0;
		case 'TimingWallclockSyncValue':
			return _p2._0;
		default:
			return 'indefinite';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$transformToString = function (xform) {
	var tr = F2(
		function (name, args) {
			return _elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: name,
					_1: {
						ctor: '::',
						_0: '(',
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$core$String$join,
								' ',
								A2(_elm_lang$core$List$map, _elm_lang$core$Basics$toString, args)),
							_1: {
								ctor: '::',
								_0: ')',
								_1: {ctor: '[]'}
							}
						}
					}
				});
		});
	var _p3 = xform;
	switch (_p3.ctor) {
		case 'Matrix':
			return A2(
				tr,
				'matrix',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {
						ctor: '::',
						_0: _p3._1,
						_1: {
							ctor: '::',
							_0: _p3._2,
							_1: {
								ctor: '::',
								_0: _p3._3,
								_1: {
									ctor: '::',
									_0: _p3._4,
									_1: {
										ctor: '::',
										_0: _p3._5,
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				});
		case 'Rotate':
			return A2(
				tr,
				'rotate',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {
						ctor: '::',
						_0: _p3._1,
						_1: {
							ctor: '::',
							_0: _p3._2,
							_1: {ctor: '[]'}
						}
					}
				});
		case 'Scale':
			return A2(
				tr,
				'scale',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {
						ctor: '::',
						_0: _p3._1,
						_1: {ctor: '[]'}
					}
				});
		case 'SkewX':
			return A2(
				tr,
				'skewX',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {ctor: '[]'}
				});
		case 'SkewY':
			return A2(
				tr,
				'skewY',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {ctor: '[]'}
				});
		default:
			return A2(
				tr,
				'translate',
				{
					ctor: '::',
					_0: _p3._0,
					_1: {
						ctor: '::',
						_0: _p3._1,
						_1: {ctor: '[]'}
					}
				});
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$shapeRenderingToString = function (shapeRendering) {
	var _p4 = shapeRendering;
	switch (_p4.ctor) {
		case 'RenderAuto':
			return 'auto';
		case 'RenderOptimizeSpeed':
			return 'optimizeSpeed';
		case 'RenderCrispEdges':
			return 'crispEdges';
		case 'RenderGeometricPrecision':
			return 'geometricPrecision';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$scaleToString = function (scale) {
	var _p5 = scale;
	switch (_p5.ctor) {
		case 'ScaleMin':
			return 'min';
		case 'ScaleMid':
			return 'mid';
		default:
			return 'max';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$restartToString = function (restart) {
	var _p6 = restart;
	switch (_p6.ctor) {
		case 'RestartAlways':
			return 'always';
		case 'RestartWhenNotActive':
			return 'whenNotActive';
		default:
			return 'never';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$repeatCountToString = function (repeatCount) {
	var _p7 = repeatCount;
	if (_p7.ctor === 'RepeatCount') {
		return _elm_lang$core$Basics$toString(_p7._0);
	} else {
		return 'indefinite';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$renderingToString = function (rendering) {
	var _p8 = rendering;
	switch (_p8.ctor) {
		case 'RenderingAuto':
			return 'auto';
		case 'RenderingOptimizeSpeed':
			return 'optimizeSpeed';
		case 'RenderingOptimizeQuality':
			return 'optimizeQuality';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$opacityToString = function (opacity) {
	var _p9 = opacity;
	if (_p9.ctor === 'Opacity') {
		return _elm_lang$core$Basics$toString(_p9._0);
	} else {
		return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$morphologyOperatorToString = function (morphologyOperator) {
	var _p10 = morphologyOperator;
	if (_p10.ctor === 'MorphologyOperatorErode') {
		return 'erode';
	} else {
		return 'dilate';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$modeToString = function (mode) {
	var _p11 = mode;
	switch (_p11.ctor) {
		case 'ModeNormal':
			return 'normal';
		case 'ModeMultiply':
			return 'multiply';
		case 'ModeScreen':
			return 'screen';
		case 'ModeDarken':
			return 'darken';
		default:
			return 'lighten';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$meetOrSliceToString = function (meetOrSlice) {
	var _p12 = meetOrSlice;
	if (_p12.ctor === 'Meet') {
		return 'meet';
	} else {
		return 'slice';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$markerCoordinateSystemToString = function (markerCoordinateSystem) {
	var _p13 = markerCoordinateSystem;
	if (_p13.ctor === 'MarkerCoordinateSystemUserSpaceOnUse') {
		return 'userSpaceOnUse';
	} else {
		return 'strokeWidth';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthAdjustToString = function (lengthAdjust) {
	var _p14 = lengthAdjust;
	if (_p14.ctor === 'LengthAdjustSpacing') {
		return 'spacing';
	} else {
		return 'spacingAndGlyphs';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString = function (length) {
	var _p15 = length;
	switch (_p15.ctor) {
		case 'Cm':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'cm');
		case 'Em':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'em');
		case 'Ex':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'ex');
		case 'In':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'in');
		case 'Mm':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'mm');
		case 'Num':
			return _elm_lang$core$Basics$toString(_p15._0);
		case 'Pc':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'pc');
		case 'Percent':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'%');
		case 'Pt':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'pt');
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p15._0),
				'px');
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$kerningToString = function (kerning) {
	var _p16 = kerning;
	switch (_p16.ctor) {
		case 'KerningAuto':
			return 'auto';
		case 'KerningInherit':
			return 'inherit';
		default:
			return _canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(_p16._0);
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$inValueToString = function (inValue) {
	var _p17 = inValue;
	switch (_p17.ctor) {
		case 'InSourceGraphic':
			return 'sourceGraphic';
		case 'InSourceAlpha':
			return 'sourceAlpha';
		case 'InBackgroundAlpha':
			return 'backgroundAlpha';
		case 'InFillPaint':
			return 'fillPaint';
		case 'InStrokePaint':
			return 'strokePaint';
		default:
			return _p17._0;
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$funcTypeToString = function (funcType) {
	var _p18 = funcType;
	switch (_p18.ctor) {
		case 'FuncTypeIdentity':
			return 'identity';
		case 'FuncTypeTable':
			return 'table';
		case 'FuncTypeDiscrete':
			return 'discrete';
		case 'FuncTypeLinear':
			return 'linear';
		default:
			return 'gamma';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fontWeightToString = function (fontWeight) {
	var fontWeightClamped = function (weight) {
		return A3(_elm_lang$core$Basics$clamp, 100, 900, (((weight + 50) / 100) | 0) * 100);
	};
	var _p19 = fontWeight;
	switch (_p19.ctor) {
		case 'FontWeightNormal':
			return 'normal';
		case 'FontWeightBold':
			return 'bold';
		case 'FontWeightBolder':
			return 'bolder';
		case 'FontWeightLighter':
			return 'lighter';
		case 'FontWeightInherit':
			return 'inherit';
		default:
			return _elm_lang$core$Basics$toString(
				fontWeightClamped(_p19._0));
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fontVariantToString = function (fontVariant) {
	var _p20 = fontVariant;
	switch (_p20.ctor) {
		case 'FontVariantNormal':
			return 'normal';
		case 'FontVariantSmallCaps':
			return 'small-caps';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fontStyleToString = function (fontStyle) {
	var _p21 = fontStyle;
	switch (_p21.ctor) {
		case 'FontStyleNormal':
			return 'normal';
		case 'FontStyleItalic':
			return 'italic';
		case 'FontStyleOblique':
			return 'oblique';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fontStretchToString = function (fontStretch) {
	var _p22 = fontStretch;
	switch (_p22.ctor) {
		case 'FontStretchNormal':
			return 'normal';
		case 'FontStretchWider':
			return 'wider';
		case 'FontStretchNarrower':
			return 'narrower';
		case 'FontStretchUltraCondensed':
			return 'ultra-condensed';
		case 'FontStretchExtraCondensed':
			return 'extra-condensed';
		case 'FontStretchCondensed':
			return 'condensed';
		case 'FontStretchSemiCondensed':
			return 'semi-condensed';
		case 'FontStretchSemiExpanded':
			return 'semi-expanded';
		case 'FontStretchExpanded':
			return 'expanded';
		case 'FontStretchExtraExpanded':
			return 'extra-expanded';
		case 'FontStretchUltraExpanded':
			return 'ultra-expanded';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fontSizeAdjustToString = function (fontSizeAdjust) {
	var _p23 = fontSizeAdjust;
	switch (_p23.ctor) {
		case 'FontSizeAdjustNone':
			return 'none';
		case 'FontSizeAdjustInherit':
			return 'inherit';
		default:
			return _elm_lang$core$Basics$toString(_p23._0);
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$floodColorToString = function (floodColor) {
	var _p24 = floodColor;
	switch (_p24.ctor) {
		case 'FloodInherit':
			return 'inherit';
		case 'FloodCurrentColor':
			return 'currentColor';
		case 'Flood':
			return _eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba(_p24._0);
		default:
			return _p24._0;
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$filterToString = function (f) {
	var _p25 = f;
	switch (_p25.ctor) {
		case 'FilterNone':
			return 'none';
		case 'FilterInherit':
			return 'inherit';
		default:
			return _p25._0;
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$fillRuleToString = function (fillRule) {
	var _p26 = fillRule;
	if (_p26.ctor === 'FillRuleNonZero') {
		return 'nonzero';
	} else {
		return 'evenodd';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$edgeModeToString = function (edgeMode) {
	var _p27 = edgeMode;
	switch (_p27.ctor) {
		case 'EdgeModeDuplicate':
			return 'duplicate';
		case 'EdgeModeWrap':
			return 'wrap';
		default:
			return 'none';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$durationToString = function (duration) {
	var _p28 = duration;
	if (_p28.ctor === 'Duration') {
		return _p28._0;
	} else {
		return 'indefinite';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$dominantBaselineToString = function (dominantBaseline) {
	var _p29 = dominantBaseline;
	switch (_p29.ctor) {
		case 'DominantBaselineAuto':
			return 'auto';
		case 'DominantBaselineUseScript':
			return 'use-script';
		case 'DominantBaselineNoChange':
			return 'no-change';
		case 'DominantBaselineResetSize':
			return 'reset-size';
		case 'DominantBaselineIdeographic':
			return 'ideographic';
		case 'DominantBaselineAlphabetic':
			return 'alphabetic';
		case 'DominantBaselineHanging':
			return 'hanging';
		case 'DominantBaselineMathematical':
			return 'mathematical';
		case 'DominantBaselineCentral':
			return 'central';
		case 'DominantBaselineMiddle':
			return 'middle';
		case 'DominantBaselineTextAfterEdge':
			return 'text-after-edge';
		case 'DominantBaselineTextBeforeEdge':
			return 'text-before-edge';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$displayToString = function (display) {
	var _p30 = display;
	switch (_p30.ctor) {
		case 'DisplayInline':
			return 'inline';
		case 'DisplayBlock':
			return 'block';
		case 'DisplayListItem':
			return 'list-item';
		case 'DisplayRunIn':
			return 'run-in';
		case 'DisplayCompact':
			return 'compact';
		case 'DisplayMarker':
			return 'marker';
		case 'DisplayTable':
			return 'table';
		case 'DisplayInlineTable':
			return 'inline-table';
		case 'DisplayTableRowGroup':
			return 'table-row-group';
		case 'DisplayTableHeaderGroup':
			return 'table-header-group';
		case 'DisplayTableFooterGroup':
			return 'table-footer-group';
		case 'DisplayTableRow':
			return 'table-row';
		case 'DisplayTableColumnGroup':
			return 'table-column-group';
		case 'DisplayTableColumn':
			return 'table-column';
		case 'DisplayTableCell':
			return 'table-cell';
		case 'DisplayTableCaption':
			return 'table-caption';
		case 'DisplayNone':
			return 'none';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$directionToString = function (direction) {
	var _p31 = direction;
	switch (_p31.ctor) {
		case 'DirectionLTR':
			return 'ltr';
		case 'DirectionRTL':
			return 'rtl';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$cursorToString = function (cursor) {
	var _p32 = cursor;
	switch (_p32.ctor) {
		case 'CursorAuto':
			return 'auto';
		case 'CursorDefault':
			return 'default';
		case 'CursorCrosshair':
			return 'crosshair';
		case 'CursorPointer':
			return 'pointer';
		case 'CursorMove':
			return 'move';
		case 'CursorEResize':
			return 'e-resize';
		case 'CursorNEResize':
			return 'ne-resize';
		case 'CursorNWResize':
			return 'nw-resize';
		case 'CursorNResize':
			return 'n-resize';
		case 'CursorSEResize':
			return 'se-resize';
		case 'CursorSWResize':
			return 'sw-resize';
		case 'CursorWResize':
			return 'w-resize';
		case 'CursorText':
			return 'text';
		case 'CursorWait':
			return 'wait';
		case 'CursorHelp':
			return 'help';
		case 'CursorInherit':
			return 'inherit';
		default:
			return _p32._0;
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString = function (coordinateSystem) {
	var _p33 = coordinateSystem;
	if (_p33.ctor === 'CoordinateSystemUserSpaceOnUse') {
		return 'userSpaceOnUse';
	} else {
		return 'objectBoundingBox';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$compositeOperatorToString = function (compositeOperator) {
	var _p34 = compositeOperator;
	switch (_p34.ctor) {
		case 'CompositeOperatorOver':
			return 'over';
		case 'CompositeOperatorIn':
			return 'in';
		case 'CompositeOperatorOut':
			return 'out';
		case 'CompositeOperatorAtop':
			return 'atop';
		case 'CompositeOperatorXor':
			return 'xor';
		default:
			return 'arithmetic';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$colorProfileToString = function (colorProfile) {
	var _p35 = colorProfile;
	switch (_p35.ctor) {
		case 'ColorProfileAuto':
			return 'auto';
		case 'ColorProfileSRGB':
			return 'sRGB';
		case 'ColorProfile':
			return _p35._0;
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$colorMatrixTypeToString = function (colorMatrixType) {
	var _p36 = colorMatrixType;
	switch (_p36.ctor) {
		case 'ColorMatrixTypeMatrix':
			return 'matrix';
		case 'ColorMatrixTypeSaturate':
			return 'saturate';
		case 'ColorMatrixTypeHueRotate':
			return 'hueRotate';
		default:
			return 'luminanceToAlpha';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$colorInterpolationToString = function (colorInterpolation) {
	var _p37 = colorInterpolation;
	switch (_p37.ctor) {
		case 'ColorInterpolationAuto':
			return 'auto';
		case 'ColorInterpolationSRGB':
			return 'sRGB';
		case 'ColorInterpolationLinearRGB':
			return 'linearRGB';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$clipRuleToString = function (clipRule) {
	var _p38 = clipRule;
	switch (_p38.ctor) {
		case 'ClipRuleNonZero':
			return 'nonzero';
		case 'ClipRuleEvenOdd':
			return 'evenodd';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$clipPathToString = function (clipPath) {
	var _p39 = clipPath;
	switch (_p39.ctor) {
		case 'ClipPathNone':
			return 'none';
		case 'ClipPathInherit':
			return 'inherit';
		default:
			return _p39._0;
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$clipToString = function (clip) {
	var _p40 = clip;
	switch (_p40.ctor) {
		case 'ClipAuto':
			return 'auto';
		case 'ClipInherit':
			return 'inherit';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'rect(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p40._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						' ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Basics$toString(_p40._1),
							A2(
								_elm_lang$core$Basics_ops['++'],
								' ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(_p40._2),
									A2(
										_elm_lang$core$Basics_ops['++'],
										' ',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_elm_lang$core$Basics$toString(_p40._3),
											')'))))))));
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$calcModeToString = function (calcMode) {
	var _p41 = calcMode;
	switch (_p41.ctor) {
		case 'CalcModeDiscrete':
			return 'discrete';
		case 'CalcModeLinear':
			return 'linear';
		case 'CalcModePaced':
			return 'paced';
		default:
			return 'spline';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$bezierAnchorPointToString = function (_p42) {
	var _p43 = _p42;
	return A2(
		_elm_lang$core$String$join,
		' ',
		A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Basics$toString,
			{
				ctor: '::',
				_0: _p43._0,
				_1: {
					ctor: '::',
					_0: _p43._1,
					_1: {
						ctor: '::',
						_0: _p43._2,
						_1: {
							ctor: '::',
							_0: _p43._3,
							_1: {ctor: '[]'}
						}
					}
				}
			}));
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$baselineShiftToString = function (baselineShift) {
	var _p44 = baselineShift;
	switch (_p44.ctor) {
		case 'ShiftAuto':
			return 'auto';
		case 'ShiftBaseline':
			return 'baseline';
		case 'ShiftSuper':
			return 'super';
		case 'ShiftSub':
			return 'sub';
		case 'ShiftPercentage':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(_p44._0),
				'%');
		case 'ShiftLength':
			return _canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(_p44._0);
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$attributeTypeToString = function (attributeType) {
	var _p45 = attributeType;
	switch (_p45.ctor) {
		case 'AttributeTypeAuto':
			return 'auto';
		case 'AttributeTypeCss':
			return 'CSS';
		default:
			return 'XML';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$animateTransformTypeToString = function (animateTransformType) {
	var _p46 = animateTransformType;
	switch (_p46.ctor) {
		case 'AnimateTransformTypeTranslate':
			return 'translate';
		case 'AnimateTransformTypeScale':
			return 'scale';
		case 'AnimateTransformTypeRotate':
			return 'rotate';
		case 'AnimateTransformTypeSkewX':
			return 'skewX';
		default:
			return 'skewY';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$anchorAlignmentToString = function (anchorAlignment) {
	var _p47 = anchorAlignment;
	switch (_p47.ctor) {
		case 'AnchorInherit':
			return 'inherit';
		case 'AnchorStart':
			return 'start';
		case 'AnchorMiddle':
			return 'middle';
		default:
			return 'end';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$alignmentBaselineToString = function (alignmentBaseline) {
	var _p48 = alignmentBaseline;
	switch (_p48.ctor) {
		case 'AlignmentAuto':
			return 'auto';
		case 'AlignmentBaseline':
			return 'baseline';
		case 'AlignmentBeforeEdge':
			return 'before-edge';
		case 'AlignmentTextBeforeEdge':
			return 'text-before-edge';
		case 'AlignmentMiddle':
			return 'middle';
		case 'AlignmentCentral':
			return 'central';
		case 'AlignmentAfterEdge':
			return 'after-edge';
		case 'AlignmentTextAfterEdge':
			return 'text-after-edge';
		case 'AlignmentIdeographic':
			return 'ideographic';
		case 'AlignmentAlphabetic':
			return 'alphabetic';
		case 'AlignmentHanging':
			return 'hanging';
		case 'AlignmentMathematical':
			return 'mathematical';
		default:
			return 'inherit';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$alignToString = function (align) {
	var _p49 = align;
	if (_p49.ctor === 'AlignNone') {
		return 'none';
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'x',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_canadaduane$typed_svg$TypedSvg_TypesToStrings$scaleToString(_p49._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'y',
					_canadaduane$typed_svg$TypedSvg_TypesToStrings$scaleToString(_p49._1))));
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$additiveToString = function (additive) {
	var _p50 = additive;
	if (_p50.ctor === 'AdditiveNone') {
		return 'none';
	} else {
		return 'replace';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$accumulateToString = function (accumulate) {
	var _p51 = accumulate;
	if (_p51.ctor === 'AccumulateNone') {
		return 'none';
	} else {
		return 'sum';
	}
};
var _canadaduane$typed_svg$TypedSvg_TypesToStrings$boolToString = function (bool) {
	var _p52 = bool;
	if (_p52 === true) {
		return 'true';
	} else {
		return 'false';
	}
};

var _canadaduane$typed_svg$TypedSvg_Attributes$zoomAndPan = _canadaduane$typed_svg$TypedSvg_Core$attribute('zoomAndPan');
var _canadaduane$typed_svg$TypedSvg_Attributes$yChannelSelector = _canadaduane$typed_svg$TypedSvg_Core$attribute('yChannelSelector');
var _canadaduane$typed_svg$TypedSvg_Attributes$y2 = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'y2',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$y1 = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'y1',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$y = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'y',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$xmlSpace = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var _canadaduane$typed_svg$TypedSvg_Attributes$xmlLang = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:lang');
var _canadaduane$typed_svg$TypedSvg_Attributes$xmlBase = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:base');
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkType = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:type');
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkTitle = function (str) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'xlinkTitle', str);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkShow = function (str) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'xlinkShow', str);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkRole = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:role');
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkHref = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:href');
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkArcrole = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:arcrole');
var _canadaduane$typed_svg$TypedSvg_Attributes$xlinkActuate = A2(_canadaduane$typed_svg$TypedSvg_Core$attributeNS, 'http://www.w3.org/1999/xlink', 'xlink:actuate');
var _canadaduane$typed_svg$TypedSvg_Attributes$xChannelSelector = _canadaduane$typed_svg$TypedSvg_Core$attribute('xChannelSelector');
var _canadaduane$typed_svg$TypedSvg_Attributes$x2 = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'x2',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$x1 = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'x1',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$xHeight = _canadaduane$typed_svg$TypedSvg_Core$attribute('x-height');
var _canadaduane$typed_svg$TypedSvg_Attributes$x = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'x',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$writingMode = _canadaduane$typed_svg$TypedSvg_Core$attribute('writing-mode');
var _canadaduane$typed_svg$TypedSvg_Attributes$wordSpacing = _canadaduane$typed_svg$TypedSvg_Core$attribute('word-spacing');
var _canadaduane$typed_svg$TypedSvg_Attributes$widths = _canadaduane$typed_svg$TypedSvg_Core$attribute('widths');
var _canadaduane$typed_svg$TypedSvg_Attributes$width = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'width',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$visibility = _canadaduane$typed_svg$TypedSvg_Core$attribute('visibility');
var _canadaduane$typed_svg$TypedSvg_Attributes$viewTarget = _canadaduane$typed_svg$TypedSvg_Core$attribute('viewTarget');
var _canadaduane$typed_svg$TypedSvg_Attributes$viewBox = F4(
	function (minX, minY, width, height) {
		return A2(
			_canadaduane$typed_svg$TypedSvg_Core$attribute,
			'viewBox',
			A2(
				_elm_lang$core$String$join,
				' ',
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Basics$toString,
					{
						ctor: '::',
						_0: minX,
						_1: {
							ctor: '::',
							_0: minY,
							_1: {
								ctor: '::',
								_0: width,
								_1: {
									ctor: '::',
									_0: height,
									_1: {ctor: '[]'}
								}
							}
						}
					})));
	});
var _canadaduane$typed_svg$TypedSvg_Attributes$vertOriginY = _canadaduane$typed_svg$TypedSvg_Core$attribute('vert-origin-y');
var _canadaduane$typed_svg$TypedSvg_Attributes$vertOriginX = _canadaduane$typed_svg$TypedSvg_Core$attribute('vert-origin-x');
var _canadaduane$typed_svg$TypedSvg_Attributes$vertAdvY = _canadaduane$typed_svg$TypedSvg_Core$attribute('vert-adv-y');
var _canadaduane$typed_svg$TypedSvg_Attributes$version = function (number) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'version',
		_elm_lang$core$Basics$toString(number));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$vMathematical = _canadaduane$typed_svg$TypedSvg_Core$attribute('v-mathematical');
var _canadaduane$typed_svg$TypedSvg_Attributes$vIdeographic = _canadaduane$typed_svg$TypedSvg_Core$attribute('v-ideographic');
var _canadaduane$typed_svg$TypedSvg_Attributes$vHanging = _canadaduane$typed_svg$TypedSvg_Core$attribute('v-hanging');
var _canadaduane$typed_svg$TypedSvg_Attributes$vAlphabetic = _canadaduane$typed_svg$TypedSvg_Core$attribute('v-alphabetic');
var _canadaduane$typed_svg$TypedSvg_Attributes$unitsPerEm = _canadaduane$typed_svg$TypedSvg_Core$attribute('units-per-em');
var _canadaduane$typed_svg$TypedSvg_Attributes$unicodeRange = _canadaduane$typed_svg$TypedSvg_Core$attribute('unicode-range');
var _canadaduane$typed_svg$TypedSvg_Attributes$unicodeBidi = _canadaduane$typed_svg$TypedSvg_Core$attribute('unicode-bidi');
var _canadaduane$typed_svg$TypedSvg_Attributes$unicode = _canadaduane$typed_svg$TypedSvg_Core$attribute('unicode');
var _canadaduane$typed_svg$TypedSvg_Attributes$underlineThickness = function (thickness) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'underline-thickness',
		_elm_lang$core$Basics$toString(thickness));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$underlinePosition = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'underline-position',
		_elm_lang$core$Basics$toString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$u2 = _canadaduane$typed_svg$TypedSvg_Core$attribute('u2');
var _canadaduane$typed_svg$TypedSvg_Attributes$u1 = _canadaduane$typed_svg$TypedSvg_Core$attribute('u1');
var _canadaduane$typed_svg$TypedSvg_Attributes$transform = function (transforms) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'transform',
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$transformToString, transforms)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$to = function (value) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'to',
		_elm_lang$core$Basics$toString(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$title = _canadaduane$typed_svg$TypedSvg_Core$attribute('title');
var _canadaduane$typed_svg$TypedSvg_Attributes$textRendering = _canadaduane$typed_svg$TypedSvg_Core$attribute('text-rendering');
var _canadaduane$typed_svg$TypedSvg_Attributes$textLength = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'textLength',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$textDecoration = _canadaduane$typed_svg$TypedSvg_Core$attribute('text-decoration');
var _canadaduane$typed_svg$TypedSvg_Attributes$textAnchor = function (anchorAlignment) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'textAnchor',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$anchorAlignmentToString(anchorAlignment));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$target = _canadaduane$typed_svg$TypedSvg_Core$attribute('target');
var _canadaduane$typed_svg$TypedSvg_Attributes$tableValues = _canadaduane$typed_svg$TypedSvg_Core$attribute('tableValues');
var _canadaduane$typed_svg$TypedSvg_Attributes$systemLanguage = _canadaduane$typed_svg$TypedSvg_Core$attribute('systemLanguage');
var _canadaduane$typed_svg$TypedSvg_Attributes$style = function (value) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'style', value);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeWidth = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'strokeWidth',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeOpacity = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-opacity');
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeMiterlimit = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-miterlimit');
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeLinejoin = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-linejoin');
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeLinecap = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-linecap');
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeDashoffset = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-dashoffset');
var _canadaduane$typed_svg$TypedSvg_Attributes$strokeDasharray = _canadaduane$typed_svg$TypedSvg_Core$attribute('stroke-dasharray');
var _canadaduane$typed_svg$TypedSvg_Attributes$stroke = function (color) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'stroke',
		_eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba(color));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$string = _canadaduane$typed_svg$TypedSvg_Core$attribute('string');
var _canadaduane$typed_svg$TypedSvg_Attributes$strikethroughThickness = _canadaduane$typed_svg$TypedSvg_Core$attribute('strikethrough-thickness');
var _canadaduane$typed_svg$TypedSvg_Attributes$strikethroughPosition = _canadaduane$typed_svg$TypedSvg_Core$attribute('strikethrough-position');
var _canadaduane$typed_svg$TypedSvg_Attributes$stopOpacity = _canadaduane$typed_svg$TypedSvg_Core$attribute('stop-opacity');
var _canadaduane$typed_svg$TypedSvg_Attributes$stopColor = _canadaduane$typed_svg$TypedSvg_Core$attribute('stop-color');
var _canadaduane$typed_svg$TypedSvg_Attributes$stitchTiles = _canadaduane$typed_svg$TypedSvg_Core$attribute('stitchTiles');
var _canadaduane$typed_svg$TypedSvg_Attributes$stemv = _canadaduane$typed_svg$TypedSvg_Core$attribute('stemv');
var _canadaduane$typed_svg$TypedSvg_Attributes$stemh = _canadaduane$typed_svg$TypedSvg_Core$attribute('stemh');
var _canadaduane$typed_svg$TypedSvg_Attributes$stdDeviation = _canadaduane$typed_svg$TypedSvg_Core$attribute('stdDeviation');
var _canadaduane$typed_svg$TypedSvg_Attributes$startOffset = _canadaduane$typed_svg$TypedSvg_Core$attribute('startOffset');
var _canadaduane$typed_svg$TypedSvg_Attributes$spreadMethod = _canadaduane$typed_svg$TypedSvg_Core$attribute('spreadMethod');
var _canadaduane$typed_svg$TypedSvg_Attributes$speed = _canadaduane$typed_svg$TypedSvg_Core$attribute('speed');
var _canadaduane$typed_svg$TypedSvg_Attributes$specularExponent = _canadaduane$typed_svg$TypedSvg_Core$attribute('specularExponent');
var _canadaduane$typed_svg$TypedSvg_Attributes$specularConstant = _canadaduane$typed_svg$TypedSvg_Core$attribute('specularConstant');
var _canadaduane$typed_svg$TypedSvg_Attributes$spacing = _canadaduane$typed_svg$TypedSvg_Core$attribute('spacing');
var _canadaduane$typed_svg$TypedSvg_Attributes$slope = _canadaduane$typed_svg$TypedSvg_Core$attribute('slope');
var _canadaduane$typed_svg$TypedSvg_Attributes$shapeRendering = function (shapeRendering) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'shapeRendering',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$shapeRenderingToString(shapeRendering));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$ry = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'ry',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$rx = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'rx',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$rotate = _canadaduane$typed_svg$TypedSvg_Core$attribute('rotate');
var _canadaduane$typed_svg$TypedSvg_Attributes$restart = function (restart) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'restart',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$restartToString(restart));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$requiredFeatures = function (features) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'requiredFeatures',
		A2(_elm_lang$core$String$join, ' ', features));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$requiredExtensions = _canadaduane$typed_svg$TypedSvg_Core$attribute('requiredExtensions');
var _canadaduane$typed_svg$TypedSvg_Attributes$repeatDur = function (duration) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'repeatDur',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$durationToString(duration));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$repeatCount = function (repeatCount) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'repeatCount',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$repeatCountToString(repeatCount));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$renderingIntent = _canadaduane$typed_svg$TypedSvg_Core$attribute('rendering-intent');
var _canadaduane$typed_svg$TypedSvg_Attributes$refY = _canadaduane$typed_svg$TypedSvg_Core$attribute('refY');
var _canadaduane$typed_svg$TypedSvg_Attributes$refX = _canadaduane$typed_svg$TypedSvg_Core$attribute('refX');
var _canadaduane$typed_svg$TypedSvg_Attributes$r = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'r',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$primitiveUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'primitiveUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$preserveAspectRatio = F2(
	function (align, meetOrSlice) {
		return A2(
			_canadaduane$typed_svg$TypedSvg_Core$attribute,
			'preserveAspectRatio',
			A2(
				_elm_lang$core$String$join,
				' ',
				{
					ctor: '::',
					_0: _canadaduane$typed_svg$TypedSvg_TypesToStrings$alignToString(align),
					_1: {
						ctor: '::',
						_0: _canadaduane$typed_svg$TypedSvg_TypesToStrings$meetOrSliceToString(meetOrSlice),
						_1: {ctor: '[]'}
					}
				}));
	});
var _canadaduane$typed_svg$TypedSvg_Attributes$points = function (pts) {
	var pointToString = function (_p0) {
		var _p1 = _p0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(_p1._0),
			A2(
				_elm_lang$core$Basics_ops['++'],
				', ',
				_elm_lang$core$Basics$toString(_p1._1)));
	};
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'points',
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(_elm_lang$core$List$map, pointToString, pts)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$pointOrder = _canadaduane$typed_svg$TypedSvg_Core$attribute('point-order');
var _canadaduane$typed_svg$TypedSvg_Attributes$pointerEvents = _canadaduane$typed_svg$TypedSvg_Core$attribute('pointer-events');
var _canadaduane$typed_svg$TypedSvg_Attributes$patternUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'patternUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$patternTransform = function (transforms) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'patternTransform',
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$transformToString, transforms)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$patternContentUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'patternContentUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$pathLength = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'pathLength',
		_elm_lang$core$Basics$toString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$path = _canadaduane$typed_svg$TypedSvg_Core$attribute('path');
var _canadaduane$typed_svg$TypedSvg_Attributes$panose1 = _canadaduane$typed_svg$TypedSvg_Core$attribute('panose-1');
var _canadaduane$typed_svg$TypedSvg_Attributes$overlineThickness = function (thickness) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'overlineThickness',
		_elm_lang$core$Basics$toString(thickness));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$overlinePosition = function (position) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'overlinePosition',
		_elm_lang$core$Basics$toString(position));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$overflow = _canadaduane$typed_svg$TypedSvg_Core$attribute('overflow');
var _canadaduane$typed_svg$TypedSvg_Attributes$origin = _canadaduane$typed_svg$TypedSvg_Core$attribute('origin');
var _canadaduane$typed_svg$TypedSvg_Attributes$orientation = _canadaduane$typed_svg$TypedSvg_Core$attribute('orientation');
var _canadaduane$typed_svg$TypedSvg_Attributes$orient = _canadaduane$typed_svg$TypedSvg_Core$attribute('orient');
var _canadaduane$typed_svg$TypedSvg_Attributes$opacity = _canadaduane$typed_svg$TypedSvg_Core$attribute('opacity');
var _canadaduane$typed_svg$TypedSvg_Attributes$offset = _canadaduane$typed_svg$TypedSvg_Core$attribute('offset');
var _canadaduane$typed_svg$TypedSvg_Attributes$name = _canadaduane$typed_svg$TypedSvg_Core$attribute('name');
var _canadaduane$typed_svg$TypedSvg_Attributes$min = function (clockValue) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'min', clockValue);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$method = _canadaduane$typed_svg$TypedSvg_Core$attribute('method');
var _canadaduane$typed_svg$TypedSvg_Attributes$media = _canadaduane$typed_svg$TypedSvg_Core$attribute('media');
var _canadaduane$typed_svg$TypedSvg_Attributes$max = function (clockValue) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'max', clockValue);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$maskUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'maskUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$maskContentUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'maskContentUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$mask = _canadaduane$typed_svg$TypedSvg_Core$attribute('mask');
var _canadaduane$typed_svg$TypedSvg_Attributes$markerWidth = function (width) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'markerWidth',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(width));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$markerUnits = function (markerCoordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'markerUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$markerCoordinateSystemToString(markerCoordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$markerStart = _canadaduane$typed_svg$TypedSvg_Core$attribute('marker-start');
var _canadaduane$typed_svg$TypedSvg_Attributes$markerMid = _canadaduane$typed_svg$TypedSvg_Core$attribute('marker-mid');
var _canadaduane$typed_svg$TypedSvg_Attributes$markerHeight = function (height) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'markerHeight',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(height));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$markerEnd = _canadaduane$typed_svg$TypedSvg_Core$attribute('marker-end');
var _canadaduane$typed_svg$TypedSvg_Attributes$local = _canadaduane$typed_svg$TypedSvg_Core$attribute('local');
var _canadaduane$typed_svg$TypedSvg_Attributes$lightingColor = _canadaduane$typed_svg$TypedSvg_Core$attribute('lighting-color');
var _canadaduane$typed_svg$TypedSvg_Attributes$letterSpacing = _canadaduane$typed_svg$TypedSvg_Core$attribute('letter-spacing');
var _canadaduane$typed_svg$TypedSvg_Attributes$lengthAdjust = function (option) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'lengthAdjust',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthAdjustToString(option));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$lang = _canadaduane$typed_svg$TypedSvg_Core$attribute('lang');
var _canadaduane$typed_svg$TypedSvg_Attributes$keyTimes = function (floatList) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'keyTimes',
		A2(
			_elm_lang$core$String$join,
			';',
			A2(_elm_lang$core$List$map, _elm_lang$core$Basics$toString, floatList)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$keySplines = function (bezierAnchorPointList) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'keySplines',
		A2(
			_elm_lang$core$String$join,
			';',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$bezierAnchorPointToString, bezierAnchorPointList)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$kerning = function (k) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'kerning',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$kerningToString(k));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$k = _canadaduane$typed_svg$TypedSvg_Core$attribute('k');
var _canadaduane$typed_svg$TypedSvg_Attributes$intercept = _canadaduane$typed_svg$TypedSvg_Core$attribute('intercept');
var _canadaduane$typed_svg$TypedSvg_Attributes$imageRendering = function (rendering) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'image-rendering',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$renderingToString(rendering));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$ideographic = _canadaduane$typed_svg$TypedSvg_Core$attribute('ideographic');
var _canadaduane$typed_svg$TypedSvg_Attributes$horizOriginY = _canadaduane$typed_svg$TypedSvg_Core$attribute('horiz-origin-y');
var _canadaduane$typed_svg$TypedSvg_Attributes$horizOriginX = _canadaduane$typed_svg$TypedSvg_Core$attribute('horiz-origin-x');
var _canadaduane$typed_svg$TypedSvg_Attributes$horizAdvX = _canadaduane$typed_svg$TypedSvg_Core$attribute('horiz-adv-x');
var _canadaduane$typed_svg$TypedSvg_Attributes$height = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'height',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$hanging = _canadaduane$typed_svg$TypedSvg_Core$attribute('hanging');
var _canadaduane$typed_svg$TypedSvg_Attributes$gradientUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'gradientUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$gradientTransform = function (transforms) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'gradientTransform',
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$transformToString, transforms)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$glyphRef = _canadaduane$typed_svg$TypedSvg_Core$attribute('glyphRef');
var _canadaduane$typed_svg$TypedSvg_Attributes$glyphOrientationVertical = _canadaduane$typed_svg$TypedSvg_Core$attribute('glyph-orientation-vertical');
var _canadaduane$typed_svg$TypedSvg_Attributes$glyphOrientationHorizontal = _canadaduane$typed_svg$TypedSvg_Core$attribute('glyph-orientation-horizontal');
var _canadaduane$typed_svg$TypedSvg_Attributes$glyphName = _canadaduane$typed_svg$TypedSvg_Core$attribute('glyph-name');
var _canadaduane$typed_svg$TypedSvg_Attributes$g2 = _canadaduane$typed_svg$TypedSvg_Core$attribute('g2');
var _canadaduane$typed_svg$TypedSvg_Attributes$g1 = _canadaduane$typed_svg$TypedSvg_Core$attribute('g1');
var _canadaduane$typed_svg$TypedSvg_Attributes$fy = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fy',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fx = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fx',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$from = function (value) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'from',
		_elm_lang$core$Basics$toString(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$format = _canadaduane$typed_svg$TypedSvg_Core$attribute('format');
var _canadaduane$typed_svg$TypedSvg_Attributes$fontWeight = function (fontWeight) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontWeight',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fontWeightToString(fontWeight));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontVariant = function (fontVariant) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontVariant',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fontVariantToString(fontVariant));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontStyle = function (fontStyle) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontStyle',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fontStyleToString(fontStyle));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontStretch = function (fontStretch) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontStretch',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fontStretchToString(fontStretch));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontSizeAdjust = function (fontSizeAdjust) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontSizeAdjust',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fontSizeAdjustToString(fontSizeAdjust));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontSize = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fontSize',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fontFamily = function (families) {
	var _p2 = families;
	if (_p2.ctor === '[]') {
		return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'fontFamily', 'inherit');
	} else {
		return A2(
			_canadaduane$typed_svg$TypedSvg_Core$attribute,
			'fontFamily',
			A2(_elm_lang$core$String$join, ', ', families));
	}
};
var _canadaduane$typed_svg$TypedSvg_Attributes$filter = function (f) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'filter',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$filterToString(f));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fillRule = function (fillRule) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fill-rule',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$fillRuleToString(fillRule));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fillOpacity = function (opacity) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fill-opacity',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$opacityToString(opacity));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$fill = function (color) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'fill',
		_eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba(color));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$noFill = _canadaduane$typed_svg$TypedSvg_Attributes$fill(
	A4(_elm_lang$core$Color$rgba, 0, 0, 0, 0.0));
var _canadaduane$typed_svg$TypedSvg_Attributes$externalResourcesRequired = function (bool) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'externalResourcesRequired',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$boolToString(bool));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$exponent = _canadaduane$typed_svg$TypedSvg_Core$attribute('exponent');
var _canadaduane$typed_svg$TypedSvg_Attributes$end = function (timingValues) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'end',
		A2(
			_elm_lang$core$String$join,
			';',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$timingValueAsString, timingValues)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$enableBackground = _canadaduane$typed_svg$TypedSvg_Core$attribute('enable-background');
var _canadaduane$typed_svg$TypedSvg_Attributes$dy = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'dy',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$dx = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'dx',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$dur = function (duration) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'dur',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$durationToString(duration));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$dominantBaseline = function (dominantBaseline) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'dominant-baseline',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$dominantBaselineToString(dominantBaseline));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$display = function (display) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'display',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$displayToString(display));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$direction = function (direction) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'direction',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$directionToString(direction));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$descent = _canadaduane$typed_svg$TypedSvg_Core$attribute('descent');
var _canadaduane$typed_svg$TypedSvg_Attributes$decelerate = _canadaduane$typed_svg$TypedSvg_Core$attribute('decelerate');
var _canadaduane$typed_svg$TypedSvg_Attributes$d = _canadaduane$typed_svg$TypedSvg_Core$attribute('d');
var _canadaduane$typed_svg$TypedSvg_Attributes$cy = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'cy',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$cx = function (length) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'cx',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$lengthToString(length));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$cursor = function (cursor) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'cursor',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$cursorToString(cursor));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$contentType = function (t) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'type_', t);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$contentStyleType = function (styleSheetLanguage) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'contentStyleType', styleSheetLanguage);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$contentScriptType = function (mimeType) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'contentScriptType', mimeType);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$color = function (c) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'color',
		_eskimoblood$elm_color_extra$Color_Convert$colorToCssRgba(c));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$colorRendering = function (rendering) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'color-rendering',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$renderingToString(rendering));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$colorProfile = function (colorProfile) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'color-profile',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$colorProfileToString(colorProfile));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$colorInterpolation = function (colorInterpolation) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'colorInterpolation',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$colorInterpolationToString(colorInterpolation));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$clipRule = function (clipRule) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'clip-rule',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$clipRuleToString(clipRule));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$clipPathUnits = function (coordinateSystem) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'clipPathUnits',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$coordinateSystemToString(coordinateSystem));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$clipPath = function (clipPath) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'clip-path',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$clipPathToString(clipPath));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$clip = function (clip) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'clip',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$clipToString(clip));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$class = function (names) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'class',
		A2(_elm_lang$core$String$join, ' ', names));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$capHeight = _canadaduane$typed_svg$TypedSvg_Core$attribute('cap-height');
var _canadaduane$typed_svg$TypedSvg_Attributes$calcMode = function (calcMode) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'calcMode',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$calcModeToString(calcMode));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$by = _canadaduane$typed_svg$TypedSvg_Core$attribute('by');
var _canadaduane$typed_svg$TypedSvg_Attributes$begin = function (timingValues) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'begin',
		A2(
			_elm_lang$core$String$join,
			';',
			A2(_elm_lang$core$List$map, _canadaduane$typed_svg$TypedSvg_TypesToStrings$timingValueAsString, timingValues)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$bbox = _canadaduane$typed_svg$TypedSvg_Core$attribute('bbox');
var _canadaduane$typed_svg$TypedSvg_Attributes$baseProfile = _canadaduane$typed_svg$TypedSvg_Core$attribute('baseProfile');
var _canadaduane$typed_svg$TypedSvg_Attributes$baselineShift = function (baselineShift) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'baseline-shift',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$baselineShiftToString(baselineShift));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$autoReverse = _canadaduane$typed_svg$TypedSvg_Core$attribute('autoReverse');
var _canadaduane$typed_svg$TypedSvg_Attributes$attributeType = function (attributeType) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'attributeType',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$attributeTypeToString(attributeType));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$attributeName = function (name) {
	return A2(_canadaduane$typed_svg$TypedSvg_Core$attribute, 'attributeName', name);
};
var _canadaduane$typed_svg$TypedSvg_Attributes$ascent = function (maxDepth) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'ascent',
		_elm_lang$core$Basics$toString(maxDepth));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$arabicForm = _canadaduane$typed_svg$TypedSvg_Core$attribute('arabic-form');
var _canadaduane$typed_svg$TypedSvg_Attributes$animationValues = function (values) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'values',
		A2(
			_elm_lang$core$String$join,
			';',
			A2(_elm_lang$core$List$map, _elm_lang$core$Basics$toString, values)));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$animateTransformType = function (animateTransformType) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'type_',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$animateTransformTypeToString(animateTransformType));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$amplitude = _canadaduane$typed_svg$TypedSvg_Core$attribute('amplitude');
var _canadaduane$typed_svg$TypedSvg_Attributes$allowReorder = function (allowReorder) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'allowReorder',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$yesNoToString(allowReorder));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$alignmentBaseline = function (alignmentBaseline) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'alignment-baseline',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$alignmentBaselineToString(alignmentBaseline));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$alphabetic = _canadaduane$typed_svg$TypedSvg_Core$attribute('alphabetic');
var _canadaduane$typed_svg$TypedSvg_Attributes$additive = function (option) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'additive',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$additiveToString(option));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$accumulate = function (option) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'accumulate',
		_canadaduane$typed_svg$TypedSvg_TypesToStrings$accumulateToString(option));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$accelerate = function (rate) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'accelerate',
		_elm_lang$core$Basics$toString(rate));
};
var _canadaduane$typed_svg$TypedSvg_Attributes$accentHeight = function (height) {
	return A2(
		_canadaduane$typed_svg$TypedSvg_Core$attribute,
		'accent-height',
		_elm_lang$core$Basics$toString(height));
};

var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y2 = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$y2(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y1 = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$y1(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$y(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x2 = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$x2(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x1 = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$x1(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$x(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$width = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$width(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$strokeWidth = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$strokeWidth(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$textLength = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$textLength(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$ry = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$ry(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$rx = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$rx(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$r = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$r(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$markerWidth = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$markerWidth(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$markerHeight = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$markerHeight(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$height = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$height(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$fy = function (yAxisCoord) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$fx(
		_canadaduane$typed_svg$TypedSvg_Types$px(yAxisCoord));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$fx = function (xAxisCoord) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$fx(
		_canadaduane$typed_svg$TypedSvg_Types$px(xAxisCoord));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$fontSize = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$fontSize(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$dy = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$dy(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$dx = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$dx(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$cy = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$cy(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};
var _canadaduane$typed_svg$TypedSvg_Attributes_InPx$cx = function (value) {
	return _canadaduane$typed_svg$TypedSvg_Attributes$cx(
		_canadaduane$typed_svg$TypedSvg_Types$px(value));
};

var _canadaduane$typed_svg$TypedSvg_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _canadaduane$typed_svg$TypedSvg_Events$simpleOn = F2(
	function (name, msg) {
		return A2(
			_canadaduane$typed_svg$TypedSvg_Events$on,
			name,
			_elm_lang$core$Json_Decode$succeed(msg));
	});
var _canadaduane$typed_svg$TypedSvg_Events$onBegin = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('begin');
var _canadaduane$typed_svg$TypedSvg_Events$onEnd = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('end');
var _canadaduane$typed_svg$TypedSvg_Events$onRepeat = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('repeat');
var _canadaduane$typed_svg$TypedSvg_Events$onAbort = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('abort');
var _canadaduane$typed_svg$TypedSvg_Events$onError = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('error');
var _canadaduane$typed_svg$TypedSvg_Events$onResize = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('resize');
var _canadaduane$typed_svg$TypedSvg_Events$onScroll = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('scroll');
var _canadaduane$typed_svg$TypedSvg_Events$onLoad = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('load');
var _canadaduane$typed_svg$TypedSvg_Events$onUnload = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('unload');
var _canadaduane$typed_svg$TypedSvg_Events$onZoom = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('zoom');
var _canadaduane$typed_svg$TypedSvg_Events$onActivate = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('activate');
var _canadaduane$typed_svg$TypedSvg_Events$onClick = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('click');
var _canadaduane$typed_svg$TypedSvg_Events$onFocusIn = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('focusin');
var _canadaduane$typed_svg$TypedSvg_Events$onFocusOut = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('focusout');
var _canadaduane$typed_svg$TypedSvg_Events$onMouseDown = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('mousedown');
var _canadaduane$typed_svg$TypedSvg_Events$onMouseMove = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('mousemove');
var _canadaduane$typed_svg$TypedSvg_Events$onMouseOut = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('mouseout');
var _canadaduane$typed_svg$TypedSvg_Events$onMouseOver = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('mouseover');
var _canadaduane$typed_svg$TypedSvg_Events$onMouseUp = _canadaduane$typed_svg$TypedSvg_Events$simpleOn('mouseup');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _evancz$elm_markdown$Native_Markdown = function() {


// VIRTUAL-DOM WIDGETS

function toHtml(options, factList, rawMarkdown)
{
	var model = {
		options: options,
		markdown: rawMarkdown
	};
	return _elm_lang$virtual_dom$Native_VirtualDom.custom(factList, model, implementation);
}


// WIDGET IMPLEMENTATION

var implementation = {
	render: render,
	diff: diff
};

function render(model)
{
	var html = marked(model.markdown, formatOptions(model.options));
	var div = document.createElement('div');
	div.innerHTML = html;
	return div;
}

function diff(a, b)
{
	
	if (a.model.markdown === b.model.markdown && a.model.options === b.model.options)
	{
		return null;
	}

	return {
		applyPatch: applyPatch,
		data: marked(b.model.markdown, formatOptions(b.model.options))
	};
}

function applyPatch(domNode, data)
{
	domNode.innerHTML = data;
	return domNode;
}


// ACTUAL MARKDOWN PARSER

var marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && options.defaultHighlighting.ctor === 'Just')
		{
			lang = options.defaultHighlighting._0;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.githubFlavored;
	if (gfm.ctor === 'Just')
	{
		return {
			highlight: toHighlight,
			gfm: true,
			tables: gfm._0.tables,
			breaks: gfm._0.breaks,
			sanitize: options.sanitize,
			smartypants: options.smartypants
		};
	}

	return {
		highlight: toHighlight,
		gfm: false,
		tables: false,
		breaks: false,
		sanitize: options.sanitize,
		smartypants: options.smartypants
	};
}


// EXPORTS

return {
	toHtml: F3(toHtml)
};

}();

var _evancz$elm_markdown$Markdown$toHtmlWith = _evancz$elm_markdown$Native_Markdown.toHtml;
var _evancz$elm_markdown$Markdown$defaultOptions = {
	githubFlavored: _elm_lang$core$Maybe$Just(
		{tables: false, breaks: false}),
	defaultHighlighting: _elm_lang$core$Maybe$Nothing,
	sanitize: false,
	smartypants: false
};
var _evancz$elm_markdown$Markdown$toHtml = F2(
	function (attrs, string) {
		return A3(_evancz$elm_markdown$Native_Markdown.toHtml, _evancz$elm_markdown$Markdown$defaultOptions, attrs, string);
	});
var _evancz$elm_markdown$Markdown$Options = F4(
	function (a, b, c, d) {
		return {githubFlavored: a, defaultHighlighting: b, sanitize: c, smartypants: d};
	});

var _user$project$SelectionList$selectedIndex = function (list) {
	return _elm_lang$core$List$length(list.previous);
};
var _user$project$SelectionList$previous = function (list) {
	var _p0 = list.previous;
	if (_p0.ctor === '[]') {
		return list;
	} else {
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				selected: _p0._0,
				previous: _p0._1,
				next: {ctor: '::', _0: list.selected, _1: list.next}
			});
	}
};
var _user$project$SelectionList$next = function (list) {
	var _p1 = list.next;
	if (_p1.ctor === '[]') {
		return list;
	} else {
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				selected: _p1._0,
				previous: {ctor: '::', _0: list.selected, _1: list.previous},
				next: _p1._1
			});
	}
};
var _user$project$SelectionList$goto = F2(
	function (n, list) {
		$goto:
		while (true) {
			var curIndex = _user$project$SelectionList$selectedIndex(list);
			if (_elm_lang$core$Native_Utils.eq(curIndex, n)) {
				return list;
			} else {
				if ((_elm_lang$core$Native_Utils.cmp(curIndex, n) < 0) && (_elm_lang$core$Native_Utils.cmp(
					_elm_lang$core$List$length(list.next),
					0) > 0)) {
					var _v2 = n,
						_v3 = _user$project$SelectionList$next(list);
					n = _v2;
					list = _v3;
					continue $goto;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(
						curIndex,
						A2(_elm_lang$core$Basics$max, 0, n)) > 0) {
						var _v4 = n,
							_v5 = _user$project$SelectionList$previous(list);
						n = _v4;
						list = _v5;
						continue $goto;
					} else {
						return list;
					}
				}
			}
		}
	});
var _user$project$SelectionList$selectedMap = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				previous: A2(
					_elm_lang$core$List$map,
					f(false),
					list.previous),
				selected: A2(f, true, list.selected),
				next: A2(
					_elm_lang$core$List$map,
					f(false),
					list.next)
			});
	});
var _user$project$SelectionList$indexedMap = F2(
	function (f, list) {
		var nextLength = _elm_lang$core$List$length(list.next);
		var previousLength = _elm_lang$core$List$length(list.previous);
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				previous: _elm_lang$core$List$reverse(
					A2(
						_elm_lang$core$List$indexedMap,
						f,
						_elm_lang$core$List$reverse(list.previous))),
				selected: A2(f, previousLength, list.selected),
				next: A2(
					_elm_lang$core$List$indexedMap,
					function (index) {
						return f((index + previousLength) + 1);
					},
					list.next)
			});
	});
var _user$project$SelectionList$map2 = F3(
	function (f, listA, listB) {
		return _elm_lang$core$Native_Utils.update(
			listA,
			{
				previous: A3(_elm_lang$core$List$map2, f, listA.previous, listB.previous),
				selected: A2(f, listA.selected, listB.selected),
				next: A3(_elm_lang$core$List$map2, f, listA.next, listB.next)
			});
	});
var _user$project$SelectionList$andMap = _user$project$SelectionList$map2(
	F2(
		function (x, y) {
			return x(y);
		}));
var _user$project$SelectionList$updateN = F3(
	function (n, f, list) {
		return A2(
			_user$project$SelectionList$indexedMap,
			F2(
				function (index, value) {
					return _elm_lang$core$Native_Utils.eq(index, n) ? f(value) : value;
				}),
			list);
	});
var _user$project$SelectionList$updateSelected = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				selected: f(list.selected)
			});
	});
var _user$project$SelectionList$map = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.update(
			list,
			{
				previous: A2(_elm_lang$core$List$map, f, list.previous),
				selected: f(list.selected),
				next: A2(_elm_lang$core$List$map, f, list.next)
			});
	});
var _user$project$SelectionList$length = function (list) {
	return (_elm_lang$core$List$length(list.previous) + 1) + _elm_lang$core$List$length(list.next);
};
var _user$project$SelectionList$toList = function (list) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$List$reverse(list.previous),
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: list.selected,
				_1: {ctor: '[]'}
			},
			list.next));
};
var _user$project$SelectionList$SelectionList = F3(
	function (a, b, c) {
		return {previous: a, selected: b, next: c};
	});
var _user$project$SelectionList$fromList = F2(
	function (selected, next) {
		return A3(
			_user$project$SelectionList$SelectionList,
			{ctor: '[]'},
			selected,
			next);
	});

var _user$project$InnoCheckModel$postUrl = 'https://doon-irc.firebaseio.com/irc-quickscan/';
var _user$project$InnoCheckModel$answerColorEmpty = A4(_elm_lang$core$Color$rgba, 204, 204, 204, 1);
var _user$project$InnoCheckModel$answerColorRed = A4(_elm_lang$core$Color$rgba, 196, 2, 33, 1);
var _user$project$InnoCheckModel$answerColorOrange = _elm_lang$core$Color$orange;
var _user$project$InnoCheckModel$answerColorGreen = A4(_elm_lang$core$Color$rgba, 0, 159, 107, 1);
var _user$project$InnoCheckModel$answerColorList = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'Yes', _1: _user$project$InnoCheckModel$answerColorGreen},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'Partly', _1: _user$project$InnoCheckModel$answerColorOrange},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'No', _1: _user$project$InnoCheckModel$answerColorRed},
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$InnoCheckModel$questionAnswersEmpty = _elm_lang$core$Dict$empty;
var _user$project$InnoCheckModel$person0 = {email: '', phonenumber: '', firstname: '', lastname: '', companyname: ''};
var _user$project$InnoCheckModel$Flags = function (a) {
	return {baseUrl: a};
};
var _user$project$InnoCheckModel$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {questions: a, questionAnswers: b, person: c, sendSuccess: d, sendErrorMessage: e, sendAttempted: f, isDirty: g, aspectSelectionList: h, splashScreenRead: i, actionTime: j, flags: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _user$project$InnoCheckModel$Question = F3(
	function (a, b, c) {
		return {key: a, aspect: b, text: c};
	});
var _user$project$InnoCheckModel$Recommendation = F4(
	function (a, b, c, d) {
		return {aspect: a, scoreMin: b, scoreMax: c, text: d};
	});
var _user$project$InnoCheckModel$Person = F5(
	function (a, b, c, d, e) {
		return {email: a, phonenumber: b, firstname: c, lastname: d, companyname: e};
	});
var _user$project$InnoCheckModel$Improve = {ctor: 'Improve'};
var _user$project$InnoCheckModel$MeasureAndMonitor = {ctor: 'MeasureAndMonitor'};
var _user$project$InnoCheckModel$Processes = {ctor: 'Processes'};
var _user$project$InnoCheckModel$Resources = {ctor: 'Resources'};
var _user$project$InnoCheckModel$Culture = {ctor: 'Culture'};
var _user$project$InnoCheckModel$Leadership = {ctor: 'Leadership'};
var _user$project$InnoCheckModel$questions = {
	ctor: '::',
	_0: {key: 1, aspect: _user$project$InnoCheckModel$Leadership, text: 'Ondersteunt en is het management actief betrokken bij de activiteiten op het gebied van het organiseren en ontwikkelen van nieuwe producten en diensten (oftewel innovatie)?'},
	_1: {
		ctor: '::',
		_0: {key: 2, aspect: _user$project$InnoCheckModel$Leadership, text: 'Heeft het management meetbare (innovatie)doelen voor het ontwikkelen van nieuwe producten of diensten en communiceert zij deze ook?'},
		_1: {
			ctor: '::',
			_0: {key: 3, aspect: _user$project$InnoCheckModel$Culture, text: 'Heeft de organisatie een visie geformuleerd en gecommuniceerd? Handelen medewerkers volgens deze visie?'},
			_1: {
				ctor: '::',
				_0: {key: 4, aspect: _user$project$InnoCheckModel$Culture, text: 'Moedigt de organisatie medewerkers aan tot het behalen van resultaten m.b.t. het bedenken, ontwikkelen en invoeren van nieuwe producten en diensten?'},
				_1: {
					ctor: '::',
					_0: {key: 5, aspect: _user$project$InnoCheckModel$Processes, text: 'Zijn de activiteiten, instructies en procedures beschreven m.b.t. hoe ideeën uit te werken tot nieuwe producten en diensten? M.a.w. is er een werkend innovatieproces ingevoerd?'},
					_1: {
						ctor: '::',
						_0: {key: 6, aspect: _user$project$InnoCheckModel$Processes, text: 'Zijn er processen aanwezig om nieuwe producten en diensten op te nemen in de bestaande organisatie?'},
						_1: {
							ctor: '::',
							_0: {key: 7, aspect: _user$project$InnoCheckModel$Resources, text: 'Zijn er voldoende middelen (mensen, geld, infrastructuur, informatie) gereserveerd en gemakkelijk beschikbaar om innovatieve activiteiten uit te voeren?'},
							_1: {
								ctor: '::',
								_0: {key: 8, aspect: _user$project$InnoCheckModel$Resources, text: 'Kunnen medewerkers deelnemen in het bedenken en uitvoeren van nieuwe innovatieve activiteiten? Is innovatie opgenomen in hun persoonlijke doestellingen? Kunnen medewerkers een opleiding volgen?'},
								_1: {
									ctor: '::',
									_0: {key: 9, aspect: _user$project$InnoCheckModel$MeasureAndMonitor, text: 'Worden er specifieke cijfers en data verzameld en gebruikt om de innovatie-activiteiten te meten en bewaken?'},
									_1: {
										ctor: '::',
										_0: {key: 10, aspect: _user$project$InnoCheckModel$MeasureAndMonitor, text: 'Vindt er daadwerkelijk sturing plaats op basis van deze monitoring? Of is deze data transparant beschikbaar als basis voor zelfsturing?'},
										_1: {
											ctor: '::',
											_0: {key: 11, aspect: _user$project$InnoCheckModel$Improve, text: 'Wordt het innovatieproces zelf stelselmatig geanalyseerd en beoordeeld op de goede werking?'},
											_1: {
												ctor: '::',
												_0: {key: 12, aspect: _user$project$InnoCheckModel$Improve, text: 'Is er een proces/procedure ingericht om het innovatieproces te verbeteren op basis van deze bevindingen?'},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$InnoCheckModel$recommendations = {
	ctor: '::',
	_0: {aspect: _user$project$InnoCheckModel$Leadership, scoreMin: 0.0, scoreMax: 0.3, text: 'Leg 1 of 2 concrete innovatiedoelen vast in het bedrijfsplan voor dit jaar.'},
	_1: {
		ctor: '::',
		_0: {aspect: _user$project$InnoCheckModel$Leadership, scoreMin: 0.3, scoreMax: 1.0, text: 'Goed bezig. Focus eerst op het verbeteren van de andere aspecten.'},
		_1: {ctor: '[]'}
	}
};
var _user$project$InnoCheckModel$aspectList = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Leadership, _1: 'Leiderschap'},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Culture, _1: 'Cultuur'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Processes, _1: 'Processen'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Resources, _1: 'Middelen'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$MeasureAndMonitor, _1: 'Meten en monitoren'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Improve, _1: 'Verbeteren'},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _user$project$InnoCheckModel$aspectTips = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Leadership),
			_1: '\n#### Tips voor het aspect leiderschap\n\nActief leiderschap is een belangrijke voorwaarde voor innovatie. Om ondernemend\nen innovatief gedrag in je organisatie aan te wakkeren, dient het management\nmedewerkers te faciliteren in hun ambitie om oplossingen\nte zoeken voor problemen en uitdagingen.\n\n**Onze tips**\n\n* Maak innovatie in jouw organisatie onderdeel van de business planning\n* Verzeker je ervan dat het management innovatie activiteiten erkent, ondersteunt en promoot\n* Stel innovatiedoelstellingen op en maak duidelijk hoe ze de strategie van de organisatie ondersteunen\n* Gebruik feedback van jouw stakeholders bij het vaststellen van jouw innovatiedoelen\n* Maak jouw innovatiedoelen meetbaar met doelen, mijlpalen, tijdlijnen en een strategie om de doelen te halen\n* Communiceer de innovatiedoelen binnen alle lagen van jouw organisatie\n* Houd stakeholders op de hoogte van de voortgang van jouw innovatieactiviteiten\n* Maak managers persoonlijk verantwoordelijk en toerekenbaar, voor de voortgang van het\ninnovatieproces, -tools en -methoden (gezamenlijk het innovatiemanagementsysteem genoemd).\n       '
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Culture),
				_1: '\n#### Tips voor het aspect cultuur\n\nOndernemend en innovatief gedrag heeft een goede voedingsbodem nodig. Een cultuur waarin innoveren\nis toegestaan en wordt aangemoedigd.\n\n**Onze tips**\n\n* Stel een innovatiemanager aan, iemand die verantwoordelijk is voor de innovatieactiveiten in de organisatie\n* Stel een innovatieteam samen om de innovatieactiviteiten te organiseren\n* Weet wie je stakeholders zijn en leer hun (veranderende) behoefte en verwachtingen kennen\n* Stel een visie- en een missiestatement op voor de organisatie\n    '
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Processes),
					_1: '\n#### Tips voor het aspect processen\n\nEen innovatieproces is tevens een creatief proces. En een creatief proces kent geen vaste\nstappen die met zekerheid leiden naar succes. Een creatief proces is een ontdekkingstocht.\nMaar, de ontwikkeling van een product of dienst, het innovatieproces, kent wel degelijk\nterugkerende ingrediënten en een fasering. Het innovatieproces heeft een aanpak nodig.\nEen innovatiemanagementsysteem.\n\n**Onze tips**\n\n* Documenteer het innovatieproces voldoende en voor zover nodig en zorg voor een *audit trail* om de effectiviteit van het innovatieproces te kunnen meten\n* Organiseer een proces om innovatieprojecten te initiëren, te plannen, te selecteren en te beheersen terwijl deze door de ontdekkings-, ontwikkelings- en uitrolfase heen gaan\n* Verzorg de planning van ieder innovatieproject en biedt een innovatiemethode aan\n* Onderken de risico\'s verbonden aan innovatie en gebruik een methode om deze risico’s te spreiden cq. te minimaliseren\n    '
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Resources),
						_1: '\n#### Tips voor het aspect middelen\n\nEen innovatieproces heeft voeding nodig in de vorm van mensen en middelen. Je wilt op\neen gecontroleerde wijze het proces op het juiste moment de juiste voeding geven.\n\n**Onze tips**\n\n* Als je het nog niet hebt, zet een budgetteringsproces op waarin je regelmatig bepaalt\nwat de benodigde financiële resources zijn om de innovatieprocessen te ondersteunen.\n* Bewaak het innovatieproces en de projectuitgaven regelmatig\n* Stel een innovatiemanager aan die het centrum is van alle innovatieactiviteiten en die\nhet mandaat heeft om een innovatiemanagemensysteem te implementeren.\n* Organiseer een proces waarin medewerkers participeren in de innovatieactiviteiten. Het\nmedewerkerparticipatieprogramma groeit later uit tot een continue leerproces voor medewerkers.\n* Zorg voor een goede informatieverzameling ten behoeve van de ondersteuning van de innovatieactiviteiten\n\n    '
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$MeasureAndMonitor),
							_1: '\n#### Tips voor het aspect meten en monitoren\n\nMeten is weten. Dat geldt ook voor innovatieprocessen. Meten hoe je innovatieprojecten er\nvoor staan, stelt je in staat om op het juiste moment de juiste ondersteuning te bieden.\n\n**Onze tips**\n\n* Zet een proces in werking om regelmatig de innovatieactiviteiten in je organisatie\nte monitoren en meten gedurende de gehele levenscyclus van het innovatieproces.\n* Meet en bewaak individuele projecten én het gehele innovatie systeem\n* Meet zoveel als nodig is om in de gaten te houden of de innovatieactiviteiten de innovatiedoelstellingen halen\n* Communiceer en review de informatie die je meet\n* Review regelmatig de innovatieactiviteiten\n    '
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Improve),
								_1: '\n#### Tips voor het aspect verbeteren\n\nContinu leren en verbeteren is een belangrijk kenmerk van innoveren en dat geldt ook voor het\ninnovatieproces zelf. Blijf open staan voor vernieuwing en verbetering in het besef dat er nog\nveel te leren en te ontwikkelen valt.\n\n**Onze tips**\n\n* Zorg na een managementreview dat verbeteracties worden opgestart en implementeer, indien nodig, preventieve acties\n* Zorg dat verbeteringen bijdragen aan de organisatiecultuur, de innovatieactiviteiten en processen\n* Analyseer en gebruik de informatieverzameling om continue verbeteringen door te voeren\n* Documenteer en maak inzichtelijk waarom een innovatiemanagementsysteem, -tools en -methoden nodig zijn\nop alle niveau\'s in de organisatie.\n    '
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	});
var _user$project$InnoCheckModel$aspectSelectionList0 = A2(
	_user$project$SelectionList$fromList,
	_user$project$InnoCheckModel$Leadership,
	{
		ctor: '::',
		_0: _user$project$InnoCheckModel$Culture,
		_1: {
			ctor: '::',
			_0: _user$project$InnoCheckModel$Processes,
			_1: {
				ctor: '::',
				_0: _user$project$InnoCheckModel$Resources,
				_1: {
					ctor: '::',
					_0: _user$project$InnoCheckModel$MeasureAndMonitor,
					_1: {
						ctor: '::',
						_0: _user$project$InnoCheckModel$Improve,
						_1: {ctor: '[]'}
					}
				}
			}
		}
	});
var _user$project$InnoCheckModel$initialModel0 = function (flags) {
	return {
		ctor: '_Tuple2',
		_0: {questions: _user$project$InnoCheckModel$questions, questionAnswers: _user$project$InnoCheckModel$questionAnswersEmpty, person: _user$project$InnoCheckModel$person0, sendSuccess: false, sendErrorMessage: '', sendAttempted: false, isDirty: true, aspectSelectionList: _user$project$InnoCheckModel$aspectSelectionList0, splashScreenRead: false, actionTime: '', flags: flags},
		_1: _elm_lang$core$Platform_Cmd$none
	};
};
var _user$project$InnoCheckModel$No = {ctor: 'No'};
var _user$project$InnoCheckModel$Partly = {ctor: 'Partly'};
var _user$project$InnoCheckModel$Yes = {ctor: 'Yes'};
var _user$project$InnoCheckModel$questionAnswers0 = _elm_lang$core$Dict$fromList(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 1, _1: _user$project$InnoCheckModel$Yes},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 2, _1: _user$project$InnoCheckModel$Yes},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 3, _1: _user$project$InnoCheckModel$No},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 4, _1: _user$project$InnoCheckModel$Partly},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 5, _1: _user$project$InnoCheckModel$No},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 6, _1: _user$project$InnoCheckModel$Yes},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 7, _1: _user$project$InnoCheckModel$Yes},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 8, _1: _user$project$InnoCheckModel$No},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 9, _1: _user$project$InnoCheckModel$Partly},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 10, _1: _user$project$InnoCheckModel$Yes},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 11, _1: _user$project$InnoCheckModel$Partly},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 12, _1: _user$project$InnoCheckModel$Yes},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
var _user$project$InnoCheckModel$answerTextList = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Yes, _1: 'Ja'},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Partly, _1: 'Deels'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$No, _1: 'Nee'},
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$InnoCheckModel$answerScoreList = {
	ctor: '::',
	_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Yes, _1: 3},
	_1: {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Partly, _1: 1},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _user$project$InnoCheckModel$No, _1: 0},
			_1: {ctor: '[]'}
		}
	}
};

var _user$project$InnoCheckUpdate$update = F2(
	function (action, model) {
		var _p0 = action;
		switch (_p0.ctor) {
			case 'Noop':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _elm_lang$core$Platform_Cmd$none,
						_1: {ctor: '[]'}
					});
			case 'SplashRead':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{splashScreenRead: true}),
					{ctor: '[]'});
			case 'SelectAspect':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							aspectSelectionList: function () {
								var index = A2(
									_elm_lang$core$Maybe$withDefault,
									0,
									A2(
										_elm_lang$core$Dict$get,
										_elm_lang$core$Basics$toString(_p0._0),
										_elm_lang$core$Dict$fromList(
											_user$project$SelectionList$toList(
												A2(
													_user$project$SelectionList$indexedMap,
													F2(
														function (i, a) {
															return {
																ctor: '_Tuple2',
																_0: _elm_lang$core$Basics$toString(a),
																_1: i
															};
														}),
													model.aspectSelectionList)))));
								return A2(_user$project$SelectionList$goto, index, model.aspectSelectionList);
							}()
						}),
					{ctor: '[]'});
			case 'NextAspect':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							aspectSelectionList: _user$project$SelectionList$next(model.aspectSelectionList)
						}),
					{ctor: '[]'});
			case 'PrevAspect':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							aspectSelectionList: _user$project$SelectionList$previous(model.aspectSelectionList)
						}),
					{ctor: '[]'});
			case 'SelectAnswer':
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							questionAnswers: A3(_elm_lang$core$Dict$insert, _p0._0, _p0._1, model.questionAnswers),
							isDirty: true
						}),
					{ctor: '[]'});
			case 'EditEmailAddress':
				var prs = model.person;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							person: _elm_lang$core$Native_Utils.update(
								prs,
								{email: _p0._0}),
							isDirty: true
						}),
					{ctor: '[]'});
			case 'EditFirstName':
				var prs = model.person;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							person: _elm_lang$core$Native_Utils.update(
								prs,
								{firstname: _p0._0}),
							isDirty: true
						}),
					{ctor: '[]'});
			case 'EditLastName':
				var prs = model.person;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							person: _elm_lang$core$Native_Utils.update(
								prs,
								{lastname: _p0._0}),
							isDirty: true
						}),
					{ctor: '[]'});
			case 'EditCompanyName':
				var prs = model.person;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							person: _elm_lang$core$Native_Utils.update(
								prs,
								{companyname: _p0._0}),
							isDirty: true
						}),
					{ctor: '[]'});
			default:
				var prs = model.person;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							person: _elm_lang$core$Native_Utils.update(
								prs,
								{phonenumber: _p0._0}),
							isDirty: true
						}),
					{ctor: '[]'});
		}
	});
var _user$project$InnoCheckUpdate$EditPhoneNumber = function (a) {
	return {ctor: 'EditPhoneNumber', _0: a};
};
var _user$project$InnoCheckUpdate$EditCompanyName = function (a) {
	return {ctor: 'EditCompanyName', _0: a};
};
var _user$project$InnoCheckUpdate$EditLastName = function (a) {
	return {ctor: 'EditLastName', _0: a};
};
var _user$project$InnoCheckUpdate$EditFirstName = function (a) {
	return {ctor: 'EditFirstName', _0: a};
};
var _user$project$InnoCheckUpdate$EditEmailAddress = function (a) {
	return {ctor: 'EditEmailAddress', _0: a};
};
var _user$project$InnoCheckUpdate$SelectAnswer = F2(
	function (a, b) {
		return {ctor: 'SelectAnswer', _0: a, _1: b};
	});
var _user$project$InnoCheckUpdate$PrevAspect = {ctor: 'PrevAspect'};
var _user$project$InnoCheckUpdate$NextAspect = {ctor: 'NextAspect'};
var _user$project$InnoCheckUpdate$SelectAspect = function (a) {
	return {ctor: 'SelectAspect', _0: a};
};
var _user$project$InnoCheckUpdate$SplashRead = {ctor: 'SplashRead'};
var _user$project$InnoCheckUpdate$Noop = {ctor: 'Noop'};

var _user$project$InnoCheckUtil$getValue = F2(
	function (dict, key) {
		return A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(key),
			dict);
	});
var _user$project$InnoCheckUtil$unionToDict = function (list) {
	return _elm_lang$core$Dict$fromList(
		A2(
			_elm_lang$core$List$map,
			function (_p0) {
				var _p1 = _p0;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Basics$toString(_p1._0),
					_1: _p1._1
				};
			},
			list));
};
var _user$project$InnoCheckUtil$getAspectText = function (aspect) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(
			_user$project$InnoCheckUtil$getValue,
			_user$project$InnoCheckUtil$unionToDict(_user$project$InnoCheckModel$aspectList),
			aspect));
};
var _user$project$InnoCheckUtil$getAnswerText = function (answer) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(
			_user$project$InnoCheckUtil$getValue,
			_user$project$InnoCheckUtil$unionToDict(_user$project$InnoCheckModel$answerTextList),
			answer));
};
var _user$project$InnoCheckUtil$numberOfQuestionsAnswered = F2(
	function (questions, qanswers) {
		var qkeys = A2(
			_elm_lang$core$List$map,
			function (q) {
				return q.key;
			},
			questions);
		var filter = function (key) {
			return A2(_elm_lang$core$Dict$member, key, qanswers) ? _elm_lang$core$Maybe$Just(key) : _elm_lang$core$Maybe$Nothing;
		};
		return _elm_lang$core$List$length(
			A2(_elm_lang$core$List$filterMap, filter, qkeys));
	});
var _user$project$InnoCheckUtil$allQuestionsAnswered = F2(
	function (questions, qanswers) {
		return _elm_lang$core$Native_Utils.eq(
			A2(_user$project$InnoCheckUtil$numberOfQuestionsAnswered, questions, qanswers),
			_elm_lang$core$List$length(questions));
	});
var _user$project$InnoCheckUtil$meanScoreColor = F2(
	function (aqa, score) {
		return (((_elm_lang$core$Native_Utils.cmp(score, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(score, 30) < 1)) && aqa) ? _user$project$InnoCheckModel$answerColorRed : ((((_elm_lang$core$Native_Utils.cmp(score, 30) > 0) && (_elm_lang$core$Native_Utils.cmp(score, 60) < 0)) && aqa) ? _user$project$InnoCheckModel$answerColorOrange : ((((_elm_lang$core$Native_Utils.cmp(score, 60) > -1) && (_elm_lang$core$Native_Utils.cmp(score, 100) < 1)) && aqa) ? _user$project$InnoCheckModel$answerColorGreen : _user$project$InnoCheckModel$answerColorEmpty));
	});
var _user$project$InnoCheckUtil$sumOfScores = function (kscores) {
	return _elm_lang$core$List$sum(
		_elm_lang$core$Dict$values(
			_user$project$InnoCheckUtil$unionToDict(kscores)));
};
var _user$project$InnoCheckUtil$meanScore = function (kscores) {
	var topScore = A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(_user$project$InnoCheckModel$Yes),
			_user$project$InnoCheckUtil$unionToDict(_user$project$InnoCheckModel$answerScoreList)));
	var totalNumberOfScores = _elm_lang$core$List$length(kscores);
	return _elm_lang$core$Basics$round(
		(_elm_lang$core$Basics$toFloat(
			_user$project$InnoCheckUtil$sumOfScores(kscores)) / _elm_lang$core$Basics$toFloat(totalNumberOfScores * topScore)) * 100);
};
var _user$project$InnoCheckUtil$listQuestionAspectAnswerScore = F2(
	function (questions, kscores) {
		var getAnswerScore = function (q) {
			return {
				ctor: '_Tuple2',
				_0: q.aspect,
				_1: A2(
					_elm_lang$core$Maybe$withDefault,
					0,
					A2(_elm_lang$core$Dict$get, q.key, kscores))
			};
		};
		return A2(_elm_lang$core$List$map, getAnswerScore, questions);
	});
var _user$project$InnoCheckUtil$listQuestionKeyAnswerScore = F2(
	function (questions, kscores) {
		var getAnswerScore = function (q) {
			return {
				ctor: '_Tuple2',
				_0: q.key,
				_1: A2(
					_elm_lang$core$Maybe$withDefault,
					0,
					A2(_elm_lang$core$Dict$get, q.key, kscores))
			};
		};
		return A2(_elm_lang$core$List$map, getAnswerScore, questions);
	});
var _user$project$InnoCheckUtil$listAnswerScore = function (qas) {
	var getAnswerScore = F2(
		function (key, answer) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				0,
				A2(
					_elm_lang$core$Dict$get,
					_elm_lang$core$Basics$toString(answer),
					_user$project$InnoCheckUtil$unionToDict(_user$project$InnoCheckModel$answerScoreList)));
		});
	return A2(_elm_lang$core$Dict$map, getAnswerScore, qas);
};
var _user$project$InnoCheckUtil$listQuestionKeyAnswerColor = F2(
	function (questions, acolors) {
		var getAnswerColor = function (q) {
			return {
				ctor: '_Tuple2',
				_0: q.key,
				_1: A2(
					_elm_lang$core$Maybe$withDefault,
					_user$project$InnoCheckModel$answerColorEmpty,
					A2(_elm_lang$core$Dict$get, q.key, acolors))
			};
		};
		return A2(_elm_lang$core$List$map, getAnswerColor, questions);
	});
var _user$project$InnoCheckUtil$listAnswerColor = function (qas) {
	var getAnswerColor = F2(
		function (key, answer) {
			return A2(
				_elm_lang$core$Maybe$withDefault,
				_user$project$InnoCheckModel$answerColorEmpty,
				A2(
					_elm_lang$core$Dict$get,
					_elm_lang$core$Basics$toString(answer),
					_user$project$InnoCheckModel$answerColorList));
		});
	return A2(_elm_lang$core$Dict$map, getAnswerColor, qas);
};
var _user$project$InnoCheckUtil$aspectQuestions = F2(
	function (questions, aspect) {
		return A2(
			_elm_lang$core$List$filter,
			function (q) {
				return _elm_lang$core$Native_Utils.eq(q.aspect, aspect);
			},
			questions);
	});
var _user$project$InnoCheckUtil$meanScorePerAspect = function (model) {
	var aspectList = _user$project$SelectionList$toList(_user$project$InnoCheckModel$aspectSelectionList0);
	var answerScores = function (aspect) {
		return A2(
			_user$project$InnoCheckUtil$listQuestionKeyAnswerScore,
			A2(_user$project$InnoCheckUtil$aspectQuestions, model.questions, aspect),
			_user$project$InnoCheckUtil$listAnswerScore(model.questionAnswers));
	};
	var meanOfAnswers = function (aspect) {
		return _user$project$InnoCheckUtil$meanScore(
			answerScores(aspect));
	};
	return A2(
		_elm_lang$core$List$map,
		function (aspect) {
			return {
				ctor: '_Tuple2',
				_0: aspect,
				_1: meanOfAnswers(aspect)
			};
		},
		aspectList);
};
var _user$project$InnoCheckUtil$aspectForTip = function (model) {
	var aspectScores = _user$project$InnoCheckUtil$meanScorePerAspect(model);
	var scoreOrange = A2(
		_elm_lang$core$List$filter,
		function (_p2) {
			var _p3 = _p2;
			var _p4 = _p3._1;
			return (_elm_lang$core$Native_Utils.cmp(_p4, 30) > 0) && (_elm_lang$core$Native_Utils.cmp(_p4, 60) < 0);
		},
		aspectScores);
	var scoreRed = A2(
		_elm_lang$core$List$filter,
		function (_p5) {
			var _p6 = _p5;
			var _p7 = _p6._1;
			return (_elm_lang$core$Native_Utils.cmp(_p7, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p7, 30) < 1);
		},
		aspectScores);
	return (_elm_lang$core$Native_Utils.cmp(
		_elm_lang$core$List$length(scoreRed),
		0) > 0) ? _elm_lang$core$List$head(scoreRed) : ((_elm_lang$core$Native_Utils.cmp(
		_elm_lang$core$List$length(scoreOrange),
		0) > 0) ? _elm_lang$core$List$head(scoreOrange) : _elm_lang$core$Maybe$Nothing);
};

var _user$project$InnoCheckViewUtil$iconUrl = function (selectedAspect) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'images/icon_',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$String$toLower(
				_elm_lang$core$Basics$toString(selectedAspect)),
			'.png'));
};
var _user$project$InnoCheckViewUtil$imgUrl = F2(
	function (baseUrl, imgUrl) {
		return A2(_elm_lang$core$Basics_ops['++'], baseUrl, imgUrl);
	});
var _user$project$InnoCheckViewUtil$iconImg = F2(
	function (baseUrl, aspect) {
		return A2(
			_elm_lang$html$Html$img,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$src(
					A2(
						_user$project$InnoCheckViewUtil$imgUrl,
						baseUrl,
						_user$project$InnoCheckViewUtil$iconUrl(aspect))),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$width(40),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$height(40),
						_1: {ctor: '[]'}
					}
				}
			},
			{ctor: '[]'});
	});
var _user$project$InnoCheckViewUtil$clickable = _elm_lang$html$Html_Attributes$style(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'cursor', _1: 'pointer'},
		_1: {ctor: '[]'}
	});

var _user$project$InnoCheckViewSvg$showIcon = F3(
	function (model, aspect, _p0) {
		var _p1 = _p0;
		var _p2 = _p1._2;
		return A2(
			_canadaduane$typed_svg$TypedSvg$image,
			{
				ctor: '::',
				_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x(_p1._0),
				_1: {
					ctor: '::',
					_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y(_p1._1),
					_1: {
						ctor: '::',
						_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$width(_p2),
						_1: {
							ctor: '::',
							_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$height(_p2),
							_1: {
								ctor: '::',
								_0: _canadaduane$typed_svg$TypedSvg_Attributes$xlinkHref(
									A2(
										_user$project$InnoCheckViewUtil$imgUrl,
										model.flags.baseUrl,
										_user$project$InnoCheckViewUtil$iconUrl(aspect))),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			},
			{ctor: '[]'});
	});
var _user$project$InnoCheckViewSvg$showColorBlock = F4(
	function (model, aspect, _p4, _p3) {
		var _p5 = _p4;
		var _p6 = _p3;
		var aqa = A2(
			_user$project$InnoCheckUtil$allQuestionsAnswered,
			A2(_user$project$InnoCheckUtil$aspectQuestions, model.questions, aspect),
			model.questionAnswers);
		var answerScores = A2(
			_user$project$InnoCheckUtil$listQuestionKeyAnswerScore,
			A2(_user$project$InnoCheckUtil$aspectQuestions, model.questions, aspect),
			_user$project$InnoCheckUtil$listAnswerScore(model.questionAnswers));
		var meanOfAnswers = _user$project$InnoCheckUtil$meanScore(answerScores);
		var aspectScoreColor = A2(_user$project$InnoCheckUtil$meanScoreColor, aqa, meanOfAnswers);
		return A2(
			_canadaduane$typed_svg$TypedSvg$svg,
			{
				ctor: '::',
				_0: _user$project$InnoCheckViewUtil$clickable,
				_1: {
					ctor: '::',
					_0: _canadaduane$typed_svg$TypedSvg_Events$onClick(
						_user$project$InnoCheckUpdate$SelectAspect(aspect)),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: A2(
					_canadaduane$typed_svg$TypedSvg$rect,
					{
						ctor: '::',
						_0: _canadaduane$typed_svg$TypedSvg_Attributes$fill(aspectScoreColor),
						_1: {
							ctor: '::',
							_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x(_p5._0),
							_1: {
								ctor: '::',
								_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y(_p5._1),
								_1: {
									ctor: '::',
									_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$width(_p5._2),
									_1: {
										ctor: '::',
										_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$height(_p5._3),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A3(
						_user$project$InnoCheckViewSvg$showIcon,
						model,
						aspect,
						{ctor: '_Tuple3', _0: _p6._0, _1: _p6._1, _2: _p6._2}),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$InnoCheckViewSvg$showCanvas = function (model) {
	var yIcon = F3(
		function (yCanvas, canvasHeight, iconSize) {
			return yCanvas + ((canvasHeight - iconSize) / 2);
		});
	var xIcon = F3(
		function (xCanvas, canvasWidth, iconSize) {
			return xCanvas + ((canvasWidth - iconSize) / 2);
		});
	var margin = 5;
	var canvasScalingFactor = 1;
	var canvasWidth = canvasScalingFactor * 400;
	var blockNarrowWidth = (canvasWidth - (4 * margin)) / 4;
	var blockWideWidth = 2 * blockNarrowWidth;
	var iconSize = blockNarrowWidth * 0.8;
	var canvasHeight = canvasScalingFactor * 282;
	var blockHeight = (canvasHeight - (3 * margin)) / 2;
	return A2(
		_canadaduane$typed_svg$TypedSvg$svg,
		{
			ctor: '::',
			_0: A4(_canadaduane$typed_svg$TypedSvg_Attributes$viewBox, 0, 0, canvasWidth, canvasHeight),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_canadaduane$typed_svg$TypedSvg$rect,
				{
					ctor: '::',
					_0: _canadaduane$typed_svg$TypedSvg_Attributes$fill(
						A4(_elm_lang$core$Color$rgba, 221, 221, 221, 1)),
					_1: {
						ctor: '::',
						_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$x(0),
						_1: {
							ctor: '::',
							_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$y(0),
							_1: {
								ctor: '::',
								_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$width(canvasWidth),
								_1: {
									ctor: '::',
									_0: _canadaduane$typed_svg$TypedSvg_Attributes_InPx$height(canvasHeight),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A4(
					_user$project$InnoCheckViewSvg$showColorBlock,
					model,
					_user$project$InnoCheckModel$Leadership,
					{ctor: '_Tuple4', _0: margin, _1: margin, _2: blockNarrowWidth, _3: blockHeight},
					{
						ctor: '_Tuple3',
						_0: A3(xIcon, margin, blockNarrowWidth, iconSize),
						_1: A3(yIcon, margin, blockHeight, iconSize),
						_2: iconSize
					}),
				_1: {
					ctor: '::',
					_0: A4(
						_user$project$InnoCheckViewSvg$showColorBlock,
						model,
						_user$project$InnoCheckModel$Processes,
						{ctor: '_Tuple4', _0: blockNarrowWidth + (2 * margin), _1: margin, _2: blockWideWidth, _3: blockHeight},
						{
							ctor: '_Tuple3',
							_0: A3(xIcon, blockNarrowWidth + (2 * margin), blockWideWidth, iconSize),
							_1: A3(yIcon, margin, blockHeight, iconSize),
							_2: iconSize
						}),
					_1: {
						ctor: '::',
						_0: A4(
							_user$project$InnoCheckViewSvg$showColorBlock,
							model,
							_user$project$InnoCheckModel$MeasureAndMonitor,
							{ctor: '_Tuple4', _0: (blockNarrowWidth + blockWideWidth) + (3 * margin), _1: margin, _2: blockNarrowWidth, _3: blockHeight},
							{
								ctor: '_Tuple3',
								_0: A3(xIcon, (blockNarrowWidth + blockWideWidth) + (3 * margin), blockNarrowWidth, iconSize),
								_1: A3(yIcon, margin, blockHeight, iconSize),
								_2: iconSize
							}),
						_1: {
							ctor: '::',
							_0: A4(
								_user$project$InnoCheckViewSvg$showColorBlock,
								model,
								_user$project$InnoCheckModel$Culture,
								{ctor: '_Tuple4', _0: margin, _1: blockHeight + (2 * margin), _2: blockNarrowWidth, _3: blockHeight},
								{
									ctor: '_Tuple3',
									_0: A3(xIcon, margin, blockNarrowWidth, iconSize),
									_1: A3(yIcon, blockHeight + (2 * margin), blockHeight, iconSize),
									_2: iconSize
								}),
							_1: {
								ctor: '::',
								_0: A4(
									_user$project$InnoCheckViewSvg$showColorBlock,
									model,
									_user$project$InnoCheckModel$Resources,
									{ctor: '_Tuple4', _0: blockNarrowWidth + (2 * margin), _1: blockHeight + (2 * margin), _2: blockWideWidth, _3: blockHeight},
									{
										ctor: '_Tuple3',
										_0: A3(xIcon, blockNarrowWidth + (2 * margin), blockWideWidth, iconSize),
										_1: A3(yIcon, blockHeight + (2 * margin), blockHeight, iconSize),
										_2: iconSize
									}),
								_1: {
									ctor: '::',
									_0: A4(
										_user$project$InnoCheckViewSvg$showColorBlock,
										model,
										_user$project$InnoCheckModel$Improve,
										{ctor: '_Tuple4', _0: (blockNarrowWidth + blockWideWidth) + (3 * margin), _1: blockHeight + (2 * margin), _2: blockNarrowWidth, _3: blockHeight},
										{
											ctor: '_Tuple3',
											_0: A3(xIcon, (blockNarrowWidth + blockWideWidth) + (3 * margin), blockNarrowWidth, iconSize),
											_1: A3(yIcon, blockHeight + (2 * margin), blockHeight, iconSize),
											_2: iconSize
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		});
};

var _user$project$InnoCheckView$buttonComp = F2(
	function (action, buttonText) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('button-block sqs-block-button'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('btn btn-primary sqs-block-button-element--medium sqs-block-button-element'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(action),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$disabled(false),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(buttonText),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	});
var _user$project$InnoCheckView$portMessageComp = function (model) {
	var msgComp = function (msg) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('portmessage'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$p,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(msg),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			});
	};
	return ((!model.isDirty) && (model.sendAttempted && model.sendSuccess)) ? msgComp('De gegevens van jouw quickscan zijn opgeslagen.') : ((model.sendAttempted && (!model.sendSuccess)) ? msgComp(
		A2(_elm_lang$core$Basics_ops['++'], 'Oh, oh... er is iets mis gegaan. Je data is niet opgeslagen. De technische foutmelding is: ', model.sendErrorMessage)) : _elm_lang$html$Html$text(''));
};
var _user$project$InnoCheckView$aspectTipComp = function (model) {
	var aspect = _elm_lang$core$Tuple$first(
		A2(
			_elm_lang$core$Maybe$withDefault,
			{ctor: '_Tuple2', _0: _user$project$InnoCheckModel$Leadership, _1: 0},
			_user$project$InnoCheckUtil$aspectForTip(model)));
	var msg = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(
			_elm_lang$core$Dict$get,
			_elm_lang$core$Basics$toString(aspect),
			_user$project$InnoCheckModel$aspectTips));
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('well'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _user$project$InnoCheckViewUtil$clickable,
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Events$onClick(
							_user$project$InnoCheckUpdate$SelectAspect(aspect)),
						_1: {ctor: '[]'}
					}
				},
				{
					ctor: '::',
					_0: A2(_user$project$InnoCheckViewUtil$iconImg, model.flags.baseUrl, aspect),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_evancz$elm_markdown$Markdown$toHtml,
					{ctor: '[]'},
					msg),
				_1: {ctor: '[]'}
			}
		});
};
var _user$project$InnoCheckView$moreInfoTopParagraph = A2(
	_evancz$elm_markdown$Markdown$toHtml,
	{ctor: '[]'},
	'\n### Direct aan de slag?\n\nLaat hier je gegevens achter, dan neemt één van onze DOON\ninnovatieversnellers contact met je op voor een vrijblijvend\nadviesgesprek.\n');
var _user$project$InnoCheckView$recommendationsTopParagraph = A2(
	_evancz$elm_markdown$Markdown$toHtml,
	{ctor: '[]'},
	'\n### Advies\n\nOp basis van je antwoorden adviseren we je om allereerst aandacht te schenken aan het volgende aspect.\n');
var _user$project$InnoCheckView$showRecommendations = function (model) {
	return A2(_user$project$InnoCheckUtil$allQuestionsAnswered, model.questions, model.questionAnswers) ? A2(
		_elm_lang$html$Html$section,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('row sqs-row recommendations'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: _user$project$InnoCheckView$recommendationsTopParagraph,
			_1: {
				ctor: '::',
				_0: _user$project$InnoCheckView$aspectTipComp(model),
				_1: {ctor: '[]'}
			}
		}) : A2(
		_elm_lang$html$Html$span,
		{ctor: '[]'},
		{ctor: '[]'});
};
var _user$project$InnoCheckView$showInputRadios = F3(
	function (storedAnswer, key, answerTextlist) {
		var checkAnswer = F2(
			function (answer, storedAnswer) {
				var _p0 = storedAnswer;
				if (_p0.ctor === 'Nothing') {
					return false;
				} else {
					return _elm_lang$core$Native_Utils.eq(answer, _p0._0);
				}
			});
		var radios = function (_p1) {
			var _p2 = _p1;
			var _p4 = _p2._1;
			var _p3 = _p2._0;
			return A2(
				_elm_lang$html$Html$label,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$input,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$name(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'qa_',
										_elm_lang$core$Basics$toString(key))),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$value(_p4),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html_Events$on,
											'change',
											_elm_lang$core$Json_Decode$succeed(
												A2(_user$project$InnoCheckUpdate$SelectAnswer, key, _p3))),
										_1: {
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$checked(
												A2(checkAnswer, _p3, storedAnswer)),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						},
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html$text(_p4),
						_1: {ctor: '[]'}
					}
				});
		};
		return A2(_elm_lang$core$List$map, radios, answerTextlist);
	});
var _user$project$InnoCheckView$showQuestions = F3(
	function (model, questions, answerTextlist) {
		var liList = function (q) {
			return A2(
				_elm_lang$html$Html$li,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text(q.text),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$form,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('inputradios'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{ctor: '[]'},
									A3(
										_user$project$InnoCheckView$showInputRadios,
										A2(_elm_lang$core$Dict$get, q.key, model.questionAnswers),
										q.key,
										answerTextlist)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				});
		};
		return A2(_elm_lang$core$List$map, liList, questions);
	});
var _user$project$InnoCheckView$showAspectButtons = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('aspect-questions-buttons button-block sqs-block-button'),
			_1: {ctor: '[]'}
		},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$button,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$type_('button'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('btn btn-primary sqs-block-button-element--small sqs-block-button-element'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$disabled(
								_elm_lang$core$Native_Utils.eq(
									_elm_lang$core$List$length(model.aspectSelectionList.previous),
									0)),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Events$onClick(_user$project$InnoCheckUpdate$PrevAspect),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('« Vorige'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html$text(' '),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$button,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$type_('button'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('btn btn-primary sqs-block-button-element--small sqs-block-button-element'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$disabled(
										_elm_lang$core$Native_Utils.eq(
											_elm_lang$core$List$length(model.aspectSelectionList.next),
											0) || (!A2(
											_user$project$InnoCheckUtil$allQuestionsAnswered,
											A2(_user$project$InnoCheckUtil$aspectQuestions, model.questions, model.aspectSelectionList.selected),
											model.questionAnswers))),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Events$onClick(_user$project$InnoCheckUpdate$NextAspect),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('Volgende »'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$InnoCheckView$questionBlockTopParagraph = A2(
	_evancz$elm_markdown$Markdown$toHtml,
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$class('row sqs-row title'),
		_1: {ctor: '[]'}
	},
	'\n# Innovation Readiness Quickscan\n\nBeantwoord voor elk van de zes aspecten de vragen.\n');
var _user$project$InnoCheckView$showQuestionBlock = function (model) {
	return {
		ctor: '::',
		_0: _user$project$InnoCheckView$questionBlockTopParagraph,
		_1: {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$section,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('row sqs-row aspect-questions-block'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('aspect-questions-block'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$h3,
								{ctor: '[]'},
								{
									ctor: '::',
									_0: _elm_lang$html$Html$text(
										_user$project$InnoCheckUtil$getAspectText(model.aspectSelectionList.selected)),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(_user$project$InnoCheckViewUtil$iconImg, model.flags.baseUrl, model.aspectSelectionList.selected),
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('row aspect-questions-block'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$div,
									{
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$class('questions col-sm-6 col sqs-col-6 span-6'),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$ul,
											{ctor: '[]'},
											A3(
												_user$project$InnoCheckView$showQuestions,
												model,
												A2(_user$project$InnoCheckUtil$aspectQuestions, model.questions, model.aspectSelectionList.selected),
												_user$project$InnoCheckModel$answerTextList)),
										_1: {
											ctor: '::',
											_0: _user$project$InnoCheckView$showAspectButtons(model),
											_1: {ctor: '[]'}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$div,
										{
											ctor: '::',
											_0: _elm_lang$html$Html_Attributes$class('canvas col-sm-6 col sqs-col-6 span-6'),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _user$project$InnoCheckViewSvg$showCanvas(model),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _user$project$InnoCheckView$showRecommendations(model),
				_1: {ctor: '[]'}
			}
		}
	};
};
var _user$project$InnoCheckView$splashParagraph = A2(
	_evancz$elm_markdown$Markdown$toHtml,
	{ctor: '[]'},
	'\n# Innovation Readiness Quickscan\n\nDeze scan geeft inzicht in de cruciale randvoorwaarden om succesvol nieuwe\nproducten en diensten te kunnen ontwerpen en lanceren. De randvoorwaarden worden gescoord op\n6 aspecten:\n* leiderschap\n* cultuur\n* processen\n* middelen\n* meten\n* verbeteren\n\nDe score bepaalt waar jouw organisatie kan verbeteren. Op basis hiervan geven\nwij je praktische tips over hoe je als organisatie je innovatievermogen kunt\nverbeteren.\n\nDe scan is ontwikkeld door DOON i.s.m. PDMA/TIM Foundation en is gebaseerd op de\nuitgebreide internationaal geaccrediteerde Innovation Management Standard.\nDe resultaten geven een eerste indruk van de innovatiecapaciteit\nvan de organisatie.\n');
var _user$project$InnoCheckView$showSplashScreen = function (model) {
	return _elm_lang$core$Native_Utils.eq(model.splashScreenRead, false) ? {
		ctor: '::',
		_0: A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('row splash sqs-row'),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$section,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('col col-sm-6 splashtext sqs-col-6 span-6'),
						_1: {ctor: '[]'}
					},
					{
						ctor: '::',
						_0: _user$project$InnoCheckView$splashParagraph,
						_1: {
							ctor: '::',
							_0: A2(_user$project$InnoCheckView$buttonComp, _user$project$InnoCheckUpdate$SplashRead, 'Start de Quickscan »'),
							_1: {ctor: '[]'}
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('col col-sm-6 splashimage sqs-col-6 span-6'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$img,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$src(
										A2(_user$project$InnoCheckViewUtil$imgUrl, model.flags.baseUrl, 'images/card_irc.png')),
									_1: {
										ctor: '::',
										_0: _elm_lang$html$Html_Attributes$width(400),
										_1: {ctor: '[]'}
									}
								},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}
			}),
		_1: {ctor: '[]'}
	} : _user$project$InnoCheckView$showQuestionBlock(model);
};
var _user$project$InnoCheckView$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('container'),
			_1: {ctor: '[]'}
		},
		_user$project$InnoCheckView$showSplashScreen(model));
};

var _user$project$Main$main = _elm_lang$html$Html$programWithFlags(
	{
		init: _user$project$InnoCheckModel$initialModel0,
		view: _user$project$InnoCheckView$view,
		update: _user$project$InnoCheckUpdate$update,
		subscriptions: function (_p0) {
			return _elm_lang$core$Platform_Sub$none;
		}
	})(
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (baseUrl) {
			return _elm_lang$core$Json_Decode$succeed(
				{baseUrl: baseUrl});
		},
		A2(_elm_lang$core$Json_Decode$field, 'baseUrl', _elm_lang$core$Json_Decode$string)));

var Elm = {};
Elm['Main'] = Elm['Main'] || {};
if (typeof _user$project$Main$main !== 'undefined') {
    _user$project$Main$main(Elm['Main'], 'Main', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

