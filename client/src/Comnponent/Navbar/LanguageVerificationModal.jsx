import React, { useState } from 'react';
import { staticTranslator } from '../../services';
import { otpEmailVerification, sendOtpEmailVerification } from '../../api';

const LanguageVerificationModal = ({ 
  isOpen, 
  onClose, 
  onLanguageChange,
  currentLanguage 
}) => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendOtpEmailVerification(email);
      setStep('otp');
    } catch (err) {
      setError(staticTranslator('Failed to send OTP. Please try again.', currentLanguage));
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        const {status} = await otpEmailVerification(otp, email);
      if(status===200){
          onLanguageChange();
      }
      else{
        throw Error("Verification Failed")
      }
    } catch (err) {
      setError(staticTranslator('Invalid OTP. Please try again.', currentLanguage));
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setLoading(false);
    setStep('email');
    setEmail('');
    setOtp('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{staticTranslator("Verify Your Identity", currentLanguage)}</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {staticTranslator("Enter your email address to receive verification code", currentLanguage)}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={staticTranslator("Email address", currentLanguage)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? staticTranslator('Sending...', currentLanguage) : staticTranslator('Send Verification Code', currentLanguage)}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {staticTranslator("Enter the verification code sent to", currentLanguage)} {email}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder={staticTranslator("Enter OTP", currentLanguage)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? staticTranslator('Verifying...', currentLanguage) : staticTranslator('Verify', currentLanguage)}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LanguageVerificationModal;