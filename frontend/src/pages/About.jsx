import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { 
  Award, 
  Shield, 
  Truck, 
  Users, 
  Heart, 
  Star, 
  CheckCircle,
  Target,
  ShoppingBag,
  HeadphonesIcon
} from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <Heart className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">
                Our Story
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Furyland</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where premium fashion meets unparalleled shopping experience.
              We're redefining online retail with curated collections, 
              exceptional quality, and customer-first service.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl">
                {/* Replace with your image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Journey</h3>
                    <p className="text-gray-600">Since 2024</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl -z-10"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Our Vision & Mission
                  </h2>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Furyland was born from a vision to revolutionize online shopping—bringing style, 
                  quality, and convenience directly to you. We're committed to creating a platform 
                  where premium products meet exceptional service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Curated Excellence</h3>
                  <p className="text-gray-600 text-sm">
                    Every product is handpicked from trusted brands and emerging creators.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
                  <p className="text-gray-600 text-sm">
                    Your satisfaction drives everything we do, from selection to delivery.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">10,000+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Choose Us</span>
            </h2>
            <p className="text-gray-600 text-lg">
              We're committed to delivering an unmatched shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous quality checks. We partner only with trusted brands 
                and artisans who share our commitment to excellence.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Trusted</h3>
              <p className="text-gray-600">
                Shop with confidence using our secure payment gateway. Your data is protected with 
                enterprise-grade encryption and privacy measures.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Free Delivery</h3>
              <p className="text-gray-600">
                Enjoy free shipping on orders over ₹1999. Our efficient logistics ensure your 
                orders reach you quickly and safely, anywhere in India.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is always ready to assist you. From pre-purchase 
                queries to after-sales support, we're here for you.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? We offer a hassle-free 30-day return policy. Your satisfaction 
                is guaranteed with our simple and transparent return process.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <HeadphonesIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Service</h3>
              <p className="text-gray-600">
                Get personalized recommendations and styling advice from our fashion experts. 
                We help you find exactly what you're looking for.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold mb-2">500+</p>
              <p className="text-gray-300">Brands</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold mb-2">10K+</p>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold mb-2">24/7</p>
              <p className="text-gray-300">Support</p>
            </div>
            <div className="text-center">
              <p className="text-4xl lg:text-5xl font-bold mb-2">98%</p>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <NewsletterBox />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience Premium Shopping?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Furyland for their fashion needs.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;