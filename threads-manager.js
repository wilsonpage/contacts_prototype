/*global threads*/

performance.mark('app-script');
performance.measure('domLoading -> app-script', 'domLoading', 'app-script');

function clearStorage() {
  localStorage.clear();
}

threads.manager({
  'navigation-service': {
    src: 'services/navigation.js',
    type: 'worker'
  },
  'contacts-service': {
    src: 'services/contacts.html',
    type: 'window'
  }
});

onload = function() {
  performance.mark('app-onload');
  performance.measure('domLoading -> app-onload', 'domLoading', 'app-onload');
};
