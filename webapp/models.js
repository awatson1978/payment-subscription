Charges =  new Meteor.Collection("charges");

Charges.allow({
    insert: function(){
        return true;
    },
    update: function () {
        return true;
    },
    remove: function(){
        return true;
    }
});


Mesosphere({
    name: "creditCardForm",
    method: function(){},
    fields: {
        creditCardName: {
            required: false,
            format: "alphanumeric",
            message: "Not a valid name."
        },
        creditCardNumber: {
            required: true,
            format: "creditcard",
            message: "Invalid credit card number (aaaa bbbb cccc dddd)"
        },
        creditCardMonth: {
            required: true,
            format: "integer",
            message: "Invalid 2 digit format (mm).",
            rules:{
                exactLength: 2,
                minValue: 1,
                maxValue: 12
            }
        },
        creditCardYear: {
            required: true,
            format: "integer",
            message: "Invalid 4 digit format (yyyy)",
            rules:{
                exactLength: 4,
                minValue: 2013
            }
        },
        creditCardSecurity: {
            required: true,
            format: "integer",
            message: "Invalid 3 digit format (nnn)",
            rules:{
                exactLength: 3,
                minValue: 0
            }
        }
    },
    onFailure: function(erroredFields){
        console.log('got a client-side onFailure callback');
        console.log('------------------------------------');

        console.log('cleaning up DOM objects');
        console.log(erroredFields);
        $('.form-group').each(function(index, inputItem){
            console.log(inputItem.id);
            $('#' + inputItem.id).removeClass('has-error');
            $('#' + inputItem.id).removeClass('has-success');
        });

        console.log('setting error classes');
        for(input in erroredFields){
            console.log(input);
            $('#' + input + 'Group').addClass('has-error');
            $('#' + input + 'Group').find('.control-label').append(input.message);
        }

        Session.set('form_is_validated', false);
    },
    onSuccess: function(formData){
        console.log('got a client-side onSuccess callback');
        console.log('------------------------------------');

        $('.form-group').each(function(index, inputItem){
            console.log(inputItem.id);
            $('#' + inputItem.id).removeClass('has-error');
            $('#' + inputItem.id).removeClass('has-success');
        });

        Session.set('form_is_validated', true);
    }
});