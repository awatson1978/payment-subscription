var StripeAPI = Npm.require('stripe');

// test key
var Stripe = StripeAPI('sk_test_adhfniabgvdafvdfv');

// live key
//var Stripe = StripeAPI('sk_live_asdlvnaiukuvndiubgv');

Meteor.methods({

    createNewSubscription: function (rawFormData) {
        try{
            console.log('received a rawFormData: ' + JSON.stringify(rawFormData));

            rawFormData = rawFormData || {};

            var customer = Stripe.customers.create({
              card: rawFormData.cardToken.id,
              plan: rawFormData.subscriptionPlan,
              email: rawFormData.emailReceipt
            });
            console.log('returned customer object');
            console.log(customer);

            var result = "...";
            Stripe.charges.create({
                amount: rawFormData.chargeAmount * 100,
                currency: "USD",
                card: {
                    number: rawFormData.creditCardNumber,
                    exp_month: rawFormData.creditCardMonth,
                    exp_year: rawFormData.creditCardYear
                }
            }, function (error, result) {
                console.log(error, result);
                if(error){
                    console.log('Stripe returned an error...');
                    return error;
                }else{
                    console.log('Stripe returned an result...');
                    return result;
                }
            });


            //check([to, from, subject, text], [String]);
            this.unblock();

            var emailText = "Dear " + rawFormData.creditCardName + ", Thank you for donating.  Your credit card will be billed for the amount of $" + rawFormData.chargeAmount + " once a month.  If there are any concerns, please contact us at donations@test.org.  And, once again...  Thank You for Your Support!";
            Email.send({
              to: rawFormData.emailReceipt,
              from: "donations@test.org",
              subject: "Donation Receipt",
              text: emailText
            });

        }catch(error){
            console.log(error);
        }
    }

});