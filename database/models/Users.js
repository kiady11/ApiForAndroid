const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;


const schema = new mongoose.Schema({
    firstname: { 
        type: String, 
        require: true 
    },
    lastname: { 
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
    },
    sexe: { 
        type: String
    },
    active: { 
        type: String, 
        default: true 
    },
    mailActiveURL: { 
        type: String
    },
    preference: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "preferences" 
    }
}, { timestamps: {} });


schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err)
    }
})

schema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword.toString(), this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// override la method toJSON pour que _v, _id return un string ( pour le front end )
schema.method("toJSON", function () {
    const { _v, _id, ...object } = this.toObject()
    delete object.password;
    object.id = _id
    
    return object
})
const User = mongoose.model('users', schema);
module.exports = User;