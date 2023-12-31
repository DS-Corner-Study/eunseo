const {
    Worker, isMainThread, parentPort,
  } = require('worker_threads');
  
  if (isMainThread) { 
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker 종료'));
    worker.postMessage('hello');
  } else { 
    parentPort.on('message', (value) => {
      console.log('from parent', value);
      parentPort.postMessage('I love you');
      parentPort.close();
    });
}