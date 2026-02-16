// src/app/request/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt,
  FaCalendarAlt, FaClock, FaTools, FaMoneyBillWave,
  FaCommentDots, FaStar, FaCheckCircle, FaTimesCircle,
  FaExclamationTriangle, FaWhatsapp, FaEdit, FaFileInvoice,
  FaShieldAlt, FaHistory, FaHome, FaMessage,
  FaDownload, FaPrint, FaShareAlt, FaCamera,
  FaCreditCard, FaClipboardCheck, FaUserTie,
  FaExclamationCircle, FaThumbsUp, FaRegCalendarCheck
} from 'react-icons/fa';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.id;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isWorker, setIsWorker] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: '',
    communication: 5,
    quality: 5,
    punctuality: 5
  });

  // داده‌های نمونه
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها از API
    const fetchRequestData = async () => {
      setIsLoading(true);
      
      // در واقعیت اینجا از API داده دریافت می‌شود
      // برای نمونه، داده‌های ثابت استفاده می‌کنیم
      const sampleData = {
        id: requestId || 'REQ-123456',
        service: {
          name: 'نجاری و تعمیر کابینت آشپزخانه',
          category: 'carpentry',
          icon: '🪚'
        },
        description: 'کابینت آشپزخانه نیاز به تعمیر دارد. یکی از درها از لولا خارج شده و چند کشو گیر کرده‌اند. همچنین نیاز به رنگ‌آمیزی مجدد دارد.',
        additionalNotes: 'لطفاً قبل از شروع کار با من تماس بگیرید.',
        
        customer: {
          id: 'CUST-001',
          name: 'علی رضایی',
          phone: '09123456789',
          email: 'ali.rezaei@example.com',
          address: 'تهران، شهرک غرب، خیابان ایران زمین، کوچه بهار، پلاک ۱۲، واحد ۳',
          rating: 4.7,
          completedRequests: 15,
          joinDate: '۱۴۰۲/۰۸/۱۰',
          avatar: null
        },
        
        worker: {
          id: 'WORKER-001',
          name: 'محمد کریمی',
          phone: '09129876543',
          email: 'm.karimi@example.com',
          rating: 4.9,
          specialty: 'نجاری',
          experience: '۱۵ سال',
          completedJobs: 47,
          hourlyRate: '۱۵۰,۰۰۰ تومان',
          responseRate: '۹۵٪',
          address: 'تهران، میدان هفت تیر',
          avatar: null,
          skills: ['نجاری', 'کابینت سازی', 'تعمیر مبلمان', 'ساخت درب و پنجره']
        },
        
        details: {
          date: '۱۴۰۲/۱۲/۲۰',
          time: '۱۰:۰۰ - ۱۲:۰۰ صبح',
          budget: '۸۰۰,۰۰۰ تومان',
          duration: '۲ ساعت',
          urgent: true,
          status: 'in-progress',
          createdAt: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰',
          paymentMethod: 'نقدی',
          paymentStatus: 'پرداخت نشده',
          priority: 'بالا',
          estimatedMaterials: ['چوب MDF', 'لولا', 'دستگیره', 'رنگ چوب']
        },
        
        timeline: [
          { 
            id: 1,
            time: '۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰', 
            action: 'درخواست ثبت شد', 
            status: 'pending',
            description: 'مشتری درخواست خود را ثبت کرد'
          },
          { 
            id: 2,
            time: '۱۴۰۲/۱۲/۱۵ - ۱۶:۴۵', 
            action: 'کارگر پذیرفت', 
            status: 'accepted',
            description: 'کارگر درخواست را پذیرفت'
          },
          { 
            id: 3,
            time: '۱۴۰۲/۱۲/۱۶ - ۱۰:۲۰', 
            action: 'زمان انجام تنظیم شد', 
            status: 'scheduled',
            description: 'زمان انجام کار برای ۱۴۰۲/۱۲/۲۰ تنظیم شد'
          },
          { 
            id: 4,
            time: '۱۴۰۲/۱۲/۲۰ - ۱۰:۰۰', 
            action: 'کار شروع شد', 
            status: 'in-progress',
            description: 'کارگر در محل حاضر شد و کار را شروع کرد'
          }
        ],
        
        messages: [
          { 
            id: 1,
            sender: 'customer', 
            text: 'سلام، ممنون که پذیرفتید. آیا می‌توانید رنگ کابینت را هم عوض کنید؟', 
            time: '۱۴:۳۵',
            read: true
          },
          { 
            id: 2,
            sender: 'worker', 
            text: 'سلام، بله حتماً. نمونه رنگ‌ها را همراه می‌آورم.', 
            time: '۱۴:۴۰',
            read: true
          },
          { 
            id: 3,
            sender: 'customer', 
            text: 'عالی، منتظر شما هستم.', 
            time: '۱۴:۴۲',
            read: true
          },
          { 
            id: 4,
            sender: 'worker', 
            text: 'من فردا ساعت ۱۰ می‌رسم. نیاز به خرید متریال خاصی دارید؟', 
            time: '۱۶:۱۵',
            read: false
          }
        ],
        
        documents: [
          { id: 1, name: 'عکس کابینت', type: 'image', url: '#', uploadedBy: 'customer', date: '۱۴۰۲/۱۲/۱۵' },
          { id: 2, name: 'پیش‌فاکتور', type: 'pdf', url: '#', uploadedBy: 'worker', date: '۱۴۰۲/۱۲/۱۶' },
          { id: 3, name: 'نقشه اندازه‌ها', type: 'pdf', url: '#', uploadedBy: 'customer', date: '۱۴۰۲/۱۲/۱۷' }
        ],
        
        expenses: [
          { id: 1, item: 'چوب MDF', cost: '۳۵۰,۰۰۰ تومان', quantity: '۲ ورق' },
          { id: 2, item: 'لولا و دستگیره', cost: '۱۵۰,۰۰۰ تومان', quantity: '۱۲ عدد' },
          { id: 3, item: 'رنگ و ابزار', cost: '۲۰۰,۰۰۰ تومان', quantity: '۱ ست' }
        ]
      };
      
      // بررسی اینکه کاربر فعلی کارگر است یا مشتری
      // در واقعیت این اطلاعات از authentication می‌آید
      const userType = Math.random() > 0.5 ? 'worker' : 'customer';
      setIsWorker(userType === 'worker');
      
      setRequestData(sampleData);
      setIsLoading(false);
    };
    
    fetchRequestData();
  }, [requestId]);

  const handleStatusChange = (action) => {
    if (!requestData) return;
    
    let newStatus = requestData.details.status;
    let message = '';
    
    switch (action) {
      case 'accept':
        newStatus = 'accepted';
        message = 'درخواست با موفقیت پذیرفته شد!';
        break;
      case 'reject':
        if (confirm('آیا از رد این درخواست مطمئن هستید؟')) {
          newStatus = 'rejected';
          message = 'درخواست رد شد.';
        }
        break;
      case 'start':
        newStatus = 'in-progress';
        message = 'کار شروع شد!';
        break;
      case 'complete':
        newStatus = 'completed';
        message = 'کار با موفقیت به اتمام رسید!';
        break;
      case 'cancel':
        if (confirm('آیا از لغو این درخواست مطمئن هستید؟')) {
          newStatus = 'cancelled';
          message = 'درخواست لغو شد.';
        }
        break;
    }
    
    if (message) {
      setRequestData(prev => ({
        ...prev,
        details: { ...prev.details, status: newStatus },
        timeline: [
          ...prev.timeline,
          {
            id: prev.timeline.length + 1,
            time: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
            action: `وضعیت به "${getStatusInfo(newStatus).text}" تغییر کرد`,
            status: newStatus,
            description: message
          }
        ]
      }));
      alert(message);
    }
  };

  const sendMessage = () => {
    if (!message.trim() || !requestData) return;
    
    const newMessage = {
      id: requestData.messages.length + 1,
      sender: isWorker ? 'worker' : 'customer',
      text: message,
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setRequestData(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));
    setMessage('');
  };

  const getStatusInfo = (status) => {
    const config = {
      'pending': { 
        color: 'bg-yellow-100 text-yellow-800', 
        text: 'در انتظار', 
        icon: FaClock,
        badgeColor: 'yellow'
      },
      'accepted': { 
        color: 'bg-blue-100 text-blue-800', 
        text: 'پذیرفته شده', 
        icon: FaCheckCircle,
        badgeColor: 'blue'
      },
      'scheduled': { 
        color: 'bg-purple-100 text-purple-800', 
        text: 'زمان‌بندی شده', 
        icon: FaRegCalendarCheck,
        badgeColor: 'purple'
      },
      'in-progress': { 
        color: 'bg-orange-100 text-orange-800', 
        text: 'در حال انجام', 
        icon: FaTools,
        badgeColor: 'orange'
      },
      'completed': { 
        color: 'bg-green-100 text-green-800', 
        text: 'تکمیل شده', 
        icon: FaCheckCircle,
        badgeColor: 'green'
      },
      'cancelled': { 
        color: 'bg-red-100 text-red-800', 
        text: 'لغو شده', 
        icon: FaTimesCircle,
        badgeColor: 'red'
      },
      'rejected': { 
        color: 'bg-gray-100 text-gray-800', 
        text: 'رد شده', 
        icon: FaTimesCircle,
        badgeColor: 'gray'
      }
    };
    return config[status] || config.pending;
  };

  const handleSubmitReview = () => {
    alert('نظر شما با موفقیت ثبت شد!');
    setShowReviewModal(false);
    setReviewData({
      rating: 5,
      comment: '',
      communication: 5,
      quality: 5,
      punctuality: 5
    });
  };

  const handleShare = async () => {
    if (navigator.share && requestData) {
      try {
        await navigator.share({
          title: `درخواست ${requestData.service.name}`,
          text: `درخواست ${requestData.id} - ${requestData.service.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !requestData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری اطلاعات درخواست...</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(requestData.details.status);
  const StatusIcon = statusInfo.icon;
  const otherPerson = isWorker ? requestData.customer : requestData.worker;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* هدر اصلی */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Link
                href={isWorker ? "/worker/dashboard" : "/my-requests"}
                className="flex items-center text-green-600 hover:text-green-700 font-medium mr-6"
              >
                <FaArrowLeft className="ml-2" />
                بازگشت
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  درخواست #{requestData.id}
                </h1>
                <p className="text-gray-600">{requestData.service.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${statusInfo.color}`}>
                <StatusIcon className="ml-2" />
                {statusInfo.text}
              </span>
              {requestData.details.urgent && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center">
                  <FaExclamationTriangle className="ml-1" />
                  فوری
                </span>
              )}
            </div>
          </div>

          {/* تب‌های اصلی */}
          <div className="flex border-b border-gray-200">
            {['details', 'timeline', 'chat', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium border-b-2 transition-all ${activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
              >
                {tab === 'details' && 'جزئیات'}
                {tab === 'timeline' && 'زمان‌بندی'}
                {tab === 'chat' && (
                  <span className="flex items-center">
                    پیام‌ها
                    {requestData.messages.filter(m => !m.read && m.sender !== (isWorker ? 'worker' : 'customer')).length > 0 && (
                      <span className="mr-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </span>
                )}
                {tab === 'documents' && 'اسناد'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* محتوای اصلی */}
          <div className="lg:col-span-2">
            {/* تب جزئیات */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* کارت اطلاعات اصلی */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">اطلاعات درخواست</h2>
                    
                    {/* توضیحات */}
                    <div className="mb-8">
                      <label className="block text-gray-700 mb-3 font-bold flex items-center">
                        <FaCommentDots className="ml-2 text-green-600" />
                        توضیحات کار
                      </label>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{requestData.description}</p>
                        {requestData.additionalNotes && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center text-yellow-800 font-bold mb-1">
                              <FaExclamationCircle className="ml-2" />
                              نکات اضافی:
                            </div>
                            <p className="text-yellow-700">{requestData.additionalNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* اطلاعات زمانی و مالی */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                          <div className="flex items-center mb-3">
                            <FaCalendarAlt className="text-blue-600 ml-3" />
                            <span className="font-bold text-gray-800">زمان انجام</span>
                          </div>
                          <div className="text-lg font-bold text-gray-800">{requestData.details.date}</div>
                          <div className="text-gray-600 mt-1">{requestData.details.time}</div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <div className="flex items-center mb-3">
                            <FaMoneyBillWave className="text-green-600 ml-3" />
                            <span className="font-bold text-gray-800">هزینه</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-800">{requestData.details.budget}</div>
                          <div className="text-gray-600 mt-1">مدت زمان: {requestData.details.duration}</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <div className="flex items-center mb-3">
                            <FaClock className="text-purple-600 ml-3" />
                            <span className="font-bold text-gray-800">وضعیت پرداخت</span>
                          </div>
                          <div className={`text-lg font-bold ${requestData.details.paymentStatus === 'پرداخت شده' ? 'text-green-600' : 'text-orange-600'}`}>
                            {requestData.details.paymentStatus}
                          </div>
                          <div className="text-gray-600 mt-1">روش پرداخت: {requestData.details.paymentMethod}</div>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                          <div className="flex items-center mb-3">
                            <FaTools className="text-orange-600 ml-3" />
                            <span className="font-bold text-gray-800">اولویت</span>
                          </div>
                          <div className={`text-lg font-bold ${requestData.details.priority === 'بالا' ? 'text-red-600' : 'text-gray-600'}`}>
                            {requestData.details.priority}
                          </div>
                          <div className="text-gray-600 mt-1">نوع: {requestData.details.urgent ? 'فوری' : 'عادی'}</div>
                        </div>
                      </div>
                    </div>

                    {/* مواد و متریال */}
                    {requestData.details.estimatedMaterials && requestData.details.estimatedMaterials.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">مواد و متریال تخمینی</h3>
                        <div className="flex flex-wrap gap-2">
                          {requestData.details.estimatedMaterials.map((material, index) => (
                            <span
                              key={index}
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg"
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* کارت اطلاعات فرد مقابل */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">
                        اطلاعات {isWorker ? 'مشتری' : 'کارگر'}
                      </h2>
                      <div className="flex gap-2">
                        <a
                          href={`tel:${otherPerson.phone}`}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                          title="تماس"
                        >
                          <FaPhone />
                        </a>
                        <a
                          href={`https://wa.me/${otherPerson.phone.slice(1)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                          title="واتساپ"
                        >
                          <FaWhatsapp />
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg ml-4">
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <FaUserTie className="text-white text-3xl" />
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{otherPerson.name}</h3>
                          <div className="flex items-center text-gray-600 mb-3">
                            <FaStar className="text-yellow-500 ml-2" />
                            <span className="font-bold">{otherPerson.rating}</span>
                            <span className="mr-3 text-sm">
                              ({isWorker ? `${otherPerson.completedRequests} درخواست` : `${otherPerson.completedJobs} کار`})
                            </span>
                            {!isWorker && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {otherPerson.specialty}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-700">
                              <FaPhone className="ml-3 text-gray-500" />
                              <span>{otherPerson.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <FaEnvelope className="ml-3 text-gray-500" />
                              <span>{otherPerson.email}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-start text-gray-700 mb-3">
                              <FaMapMarkerAlt className="ml-3 mt-1 text-gray-500" />
                              <span>{otherPerson.address}</span>
                            </div>
                          </div>
                        </div>

                        {!isWorker && otherPerson.skills && (
                          <div className="mt-6">
                            <h4 className="font-bold text-gray-800 mb-3">مهارت‌ها</h4>
                            <div className="flex flex-wrap gap-2">
                              {otherPerson.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-lg"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* کارت هزینه‌ها */}
                {requestData.expenses && requestData.expenses.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-6">جزئیات هزینه‌ها</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="py-3 px-4 text-right text-gray-600 font-medium">آیتم</th>
                              <th className="py-3 px-4 text-right text-gray-600 font-medium">تعداد/مقدار</th>
                              <th className="py-3 px-4 text-right text-gray-600 font-medium">هزینه</th>
                              <th className="py-3 px-4 text-right text-gray-600 font-medium">جمع</th>
                            </tr>
                          </thead>
                          <tbody>
                            {requestData.expenses.map((expense) => (
                              <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">{expense.item}</td>
                                <td className="py-4 px-4">{expense.quantity}</td>
                                <td className="py-4 px-4">{expense.cost}</td>
                                <td className="py-4 px-4 font-bold">{expense.cost}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td colSpan="3" className="py-4 px-4 text-left font-bold">جمع کل</td>
                              <td className="py-4 px-4 font-bold text-green-600 text-lg">
                                {requestData.details.budget}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* تب زمان‌بندی */}
            {activeTab === 'timeline' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800">زمان‌بندی درخواست</h2>
                  <button
                    onClick={handlePrint}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    <FaPrint className="ml-2" />
                    چاپ
                  </button>
                </div>

                <div className="space-y-8">
                  {requestData.timeline.map((item, index) => {
                    const itemStatus = getStatusInfo(item.status);
                    const ItemIcon = itemStatus.icon;
                    
                    return (
                      <div key={item.id} className="flex">
                        <div className="flex flex-col items-center ml-4">
                          <div className={`w-4 h-4 rounded-full bg-${itemStatus.badgeColor}-500`}></div>
                          {index < requestData.timeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center mb-2">
                            <div className={`px-3 py-1 rounded-full text-sm ${itemStatus.color}`}>
                              <ItemIcon className="inline ml-1" />
                              {item.action}
                            </div>
                            <div className="mr-auto text-gray-500 text-sm">{item.time}</div>
                          </div>
                          {item.description && (
                            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* تب پیام‌ها */}
            {activeTab === 'chat' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">پیام‌ها</h2>
                    <div className="text-gray-600 text-sm">
                      {requestData.messages.length} پیام
                    </div>
                  </div>

                  {/* لیست پیام‌ها */}
                  <div className="h-96 overflow-y-auto mb-6 space-y-4 p-4 border border-gray-200 rounded-xl">
                    {requestData.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === (isWorker ? 'worker' : 'customer') 
                            ? 'justify-start' 
                            : 'justify-end'
                          }`}
                      >
                        <div
                          className={`max-w-xs p-4 rounded-2xl ${msg.sender === (isWorker ? 'worker' : 'customer')
                              ? 'bg-blue-50 text-gray-800 border border-blue-100'
                              : 'bg-green-50 text-gray-800 border border-green-100'
                            }`}
                        >
                          <div className="text-gray-700">{msg.text}</div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-xs text-gray-500">{msg.time}</div>
                            {!msg.read && msg.sender !== (isWorker ? 'worker' : 'customer') && (
                              <div className="text-xs text-blue-500">خوانده نشده</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ورود پیام جدید */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="پیام خود را بنویسید..."
                      className="flex-1 p-4 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <FaMessage />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* تب اسناد */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800">اسناد و مدارک</h2>
                  <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    <FaUpload className="ml-2" />
                    آپلود سند
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {requestData.documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ml-3">
                          {doc.type === 'image' ? (
                            <FaCamera className="text-gray-600" />
                          ) : (
                            <FaFileInvoice className="text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">{doc.name}</div>
                          <div className="text-sm text-gray-600">
                            آپلود شده توسط: {doc.uploadedBy === 'customer' ? 'مشتری' : 'کارگر'}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">{doc.date}</div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-blue-600 hover:text-blue-700">
                            <FaDownload />
                          </button>
                          <button className="px-3 py-1 text-gray-600 hover:text-gray-700">
                            <FaShareAlt />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* سایدبار */}
          <div className="space-y-8">
            {/* کارت اقدامات */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">اقدامات</h2>
              <div className="space-y-3">
                {/* دکمه‌های وضعیت */}
                {requestData.details.status === 'pending' && isWorker && (
                  <>
                    <button
                      onClick={() => handleStatusChange('accept')}
                      className="w-full p-4 text-right bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl hover:from-green-100 hover:to-emerald-100 border border-green-200 transition-all"
                    >
                      <div className="font-bold flex items-center">
                        <FaCheckCircle className="ml-2" />
                        پذیرش درخواست
                      </div>
                      <div className="text-sm mt-1">پذیرش و شروع همکاری</div>
                    </button>
                    
                    <button
                      onClick={() => handleStatusChange('reject')}
                      className="w-full p-4 text-right bg-gradient-to-r from-red-50 to-pink-50 text-red-700 rounded-xl hover:from-red-100 hover:to-pink-100 border border-red-200 transition-all"
                    >
                      <div className="font-bold flex items-center">
                        <FaTimesCircle className="ml-2" />
                        رد درخواست
                      </div>
                      <div className="text-sm mt-1">عدم امکان پذیرش</div>
                    </button>
                  </>
                )}

                {requestData.details.status === 'accepted' && isWorker && (
                  <button
                    onClick={() => handleStatusChange('start')}
                    className="w-full p-4 text-right bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-cyan-100 border border-blue-200 transition-all"
                  >
                    <div className="font-bold flex items-center">
                      <FaPlay className="ml-2" />
                      شروع کار
                    </div>
                    <div className="text-sm mt-1">شروع عملیات اجرایی</div>
                  </button>
                )}

                {requestData.details.status === 'in-progress' && (
                  <button
                    onClick={() => handleStatusChange('complete')}
                    className="w-full p-4 text-right bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl hover:from-green-100 hover:to-emerald-100 border border-green-200 transition-all"
                  >
                    <div className="font-bold flex items-center">
                      <FaClipboardCheck className="ml-2" />
                      تکمیل کار
                    </div>
                    <div className="text-sm mt-1">پایان عملیات و تایید نهایی</div>
                  </button>
                )}

                {requestData.details.status === 'completed' && !isWorker && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full p-4 text-right bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 rounded-xl hover:from-yellow-100 hover:to-orange-100 border border-yellow-200 transition-all"
                  >
                    <div className="font-bold flex items-center">
                      <FaStar className="ml-2" />
                      ثبت نظر
                    </div>
                    <div className="text-sm mt-1">امتیازدهی به کارگر</div>
                  </button>
                )}

                {/* دکمه‌های عمومی */}
                <button
                  onClick={() => setActiveTab('chat')}
                  className="w-full p-4 text-right bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl hover:from-blue-100 hover:to-cyan-100 border border-blue-200 transition-all"
                >
                  <div className="font-bold flex items-center">
                    <FaMessage className="ml-2" />
                    ارسال پیام
                  </div>
                  <div className="text-sm mt-1">ارتباط با {isWorker ? 'مشتری' : 'کارگر'}</div>
                </button>

                {requestData.details.status === 'pending' && !isWorker && (
                  <button
                    onClick={() => handleStatusChange('cancel')}
                    className="w-full p-4 text-right bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 border border-gray-200 transition-all"
                  >
                    <div className="font-bold flex items-center">
                      <FaTimesCircle className="ml-2" />
                      لغو درخواست
                    </div>
                    <div className="text-sm mt-1">لغو این درخواست</div>
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="w-full p-4 text-right bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-xl hover:from-purple-100 hover:to-pink-100 border border-purple-200 transition-all"
                >
                  <div className="font-bold flex items-center">
                    <FaShareAlt className="ml-2" />
                    اشتراک‌گذاری
                  </div>
                  <div className="text-sm mt-1">اشتراک با دیگران</div>
                </button>
              </div>
            </div>

            {/* کارت خلاصه */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه درخواست</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">شماره</span>
                  <span className="font-bold font-mono">{requestData.id}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">تاریخ ثبت</span>
                  <span className="font-bold">{requestData.details.createdAt}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">نوع درخواست</span>
                  <span className={`font-bold ${requestData.details.urgent ? 'text-red-600' : 'text-green-600'}`}>
                    {requestData.details.urgent ? 'فوری' : 'عادی'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">اولویت</span>
                  <span className="font-bold">{requestData.details.priority}</span>
                </div>
              </div>
            </div>

            {/* کارت گارانتی */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-xl overflow-hidden text-white">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaShieldAlt className="text-2xl ml-3" />
                  <h3 className="text-xl font-bold">گارانتی و پشتیبانی</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCheckCircle className="ml-3 mt-1 text-green-300" />
                    <div>
                      <div className="font-bold">۷ روز گارانتی</div>
                      <div className="text-sm opacity-90 mt-1">در صورت هرگونه مشکل</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="ml-3 mt-1 text-green-300" />
                    <div>
                      <div className="font-bold">پشتیبانی ۲۴/۷</div>
                      <div className="text-sm opacity-90 mt-1">همراه شما تا رضایت کامل</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="ml-3 mt-1 text-green-300" />
                    <div>
                      <div className="font-bold">تضمین قیمت</div>
                      <div className="text-sm opacity-90 mt-1">بدون هیچ هزینه پنهانی</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت پرداخت */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <FaCreditCard className="text-gray-600 ml-3" />
                <h3 className="text-lg font-bold text-gray-800">پرداخت</h3>
              </div>
              <div className="space-y-4">
                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  پرداخت آنلاین
                </button>
                <button className="w-full py-3 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all">
                  <FaDownload className="inline ml-2" />
                  دانلود فاکتور
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مودال ثبت نظر */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">ثبت نظر و امتیاز</h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* امتیاز کلی */}
                <div>
                  <label className="block text-gray-700 mb-3">امتیاز کلی</label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className="text-3xl"
                      >
                        {star <= reviewData.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* امتیاز‌های جزئی */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">کیفیت کار</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setReviewData({ ...reviewData, quality: num })}
                          className={`px-3 py-1 rounded-lg ${num <= reviewData.quality
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">رعایت وقت</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setReviewData({ ...reviewData, punctuality: num })}
                          className={`px-3 py-1 rounded-lg ${num <= reviewData.punctuality
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* نظر */}
                <div>
                  <label className="block text-gray-700 mb-2">نظر شما</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none resize-none"
                    placeholder="نظر خود را درباره کیفیت کار بنویسید..."
                  />
                </div>

                {/* دکمه‌ها */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    انصراف
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg"
                  >
                    ثبت نظر
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}