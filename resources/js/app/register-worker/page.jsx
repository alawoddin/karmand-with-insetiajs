// src/app/register-worker/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FaUserTie, FaUser, FaLock, FaEye, FaEyeSlash, 
  FaPhone, FaEnvelope, FaCheckCircle, FaExclamationTriangle,
  FaArrowLeft, FaTools, FaCamera, FaMapMarkerAlt, 
  FaBriefcase, FaGraduationCap, FaMoneyBillWave,
  FaUpload, FaCalendarAlt, FaIdCard, FaShieldAlt,
  FaStar, FaCertificate, FaAward
} from 'react-icons/fa';

export default function RegisterWorkerPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1); // 1, 2, 3
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // دسته‌بندی خدمات
  const serviceCategories = [
    { id: 1, name: 'نجاری و چوب', icon: '🪚' },
    { id: 2, name: 'برق‌کاری', icon: '⚡' },
    { id: 3, name: 'لوله‌کشی', icon: '🔧' },
    { id: 4, name: 'نقاشی ساختمان', icon: '🎨' },
    { id: 5, name: 'تعمیرات موبایل', icon: '📱' },
    { id: 6, name: 'مکانیک خودرو', icon: '🚗' },
    { id: 7, name: 'نظافت منزل', icon: '🧹' },
    { id: 8, name: 'باغبانی', icon: '🌿' },
    { id: 9, name: 'تعمیر لوازم خانگی', icon: '🏠' },
    { id: 10, name: 'نصب و تعمیر کولر', icon: '❄️' },
  ];

  // شهرها
  const cities = [
    'کابل', 'هرات', 'مزارشریف', 'قندهار', 'جلال‌آباد',
    'غزنی', 'کندز', 'پل‌خمری', 'خوست', 'فراه'
  ];

  // سطوح تخصص
  const experienceLevels = [
    { id: 'beginner', name: 'تازه کار (کمتر از ۱ سال)' },
    { id: 'intermediate', name: 'متوسط (۱-۳ سال)' },
    { id: 'advanced', name: 'حرفه‌ای (۳-۵ سال)' },
    { id: 'expert', name: 'استادکار (بیشتر از ۵ سال)' },
  ];

  // داده‌های فرم
  const [formData, setFormData] = useState({
    // مرحله ۱: اطلاعات شخصی
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationalId: '',
    birthDate: '',
    
    // مرحله ۲: اطلاعات تخصص
    selectedServices: [],
    experienceLevel: '',
    hourlyRate: '',
    description: '',
    certificates: [],
    
    // مرحله ۳: اطلاعات موقعیت
    city: '',
    districts: [], // محله‌هایی که فعالیت می‌کند
    workRadius: '5', // شعاع فعالیت به کیلومتر
    vehicle: false,
    tools: [],
    
    // موافقت‌نامه‌ها
    agreeToTerms: false,
    readyToVerify: false,
  });

  // تصاویر نمونه کار
  const [portfolioImages, setPortfolioImages] = useState([]);

  // بررسی کامل بودن مرحله
  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return (
          formData.fullName.trim() &&
          formData.phone.trim() &&
          formData.email.trim() &&
          formData.password.trim() &&
          formData.confirmPassword.trim() &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return (
          formData.selectedServices.length > 0 &&
          formData.experienceLevel &&
          formData.hourlyRate &&
          formData.description.trim().length >= 20
        );
      case 3:
        return (
          formData.city &&
          formData.districts.length > 0 &&
          formData.agreeToTerms &&
          formData.readyToVerify
        );
      default:
        return false;
    }
  };

  // تغییر مرحله
  const handleNextStep = () => {
    if (isStepComplete(activeStep)) {
      if (activeStep < 3) {
        setActiveStep(activeStep + 1);
      } else {
        handleSubmit();
      }
    } else {
      setError('لطفا تمام فیلدهای ضروری را پر کنید');
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      setError('');
    }
  };

  // مدیریت انتخاب خدمات
  const toggleService = (serviceId) => {
    const isSelected = formData.selectedServices.includes(serviceId);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedServices: formData.selectedServices.filter(id => id !== serviceId)
      });
    } else {
      if (formData.selectedServices.length < 3) { // حداکثر ۳ خدمت
        setFormData({
          ...formData,
          selectedServices: [...formData.selectedServices, serviceId]
        });
      } else {
        setError('حداکثر ۳ خدمت می‌توانید انتخاب کنید');
      }
    }
  };

  // آپلود تصویر نمونه کار
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (portfolioImages.length + files.length <= 10) {
      // شبیه‌سازی آپلود (در حالت واقعی باید به سرور ارسال شود)
      const newImages = files.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2) // MB
      }));
      setPortfolioImages([...portfolioImages, ...newImages]);
    } else {
      setError('حداکثر ۱۰ تصویر می‌توانید آپلود کنید');
    }
  };

  // حذف تصویر
  const removeImage = (id) => {
    setPortfolioImages(portfolioImages.filter(img => img.id !== id));
  };

  // ثبت نهایی
  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    // شبیه‌سازی ثبت‌نام
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('ثبت‌نام شما با موفقیت انجام شد! تیم کارمند تپ ظرف ۲۴ ساعت با شما تماس خواهد گرفت.');
      
      // هدایت بعد از 3 ثانیه
      setTimeout(() => {
        router.push('/dashboard/worker');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* هدر صفحه */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-3xl shadow-2xl mb-6">
            <FaUserTie className="text-white text-4xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            ثبت‌نام به عنوان کارگر
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            به خانواده کارگران ماهر کارمند تپ بپیوندید و درآمد خود را افزایش دهید
          </p>
        </div>

        {/* نوار پیشرفت */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            {/* خط پیشرفت */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 -translate-y-1/2 z-10 transition-all duration-500"
              style={{ width: `${((activeStep - 1) / 2) * 100}%` }}
            ></div>

            {/* مراحل */}
            {[
              { number: 1, title: 'اطلاعات شخصی' },
              { number: 2, title: 'تخصص و مهارت' },
              { number: 3, title: 'موقعیت و تأیید' }
            ].map((step, index) => (
              <div key={index} className="relative z-20 text-center">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3
                  ${activeStep > index + 1 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white' 
                    : activeStep === index + 1
                    ? 'bg-white border-4 border-blue-500 text-blue-600'
                    : 'bg-white border-4 border-gray-300 text-gray-400'
                  } shadow-lg
                `}>
                  {activeStep > index + 1 ? (
                    <FaCheckCircle className="text-xl" />
                  ) : (
                    <span className="text-xl font-bold">{step.number}</span>
                  )}
                </div>
                <div className="font-medium text-gray-700">{step.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* کارت ثبت‌نام */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          
          {/* نمایش پیام‌ها */}
          {(error || success) && (
            <div className={`p-6 ${error ? 'bg-red-50' : 'bg-green-50'} border-b ${error ? 'border-red-200' : 'border-green-200'}`}>
              <div className="flex items-center">
                {error ? <FaExclamationTriangle className="text-red-500 ml-3" /> : <FaCheckCircle className="text-green-500 ml-3" />}
                <span className={error ? 'text-red-700' : 'text-green-700'}>
                  {error || success}
                </span>
              </div>
            </div>
          )}

          {/* محتوای فرم */}
          <div className="p-8">
            
            {/* مرحله ۱: اطلاعات شخصی */}
            {activeStep === 1 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <FaUser className="ml-3 text-blue-600" />
                  اطلاعات شخصی
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* نام کامل */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      نام کامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* شماره موبایل */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      شماره موبایل <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaPhone />
                      </div>
                      <input
                        type="tel"
                        placeholder="۰۷۹۹۱۲۳۴۵۶۷"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* ایمیل */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      آدرس ایمیل <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* کد ملی */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      کد ملی <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaIdCard />
                      </div>
                      <input
                        type="text"
                        placeholder="۰۰۰۰۰۰۰۰۰۰"
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* رمز عبور */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      رمز عبور <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type="password"
                        placeholder="رمز عبور قوی انتخاب کنید"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* تکرار رمز عبور */}
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      تکرار رمز عبور <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaLock />
                      </div>
                      <input
                        type="password"
                        placeholder="تکرار رمز عبور"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full bg-gray-50 border-2 rounded-xl pr-12 pl-4 py-3 outline-none transition-colors ${
                          formData.confirmPassword && formData.password !== formData.confirmPassword
                            ? 'border-red-500 text-red-700'
                            : 'border-gray-200 focus:border-blue-500 text-gray-700'
                        }`}
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">رمز عبور و تکرار آن مطابقت ندارند</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* مرحله ۲: تخصص و مهارت */}
            {activeStep === 2 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <FaTools className="ml-3 text-blue-600" />
                  تخصص و مهارت‌ها
                </h2>

                {/* انتخاب خدمات */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">
                    خدمات شما <span className="text-red-500">*</span>
                    <span className="text-sm text-gray-500 mr-3">(حداکثر ۳ مورد)</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {serviceCategories.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${
                          formData.selectedServices.includes(service.id)
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl mb-2">{service.icon}</span>
                        <span className="text-sm font-medium">{service.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* سطح تجربه */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">
                    سطح تجربه و تخصص <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {experienceLevels.map((level) => (
                      <label
                        key={level.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center ${
                          formData.experienceLevel === level.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="experienceLevel"
                          value={level.id}
                          checked={formData.experienceLevel === level.id}
                          onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${
                          formData.experienceLevel === level.id
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.experienceLevel === level.id && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <span>{level.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* دستمزد ساعتی */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2 font-medium">
                    دستمزد ساعتی (افغانی) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FaMoneyBillWave />
                    </div>
                    <input
                      type="number"
                      placeholder="مثال: ۵۰۰"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl pr-12 pl-4 py-3 text-gray-700 outline-none transition-colors"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    این مبلغ به عنوان پایه قیمت در پروفایل شما نمایش داده می‌شود
                  </p>
                </div>

                {/* توضیحات */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2 font-medium">
                    توضیحات درباره مهارت‌های شما <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="در مورد تجربه، تخصص و نحوه کار خود توضیح دهید (حداقل ۲۰ کاراکتر)"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-gray-700 outline-none transition-colors min-h-[120px] resize-none"
                    required
                  />
                  <div className="text-sm text-gray-500 mt-2 text-left">
                    {formData.description.length}/۲۰ کاراکتر (حداقل)
                  </div>
                </div>

                {/* نمونه کارها */}
                <div>
                  <label className="block text-gray-700 mb-4 font-medium">
                    نمونه کارها (اختیاری)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label htmlFor="portfolio-upload" className="cursor-pointer">
                      <FaCamera className="text-4xl text-gray-400 mx-auto mb-4" />
                      <div className="text-gray-600 mb-2">
                        برای آپلود عکس‌های نمونه کار کلیک کنید
                      </div>
                      <div className="text-sm text-gray-500">
                        فرمت‌های مجاز: JPG, PNG | حداکثر ۱۰ تصویر
                      </div>
                    </label>
                  </div>

                  {/* نمایش تصاویر آپلود شده */}
                  {portfolioImages.length > 0 && (
                    <div className="mt-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {portfolioImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <img 
                              src={image.url} 
                              alt={image.name}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                            <div className="text-xs text-gray-500 mt-1 truncate">
                              {image.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* مرحله ۳: موقعیت و تأیید */}
            {activeStep === 3 && (
              <div className="animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                  <FaMapMarkerAlt className="ml-3 text-blue-600" />
                  موقعیت و تأیید
                </h2>

                {/* شهر */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">
                    شهر محل فعالیت <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {cities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setFormData({ ...formData, city })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.city === city
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* محله‌های فعالیت */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2 font-medium">
                    محله‌های تحت پوشش <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['افشار', 'کارته سخی', 'شهر نو', 'کارته ۳', 'کارته ۴', 'پغمان'].map((district) => (
                      <label key={district} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.districts.includes(district)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                districts: [...formData.districts, district]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                districts: formData.districts.filter(d => d !== district)
                              });
                            }
                          }}
                          className="hidden"
                        />
                        <div className={`px-4 py-2 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.districts.includes(district)
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {district}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* شعاع فعالیت */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">
                    شعاع فعالیت (کیلومتر) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={formData.workRadius}
                      onChange={(e) => setFormData({ ...formData, workRadius: e.target.value })}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xl font-bold text-blue-600 min-w-[3rem]">
                      {formData.workRadius} کیلومتر
                    </span>
                  </div>
                </div>

                {/* امکانات */}
                <div className="mb-8">
                  <label className="block text-gray-700 mb-4 font-medium">
                    امکانات جانبی
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.checked })}
                        className="hidden"
                      />
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ml-3 transition-all ${
                        formData.vehicle
                          ? 'bg-blue-500 border-blue-500'
                          : 'bg-gray-50 border-gray-300'
                      }`}>
                        {formData.vehicle && <FaCheckCircle className="text-white text-sm" />}
                      </div>
                      <span className="text-gray-700">وسیله نقلیه شخصی دارم</span>
                    </label>
                  </div>
                </div>

                {/* موافقت‌نامه‌ها */}
                <div className="mb-8 space-y-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ml-3 mt-1 transition-all ${
                      formData.agreeToTerms
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      {formData.agreeToTerms && <FaCheckCircle className="text-white text-sm" />}
                    </div>
                    <span className="text-gray-700 text-sm">
                      با <Link href="/terms/workers" className="text-blue-600 hover:underline">قوانین کارگران</Link> و{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">حریم خصوصی</Link> کارمند تپ موافقم
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.readyToVerify}
                      onChange={(e) => setFormData({ ...formData, readyToVerify: e.target.checked })}
                      className="hidden"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ml-3 mt-1 transition-all ${
                      formData.readyToVerify
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      {formData.readyToVerify && <FaCheckCircle className="text-white text-sm" />}
                    </div>
                    <span className="text-gray-700 text-sm">
                      آماده‌ام مدارک و هویت من توسط تیم کارمند تپ تأیید شود
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>
                </div>

                {/* مزایای ثبت‌نام */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaAward className="ml-3 text-blue-600" />
                    مزایای ثبت‌نام کارگر در کارمند تپ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 ml-3" />
                      <span className="text-gray-700">امتیازدهی و اعتبارسنجی</span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="text-green-500 ml-3" />
                      <span className="text-gray-700">دسترسی به مشتریان واقعی</span>
                    </div>
                    <div className="flex items-center">
                      <FaShieldAlt className="text-purple-500 ml-3" />
                      <span className="text-gray-700">تضمین پرداخت امن</span>
                    </div>
                    <div className="flex items-center">
                      <FaCertificate className="text-orange-500 ml-3" />
                      <span className="text-gray-700">گواهی معتبر کاری</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* دکمه‌های ناوبری */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              {activeStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center"
                >
                  <FaArrowLeft className="ml-2" />
                  مرحله قبل
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading}
                className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-3"></div>
                    در حال پردازش...
                  </div>
                ) : activeStep < 3 ? (
                  'مرحله بعد'
                ) : (
                  'تکمیل ثبت‌نام'
                )}
              </button>
            </div>

            {/* اطلاعات تماس پشتیبانی */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                برای راهنمایی بیشتر با پشتیبانی کارمند تپ تماس بگیرید
              </p>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <div className="flex items-center text-gray-700">
                  <FaPhone className="ml-2 text-blue-600" />
                  <span className="font-medium">۰۷۹۹ ۱۲۳ ۴۵۶۷</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FaEnvelope className="ml-2 text-blue-600" />
                  <span className="font-medium">support@karma.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* لینک به صفحه ورود */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            قبلاً ثبت‌نام کرده‌اید؟
          </p>
          <Link
            href="/login"
            className="inline-flex items-center py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <FaArrowLeft className="ml-2" />
            ورود به حساب کاربری
          </Link>
        </div>
      </div>
    </div>
  );
}