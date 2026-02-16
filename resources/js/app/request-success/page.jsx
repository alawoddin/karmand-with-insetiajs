// src/app/request-success/page.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaCheckCircle, FaHome, FaUserFriends, FaClock,
  FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaTools,
  FaWhatsapp, FaCopy, FaShareAlt, FaDownload,
  FaStar, FaShieldAlt, FaHeadset
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function RequestSuccessPage() {
  const router = useRouter();
  const [requestData, setRequestData] = useState(null);
  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // دریافت داده‌های درخواست از localStorage
    const savedRequest = localStorage.getItem('lastServiceRequest');
    if (savedRequest) {
      setRequestData(JSON.parse(savedRequest));
    } else {
      // اگر داده‌ای وجود ندارد، کاربر را به صفحه اصلی هدایت کن
      router.push('/');
    }

    // تایمر برای هدایت خودکار
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleShare = async () => {
    if (navigator.share && requestData) {
      try {
        await navigator.share({
          title: `درخواست ${requestData.serviceName}`,
          text: `من یک درخواست ${requestData.serviceName} ثبت کردم. شماره پیگیری: ${requestData.requestId}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopyRequestId = () => {
    if (requestData?.requestId) {
      navigator.clipboard.writeText(requestData.requestId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    // در واقعیت اینجا PDF ایجاد می‌شود
    alert('در حال حاضر قابلیت دانلود PDF در دسترس نیست.');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!requestData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اطلاعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* هدر موفقیت */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl mb-6">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            درخواست شما با موفقیت ثبت شد!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            کارگران مناسب به زودی با شما تماس خواهند گرفت
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* بخش اصلی */}
            <div className="lg:col-span-2 space-y-8">
              {/* کارت خلاصه درخواست */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2">
                        خلاصه درخواست
                      </h2>
                      <div className="flex items-center">
                        <span className="text-gray-600 ml-2">شماره پیگیری:</span>
                        <span className="font-bold text-gray-800 font-mono">
                          {requestData.requestId}
                        </span>
                        <button
                          onClick={handleCopyRequestId}
                          className="mr-3 p-1 hover:bg-gray-100 rounded"
                          title="کپی شماره پیگیری"
                        >
                          <FaCopy className={`text-gray-500 ${copied ? 'text-green-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-bold">
                      در انتظار بررسی
                    </span>
                  </div>

                  <div className="space-y-6">
                    {/* ردیف اول */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                          <FaTools className="text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">خدمت درخواستی</div>
                          <div className="font-bold text-gray-800">{requestData.serviceName}</div>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                          <FaCalendarAlt className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">تاریخ درخواست</div>
                          <div className="font-bold text-gray-800">{formatDate(requestData.timestamp)}</div>
                        </div>
                      </div>
                    </div>

                    {/* ردیف دوم */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
                          <FaClock className="text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">زمان انجام</div>
                          <div className="font-bold text-gray-800">{requestData.time}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {requestData.date ? new Date(requestData.date).toLocaleDateString('fa-IR') : '---'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center ml-4">
                          <FaMapMarkerAlt className="text-orange-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">منطقه</div>
                          <div className="font-bold text-gray-800">{requestData.district}</div>
                          <div className="text-sm text-gray-600 mt-1 truncate max-w-[200px]">
                            {requestData.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* اطلاعات تماس */}
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center mb-3">
                        <FaPhone className="text-green-600 ml-2" />
                        <h3 className="font-bold text-gray-800">اطلاعات تماس</h3>
                      </div>
                      <div className="text-gray-700">
                        <div className="mb-2">
                          <span className="text-gray-600">شماره تماس:</span>{' '}
                          <span className="font-bold">{requestData.phone}</span>
                        </div>
                        {requestData.description && (
                          <div>
                            <span className="text-gray-600">توضیحات:</span>{' '}
                            <span>{requestData.description}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* وضعیت فوریت */}
                    {requestData.urgent && (
                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500 ml-2" />
                          <span className="font-bold text-yellow-700">درخواست فوری</span>
                        </div>
                        <p className="text-yellow-600 text-sm mt-2">
                          این درخواست با اولویت بالا در حال پردازش است و کارگران در اسرع وقت با شما تماس خواهند گرفت.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* مراحل بعدی */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">مراحل بعدی</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="font-bold text-blue-600">۱</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">بررسی درخواست</h3>
                        <p className="text-gray-600">
                          درخواست شما توسط تیم ما بررسی شده و با کارگران مناسب به اشتراک گذاشته می‌شود.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="font-bold text-green-600">۲</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">تماس کارگران</h3>
                        <p className="text-gray-600">
                          کارگران واجد شرایط طی ۲ ساعت آینده با شما تماس خواهند گرفت تا هماهنگی‌های لازم انجام شود.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                        <span className="font-bold text-purple-600">۳</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">انجام کار و پرداخت</h3>
                        <p className="text-gray-600">
                          پس از اتمام کار و رضایت شما، مبلغ توافق شده را به کارگر پرداخت می‌کنید.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* سایدبار */}
            <div className="space-y-8">
              {/* کارت اقدامات */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">اقدامات سریع</h2>
                  <div className="space-y-4">
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <div className="flex items-center">
                        <FaShareAlt className="text-gray-600 ml-3" />
                        <span className="font-medium text-gray-800">اشتراک‌گذاری درخواست</span>
                      </div>
                    </button>

                    <button
                      onClick={handleDownloadPDF}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <div className="flex items-center">
                        <FaDownload className="text-gray-600 ml-3" />
                        <span className="font-medium text-gray-800">دانلود رسید درخواست</span>
                      </div>
                    </button>

                    <a
                      href={`https://wa.me/989123456789?text=سلام، درخواست ${requestData.requestId} را ثبت کردم.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all"
                    >
                      <div className="flex items-center">
                        <FaWhatsapp className="text-green-500 ml-3 text-lg" />
                        <span className="font-medium text-gray-800">پشتیبانی در واتساپ</span>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* کارت ویژگی‌ها */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl shadow-xl overflow-hidden text-white"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">چرا کارگران ما؟</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaShieldAlt className="ml-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">ضمانت کیفیت</div>
                        <div className="text-sm opacity-90">۷ روز گارانتی رضایت از خدمات</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaHeadset className="ml-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">پشتیبانی ۲۴/۷</div>
                        <div className="text-sm opacity-90">همراه شما تا رضایت کامل</div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaUserFriends className="ml-3 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-bold mb-1">کارگران تأیید شده</div>
                        <div className="text-sm opacity-90">همه کارگران دارای مدارک معتبر</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* کارت زمان پاسخ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-xl overflow-hidden text-white"
              >
                <div className="p-6 text-center">
                  <FaClock className="text-3xl mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">زمان پاسخگویی</h3>
                  <p className="text-sm opacity-90 mb-4">
                    کارگران طی ۲ ساعت آینده با شما تماس خواهند گرفت
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <span className="font-bold text-2xl">۲</span>
                      <span className="mr-2">ساعت</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* دکمه‌های پایین */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center"
            >
              <FaHome className="ml-2" />
              بازگشت به صفحه اصلی
            </Link>

            <Link
              href="/my-requests"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              مشاهده وضعیت درخواست
            </Link>

            <Link
              href="/request-service"
              className="px-8 py-4 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all flex items-center justify-center"
            >
              ثبت درخواست جدید
            </Link>
          </motion.div>

          {/* پیام هدایت خودکار */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-center text-gray-600"
          >
            <p>
              تا {countdown} ثانیه دیگر به صفحه اصلی هدایت می‌شوید...
              <button
                onClick={() => router.push('/')}
                className="text-green-600 hover:text-green-700 font-bold mr-2"
              >
                (لغو هدایت)
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}