'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { GiShoppingCart } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import SearchBar from '../SearchBar/SearchBar';

const navItems = [
      { icon: '🎮', label: 'Home', href: '/' },
      { icon: '💸', label: 'Gold', href: '/gold' },
      { icon: '🧪', label: 'Item', href: '/item' },
      { icon: '👢', label: 'Boot', href: '/boot' },
      { icon: '📰', label: 'News', href: '/news' },
];

export default function Navbar() {
      const [lang, setLang] = useState('EN');
      const [currency, setCurrency] = useState('USD');
      const [menuOpen, setMenuOpen] = useState(false);
      const [langDropdownOpen, setLangDropdownOpen] = useState(false);
      const [searchbarOpen, setSearchbarOpen] = useState(false);

      const pathname = usePathname();

      const dropdownRef = useRef<HTMLDivElement>(null);

      // Close language dropdown if clicked outside
      useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                  if (
                        dropdownRef.current &&
                        !dropdownRef.current.contains(event.target as Node)
                  ) {
                        setLangDropdownOpen(false);
                  }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);

      return (
            <>
                  <header className="w-full h-[60px] bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-8 shadow-md fixed top-0 left-0 z-50">
                        <nav className="max-w-7xl mx-auto flex items-center justify-between h-full relative">

                              {/* Mobile Hamburger */}
                              <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="md:hidden text-white text-2xl"
                                    aria-label="Toggle menu"
                              >
                                    {menuOpen ? <FaTimes /> : <FaBars />}
                              </button>

                              {/* Logo - Left on desktop, Center on mobile */}
                              <Link
                                    href="/"
                                    className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center h-full"
                              >
                                    <Image
                                          src="/logo.png"
                                          alt="Logo"
                                          width={100}
                                          height={40}
                                          priority
                                    />
                              </Link>

                              {/* Desktop Nav Items - Centered */}
                              <ul className="hidden md:flex items-center gap-12 h-full absolute left-1/2 -translate-x-1/2">
                                    {navItems.map((item) => {
                                          const isActive = pathname === item.href;

                                          return (
                                                <li key={item.label} className="flex items-center h-full">
                                                      <Link
                                                            href={item.href}
                                                            className={`flex items-center gap-1 h-full transition ${isActive ? 'text-purple-400' : 'hover:text-purple-400'
                                                                  }`}
                                                      >
                                                            <span>{item.icon}</span>
                                                            <span>{item.label}</span>
                                                      </Link>
                                                </li>
                                          );
                                    })}
                                    <li className="flex items-center h-full">
                                          <div
                                                className="flex items-center gap-1 hover:text-purple-400 transition h-full cursor-pointer"
                                                onClick={() => setSearchbarOpen(true)}
                                          >
                                                <FaSearch />
                                          </div>
                                    </li>
                              </ul>

                              {/* Right Icons */}
                              <div className="hidden md:flex items-center gap-4 h-full">

                                    <button className="px-2 py-1.5 rounded-lg bg-[#334155] hover:bg-white/10 transition" aria-label="Cart">
                                          <GiShoppingCart size={24} />
                                    </button>

                                    {/* Language + Currency Dropdown */}
                                    <div className="relative" ref={dropdownRef}>
                                          <button
                                                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                                className="px-4 py-1.5 rounded-lg bg-[#0f172a] hover:bg-white/10 transition flex items-center gap-2"
                                                aria-haspopup="true"
                                                aria-expanded={langDropdownOpen}
                                                aria-label="Select language and currency"
                                          >
                                                {lang} / {currency}
                                                <svg
                                                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''
                                                            }`}
                                                      fill="none"
                                                      stroke="currentColor"
                                                      strokeWidth="2"
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                >
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                                </svg>
                                          </button>

                                          {langDropdownOpen && (
                                                <>
                                                      {/* Overlay for mobile - closes dropdown if clicked */}
                                                      <div
                                                            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                                                            onClick={() => setLangDropdownOpen(false)}
                                                      />

                                                      {/* Dropdown Panel */}
                                                      <div className="absolute right-0 mt-2 w-48 bg-[#0f172a] rounded-lg shadow-lg p-4 z-50 space-y-4">
                                                            <div>
                                                                  <label className="block mb-1 text-sm text-gray-300">Language</label>
                                                                  <select
                                                                        value={lang}
                                                                        onChange={(e) => setLang(e.target.value)}
                                                                        className="w-full px-3 py-2 rounded bg-[#1e293b] text-white"
                                                                  >
                                                                        <option value="EN">English</option>
                                                                        <option value="FR">Français</option>
                                                                        <option value="CN">中文</option>
                                                                  </select>
                                                            </div>

                                                            <div>
                                                                  <label className="block mb-1 text-sm text-gray-300">Currency</label>
                                                                  <select
                                                                        value={currency}
                                                                        onChange={(e) => setCurrency(e.target.value)}
                                                                        className="w-full px-3 py-2 rounded bg-[#1e293b] text-white"
                                                                  >
                                                                        <option value="USD">USD</option>
                                                                        <option value="EUR">EUR</option>
                                                                        <option value="JPY">JPY</option>
                                                                  </select>
                                                            </div>
                                                      </div>
                                                </>
                                          )}
                                    </div>

                                    <Link
                                          href="/signup"
                                          className="px-4 py-1.5 rounded-lg border bg-[#161F33] border-white/30 hover:bg-white/10 transition"
                                    >
                                          Sign Up
                                    </Link>
                              </div>

                              {/* Mobile Menu */}
                              <div
                                    className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out z-40 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                                          }`}
                              >
                                    <nav className="flex flex-col mt-[60px] px-6 space-y-6">
                                          {navItems.map((item) => (
                                                <Link
                                                      key={item.label}
                                                      href={item.href}
                                                      onClick={() => setMenuOpen(false)}
                                                      className="flex items-center gap-2 text-lg hover:text-purple-400 transition"
                                                >
                                                      <span>{item.icon}</span>
                                                      <span>{item.label}</span>
                                                </Link>
                                          ))}

                                          <div className="flex items-center gap-4 mt-8">
                                                <button
                                                      className="text-white hover:text-purple-400 transition text-xl"
                                                      aria-label="Search"
                                                      onClick={() => setMenuOpen(false)}
                                                >
                                                      <FaSearch />
                                                </button>
                                                <button
                                                      className="text-white hover:text-purple-400 transition text-xl"
                                                      aria-label="Cart"
                                                      onClick={() => setMenuOpen(false)}
                                                >
                                                      <GiShoppingCart size={24} />
                                                </button>
                                          </div>

                                          {/* Mobile language select */}
                                          <select
                                                value={lang}
                                                onChange={(e) => setLang(e.target.value)}
                                                className="bg-slate-800 text-white text-sm px-3 py-2 rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:bg-slate-700 transition-colors duration-200 mt-4"
                                          >
                                                <option value="EN">EN</option>
                                                <option value="FR">FR</option>
                                                <option value="CN">CN</option>
                                          </select>

                                          <Link
                                                href="/signup"
                                                onClick={() => setMenuOpen(false)}
                                                className="mt-6 inline-block px-6 py-2 rounded-md border border-white/30 hover:bg-white/10 transition text-center"
                                          >
                                                Sign Up
                                          </Link>
                                    </nav>
                              </div>

                              {/* Overlay */}
                              {menuOpen && (
                                    <div
                                          onClick={() => setMenuOpen(false)}
                                          className="fixed inset-0 bg-black bg-opacity-90 z-30 md:hidden"
                                    />
                              )}
                        </nav>
                  </header>

                  <SearchBar
                        searchbarOpen={searchbarOpen}
                        setSearchbarOpen={setSearchbarOpen}
                  />
            </>
      );
}
