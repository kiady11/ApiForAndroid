const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;
autoIncrement = require('mongoose-auto-increment');


const schema = new mongoose.Schema({
    id: { type: Number, unique: true, min: 1 },
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
    cours: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "cours"
        }
    ],
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
    },
    histoires:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "livres"
        }
    ]
}, { timestamps: {} });

autoIncrement.initialize(mongoose.connection)
schema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});


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
    object._id = this._id
    return object
})
const User = mongoose.model('users', schema);
module.exports = User;