
// the subscription needs to be in an autosubscribe to detect the reactive Session variable

Meteor.autorun(function(){
    Meteor.subscribe('charges');
});


