// src/app/register/page.jsx
import { useState } from "react";
import { Link, router } from "@inertiajs/react";

import { 
  FaUserPlus, FaUser, FaLock, FaEye, FaEyeSlash, 
  FaPhone, FaEnvelope, FaCheckCircle, FaExclamationTriangle,
  FaArrowLeft, FaShieldAlt, FaGoogle, FaFacebook
} from "react-icons/fa";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registerMethod, setRegisterMethod] = useState("email");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    receiveNewsletter: true,
  });

  // بررسی قدرت رمز عبور
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (password) => {
    setFormData({ ...formData, password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // اعتبارسنجی
    if (!formData.fullName.trim()) {
      setError("لطفا نام کامل خود را وارد کنید");
      return;
    }

    if (registerMethod === "email" && !formData.email.trim()) {
      setError("لطفا ایمیل خود را وارد کنید");
      return;
    }

    if (registerMethod === "phone" && !formData.phone.trim()) {
      setError("لطفا شماره موبایل خود را وارد کنید");
      return;
    }

    if (!formData.password.trim()) {
      setError("لطفا رمز عبور خود را وارد کنید");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("لطفا با قوانین و مقررات موافقت کنید");
      return;
    }

    setIsLoading(true);

    // ✅ Inertia Register Request
    router.post("/register", formData, {
      onSuccess: () => {
        setSuccess("ثبت‌نام با موفقیت انجام شد ✅");
      },

      onError: (errors) => {
        setError(errors.message || "خطا در ثبت‌نام");
      },

      onFinish: () => setIsLoading(false),
    });
  };

  const handleSocialRegister = (provider) => {
    console.log(`ثبت‌نام با ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg mb-6">
            <FaUserPlus className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            ثبت‌نام در کارمند تپ
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            به جمع هزاران کاربر کارمند تپ بپیوندید و از بهترین خدمات در کابل استفاده کنید
          </p>
        </div>

        {/* کارت ثبت‌نام */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          {/* تب‌های روش ثبت‌نام */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setRegisterMethod('email')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                registerMethod === 'email'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaEnvelope className="inline ml-2" />
              ثبت‌نام با ایمیل
            </button>
            <button
              onClick={() => setRegisterMethod('phone')}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                registerMethod === 'phone'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaPhone className="inline ml-2" />
              ثبت‌نام با موبایل
            </button>
          </div>

          {/* فرم ثبت‌نام */}
          <div className="p-8">
            {/* نمایش پیام‌ها */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <FaExclamationTriangle className="text-red-500 ml-3" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                <FaCheckCircle className="text-green-500 ml-3" />
                <span className="text-green-700">{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* فیلد نام کامل */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  نام کامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl pr-12 pl-4 py-4 text-gray-700 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* فیلد ایمیل یا موبایل */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  {registerMethod === 'email' ? 'آدرس ایمیل' : 'شماره موبایل'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {registerMethod === 'email' ? <FaEnvelope /> : <FaPhone />}
                  </div>
                  <input
                    type={registerMethod === 'email' ? 'email' : 'tel'}
                    placeholder={
                      registerMethod === 'email' 
                        ? 'example@gmail.com' 
                        : '۰۷۹۹۱۲۳۴۵۶۷'
                    }
                    value={registerMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => {
                      if (registerMethod === 'email') {
                        setFormData({ ...formData, email: e.target.value });
                      } else {
                        setFormData({ ...formData, phone: e.target.value });
                      }
                    }}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl pr-12 pl-4 py-4 text-gray-700 outline-none transition-colors"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {registerMethod === 'email' 
                    ? 'لینک تأیید به این ایمیل ارسال خواهد شد' 
                    : 'کد تأیید به این شماره ارسال خواهد شد'}
                </p>
              </div>

              {/* فیلد رمز عبور */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  رمز عبور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور قوی انتخاب کنید"
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
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

                {/* نشانگر قدرت رمز عبور */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">قدرت رمز عبور:</span>
                      <span className={`text-sm font-medium ${
                        passwordStrength <= 2 ? 'text-red-500' :
                        passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {passwordStrength <= 2 ? 'ضعیف' :
                         passwordStrength <= 3 ? 'متوسط' : 'قوی'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength <= 2 ? 'bg-red-500 w-1/3' :
                          passwordStrength <= 3 ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-full'
                        }`}
                      ></div>
                    </div>
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                        <FaCheckCircle className={`ml-2 text-xs ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`} />
                        حداقل ۸ کاراکتر
                      </li>
                      <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <FaCheckCircle className={`ml-2 text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        شامل حروف بزرگ
                      </li>
                      <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <FaCheckCircle className={`ml-2 text-xs ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-300'}`} />
                        شامل اعداد
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* فیلد تکرار رمز عبور */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  تکرار رمز عبور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را مجدداً وارد کنید"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full bg-gray-50 border-2 rounded-xl pr-12 pl-4 py-4 outline-none transition-colors ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-500 text-red-700'
                        : 'border-gray-200 focus:border-green-500 text-gray-700'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">رمز عبور و تکرار آن مطابقت ندارند</p>
                )}
              </div>

              {/* چک‌باکس‌ها */}
              <div className="mb-8 space-y-4">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-3 mt-1 transition-all ${
                    formData.agreeToTerms
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    {formData.agreeToTerms && (
                      <FaCheckCircle className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">
                    با <Link href="/terms" className="text-green-600 hover:underline">قوانین و مقررات</Link> و{' '}
                    <Link href="/privacy" className="text-green-600 hover:underline">حریم خصوصی</Link> کارمند تپ موافقم
                    <span className="text-red-500"> *</span>
                  </span>
                </label>

                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.receiveNewsletter}
                    onChange={(e) => setFormData({ ...formData, receiveNewsletter: e.target.checked })}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-3 mt-1 transition-all ${
                    formData.receiveNewsletter
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-50 border-gray-300'
                  }`}>
                    {formData.receiveNewsletter && (
                      <FaCheckCircle className="text-white text-sm" />
                    )}
                  </div>
                  <span className="text-gray-700 text-sm">
                    مایلم از آخرین تخفیف‌ها و خدمات جدید کارمند تپ مطلع شوم
                  </span>
                </label>
              </div>

              {/* دکمه ثبت‌نام */}
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
                    در حال ثبت‌نام...
                  </div>
                ) : (
                  'ایجاد حساب کاربری'
                )}
              </button>
            </form>

            {/* جداکننده */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">یا ثبت‌نام سریع با</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* دکمه‌های شبکه‌های اجتماعی */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => handleSocialRegister('google')}
                className="flex items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-200"
              >
                <FaGoogle size={20} />
                <span className="mr-3 text-sm font-medium">گوگل</span>
              </button>
              
              <button
                onClick={() => handleSocialRegister('facebook')}
                className="flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <FaFacebook size={20} />
                <span className="mr-3 text-sm font-medium">فیسبوک</span>
              </button>
            </div>

            {/* لینک ورود */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                قبلاً حساب کاربری دارید؟
              </p>
              <Link
                href="/login"
                className="inline-flex items-center py-3 px-6 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors"
              >
                <FaArrowLeft className="ml-2" />
                ورود به حساب کاربری
              </Link>
            </div>
          </div>
        </div>

        {/* مزایای ثبت‌نام */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaShieldAlt className="text-green-600 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">حساب امن</h3>
            <p className="text-gray-600 text-sm">اطلاعات شما با بالاترین سطح امنیت محافظت می‌شود</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">دسترسی آسان</h3>
            <p className="text-gray-600 text-sm">به همه کارگران و خدمات دسترسی پیدا کنید</p>
          </div>
          
          <div className="text-center p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-green-600 text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">پشتیبانی ویژه</h3>
            <p className="text-gray-600 text-sm">کاربران ثبت‌نام شده از پشتیبانی ویژه برخوردارند</p>
          </div>
        </div>

        {/* دکمه ثبت‌نام کارگر */}
        <div className="mt-10 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">کارگر هستید؟</h3>
              <p className="text-gray-600">ثبت‌نام کنید و خدمات خود را به هزاران مشتری ارائه دهید</p>
            </div>
            <Link
              href="/register-worker"
              className="mt-4 md:mt-0 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-700 transition-colors shadow-lg"
            >
              ثبت‌نام به عنوان کارگر
            </Link>
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