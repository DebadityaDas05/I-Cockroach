import React, { useState } from "react";

export default function contactpopup({
  showPopup,
  setShowPopup,
}) {

  const [formData, setFormData] = useState({
    needFor: "",
    budget: "",
    contact: "",
    deadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Request Submitted!");

    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/30
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-xl
          bg-white
          rounded-[28px]
          shadow-2xl
          border
          border-gray-100
          p-7
        "
      >

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="
            absolute
            top-5
            right-5
            w-9
            h-9
            rounded-full
            bg-gray-100
            hover:bg-gray-200
            text-gray-600
            flex
            items-center
            justify-center
          "
        >
          ✕
        </button>

        {/* Heading */}
        <div className="text-center mb-7">

          <p className="text-orange-500 font-semibold tracking-[3px] uppercase text-xs">
            ENGINEERED ARCHITECTURE
          </p>

          <h2 className="text-3xl font-extrabold text-[#0f172a] mt-2">
            Project Request
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Tell us about your requirements.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">

            {/* Need For */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0f172a]">
                Need For
              </label>

              <select
                name="needFor"
                value={formData.needFor}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  bg-[#fafafa]
                  rounded-2xl
                  p-3
                  text-sm
                "
              >
                <option value="">Select</option>
                <option value="Website">Website</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI Model">AI Model</option>
                <option value="UI/UX Design">UI/UX Design</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0f172a]">
                Budget
              </label>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  bg-[#fafafa]
                  rounded-2xl
                  p-3
                  text-sm
                "
              >
                <option value="">Select</option>
                <option value="5k-10k">₹5k - ₹10k</option>
                <option value="10k-25k">₹10k - ₹25k</option>
                <option value="25k-50k">₹25k - ₹50k</option>
                <option value="50k-1L">₹50k - ₹1L</option>
                <option value="1L+">₹1L+</option>
              </select>
            </div>

            {/* Contact */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0f172a]">
                Contact
              </label>

              <input
                type="text"
                name="contact"
                placeholder="Phone / Email"
                value={formData.contact}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  bg-[#fafafa]
                  rounded-2xl
                  p-3
                  text-sm
                "
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-[#0f172a]">
                Deadline
              </label>

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-200
                  bg-[#fafafa]
                  rounded-2xl
                  p-3
                  text-sm
                "
              />
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#0f172a]">
              Project Description
            </label>

            <textarea
              name="description"
              rows="3"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={handleChange}
              className="
                w-full
                border
                border-gray-200
                bg-[#fafafa]
                rounded-2xl
                p-4
                text-sm
                resize-none
              "
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-2xl
              bg-orange-500
              hover:bg-orange-600
              text-white
              font-bold
            "
          >
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );
}