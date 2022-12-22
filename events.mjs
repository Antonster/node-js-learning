import { EventEmitter } from "node:events";

const myEmitter = new EventEmitter();

const logDbConnection = () => {
	console.log("DB Connected");
};

myEmitter.addListener("connected", logDbConnection);
myEmitter.emit("connected");

myEmitter.removeListener("connected", logDbConnection);
myEmitter.emit("connected");

myEmitter.on("msg", (data) => {
	console.log(`Message: ${data}`);
});

myEmitter.emit("msg", "test");

myEmitter.once("test", () => {
	console.log("Вызовется 1 раз");
});
myEmitter.emit("test");
myEmitter.emit("test");

console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount("msg"));
console.log(myEmitter.listeners("msg"));
console.log(myEmitter.eventNames());

myEmitter.setMaxListeners(1);
console.log(myEmitter.getMaxListeners());

myEmitter.once("newListener", (event, listener) => {
	console.log(`Добавился ${event} ${listener}`);
});

myEmitter.prependListener("msg", () => {
	console.log("prepends");
});
// myEmitter.prependOnceListener('msg', () => {
// 	console.log('prepends');
// });
myEmitter.emit("msg", "2е сообщение");

myEmitter.on("error", (err) => {
	console.log(`Ошибка: ${err.message}`);
});
myEmitter.emit("error", new Error("BOOOM!"));

const target = new EventTarget();

const logNode = () => {
	console.log("Connected NodeTarget");
};

target.addEventListener("connection_node", logNode);
target.dispatchEvent(new Event("connection_node"));
