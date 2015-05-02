var worker = new Worker('./worker.js');

console.log('hey there');
console.log(worker);

worker.onmessage = function(ev) {
	console.log('message from the worker I guess?', ev);
};

worker.postMessage('tell me something');


document.body.appendChild(document.createTextNode('created on the fly'));


