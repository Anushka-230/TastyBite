import React, { useState, useEffect } from "react";
import { MdPeople, MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import { useSignUp } from "@clerk/clerk-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Waiter" | "Chef";
  age: number;
  date_of_joining: string;
  salary: number;
  created_at?: string;
}

const EmployeesPage: React.FC = () => {
  const { employees, setEmployees } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Waiter" as "Admin" | "Waiter" | "Chef",
    age: "",
    date_of_joining: "",
    salary: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:/TastyBite/backend/api/employees/read.php");
      const data = await response.json();
      if (data.data) {
        setEmployees(data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // Note: You'll need to implement delete API
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.date_of_joining ||
      !formData.salary
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:/TastyBite/backend/api/employees/create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          salary: parseFloat(formData.salary)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Add new employee to state
      const newEmployee = {
        ...formData,
        id: data.id,
        age: parseInt(formData.age),
        salary: parseFloat(formData.salary)
      };
      setEmployees([...employees, newEmployee]);

      // Reset form
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Waiter",
        age: "",
        date_of_joining: "",
        salary: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error saving employee");
    }
  };

  const handleOpenNewModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Waiter",
      age: "",
      date_of_joining: "",
      salary: ""
    });
    setIsModalOpen(true);
  };

  const totalEmployees = employees.length;
  const adminCount = employees.filter(emp => emp.role === "Admin").length;
  const waiterCount = employees.filter(emp => emp.role === "Waiter").length;
  const chefCount = employees.filter(emp => emp.role === "Chef").length;

  return (
    <div className="p-5 lg:p-8 space-y-6 h-full overflow-y-auto w-full max-w-7xl mx-auto relative">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <MdPeople size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Admins</p>
            <p className="text-3xl font-bold text-purple-600">{adminCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
            <MdPeople size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Waiters</p>
            <p className="text-3xl font-bold text-green-600">{waiterCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <MdPeople size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Chefs</p>
            <p className="text-3xl font-bold text-orange-600">{chefCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <MdPeople size={24} />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between relative z-10">
        <div className="flex gap-4">
          <button 
            onClick={handleOpenNewModal}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-orange-200 whitespace-nowrap"
          >
            <MdAdd size={20} />
            Add Employee
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden pb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-sm font-bold text-gray-900 bg-white">
                <th className="py-5 px-6">Name</th>
                <th className="py-5 px-6">Email</th>
                <th className="py-5 px-6 w-24">Age</th>
                <th className="py-5 px-6 w-32">Role</th>
                <th className="py-5 px-6 w-40">Date Joined</th>
                <th className="py-5 px-6 w-32">Salary</th>
                <th className="py-5 px-6 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-gray-900">
              {employees.map((employee, idx) => (
                <tr 
                  key={employee.id} 
                  className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors`}
                >
                  <td className="py-4 px-6">{employee.name}</td>
                  <td className="py-4 px-6">{employee.email}</td>
                  <td className="py-4 px-6">{employee.age}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-md text-xs font-bold text-white ${
                      employee.role === 'Admin' ? 'bg-purple-600' :
                      employee.role === 'Waiter' ? 'bg-green-600' : 'bg-orange-600'
                    }`}>
                      {employee.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                  <td className="py-4 px-6">${employee.salary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right flex justify-end gap-2">
                    <button 
                      className="border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(employee.id)}
                      className="border border-red-100 text-red-600 bg-white hover:bg-red-50 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-4 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose size={20} />
              </button>
              <h2 className="text-xl font-bold text-gray-900">Add Employee</h2>
              <p className="text-sm text-gray-500 mt-1">Add a new employee to the system</p>
            </div>

            {/* Form Body */}
            <div className="p-6 pt-2 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name" 
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 text-sm placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com" 
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 text-sm placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-orange-100 transition-all text-gray-900 text-sm placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="25" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Role</label>
                  <div className="relative">
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as "Admin" | "Waiter" | "Chef"})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-500 text-sm appearance-none cursor-pointer"
                    >
                      <option value="Waiter">Waiter</option>
                      <option value="Chef">Chef</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <MdClose className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Joining</label>
                  <input 
                    type="date" 
                    value={formData.date_of_joining}
                    onChange={(e) => setFormData({...formData, date_of_joining: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Salary</label>
                  <input 
                    type="number" 
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="30000" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-5 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-orange-200"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;