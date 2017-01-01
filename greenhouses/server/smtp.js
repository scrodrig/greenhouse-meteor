/**
 * Created by SchubertDavidRodriguez on 10/30/16.
 */
Meteor.startup(() => {
    process.env.MAIL_URL = "smtp://invernaderos.espe%40gmail.com:Invernaderos-2016@smtp.gmail.com:587";
    process.env.SITE_NAME = "[GPI] Greenhouse Prediction IPL";
    process.env.FROM_MAIL_NAME = "ESPE Greenhouses";
});