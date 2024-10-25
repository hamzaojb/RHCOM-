// src/components/UpdateEmployeeModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Add this line to import axios


const UpdateEmployeeModal = ({ isOpen, onClose, employee, onUpdate }) => {
  const [nameemploye, setNameEmploye] = useState('');
  const [email, setEmail] = useState('');
  const [datededebut, setDateDebut] = useState('');
  const [datedefin, setDateFin] = useState('');
  const [departement, setDepartement] = useState('');
  const [salaire, setSalaire] = useState('');
  const [contrat, setContrat] = useState('');

  useEffect(() => {
    if (employee) {
      setNameEmploye(employee.nameemploye || '');
      setEmail(employee.email || '');
      setDateDebut(employee.datededebut ? new Date(employee.datededebut).toISOString().split('T')[0] : '');
      setDateFin(employee.datedefin ? new Date(employee.datedefin).toISOString().split('T')[0] : '');
      setDepartement(employee.departement || '');
      setSalaire(employee.salaire || '');
      setContrat(employee.contrat || '');
    }
  }, [employee]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/Employe/${employee._id}`, {
        nameemploye,
        email,
        datededebut,
        datedefin,
        departement,
        salaire,
        contrat,
      });
      onUpdate(); // Refresh data after update
      onClose(); // Close modal
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Mettre à jour l'employé</h2>
        <form onSubmit={handleUpdate}>
          <label>Nom:</label>
          <input
            type="text"
            value={nameemploye}
            onChange={(e) => setNameEmploye(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Date de début:</label>
          <input
            type="date"
            value={datededebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
          <label>Date de fin:</label>
          <input
            type="date"
            value={datedefin}
            onChange={(e) => setDateFin(e.target.value)}
          />
          <label>Département:</label>
          <input
            type="text"
            value={departement}
            onChange={(e) => setDepartement(e.target.value)}
          />
          <label>Salaire:</label>
          <input
            type="number"
            value={salaire}
            onChange={(e) => setSalaire(e.target.value)}
          />
          <label>Contrat:</label>
          <input
            type="text"
            value={contrat}
            onChange={(e) => setContrat(e.target.value)}
          />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
