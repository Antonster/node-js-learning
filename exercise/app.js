const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
	items.getEntries().forEach((entry) => {
		console.log(`${entry.name}: ${entry.duration}`);
	});
});

performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = (array) => {
	return new Promise((resolve, reject) => {
		performance.mark("worker start");

		const worker = new Worker("./exercise/worker.js", {
			workerData: {
				array,
			},
		});

		worker.on("message", (msg) => {
			performance.mark("worker end");
			performance.measure("worker", "worker start", "worker end");

			resolve(msg);
		});
	});
};

const forkFunction = (array) => {
	return new Promise((resolve, reject) => {
		performance.mark("fork start");

		const forkProcess = fork("./exercise/fork.js");

		forkProcess.send({ array });

		forkProcess.on("message", (msg) => {
			performance.mark("fork end");
			performance.measure("fork", "fork start", "fork end");
			resolve(msg);
		});
	});
};

const main = async () => {
	try {
		await workerFunction([25, 20, 19, 48, 30, 50]);
		await forkFunction([25, 20, 19, 48, 30, 50]);
	} catch (e) {
		console.error(e.message);
	}
};

main();
