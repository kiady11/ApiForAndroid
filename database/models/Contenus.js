const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    typeContenu: { 
        type: String, 
        require: true 
    },
    contenu: { 
        type: String, 
        require: true 
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Contenu = mongoose.model('contenus', schema);
module.exports = Contenu;