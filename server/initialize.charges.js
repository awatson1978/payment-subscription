Meteor.startup(function() {
  Meteor.publish('charges', function() {
    return Charges.find();
  });
  var chargeRecord = {
    CardType: "Visa",
    CardNumber: "AAAA BBBB CCCC DDDD",
    ExpiresMonth: "01/2014",
    ExpiresYear: "01/2014",
    Security: "123",
    Zip: "11205",
    Name: "Jane Doe"
  };

  // if we're in development and there aren't any topics, populate
  if (Charges.find().count() === 0) {
    Charges.insert(chargeRecord);
  }

});
