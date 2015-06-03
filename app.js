performance.mark('first script exec');

// window.console.time('first iframe');
// window.console.time('onload');

performance.measure('domLoading -> first script', 'domLoading', 'first script exec');

addEventListener('message', e => {
  switch (e.data) {
    case 'frame1':
      performance.mark('frame1 message');
      performance.measure('domLoading -> frame1 message', 'domLoading', 'frame1 message');
      var iframe = document.createElement('iframe');
      iframe.src = 'services/contacts.html';
      iframe.hidden = true;
      document.body.appendChild(iframe);
    break;
    case 'frame2':
      performance.mark('frame2 message');
      performance.measure('domLoading -> frame2 message', 'domLoading', 'frame2 message');
      done();
    break;
  }
});

function done() {
  performance.getEntriesByType('measure').forEach(entry => {
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
