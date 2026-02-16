// src/components/sections/ServicesSlider.jsx


import { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { 
  FaTools, FaBolt, FaWrench, FaPaintRoller, 
  FaMobileAlt, FaCar, FaShower, FaTv, 
  FaLeaf, FaBuilding, FaFan, FaShieldAlt,
  FaChevronRight, FaChevronLeft, FaPlus
} from 'react-icons/fa';

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef(null);
  
  // خدمات با آیکون‌های متنوع
  const services = [
    { id: 1, icon: <FaTools />, title: 'نجاری و چوب', description: 'ساخت و تعمیر مبلمان و کابینت', color: 'from-amber-500 to-orange-500', workers: 85 },
    { id: 2, icon: <FaBolt />, title: 'برق‌کاری', description: 'نصب و تعمیر سیستم برق ساختمان', color: 'from-yellow-500 to-yellow-600', workers: 120 },
    { id: 3, icon: <FaWrench />, title: 'لوله‌کشی', description: 'تعمیر و نصب لوله و شیرآلات', color: 'from-blue-500 to-blue-600', workers: 95 },
    { id: 4, icon: <FaPaintRoller />, title: 'نقاشی ساختمان', description: 'رنگ‌آمیزی داخلی و خارجی', color: 'from-purple-500 to-pink-500', workers: 75 },
    { id: 5, icon: <FaMobileAlt />, title: 'تعمیر موبایل', description: 'تعمیر انواع موبایل و تبلت', color: 'from-gray-600 to-gray-700', workers: 110 },
    { id: 6, icon: <FaCar />, title: 'مکانیک خودرو', description: 'تعمیرات انواع خودرو', color: 'from-red-500 to-red-600', workers: 60 },
    { id: 7, icon: <FaShower />, title: 'تعمیر لوازم خانگی', description: 'یخچال، ماشین لباسشویی، گاز', color: 'from-cyan-500 to-blue-500', workers: 90 },
    { id: 8, icon: <FaTv />, title: 'نصب و تعمیر آنتن', description: 'آنتن مرکزی و ماهواره', color: 'from-indigo-500 to-purple-500', workers: 45 },
    { id: 9, icon: <FaLeaf />, title: 'باغبانی', description: 'هرس، چمن‌زنی، آبیاری', color: 'from-green-500 to-emerald-600', workers: 55 },
    { id: 10, icon: <FaBuilding />, title: 'سنگ‌کاری و کاشی', description: 'نصب سنگ و کاشی و سرامیک', color: 'from-stone-600 to-stone-700', workers: 65 },
    { id: 11, icon: <FaFan />, title: 'تعمیر کولر و پنکه', description: 'سرویس و تعمیر سیستم خنک‌کننده', color: 'from-sky-500 to-blue-400', workers: 50 },
    { id: 12, icon: <FaShieldAlt />, title: 'نصب درب و حفاظ', description: 'نصب درب آهنی و حفاظ پنجره', color: 'from-gray-700 to-gray-800', workers: 40 },
  ];

  // اتوپلی
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.ceil(services.length / 4));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, services.length]);

  // کنترل‌های اسلاید
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.ceil(services.length / 4));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + Math.ceil(services.length / 4)) % Math.ceil(services.length / 4));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  // محاسبه اسلایدهای قابل نمایش
  const getVisibleServices = () => {
    const start = activeIndex * 4;
    const end = Math.min(start + 4, services.length);
    return services.slice(start, end);
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 border-y border-gray-200">
      <div className="container mx-auto px-4">
        
        {/* عنوان بخش */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            خدمات پرفروش <span className="text-green-600">کارما</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            از بین صدها کارگر ماهر و تأییدشده در کابل، خدمات مورد نیاز خود را انتخاب کنید
          </p>
        </div>

        {/* اسلاید شو */}
        <div className="relative">
          
          {/* دکمه‌های ناوبری */}
          <button
            onClick={prevSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-green-600 hover:shadow-xl transition-all z-10"
            aria-label="اسلاید قبلی"
          >
            <FaChevronRight />
          </button>

          <button
            onClick={nextSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-green-600 hover:shadow-xl transition-all z-10"
            aria-label="اسلاید بعدی"
          >
            <FaChevronLeft />
          </button>

          {/* اسلایدها */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {getVisibleServices().map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  {/* آیکون و عنوان */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-2xl text-white">
                        {service.icon}
                      </div>
                    </div>
                    <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                      {service.workers} کارگر
                    </span>
                  </div>

                  {/* اطلاعات */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                  {/* دکمه مشاهده */}
                  <Link
                    href={`/services/${service.id}`}
                    className="flex items-center justify-between text-green-600 hover:text-green-700 font-medium text-sm pt-4 border-t border-gray-100 group-hover:border-green-200 transition-colors"
                  >
                    <span>مشاهده کارگران</span>
                    <FaPlus className="text-xs" />
                  </Link>
                </div>

                {/* افکت هاور */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* نقاط ناوبری */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: Math.ceil(services.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setAutoplay(false);
                setTimeout(() => setAutoplay(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex 
                  ? 'bg-green-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`اسلاید ${index + 1}`}
            />
          ))}
        </div>

        {/* دکمه مشاهده همه */}
        <div className="text-center mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 hover:shadow-lg transition-all duration-300"
          >
            <FaTools className="ml-2" />
            مشاهده همه خدمات
          </Link>
        </div>

        {/* آمار زیر اسلاید */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">۵۰۰+</div>
              <div className="text-gray-600">کارگر متخصص</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">۹۸٪</div>
              <div className="text-gray-600">رضایت مشتری</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">۵۰+</div>
              <div className="text-gray-600">نوع خدمات</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">۲۴/۷</div>
              <div className="text-gray-600">پشتیبانی</div>
            </div>
          </div>
        </div>
      </div>

      {/* افکت پس‌زمینه */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}