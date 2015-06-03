var perf = window.performance;
var channel = new BroadcastChannel('mychannel');

channel.onmessage = e => {
  switch (e.data) {
    case 'connect':
      performance.mark('message (BC)');
      performance.measure('domLoading -> message (BC)', 'domLoading', 'message (BC)');
      done();
    break;
  }
};

addEventListener('message', e => {
  switch (e.data) {
    case 'connect':
      performance.mark('message (PM)');
      performance.measure('domLoading -> message (PM)', 'domLoading', 'message (PM)');
    break;
  }
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

function clearStorage() {
  localStorage.clear();
}