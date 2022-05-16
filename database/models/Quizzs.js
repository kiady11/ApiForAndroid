const { mongoose } = require('mongoose');

const schema = new mongoose.Schema({
    question: { 
        type: String,
        require: true 
    },
    contenu: { 
        type: mongoose.Schema.Types.ObjectId, 
        require: true
    },
    reponse: { 
        type: string, 
        require: true 
    },
    suggestionReponse: [
        {
            type: string,
            require: true
        }
    ]
});

schema.method("toJSON", function () { 
    const { _v, _id, ...object } = this.toObject()
    object.id = _id
    return object
});

const Quizz = mongoose.model("quizzs", schema);
module.exports = Quizz;