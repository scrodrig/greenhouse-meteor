/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */

if(Meteor.isClient){
    Accounts.onLogin(function () {
        FlowRouter.go('welcome');
    });

    Accounts.onLogout(function () {
        FlowRouter.go('home');
    });
}

FlowRouter.triggers.enter([function (context, redirect) {
    if(!Meteor.userId()){
        FlowRouter.go('home');
    }
}]);

FlowRouter.route('/',{
    name: 'home',
    action(){
        if(Meteor.userId()){
            FlowRouter.go('welcome');
        }
        BlazeLayout.render('StartLayout', {main: 'Start'});

    }
});

FlowRouter.route('/welcome', {
    name: 'welcome',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Welcome"});
    }
});

FlowRouter.route('/check-nodes', {
    name: 'check-nodes',
    action() {
        BlazeLayout.render("HomeLayout", {main: "CheckNodes"});
    }
});

FlowRouter.route('/check-step', {
    name: 'check-steps',
    action() {
        BlazeLayout.render("HomeLayout", {main: "CheckSteps"});
    }
});

FlowRouter.route('/prediction', {
    name: 'prediction',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Prediction"});
    }
});

FlowRouter.route('/administration', {
    name: 'administration',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Nodes"});
    }
});


FlowRouter.route('/node-status', {
    name: 'node-status',
    action() {
        BlazeLayout.render("HomeLayout", {main: "NodeStatus"});
    }
});
