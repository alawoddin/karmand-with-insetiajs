// src/app/worker/[id]/page.jsx
'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { 
  FaStar, FaMapMarkerAlt, FaClock, FaMoneyBill,
  FaPhone, FaEnvelope, FaWhatsapp, FaCheckCircle,
  FaImages, FaCalendarAlt, FaHeart, FaShareAlt,
  FaArrowLeft, FaShieldAlt, FaAward, FaUserCheck
} from 'react-icons/fa';

// داده‌های نمونه (در حالت واقعی از API گرفته می‌شود)
const workerData = {
  id: 1,
  name: 'احمد کریمی',
  profession: 'نجار',
  rating: 4.9,
  reviews: 127,
  hourlyRate: '۵۰۰',
  experience: '۸ سال',
  location: 'کابل، کارته سخی',
  address: 'خیابان اصلی، کوچه پنجم، پلاک ۱۲',
  description: 'نجاری با ۸ سال سابقه کار در زمینه‌های مختلف چوبی. تخصص اصلی در ساخت کابینت آشپزخانه، کمد دیواری، میز و صندلی. استفاده از مواد اولیه با کیفیت و قیمت منصفانه. تضمین کیفیت و زمان تحویل.',
  verified: true,
  online: true,
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  
  skills: ['ساخت کابینت', 'تعمیر درب و پنجره', 'ساخت میز و صندلی', 'ساخت کمد دیواری', 'تعمیر مبلمان'],
  
  services: [
    { name: 'ساخت کابینت آشپزخانه', price: 'از ۵,۰۰۰ افغانی' },
    { name: 'ساخت کمد دیواری', price: 'از ۸,۰۰۰ افغانی' },
    { name: 'تعمیر درب و پنجره', price: 'از ۱,۰۰۰ افغانی' },
    { name: 'ساخت میز ناهارخوری', price: 'از ۳,۰۰۰ افغانی' },
  ],
  
  portfolio: [
    { id: 1, url: 'https://via.placeholder.com/300x200/16a34a/ffffff?text=کابینت+آشپزخانه' },
    { id: 2, url: 'https://via.placeholder.com/300x200/059669/ffffff?text=کمد+دیواری' },
    { id: 3, url: 'https://via.placeholder.com/300x200/0d9488/ffffff?text=میز+ناهارخوری' },
    { id: 4, url: 'https://via.placeholder.com/300x200/10b981/ffffff?text=درب+چوبی' },
  ],
  
  reviewsList: [
    {
      id: 1,
      user: 'سارا محمدی',
      rating: 5,
      comment: 'کار بسیار تمیز و دقیقی انجام داد. مواد اولیه با کیفیتی استفاده کرد.',
      date: '۲ هفته پیش',
      userImage: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      user: 'علی رضایی',
      rating: 4,
      comment: 'زمان تحویل را به دقت رعایت کرد. قیمت منصفانه‌ای داشت.',
      date: '۱ ماه پیش',
      userImage: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
  ],
  
  availability: [
    { day: 'شنبه', status: 'available' },
    { day: 'یکشنبه', status: 'available' },
    { day: 'دوشنبه', status: 'busy' },
    { day: 'سه‌شنبه', status: 'available' },
    { day: 'چهارشنبه', status: 'available' },
    { day: 'پنجشنبه', status: 'busy' },
    { day: 'جمعه', status: 'not-available' },
  ],
};

export default function WorkerProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر پروفایل */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse mb-6 md:mb-0">
              <Link
                href="/find-worker"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <FaArrowLeft />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">پروفایل کارگر</h1>
                <p className="text-green-100">مشاهده اطلاعات کامل کارگر</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-lg ${
                  isFavorite
                    ? 'text-red-500 bg-white/20'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FaHeart />
              </button>
              <button className="p-2 rounded-lg text-white hover:bg-white/20">
                <FaShareAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* سایدبار */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              
              {/* تصویر و اطلاعات اصلی */}
              <div className="p-6 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={workerData.image}
                    alt={workerData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {workerData.online && (
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">{workerData.name}</h2>
                <p className="text-gray-600 mb-4">{workerData.profession}</p>

                {/* تأییدیه */}
                {workerData.verified && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
                    <FaUserCheck className="ml-2" />
                    <span className="font-medium">تأیید شده توسط کارمند </span>
                  </div>
                )}

                {/* امتیاز و نظرات */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 ml-1" />
                    <span className="text-2xl font-bold ml-2">{workerData.rating}</span>
                  </div>
                  <div className="mr-4">
                    <div className="font-medium">امتیاز</div>
                    <div className="text-sm text-gray-500">{workerData.reviews} نظر</div>
                  </div>
                </div>

                {/* اطلاعات تماس */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center text-gray-600">
                    <FaMoneyBill className="ml-2 text-green-500" />
                    <span>{workerData.hourlyRate} افغانی/ساعت</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <FaClock className="ml-2 text-blue-500" />
                    <span>{workerData.experience} سابقه کار</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <FaMapMarkerAlt className="ml-2 text-red-500" />
                    <span>{workerData.location}</span>
                  </div>
                </div>

                {/* دکمه‌های اقدام */}
                <div className="space-y-3">
                  <button className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center justify-center">
                    <FaPhone className="ml-2" />
                    تماس با کارگر
                  </button>
                  <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center">
                    <FaWhatsapp className="ml-2" />
                    پیام در واتساپ
                  </button>
                  <Link
                    href="/request-service"
                    className="block w-full py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 text-center"
                  >
                    درخواست کار
                  </Link>
                </div>
              </div>

              {/* مهارت‌ها */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">مهارت‌ها</h3>
                <div className="flex flex-wrap gap-2">
                  {workerData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* دسترسی‌پذیری */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">دسترسی این هفته</h3>
                <div className="grid grid-cols-7 gap-2">
                  {workerData.availability.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                        day.status === 'available' ? 'bg-green-100 text-green-600' :
                        day.status === 'busy' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {day.day.charAt(0)}
                      </div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:w-2/3">
            
            {/* تب‌های ناوبری */}
            <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'about', label: 'درباره کارگر' },
                  { id: 'portfolio', label: 'نمونه کارها' },
                  { id: 'services', label: 'خدمات و قیمت' },
                  { id: 'reviews', label: 'نظرات' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-max px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* محتوای تب‌ها */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              
              {/* تب درباره */}
              {activeTab === 'about' && (
                <div className="p-6 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">درباره {workerData.name}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {workerData.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <FaShieldAlt className="ml-2 text-green-500" />
                        تضمین کیفیت
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• استفاده از مواد اولیه با کیفیت</li>
                        <li>• گارانتی خدمات تا ۶ ماه</li>
                        <li>• رعایت زمان تحویل</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                        <FaAward className="ml-2 text-yellow-500" />
                        افتخارات
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• کارگر برتر سال ۱۴۰۲</li>
                        <li>• رتبه ۱ در بخش نجاری</li>
                        <li>• بیش از ۱۰۰ پروژه موفق</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-bold text-gray-800 mb-4">آدرس دقیق</h4>
                    <div className="flex items-start text-gray-600">
                      <FaMapMarkerAlt className="ml-2 text-red-500 mt-1" />
                      <span>{workerData.address}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* تب نمونه کارها */}
              {activeTab === 'portfolio' && (
                <div className="p-6 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaImages className="ml-2 text-green-500" />
                    گالری نمونه کارها
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {workerData.portfolio.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => setSelectedImage(image.url)}
                        className="relative cursor-pointer group"
                      >
                        <img
                          src={image.url}
                          alt="نمونه کار"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl"></div>
                      </div>
                    ))}
                  </div>

                  {/* اگر تصویری انتخاب شده بود */}
                  {selectedImage && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
                      <div className="relative max-w-4xl w-full">
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-12 left-0 text-white text-2xl"
                        >
                          × بستن
                        </button>
                        <img
                          src={selectedImage}
                          alt="نمونه کار بزرگ"
                          className="w-full rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* تب خدمات و قیمت */}
              {activeTab === 'services' && (
                <div className="p-6 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">خدمات و قیمت‌ها</h3>
                  
                  <div className="space-y-4">
                    {workerData.services.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-800">{service.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">تحویل ۳-۷ روز کاری</p>
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-green-600">{service.price}</div>
                          <button className="text-sm text-green-600 hover:text-green-700 mt-1">
                            + افزودن به سبد
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-gray-800 mb-2">نکات مهم</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• قیمت‌ها بسته به متراژ و مواد اولیه متفاوت است</li>
                      <li>• بازدید اولیه رایگان می‌باشد</li>
                      <li>• ۳۰٪ پیش‌پرداخت در زمان شروع کار</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* تب نظرات */}
              {activeTab === 'reviews' && (
                <div className="p-6 animate-fadeIn">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">
                    نظرات کاربران ({workerData.reviews} نظر)
                  </h3>
                  
                  <div className="space-y-6">
                    {workerData.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={review.userImage}
                              alt={review.user}
                              className="w-10 h-10 rounded-full ml-4"
                            />
                            <div>
                              <h4 className="font-medium text-gray-800">{review.user}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <FaStar className="text-yellow-500 ml-1" />
                                <span>{review.rating}</span>
                                <span className="mr-2">•</span>
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            ...
                          </button>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* دکمه مشاهده همه نظرات */}
                  <div className="text-center mt-8">
                    <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50">
                      مشاهده همه نظرات
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}