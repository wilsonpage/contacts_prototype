var perf = window.parent.performance;

var service = threads.service('contacts-service')
  .method('get', function(uuid) {
    perf.mark('get contact');
    // return new Promise(function(resolve, reject) {
      return {
        givenName: ['Wilson', 'Page']
      };
      // var options = {
      //   filterBy: ['id'],
      //   filterOp: 'equals',
      //   filterValue: uuid
      // };

      // var request = navigator.mozContacts.find(options);

      // request.onsuccess = function onsuccess(e) {
      //   var contact = e.target.result[0];
      //   if (!contact) {
      //     reject();
      //     return;
      //   }
      //   resolve(JSON.stringify(contact));
      // };

      // request.onerror = reject;
    // });


  })

  .stream('getAll', function(stream) {
    perf.mark('get all contacts');
    stream.write({ contact: '{ "givenName": ["Wilson", "Page"] }' });
    stream.close();

    // var options = {
    //   sortBy: 'givenName',
    //   sortOrder: 'ascending'
    // };

    // var cursor = navigator.mozContacts.getAll(options);
    // cursor.onsuccess = function onsuccess(evt) {
    //   // console.log('Tenemos un contacto en el servicio');
    //   var contact = evt.target.result;
    //   if (!contact) {
    //     stream.close();
    //     return;
    //   }
    //   // XXX If it's not serialized it's not working!!!
    //   stream.write({
    //     contact: JSON.stringify(contact),
    //     photo: contact.photo
    //   });
    //   cursor.continue();
    // };

    // cursor.onerror = function onerror(error) {
    //   console.log('ERROR ' + JSON.stringify(error));
    // };
    // return 'foo';
  });
