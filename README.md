**payment-subscription** is a Meteor package to drop in a subscription payment page.  

------------------------
### Installation

A.  Clone the repo to your local computer.

````js
git clone https://github.com/awatson1978/payment-subscription.git payment-subscription
````

B.  Create your Stripe Account at https://manage.stripe.com/account  
C.  Update your private and public keys with the data from your Stripe Account.

````js
// packages/stripe-meteor/stripe_server.js
var Stripe = StripeAPI('sk_test_adhfniabgvdafvdfv');

// client/stripe.js
Stripe.setPublishableKey('pk_test_janvanweo[ignaodfinboidfj');

````

D.  Edit copy and parameters to suite your business needs.
E.  Maybe update the email template.
F.  Publish

------------------------
### Licensing

MIT License on the Meteor package stuff. Otherwise, whatever the code at Quirksmode is licensed under.  (I'm assuming MIT/GPL)
http://www.quirksmode.org/js/detect.html.

------------------------
### Support
Found this package to be useful?  Consider tipping the package maintainer for their time!  

[![Support via Gittip](https://raw.github.com/gittip/www.gittip.com/master/www/assets/gittip.png)](https://www.gittip.com/awatson1978/)  

