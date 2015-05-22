var contactsService = threads.client('contacts-service');
var ul;
// Performance related vars
var firstContact = true;
var renderCount = 0;
var maxRenders = 3;
// NOTE! Modify this value to retrieve all performance values
var PERFORMACE_FLAG = false;

var perf = window.parent.performance;

perf.mark('list-view ready');
// perf.measure('list view init', 'domLoading', 'list-view ready');

// function renderContacts(renderCB, onRenderedCB) {
  var stream = contactsService.stream('getAll');

  contactsService.connected.then(() => {
    perf.mark('service connected');
    // perf.measure('service to connect', 'list-view ready', 'service connected');
  });

  // Called every time the service sends a contact
  stream.listen(function(data) {
    perf.mark('first-contact');
    var contact = JSON.parse(data.contact);
    // renderCB(contact, data);
    // perf.measure('first contact rendered', 'service to connect', 'first-contact');
  });

  // "closed" is a Promise that will be fullfilled when stream is closed with
  // success or rejected when the service "abort" the operation
  stream.closed.then(function onStreamClose() {
    // onRenderedCB();
  }, function onStreamAbort() {
    // onRenderedCB(new Error('Error when rendering'));
  });
// }
