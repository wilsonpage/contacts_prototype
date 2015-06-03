
onload = function() {
  perf.mark('app-onload');
  perf.measure('domLoading -> app-onload', 'domLoading', 'app-onload');
};
