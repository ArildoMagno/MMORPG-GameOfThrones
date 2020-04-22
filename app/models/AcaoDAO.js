const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Acao = new Schema({
    usuario: {
        type: String,
        required: true
    },
    acao: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },

    acao_termina_em: {
        type: Date,
        required: true
    }
})

mongoose.model("acao", Acao) //nome do model, estrutura do model



