/*jshint esnext:true*/

var win = window.parent;
var perf = win.performance;
var console = win.console;

// win.console.timeEnd('first iframe');
// win.console.time('second iframe');
perf.mark('frame1 script');
// perf.mark('connect start');
perf.measure('domLoading -> frame1 script', 'domLoading', 'frame1 script');

setTimeout(() => {
  win.postMessage('frame1', '*');
});

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

