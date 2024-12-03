import React from 'react';
import { useParams } from 'react-router-dom';

const TreeDetails = () => {
  const { id } = useParams();
  const treeData = localStorage.getItem(id || '');

  if (!treeData) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-danger">Tree not found!</h2>
      </div>
    );
  }

  const tree = JSON.parse(treeData);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
        {/* Tree Image */}
        <img
          src={tree.image || 'https://via.placeholder.com/300x200'}
          alt={tree.name || 'Tree Image'}
          className="card-img-top"
          style={{ maxHeight: '300px', objectFit: 'contain' }}
        />

        {/* Tree Details */}
        <div className="card-body text-center">
          <h2 className="card-title">Tree Details</h2>
          <hr />
          <h5 className="text-secondary">Name:</h5>
          <p className="fs-4">{tree.name}</p>

          <h5 className="text-secondary">Species:</h5>
          <p className="fs-4">{tree.species}</p>

          <h5 className="text-secondary">Description:</h5>
          <p className="fs-4">{tree.description} years</p>
          <h5 className="text-secondary">Age:</h5>
          <p className="fs-4">{tree.age} years</p>
        </div>
      </div>
    </div>
  );
};

export default TreeDetails;
