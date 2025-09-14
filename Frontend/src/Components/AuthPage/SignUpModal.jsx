import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebookF,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaTimes,
} from "react-icons/fa";
import "./SignUpModal.css";
import Swal from "sweetalert2";

const SignUpModal = () => {
  const navigateTo = useNavigate();
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    UserName: "",
    Email: "",
    Password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === "signup" && !formData.UserName.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (activeTab !== "phone") {
      if (!formData.Email.trim()) {
        newErrors.email = "Please enter your email";
      } else if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]{2,}$/.test(formData.Email)) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.Password) {
        newErrors.password =
          activeTab === "signup"
            ? "Please create a password"
            : "Please enter your password";
      } else if (
        activeTab === "signup" &&
        !/^[A-Z][A-Za-z0-9!@#]{6,}/.test(formData.Password)
      ) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      if (activeTab === "login") {
        const response = await handleLogin();
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message.includes("Incorrec"));
          if (data.message.includes("Incorrect")) {
            setErrors((prev) => ({
              ...prev,
              password: data.message,
            }));
            return;
          } else {
            setErrors((prev) => ({
              ...prev,
              email: data.message,
            }));
            Swal.fire({
              title: "Login Failed",
              text: "User not found. Please create your account before login",
            });
            return;
          }
        }
        if (data.status) {
          Swal.fire({
            title: "Done",
            text: "Login successful",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigateTo("/home");
            }
          });
        }
      } else {
        const response = await handleEmailSignup();
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Request failed");
        }

        const data = await response.json();
        if (data.exists) {
          setActiveTab("signup");
          Swal.fire({
            title: "Registration",
            text: "You can directly login now. User is aready existed",
          });
          return;
        } else {
          Swal.fire({
            title: "Done",
            text: "Registration successful",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setActiveTab("login");
            }
          });
          return;
        }
      }
    } catch (error) {
      return error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailSignup = async () => {
    const response = await fetch("http://localhost:3000/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return response;
    // console.log(response);
  };

  const handleLogin = async () => {
    // console.log(formData);
    const response = await fetch("http://localhost:3000/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response;
  };

  // const handlePhoneSignup = async () => {
  //   return await fetch(API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       phone: formData.phone.trim(),
  //       createdAt: new Date().toISOString(),
  //     }),
  //   });
  // };

  // if (success) {
  //   return (
  //     <div className="signup-modal-overlay">
  //       <div className="signup-modal success-animation">
  //         <div className="checkmark">✓</div>
  //         <h2>Success!</h2>
  //         <p>
  //           {activeTab === "login"
  //             ? "You're now logged in!"
  //             : "Account created successfully!"}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="signup-modal-overlay">
      <div className="signup-modal">
        <div className="signup-tabs">
          <button
            className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Log In
          </button>
        </div>

        <div className="signup-content">
          <h2>{activeTab === "signup" ? "Create Account" : "Welcome Back"}</h2>

          <div className="social-buttons">
            <button type="button" className="social-button google">
              <FaGoogle className="social-icon" />
              Continue with Google
            </button>
            <button type="button" className="social-button facebook">
              <FaFacebookF className="social-icon" />
              Continue with Facebook
            </button>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === "signup" && (
              <div className="formGroup">
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="UserName"
                    placeholder="Full Name"
                    value={formData.UserName}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                </div>
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>
            )}

            <>
              <div className="formGroup">
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="Email"
                    placeholder="Email Address"
                    value={formData.Email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="formGroup">
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="Password"
                    placeholder={
                      activeTab === "signup" ? "Create Password" : "Password"
                    }
                    value={formData.Password}
                    onChange={handleChange}
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>
            </>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : activeTab === "signup" ? (
                "Sign Up"
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>

        <div className="signup-footer">
          {activeTab === "signup" ? (
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setActiveTab("login")}>
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={() => setActiveTab("signup")}>
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
