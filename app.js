performance.mark('app-script');
performance.measure('domLoading -> app-script', 'domLoading', 'app-script');

var channel = new BroadcastChannel('mychannel');

channel.onmessage = e => {
  switch (e.data) {
    case 'connect':
      performance.mark('got-connect');
      performance.measure('domLoading -> got-connect', 'domLoading', 'got-connect');
      var iframe = document.createElement('iframe');
      iframe.src = 'services/contacts.html';
      iframe.hidden = true;
      document.body.appendChild(iframe);
    break;
  }
};

function clearStorage() {
  localStorage.clear();
}

onload = function() {
  performance.mark('app-onload');
  performance.measure('domLoading -> app-onload', 'domLoading', 'app-onload');
};
