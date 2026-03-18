import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <SignUp
          routing="virtual"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignUpPage;