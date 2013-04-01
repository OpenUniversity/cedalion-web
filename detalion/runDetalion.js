var DI = require('../cedalionWeb/node-util').DI;
var fs = require('fs');

var app = new DI("app");

app.readStream(fs.createReadStream(__dirname + "/detalion.js"), "detalion");
app.readStream(fs.createReadStream(__dirname + "/detalion.jsonp"), "program");

app.on(["detalion", "program"], function() {
	eval(app.detalion);
	var program = new ProgramDatabase();
	function detalionStatement(s) {
		program.store(s);
	}
	eval(app.program);
	var det = new Interpreter(program);
	createBuiltins(det);

	var Y = det.heapAllocate();
	if(!det.call(['test#fib', 20, Y])) {
		console.error('fib failed');
	}
	console.log('fib emitted ' + JSON.stringify(det.deref(Y)));
});
