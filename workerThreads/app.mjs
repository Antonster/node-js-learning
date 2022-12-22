import factorial from "./factorial.mjs";

const compute = (array) => {
	const arr = [];

	for (let index = 0; index < 100000000; index++) {
		arr.push(index * index);
	}

	return array.map((elem) => factorial(elem));
};

const main = () => {
	performance.mark("start");

	const result = [
		compute([25, 20, 19, 48, 30, 50]),
		compute([25, 20, 19, 48, 30, 50]),
		compute([25, 20, 19, 48, 30, 50]),
		compute([25, 20, 19, 48, 30, 50]),
	];

	console.log(result);

	performance.mark("end");
	performance.measure("main", "start", "end");

	console.log(performance.getEntriesByName("main").pop());
};

setTimeout(() => {
	console.log("Timeout");
}, 2000);

main();
