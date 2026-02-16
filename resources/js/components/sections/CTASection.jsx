// src/components/sections/CTASection.jsx
import { Link } from '@inertiajs/react';
import { FaArrowLeft, FaUserTie } from 'react-icons/fa';

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            همین امروز شروع کنید
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            چه نیاز به کارگر دارید و چه کارگر هستید، کارمند  بهترین راه برای ارتباط و رشد است.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/find-worker"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-all hover:shadow-xl"
            >
              پیدا کردن کارگر
              <FaArrowLeft className="mr-2" />
            </Link>
            <Link 
              href="/register-worker"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all"
            >
              <FaUserTie className="ml-2" />
              ثبت‌نام کارگر
            </Link>
          </div>

          <p className="text-gray-500 mt-10 text-sm">
            ثبت‌نام و استفاده از کارمند  کاملاً رایگان است.
          </p>
        </div>
      </div>
    </section>
  );
}