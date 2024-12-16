"use client";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-orange-600 to-orange-500 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About Us */}
        <div>
          <h4 className="text-xl font-bold mb-4">About SouvenirPlanet</h4>
          <p className="text-sm">
            We offer unique souvenirs from destinations around the world. Our
            mission is to help you bring memories back from your travels, no
            matter where you’ve been.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <a href="track-orders" className="hover:underline">
                Track Your Order
              </a>
            </li>
            <li>
              <a href="/shipping-returns" className="hover:underline">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <p className="text-sm">Email: support@planet.com</p>
          <p className="text-sm">Phone: +1-555-555-555</p>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 fill-white hover:fill-cyan-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M..." /> {/* Simplified path for example */}
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 fill-white hover:fill-cyan-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M..." />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 fill-white hover:fill-cyan-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M..." />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} SouvenirPlanet. All rights reserved.
      </div>
    </footer>
  );
};
