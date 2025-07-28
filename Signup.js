// /components/Signup.js
import React, { useState } from 'react';
import '../index.css';

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', password: '', confirmPassword: '', agree: false,
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agree) newErrors.agree = 'Must accept terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const nextStep = () => { if (validateStep1()) setStep(2); };
  const prevStep = () => setStep(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      alert('✅ Registration Completed Successfully!');
      console.log(formData);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="tabs">
          <div className={step === 1 ? 'tab active' : 'tab'}>💡 Personal Info</div>
          <div className={step === 2 ? 'tab active' : 'tab'}>⭐ Security</div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="input-group">
                <label>Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div className="input-group">
                <label>Mobile Number</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile" />
                {errors.mobile && <span className="error">{errors.mobile}</span>}
              </div>
              <div className="input-group full-width">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <button type="button" className="primary-btn" onClick={nextStep}>Continue to Security Setup</button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="input-group">
                <label>Create Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
              <div className="checkbox">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
                <label>I agree to <a href="#">Terms</a> and <a href="#">Privacy</a></label>
              </div>
              {errors.agree && <span className="error">{errors.agree}</span>}

              <div className="button-row">
                <button type="button" className="secondary-btn" onClick={prevStep}>Back</button>
                <button type="submit" className="primary-btn">Complete Registration</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
