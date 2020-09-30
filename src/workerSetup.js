//TODO: find better way to create workers with create-react-app
export default class WebWorker {
    constructor(worker) {
        const code = worker.toString();
        const blob = new Blob(["(" + code + ")()"]);
        return new Worker(URL.createObjectURL(blob));
    }
}