// src/components/layout/Header.jsx

import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  FaSearch,
  FaUser,
  FaUserTie,
  FaBars,
  FaTimes,
  FaHome,
  FaStar,
  FaCommentDots,
  FaPhone,
  FaShoppingCart,
  FaBell,
  FaPlus,
  FaList,
  FaQuestionCircle,
  FaHandshake,
} from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ✅ Inertia replacement for pathname
  const { url } = usePage();

  // تشخیص اسکرول
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ بستن منوها هنگام تغییر مسیر (Inertia-safe)
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [url]);

  // منوهای اصلی
  const mainMenu = [
    { href: "/", label: "خانه", icon: <FaHome />, active: url === "/" },

    {
      href: "/find-worker",
      label: "کارگران",
      icon: <FaUserTie />,
      active: url.includes("/find-worker"),
    },

    {
      href: "/categories",
      label: "دسته‌بندی",
      icon: <FaList />,
      active: url.includes("/categories"),
    },

    {
      href: "/how-it-works",
      label: "راهنما",
      icon: <FaQuestionCircle />,
      active: url.includes("/how-it-works"),
    },
  ];

  // دکمه‌های سمت چپ
  const leftButtons = [
    { href: "/login", label: "ورود", icon: <FaUser />, color: "gray" },

    {
      href: "/register",
      label: "درخواست",
      icon: <FaPlus />,
      color: "green",
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* بخش راست: لوگو + جستجو */}
            <div className="flex items-center space-x-3 space-x-reverse flex-1">
              {/* لوگو */}
              <Link
                href="/"
                className="flex items-center space-x-2 space-x-reverse min-w-0"
              >
                <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  {/* تصویر لوگو */}
                  <img
                    src="https://assets.myket.ir/icons/xlarge/5bbd0f79-a022-4317-9a95-0ffd7fd34bf0.png" // آدرس لوگوی خود را اینجا قرار دهید
                    alt="لوگو کارما"
                    className="w-full h-full rounded-xl md:rounded-2xl object-cover shadow-md border border-gray-200"
                  />

                  {/* Fallback در صورت عدم لود تصویر */}
                </div>
              </Link>

              {/* جستجو - دسکتاپ */}
              <div className="hidden md:flex items-center flex-1 max-w-xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="چه خدمتی نیاز دارید؟"
                    className="w-full bg-gray-100 border-2 border-transparent focus:border-green-500 rounded-2xl pr-12 pl-4 py-2.5 md:py-3 text-gray-700 outline-none transition-colors text-sm md:text-base"
                  />
                  <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700 transition-colors">
                    <FaSearch size={18} />
                  </button>
                </div>
              </div>

              {/* جستجو - موبایل (آیکون) */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaSearch size={20} className="text-gray-700" />
              </button>
            </div>

            {/* بخش وسط: منوی اصلی (فقط آیکون) */}
            <nav className="hidden lg:flex items-center space-x-1 space-x-reverse mx-4">
              {mainMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`p-3 rounded-xl transition-all relative group ${
                    item.active
                      ? "text-green-600 bg-green-50"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                  title={item.label}
                >
                  {item.icon}
                  {/* نشانگر فعال */}
                  {item.active && (
                    <span className="absolute bottom-1 right-1 left-1 h-0.5 bg-green-500 rounded-full"></span>
                  )}
                  {/* Tooltip */}
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* بخش چپ: دکمه‌های اقدام */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {/* نوتیفیکیشن (فقط آیکون) */}
              <button className="relative p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <FaBell size={18} className="text-gray-700" />
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  ۳
                </span>
              </button>

              {/* سبد خرید (فقط آیکون) */}
              <button className="relative p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors hidden lg:block">
                <FaShoppingCart size={18} className="text-gray-700" />
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                  ۲
                </span>
              </button>

              {/* دکمه‌های اصلی سمت چپ */}
              {leftButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className={`
                    hidden md:flex items-center justify-center p-3 rounded-xl font-medium transition-all
                    ${
                      button.color === "green"
                        ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg hover:shadow-xl"
                        : button.color === "blue"
                        ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                  title={button.label}
                >
                  {button.icon}
                  <span className="hidden xl:inline mr-2 text-sm font-medium">
                    {button.label}
                  </span>
                </Link>
              ))}

              {/* منوی همبرگر موبایل */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {mobileMenuOpen ? (
                  <FaTimes size={20} className="text-gray-700" />
                ) : (
                  <FaBars size={20} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* جستجوی موبایل (زمانی که باز است) */}
          {searchOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی خدمات..."
                  className="w-full bg-gray-100 border-2 border-green-500 rounded-2xl pr-12 pl-4 py-3 text-gray-700 outline-none"
                  autoFocus
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600">
                  <FaSearch size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* منوی موبایل */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 animate-fadeIn"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر منوی موبایل */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-b from-green-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  {/* لوگو در منوی موبایل با تصویر آنلاین */}
                  <div className="w-12 h-12 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src="https://assets.myket.ir/icons/xlarge/5bbd0f79-a022-4317-9a95-0ffd7fd34bf0.png"
                      alt="لوگو کارما"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">کارما</h2>
                    <p className="text-xs text-green-600">منوی اصلی</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            {/* منوهای موبایل */}
            <div className="p-2 space-y-1">
              {mainMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center p-4 rounded-xl hover:bg-green-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span
                    className={`text-2xl ml-4 ${
                      item.active ? "text-green-600" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-medium flex-1 ${
                      item.active ? "text-green-600" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.active && (
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* بخش دکمه‌های اقدام در موبایل */}
            <div className="p-4 border-t border-gray-200 space-y-3">
              <div className="text-sm text-gray-500 mb-2">اقدامات سریع</div>

              {leftButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className={`
                    flex items-center justify-center p-4 rounded-xl font-medium transition-all
                    ${
                      button.color === "green"
                        ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg"
                        : button.color === "blue"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {button.icon}
                  <span className="mr-3">{button.label}</span>
                </Link>
              ))}
            </div>

            {/* اطلاعات تماس در موبایل */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaPhone className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">پشتیبانی</div>
                  <div className="font-bold">۰۷۹۹ ۱۲۳ ۴۵۶۷</div>
                </div>
              </div>
              <div className="text-center text-xs text-gray-500">
                کابل، افغانستان
              </div>
            </div>
          </div>
        </div>
      )}

      {/* نوار وضعیت برای صفحه اصلی */}
      {url === "/" && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 font-medium">
                  <span className="hidden sm:inline">امروز</span> ۱۰۲ کارگر
                  آنلاین
                </span>
              </div>
              <Link
                href="/find-worker"
                className="text-green-600 hover:text-green-700 text-xs font-medium"
              >
                مشاهده →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
