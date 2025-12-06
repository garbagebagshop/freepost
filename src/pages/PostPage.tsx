import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import { supabase, categories, categoryLabels } from '../lib/supabase';
import { profanityFilter, checkRateLimit, updateRateLimit, getUserIP, validateEmail, validatePhone } from '../lib/utils';

export const PostPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    city: '',
    tags: '',
    price: '',
    contact_email: '',
    contact_phone: ''
  });
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (formData.title.length < 10 || formData.title.length > 200) {
      errors.push('Title must be between 10-200 characters');
    }

    if (!formData.category) {
      errors.push('Please select a category');
    }

    if (formData.description.length < 20 || formData.description.length > 5000) {
      errors.push('Description must be between 20-5000 characters');
    }

    if (!formData.city.trim()) {
      errors.push('City is required');
    }

    if (formData.contact_email && !validateEmail(formData.contact_email)) {
      errors.push('Please enter a valid email address');
    }

    if (formData.contact_phone && !validatePhone(formData.contact_phone)) {
      errors.push('Please enter a valid phone number');
    }

    if (!formData.contact_email && !formData.contact_phone) {
      errors.push('Please provide at least one contact method (email or phone)');
    }

    if (!profanityFilter(formData.title + ' ' + formData.description)) {
      errors.push('Content contains inappropriate language');
    }

    if (!captchaChecked) {
      errors.push('Please verify you are not a robot');
    }

    if (!termsAccepted) {
      errors.push('Please accept the terms of service');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      // Validate form
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      // Get user IP
      const userIP = await getUserIP();
      
      // Check rate limit
      const canPost = await checkRateLimit(userIP);
      if (!canPost) {
        setErrors(['You can only post one ad per 24 hours. Please try again later.']);
        return;
      }

      // Parse tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .slice(0, 10); // Limit to 10 tags

      // Submit listing
      const { error } = await supabase
        .from('listings')
        .insert([{
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          city: formData.city.trim(),
          tags: tagsArray,
          price: formData.price.trim() || null,
          contact_email: formData.contact_email.trim() || null,
          contact_phone: formData.contact_phone.trim() || null,
          posted_ip: userIP,
          posted_by: navigator.userAgent
        }]);

      if (error) throw error;

      // Update rate limit
      await updateRateLimit(userIP);

      setSuccess(true);
      setFormData({
        title: '',
        category: '',
        description: '',
        city: '',
        tags: '',
        price: '',
        contact_email: '',
        contact_phone: ''
      });
      setCaptchaChecked(false);
      setTermsAccepted(false);

    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Failed to submit listing. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-green-800 mb-4">Ad Submitted Successfully!</h2>
          <p className="text-green-700 mb-6">
            Your listing has been submitted and is pending approval. It will be reviewed within 24 hours 
            and published once approved.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors mr-4"
            >
              Post Another Ad
            </button>
            <a
              href="/"
              className="bg-white border border-green-300 text-green-700 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Your Free Ad</h1>
        <p className="text-gray-600">
          Fill out the form below to post your classified ad. It's completely free and takes just a few minutes.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-red-600 mt-0.5" size={20} />
          <div>
            <p className="text-red-700 text-sm">
              <strong>Important:</strong> We are not responsible for transactions. We don't collect payments 
              or verify listings. All communication happens directly between buyers and sellers.
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-red-800 mb-2">Please fix the following errors:</h3>
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Ad Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 2018 Honda City for Sale in Mumbai"
            maxLength={200}
            required
          />
          <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Provide detailed information about your item or service..."
            maxLength={5000}
            required
          />
          <p className="text-xs text-gray-500 mt-1">{formData.description.length}/5000 characters</p>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Mumbai, Delhi, Bangalore"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (Optional)
          </label>
          <input
            type="text"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., ₹50,000, Negotiable, Free"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Optional)
          </label>
          <input
            type="text"
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="comma, separated, tags"
          />
          <p className="text-xs text-gray-500 mt-1">Add relevant keywords separated by commas</p>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-medium text-gray-900">Contact Information</h3>
          
          <div>
            <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="contact_email"
              value={formData.contact_email}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="contact_phone"
              value={formData.contact_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 9876543210"
            />
          </div>
          
          <p className="text-xs text-gray-600">
            Provide at least one contact method. This information will be visible to potential buyers.
          </p>
        </div>

        {/* CAPTCHA */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="captcha"
            checked={captchaChecked}
            onChange={(e) => setCaptchaChecked(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="captcha" className="text-sm text-gray-700">
            I am not a robot *
          </label>
        </div>

        {/* Terms */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and confirm that my ad complies with all applicable laws *
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Post My Ad</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};