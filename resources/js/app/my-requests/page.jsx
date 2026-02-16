// src/app/my-requests/page.jsx (نسخه ساده)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaClock, FaCheckCircle, FaTimesCircle, FaUserTie } from 'react-icons/fa';

export default function MyRequestsPage() {
  const [requests] = useState([
    {
      id: 'REQ-123456',
      service: 'نجاری',
      date: '۱۴۰۲/۱۲/۱۵',
      status: 'pending',
      worker: 'علی محمدی',
      price: '۱,۲۰۰,۰۰۰ تومان'
    },
    {
      id: 'REQ-123455',
      service: 'برق‌کاری',
      date: '۱۴۰۲/۱۲/۱۰',
      status: 'completed',
      worker: 'رضا کریمی',
      price: '۸۰۰,۰۰۰ تومان'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'در انتظار';
      case 'in-progress': return 'در حال انجام';
      case 'completed': return 'تکمیل شده';
      case 'cancelled': return 'لغو شده';
      default: return 'نامشخص';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <FaClock className="ml-2" />;
      case 'in-progress': return <FaUserTie className="ml-2" />;
      case 'completed': return <FaCheckCircle className="ml-2" />;
      case 'cancelled': return <FaTimesCircle className="ml-2" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* هدر */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            درخواست‌های من
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            وضعیت تمام درخواست‌های خود را در اینجا مشاهده کنید
          </p>
        </div>

        {/* لیست درخواست‌ها */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6">
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
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{request.id}</td>
                        <td className="py-4 px-4">{request.service}</td>
                        <td className="py-4 px-4">{request.date}</td>
                        <td className="py-4 px-4">{request.worker}</td>
                        <td className="py-4 px-4">{request.price}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                            {getStatusText(request.status)}
                            {getStatusIcon(request.status)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-green-600 hover:text-green-700 font-medium">
                            مشاهده جزئیات
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {requests.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaClock className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">هنوز درخواستی ثبت نکرده‌اید</h3>
                  <p className="text-gray-600 mb-6">اولین درخواست خود را ثبت کنید</p>
                  <Link
                    href="/request-service"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    ثبت درخواست جدید
                  </Link>
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
              <FaHome className="ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}