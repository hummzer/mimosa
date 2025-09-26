// src/app/pricing/page.tsx
'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Check, X, ArrowRight, DollarSign } from 'lucide-react';

// Pricing data based on the user's provided page.tsx structure
const pricingTiers = [
    {
        name: 'Silver',
        price: '$30',
        frequency: '/ week',
        priceId: 'price_1S9vuRRwik33QJYMglNBblHi',
        features: ['10 signals / day', 'Email alerts'],
        featuresExcluded: ['24/7 Support', 'Advanced Analytics'],
        isPopular: false,
    },
    {
        name: 'Gold',
        price: '$45',
        frequency: '/ month',
        priceId: 'price_1S9vxxRwik33QJYMYeRPv3W1',
        features: ['Unlimited signals', 'Real-time alerts', '24/7 Priority Support', 'Advanced Analytics'],
        featuresExcluded: [],
        isPopular: true,
    },
    {
        name: 'Platinum',
        price: '$90',
        frequency: '/ 3 months',
        priceId: 'price_1S9w20Rwik33QJYMVRxxPrEz',
        features: ['Unlimited signals', 'Real-time alerts', '24/7 Priority Support', 'Advanced Analytics'],
        featuresExcluded: [],
        isPopular: true,
    },
    {
        name: 'Veteran',
        price: '$300',
        frequency: '/ Year',
        priceId: 'price_1S9w7kRwik33QJYMWv26WiaT',
        features: ['All Pro features', 'Dedicated account manager', 'Custom integrations', 'API access'],
        featuresExcluded: [],
        isPopular: false,
    },
    {
        name: 'Lone Wolf',
        price: '$500',
        frequency: '/ Lifetime Access',
        priceId: 'price_1S9wDwRwik33QJYMtZr4rbX2',
        features: ['Unlimited signals', 'Real-time alerts', '24/7 Priority Support', 'Advanced Analytics'],
        featuresExcluded: [],
        isPopular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        frequency: '/ quote',
        priceId: null,
        features: ['All Pro features', 'Dedicated account manager', 'Custom integrations', 'API access'],
        featuresExcluded: [],
        isPopular: false,
    },
];

export default function PricingPage() {
  const { status } = useSession();
  const router = useRouter();

  const handleSubscribe = async (priceId: string) => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    try {
      // API call to your /api/subscription endpoint
      const res = await axios.post('/api/subscription', { priceId });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Subscription failed:', error);
      // NOTE: Using a custom modal/toast is better than alert(), but using alert() here for simplicity
      alert('Subscription failed. Please ensure you are logged in.');
    }
  };

  const handleContact = () => {
    alert('Contact us for a custom quote.');
  };

  return (
    <div className="bg-black text-white min-h-screen p-4 sm:p-12 flex flex-col items-center">
      <header className="max-w-5xl w-full text-center mb-12 border-b border-gray-900 pb-6">
        <div className="flex items-center justify-center text-blue-400 mb-2">
            <DollarSign className="h-6 w-6 mr-2 font-thin" />
            <p className="text-lg font-light uppercase tracking-widest">Pricing</p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-thin tracking-wide">
          Choose Your Trading Advantage
        </h1>
        <p className="text-gray-400 font-light text-sm mt-3">
          Select the plan that best fits your trading frequency and feature needs.
        </p>
      </header>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-7xl w-full">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-6 rounded-xl flex flex-col justify-between shadow-2xl transition-all duration-300 relative ${
              tier.isPopular ? 'border-2 border-blue-500 bg-gray-950/70' : 'border border-gray-800 bg-gray-950'
            }`}
          >
            {tier.isPopular && (
              <span className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-0.5 text-xs font-light text-black bg-blue-400 rounded-full tracking-wider">
                Popular
              </span>
            )}
            
            <div>
              <h2 className="text-2xl font-light mb-1">{tier.name}</h2>
              <p className="text-5xl font-thin tracking-tight mb-4">
                {tier.price}
                <span className="text-base text-gray-500 font-light ml-1">{tier.frequency}</span>
              </p>
              
              {/* Features List */}
              <ul className="mt-6 space-y-2 text-sm border-t border-gray-900 pt-4">
                {tier.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300 font-light">
                    <Check className="h-4 w-4 mr-3 text-green-500 flex-shrink-0 font-thin" />
                    {item}
                  </li>
                ))}
                {tier.featuresExcluded.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600 font-thin line-through">
                    <X className="h-4 w-4 mr-3 text-red-500/50 flex-shrink-0 font-thin" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscription Button */}
            <div className="mt-8">
              {tier.priceId ? (
                <button
                  onClick={() => handleSubscribe(tier.priceId!)}
                  className={`w-full py-3 text-sm font-light rounded-md transition-colors flex items-center justify-center ${
                    tier.isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Checking Auth...' : 'Subscribe Now'} <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleContact}
                  className="w-full py-3 text-sm font-light rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  Contact Sales
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
