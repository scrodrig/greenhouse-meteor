/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */
T9n.setLanguage(window.navigator.userLanguage || window.navigator.language);

var myLogoutFunc = function () {
    Session.set('nav-toggle', '');
    FlowRouter.go('/');
};

AccountsTemplates.configure({
    confirmPassword: true,
    showForgotPasswordLink: true,
    sendVerificationEmail: true,
    // Hooks
    onLogoutHook: myLogoutFunc
});


AccountsTemplates.addFields([
    {
        _id: 'firstName',
        type: 'text',
        displayName: T9n.get('Accounts.FirstName'),
        placeholder: T9n.get('Accounts.FirstName'),
        required: true,
        re: /(?=.*[a-z])(?=.*[A-Z])/,
        errStr: T9n.get('Accounts.FirstNameError')
    },
    {
        _id: 'profession',
        type: 'select',
        displayName: T9n.get('Accounts.Profession'),
        select:[
            {
                text: T9n.get('Accounts.Professions.Developer'),
                value: 'developer'
            },
            {
                text: T9n.get('Accounts.Professions.Designer'),
                value: 'designer'
            },
            {
                text: T9n.get('Accounts.Professions.Farmer'),
                value: 'farmer'
            },
            {
                text: T9n.get('Accounts.Professions.Other'),
                value: 'other'
            }
        ]
    },
    {
        _id: 'gender',
        type: 'select',
        displayName: T9n.get('Accounts.Gender'),
        select: [
            {
                text: T9n.get('Accounts.Genders.Male'),
                value: 'male',
            },
            {
                text: T9n.get('Accounts.Genders.Female'),
                value: 'female',
            },
        ],
    }
]);
