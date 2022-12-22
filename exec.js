const { exec } = require("child_process");

const childProcess = exec("ls", (err, stdout, stderr) => {
	if (err) {
		console.error(err);
	}

	console.log(`stdout: ${stdout}`);
	console.log(`stderr: ${stderr}`);
});

childProcess.on("exit", (code) => {
	console.log(`Exit code: ${code}`);
});
