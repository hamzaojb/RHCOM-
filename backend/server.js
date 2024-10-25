const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connexion à la base de données MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Modèle d'utilisateur
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  password: { type: String, required: true },
});


const User = mongoose.model('User', userSchema);

// Route pour s'inscrire
app.post('/signup', async (req, res) => {
  const { fullname, email, birthdate, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'L\'email existe déjà' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const newUser = new User({
      fullname,
      email,
      birthdate,
      password: hashedPassword,
    });

    await newUser.save();

    // Créer un token JWT
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour se connecter (signin)
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Créer un token JWT
        const token = jwt.sign({ id: user._id, email: user.email }, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});



////job


// Schéma Mongoose pour les travaux
const workSchema = new mongoose.Schema({
    nameentreprise: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    datededebut: { type: Date, required: true },
    nombredemployee: { type: Number, required: true },
    lieu: { type: String, required: true },
});

const Work = mongoose.model('Work', workSchema);

// Route pour ajouter un travail
app.post('/work', async (req, res) => {
    const { nameentreprise, email, datededebut, nombredemployee, lieu } = req.body;

    try {
        // Insérer le nouveau travail dans la base de données
        const newWork = new Work({
            nameentreprise,
            email,
            datededebut,
            nombredemployee,
            lieu,
        });

        await newWork.save();

        // Créer un token JWT
        const token = jwt.sign({ id: newWork._id, email: newWork.email }, 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.status(201).json({ token, work: newWork });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


// Route pour obtenir tous les travaux
app.get('/work', async (req, res) => {
  try {
      const works = await Work.find(); // Récupérer tous les travaux
      res.status(200).json(works); // Retourner les travaux
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
