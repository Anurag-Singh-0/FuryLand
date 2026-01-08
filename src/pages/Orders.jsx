import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
// Correct MUI icon imports
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaymentIcon from "@mui/icons-material/Payment";
import DownloadIcon from "@mui/icons-material/Download";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Orders() {
  const { Products, currency } = useContext(ShopContext);
  const [selectedFilter, setSelectedFilter] = useState("all"); // all, pending, delivered, cancelled
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Mock orders data with realistic statuses and dates
  const mockOrders = [
    {
      id: "ORD-001",
      items: [
        { 
          productId: 1, 
          name: "Classic Denim Jacket", 
          image: Products[0]?.image?.[0] || "https://via.placeholder.com/100", 
          quantity: 1, 
          size: "M", 
          price: Products[0]?.price || 2999 
        },
        { 
          productId: 2, 
          name: "Casual T-Shirt", 
          image: Products[1]?.image?.[0] || "https://via.placeholder.com/100", 
          quantity: 2, 
          size: "L", 
          price: Products[1]?.price || 1499 
        }
      ],
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      status: "delivered",
      paymentMethod: "UPI",
      paymentStatus: "paid",
      totalAmount: 5997,
      shippingAddress: "123 Main St, Bangalore, Karnataka 560001",
      trackingNumber: "TRK789012345",
      estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "ORD-002",
      items: [
        { 
          productId: 3, 
          name: "Sports Shoes", 
          image: Products[2]?.image?.[0] || "https://via.placeholder.com/100", 
          quantity: 1, 
          size: "42", 
          price: Products[2]?.price || 3999 
        }
      ],
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      status: "pending",
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      totalAmount: 3999,
      shippingAddress: "456 Park Ave, Mumbai, Maharashtra 400001",
      trackingNumber: "TRK789012346",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "ORD-003",
      items: [
        { 
          productId: 4, 
          name: "Winter Sweater", 
          image: Products[3]?.image?.[0] || "https://via.placeholder.com/100", 
          quantity: 1, 
          size: "XL", 
          price: Products[3]?.price || 2499 
        },
        { 
          productId: 5, 
          name: "Formal Trousers", 
          image: Products[4]?.image?.[0] || "https://via.placeholder.com/100", 
          quantity: 1, 
          size: "32", 
          price: Products[4]?.price || 1799 
        }
      ],
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      status: "cancelled",
      paymentMethod: "Net Banking",
      paymentStatus: "refunded",
      totalAmount: 4298,
      shippingAddress: "789 Ocean Drive, Chennai, Tamil Nadu 600001",
      trackingNumber: "TRK789012347",
      cancelledDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Filter orders based on selected filter
  const filteredOrders = selectedFilter === "all" 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedFilter);

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "delivered":
        return {
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          icon: <CheckCircleIcon className="w-5 h-5" />,
          text: "Delivered"
        };
      case "pending":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          icon: <AccessTimeIcon className="w-5 h-5" />,
          text: "Processing"
        };
      case "cancelled":
        return {
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          icon: <CancelIcon className="w-5 h-5" />,
          text: "Cancelled"
        };
      default:
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          icon: <ShoppingBagIcon className="w-5 h-5" />,
          text: "Shipped"
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                My <span className="text-blue-600">Orders</span>
              </h1>
              <p className="text-gray-600">
                Track, manage, and review your orders
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currency}
                  {mockOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["all", "pending", "delivered", "cancelled"].map((filter) => {
              const isActive = selectedFilter === filter;
              const count = filter === "all" 
                ? mockOrders.length 
                : mockOrders.filter(order => order.status === filter).length;
              
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)} 
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    isActive ? "bg-white/20" : "bg-gray-300"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    {/* Order Header */}
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`px-3 py-1.5 rounded-lg ${statusInfo.bgColor} ${statusInfo.borderColor} border flex items-center gap-2`}>
                              {statusInfo.icon}
                              <span className={`font-semibold ${statusInfo.color}`}>
                                {statusInfo.text}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {order.id}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <CalendarTodayIcon className="w-4 h-4" />
                              <span>Ordered: {formatDate(order.date)}</span>
                            </div>
                            {order.status === "delivered" && (
                              <div className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                <span>Delivered: {formatDate(order.estimatedDelivery)}</span>
                              </div>
                            )}
                            {order.status === "pending" && (
                              <div className="flex items-center gap-2">
                                <AccessTimeIcon className="w-4 h-4 text-yellow-500" />
                                <span>Est. Delivery: {formatDate(order.estimatedDelivery)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-gray-900">
                              {currency}
                              {order.totalAmount.toLocaleString()}
                            </p>
                          </div>
                          <ArrowForwardIcon className={`w-5 h-5 text-gray-400 transition-transform ${
                            expandedOrder === order.id ? "rotate-90" : ""
                          }`} />
                        </div>
                      </div>
                    </div>

                    {/* Order Details (Expandable) */}
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-200">
                            {/* Order Items */}
                            <div className="mb-6">
                              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                              <div className="space-y-4">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-16 h-16 object-cover rounded-lg"
                                      onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/100";
                                      }}
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                        <span>Qty: {item.quantity}</span>
                                        <span>Size: {item.size}</span>
                                        <span>Price: {currency}{item.price}</span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-gray-900">
                                        {currency}
                                        {item.price * item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              {/* Shipping Info */}
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <LocalShippingIcon className="w-5 h-5" />
                                  Shipping Information
                                </h4>
                                <p className="text-gray-600 text-sm">{order.shippingAddress}</p>
                                <div className="mt-3">
                                  <p className="text-sm text-gray-500">Tracking Number</p>
                                  <p className="font-mono text-gray-900">{order.trackingNumber}</p>
                                </div>
                              </div>

                              {/* Payment Info */}
                              <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <PaymentIcon className="w-5 h-5" />
                                  Payment Information
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Method:</span>
                                    <span className="font-medium">{order.paymentMethod}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium ${
                                      order.paymentStatus === "paid" 
                                        ? "text-green-600" 
                                        : "text-red-600"
                                    }`}>
                                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Total:</span>
                                    <span className="font-bold text-gray-900">
                                      {currency}
                                      {order.totalAmount.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                              {order.status === "delivered" && (
                                <>
                                  <button className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    Write a Review
                                  </button>
                                  <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                    <DownloadIcon className="w-4 h-4" />
                                    Invoice
                                  </button>
                                </>
                              )}
                              
                              {order.status === "pending" && (
                                <>
                                  <button className="px-4 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                                    <ShoppingBagIcon className="w-4 h-4" />
                                    Track Order
                                  </button>
                                  <button className="px-4 py-2.5 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors">
                                    Cancel Order
                                  </button>
                                </>
                              )}
                              
                              {order.status === "cancelled" && (
                                <button className="px-4 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
                                  Buy Again
                                </button>
                              )}
                              
                              <button className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors ml-auto">
                                Need Help?
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBagIcon className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {selectedFilter === "all" 
                    ? "You haven't placed any orders yet. Start shopping!"
                    : `You don't have any ${selectedFilter} orders.`}
                </p>
                <button
                  onClick={() => setSelectedFilter("all")}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Orders
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stats and Summary */}
        {filteredOrders.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <p className="text-3xl font-bold mb-2">
                {currency}
                {filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
              </p>
              <p className="text-blue-100 text-sm">
                Total value of {selectedFilter} orders
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Order Status</h3>
              <div className="space-y-3">
                {["delivered", "pending", "cancelled"].map((status) => {
                  const count = mockOrders.filter(order => order.status === status).length;
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-gray-600 capitalize">{status}</span>
                      <span className="font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {mockOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <span className="text-gray-600 truncate">{order.id}</span>
                    <span className="text-sm text-gray-500">{formatDate(order.date)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;