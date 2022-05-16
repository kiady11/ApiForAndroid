const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    name: { 
        type: String, 
        require: true 
    },
    username: { 
        type: String, 
        require: true 
    },
    email: { 
        type: String, 
        require: true 
    },
    password: { 
        type: String, 
        require: true 
    },
    age: { 
        type: String, 
        require: true 
    },
    sexe: { 
        type: String, 
        require: true 
    },
    active: { 
        type: String, 
        require: true 
    },
    mailActiveURL: { 
        type: String, 
        require: true 
    },
    preference: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "preferences" 
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const User = mongoose.model('users', schema);
module.exports = User;