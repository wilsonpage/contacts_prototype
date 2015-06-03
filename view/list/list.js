/*jshint esnext:true*/

var win = window.parent;
var perf = win.performance;
var console = win.console;

var channel = new BroadcastChannel('mychannel');

perf.mark('view-script');
perf.measure('domLoading -> view-script', 'domLoading', 'view-script');

channel.onmessage = e => {
  switch (e.data) {
    case 'serviceready':
      perf.mark('got-ready');
      perf.measure('domLoading -> got-ready', 'domLoading', 'got-ready');
      channel.postMessage('ping');
    break;
    case 'pong':
      perf.mark('got-pong');
      perf.measure('domLoading -> got-pong', 'domLoading', 'got-pong');
      done();
    break;
  }
};

channel.postMessage('connect');

function done() {
  perf.getEntriesByType('measure').forEach(entry => {
    var name = entry.name;
    var previous = Number(localStorage[name + ':total'] || 0);
    var count = Number(localStorage[name + ':count'] || 0) + 1;
    var total = previous += entry.duration;
    var mean = total / count;

    localStorage[name + ':total'] = total;
    localStorage[name + ':count'] = count;

    console.log('"' + name + '": ', mean + 'ms (mean)');
  });
}

onload = function() {
  perf.mark('view-onload');
  perf.measure('domLoading -> view-onload', 'domLoading', 'view-onload');
};

//
// var client = threads.client('contacts-service');


// perf.measure('list view init', 'domLoading', 'list-view ready');

// function renderContacts(renderCB, onRenderedCB) {

// perf.mark('get-contact');
// console.time('get contact');

// client.method('get').then(contact => {
//   perf.mark('get-contact-response');
//   perf.measure('get contact (request)', 'get-contact', 'get-contact-request');
//   perf.measure('get contact (response)', 'get-contact-request', 'get-contact-response');
//   console.timeEnd('get contact');
//   document.body.textContent = contact.givenName[0];
// });

// client.connected.then(() => {
//   perf.mark('connect end');
//   perf.measure('connect', 'connect start', 'connect end');
// });

