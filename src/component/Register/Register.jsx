import React, { useContext, useState } from 'react'
import { useFormik } from 'formik' 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Register() {

  let [message, setMessage] = useState('');
  let [loading, setLoading] = useState(false);
  let permission = useContext(userContext);
  let navigate = useNavigate();

  async function formMaipulation(formData) {
    try {
      setLoading(true);

      let response = await axios.post(
        'https://egzone.runasp.net/api/Auth/register',
        formData
      );

      setMessage(response?.data?.message);

      if (response?.data?.message === 'Account Created Successfully') {
        permission.setSignupMessage(response?.data?.message);
        setLoading(false);
        navigate('/login');
      }

    } catch (error) {
      setLoading(false);
      setMessage(error?.response?.data || 'Something went wrong');
    }
  }

  let formObject = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: ""
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .required('Full name is required')
        .min(3, 'min length is 3')
        .max(30, 'max length is 30'),

      email: Yup.string()
        .required('Email is required')
        .email('enter valid email'),

      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^01[1250][0-9]{8}$/, 'Phone number not valid'),

      password: Yup.string()
        .required('Password is required'), // ✅ أي باسورد ينفع
    }),

    onSubmit: formMaipulation,
  });

  return (
    <>
      <Helmet>
        <title>Registeration</title>
      </Helmet>

      <div className="d-flex align-items-center justify-content-center mt-4 mb-4" style={{ minHeight: '70vh' }}>
        <div className="card shadow-lg w-100 p-2" style={{ maxWidth: '550px', minHeight: '580px' }}>
          <div className="card-body">

            <div className="text-center">
              <h1 className="card-title h3 fw-bold" style={{ color: '#198754' }}>Sign Up</h1>
              <p className="card-text text-muted">Sign in below to access your account</p>

              {message && (
                <div className="alert alert-primary">{message}</div>
              )}
            </div>

            <div className="mt-4">
              <form onSubmit={formObject.handleSubmit}>

                {/* Full Name */}
                <div className="mb-4">
                  <label className="form-label text-muted">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formObject.values.fullName}
                    onChange={formObject.handleChange}
                    onBlur={formObject.handleBlur}
                    className="form-control"
                    placeholder="Enter your name"
                  />
                  {formObject.touched.fullName && formObject.errors.fullName && (
                    <div className="alert alert-danger mt-2">{formObject.errors.fullName}</div>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="form-label text-muted">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formObject.values.email}
                    onChange={formObject.handleChange}
                    onBlur={formObject.handleBlur}
                    className="form-control"
                    placeholder="Email Address"
                  />
                  {formObject.touched.email && formObject.errors.email && (
                    <div className="alert alert-danger mt-2">{formObject.errors.email}</div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label text-muted">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formObject.values.password}
                    onChange={formObject.handleChange}
                    onBlur={formObject.handleBlur}
                    className="form-control"
                    placeholder="Password"
                  />
                  {formObject.touched.password && formObject.errors.password && (
                    <div className="alert alert-danger mt-2">{formObject.errors.password}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="form-label text-muted">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formObject.values.phoneNumber}
                    onChange={formObject.handleChange}
                    onBlur={formObject.handleBlur}
                    className="form-control"
                    placeholder="Phone"
                  />
                  {formObject.touched.phoneNumber && formObject.errors.phoneNumber && (
                    <div className="alert alert-danger mt-2">{formObject.errors.phoneNumber}</div>
                  )}
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn-lg fw-bold p-2 rounded border-0"
                    style={{ backgroundColor: '#198754', fontSize: '20px', color: 'white' }}
                    disabled={!(formObject.isValid && formObject.dirty)}
                  >
                    Sign Up
                  </button>

                  <div className="text-center mt-3">
                    {loading && <i className='fa fa-spinner fa-spin'></i>}
                  </div>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}