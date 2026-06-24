import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer2 from '../components/Footer2';

// Updated Work Scope Categorization (Digital Problems)
const domains = [
    {
        id: "all",
        name: "All Domains",
        description: "Explore all freelance categories",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
        )
    },
    {
        id: "social",
        name: "Social Media",
        description: "5 Instagram posts, story creatives, caption writing, DM reply management, hashtag research, page optimization, 1-week posting schedules, engagement handling.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742a3 3 0 11-1.368-2.738 3.5 3.5 0 003.184 1.368M12 21a9.003 9.003 0 008.354-5.646 9.003 9.003 0 00-8.354-5.646M12 21a9.003 9.003 0 01-8.354-5.646 9.003 9.003 0 018.354-5.646m0 11.292V9M12 3a9 9 0 00-3.354 17.354 9 9 0 006.708 0A9 9 0 0012 3z"></path>
            </svg>
        )
    },
    {
        id: "branding",
        name: "Branding",
        description: "Logo redesign, packaging, brochures, visiting cards, offer banners, catalogues, menu designs, flyers.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
        )
    },
    {
        id: "video",
        name: "Video / Editing",
        description: "Reel edits, short-form content, YouTube shorts, subtitle editing, podcast clips, promo videos, before/after transformation edits.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
        )
    },
    {
        id: "growth",
        name: "Growth / Outreach",
        description: "Influencer mapping, sponsor outreach, college activations, event promotions, partnership outreach, community building, lead generation.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
        )
    },
    {
        id: "automation",
        name: "Automation / Tech",
        description: "WhatsApp bot setup, chatbot integration, CRM cleanup, Google Sheets automation, email automation, lead forms, landing pages, website fixes, SEO updates.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
        )
    },
    {
        id: "research",
        name: "Research / Ops",
        description: "Competitor or pricing research, product listing uploads, catalog cleanups, survey deployment, market research, customer data tagging.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
        )
    }
];

// Student Freelancers matching the Work Scope grouped by Domain
const freelancersData = [
    // === SOCIAL MEDIA ===
    {
        id: 1,
        name: "Rohan Kapoor",
        avatar: "RK",
        college: "IIT Bombay",
        category: "social",
        role: "Instagram Growth Hacker",
        rating: 4.9,
        reviews: 38,
        price: 45,
        skills: ["Social Strategy", "Copywriting", "Canva Pro", "Community Ops"],
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        bio: "Specializing in designing high-retention aesthetic grids, creating content schedules, and running targeted DM campaigns."
    },
    {
        id: 2,
        name: "Sneha Sen",
        avatar: "SS",
        college: "SRCC Delhi",
        category: "social",
        role: "LinkedIn & Twitter Growth Lead",
        rating: 4.8,
        reviews: 29,
        price: 40,
        skills: ["B2B Writing", "Personal Branding", "Buffer", "Analytics"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
        bio: "Helping micro-business founders build credible brand presence, share insights, and generate organic outreach pipelines."
    },
    {
        id: 3,
        name: "Aman Malhotra",
        avatar: "AM",
        college: "BITS Pilani",
        category: "social",
        role: "Community & Discord Manager",
        rating: 5.0,
        reviews: 15,
        price: 35,
        skills: ["Discord Setup", "Event Hosting", "Moderation", "Collabs"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        bio: "Building, configuring, and moderating highly active online community hubs on Discord and Telegram for local tech startups."
    },
    {
        id: 19,
        name: "Pranav Shah",
        avatar: "PS",
        college: "St. Xavier's Kolkata",
        category: "social",
        role: "Pinterest & Meta Ads Specialist",
        rating: 4.8,
        reviews: 22,
        price: 50,
        skills: ["Pinterest SEO", "Meta Business", "Ad Creatives", "A/B Testing"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        bio: "Setting up Pinterest shopping catalog pages, running local Meta lead gen ads, and designing creative static ad banners."
    },
    {
        id: 20,
        name: "Ishita Roy",
        avatar: "IR",
        college: "LSR Delhi",
        category: "social",
        role: "TikTok & Reel Scriptwriter",
        rating: 4.9,
        reviews: 31,
        price: 40,
        skills: ["Scriptwriting", "Trend Mapping", "Hook Design", "Storyboarding"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        bio: "Writing 15-second high-retention video hooks, visual storyboarding, and mapping trending audio formats for direct response brands."
    },
    {
        id: 21,
        name: "Yash Vardhan",
        avatar: "YV",
        college: "Symbiosis Noida",
        category: "social",
        role: "Engagement & DM Outreach Exec",
        rating: 4.7,
        reviews: 16,
        price: 30,
        skills: ["DM Automation", "Community Engagement", "Comment Reply"],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        bio: "Managing custom comment reply sequences, executing outbound growth strategies, and maintaining organic community relations."
    },

    // === BRANDING ===
    {
        id: 4,
        name: "Aanya Sharma",
        avatar: "AS",
        college: "NID Ahmedabad",
        category: "branding",
        role: "Identity & Packaging Designer",
        rating: 5.0,
        reviews: 24,
        price: 75,
        skills: ["Illustrator", "Logo Design", "Typography", "Branding Guidelines"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        bio: "Crafting beautiful brand packages, customized logo visual directions, product catalog menus, and vector packaging."
    },
    {
        id: 5,
        name: "Vikram Sethi",
        avatar: "VS",
        college: "IIT Guwahati",
        category: "branding",
        role: "Illustrator & Banner Creator",
        rating: 4.9,
        reviews: 18,
        price: 60,
        skills: ["Procreate", "Vector art", "Marketing Flyers", "Catalogues"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        bio: "Designing striking vector graphics, marketing offer banners, brochures, and menu designs optimized for small retail."
    },
    {
        id: 6,
        name: "Divya Nambiar",
        avatar: "DN",
        college: "St. Xavier's Mumbai",
        category: "branding",
        role: "Retail Visual Designer",
        rating: 4.8,
        reviews: 32,
        price: 50,
        skills: ["Canva Layouts", "Brochures", "Signage Design", "Print Specs"],
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
        bio: "Delivering ready-to-print marketing flyers, physical visiting cards, restaurant visual menus, and storefront sign designs."
    },
    {
        id: 22,
        name: "Aditi Rao",
        avatar: "AR",
        college: "NIFT Delhi",
        category: "branding",
        role: "Pattern & Merch Designer",
        rating: 5.0,
        reviews: 14,
        price: 70,
        skills: ["Pattern Design", "Moodboards", "Illustrator", "Merch Mockups"],
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
        bio: "Creating bespoke packaging box designs, custom pattern graphics, brand merchandise hoodies, and catalog aesthetic mockups."
    },
    {
        id: 23,
        name: "Kabir Das",
        avatar: "KD",
        college: "IIT Roorkee",
        category: "branding",
        role: "Print-Ready Assets Creator",
        rating: 4.9,
        reviews: 19,
        price: 55,
        skills: ["Visiting Cards", "Invoices Design", "Vector Icons", "Flyers"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
        bio: "Formulating beautiful visiting business cards, clean PDF invoice templates, local flyer templates, and corporate brochure layouts."
    },
    {
        id: 24,
        name: "Ananya Sen",
        avatar: "AS",
        college: "Sophia College Mumbai",
        category: "branding",
        role: "Infographic & Pitch Deck Designer",
        rating: 4.8,
        reviews: 26,
        price: 65,
        skills: ["Keynote Pro", "Canva Infographics", "Brand Colors", "Figma"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
        bio: "Designing rich presentation pitch decks, custom social media infographics, pricing comparison grids, and media kit brochures."
    },

    // === VIDEO / EDITING ===
    {
        id: 7,
        name: "Kabir Mehta",
        avatar: "KM",
        college: "DTU Delhi",
        category: "video",
        role: "Short-Form Video Specialist",
        rating: 4.8,
        reviews: 56,
        price: 30,
        skills: ["Premiere Pro", "CapCut Pro", "Dynamic Subs", "Sound Design"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
        bio: "Editing high-retention vertical short video reel clips, podcast clips, promo announcements, and YouTube Shorts."
    },
    {
        id: 8,
        name: "Meera Nair",
        avatar: "MN",
        college: "Flame University",
        category: "video",
        role: "YouTube Video Editor",
        rating: 4.9,
        reviews: 42,
        price: 50,
        skills: ["Storytelling", "Color Grading", "VFX Transitions", "Thumbnail Art"],
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
        bio: "Structuring full-length YouTube episodes with custom transitions, color corrections, B-roll integrations, and clickable thumbnails."
    },
    {
        id: 9,
        name: "Rishi Verma",
        avatar: "RV",
        college: "VIT Vellore",
        category: "video",
        role: "Promo & Reel Creator",
        rating: 5.0,
        reviews: 21,
        price: 35,
        skills: ["Before/After Edits", "Kinetic Typography", "After Effects"],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        bio: "Creating high-paced before/after dynamic service showcases, kinetic visual text typography reels, and retail store promos."
    },
    {
        id: 25,
        name: "Devansh Dixit",
        avatar: "DD",
        college: "SRFTI Kolkata",
        category: "video",
        role: "Cinematic Sound Editor",
        rating: 4.9,
        reviews: 33,
        price: 45,
        skills: ["Sound Effects", "Audio Cleanup", "Premiere Audio", "Foley"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        bio: "Fixing background audio wind noises, mixing immersive royalty-free sound effects (Foley), and adding professional voiceover timings."
    },
    {
        id: 26,
        name: "Riya Kapoor",
        avatar: "RK",
        college: "Sophia College Bangalore",
        category: "video",
        role: "Subtitles Sync Specialist",
        rating: 5.0,
        reviews: 28,
        price: 25,
        skills: ["Veed.io", "Dynamic Captions", "Subtitles Sync", "Translate"],
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&auto=format&fit=crop&q=80",
        bio: "Transcribing and overlaying highly-animated style custom text subtitles (Alex Hormozi style) on reels and short promo assets."
    },
    {
        id: 27,
        name: "Siddharth Goel",
        avatar: "SG",
        college: "BITS Goa",
        category: "video",
        role: "Colorist & Transition Editor",
        rating: 4.7,
        reviews: 17,
        price: 40,
        skills: ["DaVinci Resolve", "LUTs Grading", "Speed Ramping"],
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
        bio: "Applying custom film LUT color balances, executing seamless camera transitions, speed ramping active sport clips, and visual upgrades."
    },

    // === GROWTH / OUTREACH ===
    {
        id: 10,
        name: "Neha Patel",
        avatar: "NP",
        college: "LSR Delhi",
        category: "growth",
        role: "Outreach & Lead Gen Lead",
        rating: 4.9,
        reviews: 19,
        price: 55,
        skills: ["Cold Emailing", "LinkedIn Sales Navigator", "Lead Mining"],
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
        bio: "Compiling verified lists of local sponsors, business leads, mapping potential partners, and organizing email campaigns."
    },
    {
        id: 11,
        name: "Rahul Saxena",
        avatar: "RS",
        college: "NMIMS Mumbai",
        category: "growth",
        role: "College Activation Captain",
        rating: 4.7,
        reviews: 12,
        price: 45,
        skills: ["Influencer Mapping", "Campus Promo", "Event Activations"],
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&auto=format&fit=crop&q=80",
        bio: "Connecting micro-businesses with campus influencers, organizing college-centric campaigns, and visual marketing activations."
    },
    {
        id: 12,
        name: "Tanvi Gupta",
        avatar: "TG",
        college: "Symbiosis Pune",
        category: "growth",
        role: "Partnership & CRM Coordinator",
        rating: 5.0,
        reviews: 8,
        price: 50,
        skills: ["Pitch Deck Creation", "Event Outreach", "CRM Tagging"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        bio: "Assisting brands in finding micro-influencers, drafting outreach pitch letters, and deploying hyperlocal target lists."
    },
    {
        id: 28,
        name: "Kunal Kashyap",
        avatar: "KK",
        college: "IIM Indore (IPM)",
        category: "growth",
        role: "Cold Call & Pipeline Builder",
        rating: 4.8,
        reviews: 15,
        price: 60,
        skills: ["Cold Outreach", "Hubspot CRM", "Script Testing"],
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
        bio: "Building outbound appointment pipeline setups, organizing contact forms, and developing cold introduction email templates."
    },
    {
        id: 29,
        name: "Zara Sheikh",
        avatar: "ZS",
        college: "St. Xavier's Kolkata",
        category: "growth",
        role: "Micro-Sponsor Finder",
        rating: 4.9,
        reviews: 20,
        price: 50,
        skills: ["Sponsorship Pitch", "Excel Lists", "Negotiation Support"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        bio: "Finding small event business sponsors, pitching event banner slots, listing potential local college event partners."
    },
    {
        id: 30,
        name: "Pratyush Sen",
        avatar: "PS",
        college: "IIFT Delhi",
        category: "growth",
        role: "LinkedIn Lead Mining Expert",
        rating: 5.0,
        reviews: 10,
        price: 55,
        skills: ["Sales Nav", "Email Finding", "Excel Cleansing"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        bio: "Scraping highly targeted business email lists from LinkedIn using advanced Sales Navigator scripts, ensuring valid and verified data."
    },

    // === AUTOMATION / TECH ===
    {
        id: 13,
        name: "Amit Verma",
        avatar: "AV",
        college: "NSUT Delhi",
        category: "automation",
        role: "Workflow & Bots Automator",
        rating: 5.0,
        reviews: 31,
        price: 110,
        skills: ["Make.com", "Zapier", "WhatsApp API", "CRMs"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        bio: "Building smart WhatsApp automated bots, integrating Google Sheets pipelines, CRM syncs, and auto-reply email flows."
    },
    {
        id: 14,
        name: "Karan Johar",
        avatar: "KJ",
        college: "IIIT Hyderabad",
        category: "automation",
        role: "No-Code Web Developer",
        rating: 4.9,
        reviews: 27,
        price: 90,
        skills: ["Framer", "Webflow", "WordPress/Wix Fixes", "SEO Config"],
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        bio: "Creating high-converting Framer landing pages, cleaning up loading speeds on WordPress, and running on-page SEO audits."
    },
    {
        id: 15,
        name: "Shreya Ghoshal",
        avatar: "SG",
        college: "IGDTUW Delhi",
        category: "automation",
        role: "Google Sheets & AppsScript Pro",
        rating: 4.8,
        reviews: 40,
        price: 70,
        skills: ["Google AppsScript", "Forms Automations", "Sheet Dashboards"],
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80",
        bio: "Developing custom macros, connecting external lead capture forms directly to Google Sheets, and building interactive dashboards."
    },
    {
        id: 31,
        name: "Nisha Singhal",
        avatar: "NS",
        college: "DTU Delhi",
        category: "automation",
        role: "Typeform & Notion Architect",
        rating: 4.9,
        reviews: 35,
        price: 80,
        skills: ["Notion Workspaces", "Tally Forms", "Zapier Integration"],
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80",
        bio: "Organizing business internal client Notion portals, building clean intake Tally forms, and syncing them automatically to customer tables."
    },
    {
        id: 32,
        name: "Manish Kumar",
        avatar: "MK",
        college: "IIT Kanpur",
        category: "automation",
        role: "E-Commerce Automator",
        rating: 5.0,
        reviews: 22,
        price: 100,
        skills: ["Shopify Automate", "Stripe Sync", "Email Flows"],
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=600&auto=format&fit=crop&q=80",
        bio: "Connecting custom e-commerce product checkouts directly with shipping API providers, email receipts, and CRM lead tags."
    },
    {
        id: 33,
        name: "Tanya Sharma",
        avatar: "TS",
        college: "BITS Pilani",
        category: "automation",
        role: "On-Page SEO Optimizer",
        rating: 4.8,
        reviews: 29,
        price: 75,
        skills: ["Ahrefs Pro", "Meta Descriptions", "Image Compression"],
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
        bio: "Fixing keyword meta structures, executing alt image tag additions, improving loading speeds, and verifying search console indexes."
    },

    // === RESEARCH / OPS ===
    {
        id: 16,
        name: "Priya Rao",
        avatar: "PR",
        college: "St. Stephen's Delhi",
        category: "research",
        role: "Market Analyst & Surveyor",
        rating: 4.7,
        reviews: 14,
        price: 50,
        skills: ["Competitor Analysis", "Pricing Audits", "Excel Modeling", "Surveys"],
        image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80",
        bio: "Running visual audits, compiling competitive pricing directories, deploying custom survey question templates, and cleanups."
    },
    {
        id: 17,
        name: "Arjun Singhal",
        avatar: "AS",
        college: "Christ University Bangalore",
        category: "research",
        role: "Database & Catalog Curator",
        rating: 4.8,
        reviews: 16,
        price: 40,
        skills: ["Catalog Cleanups", "Data Entry Scripts", "Shopify Uploads"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80",
        bio: "Uploading bulk shop listings, auditing catalog descriptions, tagging products, and curating local market sheets."
    },
    {
        id: 18,
        name: "Kriti Sanon",
        avatar: "KS",
        college: "KMC Delhi",
        category: "research",
        role: "Customer Operations Specialist",
        rating: 4.9,
        reviews: 11,
        price: 35,
        skills: ["Survey Analytics", "Data Cleansing", "Lead Verification"],
        image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=600&auto=format&fit=crop&q=80",
        bio: "Verifying target contact sheets, sorting local consumer survey results, and cleaning outdated CRM registers."
    },
    {
        id: 34,
        name: "Rohan Das",
        avatar: "RD",
        college: "Symbiosis Bangalore",
        category: "research",
        role: "E-Commerce Competitor Tracker",
        rating: 4.8,
        reviews: 18,
        price: 45,
        skills: ["Competitor Tracker", "Price Scraping", "Google Sheets"],
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
        bio: "Creating comparative pricing sheets across Amazon and local Shopify platforms to help brands position discount campaigns."
    },
    {
        id: 35,
        name: "Aarushi Jain",
        avatar: "AJ",
        college: "LSR Delhi",
        category: "research",
        role: "Academic & Fact-Checker",
        rating: 5.0,
        reviews: 13,
        price: 50,
        skills: ["Academic Search", "Citation Formats", "Fact Checks"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        bio: "Researching historical facts, compiling bibliography citation sheets, and conducting thorough academic journal data tagging."
    },
    {
        id: 36,
        name: "Vicky Malhotra",
        avatar: "VM",
        college: "IIT Kharagpur",
        category: "research",
        role: "Sentiment & Product Lead",
        rating: 4.9,
        reviews: 25,
        price: 40,
        skills: ["Review Audits", "Excel Reporting", "Tagging Ops"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
        bio: "Auditing thousands of competitor customer comments, labeling them by key feature complaints, and creating summary pivot reports."
    }
];

export default function Common() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [budgetFilter, setBudgetFilter] = useState("all");
    const [activeToast, setActiveToast] = useState(null);

    // Add scroll container references
    const scrollRefs = useRef({});

    const scroll = (domainId, direction) => {
        const container = scrollRefs.current[domainId];
        if (container) {
            const firstCard = container.firstElementChild;
            const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 420;
            const scrollAmount = cardWidth + 24; // Card width + gap-6 (24px)
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Handle Quick Search tags
    const handleQuickSearch = (tag) => {
        setSearchQuery(tag);
    };

    // Trigger local contact request toast feedback
    const handleContact = (name) => {
        setActiveToast(`Contact request successfully sent to ${name}!`);
        setTimeout(() => {
            setActiveToast(null);
        }, 4000);
    };

    // Filter Freelancers according to category, search text, and budget filter
    const filteredFreelancers = useMemo(() => {
        return freelancersData.filter((person) => {
            // Category filter
            const matchesCategory = selectedCategory === "all" || person.category === selectedCategory;

            // Search query filter
            const matchesSearch = searchQuery === "" ||
                person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                person.college.toLowerCase().includes(searchQuery.toLowerCase());

            // Budget filter
            let matchesBudget = true;
            if (budgetFilter === "under50") matchesBudget = person.price < 50;
            else if (budgetFilter === "50to100") matchesBudget = person.price >= 50 && person.price <= 100;
            else if (budgetFilter === "over100") matchesBudget = person.price > 100;

            return matchesCategory && matchesSearch && matchesBudget;
        });
    }, [searchQuery, selectedCategory, budgetFilter]);

    // Find the currently active category metadata (to display description dynamically)
    const activeCategoryMetadata = useMemo(() => {
        return domains.find(d => d.id === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="w-full bg-white text-slate-800 pb-20">
            <Header2 />

            {/* Premium Header/Hero Section matching Orange/Vibrant Aesthetics */}
            <section className="relative bg-slate-950 text-white py-20 px-6 sm:px-12 md:py-24 overflow-hidden border-b border-slate-900">
                {/* Visual Glare elements with Orange / Amber gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-600/5 blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-start text-left space-y-8">
                    <div className="space-y-4 max-w-3xl">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 tracking-wide uppercase border border-orange-500/20">
                            Hyperlocal Talent Network
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-orange-500">
                            Solve your digital problems with <span className="text-orange-500">student freelancers</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                            Structured work categories. Verified local student executors. Direct zero-friction matching.
                        </p>
                    </div>

                    {/* Highly Polished Search Bar - Orange Theme */}
                    <div className="w-full max-w-2xl">
                        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl overflow-hidden shadow-2xl p-1.5 gap-1.5 border border-slate-800/10">
                            <div className="flex-1 flex items-center px-4 gap-3">
                                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <input
                                    type="text"
                                    placeholder='Try "Instagram posts" or "logo redesign"'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none font-semibold text-base"
                                />
                            </div>
                            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-200 active:scale-[0.98] shrink-0 text-base shadow-lg shadow-orange-500/20">
                                Search
                            </button>
                        </div>

                        {/* Popular Search tags with Orange border transitions */}
                        <div className="flex flex-wrap items-center mt-4 gap-2 text-sm font-semibold text-slate-300">
                            <span>Popular:</span>
                            {["Instagram posts", "Logo redesign", "Reel edits", "WhatsApp bot"].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => handleQuickSearch(tag)}
                                    className="px-3 py-1 rounded-full border border-slate-800 hover:bg-slate-900 hover:border-orange-500/50 hover:text-white transition-all duration-200"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorization & Choose Domains Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-12">
                <div className="text-left space-y-2">
                    <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Work Scope Categorization</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Choose your domain</h2>
                    <p className="text-slate-500 font-semibold">Select a category below to solve specialized digital problems instantly.</p>
                </div>

                {/* Domain Category Selector - Orange Style */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {domains.map((domain) => {
                        const isSelected = selectedCategory === domain.id;
                        return (
                            <button
                                key={domain.id}
                                onClick={() => setSelectedCategory(domain.id)}
                                className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 gap-3 group relative overflow-hidden ${isSelected
                                    ? "bg-orange-50/50 border-orange-500 text-orange-600 shadow-md shadow-orange-50/50"
                                    : "bg-white border-slate-100 hover:border-orange-500/30 hover:bg-slate-50/30 hover:shadow-lg text-slate-700"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${isSelected ? "bg-orange-100 text-orange-600" : "bg-slate-50 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600"
                                    }`}>
                                    {domain.icon}
                                </div>
                                <span className="font-bold text-xs tracking-wide leading-tight">{domain.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Dynamic Category Detail Box - Orange styling */}
                <div className="p-6 rounded-2xl bg-orange-50/30 border border-orange-100/50 text-left space-y-2 max-w-5xl">
                    <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Included Scope of Work ({activeCategoryMetadata?.name}):</span>
                    </h4>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed pl-7">
                        {activeCategoryMetadata?.description}
                    </p>
                </div>
            </section>

            {/* Filter Toolbar & Student Listings */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
                <hr className="border-slate-100" />

                {/* Filter Toolbar */}
                <div className="flex flex-wrap justify-between items-center gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Budget Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Budget limit:</span>
                            <select
                                value={budgetFilter}
                                onChange={(e) => setBudgetFilter(e.target.value)}
                                className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 font-semibold text-sm text-slate-700 focus:outline-none focus:border-orange-500 transition-colors"
                            >
                                <option value="all">Any Price</option>
                                <option value="under50">Under $50/hr</option>
                                <option value="50to100">$50 - $100/hr</option>
                                <option value="over100">Over $100/hr</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-sm font-bold text-slate-500">
                        Top active talents: <span className="text-orange-600">{filteredFreelancers.length}</span>
                    </div>
                </div>

                {/* Dynamic Horizontal Domain Rows */}
                {filteredFreelancers.length > 0 ? (
                    <div className="space-y-16">
                        {domains
                            .filter((d) => d.id !== "all") // Exclude the "All" category from rows
                            .map((domain) => {
                                // Filter freelancers belonging to this specific category
                                const domainFreelancers = filteredFreelancers.filter(
                                    (person) => person.category === domain.id
                                );

                                // If no freelancers match inside this row, don't show the category row
                                if (domainFreelancers.length === 0) return null;

                                return (
                                    <div key={domain.id} className="space-y-6 text-left border-b border-slate-100/60 pb-12 last:border-0 last:pb-0">
                                        {/* Category Heading Info */}
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 shadow-sm border border-orange-100/50">
                                                    {domain.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">{domain.name}</h3>
                                                    <p className="text-slate-500 text-xs font-semibold mt-0.5 max-w-xl">{domain.description}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Scroll navigation controls */}
                                            <div className="flex items-center gap-4 shrink-0">
                                                <span className="text-xs hidden sm:inline-block font-bold bg-slate-50 text-slate-500 border border-slate-100 px-3.5 py-1 rounded-full">
                                                    {domainFreelancers.length} Available
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => scroll(domain.id, 'left')}
                                                        className="w-9 h-9 rounded-xl bg-white border border-slate-100 hover:border-orange-500/30 hover:bg-orange-50 hover:text-orange-600 text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                                                        aria-label="Scroll left"
                                                    >
                                                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => scroll(domain.id, 'right')}
                                                        className="w-9 h-9 rounded-xl bg-white border border-slate-100 hover:border-orange-500/30 hover:bg-orange-50 hover:text-orange-600 text-slate-600 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
                                                        aria-label="Scroll right"
                                                    >
                                                        <svg className="w-4 h-4 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Horizontal Scroll Row */}
                                        <div 
                                            ref={(el) => (scrollRefs.current[domain.id] = el)}
                                            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x scrollbar-thin scrollbar-thumb-orange-500/20 scrollbar-track-transparent scroll-smooth"
                                        >
                                            {domainFreelancers.map((person) => (
                                                <div
                                                    key={person.id}
                                                    className="flex-none w-[340px] sm:w-[420px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:border-orange-500/25 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group snap-start relative overflow-hidden"
                                                >
                                                    {/* Sleek Horizontal Detail Row */}
                                                    <div className="flex items-center gap-4 text-left">
                                                        {/* Avatar Photo */}
                                                        <div className="relative shrink-0">
                                                            <img
                                                                src={person.image}
                                                                alt={person.name}
                                                                className="w-12 h-12 rounded-full object-cover border border-slate-100 group-hover:border-orange-500 transition-colors duration-300 shadow-sm"
                                                            />
                                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                                        </div>
                                                        {/* Text Info */}
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-extrabold text-slate-900 text-sm leading-tight group-hover:text-orange-600 transition-colors duration-200 truncate">
                                                                {person.name}
                                                            </h4>
                                                            <p className="text-orange-600 font-bold text-[10px] tracking-wide leading-tight mt-0.5 truncate">
                                                                {person.college}
                                                            </p>
                                                            <p className="font-extrabold text-slate-800 text-xs leading-snug mt-1 truncate">
                                                                {person.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Short 1-Line Bio - Makes card vertically slightly longer & highly informative */}
                                                    <p className="text-slate-500 text-[11px] font-semibold leading-relaxed mt-3 text-left line-clamp-1">
                                                        {person.bio}
                                                    </p>

                                                    {/* Rate & Action Footer */}
                                                    <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-slate-100">
                                                        <div className="text-left">
                                                            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider leading-none">Starting Rate</p>
                                                            <p className="text-sm font-extrabold text-slate-900 mt-1">${person.price}/hr</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleContact(person.name)}
                                                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl text-[10px] transition-all duration-200 shadow-md shadow-orange-500/10 active:scale-95 shrink-0"
                                                        >
                                                            Contact
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                ) : (
                    /* Empty Search State */
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900">No talents match this scope</h3>
                        <p className="text-slate-500 font-medium max-w-sm mx-auto">Try clearing your search query or selecting a different category from above.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setBudgetFilter("all"); }}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all duration-200"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </section>

            <Footer2 />

            {/* Slide-in Action Toast Notification */}
            {activeToast && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 animate-slide-in">
                    <svg className="w-5 h-5 text-orange-500 shrink-0 fill-orange-500/10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-sm font-bold tracking-wide">{activeToast}</span>
                </div>
            )}
        </div>
    );
}