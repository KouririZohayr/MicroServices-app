const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4000;
const mongoose = require("mongoose");
const Produit = require("./Produit");

app.use(express.json());
mongoose.set('strictQuery', true);
//Connection à la base de données MongoDB publication-service-db
//(Mongoose créera la base de données s'il ne le trouve pas)
mongoose.connect(
    "mongodb://db:27017/produit-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`Produit-Service DB Connected`);
    }
);
//La méthode save() renvoie une Promise.
//Ainsi, dans le bloc then(), nous renverrons une réponse de réussite avec un code 201 de réussite.
//Dans le bloc catch () , nous renverrons une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400.

app.post("http://produits:4000/produit/ajouter", (req, res, next) => {
    const { nom, description, prix } = req.body;
    const newProduit = new Produit({
        nom,
        description,
        prix
    });
    newProduit.save()
        .then(produit => res.status(201).json(produit))
        .catch(error => res.status(400).json({ error }));
});


app.post("http://produits:4000/produit/acheter", (req, res, next) => {
    const { ids } = req.body;
    Produit.find({ _id: { $in: ids } })
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));

});
app.get("/produit/", (req, res, next) => {

    Produit.find()
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));

});
app.put("/produit/update/:id", (req, res, next) => {
    const { ids } = req.body;
    const { nom, description, prix } = req.body;
    Produit.updateOne()
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));

});


app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});