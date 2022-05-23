const { mongoose } = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const schema = new mongoose.Schema({
    nom: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "lessons"
        }
    ],
    intervale: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    videoUrl:{
        type: String
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Cours = mongoose.model("cours", schema);
module.exports = Cours;