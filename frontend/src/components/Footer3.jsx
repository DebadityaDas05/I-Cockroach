import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

export default function Footer3() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-12">
                <div className="md:flex md:justify-between items-start">
                    <div className="mb-8 md:mb-0 space-y-4">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logo}
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                            <span className="text-white font-extrabold text-lg tracking-wider bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                                I-COCKROACH
                            </span>
                        </Link>
                        <p className="text-sm font-semibold max-w-xs text-slate-400 leading-relaxed">
                            Hyperlocal business execution engines. Empowering SMEs, retail stores, and micro-brands with a verified, trustless digital and physical student workforce.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-4 text-xs font-bold text-white uppercase tracking-widest">Solutions</h2>
                            <ul className="text-slate-400 font-semibold space-y-2 text-sm">
                                <li>
                                    <a href="#deploy" className="hover:text-orange-500 transition-colors">Marketing Campaigns</a>
                                </li>
                                <li>
                                    <a href="#deploy" className="hover:text-orange-500 transition-colors">Physical Auditing</a>
                                </li>
                                <li>
                                    <a href="#deploy" className="hover:text-orange-500 transition-colors">WhatsApp Automation</a>
                                </li>
                                <li>
                                    <a href="#deploy" className="hover:text-orange-500 transition-colors">Marketplace Integrations</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-xs font-bold text-white uppercase tracking-widest">Calculators</h2>
                            <ul className="text-slate-400 font-semibold space-y-2 text-sm">
                                <li>
                                    <a href="#calculator" className="hover:text-orange-500 transition-colors">Agency Cost vs Platforms</a>
                                </li>
                                <li>
                                    <a href="#calculator" className="hover:text-orange-500 transition-colors">ROI Calculator</a>
                                </li>
                                <li>
                                    <a href="#live-feed" className="hover:text-orange-500 transition-colors">SME Success Stories</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-xs font-bold text-white uppercase tracking-widest">Security</h2>
                            <ul className="text-slate-400 font-semibold space-y-2 text-sm">
                                <li>
                                    <a href="#" className="hover:text-orange-500 transition-colors">Proof-of-Work Ledger</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-orange-500 transition-colors">Geofence Verifications</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-8 border-slate-900" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-xs text-slate-500 font-semibold">
                        © 2026 Aethon Grid - I-COCKROACH Hyperlocal Network. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0 text-slate-500">
                        <Link to="#" className="hover:text-white transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        <Link to="#" className="hover:text-white transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                            </svg>
                            <span className="sr-only">Discord community</span>
                        </Link>
                        <Link to="#" className="hover:text-white transition-colors">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}