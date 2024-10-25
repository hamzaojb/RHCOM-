// src/model/Home.js
import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import Navbar from '../components/Navbar';
import WorkForm from '../components/WorkForm';
import UpdateEmployeeModal from '../components/UpdateEmployeeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Home = () => {
  const [employes, setEmployes] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployes();
  }, []);

  const fetchEmployes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Employe');
      setEmployes(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const onEdit = (employe) => {
    setSelectedEmployee(employe);
    setIsUpdateModalOpen(true);
  };

  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/Employe/${id}`);
        setEmployes(employes.filter((employe) => employe._id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="left">
        <Navbar />
      </div>
      <div className="right">
        <h2 className='tableau'>Liste des Travaux</h2>
        <WorkForm  fetchEmployes={fetchEmployes}/>
        <table>
          <thead>
            <tr>
              <th>Nom d'employé</th>
              <th>Email</th>
              <th>Date de Début</th>
              <th>Date de Fin</th>
              <th>Département</th>
              <th>Salaire</th>
              <th>Contrat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employes.map((employe) => (
              <tr key={employe._id}>
                <td>{employe.nameemploye}</td>
                <td>{employe.email}</td>
                <td>{new Date(employe.datededebut).toLocaleDateString()}</td>
                <td>{new Date(employe.datedefin).toLocaleDateString()}</td>
                <td>{employe.departement}</td>
                <td>{employe.salaire} DH</td>
                <td>{employe.contrat}</td>
                <td >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => onEdit(employe)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => onDelete(employe._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modale de mise à jour */}
        <UpdateEmployeeModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          employee={selectedEmployee}
          onUpdate={fetchEmployes}
        />
      </div>
    </div>
  );
};

export default Home;
