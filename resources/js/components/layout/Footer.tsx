// src/components/layout/Footer.jsx


import { Link } from "@inertiajs/react";
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, 
  FaFacebook, FaInstagram, FaTelegram, FaWhatsapp,
  FaShieldAlt, FaCheckCircle, FaHeart
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* بخش اصلی */}
      <div className="container mx-auto px-4 py-12">
        
        {/* ردیف اول: لوگو و شعار */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-2xl">ک</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">کارمند </h2>
              <p className="text-green-600 dark:text-green-400 text-sm">پلتفرم خدمات کابل</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm">
            پلتفرم تخصصی ارتباط کارگران ماهر با مشتریان در کابل. اعتماد، کیفیت و رضایت شما اولویت ماست.
          </p>
        </div>

        {/* ردیف دوم: لینک‌های مفید */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* بخش خدمات */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">خدمات ما</h3>
            <ul className="space-y-2">
              {['نجاری و چوب', 'برق‌کاری', 'لوله‌کشی', 'نقاشی ساختمان', 'تعمیرات موبایل', 'نظافت منزل'].map((service, index) => (
                <li key={index}>
                  <Link 
                    href={`/services/${service}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-2"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* بخش راهنما */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">راهنمایی</h3>
            <ul className="space-y-2">
              {[
                { title: 'چگونه کار می‌کند؟', href: '/how-it-works' },
                { title: 'راهنمای استفاده', href: '/guide' },
                { title: 'سوالات متداول', href: '/faq' },
                { title: 'قیمت‌گذاری', href: '/pricing' },
                { title: 'ثبت‌نام کارگر', href: '/worker-signup' },
                { title: 'تماس با ما', href: '/contact' },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* بخش تماس */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">ارتباط با ما</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">تلفن پشتیبانی</p>
                  <p className="font-bold text-gray-800 dark:text-white">۰۷۹۹ ۱۲۳ ۴۵۶۷</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ایمیل</p>
                  <p className="font-bold text-gray-800 dark:text-white">info@karmantap.af</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">آدرس</p>
                  <p className="font-bold text-gray-800 dark:text-white">کابل، افغانستان</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ردیف سوم: گواهی‌های اعتماد */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <FaShieldAlt className="text-3xl text-green-600 dark:text-green-400 mb-3" />
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">تضمین کیفیت</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تمام کارگران توسط تیم ما تأیید شده‌اند
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-3xl text-green-600 dark:text-green-400 mb-3" />
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">پرداخت امن</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                پرداخت‌های شما با امنیت کامل انجام می‌شود
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-3xl text-green-600 dark:text-green-400 mb-3">۲۴/۷</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-2">پشتیبانی</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                تیم پشتیبانی ما همیشه در دسترس است
              </p>
            </div>
          </div>
        </div>

        {/* ردیف چهارم: شبکه‌های اجتماعی */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* شبکه‌های اجتماعی */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-gray-600 dark:text-gray-400 text-sm">ما را دنبال کنید:</span>
              <div className="flex space-x-3 space-x-reverse">
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 transition-colors"
                >
                  <FaFacebook size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 transition-colors"
                >
                  <FaInstagram size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
                >
                  <FaTelegram size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -3 }}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 transition-colors"
                >
                  <FaWhatsapp size={18} />
                </motion.a>
              </div>
            </div>

            {/* کپی‌رایت */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} کارمند . تمام حقوق محفوظ است.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center justify-center md:justify-end">
                ساخته شده با <FaHeart className="mx-1 text-red-500" size={12} /> در کابل
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* نوار پایین */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/privacy" className="hover:text-green-600 transition-colors">
                حریم خصوصی
              </Link>
              <Link href="/terms" className="hover:text-green-600 transition-colors">
                شرایط استفاده
              </Link>
              <Link href="/sitemap" className="hover:text-green-600 transition-colors">
                نقشه سایت
              </Link>
            </div>
            <div className="text-center">
              توسعه‌یافته توسط <span className="text-green-600 font-medium">توانا تیکنالوژی</span> کابل
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}