import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="text-red-600 mt-0.5" size={20} />
        <div>
          <h3 className="font-semibold text-red-800 mb-1">Important Disclaimer</h3>
          <p className="text-red-700 text-sm leading-relaxed">
            <strong>We are not responsible for transactions.</strong> We don't collect payments, verify sellers, 
            or guarantee products/services. Always meet in public places, verify items before payment, 
            and never send money in advance. <a href="/safety-tips" className="underline font-medium">Read safety tips</a>.
          </p>
        </div>
      </div>
    </div>
  );
};