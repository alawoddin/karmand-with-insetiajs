// src/app/categories/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaTools, FaBolt, FaWrench, FaPaintRoller, 
  FaMobileAlt, FaCar, FaShower, FaTv, 
  FaLeaf, FaBuilding, FaFan, FaShieldAlt,
  FaSearch, FaFilter, FaStar, FaUserTie,
  FaArrowLeft, FaFire, FaChartLine, FaTags,
  FaHome, FaChevronLeft, FaPlus, FaExternalLinkAlt,
  FaRegClock, FaRegCheckCircle, FaRegMoneyBillAlt,
  FaRegChartBar, FaRegCompass, FaRegLightbulb
} from 'react-icons/fa';

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // دسته‌بندی اصلی
  const mainCategories = [
    { 
      id: 'all', 
      name: 'همه خدمات', 
      icon: <FaTags />, 
      count: 500, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      description: 'تمام خدمات موجود در پلتفرم'
    },
    { 
      id: 'home', 
      name: 'خدمات خانگی', 
      icon: <FaHome />, 
      count: 250, 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      description: 'خدمات مرتبط با خانه و زندگی'
    },
    { 
      id: 'construction', 
      name: 'ساختمانی', 
      icon: <FaBuilding />, 
      count: 120, 
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      description: 'خدمات ساخت و ساز و تعمیرات ساختمان'
    },
    { 
      id: 'repair', 
      name: 'تعمیرات', 
      icon: <FaTools />, 
      count: 180, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      description: 'تعمیر وسایل و تجهیزات'
    },
    { 
      id: 'technology', 
      name: 'فناوری', 
      icon: <FaMobileAlt />, 
      count: 150, 
      color: 'bg-gradient-to-r from-gray-600 to-gray-700',
      description: 'خدمات دیجیتال و تکنولوژی'
    },
  ];

  // خدمات با جزئیات کامل
  const services = [
    { 
      id: 1, 
      icon: <FaTools />, 
      title: 'نجاری و چوب', 
      description: 'ساخت و تعمیر مبلمان و کابینت', 
      category: 'home',
      color: 'from-amber-500 to-orange-500', 
      workers: 85,
      rating: 4.8,
      popular: true,
      priceRange: 'از ۲۰۰,۰۰۰ تومان',
      features: ['ساخت سفارشی', 'تعمیر تخصصی', 'نقاشی چوب'],
      tags: ['مبلمان', 'کابینت', 'درب', 'پنجره']
    },
    { 
      id: 2, 
      icon: <FaBolt />, 
      title: 'برق‌کاری', 
      description: 'نصب و تعمیر سیستم برق ساختمان', 
      category: 'construction',
      color: 'from-yellow-500 to-yellow-600', 
      workers: 120,
      rating: 4.7,
      popular: true,
      priceRange: 'از ۱۵۰,۰۰۰ تومان',
      features: ['نصب سیم‌کشی', 'تعمیرات تخصصی', 'مشاوره رایگان'],
      tags: ['برق ساختمان', 'تعمیرات', 'نصب', 'سیستم']
    },
    { 
      id: 3, 
      icon: <FaWrench />, 
      title: 'لوله‌کشی', 
      description: 'تعمیر و نصب لوله و شیرآلات', 
      category: 'home',
      color: 'from-blue-500 to-blue-600', 
      workers: 95,
      rating: 4.9,
      popular: true,
      priceRange: 'از ۱۸۰,۰۰۰ تومان',
      features: ['رفع گرفتگی', 'نصب جدید', 'تعمیر شیرآلات'],
      tags: ['لوله', 'شیرآلات', 'توالت', 'آشپزخانه']
    },
    { 
      id: 4, 
      icon: <FaPaintRoller />, 
      title: 'نقاشی ساختمان', 
      description: 'رنگ‌آمیزی داخلی و خارجی', 
      category: 'construction',
      color: 'from-purple-500 to-pink-500', 
      workers: 75,
      rating: 4.6,
      popular: false,
      priceRange: 'از ۳۰۰,۰۰۰ تومان',
      features: ['رنگ روغنی', 'رنگ پلاستیک', 'بتونه کاری'],
      tags: ['رنگ', 'نقاشی', 'دکوراسیون', 'تعمیرات']
    },
    { 
      id: 5, 
      icon: <FaMobileAlt />, 
      title: 'تعمیر موبایل', 
      description: 'تعمیر انواع موبایل و تبلت', 
      category: 'technology',
      color: 'from-gray-600 to-gray-700', 
      workers: 110,
      rating: 4.8,
      popular: true,
      priceRange: 'از ۱۰۰,۰۰۰ تومان',
      features: ['تعویض صفحه', 'تعمیر برد', 'باطری و شارژ'],
      tags: ['موبایل', 'تبلت', 'تعمیرات', 'الکترونیک']
    },
    { 
      id: 6, 
      icon: <FaCar />, 
      title: 'مکانیک خودرو', 
      description: 'تعمیرات انواع خودرو', 
      category: 'repair',
      color: 'from-red-500 to-red-600', 
      workers: 60,
      rating: 4.5,
      popular: false,
      priceRange: 'از ۲۵۰,۰۰۰ تومان',
      features: ['تعویض روغن', 'تعمیر موتور', 'سرویس دوره‌ای'],
      tags: ['خودرو', 'مکانیک', 'تعمیرات', 'سرویس']
    },
    { 
      id: 7, 
      icon: <FaShower />, 
      title: 'تعمیر لوازم خانگی', 
      description: 'یخچال، ماشین لباسشویی، گاز', 
      category: 'repair',
      color: 'from-cyan-500 to-blue-500', 
      workers: 90,
      rating: 4.7,
      popular: true,
      priceRange: 'از ۲۲۰,۰۰۰ تومان',
      features: ['تعمیر یخچال', 'سرویس ماشین لباسشویی', 'تعمیر گاز'],
      tags: ['یخچال', 'ماشین لباسشویی', 'گاز', 'لوازم خانگی']
    },
    { 
      id: 8, 
      icon: <FaTv />, 
      title: 'نصب و تعمیر آنتن', 
      description: 'آنتن مرکزی و ماهواره', 
      category: 'technology',
      color: 'from-indigo-500 to-purple-500', 
      workers: 45,
      rating: 4.4,
      popular: false,
      priceRange: 'از ۱۲۰,۰۰۰ تومان',
      features: ['نصب آنتن', 'تنظیم ماهواره', 'تعمیر تقویت کننده'],
      tags: ['آنتن', 'ماهواره', 'تلویزیون', 'سیگنال']
    },
    { 
      id: 9, 
      icon: <FaLeaf />, 
      title: 'باغبانی', 
      description: 'هرس، چمن‌زنی، آبیاری', 
      category: 'home',
      color: 'from-green-500 to-emerald-600', 
      workers: 55,
      rating: 4.6,
      popular: false,
      priceRange: 'از ۱۵۰,۰۰۰ تومان',
      features: ['هرس درختان', 'چمن‌زنی', 'طراحی فضای سبز'],
      tags: ['باغبانی', 'فضای سبز', 'هرس', 'آبیاری']
    },
    { 
      id: 10, 
      icon: <FaBuilding />, 
      title: 'سنگ‌کاری و کاشی', 
      description: 'نصب سنگ و کاشی و سرامیک', 
      category: 'construction',
      color: 'from-stone-600 to-stone-700', 
      workers: 65,
      rating: 4.7,
      popular: false,
      priceRange: 'از ۴۰۰,۰۰۰ تومان',
      features: ['نصب سنگ', 'کاشی کاری', 'بتونه بندی'],
      tags: ['سنگ', 'کاشی', 'سرامیک', 'ساختمانی']
    },
    { 
      id: 11, 
      icon: <FaFan />, 
      title: 'تعمیر کولر و پنکه', 
      description: 'سرویس و تعمیر سیستم خنک‌کننده', 
      category: 'repair',
      color: 'from-sky-500 to-blue-400', 
      workers: 50,
      rating: 4.5,
      popular: true,
      priceRange: 'از ۱۸۰,۰۰۰ تومان',
      features: ['سرویس کولر', 'تعمیر پنکه', 'شارژ گاز'],
      tags: ['کولر', 'پنکه', 'خنک‌کننده', 'تعمیرات']
    },
    { 
      id: 12, 
      icon: <FaShieldAlt />, 
      title: 'نصب درب و حفاظ', 
      description: 'نصب درب آهنی و حفاظ پنجره', 
      category: 'construction',
      color: 'from-gray-700 to-gray-800', 
      workers: 40,
      rating: 4.8,
      popular: false,
      priceRange: 'از ۵۰۰,۰۰۰ تومان',
      features: ['نصب درب', 'حفاظ پنجره', 'جوشکاری تخصصی'],
      tags: ['درب', 'حفاظ', 'امنیت', 'جوشکاری']
    },
  ];

  // فیلتر خدمات
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // خدمات پرفروش
  const popularServices = services.filter(service => service.popular);

  // دسته‌بندی فعال
  const activeCategoryInfo = mainCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هدر */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link 
                href="/"
                className="flex items-center text-white/90 hover:text-white mb-4"
              >
                <FaArrowLeft className="ml-2" />
                بازگشت به صفحه اصلی
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                خدمات پرفروش <span className="text-yellow-300">کارما</span>
              </h1>
              <p className="text-white/90 max-w-2xl">
                از بین صدها خدمت تخصصی، نیاز خود را پیدا کرده و با بهترین کارگران ارتباط برقرار کنید
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="text-4xl font-bold mb-2">۵۰۰+</div>
                <div className="text-white/90">خدمت فعال</div>
              </div>
            </div>
          </div>

          {/* نوار جستجو */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="چه خدمتی نیاز دارید؟ (مثال: نجاری، برق‌کاری، لوله‌کشی...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/70 outline-none focus:border-white/40"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* سایدبار فیلتر */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <FaFilter className="ml-3 text-green-600" />
                دسته‌بندی خدمات
              </h2>

              <div className="space-y-3">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeCategory === category.id
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 text-green-700'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center ml-3`}>
                        <div className="text-white text-lg">
                          {category.icon}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium block">{category.name}</span>
                        <span className="text-xs text-gray-500">{category.description}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white rounded-lg text-sm font-bold">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* خدمات پرفروش */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaFire className="ml-3 text-orange-500" />
                  پرفروش‌ترین‌ها
                </h3>
                <div className="space-y-3">
                  {popularServices.slice(0, 5).map((service) => (
                    <Link
                      key={service.id}
                      href={`/categories/${service.id}`}
                      className="flex items-center p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border border-orange-200 transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center ml-3`}>
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-orange-700">
                          {service.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {service.workers} کارگر
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* نکات مهم */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center text-blue-600 mb-2">
                  <FaRegLightbulb className="ml-2" />
                  <span className="font-bold">نکات مهم</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 ml-2 mt-0.5" />
                    تمام کارگران تأیید شده هستند
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 ml-2 mt-0.5" />
                    تضمین رضایت ۱۰۰٪ مشتری
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 ml-2 mt-0.5" />
                    پرداخت پس از رضایت
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 ml-2 mt-0.5" />
                    پشتیبانی ۲۴ ساعته
                  </li>
                </ul>
              </div>

              {/* دکمه‌های سریع */}
              <div className="mt-8 space-y-3">
                <Link
                  href="/request-service"
                  className="flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <FaPlus className="ml-2" />
                  ثبت درخواست جدید
                </Link>
                <Link
                  href="/find-worker"
                  className="flex items-center justify-center p-3 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all"
                >
                  <FaRegCompass className="ml-2" />
                  جستجوی پیشرفته
                </Link>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:w-3/4">
            {/* آمار و اطلاعات */}
            <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-2xl font-bold text-green-600 mb-2">۵۰۰+</div>
                <div className="text-gray-600 flex items-center">
                  <FaUserTie className="ml-2" />
                  کارگر متخصص
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600 mb-2">۹۸٪</div>
                <div className="text-gray-600 flex items-center">
                  <FaRegChartBar className="ml-2" />
                  رضایت مشتری
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-2xl font-bold text-purple-600 mb-2">۵۰+</div>
                <div className="text-gray-600 flex items-center">
                  <FaTags className="ml-2" />
                  نوع خدمات
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="text-2xl font-bold text-orange-600 mb-2">۲۴/۷</div>
                <div className="text-gray-600 flex items-center">
                  <FaRegClock className="ml-2" />
                  پشتیبانی
                </div>
              </div>
            </div>

            {/* هدر خدمات */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {activeCategoryInfo?.name || 'همه خدمات'}
                </h2>
                <p className="text-gray-600">
                  {filteredServices.length} خدمت یافت شد
                  {activeCategoryInfo?.description && (
                    <span className="mr-4 text-sm"> - {activeCategoryInfo.description}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link
                  href="/worker/dashboard"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  <FaChartLine className="ml-2" />
                  پنل کارگران
                </Link>
              </div>
            </div>

            {/* لیست خدمات */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Link
                    key={service.id}
                    href={`/categories/${service.id}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                      {/* هدر کارت */}
                      <div className="relative">
                        <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                        <div className="absolute top-4 right-4">
                          {service.popular && (
                            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center">
                              <FaFire className="ml-1" />
                              پرفروش
                            </span>
                          )}
                        </div>
                      </div>

                      {/* بدنه کارت */}
                      <div className="p-6">
                        {/* آیکون و عنوان */}
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center ml-4`}>
                            <div className="text-white text-xl">
                              {service.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                              {service.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              <FaStar className="text-yellow-500 ml-1" />
                              <span className="text-sm text-gray-700 font-medium">{service.rating}</span>
                              <span className="mr-3 text-sm text-gray-500">
                                ({service.workers} کارگر)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* توضیحات */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        {/* تگ‌ها */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {service.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                              >
                                {tag}
                              </span>
                            ))}
                            {service.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-lg">
                                +{service.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* ویژگی‌ها */}
                        <div className="mb-6">
                          <div className="text-gray-700 text-sm font-medium mb-2">ویژگی‌ها:</div>
                          <div className="flex flex-wrap gap-2">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* فوتر کارت */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div>
                            <div className="text-sm text-gray-500">هزینه تقریبی</div>
                            <div className="font-bold text-green-600">{service.priceRange}</div>
                          </div>
                          <div className="flex items-center text-green-600 font-medium">
                            مشاهده کارگران
                            <FaChevronLeft className="mr-2 text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">خدمتی یافت نشد</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  متأسفانه خدمتی با مشخصات مورد نظر شما پیدا نشد. لطفاً عبارت جستجو را تغییر دهید یا دسته‌بندی دیگری را انتخاب کنید.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    مشاهده همه خدمات
                  </button>
                  <Link
                    href="/request-service"
                    className="px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all"
                  >
                    ثبت درخواست جدید
                  </Link>
                </div>
              </div>
            )}

            {/* تبلیغ ویژه */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-3">
                      کارگر مورد نظرتان را پیدا نکرده‌اید؟
                    </h3>
                    <p className="text-white/90 mb-6 max-w-2xl">
                      می‌توانید درخواست خود را ثبت کنید تا کارگران واجد شرایط با شما تماس بگیرند.
                      این سرویس کاملاً رایگان است!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/request-service"
                        className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-all text-center"
                      >
                        <FaPlus className="inline ml-2" />
                        ثبت درخواست
                      </Link>
                      <Link
                        href="/register-worker"
                        className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all text-center"
                      >
                        <FaUserTie className="inline ml-2" />
                        ثبت‌نام به عنوان کارگر
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FaExternalLinkAlt className="text-4xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* راهنما */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <FaRegMoneyBillAlt className="text-white text-xl" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">پرداخت امن</h4>
                <p className="text-gray-600 text-sm">
                  پرداخت پس از رضایت کامل از کار انجام شده
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <FaRegCheckCircle className="text-white text-xl" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">کارگران تأیید شده</h4>
                <p className="text-gray-600 text-sm">
                  تمام کارگران از نظر تخصص و سابقه بررسی شده‌اند
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <FaRegClock className="text-white text-xl" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2">پشتیبانی ۲۴ ساعته</h4>
                <p className="text-gray-600 text-sm">
                  همراه شما تا رضایت کامل از خدمات ارائه شده
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* لینک‌های مفید در پایین */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">لینک‌های مفید</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/find-worker"
              className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition-all"
            >
              <div className="text-green-600 font-bold mb-1">جستجوی کارگر</div>
              <div className="text-gray-600 text-sm">کارگر مناسب خود را پیدا کنید</div>
            </Link>
            <Link
              href="/request-service"
              className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition-all"
            >
              <div className="text-green-600 font-bold mb-1">ثبت درخواست</div>
              <div className="text-gray-600 text-sm">درخواست خدمات جدید ثبت کنید</div>
            </Link>
            <Link
              href="/my-requests"
              className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition-all"
            >
              <div className="text-green-600 font-bold mb-1">پیگیری درخواست</div>
              <div className="text-gray-600 text-sm">وضعیت درخواست‌های خود را ببینید</div>
            </Link>
            <Link
              href="/profile"
              className="p-4 bg-white border border-gray-200 rounded-xl text-center hover:shadow-md transition-all"
            >
              <div className="text-green-600 font-bold mb-1">پروفایل کاربری</div>
              <div className="text-gray-600 text-sm">مدیریت حساب کاربری</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}