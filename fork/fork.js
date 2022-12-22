process.on("message", (msg) => {
	if (msg === "disconnect") {
		process.disconnect();
	}

	console.log(`Client got the message: ${msg}`);
	process.send("Pong!");
});
