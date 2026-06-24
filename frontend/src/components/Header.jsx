import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)]">
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center group"
                    >
                        <img
                            src={logo}
                            className="h-10 w-auto mr-3 group-hover:scale-[1.03] transition-transform duration-300"
                            alt="Logo"
                        />
                    </Link>

                    {/* Navigation Links - Center */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* <NavLink 
                            to="/" 
                            onClick={(e) => {
                                if (window.location.pathname === "/") {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className={({ isActive }) => 
                                `text-sm font-semibold tracking-wide transition-all duration-200 hover:text-orange-600 ${
                                    isActive ? "text-orange-600 font-bold" : "text-slate-600"
                                }`
                            }
                        >
                            Home
                        </NavLink> */}
                        <a
                            href="/#features"
                            className="text-sm font-semibold tracking-wide text-slate-600 hover:text-orange-600 transition-all duration-200"
                        >
                            Features
                        </a>
                        <a
                            href="/#impact"
                            className="text-sm font-semibold tracking-wide text-slate-600 hover:text-orange-600 transition-all duration-200"
                        >
                            Impact
                        </a>

                    </div>

                    {/* Action Buttons - Right */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center px-5 py-2.5 font-bold text-sm text-white rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-md hover:shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                            Getting Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Right */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
                            aria-label="Toggle navigation menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-slate-100 space-y-3">
                        <NavLink
                            to="/"
                            onClick={(e) => {
                                setIsMobileMenuOpen(false);
                                if (window.location.pathname === "/") {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                        >
                            Home
                        </NavLink>
                        <a
                            href="/#features"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                        >
                            Features
                        </a>
                        <a
                            href="/#stats"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                        >
                            Impact
                        </a>

                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-center px-4 py-2.5 font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md"
                            >
                                Getting Started
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}