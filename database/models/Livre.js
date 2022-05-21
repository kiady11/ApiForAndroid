const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    titre: { 
        type: String,
        require: true 
    },
    filename: { 
        type: String, 
        require: true
    }
}, { timestamps: {} } );

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Livre = mongoose.model("livres", schema);
module.exports = Livre;