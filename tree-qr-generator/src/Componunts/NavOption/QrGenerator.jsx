import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const GenerateQR = () => {
  const [imageBase64, setImageBase64] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      species: '',
      age: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      species: Yup.string().required('Species is required'),
      age: Yup.number()
        .required('Age is required')
        .positive('Age must be positive')
        .integer('Age must be an integer'),
    }),
    onSubmit: (values) => {
      const id = Date.now().toString();
      const treeData = { ...values, image: imageBase64 };
      localStorage.setItem(id, JSON.stringify(treeData));

      const link = `${window.location.origin}/tree/${id}`;
      setQrCodeValue(link);

    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
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
                    className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''
                      }`}
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
                    className={`form-control ${formik.touched.species && formik.errors.species ? 'is-invalid' : ''
                      }`}
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
                    className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''
                      }`}
                    value={formik.values.age}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.age && formik.errors.age && (
                    <div className="invalid-feedback">{formik.errors.age}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Image Preview and QR Code Section */}
        <div className="col-md-6">
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
