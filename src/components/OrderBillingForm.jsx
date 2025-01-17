import React, { useState } from "react";

const OrderBillingForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    status: "Pending",
    tracking: `TRACK-${Date.now()}`,
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "firstName" || name === "lastName") {
      setFormData((prev) => ({
        ...prev,
        fullName: `${prev.firstName} ${prev.lastName}`.trim(),
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip || formData.zip.length !== 5) {
      newErrors.zip = "Zip Code must be 5 digits";
    }
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setPopupMessage("Order placed successfully!");
    } else {
      setPopupMessage("Please fill out the form correctly before submitting.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {popupMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded shadow-lg z-50">
          {popupMessage}
        </div>
      )}
      <form
        className={`w-full max-w-5xl p-6 rounded-lg shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order Billing Form</h1>
          <label className="flex items-center space-x-3">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="toggle-checkbox hidden"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner toggle-track">
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              ></div>
            </div>
          </label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            {[
              { label: "Email", name: "email", type: "email", required: true },
              { label: "First Name", name: "firstName", type: "text", required: true },
              { label: "Last Name", name: "lastName", type: "text", required: true },
              { label: "Full Name", name: "fullName", type: "text", readOnly: true },
              { label: "Status", name: "status", type: "text", readOnly: true },
              { label: "Tracking", name: "tracking", type: "text", readOnly: true },
            ].map(({ label, name, type, required, readOnly }) => (
              <div key={name} className="mb-4">
                <label className="block mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  readOnly={readOnly}
                  className={`w-full p-3 border rounded-md outline-none transition-colors duration-300 ${
                    darkMode
                      ? readOnly
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-700 border-gray-600 text-gray-100 focus:ring focus:ring-blue-400"
                      : readOnly
                      ? "bg-gray-100 text-gray-600"
                      : "bg-white border-gray-300 text-gray-900 focus:ring focus:ring-blue-400"
                  }`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Address Information</h2>
            {[
              { label: "Address", name: "address", type: "text", required: true },
              { label: "Address 2", name: "address2", type: "text" },
              { label: "City", name: "city", type: "text", required: true },
              { label: "State", name: "state", type: "text", required: true },
              { label: "Zip Code", name: "zip", type: "text", required: true },
              { label: "Country", name: "country", type: "text", required: true },
            ].map(({ label, name, type, required }) => (
              <div key={name} className="mb-4">
                <label className="block mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md outline-none transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring focus:ring-blue-400"
                      : "bg-white border-gray-300 text-gray-900 focus:ring focus:ring-blue-400"
                  }`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderBillingForm;
