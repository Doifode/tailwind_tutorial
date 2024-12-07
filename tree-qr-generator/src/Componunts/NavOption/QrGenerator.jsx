import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { QRCodeSVG } from 'qrcode.react';

const GenerateQR = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      species: '',
      age: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      species: Yup.string().required('Species is required'),
      description: Yup.string().required('Description is required'),
      age: Yup.number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be an integer'),
    }),
    onSubmit: (values) => {
      handleSubmit(values)
      setQrCodeValue(link);
    },
  });

  const [imageError, setImageError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeLimit = 500 * 1024; // 500 KB in bytes
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

      // Check if the file is an image
      if (!validImageTypes.includes(file.type)) {
        setImageError('Only image files (JPG, PNG, GIF) are allowed.');
        setImageBase64(null);
        return;
      }

      // Check if the image size is less than 500KB
      if (file.size > fileSizeLimit) {
        setImageError('The image size must be less than 500KB.');
        setImageBase64(null);
        return;
      }

      // If file is valid, reset error and read the image
      setImageError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (values) => {
    const formData = {
      name: values.name,
      species: values.species,
      age: values.age,
      description: values.description,
      image: imageBase64, // Base64 encoded image
    };

    try {
      const response = await fetch('https://tailwind-tutorial-9c5r.onrender.com/api/trees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.tree) {
        const link = `${window.location.origin}/tree/${data.tree._id}`;
        setQrCodeValue(link);
      } else {
        alert('Failed to create tree');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Generate Tree QR</h2>
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="species" className="form-label">
                    Species
                  </label>
                  <input
                    type="text"
                    id="species"
                    name="species"
                    className={`form-control ${formik.touched.species && formik.errors.species ? 'is-invalid' : ''}`}
                    value={formik.values.species}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.species && formik.errors.species && (
                    <div className="invalid-feedback">{formik.errors.species}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
                    value={formik.values.age}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="invalid-feedback">{formik.errors.age}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">{formik.errors.description}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                  {imageError && <div className="text-danger mt-2">{imageError}</div>}
                </div>


                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Image Preview and QR Code Section */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          {imageBase64 && (
            <div className="mb-4 text-center">
              <img
                src={imageBase64}
                alt="Tree Preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
          )}
          {qrCodeValue && (
            <div className="text-center">
              <h5>QR Code:</h5>
              <QRCodeSVG value={qrCodeValue} size={200} />
              <p className="mt-3">
                Scan to view tree details or navigate to:
              </p>
              <a href={qrCodeValue} className="text-primary">
                {qrCodeValue}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateQR;
