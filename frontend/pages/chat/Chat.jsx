import React, { useState } from 'react';
import axios from 'axios';
const RaiseTicket = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(true);
  const [otpVerified, setOtpVerified] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/send-otp`, { email });
      setOtpSent(true);
      setSuccess(response.data.message);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError('');
      setSuccess('');
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/verify-otp`, { email, otp });
      if (response.status === 200) {
        setOtpVerified(true);
        setSuccess('OTP verified successfully!');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit title, description, and category to your backend here
    // Example:
    // await axios.post('/api/submit-form', { email, title, description, category });
    alert('Form submitted!');
  };

  return (
    <div className="verification-container">
      {!otpVerified && <form className='verification-form'>
        <h2>Verify your Email here</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {!otpSent && (
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </div>
        )}

        {otpSent && !otpVerified && (
          <div className="input-group">
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              required
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
      </form>}

      {/* raise ticket form html */}
      <div className="raise-container">
        <div className='ticket-raise-form'>
        {otpVerified && (
          <form onSubmit={handleSubmit} className="raise-form">
            <h2>Raise your ticket here!</h2>
            <div className="input-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <br />
            <div className="input-group">
              <label>Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                required
              />
            </div>
            <br />
            <div className="input-group">
              <label>Description:</label>
              <br />
              <textarea
                value={description}
                id='raise-description'
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              ></textarea>
            </div>

            <button className='raise-button' type="submit">Submit</button>
          </form>
        )}
        </div>
        </div>
    </div>
  );
};

export default RaiseTicket;
