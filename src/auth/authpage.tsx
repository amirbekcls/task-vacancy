import React from "react";
import backgroundImage from "../assets/bg-image.jpg"; // Bitta rasm ishlatiladi

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-cover w-full bg-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        {children} {/* Login yoki Register joylashadi */}
      </div>
    </div>
  );
};

export default AuthPage;
