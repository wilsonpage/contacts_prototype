
var win = window.parent;
var console = win.console;
var perf = win.performance;

var channel = new BroadcastChannel('mychannel');

perf.mark('service-script');
perf.measure('domLoading -> service-script', 'domLoading', 'service-script');

channel.onmessage = e => {
  switch (e.data) {
    case 'ping':
      perf.mark('got ping');
      channel.postMessage('pong');
    break;
  }
};

channel.postMessage('serviceready');

onload = function() {
  perf.mark('service-onload');
  perf.measure('domLoading -> service-onload', 'domLoading', 'service-onload');
};

// threads.service('contacts-service')
//   .method('get', function(uuid) {
//     console.timeEnd('get contact');
//     perf.mark('get-contact-request');
//     return { givenName: ['Wilson', 'Page'] };
//   });