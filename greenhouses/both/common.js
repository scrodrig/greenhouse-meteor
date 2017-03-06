/**
 * Created by SchubertDavidRodriguez on 2/21/17.
 */
Push.allow({
    send: function(userId, notification) {
        // Allow all users to send to everybody - For test only!
        return true;
    }
});