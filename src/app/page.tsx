import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      <Image
        src="/landingPage.jpg"
        alt="A serene landscape inspiring trading innovation"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
        sizes="100vw"
        className="opacity-40" // Adjusting opacity to make it visible behind text
      />
      <div className="relative z-10 flex flex-col items-center justify-start p-4 min-h-screen">

        {/* Navigation */}
        <nav className="flex items-center justify-center w-full max-w-4xl mb-16">
          <div className="flex space-x-8 text-sm font-light">
            <Link href="#" className="hover:text-gray-300 transition-colors">Home</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">How It Works</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Signals</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Login</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center max-w-2xl px-4 py-24 md:py-32">
          <h2 className="text-4xl font-light mb-4 leading-tight">
            Smarter Trading Through <span className="font-normal">AI Intelligence</span>
          </h2>
          <p className="text-lg font-extralight mb-12 opacity-90 max-w-lg">
            Real-time market signals and predictive analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-white text-black text-sm font-light rounded-sm hover:bg-opacity-90 transition-all">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-white text-sm font-light rounded-sm hover:bg-white hover:bg-opacity-10 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Banner */}
        <div className="w-full text-center py-6 mb-8 border-b border-white border-opacity-20">
          <h1 className="text-3xl font-light tracking-widest">MOMO</h1>
          <p className="text-xs mt-2 tracking-widest opacity-80">AI-POWERED TRADING INTELLIGENCE</p>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 text-center mt-auto mb-20 md:mb-24">
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

        {/* Footer */}
        <footer className="w-full max-w-6xl py-8 text-sm text-gray-400">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <h3 className="mb-4 font-light text-xs tracking-widest">COMPANY</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-xs tracking-widest">TECHNOLOGY</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Platform</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Process</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Case Studies</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Research</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-xs tracking-widest">RESOURCES</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Whitepapers</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-xs tracking-widest">LEGAL</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Field Reports</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-light text-xs tracking-widest">CONNECT</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">X (Twitter)</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">Data Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs">© 2025 Momo. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}