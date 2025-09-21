'use client';

import axios from 'axios';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
//   const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubscribe = async (priceId: string) => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    try {
      const res = await axios.post('/api/subscription', { priceId });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-light text-center mb-12">Choose the Right Plan for Your Trading Style</h1>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Tier 1 */}
        <div className="p-6 border border-gray-800 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Silver</h2>
          <p className="text-5xl font-light mb-2">$30</p>
          <p className="text-sm text-gray-400">/ week</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ 10 signals / day</li>
            <li>✅ Email alerts</li>
            <li>❌ 24/7 Support</li>
            <li>❌ Advanced Analytics</li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1S9vuRRwik33QJYMglNBblHi')} // Use your actual price IDs
            className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            Get Started
          </button>
        </div>

        {/* Tier 2 */}
        <div className="p-6 border border-white rounded-lg text-center relative">
          <span className="absolute top-0 right-0 -mt-3 mr-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
          <h2 className="text-xl font-bold mb-4">Gold</h2>
          <p className="text-5xl font-light mb-2">$45</p>
          <p className="text-sm text-gray-400">/ month</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ Unlimited signals</li>
            <li>✅ Real-time alerts</li>
            <li>✅ 24/7 Priority Support</li>
            <li>✅ Advanced Analytics</li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1S9vxxRwik33QJYMYeRPv3W1')} // Use your actual price IDs
            className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            Subscribe Now
          </button>
        </div>

        {/* Tier 3 */}
        <div className="p-6 border border-white rounded-lg text-center relative">
          <span className="absolute top-0 right-0 -mt-3 mr-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
          <h2 className="text-xl font-bold mb-4">Platinum</h2>
          <p className="text-5xl font-light mb-2">$90</p>
          <p className="text-sm text-gray-400">/ 3 months</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ Unlimited signals</li>
            <li>✅ Real-time alerts</li>
            <li>✅ 24/7 Priority Support</li>
            <li>✅ Advanced Analytics</li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1S9w20Rwik33QJYMVRxxPrEz')} // Use your actual price IDs
            className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            Subscribe Now
          </button>
        </div>

        {/* Tier 4 */}
        <div className="p-6 border border-gray-800 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Veteran</h2>
          <p className="text-5xl font-light mb-2">$300</p>
          <p className="text-sm text-gray-400">/ Year</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ All Pro features</li>
            <li>✅ Dedicated account manager</li>
            <li>✅ Custom integrations</li>
            <li>✅ API access</li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1S9w7kRwik33QJYMWv26WiaT')} // Use your actual price IDs
            className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            Subscribe Now
          </button>
        </div>

        {/* Tier 5 */}
        <div className="p-6 border border-gray-800 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Enterprise</h2>
          <p className="text-5xl font-light mb-2">Custom</p>
          <p className="text-sm text-gray-400">/ quote</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ All Pro features</li>
            <li>✅ Dedicated account manager</li>
            <li>✅ Custom integrations</li>
            <li>✅ API access</li>
          </ul>
          <button
            onClick={() => alert('Contact us for a custom quote.')}
            className="mt-8 w-full py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
          >
            Contact Sales
          </button>
        </div>

        {/* Tier 6 */}
        <div className="p-6 border border-white rounded-lg text-center relative">
          <span className="absolute top-0 right-0 -mt-3 mr-3 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">Popular</span>
          <h2 className="text-xl font-bold mb-4">Lone Wolf</h2>
          <p className="text-5xl font-light mb-2">$500</p>
          <p className="text-sm text-gray-400">/ Lifetime Access</p>
          <ul className="text-left mt-6 space-y-2 text-sm text-gray-300">
            <li>✅ Unlimited signals</li>
            <li>✅ Real-time alerts</li>
            <li>✅ 24/7 Priority Support</li>
            <li>✅ Advanced Analytics</li>
          </ul>
          <button
            onClick={() => handleSubscribe('price_1S9wDwRwik33QJYMtZr4rbX2')} // Use your actual price IDs
            className="mt-8 w-full py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}