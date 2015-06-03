var channel = new BroadcastChannel('mychannel');
channel.postMessage('connect');
window.parent.postMessage('connect', '*');

// var end = Date.now() + 100;
// while (Date.now() < end);