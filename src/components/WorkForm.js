// src/components/WorkForm.js
import React, { useState } from 'react';
import '../css/WorkForm.css'; // Assurez-vous de créer un fichier CSS pour le style

const WorkForm = () => {
  const [nameentreprise, setNameEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [datededebut, setDateDebut] = useState('');
  const [nombredemployee, setNombreEmployee] = useState('');
  const [lieu, setLieu] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false); // État pour contrôler l'ouverture du modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameentreprise,
          email,
          datededebut,
          nombredemployee,
          lieu,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Travail ajouté avec succès !');
        // Réinitialiser les champs du formulaire
        setNameEntreprise('');
        setEmail('');
        setDateDebut('');
        setNombreEmployee('');
        setLieu('');
      } else {
        setMessage(data.error || 'Erreur lors de l\'ajout du travail.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage('Erreur serveur.');
    }
  };

  return (
    <div>
      <button className='buttonmodal' onClick={() => setIsOpen(true)}>Ajouter un Travail</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
            <h2>Ajouter un Travail</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nom de l'entreprise:
                <input
                  type="text"
                  value={nameentreprise}
                  onChange={(e) => setNameEntreprise(e.target.value)}
                  placeholder='Enter name of entreprise'
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   placeholder='Enter email'
                  required
                />
              </label>
              <label>
                Date de début:
                <input
                  type="date"
                  value={datededebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  required
                />
              </label>
              <label>
                Nombre d'employés:
                <input
                  type="number"
                  value={nombredemployee}
                  onChange={(e) => setNombreEmployee(e.target.value)}
                   placeholder='Enter number of employees'
                  required
                />
              </label>
              <label>
                Lieu:
                <input
                  type="text"
                  value={lieu}
                  onChange={(e) => setLieu(e.target.value)}
                   placeholder='Enter adress'
                  required
                />
              </label>
              <button  className='modalbutton' type="submit">Ajouter</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkForm;
