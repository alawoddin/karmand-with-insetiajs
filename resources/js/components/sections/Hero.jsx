// src/components/sections/Hero.jsx
import { Link } from '@inertiajs/react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-green-50 to-emerald-100 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              کارگر متخصص نیاز داری؟
              <span className="block text-green-600 mt-2">
                همین حالا پیدا کن!
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              با کارمند ، به هزاران کارگر ماهر و قابل اعتماد در کابل دسترسی دارید.
              از نجاری و برقکاری تا تعمیرات و خدمات منزل.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/find-worker"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-all hover:shadow-xl"
              >
                پیدا کردن کارگر
                <FaArrowLeft className="mr-2" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all"
              >
                نحوه کار کارمند 
              </Link>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl shadow-2xl overflow-hidden">
                {/* You can replace this with an actual image */}
                <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                  🛠️
                </div>
              </div>

              {/* Stats cards */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl w-64">
                <div className="text-3xl font-bold text-green-600">۵۰۰+</div>
                <div className="text-gray-700">کارگر متخصص</div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl w-64">
                <div className="text-3xl font-bold text-green-600">۹۸٪</div>
                <div className="text-gray-700">رضایت مشتری</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </section>
  );
}
