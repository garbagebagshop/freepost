import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose max-w-none space-y-6">
        <p className="text-gray-600 text-lg">
          Last updated: January 2025
        </p>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using FreePostIndia.com ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FreePostIndia.com provides a free classified advertising platform where users can post and browse advertisements for various products and services. We are a platform only and do not participate in transactions between users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>You must provide accurate and complete information in your listings</li>
            <li>You are solely responsible for your listings and any consequences of posting them</li>
            <li>You must not post illegal, fraudulent, or inappropriate content</li>
            <li>You must comply with all applicable local, state, and federal laws</li>
            <li>You are limited to posting one ad per IP address per 24-hour period</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Content</h2>
          <p className="text-gray-700 leading-relaxed mb-2">The following types of content are strictly prohibited:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Adult services or content</li>
            <li>Illegal goods or services</li>
            <li>Weapons, drugs, or other restricted items</li>
            <li>Copyrighted material without permission</li>
            <li>Spam, duplicate, or misleading ads</li>
            <li>Personal information of others without consent</li>
            <li>Hate speech or discriminatory content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Disclaimer of Responsibility</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
            <p className="text-red-700">
              FreePostIndia.com is NOT responsible for transactions between users. We do not verify listings, 
              collect payments, or guarantee the accuracy of information posted. All transactions are at your own risk.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Content Moderation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to review, modify, or remove any content at our discretion. All listings require approval before publication. We may reject listings that violate these terms or our policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            FreePostIndia.com shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of our service, including but not limited to damages from transactions with other users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect minimal personal information as outlined in our Privacy Policy. We may store IP addresses and user agents for spam prevention and security purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Termination</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may terminate or suspend access to our service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users or our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about these Terms of Service, please contact us at{' '}
            <a href="/contact" className="text-blue-600 hover:underline">our contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};