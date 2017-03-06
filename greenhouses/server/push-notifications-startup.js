/**
 * Created by SchubertDavidRodriguez on 2/21/17.
 */
Push.Configure({
    apn: {
        certData: Assets.getText('apnDevCert.pem'),
        keyData: Assets.getText('apnDevKey.pem'),
        passphrase: 'devdev',
        production: false,
        //gateway: 'gateway.push.apple.com',
    },
    gcm: {
        apiKey: 'AIzaSyAx7A2g3cnlP4zZG3geYiO-CigN-J4-Hv8',
        projectNumber: 111111111111
    }
    // production: true,
    // 'sound' true,
    // 'badge' true,
    // 'alert' true,
    // 'vibrate' true,
    // 'sendInterval': 15000, Configurable interval between sending
    // 'sendBatchSize': 1, Configurable number of notifications to send per batch
    // 'keepNotifications': false,
//
});