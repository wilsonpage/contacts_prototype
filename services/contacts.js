
var win = window.parent;
var console = win.console;
var perf = win.performance;

perf.mark('frame2 script');

perf.measure('domLoading -> frame2 script', 'domLoading', 'frame2 script');
// perf.measure('frame1 script exec to frame2 script exec', 'frame1 script', 'frame2 script');
// win.console.timeEnd('second iframe');

win.postMessage('frame2', '*');

// threads.service('contacts-service')
//   .method('get', function(uuid) {
//     console.timeEnd('get contact');
//     perf.mark('get-contact-request');
//     return { givenName: ['Wilson', 'Page'] };
//   });