// src/app/profile/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaUser, FaEdit, FaHistory, FaStar, FaCreditCard,
  FaBell, FaShieldAlt, FaSignOutAlt, FaPhone, FaMapMarkerAlt,
  FaEnvelope, FaCalendarAlt, FaCheckCircle, FaTools,
  FaCamera, FaSave, FaTimes
} from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState({
    id: 'USER-001',
    fullName: 'علی رضایی',
    email: 'ali.rezaei@example.com',
    phone: '09123456789',
    userType: 'customer', // یا 'worker'
    joinDate: '۱۴۰۲/۱۰/۱۵',
    avatar: null,
    address: 'تهران، خیابان ولیعصر، کوچه فلان',
    verified: true,
    notifications: true,
    twoFactor: false,
    completedRequests: 8,
    activeRequests: 2,
    canceledRequests: 1,
    rating: 4.8,
    totalSpent: '۵,۸۰۰,۰۰۰ تومان'
  });

  const [editData, setEditData] = useState({ ...userData });

  const [recentRequests, setRecentRequests] = useState([
    {
      id: 'REQ-123456',
      service: 'نجاری',
      date: '۱۴۰۲/۱۲/۱۵',
      status: 'in-progress',
      worker: 'محمد کریمی',
      price: '۱,۲۰۰,۰۰۰ تومان'
    },
    {
      id: 'REQ-123455',
      service: 'برق‌کاری',
      date: '۱۴۰۲/۱۲/۱۰',
      status: 'completed',
      worker: 'رضا احمدی',
      price: '۸۰۰,۰۰۰ تومان'
    },
    {
      id: 'REQ-123454',
      service: 'لوله‌کشی',
      date: '۱۴۰۲/۱۲/۰۵',
      status: 'completed',
      worker: 'حسن محمودی',
      price: '۱,۵۰۰,۰۰۰ تومان'
    }
  ]);

  const [workers, setWorkers] = useState([
    {
      id: 'WORKER-001',
      name: 'محمد کریمی',
      service: 'نجاری',
      rating: 4.9,
      completedJobs: 47,
      lastWork: '۲ روز پیش'
    },
    {
      id: 'WORKER-002',
      name: 'رضا احمدی',
      service: 'برق‌کاری',
      rating: 4.7,
      completedJobs: 32,
      lastWork: '۱ هفته پیش'
    }
  ]);

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSaveProfile = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    // در واقعیت اینجا درخواست به API ارسال می‌شود
    alert('اطلاعات با موفقیت به روز شد!');
  };

  const handleCancelEdit = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    // در واقعیت اینجا توکن حذف می‌شود
    localStorage.removeItem('userToken');
    router.push('/login');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'در انتظار' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', text: 'در حال انجام' },
      'completed': { color: 'bg-green-100 text-green-800', text: 'تکمیل شده' },
      'canceled': { color: 'bg-red-100 text-red-800', text: 'لغو شده' }
    };
    return config[status] || { color: 'bg-gray-100 text-gray-800', text: 'نامشخص' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری پروفایل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* هدر صفحه */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            پروفایل کاربری
          </h1>
          <p className="text-gray-600">
            مدیریت اطلاعات شخصی و پیگیری درخواست‌ها
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* سایدبار */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-8">
              {/* هدر پروفایل */}
              <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {editData.avatar ? (
                      <img
                        src={editData.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <FaUser className="text-4xl" />
                      </div>
                    )}
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-white text-green-600 p-2 rounded-full cursor-pointer shadow-lg">
                        <FaCamera />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-center mb-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                      className="bg-transparent border-b border-white/50 text-center w-full outline-none"
                    />
                  ) : (
                    userData.fullName
                  )}
                </h2>
                <p className="text-center opacity-90 text-sm">
                  {userData.userType === 'customer' ? 'کاربر عادی' : 'کارگر'}
                </p>
                {userData.verified && (
                  <div className="flex items-center justify-center mt-2">
                    <FaCheckCircle className="text-yellow-300 ml-1" />
                    <span className="text-sm">تأیید شده</span>
                  </div>
                )}
              </div>

              {/* منو */}
              <div className="p-4">
                <nav className="space-y-1">
                  {[
                    { id: 'overview', icon: FaUser, label: 'مشخصات' },
                    { id: 'requests', icon: FaHistory, label: 'درخواست‌ها' },
                    { id: 'workers', icon: FaTools, label: 'کارگران مورد علاقه' },
                    { id: 'payment', icon: FaCreditCard, label: 'پرداخت‌ها' },
                    { id: 'notifications', icon: FaBell, label: 'اعلان‌ها' },
                    { id: 'security', icon: FaShieldAlt, label: 'امنیت' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === item.id
                          ? 'bg-green-50 text-green-600 border-r-4 border-green-500'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <item.icon className="ml-3" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-4"
                  >
                    <FaSignOutAlt className="ml-3" />
                    <span className="font-medium">خروج از حساب</span>
                  </button>
                </nav>

                {/* آمار */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-3">
                      <FaStar className="text-white text-2xl" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{userData.rating}</div>
                    <div className="text-gray-600 text-sm">امتیاز شما</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-gray-800">{userData.completedRequests}</div>
                      <div className="text-xs text-gray-600">تکمیل شده</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="font-bold text-gray-800">{userData.activeRequests}</div>
                      <div className="text-xs text-gray-600">فعال</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* محتوای اصلی */}
          <div className="lg:col-span-3">
            {/* تب‌های محتوا */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">مشخصات کاربری</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                    >
                      <FaEdit className="ml-2" />
                      ویرایش پروفایل
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all"
                      >
                        <FaSave className="ml-2" />
                        ذخیره تغییرات
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                      >
                        <FaTimes className="ml-2" />
                        انصراف
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* اطلاعات شخصی */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-600 mb-2">نام کامل</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.fullName}
                          onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl">{userData.fullName}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center">
                        <FaEnvelope className="ml-2" />
                        آدرس ایمیل
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl">{userData.email}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center">
                        <FaPhone className="ml-2" />
                        شماره تماس
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl">{userData.phone}</div>
                      )}
                    </div>
                  </div>

                  {/* اطلاعات اضافی */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center">
                        <FaMapMarkerAlt className="ml-2" />
                        آدرس
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editData.address}
                          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                          rows="3"
                          className="w-full p-3 border border-gray-300 rounded-xl focus:border-green-500 outline-none resize-none"
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-xl">{userData.address}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2 flex items-center">
                        <FaCalendarAlt className="ml-2" />
                        تاریخ عضویت
                      </label>
                      <div className="p-3 bg-gray-50 rounded-xl">{userData.joinDate}</div>
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2">نوع حساب</label>
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        {userData.userType === 'customer' ? 'کاربر عادی' : 'کارگر حرفه‌ای'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* آمار کلی */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">آمار کلی</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-gray-800">{userData.completedRequests}</div>
                      <div className="text-gray-600">درخواست تکمیل شده</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-gray-800">{userData.activeRequests}</div>
                      <div className="text-gray-600">درخواست فعال</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-gray-800">{userData.canceledRequests}</div>
                      <div className="text-gray-600">درخواست لغو شده</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-gray-800">{userData.totalSpent}</div>
                      <div className="text-gray-600">کل هزینه‌ها</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'requests' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">درخواست‌های اخیر</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">شماره درخواست</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">خدمت</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">تاریخ</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">کارگر</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">مبلغ</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">وضعیت</th>
                        <th className="py-3 px-4 text-right text-gray-600 font-medium">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRequests.map((request) => {
                        const status = getStatusBadge(request.status);
                        return (
                          <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium">{request.id}</td>
                            <td className="py-4 px-4">{request.service}</td>
                            <td className="py-4 px-4">{request.date}</td>
                            <td className="py-4 px-4">{request.worker}</td>
                            <td className="py-4 px-4">{request.price}</td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${status.color}`}>
                                {status.text}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <Link
                                href={`/request/${request.id}`}
                                className="text-green-600 hover:text-green-700 font-medium"
                              >
                                مشاهده جزئیات
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/my-requests"
                    className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all"
                  >
                    مشاهده همه درخواست‌ها
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'workers' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">کارگران مورد علاقه</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {workers.map((worker) => (
                    <div key={worker.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                      <div className="flex items-start">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center ml-4">
                          <FaUser className="text-white text-2xl" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800 text-lg">{worker.name}</h3>
                            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              <FaStar className="ml-1" />
                              {worker.rating}   
                            </div>
                          </div>
                          <div className="text-gray-600 mb-3">{worker.service}</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <div className="font-bold text-gray-800">{worker.completedJobs}</div>
                              <div className="text-xs text-gray-600">کار تکمیل شده</div>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <div className="font-bold text-gray-800">{worker.lastWork}</div>
                              <div className="text-xs text-gray-600">آخرین کار</div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-3">
                            <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                              درخواست مجدد
                            </button>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                              پیام
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all">
                    مشاهده همه کارگران
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">تنظیمات اعلان‌ها</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-bold text-gray-800">اعلان‌های درخواست</div>
                      <div className="text-gray-600 text-sm">هنگام تغییر وضعیت درخواست‌ها</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userData.notifications}
                        className="sr-only peer"
                        onChange={() => setUserData({ ...userData, notifications: !userData.notifications })}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-bold text-gray-800">اعلان‌های ایمیل</div>
                      <div className="text-gray-600 text-sm">ارسال خلاصه ماهانه به ایمیل</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-bold text-gray-800">اعلان‌های ویژه</div>
                      <div className="text-gray-600 text-sm">تخفیف‌ها و پیشنهادات ویژه</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">امنیت حساب</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-bold text-gray-800 flex items-center">
                          <FaShieldAlt className="ml-2 text-green-600" />
                          تأیید دو مرحله‌ای
                        </div>
                        <div className="text-gray-600 text-sm mt-1">
                          برای امنیت بیشتر، تأیید دو مرحله‌ای را فعال کنید
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userData.twoFactor}
                          className="sr-only peer"
                          onChange={() => setUserData({ ...userData, twoFactor: !userData.twoFactor })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    {userData.twoFactor && (
                      <div className="p-4 bg-white rounded-lg">
                        <div className="text-center mb-4">
                          <div className="text-lg font-bold text-gray-800">اسکن QR کد</div>
                          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mt-2 mb-4">
                            <div className="text-gray-400">QR Code</div>
                          </div>
                          <div className="text-sm text-gray-600">
                            کد: ۱۲۳۴ ۵۶۷۸
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <button className="w-full p-4 text-right border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                      <div className="font-bold text-gray-800">تغییر رمز عبور</div>
                      <div className="text-gray-600 text-sm">رمز عبور خود را به روز کنید</div>
                    </button>

                    <button className="w-full p-4 text-right border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                      <div className="font-bold text-gray-800">دستگاه‌های متصل</div>
                      <div className="text-gray-600 text-sm">مدیریت دستگاه‌های فعال</div>
                    </button>

                    <button className="w-full p-4 text-right border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all">
                      <div className="font-bold">غیرفعال کردن حساب</div>
                      <div className="text-sm">حساب کاربری خود را موقتاً غیرفعال کنید</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">تاریخچه پرداخت‌ها</h2>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCreditCard className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">تاریخچه پرداخت خالی است</h3>
                  <p className="text-gray-600 mb-6">
                    بعد از انجام اولین پرداخت، تاریخچه آن در اینجا نمایش داده می‌شود
                  </p>
                  <Link
                    href="/request-service"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    ثبت اولین درخواست
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* دکمه بازگشت */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}