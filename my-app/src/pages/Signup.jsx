import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { TextField, Snackbar, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../style/App.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupCompleted, setSignupCompleted] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const addPostSignup = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/auth/user_signup";
      const response = await axios.post(
        url,
        { name, email, password, confirmPassword },
        { withCredentials: true }
      );
      console.log(response);

      if (response.data.success) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSignupCompleted(true);
      }
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while signing up. Please fill the correct details."
      );
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (signupCompleted) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div>
      <Layout>
        <form className="formData mt-20 mb-20" onSubmit={addPostSignup}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <img src="/src/images/signin.png" alt="" width={"50px"} />
          </div>
          <h1 className="font-bold text-gray-700 text-2xl">
            Sign up to create account
          </h1>
          <h2 className="font-semibold text-gray-500 ">
            Already have an account? Sign In{" "}
          </h2>

          <div className="form_container">
            <h3>
              <label className="font-semibold text-gray-600">Name: </label>
            </h3>
            <div className="input-name">
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-email">
              <h3>
                <label className="font-semibold text-gray-600">Email: </label>
              </h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-password">
              <h3>
                <label className="font-semibold text-gray-600">
                  Password:{" "}
                </label>
              </h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="input-field"
              />
            </div>

            <div className="input-confirmpass">
              <h3>
                <label className="font-semibold text-gray-600">
                  Confirm Password:{" "}
                </label>
              </h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="input-field"
              />
            </div>

            <div className="submit-button-container">
              <button className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">
                <b>Sign up</b>
              </button>
            </div>
          </div>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={error}
        />
      </Layout>
    </div>
  );
};

export default Signup;
