// src/components/sections/Testimonials.jsx
import { FaStar, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'سارا محمدی',
    role: 'مشتری',
    comment: 'کارگر نجاری که از طریق کارما پیدا کردم عالی بود. کار را تمیز و دقیق انجام داد.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: 2,
    name: 'علی رضایی',
    role: 'مشتری',
    comment: 'برقکار حرفه‌ای و با وجدانی معرفی شد. حتماً دوباره از کارما استفاده خواهم کرد.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    id: 3,
    name: 'فاطمه کریمی',
    role: 'مشتری',
    comment: 'سیستم لوله‌کشی منزل ما را در کمترین زمان و با بهترین کیفیت تعمیر کرد.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            نظرات مشتریان کارما
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            آنچه مشتریان ما درباره تجربه استفاده از کارما می‌گویند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-green-300 transition-all">
              <FaQuoteRight className="text-4xl text-green-600 mb-6" />
              
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`ml-1 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-8 text-lg">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ml-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}