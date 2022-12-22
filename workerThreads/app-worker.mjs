import { Worker } from "worker_threads";

const compute = (array) => {
	return new Promise((resolve, reject) => {
		const worker = new Worker("./workerThreads/worker.mjs", {
			workerData: {
				array,
			},
		});

		worker.on("message", (msg) => {
			console.log(worker.threadId);
			resolve(msg);
		});

		worker.on("error", (err) => {
			reject(err);
		});

		worker.on("exit", () => {
			console.log("complete");
		});
	});
};

const main = async () => {
	try {
		performance.mark("start");

		const result = await Promise.all([
			compute([25, 20, 19, 48, 30, 50]),
			compute([25, 20, 19, 48, 30, 50]),
			compute([25, 20, 19, 48, 30, 50]),
			compute([25, 20, 19, 48, 30, 50]),
		]);

		console.log(result);

		performance.mark("end");
		performance.measure("main", "start", "end");

		console.log(performance.getEntriesByName("main").pop());
	} catch (err) {
		console.log(err.message);
	}
};

setTimeout(() => {
	console.log("Timeout");
}, 2000);

main();
