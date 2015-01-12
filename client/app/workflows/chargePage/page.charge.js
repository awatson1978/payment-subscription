Session.setDefault('is_admin', false);
Session.setDefault('subscription_plan', 'monthly_20');

Session.setDefault('current_donation_step', 'intro');
Session.setDefault('donation_level', 20);
Session.setDefault('subscription_level', 'monthly_20');
Session.setDefault('email_receipt', "");

Session.setDefault('form_is_validated', false);
Session.setDefault('card_type', "");


//------------------------------------------------------------------------------
// TEMPLATE INPUTS


Template.crowdSourcingForm.events({
  'click .cancel-donation': function() {
    Session.set('card_type', '');
  },
  'click .validate-donation': function() {

    console.log(Mesosphere.creditCardForm);

    var formData = [{
      "name": "creditCardName",
      "value": $('#creditCardName').val()
    }, {
      "name": "creditCardNumber",
      "value": $('#creditCardNumber').val()
    }, {
      "name": "creditCardMonth",
      "value": $('#creditCardMonth').val()
    }, {
      "name": "creditCardYear",
      "value": $('#creditCardYear').val()
    }, {
      "name": "creditCardSecurity",
      "value": $('#creditCardSecurity').val()
    }];

    console.log('this is the formData we have so far....');
    console.log(formData);

    var validationObject = Mesosphere.creditCardForm.validate(formData);
    var cardType = Stripe.card.cardType($('#creditCardNumber').val());
    Session.set('card_type', '(' + cardType + ')');

    console.log('received a validation object....');
    console.log(validationObject);

  },
  'click .process-donation': function() {
    console.count('click .process-donation');


    $('#creditCardForm').submit(function(event) {
      var $form = $(this);

      console.log('Stripe.card.createToken()');
      Stripe.card.createToken($form, function(status, response) {

        var cardType = Stripe.card.cardType($('#creditCardNumber').val());

        var formData = {
          chargeAmount: Session.get('donation_level'),
          creditCardName: $('#creditCardName').val(),
          creditCardNumber: $('#creditCardNumber').val(),
          creditCardMonth: $('#creditCardMonth').val(),
          creditCardYear: $('#creditCardYear').val(),
          creditCardSecurity: $('#creditCardSecurity').val(),
          emailReceipt: $('#receiptAddress').val(),
          cardToken: response,
          subscriptionPlan: Session.get('subscription_plan'),
          cardType: cardType
        };

        Meteor.call('createNewSubscription', formData, function(err, result) {
          if (err) {
            console.log(err);
            Session.set('current_donation_step', 'error');
            Session.set('form_is_validated', false);
          } else {
            console.log(result);
            Session.set('current_donation_step', 'thankyou');
            Session.set('form_is_validated', false);
          }
        });

      });

      // Prevent the form from submitting with the default action
      return false;
    });

  }
});




//------------------------------------------------------------------------------
// TEMPLATE INPUTS



var creditCardNumber = "";
var creditCardName = "";
var creditCardMonth = "";
var creditCardYear = "";
var creditCardSecurity = "";
var creditCardReceiptEmail = "";
var subscriptionPeriod = "oneTime";


Template.crowdSourcingForm.events({
  'click .donation-step-intro': function() {
    Session.set('current_donation_step', 'intro');
    Session.set('donation_level', 0);
  },
  'click .donation-step-amount': function() {
    Session.set('current_donation_step', 'amount');
    Session.set('donation_level', 0);
  },
  'click .donation-step-card': function() {
    if (Session.get('is_admin')) {
      Session.set('current_donation_step', 'card');
    }
  },
  'click .donation-step-thankyou': function() {
    if (Session.get('is_admin')) {
      Session.set('current_donation_step', 'thankyou');
    }
  },
  'click .donation-step-frequency': function() {
    if (Session.get('is_admin')) {
      Session.set('current_donation_step', 'frequency');
    }
  },
  'click .donation-step-recipient': function() {
    if (Session.get('is_admin')) {
      Session.set('current_donation_step', 'recipient');
    }
  },
  'click .donation-step-receipt': function() {
    if (Session.get('is_admin')) {
      Session.set('current_donation_step', 'receipt');
    }
  },


  'click #donation-level-bronze': function() {
    Session.set('subscription_level', 'monthly_10');
    Session.set('donation_level', 10);
  },
  'click #donation-level-silver': function() {
    Session.set('subscription_level', 'monthly_20');
    Session.set('donation_level', 20);
  },
  'click #donation-level-gold': function() {
    Session.set('subscription_level', 'monthly_50');
    Session.set('donation_level', 50);
  },
  'click #donation-level-platinum': function() {
    Session.set('subscription_level', 'monthly_100');
    Session.set('donation_level', 100);
  },


  'click #backToFrequency': function() {
    Session.set('current_donation_step', 'frequency');
  },
  'click #skipReceipt': function() {
    Session.set('current_donation_step', 'card');
  },
  'click #confirmAddress': function() {
    Session.set('current_donation_step', 'card');
    Session.set('email_receipt', $('#receiptAddressInput').val());
  },


  'keyup #creditCardNameInput': function() {
    creditCardName = $('#creditCardNameInput').val();
  },
  'keyup #creditCardNumberInput': function() {
    creditCardNumber = $('#creditCardNumberInput').val();
  },
  'keyup #creditCardMonthInput': function() {
    creditCardMonth = $('#creditCardMonthInput').val();
  },
  'keyup #creditCardYearInput': function() {
    creditCardYear = $('#creditCardYearInput').val();
  },
  'keyup #creditCardSecurityInput': function() {
    creditCardSecurity = $('#creditCardSecurityInput').val();
  }
});



//------------------------------------------------------------------------------
// TEMPLATE OUTPUTS

Template.crowdSourcingForm.helpers({
  getCardNumberLevel: function () {
    return 'Card Number ' + Session.get('card_type');
  },
  isValidated: function() {
    return Session.get('form_is_validated');
  },
  validatedStyle: function() {
    if (Session.get('form_is_validated')) {
      return 'btn-default';
    } else {
      return 'btn-success';
    };
  },
  showEmailReceiptInfo: function() {
    if (Session.get('email_receipt') === "") {
      return false;
    } else {
      return true;
    }
  },
  getCardName: function() {
    return creditCardName;
  },
  getCardNumber: function() {
    return creditCardNumber;
  },
  getCardMonth: function() {
    return creditCardMonth;
  },
  getCardYear: function() {
    return creditCardYear;
  },
  getCardSecurity: function() {
    return creditCardSecurity;
  },
  getEmailReceipt: function() {
    return Session.get('email_receipt');
  },
  getDonationLevel: function() {
    return '$' + Session.get('donation_level') + " Donation";
  },
  getDonationFrequency: function() {
    switch (Session.get('donation_frequency')) {
      case 'once':
        return 'One Time';
        break;
      case 'monthly':
        return 'Monthly';
        break;
      case 'seasonal':
        return 'Seasonal';
        break;
      case 'annual':
        return 'Annual';
        break;
      default:
        return 'One Time';
        break;
    }
  },
  getThankYouStepVisibility: function () {
    if (Session.get('current_donation_step') == 'thankyou') {
      return 'visible';
    } else {
      return 'hidden';
    }
  },
  getErrorStepVisibility: function () {
    if (Session.get('current_donation_step') == 'error') {
      return 'visible';
    } else {
      return 'hidden';
    }
  }
});
