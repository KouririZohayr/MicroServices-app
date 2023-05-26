const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
    nom: String,
    description: String,
    prix: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Produit = mongoose.model("produit", ProduitSchema);
