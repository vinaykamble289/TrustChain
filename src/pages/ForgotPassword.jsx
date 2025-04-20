import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase/config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email input, 2: password reset
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [oobCode, setOobCode] = useState("");
  const navigate = useNavigate();

  // Extract oobCode from URL if present (for password reset link)
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('oobCode');
    if (code) {
      setOobCode(code);
      setStep(2);
    }
  }, []);

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(`Password reset link sent to ${email}. Please check your inbox.`);
    } catch (error) {
      let errorMessage = "Failed to send reset link. Please try again.";
      
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccess("Password reset successfully! You can now login with your new password.");
      
      // Auto-navigate to login after 3 seconds
      setTimeout(() => {
        navigate("/login", { state: { prefilledEmail: email } });
      }, 3000);
    } catch (error) {
      let errorMessage = "Failed to reset password. Please try again.";
      
      switch (error.code) {
        case "auth/expired-action-code":
          errorMessage = "The reset link has expired. Please request a new one.";
          break;
        case "auth/invalid-action-code":
          errorMessage = "Invalid reset link. Please request a new one.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage = "No account found with this email.";
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen mt-18">
      {/* Left: Cover (same as login) */}
      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center text-white bg-cover bg-center "
        // style={{ backgroundImage: "url('img7.webp')" }}
      >
        <div className="relative text-black min-h-screen flex items-center justify-center bg-blue-900 -ml-5 -mt-15">
          <div className="relative px-8 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
            <h3 className="text-xl font-semibold mb-8">
              Secure access to your account
            </h3>
            <p className="text-lg text-bg-black-300 mb-12">
              "Your security is our priority. Reset your password securely and continue your journey."
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-8 -mt-15">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-wide">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-md text-gray-600 mt-2">
            {step === 1 
              ? "Enter your email to receive a reset link" 
              : "Enter your new password"}
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendResetLink} className="mt-4 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>

              <div className="text-center text-sm">
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    required
                    minLength="6"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="New Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    required
                    minLength="6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaCheck className="mr-2" />
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;