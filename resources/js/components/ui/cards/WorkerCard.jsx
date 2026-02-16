import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

export default function WorkerCard({ worker }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
          <img 
            src={worker.image || '/images/default-avatar.jpg'} 
            alt={worker.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg">{worker.name}</h3>
          <p className="text-gray-600">{worker.job}</p>
          
          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-yellow-500" />
            <span className="font-bold">{worker.rating}</span>
            <span className="text-gray-500">({worker.reviews} نظر)</span>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-gray-600">
            <FaMapMarkerAlt />
            <span>{worker.location}</span>
          </div>
        </div>
        
        <button className="btn-primary text-sm px-4 py-2">
          تماس
        </button>
      </div>
    </div>
  );
}