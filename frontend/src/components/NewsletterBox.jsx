import { useState } from "react";
import { Send, Check, Gift, Shield } from "lucide-react";

function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Subscribed email:", email);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
              <Gift className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                Exclusive Offer
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Subscribe Now & Get{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                20% Off
              </span>{" "}
              Your First Order
            </h2>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our fashion community and be the first to know about new arrivals,
              exclusive deals, and style tips from our experts.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Welcome Discount</h4>
              <p className="text-sm text-gray-600">20% off your first purchase</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                <Send className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Early Access</h4>
              <p className="text-sm text-gray-600">Be first to shop new collections</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No Spam Promise</h4>
              <p className="text-sm text-gray-600">We respect your privacy</p>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Successfully subscribed!</p>
                  <p className="text-sm text-green-600">Check your email for the discount code.</p>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 bg-transparent outline-none border-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white font-semibold hover:from-gray-800 hover:to-gray-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </form>

          {/* Stats */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">Subscribers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">4.8★</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterBox;