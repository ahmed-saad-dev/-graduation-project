import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../Context/userContext';
import { Helmet } from 'react-helmet';

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const permission = useContext(userContext);

  // ================= LOGIN FUNCTION =================
  async function formMaipulation(values) {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        'https://egzone.runasp.net/api/Auth/login',
        values
      );

      if (response?.data?.token) {

        const token = response.data.token;

        // ✅ إزالة الـ quotes الزيادة من التوكن
        const cleanToken = token.replace(/'/g, "");

        localStorage.setItem('userToken', cleanToken);
        permission.setLogin(cleanToken);

        setLoading(false);
        navigate('/');
      }

    } catch (error) {
      setLoading(false);
      setMessage(error?.response?.data?.message || "Login failed");
    }
  }

  // ================= FORMIK =================
  const formObject = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email is required')
        .email('Enter valid email'),

      password: Yup.string()
        .required('Password is required'),
    }),

    onSubmit: formMaipulation,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="d-flex align-items-center justify-content-center mt-4 mb-4"
        style={{ minHeight: '70vh' }}>

        <div className="card shadow-lg w-100 p-3"
          style={{ maxWidth: '550px' }}>

          <div className="text-center">
            <h1 className="fw-bold" style={{ color: '#198754' }}>
              Sign In
            </h1>
          </div>

          {/* ERROR MESSAGE */}
          {message && (
            <div className="alert alert-danger text-center mt-2">
              {message}
            </div>
          )}

          <form onSubmit={formObject.handleSubmit} className="mt-3">

            {/* EMAIL */}
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formObject.values.email}
                onChange={formObject.handleChange}
                onBlur={formObject.handleBlur}
              />

              {formObject.touched.email && formObject.errors.email && (
                <div className="text-danger mt-1">
                  {formObject.errors.email}
                </div>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formObject.values.password}
                onChange={formObject.handleChange}
                onBlur={formObject.handleBlur}
              />

              {formObject.touched.password && formObject.errors.password && (
                <div className="text-danger mt-1">
                  {formObject.errors.password}
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn w-100 fw-bold text-white"
              style={{ backgroundColor: '#198754' }}
              disabled={!(formObject.isValid && formObject.dirty)}
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center mt-3">
              Don't have account?{" "}
              <a href="/register" className="text-success">
                Sign up
              </a>
            </p>

          </form>

        </div>
      </div>
    </>
  );
}