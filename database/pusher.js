const Pusher = require("pusher")
const pusher = new Pusher({
    appId: "1413109",
    key: "6028606e361eb648ceb3",
    secret: "cb3ef03605e9ca0580b6",
    cluster: "eu", // if `host` is present, it will override the `cluster` option.
    encryptionMasterKeyBase64: "p7NQ+YtcaU/po3djbqg+CajghWhLxIYGCAfUexQ3vQ4=", // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
})

module.exports = pusher;