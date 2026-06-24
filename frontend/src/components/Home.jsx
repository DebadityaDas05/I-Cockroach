import React from 'react'
import home_image from "../assets/home_img.png";

export default function Home() {
    return (
        <div className="w-full bg-white text-slate-800">
            {/* Hero Section */}
            <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 flex justify-center">
                            <div className="relative group max-w-md w-full">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-45 group-hover:duration-200"></div>
                                <img
                                    src={home_image}
                                    alt="Hyperlocal execution platform mockup"
                                    className="relative w-full h-auto rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-500 object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-7 space-y-8 text-left">
                            <div className="space-y-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 tracking-wide uppercase">
                                    Hyperlocal Business Execution
                                </span>
                                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-none">
                                    I-COCKROACH
                                </h1>
                            </div>
                            <p className="text-xl text-slate-800 font-medium leading-relaxed max-w-2xl">
                                This platform is not a standard freelance site; it is a system
                                engineered for hyperlocal business execution.
                            </p>
                            <div className="space-y-4 text-slate-800">
                                <p className="font-bold text-slate-900 text-xl">The platform aims to:</p>
                                <ul className="list-disc pl-6 space-y-2 text-lg font-medium">
                                    <li>Reduce agency dependency and lower execution costs for micro-businesses.</li>
                                    <li>Create structured earning opportunities and an accessible, local digital workforce.</li>
                                    <li>Drive SME growth while establishing a trust-verified execution network.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="border-y border-slate-100 bg-slate-50/50 py-16 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <p className="text-4xl md:text-5xl font-bold text-orange-600 tracking-tight">99.8%</p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Execution Accuracy</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">&lt; 12m</p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Average Match Time</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">$3.2M+</p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Agency Fees Saved</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">120K+</p>
                            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Local Jobs Created</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-16">
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Engineered Architecture</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Designed for high-impact hyperlocal business.
                        </h2>
                        <p className="text-lg text-slate-600">
                            Forget bloated agencies. I-COCKROACH connects micro-businesses directly to a trust-verified, structured local workforce.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 text-left space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Hyperlocal Geofencing</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Deploy visual marketing, physical auditing, and logistics campaigns mapped perfectly to target zip codes.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 text-left space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Trust-Verified Ledger</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Visual proof of work, localized timestamps, and real-time execution feedback secure every single transaction.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 text-left space-y-4 group">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Instant Execution</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Trigger operations on-demand. Our matching system routes tasks instantly to verify delivery and capture markets.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="impact" className="py-24 bg-white border-t border-slate-100 scroll-mt-2">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">About I-COCKROACH</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                            Engineering hyperlocal business execution
                        </h2>
                        <p className="text-lg text-slate-600 font-semibold">
                            We are building the trust-verified digital pipeline connecting local micro-businesses with structured independent student executors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Mission Card */}
                        <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4 text-left">
                            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                            <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                                To reduce agency dependency and lower execution costs for micro-businesses, while creating structured, trust-verified earning opportunities for an accessible local digital workforce.
                            </p>
                            <ul className="space-y-3 pt-2 text-sm font-semibold text-slate-700">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Lower execution costs by removing corporate middlemen.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Build accessible earning channels directly for student freelancers.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Vision Card */}
                        <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-orange-500/20 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4 text-left">
                            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed font-semibold text-sm">
                                We envision a decentralized local market ecosystem where every micro-SME can instantly deploy physical and digital marketing, survey ops, or tech tasks, securing verified execution in minutes.
                            </p>
                            <ul className="space-y-3 pt-2 text-sm font-semibold text-slate-700">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Establish a trust-verified global execution network.</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Create verified, trustless proof-of-work ledger pipelines.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}