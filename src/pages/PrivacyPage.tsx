import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose max-w-none space-y-6">
        <p className="text-gray-600 text-lg">
          Last updated: January 2025
        </p>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-medium text-gray-800 mb-3">Information You Provide</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Listing information (title, description, category, city, tags, price)</li>
            <li>Contact information (email address, phone number) - optional</li>
            <li>Any other information you choose to include in your listings</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-800 mb-3">Information We Automatically Collect</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>IP address (for spam prevention and security)</li>
            <li>Browser type and user agent string</li>
            <li>Date and time of posting</li>
            <li>Basic usage statistics (page views, search queries)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To display your listings on our website</li>
            <li>To prevent spam and abuse (rate limiting by IP address)</li>
            <li>To improve our service and user experience</li>
            <li>To communicate with you about your listings (if you provide contact info)</li>
            <li>To comply with legal requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
          
          <h3 className="text-xl font-medium text-gray-800 mb-3">Public Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            All listing information you post (except IP addresses and user agents) is public and visible to all users of our website. This includes your contact information if you choose to provide it.
          </p>

          <h3 className="text-xl font-medium text-gray-800 mb-3">Private Information</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell, trade, or share your private information (IP addresses, user agents) with third parties except:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>When required by law or legal process</li>
            <li>To protect the rights, property, or safety of our users or service</li>
            <li>In case of a business transfer or acquisition</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Retention</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We retain listing information indefinitely unless you request deletion or we remove it for policy violations. IP addresses and user agent information are retained for security and spam prevention purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website uses minimal cookies for essential functionality. We do not use tracking cookies or third-party analytics services. We do not track users across other websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use Supabase for database hosting and may use other essential services. These providers have their own privacy policies and data handling practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement reasonable security measures to protect your information, including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Database security through Supabase's security measures</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Regular security updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-2">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Request removal of your listings</li>
            <li>Request information about data we have collected about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Report privacy concerns to us</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="/contact" className="text-blue-600 hover:underline">our contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
};