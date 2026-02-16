// src/components/sections/HowItWorks.jsx
import { FaSearch, FaUserCheck, FaTools, FaStar } from 'react-icons/fa';

const steps = [
  {
    icon: <FaSearch />,
    title: 'جستجوی کارگر',
    description: 'خدمت مورد نیاز خود را جستجو کنید و از بین کارگران ماهر انتخاب کنید.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <FaUserCheck />,
    title: 'بررسی پروفایل',
    description: 'نمونه کارها، نظرات و امتیاز کارگران را بررسی و بهترین را انتخاب کنید.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <FaTools />,
    title: 'درخواست خدمت',
    description: 'زمان و محل کار را مشخص کنید و درخواست خود را ارسال نمایید.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FaStar />,
    title: 'رضایت و امتیاز',
    description: 'پس از اتمام کار، رضایت خود را ثبت و به کارگر امتیاز دهید.',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            کارمند  چگونه کار می‌کند؟
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تنها در ۴ مرحله ساده، کارگر مورد نظر خود را پیدا کرده و کار را به او بسپارید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step number */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                {index + 1}
              </div>

              {/* Step card */}
              <div className="bg-gray-50 rounded-3xl p-8 h-full border border-gray-200 hover:border-green-300 transition-all hover:shadow-xl">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl text-white mb-6 mx-auto`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-100 -translate-y-1/2 -translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}