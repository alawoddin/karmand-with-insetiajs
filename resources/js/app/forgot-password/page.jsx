// src/app/forgot-password/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaCheckCircle } from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // شبیه‌سازی ارسال ایمیل
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg mb-6">
            <FaEnvelope className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            بازیابی رمز عبور
          </h1>
          <p className="text-gray-600">
            لینک بازیابی رمز عبور به ایمیل شما ارسال خواهد شد
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-green-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ایمیل ارسال شد!
              </h2>
              <p className="text-gray-600 mb-6">
                لینک بازیابی رمز عبور به آدرس{" "}
                <span className="font-bold text-green-600">{email}</span> ارسال
                شد. لطفاً صندوق ایمیل خود را بررسی کنید.
              </p>
              <div className="space-y-4">
                <Link
                  href="/login"
                  className="block py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  بازگشت به صفحه ورود
                </Link>
                <Link
                  href="/"
                  className="block py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    آدرس ایمیل خود را وارد کنید
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl pr-12 pl-4 py-4 text-gray-700 outline-none transition-colors"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    لینک بازیابی رمز عبور به این آدرس ارسال خواهد شد
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                    isLoading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin ml-3"></div>
                      در حال ارسال...
                    </div>
                  ) : (
                    <>
                      ارسال لینک بازیابی
                      <FaArrowRight className="inline mr-2" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  ← بازگشت به صفحه ورود
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
