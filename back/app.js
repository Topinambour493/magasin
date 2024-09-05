const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/'+"magasin"
).then(() => {
  console.log('Connexion à MongoDB réussie');
}).catch((error) => {
  console.log('Erreur de connexion à MongoDB :', error.message);
});

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);


// Démarrage du serveur
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
