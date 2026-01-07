import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MapPin,
  Shield,
  Truck,
  CreditCard,
  Heart,
} from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to handle link clicks and scroll to top
  const handleLinkClick = (e) => {
    // Only scroll to top if we're not navigating to a different route
    const href = e.currentTarget.getAttribute("href");
    if (
      !href ||
      href === "#" ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("http")
    ) {
      return; // Don't scroll for external links, mailto, tel, or empty links
    }

    // Check if we're already on the same page
    const currentPath = window.location.pathname;
    const linkPath = href;

    if (currentPath === linkPath) {
      e.preventDefault();
      scrollToTop();
    }
    // For React Router links, the navigation will happen automatically
    // and we can rely on the useEffect in each page component to scroll
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Main Footer */}
      <div className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Furyland
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Premium fashion destination offering curated collections for the
              modern individual. Quality, style, and comfort in every piece.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/anurag.singh_04/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shipping"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+917678936521"
                  className="text-gray-600 hover:text-black transition-colors duration-200 flex items-start gap-3"
                >
                  <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span>+91-7678-000-01</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:supportfuryland@gmail.com"
                  className="text-gray-600 hover:text-black transition-colors duration-200 flex items-start gap-3"
                >
                  <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span>supportfuryland@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/anurag.singh_04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors duration-200 flex items-start gap-3"
                >
                  <Instagram className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span>Instagram</span>
                </a>
              </li>
              <li className="text-gray-600 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-200 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-500">Over ₹1999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Secure Payment
                </p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">30 Day Policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <Heart className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  24/7 Support
                </p>
                <p className="text-xs text-gray-500">Always Here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="py-6 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Furyland - All rights
                reserved.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
