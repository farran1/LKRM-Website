import React, { useState } from "react";
import { Link } from "react-router-dom";

const Apply = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formspree.io/f/xnnvqddv", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await response.json();
      if (data.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lk-background px-4">
      <form
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Apply Now</h2>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="highschool">High School</label>
          <input
            id="highschool"
            name="highschool"
            type="text"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {success && (
          <div className="text-green-600 text-center font-semibold">Thank you! Your application has been submitted.</div>
        )}
        {error && (
          <div className="text-red-600 text-center font-semibold">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Apply;
