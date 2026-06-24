import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from "../assets/logo.png";

export default function Header2() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100/80 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)]">
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link to="/common" className="flex items-center group">
                        <img
                            src={logo}
                            className="h-10 w-auto mr-3 group-hover:scale-[1.03] transition-transform duration-300"
                            alt="Logo"
                        />
                    </Link>

                    {/* Navigation Links - Center */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/common" 
                            className={({ isActive }) => 
                                `text-sm font-semibold tracking-wide transition-all duration-200 hover:text-orange-600 ${
                                    isActive ? "text-orange-600 font-bold" : "text-slate-600"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/services" 
                            className={({ isActive }) => 
                                `text-sm font-semibold tracking-wide transition-all duration-200 hover:text-orange-600 ${
                                    isActive ? "text-orange-600 font-bold" : "text-slate-600"
                                }`
                            }
                        >
                            Explore Marketplace
                        </NavLink>


                    </div>

                    {/* Action Buttons - Right */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-700 rounded-full bg-slate-50 border border-slate-200/80 hover:border-orange-500/40 hover:bg-orange-50/20 shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs flex items-center justify-center shadow-inner">
                                RK
                            </div>
                            <span>Profile</span>
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
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
                            to="/common" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => 
                                `block px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                                    isActive 
                                        ? "bg-orange-50 text-orange-600 font-bold" 
                                        : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/services" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => 
                                `block px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                                    isActive 
                                        ? "bg-orange-50 text-orange-600 font-bold" 
                                        : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                                }`
                            }
                        >
                            Explore Marketplace
                        </NavLink>


                        <div className="pt-4 border-t border-slate-100">
                            <Link
                                to="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-orange-500/30 transition-all duration-200 cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-xs flex items-center justify-center">
                                        RK
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-slate-800 leading-none">Profile</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Student Profile</p>
                                    </div>
                                </div>
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}