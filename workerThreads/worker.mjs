import { parentPort, workerData } from "worker_threads";
import factorial from "./factorial.mjs";

const compute = ({ array }) => {
	const arr = [];

	for (let index = 0; index < 100000000; index++) {
		arr.push(index * index);
	}

	return array.map((elem) => factorial(elem));
};

parentPort.postMessage(compute(workerData));
