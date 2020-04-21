const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Jogo = new Schema({
    usuario: {
        type: String,
        required: true
    },
    moeda: {
        type: String,
        required: true
    },
    suditos: {
        type: String,
        required: true
    },
    temor: {
        type: String,
        required: true
    },
    sabedoria: {
        type: String,
        required: true
    },
    comercio: {
        type: String,
        required: true
    },
    magia: {
        type: String,
        required: true
    }
})

mongoose.model("jogo", Jogo) //nome do model, estrutura do model



