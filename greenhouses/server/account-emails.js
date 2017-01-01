/**
 * Created by SchubertDavidRodriguez on 10/31/16.
 */
SSR.compileTemplate('confirmationHtmlEmail', Assets.getText('confirmation-html-email.html'));
SSR.compileTemplate('changePasswordHtmlEmail', Assets.getText('confirmation-html-email.html'));

Accounts.emailTemplates.siteName = process.env.SITE_NAME;
Accounts.emailTemplates.from = process.env.FROM_MAIL_NAME;
Accounts.emailTemplates.verifyEmail = {
    subject() {
        return T9n.get('Accounts.Email.Verify.subject');
    },
    html( user, url ) {
        return SSR.render('confirmationHtmlEmail', {
            siteName: T9n.get('Accounts.Email.Verify.siteName'),
            mailSubject: T9n.get('Accounts.Email.Verify.mailSubject'),
            introductionText: T9n.get('Accounts.Email.Verify.introductionText'),
            url: url,
            buttonTitle: T9n.get('Accounts.Email.Verify.buttonTitle'),
            confirmationTitleData: T9n.get('Accounts.Email.Verify.confirmationTitleData'),
            name: user.profile.firstName,
            profession: user.profile.profession,
            email: user.emails[0].address,
            footer:T9n.get('Accounts.Email.Verify.footer'),
            copyrightUser:T9n.get('Accounts.Email.Verify.copyrightUser'),
            copyrightUrl: T9n.get('Accounts.Email.Verify.copyrightUrl'),
        });
    }

};

Accounts.emailTemplates.resetPassword = {
    subject(){
        return T9n.get('Accounts.Email.Password.subject');
    },
    html( user, url ) {
        return SSR.render('confirmationHtmlEmail', {
            siteName: T9n.get('Accounts.Email.Password.siteName'),
            mailSubject: T9n.get('Accounts.Email.Password.mailSubject'),
            introductionText: T9n.get('Accounts.Email.Password.introductionText'),
            url: url,
            buttonTitle: T9n.get('Accounts.Email.Password.buttonTitle'),
            confirmationTitleData: T9n.get('Accounts.Email.Password.confirmationTitleData'),
            name: user.profile.firstName,
            profession: user.profile.profession,
            email: user.emails[0].address,
            footer:T9n.get('Accounts.Email.Password.footer'),
            copyrightUser:T9n.get('Accounts.Email.Password.copyrightUser'),
            copyrightUrl: T9n.get('Accounts.Email.Password.copyrightUrl'),
        });
    }
};