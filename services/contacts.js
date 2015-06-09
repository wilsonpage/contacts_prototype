
var win = window.parent;
var console = win.console;
var perf = win.performance;

perf.mark('service-script');
perf.measure('domLoading -> service-script', 'domLoading', 'service-script');
console.timeStamp('service-script');

onload = function() {
  perf.mark('service-onload');
  perf.measure('domLoading -> service-onload', 'domLoading', 'service-onload');
  console.timeStamp('service-onload');
};

threads.service('contacts-service')
  .method('ping', function(uuid) {
    perf.mark('got ping');
    console.timeStamp('service-got-ping');
  });
