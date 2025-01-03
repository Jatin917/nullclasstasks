import React, { useState } from 'react';
import { staticTranslator } from '../../services';
import { otpEmailVerification, sendOtpEmailVerification, sendOtpSmsVerification } from '../../api';

const LanguageVerificationModal = ({ 
  isOpen, 
  onClose, 
  onLanguageChange,
  currentLanguage,
  pendingLanguage
}) => {
  const [step, setStep] = useState('verification');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if(pendingLanguage === "fr") {
        await sendOtpSmsVerification(phoneNumber);
      } else {
        await sendOtpEmailVerification(email);
      }
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
      const {status} = await otpEmailVerification(otp, pendingLanguage === "fr" ? phoneNumber : email);
      if(status === 200) {
        onLanguageChange();
      } else {
        throw Error("Verification Failed");
      }
    } catch (err) {
      setError(staticTranslator('Invalid OTP. Please try again.', currentLanguage));
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    setLoading(false);
    setStep('verification');
    setEmail('');
    setPhoneNumber('');
    setOtp('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '28rem',
          margin: '0 1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
            }}
          >
            {staticTranslator('Verify Your Identity', currentLanguage)}
          </h2>
          <button
            onClick={handleClose}
            style={{
              color: '#6B7280',
              border:"none",
              outline:"none",
              hover: {
                color: '#4B5563',
              },
            }}
          >
            ×
          </button>
        </div>
  
        {error && (
          <div
            style={{
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              padding: '1rem 1.5rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
            }}
          >
            {error}
          </div>
        )}
  
        {step === 'verification' ? (
          <form onSubmit={handleVerificationSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                }}
              >
                {pendingLanguage === 'fr'
                  ? staticTranslator('Enter your phone number with country code to receive verification code', currentLanguage)
                  : staticTranslator('Enter your email address to receive verification code', currentLanguage)}
              </label>
              {pendingLanguage === 'fr' ? (
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #E5E7EB',
                  }}
                  placeholder={staticTranslator('Phone number', currentLanguage)}
                  required
                />
              ) : (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid #E5E7EB',
                  }}
                  placeholder={staticTranslator('Email address', currentLanguage)}
                  required
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? staticTranslator('Sending...', currentLanguage) : staticTranslator('Send Verification Code', currentLanguage)}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify}>
            <div style={{ marginBottom: '1rem' }}>
              <label
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                }}
              >
                {staticTranslator('Enter the verification code sent to', currentLanguage)} {pendingLanguage === 'fr' ? phoneNumber : email}
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #E5E7EB',
                }}
                placeholder={staticTranslator('Enter OTP', currentLanguage)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
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