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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>
      <form
        className="relative bg-white/80 dark:bg-white/10 backdrop-blur-md border border-white/40 shadow-xl rounded-2xl p-6 md:p-7 w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
          >
            <span className="mr-1">←</span> Back to Home
          </Link>
        </div>
        <div className="mb-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Apply Now</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Tell us a bit about you to get started.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-200 mb-1 text-sm" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 mb-1 text-sm" htmlFor="highschool">High School</label>
            <input
              id="highschool"
              name="highschool"
              type="text"
              required
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 mb-1 text-sm" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200 mb-1 text-sm" htmlFor="referral">Referral Code?</label>
            <input
              id="referral"
              name="referral"
              type="text"
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-slate-700 dark:text-slate-200 mb-1 text-sm" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {success && (
          <div className="mt-4 rounded-md border border-green-200 bg-green-50 text-green-800 text-sm px-3 py-2 text-center">Thank you! Your application has been submitted.</div>
        )}
        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 text-red-800 text-sm px-3 py-2 text-center">{error}</div>
        )}
        <button
          type="submit"
          className="mt-5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-md shadow hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default Apply;
