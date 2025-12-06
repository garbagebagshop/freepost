import React, { useState } from 'react';
import { Mail, MessageCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-green-800 mb-4">Message Sent!</h2>
        <p className="text-green-700 mb-6">
          Thank you for contacting us. We'll review your message and respond within 2-3 business days if a response is required.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <MessageCircle className="mx-auto text-blue-600 mb-4" size={48} />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or need help? Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="report">Report a Listing</option>
                  <option value="feedback">Feedback/Suggestions</option>
                  <option value="business">Business Inquiry</option>
                  <option value="legal">Legal/Copyright</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide details about your inquiry, including any relevant listing IDs or URLs if applicable..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Sending...</span>
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Response Time */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Mail className="text-blue-600 mb-3" size={24} />
            <h3 className="font-semibold text-blue-800 mb-2">Response Time</h3>
            <p className="text-blue-700 text-sm">
              We typically respond to messages within 2-3 business days. For urgent issues, 
              please specify in your message.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <AlertTriangle className="text-yellow-600 mb-3" size={24} />
            <h3 className="font-semibold text-yellow-800 mb-2">Please Note</h3>
            <ul className="text-yellow-700 text-sm space-y-2">
              <li>• We cannot mediate disputes between buyers and sellers</li>
              <li>• We don't provide refunds or compensation for transactions</li>
              <li>• For safety concerns, please also contact local authorities</li>
              <li>• We cannot verify the authenticity of listings</li>
            </ul>
          </div>

          {/* Reporting Issues */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-800 mb-2">Reporting Issues</h3>
            <p className="text-red-700 text-sm mb-3">
              To report problematic listings, please include:
            </p>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Listing ID or URL</li>
              <li>• Specific issue description</li>
              <li>• Screenshots if applicable</li>
              <li>• Your contact information</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Common Questions</h3>
            <div className="text-gray-700 text-sm space-y-3">
              <div>
                <p className="font-medium">How do I delete my listing?</p>
                <p>Listings automatically expire after 30 days. For immediate removal, contact us with the listing ID.</p>
              </div>
              
              <div>
                <p className="font-medium">Why isn't my listing showing up?</p>
                <p>All listings require approval, which typically takes 2-24 hours.</p>
              </div>
              
              <div>
                <p className="font-medium">Can I edit my listing?</p>
                <p>Currently, listings cannot be edited. You can post a new one and we'll remove the old one.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};