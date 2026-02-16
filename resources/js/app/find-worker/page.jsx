// src/app/find-worker/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaSearch, FaFilter, FaMapMarkerAlt, FaStar, 
  FaUserCheck, FaClock, FaMoneyBill, FaPhone,
  FaHeart, FaShareAlt, FaSortAmountDown, FaTimes
} from 'react-icons/fa';

// داده‌های شبیه‌سازی شده کارگران
const workersData = [
  {
    id: 1,
    name: 'احمد کریمی',
    profession: 'نجار',
    rating: 4.9,
    reviews: 127,
    hourlyRate: '۵۰۰',
    experience: '۸ سال',
    location: 'کابل، کارته سخی',
    distance: '۲.۵ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    skills: ['ساخت کابینت', 'تعمیر درب', 'ساخت میز و صندلی'],
    description: 'نجاری با ۸ سال سابقه کار. تخصص در ساخت کابینت آشپزخانه و مبلمان چوبی.'
  },
  {
    id: 2,
    name: 'رضا احمدی',
    profession: 'برقکار',
    rating: 4.8,
    reviews: 89,
    hourlyRate: '۴۰۰',
    experience: '۶ سال',
    location: 'کابل، شهر نو',
    distance: '۳.۱ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    skills: ['نصب سیستم روشنایی', 'تعمیر پریز و کلید', 'تابلو برق'],
    description: 'برقکار صنعتی و ساختمانی با مجوز رسمی. خدمات سریع و با کیفیت.'
  },
  {
    id: 3,
    name: 'محمود حسینی',
    profession: 'لوله‌کش',
    rating: 4.7,
    reviews: 76,
    hourlyRate: '۴۵۰',
    experience: '۵ سال',
    location: 'کابل، کارته ۳',
    distance: '۱.۸ کیلومتر',
    verified: true,
    online: false,
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    skills: ['تعمیر لوله', 'نصب شیرآلات', 'رفع گرفتگی'],
    description: 'لوله‌کش تاسیسات با تجربه در پروژه‌های مسکونی و تجاری.'
  },
  {
    id: 4,
    name: 'علی محمدی',
    profession: 'نقاش ساختمان',
    rating: 4.9,
    reviews: 54,
    hourlyRate: '۳۵۰',
    experience: '۴ سال',
    location: 'کابل، افشار',
    distance: '۴.۲ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    skills: ['رنگ روغنی', 'پلاستیک', 'نقاشی نما'],
    description: 'نقاش ساختمان با مواد با کیفیت و قیمت منصفانه.'
  },
  {
    id: 5,
    name: 'حسن رضایی',
    profession: 'تعمیرکار موبایل',
    rating: 4.6,
    reviews: 112,
    hourlyRate: '۶۰۰',
    experience: '۷ سال',
    location: 'کابل، کارته ۴',
    distance: '۲.۷ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    skills: ['تعمیر صفحه نمایش', 'تعویض باتری', 'تعمیر نرم‌افزاری'],
    description: 'تعمیرات تخصصی انواع موبایل با گارانتی خدمات.'
  },
  {
    id: 6,
    name: 'کریم احمدی',
    profession: 'مکانیک خودرو',
    rating: 4.5,
    reviews: 93,
    hourlyRate: '۷۰۰',
    experience: '۱۰ سال',
    location: 'کابل، دشت برچی',
    distance: '۵.۳ کیلومتر',
    verified: true,
    online: false,
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    skills: ['تعمیر موتور', 'تعویض روغن', 'تنظیم موتور'],
    description: 'مکانیک خودروهای داخلی و خارجی با ابزارهای مدرن.'
  },
  {
    id: 7,
    name: 'نادر قربانی',
    profession: 'تعمیرکار لوازم خانگی',
    rating: 4.8,
    reviews: 67,
    hourlyRate: '۵۵۰',
    experience: '۹ سال',
    location: 'کابل، پغمان',
    distance: '۶.۱ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/89.jpg',
    skills: ['تعمیر یخچال', 'تعمیر ماشین لباسشویی', 'تعمیر گاز'],
    description: 'تعمیرات تخصصی لوازم خانگی برندهای مختلف.'
  },
  {
    id: 8,
    name: 'اکبر موسوی',
    profession: 'باغبان',
    rating: 4.4,
    reviews: 45,
    hourlyRate: '۳۰۰',
    experience: '۳ سال',
    location: 'کابل، قلعه شهاده',
    distance: '۳.۸ کیلومتر',
    verified: true,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
    skills: ['هرس درخت', 'چمن‌زنی', 'طراحی فضای سبز'],
    description: 'باغبانی و نگهداری از فضای سبز منازل و ویلاها.'
  },
];

// دسته‌بندی‌های خدمات
const serviceCategories = [
  { id: 'all', name: 'همه خدمات', count: 500 },
  { id: 'carpentry', name: 'نجاری', count: 85 },
  { id: 'electrician', name: 'برق‌کاری', count: 120 },
  { id: 'plumbing', name: 'لوله‌کشی', count: 95 },
  { id: 'painting', name: 'نقاشی', count: 75 },
  { id: 'mobile', name: 'تعمیر موبایل', count: 110 },
  { id: 'mechanic', name: 'مکانیک', count: 60 },
  { id: 'cleaning', name: 'نظافت', count: 90 },
];

// مناطق کابل
const areas = [
  'همه مناطق',
  'کارته سخی',
  'شهر نو',
  'کارته ۳',
  'کارته ۴',
  'افشار',
  'دشت برچی',
  'پغمان',
  'قلعه شهاده',
];

export default function FindWorkerPage() {
  const [workers, setWorkers] = useState(workersData);
  const [filters, setFilters] = useState({
    service: 'all',
    area: 'همه مناطق',
    minRating: 0,
    maxPrice: 1000,
    availability: 'all',
    sortBy: 'rating'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // فیلتر کردن کارگران
  useEffect(() => {
    let filtered = [...workersData];

    // فیلتر بر اساس جستجو
    if (searchQuery) {
      filtered = filtered.filter(worker =>
        worker.name.includes(searchQuery) ||
        worker.profession.includes(searchQuery) ||
        worker.skills.some(skill => skill.includes(searchQuery))
      );
    }

    // فیلتر بر اساس خدمت
    if (filters.service !== 'all') {
      filtered = filtered.filter(worker => 
        worker.profession === serviceCategories.find(s => s.id === filters.service)?.name.split(' ')[0]
      );
    }

    // فیلتر بر اساس منطقه
    if (filters.area !== 'همه مناطق') {
      filtered = filtered.filter(worker => 
        worker.location.includes(filters.area)
      );
    }

    // فیلتر بر اساس امتیاز
    if (filters.minRating > 0) {
      filtered = filtered.filter(worker => worker.rating >= filters.minRating);
    }

    // فیلتر بر اساس قیمت
    filtered = filtered.filter(worker => 
      parseInt(worker.hourlyRate) <= filters.maxPrice
    );

    // فیلتر بر اساس دسترسی
    if (filters.availability === 'online') {
      filtered = filtered.filter(worker => worker.online);
    }

    // مرتب‌سازی
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        filtered.sort((a, b) => parseInt(a.hourlyRate) - parseInt(b.hourlyRate));
        break;
      case 'price_high':
        filtered.sort((a, b) => parseInt(b.hourlyRate) - parseInt(a.hourlyRate));
        break;
      case 'distance':
        filtered.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setWorkers(filtered);
  }, [filters, searchQuery]);

  // افزودن به علاقه‌مندی‌ها
  const toggleFavorite = (workerId) => {
    if (favorites.includes(workerId)) {
      setFavorites(favorites.filter(id => id !== workerId));
    } else {
      setFavorites([...favorites, workerId]);
    }
  };

  // بازنشانی فیلترها
  const resetFilters = () => {
    setFilters({
      service: 'all',
      area: 'همه مناطق',
      minRating: 0,
      maxPrice: 1000,
      availability: 'all',
      sortBy: 'rating'
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر صفحه */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            پیدا کردن کارگر متخصص
          </h1>
          <p className="text-green-100 max-w-2xl">
            از بین صدها کارگر ماهر و تأییدشده در کابل، فرد مناسب را برای کار خود انتخاب کنید
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* سایدبار فیلترها (دسکتاپ) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              
              {/* دکمه بازنشانی */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">فیلترها</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  بازنشانی همه
                </button>
              </div>

              {/* جستجو */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">جستجو</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="نام کارگر یا خدمت..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none"
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* دسته‌بندی خدمات */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">نوع خدمت</label>
                <div className="space-y-2">
                  {serviceCategories.map((category) => (
                    <label key={category.id} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="service"
                          checked={filters.service === category.id}
                          onChange={() => setFilters({...filters, service: category.id})}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                          filters.service === category.id ? 'border-green-500' : 'border-gray-300'
                        }`}>
                          {filters.service === category.id && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* منطقه */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">منطقه</label>
                <div className="space-y-2">
                  {areas.map((area) => (
                    <label key={area} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="area"
                        checked={filters.area === area}
                        onChange={() => setFilters({...filters, area})}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                        filters.area === area ? 'border-green-500' : 'border-gray-300'
                      }`}>
                        {filters.area === area && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <span>{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* امتیاز */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">
                  حداقل امتیاز: {filters.minRating}+
                </label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, minRating: rating})}
                      className={`flex-1 py-2 rounded-lg text-center ${
                        filters.minRating === rating
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rating === 0 ? 'همه' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* قیمت */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">
                  حداکثر قیمت ساعتی: {filters.maxPrice} افغانی
                </label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>۱۰۰</span>
                  <span>۱۰۰۰</span>
                </div>
              </div>

              {/* وضعیت آنلاین */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 font-medium">وضعیت</label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'همه کارگران' },
                    { id: 'online', label: 'فقط آنلاین' },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        checked={filters.availability === option.id}
                        onChange={() => setFilters({...filters, availability: option.id})}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                        filters.availability === option.id ? 'border-green-500' : 'border-gray-300'
                      }`}>
                        {filters.availability === option.id && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1">
            
            {/* نوار بالایی (فیلترهای موبایل و مرتب‌سازی) */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                
                {/* تعداد نتایج */}
                <div className="text-gray-700">
                  <span className="font-bold">{workers.length}</span> کارگر پیدا شد
                </div>

                {/* مرتب‌سازی */}
                <div className="flex items-center space-x-4 space-x-reverse">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 outline-none"
                  >
                    <option value="rating">مرتبط‌ترین</option>
                    <option value="price_low">ارزان‌ترین</option>
                    <option value="price_high">گران‌ترین</option>
                    <option value="distance">نزدیک‌ترین</option>
                    <option value="reviews">بیشترین نظرات</option>
                  </select>

                  {/* دکمه فیلتر موبایل */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center px-4 py-2 bg-green-600 text-white rounded-xl"
                  >
                    <FaFilter className="ml-2" />
                    فیلترها
                  </button>
                </div>
              </div>

              {/* فیلترهای موبایل (وقتی باز است) */}
              {showFilters && (
                <div className="lg:hidden mt-6 p-4 border-t border-gray-200 animate-fadeIn">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">نوع خدمت</label>
                      <select
                        value={filters.service}
                        onChange={(e) => setFilters({...filters, service: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 outline-none"
                      >
                        {serviceCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name} ({category.count})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">منطقه</label>
                      <select
                        value={filters.area}
                        onChange={(e) => setFilters({...filters, area: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 outline-none"
                      >
                        {areas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => setShowFilters(false)}
                      className="w-full py-3 bg-green-600 text-white rounded-xl font-medium"
                    >
                      اعمال فیلترها
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* لیست کارگران */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workers.length > 0 ? (
                workers.map((worker) => (
                  <div key={worker.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
                    <div className="p-6">
                      {/* هدر کارت */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="relative">
                            <img
                              src={worker.image}
                              alt={worker.name}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            {worker.online && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{worker.name}</h3>
                            <p className="text-gray-600">{worker.profession}</p>
                          </div>
                        </div>

                        {/* آیکون‌های عمل */}
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => toggleFavorite(worker.id)}
                            className={`p-2 rounded-lg ${
                              favorites.includes(worker.id)
                                ? 'text-red-500 bg-red-50'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <FaHeart />
                          </button>
                          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                            <FaShareAlt />
                          </button>
                        </div>
                      </div>

                      {/* اطلاعات اصلی */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <FaStar className="text-yellow-500 ml-2" />
                          <span className="font-bold ml-1">{worker.rating}</span>
                          <span className="text-gray-500 text-sm mr-1">({worker.reviews} نظر)</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FaMoneyBill className="text-green-500 ml-2" />
                          <span>{worker.hourlyRate} افغانی/ساعت</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FaClock className="text-blue-500 ml-2" />
                          <span>{worker.experience} سابقه</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="text-red-500 ml-2" />
                          <span>{worker.distance}</span>
                        </div>
                      </div>

                      {/* مهارت‌ها */}
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {worker.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* توضیحات */}
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                        {worker.description}
                      </p>

                      {/* بج تأیید */}
                      {worker.verified && (
                        <div className="flex items-center text-green-600 mb-6">
                          <FaUserCheck className="ml-2" />
                          <span className="text-sm font-medium">کارگر تأییدشده کارمند تپ</span>
                        </div>
                      )}

                      {/* دکمه‌های اقدام */}
                      <div className="flex space-x-3 space-x-reverse">
                        <Link
                          href={`/worker/${worker.id}`}
                          className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
                        >
                          مشاهده پروفایل
                        </Link>
                        <button className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors flex items-center justify-center">
                          <FaPhone className="ml-2" />
                          تماس
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <div className="text-gray-400 text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">کارگری یافت نشد</h3>
                  <p className="text-gray-600 mb-8">با تغییر فیلترها دوباره جستجو کنید</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
                  >
                    بازنشانی همه فیلترها
                  </button>
                </div>
              )}
            </div>

            {/* صفحه‌بندی (در صورت نیاز) */}
            {workers.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                    ←
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-600 text-white">
                    ۱
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                    ۲
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                    ۳
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* بخش تبلیغاتی */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 mt-12 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            کارگر مناسب را پیدا نکردید؟
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            می‌توانید درخواست خود را ثبت کنید تا کارگران مناسب با شما تماس بگیرند
          </p>
          <Link
            href="/request-service"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-700 transition-all hover:shadow-xl"
          >
            ثبت درخواست جدید
          </Link>
        </div>
      </div>
    </div>
  );
}