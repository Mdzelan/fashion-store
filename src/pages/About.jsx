import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold  text-center">DOTtech</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-red-600">DOTtech</span> Fashion — where quality, comfort, and style come together. From casual to formal, everyday wear to trendy collections — every piece is carefully selected to help you feel confident and look your best. With sustainable materials, timeless designs, and a customer-first approach, we’re committed to delivering fashion that fits your lifestyle. Discover your perfect look and shine in your own style.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At DOTtech Fashion, our mission is to make style accessible to everyone. We’re passionate about inspiring confidence through fashion — offering modern, high-quality clothing that blends comfort, creativity, and individuality. Our goal is to empower people to express themselves through timeless designs, all at fair prices and delivered with care.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Why Choose Zaptro?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Premium-quality fashion crafted from trusted materials</li>
            <li>Fast and secure delivery right to your doorstep</li>
            <li>Fast and secure delivery right to your doorstep</li>
            <li>Easy returns and a seamless shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We envision a future where fashion empowers individuality and inspires confidence every day. At DOTtech Fashion, we’re committed to staying ahead of the trends — offering timeless yet modern designs that are stylish, comfortable, and affordable for everyone.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Join the DOTtech Family</h3>
          <p className="text-gray-700 mb-4">
          Whether you’re a trendsetter, a professional, or simply someone who loves to look and feel good — DOTtech Fashion has something for everyone. From everyday essentials to statement pieces, we bring style that fits every personality and occasion.
          </p>
         <Link to={'/products'}><button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
            Start Shopping
          </button></Link> 
        </div>
      </div>
    </div>
  );
};

export default About;