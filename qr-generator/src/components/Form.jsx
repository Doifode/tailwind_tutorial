import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    treeName: '',
    treeSpecies: '',
    location: '',
    age: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/qr', { state: formData });
  };

  return (
    <div className="form-container">
      <h1>Tree Information Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="treeName"
          placeholder="Tree Name"
          value={formData.treeName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="treeSpecies"
          placeholder="Tree Species"
          value={formData.treeSpecies}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age (in years)"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
