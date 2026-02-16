// src/app/login/page.jsx
import { useState } from "react";
import { Link, router } from "@inertiajs/react";

import { 
  FaUser, FaLock, FaEye, FaEyeSlash, FaPhone, 
  FaEnvelope, FaGoogle, FaFacebook, FaTwitter,
  FaCheckCircle, FaExclamationTriangle
} from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState("email"); // email | phone

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // اعتبارسنجی ساده
    if (!formData.emailOrPhone.trim()) {
      setError("لطفا ایمیل یا شماره موبایل خود را وارد کنید");
      return;
    }

    if (!formData.password.trim()) {
      setError("لطفا رمز عبور خود را وارد کنید");
      return;
    }

    setIsLoading(true);

    // ✅ Inertia Login Request
    router.post("/login", formData, {
      onFinish: () => setIsLoading(false),

      onError: (errors) => {
        setError(errors.message || "اطلاعات ورود اشتباه است");
      },
    });
  };

  const handleSocialLogin = (provider) => {
    console.log(`ورود با ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg mb-6">
            <FaUser className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            به کارمند تپ خوش آمدید
          </h1>
          <p className="text-gray-600">
            وارد حساب کاربری خود شوید و از خدمات ما استفاده کنید
          </p>
        </div>

        {/* کارت لاگین */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          {/* تب‌های روش ورود */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                loginMethod === 'email'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaEnvelope className="inline ml-2" />
              ورود با ایمیل
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaPhone className="inline ml-2" />
              ورود با موبایل
            </button>
          </div>

          {/* فرم لاگین */}
          <div className="p-8">
            {/* نمایش خطا */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <FaExclamationTriangle className="text-red-500 ml-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* فیلد ایمیل/موبایل */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  {loginMethod === 'email' ? 'آدرس ایمیل' : 'شماره موبایل'}
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {loginMethod === 'email' ? <FaEnvelope /> : <FaPhone />}
                  </div>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    placeholder={
                      loginMethod === 'email' 
                        ? 'example@gmail.com' 
                        : '۰۹۱۲۱۲۳۴۵۶۷'
                    }
                    value={formData.emailOrPhone}
                    onChange={(e) => setFormData({
                      ...formData,
                      emailOrPhone: e.target.value
                    })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl pr-12 pl-4 py-4 text-gray-700 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* فیلد رمز عبور */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-medium">
                    رمز عبور
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-green-600 hover:text-green-700 transition-colors"
                  >
                    فراموشی رمز؟
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={formData.password}
                    onChange={(e) => setFormData({
                      ...formData,
                      password: e.target.value
                    })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl pr-12 pl-4 py-4 text-gray-700 outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* چک‌باکس به خاطر سپاری */}
              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({
                      ...formData,
                      rememberMe: e.target.checked
                    })}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-3 transition-all ${
                    formData.rememberMe
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    {formData.rememberMe && (
                      <FaCheckCircle className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-gray-700">مرا به خاطر بسپار</span>
                </label>
              </div>

              {/* دکمه ورود */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
                  isLoading
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin ml-3"></div>
                    در حال ورود...
                  </div>
                ) : (
                  'ورود به حساب کاربری'
                )}
              </button>
            </form>

            {/* جداکننده */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">یا ورود با</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* دکمه‌های شبکه‌های اجتماعی */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
              >
                <FaGoogle size={20} />
                <span className="mr-2 text-sm font-medium hidden sm:inline">گوگل</span>
              </button>
              
              <button
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <FaFacebook size={20} />
                <span className="mr-2 text-sm font-medium hidden sm:inline">فیسبوک</span>
              </button>
              
              <button
                onClick={() => handleSocialLogin('twitter')}
                className="flex items-center justify-center p-4 bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors border border-sky-200"
              >
                <FaTwitter size={20} />
                <span className="mr-2 text-sm font-medium hidden sm:inline">توییتر</span>
              </button>
            </div>

            {/* لینک ثبت‌نام */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                حساب کاربری ندارید؟
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/register"
                  className="py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors text-center"
                >
                  ثبت‌نام مشتری
                </Link>
                <Link
                  href="/register-worker"
                  className="py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-700 transition-colors text-center"
                >
                  ثبت‌نام کارگر
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* مزایای ورود */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">امنیت بالا</h3>
            <p className="text-gray-600 text-sm">اطلاعات شما به صورت رمزنگاری شده ذخیره می‌شود</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">دسترسی سریع</h3>
            <p className="text-gray-600 text-sm">پس از ورود به همه خدمات دسترسی دارید</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">پشتیبانی ۲۴/۷</h3>
            <p className="text-gray-600 text-sm">تیم پشتیبانی ما همیشه در دسترس شماست</p>
          </div>
        </div>

        {/* برگشت به خانه */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <span className="ml-2">←</span>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}