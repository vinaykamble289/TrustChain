
import { useState } from "react";
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { db } from '../firebase/config';
import { collection, addDoc } from "firebase/firestore";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), formData);
      alert('Message sent successfully!');
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to send message');
    }
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 mt-9 ml-15 mr-15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Want To Know More?</h1>
          <h2 className="text-2xl text-gray-700">Reach out to us!</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-md w-full mx-auto md:mx-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-lg font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required={field !== "phone"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 flex items-center justify-center"
              >
                Submit <FaPaperPlane className="ml-2" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-md w-full mx-auto md:mx-0">
            <div className="space-y-6">
              {[
                { icon: <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />, title: "Address", text: "Kolhapur, Maharashtra, India" },
                { icon: <FaPhone className="h-6 w-6 text-blue-600" />, title: "Phone", text: "+123 456 7890" },
                { icon: <FaEnvelope className="h-6 w-6 text-blue-600" />, title: "Email", text: "khade8404@gmail.com" }
              ].map((info, idx) => (
                <div className="flex items-start" key={idx}>
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    {info.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{info.title}</h3>
                    <p className="mt-1 text-lg text-gray-600">{info.text}</p>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emotion Detection Features</h3>
                <ul className="space-y-2 pl-3">
                  {["Real-time Face Detection", "Image Analysis", "Video Emotion Tracking"].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-2">•</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;