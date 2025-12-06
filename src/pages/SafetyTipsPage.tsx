import React from 'react';
import { Shield, AlertTriangle, Eye, Phone, CreditCard, MapPin, Users, Clock } from 'lucide-react';

export const SafetyTipsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Shield className="mx-auto text-blue-600 mb-4" size={48} />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Safety Tips</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay safe while buying and selling on FreePostIndia.com. Follow these essential guidelines to protect yourself from fraud and scams.
        </p>
      </div>

      {/* Important Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-red-600 mt-0.5" size={24} />
          <div>
            <h2 className="font-bold text-red-800 mb-2">Important Disclaimer</h2>
            <p className="text-red-700">
              <strong>FreePostIndia.com is not responsible for transactions between users.</strong> We do not verify listings, 
              collect payments, or guarantee the accuracy of information. All transactions are entirely at your own risk.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Meeting Safety */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <MapPin className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting in Person</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Meet in public places</strong> - Shopping malls, coffee shops, police stations, or busy areas</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Bring a friend</strong> - Never meet alone, especially for high-value items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Meet during daylight hours</strong> - Avoid late-night meetings</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Never invite strangers home</strong> or go to their private residence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Don't meet in isolated areas</strong> - Avoid empty parking lots or remote locations</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Payment Safety */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <CreditCard className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Safety</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Pay in person</strong> - Only pay when you can inspect the item</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Use cash for small items</strong> - Safest payment method for local transactions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Get receipts</strong> - For warranty and proof of purchase</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Never pay in advance</strong> - Don't send money before seeing the item</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Avoid wire transfers</strong> - Western Union, MoneyGram, or similar services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Don't share bank details</strong> - Never give out your banking information</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Verification Tips */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Eye className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Verifying Items & Sellers</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Inspect before buying</strong> - Test electronics, check vehicle documents</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Ask for ID proof</strong> - For high-value transactions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Verify ownership</strong> - Ask for original bills, registration papers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Research market prices</strong> - If it's too cheap, it might be stolen or fake</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Don't trust urgent sales</strong> - "Must sell today" is often a scam tactic</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Communication Safety */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Phone className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication Guidelines</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Keep initial contact through the platform</strong> - Use provided contact methods</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Ask specific questions</strong> - About condition, age, reason for selling</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Trust your instincts</strong> - If something feels wrong, walk away</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Don't share personal details</strong> - Home address, workplace, family info</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Avoid pressure tactics</strong> - Genuine sellers won't rush you</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Red Flags */}
        <section className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="text-red-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-red-800 mb-4">Warning Signs - Avoid These Sellers</h2>
              <ul className="space-y-3 text-red-700">
                <li><strong>Asks for advance payment</strong> - Wants money before meeting</li>
                <li><strong>Won't talk on phone</strong> - Only communicates via text/email</li>
                <li><strong>Prices too good to be true</strong> - Significantly below market value</li>
                <li><strong>Urgent sale pressure</strong> - "Must sell today" or "other buyers waiting"</li>
                <li><strong>Poor grammar/spelling</strong> - Often indicates scammers</li>
                <li><strong>Requests personal info</strong> - Bank details, ID copies, etc.</li>
                <li><strong>Won't meet in person</strong> - Wants to ship items only</li>
                <li><strong>Duplicate ads</strong> - Same ad posted multiple times</li>
              </ul>
            </div>
          </div>
        </section>

        {/* For Sellers */}
        <section className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Users className="text-blue-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for Sellers</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Be honest in descriptions</strong> - Mention all defects or issues</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Meet in safe locations</strong> - Same rules apply to sellers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Accept cash payments</strong> - Avoid checks or online transfers from strangers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Keep proof of sale</strong> - Written receipt with item details</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">✗</span>
                  <span><strong>Don't give your home address</strong> - Meet at a neutral location</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Clock className="text-yellow-600 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-yellow-800 mb-4">If Something Goes Wrong</h2>
              <ul className="space-y-3 text-yellow-800">
                <li><strong>Trust your instincts</strong> - Leave immediately if you feel unsafe</li>
                <li><strong>Report to police</strong> - For fraud, theft, or threatening behavior</li>
                <li><strong>Flag the listing</strong> - Use the report button on suspicious ads</li>
                <li><strong>Don't try to recover losses yourself</strong> - Let authorities handle it</li>
                <li><strong>Learn from experience</strong> - Share your story to help others</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">
          Remember: <strong>We are not responsible for transactions between users.</strong>{' '}
          These safety tips are recommendations only. Always use common sense and trust your instincts.
        </p>
      </div>
    </div>
  );
};