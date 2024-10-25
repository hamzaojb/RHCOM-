// src/model/Home.js
import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar'; // Assurez-vous que le chemin est correct
import WorkForm from '../components/WorkForm'; // Importer le formulaire de travail

const Home = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:5000/work');
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchWorks();
  }, []);

  return (
    <div className="home-container">
      <div className="left">
        <Navbar /> {/* Utilisation du composant Navbar */}
      </div>
      <div className="right">
       

        {/* Tableau pour afficher les travaux */}
        <h2 className='tableau'>Liste des Travaux</h2>
        <WorkForm /> {/* Intégration du formulaire de travail */}
        <table>
          <thead>
            <tr>
              <th>Nom de l'Entreprise</th>
              <th>Email</th>
              <th>Date de Début</th>
              <th>Nombre d'Employés</th>
              <th>Lieu</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work) => (
              <tr key={work._id}>
                <td>{work.nameentreprise}</td>
                <td>{work.email}</td>
                <td>{new Date(work.datededebut).toLocaleDateString()}</td>
                <td>{work.nombredemployee}</td>
                <td>{work.lieu}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
