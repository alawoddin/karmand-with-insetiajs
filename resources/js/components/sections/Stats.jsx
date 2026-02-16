// src/components/sections/Stats.jsx
import { FaUsers, FaTools, FaSmile, FaClock } from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers />,
    value: '۵۰۰+',
    label: 'کارگر متخصص',
    description: 'در کابل',
  },
  {
    icon: <FaTools />,
    value: '۵۰+',
    label: 'نوع خدمات',
    description: 'در دسته‌بندی‌های مختلف',
  },
  {
    icon: <FaSmile />,
    value: '۹۸٪',
    label: 'رضایت مشتری',
    description: 'از کارگران کارما',
  },
  {
    icon: <FaClock />,
    value: '۲۴/۷',
    label: 'پشتیبانی',
    description: 'همیشه در دسترس',
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6">
                <div className="text-3xl">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-medium mb-1">{stat.label}</div>
              <div className="text-green-100">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}