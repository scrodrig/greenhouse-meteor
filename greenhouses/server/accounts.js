/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */
Accounts.onCreateUser(function(options, user) {
    // we wait for Meteor to create the user before sending an email
    if (options.profile)
        user.profile = options.profile;

    Meteor.setTimeout(function() {
        Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
    return user;
});

var postSignUp = function (userId, info) {
    console.log(userId);
    console.log(info.profile.profession);
    Roles.addUsersToRoles(userId, ['normal-user', info.profile.profession]);
};

AccountsTemplates.configure({
    postSignUpHook: postSignUp
});

