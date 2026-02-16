// src/components/sections/TopWorkers.jsx
import { Link } from '@inertiajs/react';
import { FaStar, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

// Mock data for top workers
const topWorkers = [
  {
    id: 1,
    name: 'احمد کریمی',
    profession: 'نجار',
    rating: 4.9,
    reviews: 127,
    location: 'کابل، کارته سخی',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
  },
  {
    id: 2,
    name: 'رضا احمدی',
    profession: 'برقکار',
    rating: 4.8,
    reviews: 89,
    location: 'کابل، شهر نو',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    verified: true,
  },
  {
    id: 3,
    name: 'محمود حسینی',
    profession: 'لوله‌کش',
    rating: 4.7,
    reviews: 76,
    location: 'کابل، کارته ۳',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    verified: true,
  },
  {
    id: 4,
    name: 'علی محمدی',
    profession: 'نقاش ساختمان',
    rating: 4.9,
    reviews: 54,
    location: 'کابل، افشار',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    verified: true,
  },
];

export default function TopWorkers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              کارگران برتر این هفته
            </h2>
            <p className="text-gray-600">
              کارگران با بالاترین امتیاز و رضایت مشتری
            </p>
          </div>
          <Link 
            href="/find-worker" 
            className="mt-4 md:mt-0 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50 transition-colors"
          >
            مشاهده همه کارگران
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topWorkers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow border border-gray-200">
              {/* Worker image and badge */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={worker.image} 
                  alt={worker.name}
                  className="w-full h-full object-cover"
                />
                {worker.verified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <FaCheckCircle className="ml-2" />
                    تایید شده
                  </div>
                )}
              </div>

              {/* Worker info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{worker.name}</h3>
                <p className="text-gray-600 mb-4">{worker.profession}</p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 ml-1" />
                    <span className="font-bold ml-2">{worker.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm mr-2">({worker.reviews} نظر)</span>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-6">
                  <FaMapMarkerAlt className="ml-2" />
                  <span>{worker.location}</span>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3 space-x-reverse">
                  <Link 
                    href={`/worker/${worker.id}`}
                    className="flex-1 bg-green-600 text-white text-center py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
                  >
                    مشاهده پروفایل
                  </Link>
                  <button className="flex-1 border-2 border-green-600 text-green-600 py-3 rounded-xl font-medium hover:bg-green-50 transition-colors">
                    تماس
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}