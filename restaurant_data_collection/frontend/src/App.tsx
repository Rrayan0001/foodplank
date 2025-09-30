import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import "./App.css";

interface FormData {
  name: string;
  phone: string;
  area?: string;
  marketing: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    area: "",
    marketing: true,
  });

  // Set background image (can be overridden with VITE_BG_URL)
  useEffect(() => {
    // Default to the local file served from Vite public dir
    const bgUrl = (import.meta as any).env?.VITE_BG_URL || "/bg_image.jpeg";

    const { style } = document.body;
    const prev = {
      backgroundImage: style.backgroundImage,
      backgroundSize: style.backgroundSize,
      backgroundPosition: style.backgroundPosition,
      backgroundAttachment: style.backgroundAttachment,
      backgroundRepeat: style.backgroundRepeat,
    };
    style.backgroundImage = `url('${bgUrl}')`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
    style.backgroundAttachment = "fixed";
    style.backgroundRepeat = "no-repeat";

    return () => {
      style.backgroundImage = prev.backgroundImage;
      style.backgroundSize = prev.backgroundSize;
      style.backgroundPosition = prev.backgroundPosition;
      style.backgroundAttachment = prev.backgroundAttachment;
      style.backgroundRepeat = prev.backgroundRepeat;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("customers")
        .insert([formData]);
      if (error) throw error;
      alert("Details saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div className="container">
      <h1>Stay Connected 🍴</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Area (Optional):
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            name="marketing"
            checked={formData.marketing}
            onChange={handleChange}
          />
          Accept Marketing Messages
        </label>

        <button type="submit">Save My Details</button>
      </form>
      <footer>
        <p>We respect your privacy (except for sending offers). 😉</p>
      </footer>
    </div>
  );
}

export default App;
