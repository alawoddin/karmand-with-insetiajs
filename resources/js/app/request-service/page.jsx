// src/app/request-service/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaTools,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCommentDots,
  FaArrowLeft,
  FaCheckCircle,
  FaPhone,
  FaClock,
  FaShieldAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaHome,
} from "react-icons/fa";

const serviceTypes = [
  {
    id: "carpentry",
    name: "نجاری",
    icon: "🪚",
    description: "ساخت و تعمیر مبلمان، درب و پنجره",
  },
  {
    id: "electrician",
    name: "برق‌کاری",
    icon: "⚡",
    description: "نصب و تعمیر سیستم‌های برقی",
  },
  {
    id: "plumbing",
    name: "لوله‌کشی",
    icon: "🔧",
    description: "تعمیر و نصب لوله‌کشی و لوازم بهداشتی",
  },
  {
    id: "painting",
    name: "نقاشی",
    icon: "🎨",
    description: "نقاشی ساختمان و رنگ‌آمیزی",
  },
  {
    id: "mobile",
    name: "تعمیر موبایل",
    icon: "📱",
    description: "تعمیر انواع موبایل و تبلت",
  },
  {
    id: "cleaning",
    name: "نظافت",
    icon: "🧹",
    description: "نظافت منزل و محل کار",
  },
  {
    id: "appliance",
    name: "تعمیر لوازم خانگی",
    icon: "🏠",
    description: "تعمیر یخچال، ماشین لباسشویی و ...",
  },
  {
    id: "gardening",
    name: "باغبانی",
    icon: "🌿",
    description: "هرس، کاشت و نگهداری فضای سبز",
  },
];

const timeSlots = [
  "۸:۰۰ - ۱۰:۰۰ صبح",
  "۱۰:۰۰ - ۱۲:۰۰ ظهر",
  "۱۲:۰۰ - ۱۴:۰۰ بعدازظهر",
  "۱۴:۰۰ - ۱۶:۰۰ عصر",
  "۱۶:۰۰ - ۱۸:۰۰ غروب",
  "۱۸:۰۰ - ۲۰:۰۰ شب",
];

const districts = [
  "منطقه ۱",
  "منطقه ۲",
  "منطقه ۳",
  "منطقه ۴",
  "منطقه ۵",
  "منطقه ۶",
  "منطقه ۷",
  "منطقه ۸",
  "منطقه ۹",
  "منطقه ۱۰",
];

export default function RequestServicePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    serviceType: "",
    description: "",
    date: "",
    time: "",
    address: "",
    district: "",
    phone: "",
    budget: "",
    urgent: false,
    contactMethod: "phone",
  });

  // تنظیم تاریخ پیش‌فرض (فردا)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: formattedDate }));
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1 && !formData.serviceType) {
      newErrors.serviceType = "لطفا نوع خدمت را انتخاب کنید";
    }

    if (step === 2) {
      if (!formData.date) newErrors.date = "تاریخ را انتخاب کنید";
      if (!formData.time) newErrors.time = "بازه زمانی را انتخاب کنید";
      if (!formData.address.trim()) newErrors.address = "آدرس را وارد کنید";
      if (!formData.district) newErrors.district = "منطقه را انتخاب کنید";
      if (!formData.phone.trim()) newErrors.phone = "شماره تلفن را وارد کنید";
      if (formData.phone.trim() && !/^09[0-9]{9}$/.test(formData.phone)) {
        newErrors.phone = "شماره تلفن معتبر نیست";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // در واقعیت اینجا درخواست به API ارسال می‌شود
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ذخیره در localStorage برای نمایش در صفحه موفقیت
      localStorage.setItem(
        "lastServiceRequest",
        JSON.stringify({
          ...formData,
          serviceName:
            serviceTypes.find((s) => s.id === formData.serviceType)?.name || "",
          timestamp: new Date().toISOString(),
          requestId: "REQ-" + Date.now().toString().slice(-8),
        })
      );

      router.push("/request-success");
    } catch (error) {
      console.error("Error submitting request:", error);
      setErrors({ submit: "خطا در ارسال درخواست. لطفا مجدد تلاش کنید." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceInfo = () => {
    return serviceTypes.find((s) => s.id === formData.serviceType);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* دکمه بازگشت */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <FaArrowLeft className="ml-2" />
            بازگشت به صفحه اصلی
          </Link>
        </div>

        {/* هدر صفحه */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-lg mb-6">
            <FaTools className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            ثبت درخواست کارگر
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            درخواست خود را ثبت کنید تا کارگران مناسب با شما تماس بگیرند
          </p>
        </div>

        {/* نوار پیشرفت */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 -translate-y-1/2 z-10 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {[
              { number: 1, title: "انتخاب خدمات" },
              { number: 2, title: "جزئیات درخواست" },
              { number: 3, title: "تأیید نهایی" },
            ].map((stepItem, index) => (
              <div key={index} className="relative z-20 text-center">
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3
                  ${
                    step > index + 1
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                      : step === index + 1
                      ? "bg-white border-4 border-green-500 text-green-600"
                      : "bg-white border-4 border-gray-300 text-gray-400"
                  } shadow-lg transition-all duration-300
                `}
                >
                  {step > index + 1 ? (
                    <FaCheckCircle className="text-lg" />
                  ) : (
                    <span className="text-lg font-bold">{stepItem.number}</span>
                  )}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {stepItem.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* کارت فرم */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="p-6 md:p-8">
            {/* مرحله ۱: انتخاب خدمات */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  چه خدمتی نیاز دارید؟
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, serviceType: service.id });
                        setErrors({});
                      }}
                      className={`p-4 rounded-2xl border-2 transition-all text-center hover:scale-[1.02] ${
                        formData.serviceType === service.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <div className="text-3xl mb-3">{service.icon}</div>
                      <div className="font-bold text-gray-800 mb-1">
                        {service.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {service.description}
                      </div>
                    </button>
                  ))}
                </div>

                {errors.serviceType && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center text-red-600">
                      <FaExclamationTriangle className="ml-2" />
                      {errors.serviceType}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-6 border-t">
                  <div>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      انصراف
                    </Link>
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!formData.serviceType}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${
                      formData.serviceType
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    ادامه
                    <FaArrowLeft className="mr-2 inline" />
                  </button>
                </div>
              </div>
            )}

            {/* مرحله ۲: جزئیات درخواست */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  جزئیات درخواست
                </h2>
                <p className="text-gray-600 mb-8">
                  لطفا اطلاعات مورد نیاز را تکمیل کنید
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* تاریخ */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaCalendarAlt className="ml-2 text-green-600" />
                        تاریخ مورد نظر
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => {
                          setFormData({ ...formData, date: e.target.value });
                          setErrors({ ...errors, date: "" });
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full bg-gray-50 border-2 ${
                          errors.date ? "border-red-300" : "border-gray-200"
                        } focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all`}
                        required
                      />
                      {errors.date && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </div>
                      )}
                    </div>

                    {/* زمان */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaClock className="ml-2 text-green-600" />
                        بازه زمانی
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => {
                          setFormData({ ...formData, time: e.target.value });
                          setErrors({ ...errors, time: "" });
                        }}
                        className={`w-full bg-gray-50 border-2 ${
                          errors.time ? "border-red-300" : "border-gray-200"
                        } focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all`}
                        required
                      >
                        <option value="">انتخاب کنید</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.time}
                        </div>
                      )}
                    </div>

                    {/* آدرس */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaMapMarkerAlt className="ml-2 text-green-600" />
                        آدرس دقیق
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => {
                          setFormData({ ...formData, address: e.target.value });
                          setErrors({ ...errors, address: "" });
                        }}
                        rows="3"
                        placeholder="خیابان، کوچه، پلاک، واحد"
                        className={`w-full bg-gray-50 border-2 ${
                          errors.address ? "border-red-300" : "border-gray-200"
                        } focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all resize-none`}
                        required
                      />
                      {errors.address && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </div>
                      )}
                    </div>

                    {/* منطقه */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaHome className="ml-2 text-green-600" />
                        منطقه
                      </label>
                      <select
                        value={formData.district}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            district: e.target.value,
                          });
                          setErrors({ ...errors, district: "" });
                        }}
                        className={`w-full bg-gray-50 border-2 ${
                          errors.district ? "border-red-300" : "border-gray-200"
                        } focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all`}
                        required
                      >
                        <option value="">انتخاب منطقه</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.district}
                        </div>
                      )}
                    </div>

                    {/* تلفن */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaPhone className="ml-2 text-green-600" />
                        شماره تماس
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          setErrors({ ...errors, phone: "" });
                        }}
                        placeholder="09XXXXXXXXX"
                        className={`w-full bg-gray-50 border-2 ${
                          errors.phone ? "border-red-300" : "border-gray-200"
                        } focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all`}
                        required
                      />
                      {errors.phone && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    {/* توضیحات */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaCommentDots className="ml-2 text-green-600" />
                        توضیحات اضافی (اختیاری)
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        rows="3"
                        placeholder="توضیحات بیشتر درباره کار مورد نظر..."
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* بودجه */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium flex items-center">
                        <FaMoneyBillWave className="ml-2 text-green-600" />
                        بودجه پیشنهادی (اختیاری)
                      </label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        placeholder="مبلغ به تومان"
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-green-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-all"
                      />
                    </div>

                    {/* فوریت */}
                    <div className="flex items-center">
                      <div className="flex items-center h-full">
                        <input
                          type="checkbox"
                          id="urgent"
                          checked={formData.urgent}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              urgent: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                        />
                        <label
                          htmlFor="urgent"
                          className="mr-2 text-gray-700 font-medium flex items-center"
                        >
                          <FaExclamationTriangle className="ml-2 text-yellow-500" />
                          درخواست فوری (هزینه اضافی دارد)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all"
                    >
                      <FaArrowLeft className="ml-2 inline" />
                      بازگشت
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      ادامه به تأیید نهایی
                      <FaArrowLeft className="mr-2 inline" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* مرحله ۳: تأیید نهایی */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    تأیید نهایی درخواست
                  </h2>
                  <p className="text-gray-600">
                    لطفا اطلاعات زیر را بررسی و تأیید کنید
                  </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  {/* خلاصه اطلاعات */}
                  <div className="space-y-6">
                    {/* خدمت انتخاب شده */}
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                        {getServiceInfo()?.icon || "🛠️"}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">نوع خدمت</div>
                        <div className="font-bold text-gray-800">
                          {getServiceInfo()?.name || "---"}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {getServiceInfo()?.description}
                        </div>
                      </div>
                    </div>

                    {/* زمان و تاریخ */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-green-600 ml-3 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">تاریخ</div>
                          <div className="font-medium text-gray-800">
                            {formData.date
                              ? new Date(formData.date).toLocaleDateString(
                                  "fa-IR"
                                )
                              : "---"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FaClock className="text-green-600 ml-3 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">زمان</div>
                          <div className="font-medium text-gray-800">
                            {formData.time || "---"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* مکان */}
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-green-600 ml-3 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500">آدرس</div>
                        <div className="font-medium text-gray-800">
                          {formData.address}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          منطقه: {formData.district}
                        </div>
                      </div>
                    </div>

                    {/* تماس */}
                    <div className="flex items-start">
                      <FaPhone className="text-green-600 ml-3 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500">شماره تماس</div>
                        <div className="font-medium text-gray-800">
                          {formData.phone}
                        </div>
                      </div>
                    </div>

                    {/* توضیحات */}
                    {formData.description && (
                      <div className="flex items-start">
                        <FaCommentDots className="text-green-600 ml-3 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">توضیحات</div>
                          <div className="font-medium text-gray-800">
                            {formData.description}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* بودجه */}
                    {formData.budget && (
                      <div className="flex items-start">
                        <FaMoneyBillWave className="text-green-600 ml-3 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">
                            بودجه پیشنهادی
                          </div>
                          <div className="font-medium text-gray-800">
                            {formatPrice(formData.budget)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* وضعیت فوریت */}
                    {formData.urgent && (
                      <div className="flex items-center p-4 bg-yellow-50 rounded-xl">
                        <FaExclamationTriangle className="text-yellow-600 ml-3" />
                        <div>
                          <div className="font-medium text-yellow-800">
                            درخواست فوری
                          </div>
                          <div className="text-sm text-yellow-600">
                            این درخواست با اولویت بالا پردازش می‌شود
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ویژگی‌های خدمات */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <FaShieldAlt className="text-green-600 text-2xl mb-3" />
                    <div className="font-bold text-gray-800 mb-1">
                      ضمانت کیفیت
                    </div>
                    <div className="text-sm text-gray-600">
                      کارگران تأیید شده با تضمین کیفیت کار
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                    <FaUserTie className="text-blue-600 text-2xl mb-3" />
                    <div className="font-bold text-gray-800 mb-1">
                      متخصصان مجرب
                    </div>
                    <div className="text-sm text-gray-600">
                      ارتباط مستقیم با کارگران حرفه‌ای
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <FaClock className="text-purple-600 text-2xl mb-3" />
                    <div className="font-bold text-gray-800 mb-1">
                      پاسخ سریع
                    </div>
                    <div className="text-sm text-gray-600">
                      حداکثر تا ۲ ساعت پاسخ دریافت کنید
                    </div>
                  </div>
                </div>

                {/* دکمه‌های نهایی */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all w-full sm:w-auto"
                  >
                    ویرایش اطلاعات
                  </button>

                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => router.push("/")}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all w-full sm:w-auto"
                    >
                      انصراف
                    </button>

                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-xl font-bold transition-all w-full sm:w-auto ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                          در حال ارسال...
                        </div>
                      ) : (
                        <>
                          تأیید و ارسال درخواست
                          <FaCheckCircle className="mr-2 inline" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {errors.submit && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center text-red-600">
                      <FaExclamationTriangle className="ml-2" />
                      {errors.submit}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* اطلاعات اضافی */}
        <div className="max-w-3xl mx-auto mt-8 text-center text-gray-600 text-sm">
          <p>
            با ثبت درخواست، با
            <Link
              href="/terms"
              className="text-green-600 hover:text-green-700 mx-1"
            >
              قوانین و شرایط
            </Link>
            موافقت می‌کنید
          </p>
        </div>
      </div>
    </div>
  );
}
