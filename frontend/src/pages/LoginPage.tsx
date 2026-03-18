import React, { useState, useRef, useEffect } from "react";
import { LuChefHat } from "react-icons/lu";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

interface LoginPageProps {
  onLogin: () => void;
}

const roles = ["Admin", "Waiter", "Kitchen Staff"];

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [role, setRole] = useState("Admin");
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF6E9] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[24px] shadow-sm p-8 sm:p-10 max-w-[420px] w-full mt-4 mb-4">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center mb-5">
            <LuChefHat size={32} className="text-white" />
          </div>
          <h1 className="text-[28px] font-semibold text-gray-900 mb-2 tracking-tight">TastyBite Restaurant</h1>
          <p className="text-[15px] text-gray-500">Sign in to access the management system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role Dropdown */}
          <div className="space-y-2" ref={dropdownRef}>
            <label className="block text-[15px] font-medium text-gray-900 flex">Role</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#f4f5f7] text-left px-4 py-3 rounded-xl flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors"
              >
                <span className="text-gray-900 text-[15px]">{role}</span>
                <MdKeyboardArrowDown className={`text-gray-400 text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-1.5 overflow-hidden translate-y-0">
                  {roles.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[15px] flex items-center justify-between transition-colors
                        ${role === r ? 'bg-[#FFF7ED] text-[#F97316]' : 'text-gray-700 hover:bg-gray-50'}
                      `}
                    >
                      <span>{r}</span>
                      {role === r && <MdCheck className="text-[#F97316] text-lg" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium text-gray-900 flex">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[#f4f5f7] text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors text-[15px]"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[15px] font-medium text-gray-900 flex">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#f4f5f7] text-gray-900 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-colors text-[15px]"
              required
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-medium py-3 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-1 text-[16px]"
            >
              Sign In
            </button>
          </div>

          <div className="text-center pt-3">
            <button type="button" className="text-[#F97316] hover:text-[#EA580C] font-medium text-[15px] transition-colors">
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
