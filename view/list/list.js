/*jshint esnext:true*/

var win = window.parent;
var perf = win.performance;
var console = win.console;

perf.mark('view-script');
perf.measure('domLoading -> view-script', 'domLoading', 'view-script');

var client = threads.client('contacts-service');

client.method('ping').then(contact => {
  perf.mark('got-pong');
  perf.measure('domLoading -> got-pong', 'domLoading', 'got-pong');
  done();
});

client.connected.then(() => {
  perf.mark('got-ready');
  perf.measure('domLoading -> got-ready', 'domLoading', 'got-ready');
});

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
