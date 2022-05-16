const { mongoose, model } = require('mongoose');

const schema = new mongoose.Schema({
    theme: { 
        type: String 
    },
    langue: { 
        type: String 
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Preference = mongoose.model('preferences', schema);
module.exports = Preference;