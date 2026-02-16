// src/app/categories/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaStar, FaUserTie, FaMapMarkerAlt,
  FaPhone, FaWhatsapp, FaClock, FaMoneyBillWave,
  FaCheckCircle, FaShieldAlt, FaTools, FaFilter,
  FaSortAmountDown, FaSearch, FaCalendarAlt,
  FaThumbsUp, FaHistory, FaRegComments,
  FaPlus, FaExternalLinkAlt, FaRegHeart,
  FaRegBookmark, FaShareAlt, FaRegEye,
  FaRegChartBar, FaRegCalendarPlus, FaRegClock,
  FaRegUserCircle, FaRegBuilding, FaRegMap
} from 'react-icons/fa';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;
  
  const [sortBy, setSortBy] = useState('rating');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [activeTab, setActiveTab] = useState('workers');
  const [showRequestModal, setShowRequestModal] = useState(false);

  // داده‌های نمونه برای دسته‌بندی‌ها
  const categoriesData = {
    1: {
      id: 1,
      title: 'نجاری و چوب',
      description: 'خدمات تخصصی نجاری شامل ساخت و تعمیر مبلمان، کابینت، درب و پنجره چوبی',
      icon: '🪚',
      color: 'from-amber-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
      totalWorkers: 85,
      avgRating: 4.8,
      avgPrice: '۲۵۰,۰۰۰ تومان',
      popularServices: ['ساخت کابینت', 'تعمیر مبلمان', 'نصب پارکت', 'ساخت درب چوبی'],
      stats: {
        completedJobs: 1250,
        satisfactionRate: '۹۷٪',
        responseTime: '۲ ساعت',
        avgCompletionTime: '۳ روز'
      },
      features: [
        'ساخت سفارشی مبلمان',
        'تعمیر تخصصی چوب',
        'نقاشی و رنگ‌آمیزی',
        'نصب درب و پنجره'
      ]
    },
    2: {
      id: 2,
      title: 'برق‌کاری',
      description: 'نصب و تعمیر سیستم‌های برقی ساختمان، تعمیر لوازم برقی',
      icon: '⚡',
      color: 'from-yellow-500 to-yellow-600',
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      totalWorkers: 120,
      avgRating: 4.7,
      avgPrice: '۲۰۰,۰۰۰ تومان',
      popularServices: ['نصب سیم‌کشی', 'تعمیر پریز', 'نصب چراغ', 'تعمیر کولر'],
      stats: {
        completedJobs: 1800,
        satisfactionRate: '۹۶٪',
        responseTime: '۱.۵ ساعت',
        avgCompletionTime: '۱ روز'
      },
      features: [
        'نصب سیستم‌های هوشمند',
        'تعمیرات تخصصی برق',
        'مشاوره رایگان',
        'گارانتی خدمات'
      ]
    },
    3: {
      id: 3,
      title: 'لوله‌کشی',
      description: 'تعمیر و نصب لوله‌کشی، شیرآلات، رفع گرفتگی و نصب لوازم بهداشتی',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      totalWorkers: 95,
      avgRating: 4.9,
      avgPrice: '۱۸۰,۰۰۰ تومان',
      popularServices: ['رفع گرفتگی', 'نصب شیرآلات', 'تعمیر توالت', 'نصب آبگرمکن'],
      stats: {
        completedJobs: 1500,
        satisfactionRate: '۹۸٪',
        responseTime: '۲ ساعت',
        avgCompletionTime: '۲ روز'
      },
      features: [
        'رفع سریع گرفتگی',
        'نصب لوازم بهداشتی',
        'تعمیر آبگرمکن',
        'سیستم‌های فاضلاب'
      ]
    }
  };

  // لیست کارگران نمونه
  const workers = [
    {
      id: 1,
      name: 'محمد کریمی',
      specialty: 'نجار',
      experience: '۱۵ سال',
      rating: 4.9,
      completedJobs: 247,
      hourlyRate: '۱۵۰,۰۰۰ تومان',
      responseTime: '۲ ساعت',
      location: 'تهران، میدان هفت تیر',
      distance: '۳ کیلومتر',
      skills: ['ساخت کابینت', 'تعمیر مبلمان', 'نصب پارکت', 'ساخت درب'],
      verified: true,
      availability: true,
      description: 'نجار با ۱۵ سال سابقه کار، متخصص در ساخت کابینت آشپزخانه و تعمیر مبلمان کلاسیک. دارای مدرک فنی‌حرفه‌ای و گواهینامه بین‌المللی.',
      tags: ['حرفه‌ای', 'پاسخگویی سریع', 'قیمت مناسب'],
      languages: ['فارسی', 'انگلیسی'],
      portfolio: ['کابینت مدرن', 'مبلمان کلاسیک', 'درب چوبی'],
      favorite: false
    },
    {
      id: 2,
      name: 'رضا احمدی',
      specialty: 'برق‌کار',
      experience: '۱۰ سال',
      rating: 4.8,
      completedJobs: 185,
      hourlyRate: '۱۳۰,۰۰۰ تومان',
      responseTime: '۱.۵ ساعت',
      location: 'تهران، پاسداران',
      distance: '۵ کیلومتر',
      skills: ['نصب سیم‌کشی', 'تعمیر پریز', 'نصب چراغ', 'تعمیر کولر'],
      verified: true,
      availability: true,
      description: 'برق‌کار صنعتی و ساختمانی با مدرک فنی‌حرفه‌ای، متخصص در سیستم‌های هوشمند ساختمان و دوربین مداربسته.',
      tags: ['سیستم هوشمند', 'تضمین کیفیت', 'پروژه‌های بزرگ'],
      languages: ['فارسی'],
      portfolio: ['برق ساختمان', 'سیستم امنیتی', 'نورپردازی'],
      favorite: true
    },
    {
      id: 3,
      name: 'علی محمدی',
      specialty: 'لوله‌کش',
      experience: '۱۲ سال',
      rating: 4.9,
      completedJobs: 210,
      hourlyRate: '۱۲۰,۰۰۰ تومان',
      responseTime: '۲.۵ ساعت',
      location: 'تهران، نیاوران',
      distance: '۸ کیلومتر',
      skills: ['رفع گرفتگی', 'نصب شیرآلات', 'تعمیر توالت', 'نصب آبگرمکن'],
      verified: true,
      availability: false,
      description: 'لوله‌کش متخصص با سابقه کار در پروژه‌های ساختمانی بزرگ و مجتمع‌های مسکونی. تجربه کار با لوله‌های CPVC و PEX.',
      tags: ['رفع اضطراری', 'تجهیزات مدرن', 'ساختمان‌های بزرگ'],
      languages: ['فارسی', 'عربی'],
      portfolio: ['لوله‌کشی مجتمع', 'تعمیرات اضطراری', 'نصب سیستم'],
      favorite: false
    },
    {
      id: 4,
      name: 'حسن رضایی',
      specialty: 'نجار',
      experience: '۸ سال',
      rating: 4.7,
      completedJobs: 125,
      hourlyRate: '۱۰۰,۰۰۰ تومان',
      responseTime: '۳ ساعت',
      location: 'تهران، شهرک غرب',
      distance: '۱۲ کیلومتر',
      skills: ['ساخت میز', 'تعمیر صندلی', 'نصب کابینت', 'ساخت قاب'],
      verified: true,
      availability: true,
      description: 'نجار جوان و پرانرژی، متخصص در ساخت مبلمان مدرن و میزهای اداری. علاقه‌مند به کارهای خلاقانه و طراحی جدید.',
      tags: ['مبلمان مدرن', 'خلاق', 'قیمت رقابتی'],
      languages: ['فارسی'],
      portfolio: ['مبلمان اداری', 'میزهای مدرن', 'ساخت سفارشی'],
      favorite: false
    },
    {
      id: 5,
      name: 'مجید حسینی',
      specialty: 'برق‌کار',
      experience: '۶ سال',
      rating: 4.6,
      completedJobs: 95,
      hourlyRate: '۱۱۰,۰۰۰ تومان',
      responseTime: '۲ ساعت',
      location: 'تهران، تجریش',
      distance: '۶ کیلومتر',
      skills: ['نصب آیفون', 'تعمیر کلید', 'نصب کنتور', 'تعمیر پنکه'],
      verified: false,
      availability: true,
      description: 'برق‌کار متخصص در تعمیرات لوازم برقی خانگی و نصب سیستم‌های صوتی و تصویری. دارای تجربه در برق خودرو نیز می‌باشد.',
      tags: ['تعمیرات خانگی', 'سیستم صوتی', 'برق خودرو'],
      languages: ['فارسی', 'ترکی'],
      portfolio: ['تعمیر لوازم', 'نصب سیستم صوتی', 'برق خودرو'],
      favorite: false
    },
    {
      id: 6,
      name: 'سعید محمودی',
      specialty: 'لوله‌کش',
      experience: '۹ سال',
      rating: 4.8,
      completedJobs: 165,
      hourlyRate: '۱۳۵,۰۰۰ تومان',
      responseTime: '۱.۵ ساعت',
      location: 'تهران، الهیه',
      distance: '۴ کیلومتر',
      skills: ['نصب شوفاژ', 'تعمیر لوله', 'نصب سینک', 'رفع نم'],
      verified: true,
      availability: true,
      description: 'لوله‌کش متخصص در سیستم‌های حرارتی و برودتی. تجربه کار با رادیاتور، شوفاژ و سیستم‌های گرمایش از کف.',
      tags: ['شوفاژ', 'گرمایش از کف', 'تخصص حرارتی'],
      languages: ['فارسی'],
      portfolio: ['سیستم شوفاژ', 'گرمایش از کف', 'رفع نم'],
      favorite: true
    }
  ];

  const category = categoriesData[categoryId] || categoriesData[1];
  
  // فیلتر و مرتب‌سازی کارگران
  const filteredWorkers = workers
    .filter(worker => 
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'experience': return parseInt(b.experience) - parseInt(a.experience);
        case 'price': 
          const priceA = parseInt(a.hourlyRate.replace(/[^0-9]/g, ''));
          const priceB = parseInt(b.hourlyRate.replace(/[^0-9]/g, ''));
          return priceA - priceB;
        case 'jobs': return b.completedJobs - a.completedJobs;
        case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
        default: return b.rating - a.rating;
      }
    });

  // مرتبط‌ترین خدمات
  const relatedCategories = [
    { id: 1, title: 'نقاشی ساختمان', workers: 75, icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { id: 2, title: 'کاشی و سرامیک', workers: 65, icon: '🧱', color: 'from-stone-600 to-stone-700' },
    { id: 3, title: 'سنگ‌کاری', workers: 45, icon: '🪨', color: 'from-gray-600 to-gray-700' },
    { id: 4, title: 'گچ‌کاری', workers: 55, icon: '🏗️', color: 'from-yellow-400 to-yellow-500' }
  ];

  // کارگران مورد علاقه
  const favoriteWorkers = workers.filter(worker => worker.favorite);

  const handleRequestWorker = (worker) => {
    router.push(`/request-service?worker=${worker.id}&service=${category.title}`);
  };

  const handleQuickRequest = () => {
    setShowRequestModal(true);
  };

  const toggleFavorite = (workerId) => {
    // در واقعیت اینجا API فراخوانی می‌شود
    alert(workers.find(w => w.id === workerId)?.favorite ? 
      'از لیست علاقه‌مندی‌ها حذف شد' : 
      'به لیست علاقه‌مندی‌ها اضافه شد'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* هدر دسته‌بندی */}
      <div className={`${category.gradient} text-white`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <Link 
                href="/categories"
                className="flex items-center text-white/90 hover:text-white mb-4"
              >
                <FaArrowLeft className="ml-2" />
                بازگشت به دسته‌بندی‌ها
              </Link>
              
              <div className="flex items-center mb-4">
                <div className="text-4xl ml-4">{category.icon}</div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.title}</h1>
                  <p className="text-white/90 max-w-2xl">{category.description}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-0 md:w-auto">
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold">{category.totalWorkers}</div>
                <div className="text-sm text-white/90">کارگر فعال</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold">{category.avgRating}</div>
                <div className="text-sm text-white/90">میانگین امتیاز</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold">{category.stats.responseTime}</div>
                <div className="text-sm text-white/90">پاسخگویی</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-2xl font-bold">{category.stats.satisfactionRate}</div>
                <div className="text-sm text-white/90">رضایت</div>
              </div>
            </div>
          </div>

          {/* تب‌های هدر */}
          <div className="flex border-b border-white/20">
            {['workers', 'details', 'prices', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium border-b-2 transition-all ${activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white'
                  }`}
              >
                {tab === 'workers' && 'کارگران'}
                {tab === 'details' && 'جزئیات'}
                {tab === 'prices' && 'تعرفه‌ها'}
                {tab === 'reviews' && 'نظرات'}
              </button>
            ))}
          </div>

          {/* نوار جستجو */}
          <div className="max-w-3xl mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder={`جستجوی کارگر ${category.title}...`}
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
          {/* سایدبار */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8">
              {/* فیلتر مرتب‌سازی */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaSortAmountDown className="ml-3 text-green-600" />
                  مرتب‌سازی بر اساس
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'rating', label: 'بالاترین امتیاز', icon: FaStar },
                    { id: 'experience', label: 'بیشترین سابقه', icon: FaHistory },
                    { id: 'price', label: 'کمترین هزینه', icon: FaMoneyBillWave },
                    { id: 'jobs', label: 'بیشترین کار', icon: FaThumbsUp },
                    { id: 'distance', label: 'نزدیک‌ترین', icon: FaMapMarkerAlt }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSortBy(item.id)}
                      className={`w-full flex items-center p-3 rounded-xl transition-all ${sortBy === item.id
                          ? 'bg-green-50 text-green-700 border-2 border-green-500'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      <item.icon className="ml-3" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* خدمات محبوب */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaStar className="ml-3 text-yellow-500" />
                  خدمات محبوب این دسته
                </h3>
                <div className="space-y-2">
                  {category.popularServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <span className="text-gray-700">{service}</span>
                      <span className="text-green-600 text-sm">→</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* آمار */}
              <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <FaRegChartBar className="ml-3 text-green-600" />
                  آمار این دسته
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">کار تکمیل شده</span>
                    <span className="font-bold">{category.stats.completedJobs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">رضایت مشتری</span>
                    <span className="font-bold text-green-600">{category.stats.satisfactionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">میانگین زمان</span>
                    <span className="font-bold">{category.stats.avgCompletionTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">میانگین هزینه</span>
                    <span className="font-bold">{category.avgPrice}</span>
                  </div>
                </div>
              </div>

              {/* ویژگی‌ها */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaCheckCircle className="ml-3 text-blue-600" />
                  ویژگی‌های این خدمت
                </h3>
                <div className="space-y-2">
                  {category.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-green-500 ml-3 text-sm" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* خدمات مرتبط */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <FaExternalLinkAlt className="ml-3 text-purple-600" />
                  خدمات مرتبط
                </h3>
                <div className="space-y-3">
                  {relatedCategories.map((related) => (
                    <Link
                      key={related.id}
                      href={`/categories/${related.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${related.color} flex items-center justify-center ml-3`}>
                          <span className="text-white">{related.icon}</span>
                        </div>
                        <span className="font-medium text-gray-800">{related.title}</span>
                      </div>
                      <span className="text-sm text-gray-600">{related.workers} کارگر</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* دکمه سریع */}
              <div className="mt-8">
                <button
                  onClick={handleQuickRequest}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center"
                >
                  <FaRegCalendarPlus className="ml-2" />
                  درخواست سریع
                </button>
              </div>
            </div>

            {/* تبلیغ ثبت‌نام */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">کارگر هستید؟</h3>
              <p className="text-white/90 text-sm mb-4">
                به جامعه کارگران متخصص کارما بپیوندید و درآمد خود را افزایش دهید
              </p>
              <Link
                href="/register-worker"
                className="block w-full py-3 bg-white text-blue-600 text-center rounded-xl font-bold hover:bg-gray-100 transition-all"
              >
                ثبت‌نام به عنوان کارگر
              </Link>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:w-3/4">
            {/* تب محتوا */}
            {activeTab === 'workers' && (
              <>
                {/* هدر */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      کارگران {category.title}
                    </h2>
                    <p className="text-gray-600">
                      {filteredWorkers.length} کارگر یافت شد
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center">
                      <span className="text-gray-600 ml-3">فقط:</span>
                      <button className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-xl">
                        <FaCheckCircle className="ml-2" />
                        تأیید شده
                      </button>
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50">
                      <FaFilter className="ml-2" />
                      فیلتر بیشتر
                    </button>
                  </div>
                </div>

                {/* کارگران مورد علاقه */}
                {favoriteWorkers.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <FaRegHeart className="ml-3 text-red-500" />
                      کارگران منتخب
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoriteWorkers.map((worker) => (
                        <div
                          key={worker.id}
                          className="bg-gradient-to-r from-pink-50 to-red-50 border-2 border-pink-200 rounded-2xl p-4"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md ml-4">
                              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
                                <FaUserTie className="text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-bold text-gray-800">{worker.name}</h4>
                                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">
                                  منتخب
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600 text-sm">
                                <FaStar className="text-yellow-500 ml-1" />
                                <span>{worker.rating}</span>
                                <span className="mr-3">({worker.completedJobs} کار)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* لیست کارگران */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="p-6">
                        {/* هدر کارت */}
                        <div className="flex items-start mb-6">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg ml-4 relative">
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <FaUserTie className="text-white text-2xl" />
                            </div>
                            <button
                              onClick={() => toggleFavorite(worker.id)}
                              className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                            >
                              <FaRegHeart className={`${worker.favorite ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                            </button>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
                                <div className="flex items-center mt-1">
                                  <FaStar className="text-yellow-500 ml-1" />
                                  <span className="font-bold text-gray-700">{worker.rating}</span>
                                  <span className="mr-3 text-sm text-gray-500">
                                    ({worker.completedJobs} کار)
                                  </span>
                                  {worker.verified && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                                      <FaCheckCircle className="ml-1 text-xs" />
                                      تأیید شده
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {!worker.availability && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                  <FaRegClock className="inline ml-1" />
                                  فعلاً مشغول
                                </span>
                              )}
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex items-center text-gray-600 mb-2">
                                <FaTools className="ml-3" />
                                <span className="font-medium">تخصص:</span>
                                <span className="mr-2">{worker.specialty}</span>
                                <span className="text-gray-500">({worker.experience} سابقه)</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaMapMarkerAlt className="ml-3" />
                                <span>{worker.location}</span>
                                <span className="mr-4 text-sm text-gray-500">({worker.distance} فاصله)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* مهارت‌ها */}
                        <div className="mb-6">
                          <div className="text-gray-700 font-medium mb-2">مهارت‌های تخصصی:</div>
                          <div className="flex flex-wrap gap-2">
                            {worker.skills.slice(0, 4).map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg"
                              >
                                {skill}
                              </span>
                            ))}
                            {worker.skills.length > 4 && (
                              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-lg">
                                +{worker.skills.length - 4}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* تگ‌ها */}
                        {worker.tags && worker.tags.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {worker.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* توضیحات */}
                        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                          {worker.description}
                        </p>

                        {/* اطلاعات پایین */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center text-gray-700">
                              <FaClock className="ml-3 text-blue-600" />
                              <div>
                                <div className="text-sm text-gray-500">پاسخگویی</div>
                                <div className="font-bold">{worker.responseTime}</div>
                              </div>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <FaMoneyBillWave className="ml-3 text-green-600" />
                              <div>
                                <div className="text-sm text-gray-500">دستمزد ساعتی</div>
                                <div className="font-bold">{worker.hourlyRate}</div>
                              </div>
                            </div>
                          </div>

                          {/* دکمه‌های اقدام */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => setSelectedWorker(worker)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center"
                            >
                              <FaRegEye className="ml-2" />
                              مشاهده
                            </button>
                            <button
                              onClick={() => handleRequestWorker(worker)}
                              disabled={!worker.availability}
                              className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center ${worker.availability
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                              <FaRegCalendarPlus className="ml-2" />
                              درخواست
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* اگر کارگری یافت نشد */}
                {filteredWorkers.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaUserTie className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">کارگری یافت نشد</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      متأسفانه کارگری با مشخصات مورد نظر شما پیدا نشد. لطفاً عبارت جستجو را تغییر دهید یا فیلترها را اصلاح کنید.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setSearchTerm('')}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                      >
                        مشاهده همه کارگران
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
              </>
            )}

            {/* تب جزئیات */}
            {activeTab === 'details' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">جزئیات خدمت {category.title}</h2>
                <div className="space-y-8">
                  {/* توضیحات کامل */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">توضیحات کامل</h3>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <p className="text-gray-700 leading-relaxed">
                        خدمت {category.title} یکی از پرطرفدارترین خدمات در پلتفرم کارما می‌باشد. 
                        این خدمت شامل {category.description.toLowerCase()} است. 
                        کارگران این حوزه از میان مجرب‌ترین و متخصص‌ترین افراد جامعه انتخاب شده‌اند 
                        و تمامی آن‌ها دارای مدارک معتبر و سابقه کاری قابل استناد می‌باشند.
                      </p>
                    </div>
                  </div>

                  {/* ویژگی‌ها */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">ویژگی‌های این خدمت</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                          <FaCheckCircle className="text-green-600 ml-4" />
                          <span className="font-medium text-gray-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* آمار */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">آمار و ارقام</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-gray-800">{category.totalWorkers}</div>
                        <div className="text-gray-600">کارگر فعال</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-gray-800">{category.stats.completedJobs.toLocaleString()}</div>
                        <div className="text-gray-600">کار تکمیل شده</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-gray-800">{category.stats.satisfactionRate}</div>
                        <div className="text-gray-600">رضایت مشتری</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-gray-800">{category.avgPrice}</div>
                        <div className="text-gray-600">میانگین هزینه</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* اطلاعات تکمیلی */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaShieldAlt className="ml-3 text-green-600" />
                چرا از کارگران {category.title} کارما استفاده کنیم؟
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 ml-3 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800">تضمین کیفیت کار</div>
                      <div className="text-gray-600 text-sm">
                        تمام کارگران از نظر تخصص و سابقه بررسی شده‌اند
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 ml-3 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800">پرداخت امن</div>
                      <div className="text-gray-600 text-sm">
                        پرداخت پس از رضایت کامل از انجام کار
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 ml-3 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800">پشتیبانی ۲۴ ساعته</div>
                      <div className="text-gray-600 text-sm">
                        همراه شما تا رضایت کامل از خدمات
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-green-500 ml-3 mt-1" />
                    <div>
                      <div className="font-bold text-gray-800">قیمت‌گذاری شفاف</div>
                      <div className="text-gray-600 text-sm">
                        بدون هیچ هزینه پنهانی و اضافی
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* لینک‌های مفید */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">لینک‌های مفید</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/request-service"
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all flex items-center"
                >
                  <FaRegCalendarPlus className="text-green-600 ml-4" />
                  <div>
                    <div className="font-bold text-gray-800">ثبت درخواست</div>
                    <div className="text-gray-600 text-sm">درخواست خدمات جدید</div>
                  </div>
                </Link>
                <Link
                  href="/find-worker"
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all flex items-center"
                >
                  <FaRegCompass className="text-blue-600 ml-4" />
                  <div>
                    <div className="font-bold text-gray-800">جستجوی پیشرفته</div>
                    <div className="text-gray-600 text-sm">کارگر مناسب خود را پیدا کنید</div>
                  </div>
                </Link>
                <Link
                  href="/profile"
                  className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all flex items-center"
                >
                  <FaRegUserCircle className="text-purple-600 ml-4" />
                  <div>
                    <div className="font-bold text-gray-800">پروفایل کاربری</div>
                    <div className="text-gray-600 text-sm">مدیریت حساب کاربری</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال نمایش اطلاعات کارگر */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">مشخصات {selectedWorker.name}</h3>
                <button
                  onClick={() => setSelectedWorker(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* اطلاعات شخصی */}
                <div className="flex items-start">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg ml-6">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <FaUserTie className="text-white text-3xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h4 className="text-xl font-bold text-gray-800">{selectedWorker.name}</h4>
                      <span className="mr-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm">
                        {selectedWorker.specialty}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700 mb-2">
                      <FaStar className="text-yellow-500 ml-2" />
                      <span className="font-bold">{selectedWorker.rating}</span>
                      <span className="mr-4">({selectedWorker.completedJobs} کار تکمیل شده)</span>
                    </div>
                    <div className="text-gray-600">{selectedWorker.description}</div>
                  </div>
                </div>

                {/* جزئیات */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaHistory className="ml-2" />
                        سابقه کار
                      </div>
                      <div className="font-bold text-gray-800">{selectedWorker.experience}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaRegMap className="ml-2" />
                        محل فعالیت
                      </div>
                      <div className="font-bold text-gray-800">{selectedWorker.location}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaRegClock className="ml-2" />
                        میانگین پاسخگویی
                      </div>
                      <div className="font-bold text-gray-800">{selectedWorker.responseTime}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaMoneyBillWave className="ml-2" />
                        دستمزد ساعتی
                      </div>
                      <div className="font-bold text-green-600 text-xl">{selectedWorker.hourlyRate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaCheckCircle className="ml-2" />
                        وضعیت تأیید
                      </div>
                      <div className="font-bold text-green-600">
                        {selectedWorker.verified ? 'تأیید شده ✓' : 'در انتظار تأیید'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1 flex items-center">
                        <FaRegCalendarPlus className="ml-2" />
                        وضعیت فعلی
                      </div>
                      <div className={`font-bold ${selectedWorker.availability ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedWorker.availability ? 'آماده به کار' : 'مشغول'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* مهارت‌ها */}
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-3">مهارت‌های تخصصی</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedWorker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* زبان‌ها */}
                {selectedWorker.languages && (
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3">زبان‌های مسلط</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedWorker.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* اقدامات */}
                <div className="flex gap-4 pt-6 border-t">
                  <button
                    onClick={() => {
                      setSelectedWorker(null);
                      handleRequestWorker(selectedWorker);
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg flex items-center justify-center"
                  >
                    <FaRegCalendarPlus className="ml-2" />
                    درخواست کارگر
                  </button>
                  <button
                    onClick={() => setSelectedWorker(null)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 flex items-center justify-center"
                  >
                    <FaRegComments className="ml-2" />
                    ارتباط با کارگر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مودال درخواست سریع */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">درخواست سریع {category.title}</h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">توضیحات کار</label>
                  <textarea
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none resize-none"
                    placeholder="کار مورد نظر خود را به طور خلاصه شرح دهید..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">آدرس</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                    placeholder="آدرس محل انجام کار"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">تاریخ</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">زمان</label>
                    <select className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none">
                      <option>۸:۰۰ - ۱۰:۰۰</option>
                      <option>۱۰:۰۰ - ۱۲:۰۰</option>
                      <option>۱۲:۰۰ - ۱۴:۰۰</option>
                      <option>۱۴:۰۰ - ۱۶:۰۰</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                >
                  انصراف
                </button>
                <button
                  onClick={() => {
                    setShowRequestModal(false);
                    router.push('/request-service');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg"
                >
                  ثبت درخواست
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}