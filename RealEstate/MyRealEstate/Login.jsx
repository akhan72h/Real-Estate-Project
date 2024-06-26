import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './RealEstate.css'; // Assuming you create a separate CSS file for custom styles
import axios from 'axios';

const validationSchema = yup.object({
    username: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      main: '#1976d2',
    },
  },
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: 'admin@gmail.com',
      password: 'admin123',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     
      // alert("k")
      
      axios.post('http://127.0.0.1:5001/api/user/login', values)
      .then(y=>{
        console.log(y.data)
        localStorage.setItem("token", JSON.stringify(y.data))
      })
      
      
      
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="login-container">
        <form onSubmit={formik.handleSubmit} className="login-form">
        <h2>Login</h2>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            variant="outlined"
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="submit-button"
          >
            Submit
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Login;
