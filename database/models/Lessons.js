const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    details: {
        type: String,
        require: true
    },
    contenu: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "contenus"
        }
    ],
    quizz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizzs"
    }
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Lessons = mongoose.model('lessons', schema);
module.exports = Lessons;