'use client'
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/main.css';

export default function AdminPage() {
  const [matchDetails, setMatchDetails] = useState({ match_name:'', date: '', location: '', teams:'', available_slots:'', status:'' });
  const [matches, setMatches] = useState([]);
  const [editingMatchId, setEditingMatchId] = useState(null);

  //////////////////// Fetch matches on component load ///////////////////////////////
  useEffect(() => {
    fetchMatches();
  }, []);
  const fetchMatches = async () => {
    const res = await fetch('http://localhost:5001/adminMatches');
    const data = await res.json();
    setMatches(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMatchDetails({ ...matchDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const url = editingMatchId
      ? `http://localhost:5001/matches/${editingMatchId}`
      : 'http://localhost:5001/AddMatches';
    const method = editingMatchId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matchDetails),
    });
    if (response.ok){
      alert(editingMatchId ? 'Match updated successfully!' : 'Match added successfully!');
      setEditingMatchId(null); 
      setMatchDetails({ match_name: '', date: '', location: '', teams: '', available_slots: '', status: '' });
      fetchMatches();
    }
    else{
      alert(editingMatchId ? 'Failed to Update Match' : 'Failed to Delete Match');
    }

    
  };

  const handleEdit = (match: any) => {
    setMatchDetails({
      match_name: match.match_name,
      date: match.date.split('.')[0], // Adjust date format if necessary
      location: match.location,
      teams: match.teams,
      available_slots: match.available_slots,
      status: match.status,
    });
    setEditingMatchId(match.id);
  };

  // const handleDelete = async (id: number) => {
  //   if (confirm('Are you sure you want to delete this match?')) {
  //     const response = await fetch(`http://localhost:5001/matches/${id}`, {
  //       method: 'DELETE',
  //     });

  //     if (response.ok){
  //       alert('Match deleted successfully!');
  //       fetchMatches(); // Refresh matches list
  //     }
  //     else{
  //       alert('Failed to Delete Match!');
  //     }

  //   }
  // };

  return (

<body className="background">
<div className="container mt-5 ">
      <h1 className="text-center mb-4">Admin - Add New Match</h1>
      
      <form className="bg-light p-4 shadow rounded" onSubmit={handleSubmit}> {/* Form with padding, light background, shadow, and rounded corners */}
        
        <div className="form-group mb-3">
          <label htmlFor="match_name" className='label'>Match Name</label>
          <input
            type="text"
            className="form-control"
            id="match_name"
            name="match_name"
            placeholder="MTN Premier League"
            value={matchDetails.match_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="teams" className='label'>Teams Playing</label>
          <input
            type="text"
            className="form-control"
            id="teams"
            name="teams"
            placeholder="Pirates vs Sundowns"
            value={matchDetails.teams}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="available_slots" className='label'>Availble Slots</label>
          <input
            type="number"
            className="form-control"
            id="available_slots"
            name="available_slots"
            placeholder="2"
            value={matchDetails.available_slots}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="date" className='label'>Match Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={matchDetails.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="location" className='label'>Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            placeholder="Somhlolo National Stadium"
            value={matchDetails.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="status" className='label'>Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={matchDetails.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="canceled">Canceled</option>
            <option value="sold out">Sold Out</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          {editingMatchId ? 'Update Match' : 'Submit'}
        </button>        
      </form>
      <h2 className="mt-5">Available Matches</h2>
      <ul className="list-group">
        {matches.map((match: any) => (
          <li key={match.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{match.match_name} - {new Date(match.date).toLocaleString()}</span>
            <div>
              <button onClick={() => handleEdit(match)} className="btn btn-sm btn-warning mr-2">Edit</button>
              {/* <button onClick={() => handleDelete(match.id)} className="btn btn-sm btn-danger">Delete</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </body>
    
  );
}
