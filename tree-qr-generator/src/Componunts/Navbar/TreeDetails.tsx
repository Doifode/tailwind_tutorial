import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TreeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tree data from the backend
    const fetchTreeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/trees/${id}`);
        if (!response.ok) {
          throw new Error('Tree not found!');
        }
        const data = await response.json();
        setTree(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center text-danger">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {/* Go Back Button */}
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <i className="bi bi-arrow-left"></i> Go Back
      </button>

      {/* Tree Details Card */}
      <div className="card shadow-lg">
        <img
          src={tree?.image || 'https://via.placeholder.com/300x200'}
          alt={tree?.name || 'Tree Image'}
          className="card-img-top"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        />
        <div className="card-body text-center">
          <h2 className="card-title mb-4">Tree Details</h2>
          <hr />

          <div className="mb-3">
            <h5 className="text-secondary">Name:</h5>
            <p className="fs-5">{tree?.name}</p>
          </div>

          <div className="mb-3">
            <h5 className="text-secondary">Species:</h5>
            <p className="fs-5">{tree?.species}</p>
          </div>

          <div className="mb-3">
            <h5 className="text-secondary">Description:</h5>
            <p className="fs-5">{tree?.description}</p>
          </div>

          <div className="mb-3">
            <h5 className="text-secondary">Age:</h5>
            <p className="fs-5">{tree?.age} years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeDetails;
