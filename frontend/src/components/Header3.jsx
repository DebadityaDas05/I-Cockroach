import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header3() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'post-jobs';

    const handleTabClick = (tabName) => {
        setSearchParams({ tab: tabName });
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center group">
                        <img
                            src={logo}
                            className="h-10 w-auto mr-3 group-hover:scale-[1.03] transition-transform duration-300"
                            alt="Logo"
                        />
                        <span className="text-white font-extrabold text-lg tracking-wider bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                            I-COCKROACH
                        </span>
                    </Link>

                    {/* Navigation Links - Center */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button 
                            onClick={() => handleTabClick('post-jobs')} 
                            className={`text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                                activeTab === 'post-jobs' 
                                    ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
                                    : "text-slate-300 hover:text-orange-500"
                            }`}
                        >
                            Post Jobs
                        </button>
                        <button 
                            onClick={() => handleTabClick('pitches')} 
                            className={`text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                                activeTab === 'pitches' 
                                    ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
                                    : "text-slate-300 hover:text-orange-500"
                            }`}
                        >
                            Student Pitches
                        </button>
                        <button 
                            onClick={() => handleTabClick('tracking')} 
                            className={`text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                                activeTab === 'tracking' 
                                    ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
                                    : "text-slate-300 hover:text-orange-500"
                            }`}
                        >
                            Assign & Track
                        </button>
                        <button 
                            onClick={() => handleTabClick('tokens')} 
                            className={`text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                                activeTab === 'tokens' 
                                    ? "text-orange-500 border-b-2 border-orange-500 pb-1" 
                                    : "text-slate-300 hover:text-orange-500"
                            }`}
                        >
                            Tokens
                        </button>
                    </div>

                    {/* Action Button - Right: Premium Profile Pill */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={() => alert("Client Profile Dashboard: Verification, Billing & ESCROW settings.")}
                            className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold text-slate-100 rounded-full bg-slate-900 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-900/60 shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-inner">
                                AM
                            </div>
                            <span>Profile</span>
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button - Right */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-300 hover:text-white focus:outline-none p-2 cursor-pointer"
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
                    <div className="md:hidden mt-4 pt-4 border-t border-slate-900 space-y-3">
                        <button 
                            onClick={() => handleTabClick('post-jobs')}
                            className={`w-full text-left block px-3 py-2 rounded-xl text-base font-semibold transition-all ${
                                activeTab === 'post-jobs' 
                                    ? "bg-orange-500/10 text-orange-400" 
                                    : "text-slate-300 hover:bg-slate-900 hover:text-orange-500"
                            }`}
                        >
                            Post Jobs
                        </button>
                        <button 
                            onClick={() => handleTabClick('pitches')}
                            className={`w-full text-left block px-3 py-2 rounded-xl text-base font-semibold transition-all ${
                                activeTab === 'pitches' 
                                    ? "bg-orange-500/10 text-orange-400" 
                                    : "text-slate-300 hover:bg-slate-900 hover:text-orange-500"
                            }`}
                        >
                            Student Pitches
                        </button>
                        <button 
                            onClick={() => handleTabClick('tracking')}
                            className={`w-full text-left block px-3 py-2 rounded-xl text-base font-semibold transition-all ${
                                activeTab === 'tracking' 
                                    ? "bg-orange-500/10 text-orange-400" 
                                    : "text-slate-300 hover:bg-slate-900 hover:text-orange-500"
                            }`}
                        >
                            Assign & Track
                        </button>
                        <button 
                            onClick={() => handleTabClick('tokens')}
                            className={`w-full text-left block px-3 py-2 rounded-xl text-base font-semibold transition-all ${
                                activeTab === 'tokens' 
                                    ? "bg-orange-500/10 text-orange-400" 
                                    : "text-slate-300 hover:bg-slate-900 hover:text-orange-500"
                            }`}
                        >
                            Tokens
                        </button>

                        {/* Mobile Profile Block */}
                        <div className="pt-4 border-t border-slate-900">
                            <button
                                onClick={() => alert("Client Profile Dashboard: Verification, Billing & ESCROW settings.")}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-850 hover:border-orange-500/30 transition-all duration-200 cursor-pointer text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                                        AM
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold text-slate-200 leading-none">Profile</p>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Client Profile</p>
                                    </div>
                                </div>
                                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}