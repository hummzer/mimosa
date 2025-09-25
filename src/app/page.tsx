/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bot, Signal, Repeat, Play } from 'lucide-react';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDarkMode(false);
    }
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode 
    ? {
        background: 'bg-[#0c0c0e]',
        text: 'text-white',
        textLight: 'text-gray-400',
        border: 'border-gray-700',
        cardBackground: 'bg-gray-900',
        buttonPrimary: 'bg-white text-black hover:bg-gray-200',
        buttonSecondary: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }
    : {
        background: 'bg-white',
        text: 'text-gray-800',
        textLight: 'text-gray-600',
        border: 'border-gray-300',
        cardBackground: 'bg-gray-100',
        buttonPrimary: 'bg-gray-800 text-white hover:bg-gray-700',
        buttonSecondary: 'bg-white text-gray-800 hover:bg-gray-200'
      };

  const heroBackground = isDarkMode
    ? 'linear-gradient(to bottom, rgba(12, 12, 14, 0.95), rgba(12, 12, 14, 0.95)), url(https://images.unsplash.com/photo-1629168997387-926f74f19b26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
    : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(https://images.unsplash.com/photo-1629168997387-926f74f19b26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

  const blogPosts = [
    {
      title: "The Future of Algorithmic Trading",
      excerpt: "Explore how AI and machine learning are revolutionizing trading strategies, providing unparalleled efficiency and predictive power.",
      date: "Oct 26, 2025",
      image: "https://placehold.co/400x300/e2e8f0/000?text=Algorithmic+Trading"
    },
    {
      title: "Copy Trading: A Beginner's Guide",
      excerpt: "Learn the basics of copy trading, how it works, and the benefits of following seasoned experts in the crypto market.",
      date: "Oct 21, 2025",
      image: "https://placehold.co/400x300/e2e8f0/000?text=Copy+Trading"
    },
    {
      title: "Maximizing Profits with Real-Time Signals",
      excerpt: "Discover how to leverage Momo's real-time signals to make informed decisions and optimize your trading performance.",
      date: "Oct 18, 2025",
      image: "https://placehold.co/400x300/e2e8f0/000?text=Signals+Analytics"
    },
    {
      title: "Hiring a Bot Developer",
      excerpt: "A comprehensive guide on what to look for when hiring a bot developer to create a custom trading bot that fits your specific needs.",
      date: "Oct 15, 2025",
      image: "https://placehold.co/400x300/e2e8f0/000?text=Bot+Development"
    }
  ];

  return (
    <div className={`relative ${themeClasses.text} ${themeClasses.background} overflow-hidden font-sans`}>
      
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto p-8 font-light">
        <div className="text-xl font-medium tracking-wide">MOMO</div>
        <div className="flex space-x-8 text-sm">
          <a href="#" className={`hover:${themeClasses.textLight} transition-colors hidden md:block`}>Home</a>
          <a href="#" className={`hover:${themeClasses.textLight} transition-colors hidden md:block`}>Signals</a>
          <a href="#" className={`hover:${themeClasses.textLight} transition-colors hidden md:block`}>Bots</a>
          <a href="#" className={`hover:${themeClasses.textLight} transition-colors hidden md:block`}>Copy Trading</a>
          <a href="#" className={`hover:${themeClasses.textLight} transition-colors hidden md:block`}>Login</a>
        </div>
        <div className="flex items-center space-x-2">
            <button className={`${themeClasses.textLight} hover:${themeClasses.text} transition text-sm`}>Log In</button>
            <button className={`${themeClasses.buttonPrimary} px-4 py-2 text-xs font-normal transition`}>Sign Up</button>
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {isDarkMode ? (
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m4.93 19.07 1.41-1.41"></path>
                    <path d="m17.66 6.34 1.41-1.41"></path>
                  </>
                )}
              </svg>
            </button>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <div 
        className="flex flex-col items-center justify-center min-h-screen px-4 py-24 md:py-32 relative text-center bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: heroBackground }}
      >
        <div className="z-10 relative">
          <h2 className="text-4xl font-light mb-4 leading-tight">
            Smarter Trading Through <span className="font-normal">AI Intelligence</span>
          </h2>
          <p className="text-lg font-extralight mb-12 opacity-90 max-w-lg">
            Real-time market signals and predictive analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black text-sm font-light rounded-sm hover:bg-opacity-90 transition-all">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-white text-sm font-light rounded-sm hover:bg-white hover:bg-opacity-10 transition-all">
              View Demo
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center px-4 md:px-16 lg:px-24">
          <div>
            <div className="text-3xl font-light mb-2">99.7%</div>
            <div className="text-xs tracking-widest opacity-80">ACCURACY</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-2">24/7</div>
            <div className="text-xs tracking-widest opacity-80">MONITORING</div>
          </div>
          <div>
            <div className="text-3xl font-light mb-2">0.2s</div>
            <div className="text-xs tracking-widest opacity-80">LATENCY</div>
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Perks Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
        <div className="max-w-7xl mx-auto text-left mb-16">
          <h2 className="text-4xl font-light mb-4">Momo: A complete trading solution</h2>
          <p className={`${themeClasses.textLight} text-sm font-light max-w-2xl`}>
            Momo is more than just a signal provider; it's a comprehensive ecosystem designed for both novice and expert traders. Our platform provides real-time AI-driven signals, a marketplace for hiring and renting trading bots, and a seamless copy trading feature to replicate the success of top traders.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
            <Signal className="mb-4" size={32} />
            <h3 className="text-xl font-light mb-2">AI-Driven Signals</h3>
            <p className={`${themeClasses.textLight} text-sm font-light`}>Get real-time, actionable trading signals generated by our state-of-the-art AI, based on market sentiment, technical indicators, and predictive analytics.</p>
          </div>
          <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
            <Bot className="mb-4" size={32} />
            <h3 className="text-xl font-light mb-2">Bot Marketplace</h3>
            <p className={`${themeClasses.textLight} text-sm font-light`}>Hire skilled developers to build custom trading bots or rent pre-built, high-performance bots tailored to various strategies and risk appetites.</p>
          </div>
          <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
            <Repeat className="mb-4" size={32} />
            <h3 className="text-xl font-light mb-2">Copy Trading</h3>
            <p className={`${themeClasses.textLight} text-sm font-light`}>Automatically replicate the trades of the most successful traders on our platform. Set it up once and let the experts do the work for you.</p>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* How It Works Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto text-left mb-16">
              <h2 className="text-4xl font-light mb-4">How It Works</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col space-y-6 text-left">
                  <div className={`p-4 border-l-2 ${themeClasses.border}`}>
                      <h3 className="text-sm font-light mb-2">Step 1</h3>
                      <p className="font-light text-base">Select Your Tool</p>
                      <p className={`${themeClasses.textLight} text-sm mt-2 font-light`}>Choose between our AI-powered signals, a pre-built trading bot from the marketplace, or our copy trading feature. Each option is designed to help you succeed, regardless of your experience level.</p>
                  </div>
                  <div className={`p-4 border-l-2 ${themeClasses.border}`}>
                      <h3 className="text-sm font-light mb-2">Step 2</h3>
                      <p className="font-light text-base">Customize and Connect</p>
                      <p className={`${themeClasses.textLight} text-sm mt-2 font-light`}>Connect your exchange account via API. Customize your risk settings, investment size, and other parameters to fit your personal strategy and risk tolerance.</p>
                  </div>
                  <div className={`p-4 border-l-2 ${themeClasses.border}`}>
                      <h3 className="text-sm font-light mb-2">Step 3</h3>
                      <p className="font-light text-base">Start Trading</p>
                      <p className={`${themeClasses.textLight} text-sm mt-2 font-light`}>Begin executing trades with confidence. Monitor your progress through our intuitive dashboard and analytical tools, and adjust your strategy as needed to maximize returns.</p>
                  </div>
              </div>
              <div className={`relative w-full aspect-video border ${themeClasses.border} ${themeClasses.cardBackground} flex items-center justify-center`}>
                  <div className={`${themeClasses.textLight} opacity-50`}>
                      <Play className="w-12 h-12" />
                  </div>
              </div>
          </div>
      </div>

      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Pricing Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto text-left mb-16">
              <h2 className="text-4xl font-light mb-4">Choose the right plan for<br/>your trading style</h2>
          </div>
          <div className={`max-w-7xl mx-auto overflow-x-auto border ${themeClasses.border} ${themeClasses.cardBackground}`}>
              <table className="w-full text-left whitespace-nowrap">
                  <thead>
                      <tr className={`border-b ${themeClasses.border} text-sm font-normal ${themeClasses.textLight}`}>
                          <th className="p-6"></th>
                          <th className="p-6">Basic</th>
                          <th className="p-6">Premium</th>
                          <th className="p-6">Pro</th>
                          <th className="p-6">Enterprise</th>
                      </tr>
                  </thead>
                  <tbody className={`${themeClasses.textLight} text-sm font-light`}>
                      <tr className={`border-b ${themeClasses.border}`}>
                          <td className="p-6 font-normal">AI Signals</td>
                          <td className="p-6">Limited</td>
                          <td className="p-6">Advanced</td>
                          <td className="p-6">Unlimited</td>
                          <td className="p-6">Custom</td>
                      </tr>
                      <tr className={`border-b ${themeClasses.border}`}>
                          <td className="p-6 font-normal">Bot Marketplace Access</td>
                          <td className="p-6">View Only</td>
                          <td className="p-6">Limited Renting</td>
                          <td className="p-6">Full Access</td>
                          <td className="p-6">Full Access</td>
                      </tr>
                      <tr className={`border-b ${themeClasses.border}`}>
                          <td className="p-6 font-normal">Copy Trading</td>
                          <td className="p-6">No</td>
                          <td className="p-6">Limited</td>
                          <td className="p-6">Full Access</td>
                          <td className="p-6">Full Access</td>
                      </tr>
                      <tr className={`border-b ${themeClasses.border}`}>
                          <td className="p-6 font-normal">Monthly Fee</td>
                          <td className="p-6">Free</td>
                          <td className="p-6">$49/mo</td>
                          <td className="p-6">$199/mo</td>
                          <td className="p-6">Custom</td>
                      </tr>
                      <tr>
                          <td className="p-6"></td>
                          <td className="p-6"><button className={`w-full ${themeClasses.buttonSecondary} px-4 py-2 font-normal text-xs transition`}>Get Started</button></td>
                          <td className="p-6"><button className={`w-full ${themeClasses.buttonPrimary} px-4 py-2 font-normal text-xs transition`}>Subscribe</button></td>
                          <td className="p-6"><button className={`w-full ${themeClasses.buttonSecondary} px-4 py-2 font-normal text-xs transition`}>Subscribe</button></td>
                          <td className="p-6"><button className={`w-full ${themeClasses.buttonSecondary} px-4 py-2 font-normal text-xs transition`}>Contact Sales</button></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Testimonial Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto text-left mb-16">
              <h2 className="text-4xl font-light mb-4">What Our Users Say</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
                  <div className="flex items-center mb-4">
                      <div className={`w-8 h-8 ${themeClasses.cardBackground} border ${themeClasses.border} rounded-sm flex items-center justify-center`}>
                          <span className={`${themeClasses.textLight} text-xs font-light`}>S</span>
                      </div>
                      <div className="ml-4">
                          <div className={`font-normal text-sm`}>Samantha P.</div>
                          <div className={`text-sm ${themeClasses.textLight} font-light`}>★★★★★</div>
                      </div>
                  </div>
                  <p className={`text-sm ${themeClasses.textLight} font-light`}>"The AI signals from Momo are incredibly accurate. They've helped me make more confident trading decisions and significantly improved my portfolio's performance."</p>
              </div>
              <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
                  <div className="flex items-center mb-4">
                      <div className={`w-8 h-8 ${themeClasses.cardBackground} border ${themeClasses.border} rounded-sm flex items-center justify-center`}>
                          <span className={`${themeClasses.textLight} text-xs font-light`}>J</span>
                      </div>
                      <div className="ml-4">
                          <div className={`font-normal text-sm`}>John A.</div>
                          <div className={`text-sm ${themeClasses.textLight} font-light`}>★★★★★</div>
                      </div>
                  </div>
                  <p className={`text-sm ${themeClasses.textLight} font-light`}>"I was new to automated trading, but the bot marketplace made it so easy. I rented a profitable bot and saw results within the first week. Highly recommend!"</p>
                  
              </div>
              <div className={`${themeClasses.cardBackground} p-6 border ${themeClasses.border}`}>
                  <div className="flex items-center mb-4">
                      <div className={`w-8 h-8 ${themeClasses.cardBackground} border ${themeClasses.border} rounded-sm flex items-center justify-center`}>
                          <span className={`${themeClasses.textLight} text-xs font-light`}>M</span>
                      </div>
                      <div className="ml-4">
                          <div className={`font-normal text-sm`}>Maria L.</div>
                          <div className={`text-sm ${themeClasses.textLight} font-light`}>★★★★★</div>
                      </div>
                  </div>
                  <p className={`text-sm ${themeClasses.textLight} font-light`}>"The copy trading feature is a game-changer. I get to learn from experienced traders while earning profits. It's the best of both worlds for a busy professional like me."</p>
              </div>
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Video Demo Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto">
              <div className={`w-full aspect-video border ${themeClasses.border} ${themeClasses.cardBackground}`}>
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* FAQ Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="text-left">
                  <h2 className="text-4xl font-light mb-4">Got Questions?<br />We've got answers.</h2>
                  <form className="flex space-x-2">
                      <input type="email" placeholder="Enter your email" className={`flex-1 px-4 py-2 border ${themeClasses.border} ${themeClasses.cardBackground} rounded-none text-xs ${themeClasses.textLight} placeholder:${themeClasses.textLight} focus:outline-none focus:ring-1 focus:ring-gray-400`} />
                      <button type="submit" className={`${themeClasses.buttonPrimary} px-6 py-2 text-xs font-normal transition`}>Submit</button>
                  </form>
              </div>
              <div className="space-y-4">
                  {[
                      {
                          q: "What is an AI trading bot?",
                          a: "An AI trading bot is an automated program that uses artificial intelligence to analyze market data, predict trends, and execute trades on your behalf. It operates 24/7 and can process information much faster than a human."
                      },
                      {
                          q: "How do I start copy trading?",
                          a: "To begin copy trading, you simply choose a master trader whose strategy you admire, set your investment amount, and our platform will automatically mirror their trades in your account."
                      },
                      {
                          q: "Are the signals real-time?",
                          a: "Yes, our AI-driven signals are delivered in real-time, providing you with up-to-the-minute insights to help you make timely and informed trading decisions."
                      },
                      {
                          q: "Is Momo secure?",
                          a: "Momo prioritizes security. We use secure API connections, ensuring we never have direct access to your funds. All user data is encrypted and protected with industry-standard security protocols."
                      }
                  ].map((item, index) => (
                      <div key={index} className={`${themeClasses.cardBackground} border ${themeClasses.border} rounded-none`}>
                          <button
                              className="w-full flex justify-between items-center p-4 text-xs font-normal"
                              onClick={() => toggleFAQ(index)}
                          >
                              <span>{item.q}</span>
                              <span>{openFAQ === index ? '-' : '+'}</span>
                          </button>
                          <div
                              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ === index ? 'max-h-96' : 'max-h-0'}`}
                          >
                              <p className={`p-4 pt-0 ${themeClasses.textLight} text-sm font-light`}>
                                  {item.a}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Latest Blogs Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background}`}>
          <div className="max-w-7xl mx-auto text-left mb-16">
              <h2 className="text-4xl font-light mb-4">Latest Blogs</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {blogPosts.map((post, index) => (
                <a key={index} href="#" className={`${themeClasses.cardBackground} border ${themeClasses.border} rounded-none transition-all hover:shadow-xl`}>
                  <Image
                    src="/landingPage.jpg"
                    alt={post.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-none"
                  />
                  <div className="p-4">
                    <h3 className="font-normal text-sm">{post.title}</h3>
                    <p className={`${themeClasses.textLight} text-xs font-light mt-2`}>{post.excerpt}</p>
                    <p className={`${themeClasses.textLight} text-xs mt-4`}>{post.date}</p>
                  </div>
                </a>
              ))}
          </div>
      </div>
      
      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>

      {/* Final CTA Section */}
      <div className={`py-24 px-8 md:px-16 lg:px-24 ${themeClasses.background} text-left`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                  <h2 className="text-4xl md:text-5xl font-light mb-4 leading-tight">Ready to start your trading journey?</h2>
                  <p className={`${themeClasses.textLight} mb-8 font-light`}>Join thousands of successful traders who have already achieved financial freedom with our platform.</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className={`${themeClasses.buttonPrimary} px-6 py-2 font-normal text-sm transition`}>Get Started</button>
                  <button className={`${themeClasses.buttonSecondary} px-6 py-2 font-normal text-sm transition`}>Contact Sales</button>
              </div>
          </div>
      </div>

      <div className="w-full h-[1px] my-12 opacity-20" style={{ backgroundColor: isDarkMode ? 'white' : 'black' }}></div>
      
      {/* Footer */}
      <div className="w-full text-left py-12 bg-[#0c0c0e]">
          <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
              <div className="flex flex-col md:flex-row md:space-x-8">
                  <div className="mb-8 md:mb-0 md:w-1/4">
                      <h1 className="text-3xl font-normal tracking-wide text-white">MOMO</h1>
                  </div>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 md:gap-x-8">
                      <div className="space-y-2">
                          <h3 className="mb-4 font-light text-xs tracking-widest text-white">COMPANY</h3>
                          <ul className="space-y-2">
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>About</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Careers</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Press</a></li>
                          </ul>
                      </div>
                      <div className="space-y-2">
                          <h3 className="mb-4 font-light text-xs tracking-widest text-white">TECHNOLOGY</h3>
                          <ul className="space-y-2">
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Platform</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Process</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Case Studies</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Research</a></li>
                          </ul>
                      </div>
                      <div className="space-y-2">
                          <h3 className="mb-4 font-light text-xs tracking-widest text-white">RESOURCES</h3>
                          <ul className="space-y-2">
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Blog</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Whitepapers</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Events</a></li>
                          </ul>
                      </div>
                      <div className="space-y-2">
                          <h3 className="mb-4 font-light text-xs tracking-widest text-white">LEGAL</h3>
                          <ul className="space-y-2">
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Privacy Policy</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Terms of Service</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Field Reports</a></li>
                          </ul>
                      </div>
                      <div className="space-y-2">
                          <h3 className="mb-4 font-light text-xs tracking-widest text-white">CONNECT</h3>
                          <ul className="space-y-2">
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>LinkedIn</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>X (Twitter)</a></li>
                              <li><a href="#" className={`hover:${themeClasses.textLight} transition-colors text-xs font-light`}>Data Security</a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="mt-8 text-xs font-light text-gray-400 text-center md:text-left">
                  <p>© 2025 Momo. All rights reserved.</p>
              </div>
          </div>
      </div>
    </div>
  );
}
