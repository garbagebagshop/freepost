import React from 'react';
import { AlertTriangle, Shield, Eye, Users } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <AlertTriangle className="mx-auto text-red-600 mb-4" size={48} />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Important information about using FreePostIndia.com and our limitations of responsibility.
        </p>
      </div>

      {/* Main Disclaimer */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">WE ARE NOT RESPONSIBLE FOR TRANSACTIONS</h2>
          <p className="text-red-700 text-lg leading-relaxed">
            <strong>FreePostIndia.com does not collect payments, verify listings, or participate in transactions between users.</strong> 
            We are a free classified advertising platform only. All transactions are entirely between buyers and sellers at their own risk.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Platform Role */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Eye className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Role as a Platform</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">What We Do:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide a free platform to post classified advertisements</li>
                    <li>Moderate content for inappropriate or illegal material</li>
                    <li>Implement basic spam and abuse prevention measures</li>
                    <li>Provide safety guidelines and tips to users</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">What We Don't Do:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verify the accuracy of listings or seller information</li>
                    <li>Collect or process payments between users</li>
                    <li>Guarantee the quality, safety, or legality of items/services</li>
                    <li>Provide customer support for transactions</li>
                    <li>Mediate disputes between buyers and sellers</li>
                    <li>Provide refunds or compensation for failed transactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Responsibility */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Users className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">User Responsibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>You are solely responsible for:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Verifying the accuracy and legitimacy of listings</li>
                <li>Researching sellers and items before making purchases</li>
                <li>Meeting safety guidelines when conducting transactions</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Protecting your personal and financial information</li>
                <li>Resolving any disputes that may arise from transactions</li>
                <li>Ensuring items you sell are legally owned and properly described</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Shield className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>FreePostIndia.com shall not be liable for any direct, indirect, incidental, special, 
                  consequential, or punitive damages</strong> arising from or related to:
                </p>
                
                <ul className="list-disc list-inside space-y-2">
                  <li>Transactions between users of our platform</li>
                  <li>The accuracy, quality, safety, or legality of listings</li>
                  <li>The conduct of users or third parties</li>
                  <li>Unauthorized access to or use of our servers and/or personal information</li>
                  <li>Interruption or cessation of transmission to or from our service</li>
                  <li>Bugs, viruses, or other harmful components transmitted through our service</li>
                  <li>Errors or omissions in any content or for loss or damage incurred as a result of use</li>
                </ul>
                
                <p>
                  This includes, without limitation, damages for loss of profits, data, or other intangible losses, 
                  even if we have been advised of the possibility of such damages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Disclaimer */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">Content Disclaimer</h2>
          <ul className="text-yellow-800 space-y-2">
            <li><strong>User-Generated Content:</strong> All listings are created by users. We do not endorse or guarantee their accuracy.</li>
            <li><strong>Moderation:</strong> While we moderate content, we cannot review every listing immediately or comprehensively.</li>
            <li><strong>Third-Party Links:</strong> We are not responsible for the content of external websites linked from our platform.</li>
            <li><strong>Availability:</strong> Listings may become outdated or unavailable without notice.</li>
          </ul>
        </section>

        {/* Legal Compliance */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal Compliance</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              Users must comply with all applicable local, state, and national laws. This includes but is not limited to:
            </p>
            
            <ul className="list-disc list-inside space-y-2">
              <li>Consumer protection laws</li>
              <li>Product safety regulations</li>
              <li>Import/export restrictions</li>
              <li>Tax obligations</li>
              <li>Professional licensing requirements</li>
              <li>Intellectual property rights</li>
            </ul>
            
            <p>
              <strong>We are not legal advisors.</strong> If you have questions about legal compliance, 
              consult with a qualified attorney.
            </p>
          </div>
        </section>

        {/* Service Availability */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Availability</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              <strong>No Guarantee of Service:</strong> We provide our service "as is" without warranties of any kind. 
              We do not guarantee continuous, uninterrupted access to our platform.
            </p>
            
            <p>
              <strong>Right to Modify or Terminate:</strong> We reserve the right to modify, suspend, or terminate 
              our service at any time without prior notice.
            </p>
            
            <p>
              <strong>Data Loss:</strong> While we implement reasonable backup procedures, we are not responsible 
              for any loss of data or listings.
            </p>
          </div>
        </section>
      </div>

      {/* Final Notice */}
      <div className="text-center mt-12 p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-700 leading-relaxed">
          <strong>By using FreePostIndia.com, you acknowledge that you have read, understood, 
          and agree to this disclaimer.</strong> If you do not agree with these terms, please do not use our service. 
          This disclaimer is subject to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};