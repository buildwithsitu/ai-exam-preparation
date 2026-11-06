import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div>
        <h1 className="text-3xl font-black text-[#120E2C]">Contact &amp; Student Support</h1>
        <p className="text-gray-500 text-sm mt-1">Have questions or feedback? We are here to support your preparation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        <div className="md:col-span-5 bg-[#120E2C] text-white p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Get In Touch</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              We respond promptly to student support requests and platform feedback.
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#5B3CE8]" />
                <a href="mailto:situsavvy1111@gmail.com" className="hover:underline">
                  situsavvy1111@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#5B3CE8]" />
                <span>JNU, New Delhi, India</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-gray-400">
            ExamMate AI Help Desk
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-4xl">🎉</span>
              <h3 className="text-lg font-bold text-[#120E2C]">Message Sent!</h3>
              <p className="text-xs text-gray-500">Thank you for reaching out. We will respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Situ Chandra"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help your preparation?"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B3CE8]/20 focus:border-[#5B3CE8]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pill-purple py-3 text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
