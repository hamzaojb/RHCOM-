import React, { useState } from 'react';
import '../css/WorkForm.css';

const WorkForm = ({ fetchEmployes }) => {
  const [nameemploye, setnamemeploye] = useState('');
  const [email, setEmail] = useState('');
  const [datededebut, setDateDebut] = useState('');
  const [datedefin, setDateFin] = useState('');
  const [departement, setdepartemnt] = useState('');
  const [salaire, setsalaire] = useState('');
  const [contrat, setcontrat] = useState('');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/Employe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nameemploye,
          email,
          datededebut,
          datedefin,
          departement,
          salaire,
          contrat,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Travail ajouté avec succès !');
        // Réinitialiser les champs du formulaire
        setnamemeploye('');
        setEmail('');
        setDateDebut('');
        setDateFin('');
        setdepartemnt('');
        setsalaire('');
        setcontrat('');
        
        // Appeler fetchEmployes pour mettre à jour la liste
        fetchEmployes();
        setIsOpen(false);

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
                Nom d'employe:
                <input
                  type="text"
                  value={nameemploye}
                  onChange={(e) => setnamemeploye(e.target.value)}
                  placeholder='Enter name of employe'
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
                Date de fin:
                <input
                  type="date"
                  value={datedefin}
                  onChange={(e) => setDateFin(e.target.value)}
                />
              </label>
              <label>
                département:
                <input
                  type="text"
                  value={departement}
                  onChange={(e) => setdepartemnt(e.target.value)}
                  placeholder='Enter department'
                  required
                />
              </label>
              <label>
                salaire:
                <input
                  type="number"
                  value={salaire}
                  onChange={(e) => setsalaire(e.target.value)}
                  placeholder='Enter salary'
                  required
                />
              </label>
              <label>
                Type de contrat:
                <input
                  type="text"
                  value={contrat}
                  onChange={(e) => setcontrat(e.target.value)}
                  placeholder='Enter type of contract'
                  required
                />
              </label>
              <button className='modalbutton' type="submit">Ajouter</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkForm;
