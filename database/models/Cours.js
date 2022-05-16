const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    lesson: [
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
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Cours = mongoose.model("cours", schema);
module.exports = Cours;