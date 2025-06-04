'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GiShoppingCart } from 'react-icons/gi';

const navItems = [
      { icon: '🎮', label: 'Home', href: '/' },
      { icon: '💸', label: 'Gold', href: '/gold' },
      { icon: '🧪', label: 'Item', href: '/item' },
      { icon: '👢', label: 'Boot', href: '/boot' },
      { icon: '📰', label: 'News', href: '/news' },
];

export default function Navbar() {
      const [lang, setLang] = useState('EN');
      const [menuOpen, setMenuOpen] = useState(false);

      return (
            <header className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 sm:px-8 shadow-md fixed top-0 left-0 z-50 h-[60px]">
                  <nav className="max-w-7xl mx-auto flex items-center justify-between h-full relative">
                        {/* Hamburger (Mobile) */}
                        <button
                              onClick={() => setMenuOpen(!menuOpen)}
                              className="md:hidden text-white text-2xl"
                              aria-label="Toggle menu"
                        >
                              {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>

                        {/* Logo */}
                        <Link
                              href="/"
                              className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0 flex items-center h-full"
                        >
                              <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={100}
                                    height={40}
                                    className="object-contain h-auto w-auto max-h-[40px]"
                                    priority
                              />
                        </Link>

                        {/* Desktop Nav Items */}
                        <ul className="hidden md:flex items-center gap-8 h-full">
                              {navItems.map((item) => (
                                    <li key={item.label} className="flex items-center h-full">
                                          <Link
                                                href={item.href}
                                                className="flex items-center gap-1 hover:text-purple-400 transition h-full"
                                          >
                                                <span>{item.icon}</span>
                                                <span>{item.label}</span>
                                          </Link>
                                    </li>
                              ))}
                              
                              <li className="flex items-center h-full">
                                    <button
                                          className="text-white hover:text-purple-400 transition text-lg"
                                          aria-label="Search"
                                    >
                                          <FaSearch />
                                    </button>
                              </li>
                        </ul>

                        {/* Right Side (Cart, Language, SignUp) */}
                        <div className="hidden md:flex items-center gap-4 h-full">
                              <button className="text-white hover:text-purple-400 transition" aria-label="Cart">
                                    <GiShoppingCart size={24} />
                              </button>

                              <select
                                    value={lang}
                                    onChange={(e) => setLang(e.target.value)}
                                    className="px-2 py-1 rounded bg-gray-700 text-sm cursor-pointer hover:bg-gray-600"
                              >
                                    <option value="EN">EN</option>
                                    <option value="FR">FR</option>
                                    <option value="CN">CN</option>
                              </select>

                              <Link
                                    href="/signup"
                                    className="px-4 py-1.5 rounded-lg border bg-[#161F33] border-white/30 hover:bg-white/10 transition"
                              >
                                    Sign Up
                              </Link>
                        </div>

                        {/* Mobile Menu */}
                        <div
                              className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out z-40
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
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

                                    {/* Search Icon in Mobile Menu */}
                                    <button
                                          onClick={() => setMenuOpen(false)}
                                          className="flex items-center gap-2 text-lg hover:text-purple-400 transition"
                                    >
                                          <FaSearch />
                                          <span>Search</span>
                                    </button>

                                    {/* Other Icons */}
                                    <div className="flex items-center gap-4 mt-8">
                                          <button
                                                className="text-white hover:text-purple-400 transition text-xl"
                                                aria-label="Cart"
                                                onClick={() => setMenuOpen(false)}
                                          >
                                                <GiShoppingCart size={24} />
                                          </button>

                                          <select
                                                value={lang}
                                                onChange={(e) => setLang(e.target.value)}
                                                className="px-2 py-1 rounded bg-gray-700 text-sm cursor-pointer hover:bg-gray-600"
                                          >
                                                <option value="EN">EN</option>
                                                <option value="FR">FR</option>
                                                <option value="CN">CN</option>
                                          </select>
                                    </div>

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
                                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                              />
                        )}
                  </nav>
            </header>
      );
}
