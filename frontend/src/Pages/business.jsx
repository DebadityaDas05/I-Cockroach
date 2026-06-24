import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header3 from '../components/Header3';
import Footer3 from '../components/Footer3';

export default function Business() {
    // -------------------------------------------------------------
    // Mock Data for Pre-populated Job and its Student Pitches
    // -------------------------------------------------------------
    const initialJobs = [
        {
            id: "job-1",
            prompt: "Need 3 aesthetic vertical reels for my local bakery/cafe with trending music and caption writing",
            budget: 150,
            deadline: "June 2, 2026",
            category: "Video / Editing",
            outcome: "Increase weekend walk-in foot traffic by showcasing fresh sourdough bakes.",
            pitches: [
                {
                    id: "pitch-1-1",
                    studentName: "Rohan Kapoor",
                    college: "IIT Bombay",
                    avatar: "RK",
                    intro: "Aesthetic filmmaker and short-form growth editor focusing on local food brands.",
                    whyMe: "I live 15 mins away from your location. I will capture professional raw footage of your kitchen bakes using cinematic lighting and pair them with trending high-retention audio hooks.",
                    history: "Designed vertical reel strategies for 3 local bakeries, boosting Instagram engagement by 42% in 30 days.",
                    cost: 120,
                    timeline: "4 Days",
                    portfolio: "behance.net/rohan-food-reels"
                },
                {
                    id: "pitch-1-2",
                    studentName: "Aanya Sharma",
                    college: "NID Ahmedabad",
                    avatar: "AS",
                    intro: "Visual designer and vertical brand storyteller specializing in animated cafe aesthetic content.",
                    whyMe: "I will craft bespoke motion graphic title overlays and custom color gradings to give your bakery a cozy, premium signature feel that targets design-conscious foodies.",
                    history: "Created digital menu reels and Instagram launch assets for 2 major cafes in Ahmedabad.",
                    cost: 140,
                    timeline: "5 Days",
                    portfolio: "dribbble.com/aanya-nid-cafe"
                }
            ]
        }
    ];

    // -------------------------------------------------------------
    // State management
    // -------------------------------------------------------------
    const [jobs, setJobs] = useState(initialJobs);
    const [selectedJobId, setSelectedJobId] = useState("job-1");
    
    // Form fields for "Post Work"
    const [newPrompt, setNewPrompt] = useState("");
    const [newBudget, setNewBudget] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
    const [newCategory, setNewCategory] = useState("Video / Editing");
    const [newOutcome, setNewOutcome] = useState("");

    // Active Tracking state (3. Assign & Track)
    const [trackingMap, setTrackingMap] = useState({
        "job-1": null // Null means unassigned, holds object when a student pitch is accepted
    });

    // Escrow digital signatures
    const [isSignedOff, setIsSignedOff] = useState({});
    const [toastMessage, setToastMessage] = useState(null);

    const [tokenBalance, setTokenBalance] = useState(1250);
    const [transactions, setTransactions] = useState([
        { type: 'Escrow Lock', desc: 'Video / Reels Editing campaign', amount: '-150 ATK', date: 'May 22, 2026', isCredit: false },
        { type: 'Top Up', desc: 'UPI payment · Razorpay', amount: '+500 ATK', date: 'May 20, 2026', isCredit: true },
        { type: 'Escrow Released', desc: 'Social Media Branding · Riya Sharma', amount: '-300 ATK', date: 'May 18, 2026', isCredit: false },
        { type: 'Reward Bonus', desc: 'Referral — Arjun Mehta joined', amount: '+25 ATK', date: 'May 15, 2026', isCredit: true },
        { type: 'Top Up', desc: 'UPI payment · Razorpay', amount: '+1,000 ATK', date: 'May 10, 2026', isCredit: true },
    ]);

    // URL Search Params for Tab State
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab') || 'post-jobs';

    const setActiveTab = (tabName) => {
        setSearchParams({ tab: tabName });
    };

    // Active selected job details
    const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

    // -------------------------------------------------------------
    // Handlers
    // -------------------------------------------------------------
    
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => {
            setToastMessage(null);
        }, 5000);
    };

    // Post Work Submit
    const handlePostWork = (e) => {
        e.preventDefault();
        if (!newPrompt.trim() || !newBudget || !newDeadline.trim() || !newOutcome.trim()) {
            alert("Please fill out all required fields to post your campaign.");
            return;
        }

        const jobId = `job-${Date.now()}`;
        const newJobObj = {
            id: jobId,
            prompt: newPrompt,
            budget: Number(newBudget),
            deadline: newDeadline,
            category: newCategory,
            outcome: newOutcome,
            pitches: [
                {
                    id: `pitch-${Date.now()}-1`,
                    studentName: "Kabir Mehta",
                    college: "DTU Delhi",
                    avatar: "KM",
                    intro: `Specialist in execution for ${newCategory} tasks with deep local context.`,
                    whyMe: `I have completed 12 geofenced tasks in this category. I will guarantee delivery meeting your specific outcome: "${newOutcome}" within your deadline.`,
                    history: `Delivered 8 successful micro-campaigns in Delhi NCR, maintaining a 4.9 star rating.`,
                    cost: Math.floor(Number(newBudget) * 0.85),
                    timeline: "3 Days",
                    portfolio: "behance.net/kabir-student-ops"
                },
                {
                    id: `pitch-${Date.now()}-2`,
                    studentName: "Sneha Sen",
                    college: "SRCC Delhi",
                    avatar: "SS",
                    intro: `Operations manager and content creator focusing on micro-SME scaling.`,
                    whyMe: `I provide fully verified execution updates every 24 hours. My proposed workflow aligns 100% with your budget constraints.`,
                    history: `Assisted 4 startups in Delhi to deploy targeted physical and digital collateral.`,
                    cost: Math.floor(Number(newBudget) * 0.95),
                    timeline: "4 Days",
                    portfolio: "github.com/sneha-srcc-portfolio"
                }
            ]
        };

        setJobs([...jobs, newJobObj]);
        setTrackingMap(prev => ({ ...prev, [jobId]: null }));
        setSelectedJobId(jobId);

        // Reset inputs
        setNewPrompt("");
        setNewBudget("");
        setNewDeadline("");
        setNewOutcome("");

        showToast(`Campaign posted successfully! 2 qualified student executors matched in geofence.`);
        
        // Auto navigate to pitches after posting work to see matches
        setTimeout(() => {
            setActiveTab('pitches');
        }, 1500);
    };

    // Accept & Assign Pitch
    const handleAssignJob = (jobId, pitch) => {
        const assignment = {
            studentName: pitch.studentName,
            college: pitch.college,
            avatar: pitch.avatar,
            cost: pitch.cost,
            timeline: pitch.timeline,
            stage: "Pending" // Pending -> In Progress -> Revision -> Completed -> Paid
        };

        setTrackingMap(prev => ({
            ...prev,
            [jobId]: assignment
        }));

        showToast(`Executor ${pitch.studentName} assigned! Campaign moved to "Pending" escrow lock.`);

        setTimeout(() => {
            setActiveTab('tracking');
        }, 1500);
    };

    // Move Pipeline Stages
    const handleAdvanceStage = (jobId, nextStage) => {
        setTrackingMap(prev => {
            const active = prev[jobId];
            if (!active) return prev;

            // Deduct tokens guarantee if transition to "In Progress" from "Pending"
            if (nextStage === "In Progress" && active.stage === "Pending") {
                setTokenBalance(balance => balance - 500);
                setTransactions(txs => [
                    { 
                        type: 'Escrow Guarantee Lock', 
                        desc: `Guarantee hold for ${active.studentName} execution`, 
                        amount: '-500 ATK', 
                        date: 'Today', 
                        isCredit: false 
                    },
                    ...txs
                ]);
            }

            return {
                ...prev,
                [jobId]: {
                    ...active,
                    stage: nextStage
                }
            };
        });

        showToast(`Pipeline updated! Candidate status is now "${nextStage}".`);
    };

    // Approve & Release Escrow
    const handleDigitalSignOff = (jobId) => {
        const active = trackingMap[jobId];
        if (!active) return;

        setTrackingMap(prev => ({
            ...prev,
            [jobId]: {
                ...prev[jobId],
                stage: "Paid"
            }
        }));

        setIsSignedOff(prev => ({
            ...prev,
            [jobId]: true
        }));

        // Restore token guarantee
        setTokenBalance(balance => balance + 500);
        setTransactions(txs => [
            { 
                type: 'Escrow Guarantee Release', 
                desc: `Released guarantee hold for ${active.studentName} completion`, 
                amount: '+500 ATK', 
                date: 'Today', 
                isCredit: true 
            },
            ...txs
        ]);

        showToast(`Digital sign-off completed! Escrow funds of $${active.cost} released securely to ${active.studentName}.`);
    };

    const pipelineStages = ["Pending", "In Progress", "Revision", "Completed", "Paid"];
    const totalPendingPitches = jobs.reduce((acc, job) => acc + (trackingMap[job.id] ? 0 : job.pitches.length), 0);
    const totalActiveTracked = Object.values(trackingMap).filter(Boolean).length;

    // Helper for rendering campaign pickers — horizontal scrollable pill row
    const renderCampaignSidebar = () => (
        <div className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-900/80 shadow-2xl space-y-4">
            <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest">
                Active Campaigns ({jobs.length})
            </h4>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
                {jobs.map((job) => {
                    const isSelected = job.id === selectedJobId;
                    const isAssigned = trackingMap[job.id] != null;
                    return (
                        <button
                            key={job.id}
                            onClick={() => setSelectedJobId(job.id)}
                            className={`flex-shrink-0 text-left px-5 py-4 rounded-2xl border transition-all duration-300 cursor-pointer min-w-[220px] max-w-[260px] ${isSelected
                                ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/5'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            <div className="flex justify-between items-center gap-2 mb-2">
                                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase ${isSelected ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500'}`}>
                                    {job.category}
                                </span>
                                {isAssigned ? (
                                    <span className="text-[9px] font-bold text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>Active
                                    </span>
                                ) : (
                                    <span className="text-[9px] font-bold text-orange-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>Open
                                    </span>
                                )}
                            </div>
                            <p className="font-extrabold text-xs leading-snug line-clamp-2 mb-2.5">
                                {job.prompt}
                            </p>
                            <p className="text-[10px] font-semibold text-slate-500">
                                Budget: <strong className="text-slate-300">${job.budget}</strong>
                            </p>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-orange-500/30 selection:text-orange-400">
            <div>
                <Header3 />

                {/* Main Workspace Area */}
                <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <div className="transition-all duration-300 ease-in-out">
                        
                        {/* WORKSPACE 1: POST JOBS */}
                        {activeTab === 'post-jobs' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start animate-[fadeIn_0.4s_ease-out]">
                                {/* Left Column: Stunning, spacious Form to Post Work */}
                                <div className="text-left">
                                    <div className="p-10 md:p-16 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-900 shadow-2xl space-y-10 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.06),transparent_50%)]"></div>
                                        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-800/60 relative z-10">
                                            <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </div>
                                            <h3 className="font-black text-lg text-white tracking-wide">Create New Job Campaign</h3>
                                        </div>

                                        <form onSubmit={handlePostWork} className="space-y-7 relative z-10">
                                            {/* Prompt Description */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Describe the Job / Prompt</label>
                                                <textarea
                                                    required
                                                    rows="7"
                                                    placeholder="Describe what you need — e.g., 3 aesthetic reels for my café with trending music"
                                                    value={newPrompt}
                                                    onChange={(e) => setNewPrompt(e.target.value)}
                                                    className="w-full px-6 py-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-sm font-medium resize-none leading-relaxed"
                                                ></textarea>
                                            </div>

                                            {/* Categories selector */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Specialized Category</label>
                                                <select
                                                    value={newCategory}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    className="w-full px-6 py-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-200 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-sm font-medium cursor-pointer"
                                                >
                                                    <option value="Video / Editing">Video / Reels Editing</option>
                                                    <option value="Social Media">Social Media Branding</option>
                                                    <option value="Branding">Branding Menu / Logo Assets</option>
                                                    <option value="Automation / Tech">Automation & bots</option>
                                                    <option value="Growth / Outreach">Outreach & Leads</option>
                                                </select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Budget in dollars */}
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Escrow Budget ($)</label>
                                                    <input
                                                        type="number"
                                                        required
                                                        min="10"
                                                        placeholder="150"
                                                        value={newBudget}
                                                        onChange={(e) => setNewBudget(e.target.value)}
                                                        className="w-full px-6 py-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-sm font-medium"
                                                    />
                                                </div>
                                                {/* Campaign Escrow Payout Deadline */}
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Milestone Deadline</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        placeholder="e.g. June 5, 2026"
                                                        value={newDeadline}
                                                        onChange={(e) => setNewDeadline(e.target.value)}
                                                        className="w-full px-6 py-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-sm font-medium"
                                                    />
                                                </div>
                                            </div>

                                            {/* Target / Expected outcome */}
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Expected Target Outcome</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. Increase weekend walk-ins by 20%"
                                                    value={newOutcome}
                                                    onChange={(e) => setNewOutcome(e.target.value)}
                                                    className="w-full px-6 py-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all text-sm font-medium"
                                                />
                                            </div>

                                            {/* Submit action button */}
                                            <button
                                                type="submit"
                                                className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-orange-500/25 text-sm tracking-wider uppercase cursor-pointer"
                                            >
                                                Create Post New Job
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Right Column: List of posted Campaigns */}
                                <div className="text-left space-y-6">
                                    <div className="p-8 md:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-900 shadow-2xl space-y-6">
                                        <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                                            <h3 className="font-black text-base text-white tracking-wide">Your Posted Campaigns</h3>
                                            <span className="px-3.5 py-1 rounded-full text-[10px] font-black bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-widest">
                                                {jobs.length} Active
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin">
                                            {jobs.map((job) => {
                                                const isAssigned = trackingMap[job.id] != null;
                                                return (
                                                    <div 
                                                        key={job.id}
                                                        className="p-6 rounded-2xl bg-slate-950 border border-slate-850 hover:border-slate-800/80 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-md"
                                                    >
                                                        <div className="space-y-2.5">
                                                            <div className="flex justify-between items-center gap-2">
                                                                <span className="px-2.5 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase bg-orange-500/20 text-orange-400 border border-orange-500/10">
                                                                    {job.category}
                                                                </span>
                                                                {isAssigned ? (
                                                                    <span className="text-[9px] font-bold text-green-400 flex items-center gap-1.5">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                                        <span>Active Escrow</span>
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-[9px] font-bold text-orange-400 flex items-center gap-1.5">
                                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
                                                                        <span>Pitches Available</span>
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="font-extrabold text-xs text-white leading-relaxed">
                                                                {job.prompt}
                                                            </p>
                                                        </div>
                                                        
                                                        <div className="space-y-3 pt-3.5 border-t border-slate-850/60">
                                                            <div className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                                                                Outcome: <span className="text-slate-200">{job.outcome}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-850/20">
                                                                <span>Budget: <strong className="text-orange-400 font-black">${job.budget}</strong></span>
                                                                <span>Deadline: <strong className="text-slate-200">{job.deadline}</strong></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* WORKSPACE 2: STUDENT PITCHES */}
                        {activeTab === 'pitches' && (
                            <div className="space-y-10 animate-[fadeIn_0.4s_ease-out]">

                                {/* Campaign Selector — horizontal scrollable pill row */}
                                <div className="w-full">
                                    {renderCampaignSidebar()}
                                </div>

                                {/* Selected Campaign details — full width */}
                                <div className="p-8 md:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-900/80 shadow-2xl space-y-5">
                                    <div className="flex justify-between items-start gap-4 flex-wrap">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase tracking-widest border border-slate-700/50">
                                                Selected Campaign
                                            </span>
                                            <h2 className="text-lg sm:text-2xl font-black text-white pt-1 leading-relaxed">
                                                {activeJob.prompt}
                                            </h2>
                                        </div>
                                        <div className="text-right shrink-0 bg-slate-950/40 border border-slate-800 px-6 py-4 rounded-2xl">
                                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider leading-none">Max Budget</p>
                                            <p className="text-2xl font-black text-orange-500 mt-2">${activeJob.budget}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Category</span>
                                            <p className="text-slate-300 font-semibold text-sm">{activeJob.category}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Expected Outcome</span>
                                            <p className="text-slate-300 font-semibold text-sm leading-relaxed">{activeJob.outcome}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Escrow Deadline</span>
                                            <p className="text-slate-300 font-semibold text-sm">{activeJob.deadline}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Received Student Pitches — full width */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-black text-xs border border-orange-500/20">
                                                {activeJob.pitches.length}
                                            </div>
                                            <h3 className="font-black text-lg text-white tracking-wide">Received Student Pitches</h3>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            {activeJob.pitches.filter(p => trackingMap[activeJob.id]?.studentName === p.studentName).length > 0 ? '1 Assigned' : 'Unassigned'}
                                        </span>
                                    </div>

                                    {activeJob.pitches.length > 0 ? (
                                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                            {activeJob.pitches.map((pitch) => {
                                                const activeTracking = trackingMap[activeJob.id];
                                                const isThisStudentAssigned = activeTracking && activeTracking.studentName === pitch.studentName;
                                                const isAnyStudentAssigned = activeTracking != null;

                                                return (
                                                    <div
                                                        key={pitch.id}
                                                        className={`p-8 rounded-3xl backdrop-blur-md border transition-all duration-300 relative overflow-hidden group ${isThisStudentAssigned
                                                            ? 'bg-slate-900/60 border-green-500/60 shadow-lg shadow-green-500/5'
                                                            : 'bg-slate-900/40 border-slate-800/60 hover:border-orange-500/30 hover:shadow-xl'
                                                            }`}
                                                    >
                                                        {isThisStudentAssigned && (
                                                            <div className="absolute top-0 right-0 px-4 py-1.5 text-[8px] font-black uppercase tracking-widest bg-green-500 text-slate-950 rounded-bl-2xl">
                                                                Assigned Executor
                                                            </div>
                                                        )}

                                                        {/* Top row: student identity + bid */}
                                                        <div className="flex items-start justify-between gap-4 mb-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-orange-400 font-black text-base flex items-center justify-center border border-slate-700 shrink-0">
                                                                    {pitch.avatar}
                                                                </div>
                                                                <div>
                                                                    <h5 className="font-black text-white text-base leading-tight">{pitch.studentName}</h5>
                                                                    <p className="text-[11px] text-orange-400 font-bold tracking-wider mt-1">{pitch.college}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right shrink-0">
                                                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Bid</p>
                                                                <p className="font-black text-white text-xl mt-0.5">${pitch.cost}</p>
                                                                <p className="text-[10px] text-slate-500 font-semibold">{pitch.timeline}</p>
                                                            </div>
                                                        </div>

                                                        {/* Pitch content */}
                                                        <div className="space-y-4 pt-5 border-t border-slate-800/60">
                                                            <div className="space-y-1">
                                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Introduction</span>
                                                                <p className="text-slate-300 font-semibold text-sm leading-relaxed">{pitch.intro}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Why Me</span>
                                                                <p className="text-slate-400 font-medium text-sm italic leading-relaxed">"{pitch.whyMe}"</p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/40">
                                                                <div className="space-y-1">
                                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Past Work</span>
                                                                    <p className="text-slate-300 font-semibold text-xs leading-relaxed">{pitch.history}</p>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Portfolio</span>
                                                                    <a href={`https://${pitch.portfolio}`} target="_blank" rel="noreferrer" className="inline-block mt-1 font-bold text-orange-400 hover:underline text-xs truncate max-w-full">
                                                                        {pitch.portfolio}
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Assign button */}
                                                        {!isThisStudentAssigned && (
                                                            <button
                                                                onClick={() => handleAssignJob(activeJob.id, pitch)}
                                                                disabled={isAnyStudentAssigned}
                                                                className={`w-full mt-6 py-3.5 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95 cursor-pointer ${isAnyStudentAssigned
                                                                    ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                                                                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/20'
                                                                    }`}
                                                            >
                                                                Accept & Assign
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="p-16 text-center rounded-3xl bg-slate-900/20 border border-slate-800/60 space-y-3">
                                            <p className="text-slate-400 font-semibold text-sm">No pitches received yet.</p>
                                            <p className="text-slate-500 text-xs">Waiting for local students to sync with geofence commands.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* WORKSPACE 3: ASSIGN & TRACK */}
                        {activeTab === 'tracking' && (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start animate-[fadeIn_0.4s_ease-out]">
                                {/* Left Column: Sidebar selector */}
                                <div className="lg:col-span-4 text-left">
                                    {renderCampaignSidebar()}
                                </div>

                                {/* Right Column: Milestone tracker and payout controls */}
                                <div className="lg:col-span-8 space-y-8 text-left">
                                    
                                    {/* 3. Assign & Track Pipeline */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-900">
                                            <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs">3</div>
                                            <h3 className="font-black text-base text-white tracking-wide">Campaign Progress Tracker</h3>
                                        </div>

                                        {trackingMap[activeJob.id] ? (
                                            <div className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-slate-900 shadow-2xl space-y-8">
                                                
                                                {/* Candidate & Escrow overview */}
                                                <div className="flex justify-between items-center flex-wrap gap-4 pb-5 border-b border-slate-850/60">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-slate-850 text-orange-500 font-black text-xs flex items-center justify-center border border-slate-750 shadow-inner">
                                                            {trackingMap[activeJob.id].avatar}
                                                        </div>
                                                        <div className="text-left space-y-0.5">
                                                            <h5 className="font-black text-white text-sm leading-none">{trackingMap[activeJob.id].studentName}</h5>
                                                            <p className="text-[10px] text-slate-400 font-semibold mt-1">{trackingMap[activeJob.id].college}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-5 text-xs">
                                                        <div className="text-right shrink-0 bg-slate-950/40 border border-slate-850 px-3.5 py-1.5 rounded-xl">
                                                            <p className="text-[8px] text-slate-500 font-black uppercase tracking-wider leading-none">Locked Budget</p>
                                                            <p className="font-black text-white text-sm mt-1">${trackingMap[activeJob.id].cost}</p>
                                                        </div>
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                            trackingMap[activeJob.id].stage === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                                                            trackingMap[activeJob.id].stage === "In Progress" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                            trackingMap[activeJob.id].stage === "Revision" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                            trackingMap[activeJob.id].stage === "Completed" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                                                            "bg-green-500/10 text-green-400 border-green-500/20"
                                                        }`}>
                                                            Status: {
                                                                trackingMap[activeJob.id].stage === "Pending" ? "Pending Escrow" :
                                                                trackingMap[activeJob.id].stage === "In Progress" ? "In Progress" :
                                                                trackingMap[activeJob.id].stage === "Revision" ? "Under Revision" :
                                                                trackingMap[activeJob.id].stage === "Completed" ? "Completed" :
                                                                "Escrow Released"
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Progress milestones */}
                                                <div className="space-y-6 py-4">
                                                    <div className="grid grid-cols-5 gap-2 relative">
                                                        
                                                        {/* Background line */}
                                                        <div className="absolute top-5 left-[8%] right-[8%] h-1 bg-slate-950 z-0 rounded-full"></div>
                                                        
                                                        {/* Colored line indicator */}
                                                        {(() => {
                                                            const currentStageIdx = pipelineStages.indexOf(trackingMap[activeJob.id].stage);
                                                            const fillPercentage = (currentStageIdx / 4) * 100;
                                                            return (
                                                                <div 
                                                                    className="absolute top-5 left-[8%] h-1 bg-gradient-to-r from-orange-500 to-orange-500 z-0 rounded-full transition-all duration-500"
                                                                    style={{ width: `${fillPercentage * 0.84}%` }}
                                                                ></div>
                                                            );
                                                        })()}

                                                        {pipelineStages.map((stage, idx) => {
                                                            const currentStageIdx = pipelineStages.indexOf(trackingMap[activeJob.id].stage);
                                                            const isCompleted = idx <= currentStageIdx;
                                                            const isActive = idx === currentStageIdx;
                                                            const stepLabels = ["Escrow", "Active", "Revision", "Approve", "Payout"];

                                                            return (
                                                                <div key={stage} className="flex flex-col items-center space-y-3 z-10">
                                                                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-black text-xs transition-all duration-300 ${isActive
                                                                        ? 'bg-orange-500 text-slate-950 border-orange-500 shadow-xl shadow-orange-500/20 scale-110'
                                                                        : isCompleted
                                                                            ? 'bg-slate-900 text-orange-500 border-orange-500'
                                                                            : 'bg-slate-950 text-slate-600 border-slate-850'
                                                                        }`}>
                                                                        {idx + 1}
                                                                    </div>
                                                                    <span className={`text-[9px] font-black tracking-widest uppercase transition-colors duration-300 ${isCompleted ? 'text-slate-200' : 'text-slate-600'}`}>
                                                                        {stepLabels[idx]}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Transition Actions */}
                                                <div className="pt-5 border-t border-slate-850/60 flex flex-wrap justify-between items-center gap-5">
                                                    <div className="text-left space-y-1">
                                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">Manual pipeline control</p>
                                                        <p className="text-xs text-slate-400 font-medium">Manage deliverables and control stage transitions as the client.</p>
                                                    </div>

                                                    <div className="flex gap-2.5">
                                                        {trackingMap[activeJob.id].stage === "Pending" && (
                                                            <button
                                                                onClick={() => handleAdvanceStage(activeJob.id, "In Progress")}
                                                                className="px-5 py-2.5 font-extrabold text-[10px] uppercase tracking-wider rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all duration-300 active:scale-95 cursor-pointer"
                                                            >
                                                                Start Campaign
                                                            </button>
                                                        )}
                                                        {trackingMap[activeJob.id].stage === "In Progress" && (
                                                            <div className="flex gap-2.5">
                                                                <button
                                                                    onClick={() => handleAdvanceStage(activeJob.id, "Revision")}
                                                                    className="px-5 py-2.5 font-extrabold text-[10px] uppercase tracking-wider rounded-xl bg-slate-950 border border-red-500/25 hover:bg-red-500/5 text-red-400 transition-all duration-300 active:scale-95 cursor-pointer"
                                                                >
                                                                    Request Revision
                                                                </button>
                                                                <button
                                                                    onClick={() => handleAdvanceStage(activeJob.id, "Completed")}
                                                                    className="px-5 py-2.5 font-extrabold text-[10px] uppercase tracking-wider rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
                                                                >
                                                                    Confirm Deliverables
                                                                </button>
                                                            </div>
                                                        )}
                                                        {trackingMap[activeJob.id].stage === "Revision" && (
                                                            <button
                                                                onClick={() => handleAdvanceStage(activeJob.id, "In Progress")}
                                                                className="px-5 py-2.5 font-extrabold text-[10px] uppercase tracking-wider rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all duration-300 active:scale-95 cursor-pointer"
                                                            >
                                                                Resume Work
                                                            </button>
                                                        )}
                                                        {trackingMap[activeJob.id].stage === "Completed" && (

    <div className="flex flex-col gap-3">

        <span
            className="
                text-[10px]
                font-bold
                text-orange-400
                flex
                items-center
                gap-2
                animate-pulse
                bg-orange-500/5
                px-4.5
                py-2.5
                rounded-xl
                border
                border-orange-500/10
            "
        >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>

            <span>
                Awaiting Escrow Sign-off...
            </span>
        </span>

        {setTimeout(() => {

            if (
                !document.getElementById(
                    "violationOverlay"
                )
            ) {

                const popup =
                    document.createElement(
                        "div"
                    );

                popup.innerHTML = `

                    <div
                        id="violationOverlay"
                        style="
                            position:fixed;
                            inset:0;
                            background:rgba(0,0,0,0.75);
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            z-index:999999;
                            backdrop-filter:blur(8px);
                            padding:24px;
                        "
                    >

                        <div
                            style="
                                width:100%;
                                max-width:760px;
                                background:#0f172a;
                                border-radius:32px;
                                overflow:hidden;
                                border:1px solid rgba(239,68,68,0.15);
                                box-shadow:0 40px 140px rgba(0,0,0,0.55);
                                animation:popup .35s ease;
                                font-family:sans-serif;
                            "
                        >

                            <div
                                style="
                                    background:linear-gradient(to right,#dc2626,#7f1d1d);
                                    padding:34px;
                                    color:white;
                                "
                            >

                                <div
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:16px;
                                    "
                                >

                                    <div
                                        style="
                                            width:64px;
                                            height:64px;
                                            border-radius:20px;
                                            background:rgba(255,255,255,0.12);
                                            display:flex;
                                            align-items:center;
                                            justify-content:center;
                                            font-size:30px;
                                        "
                                    >
                                        ⚠
                                    </div>

                                    <div>

                                        <h1
                                            style="
                                                margin:0;
                                                font-size:32px;
                                                font-weight:900;
                                            "
                                        >
                                            Escrow Violation Notice
                                        </h1>

                                        <p
                                            style="
                                                margin-top:8px;
                                                opacity:.82;
                                                font-size:14px;
                                            "
                                        >
                                            Digital Compliance & Legal Warning
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div
                                style="
                                    padding:34px;
                                    color:#e2e8f0;
                                "
                            >

                                <div
                                    style="
                                        background:rgba(239,68,68,0.08);
                                        border:1px solid rgba(239,68,68,0.14);
                                        border-radius:24px;
                                        padding:26px;
                                        margin-bottom:28px;
                                    "
                                >

                                    <div
                                        style="
                                            color:#f87171;
                                            font-size:12px;
                                            font-weight:900;
                                            letter-spacing:2px;
                                            text-transform:uppercase;
                                            margin-bottom:12px;
                                        "
                                    >
                                        Legal Warning
                                    </div>

                                    <h2
                                        style="
                                            margin:0;
                                            color:white;
                                            font-size:24px;
                                            line-height:1.6;
                                            font-weight:900;
                                        "
                                    >
                                        He violated the deal with student and therefore student can take legal actions.
                                    </h2>

                                </div>

                                <div
                                    style="
                                        background:#111827;
                                        border:1px solid rgba(255,255,255,0.06);
                                        border-radius:24px;
                                        padding:28px;
                                    "
                                >

                                    <div
                                        style="
                                            display:flex;
                                            justify-content:space-between;
                                            margin-bottom:24px;
                                        "
                                    >

                                        <div>

                                            <div
                                                style="
                                                    color:#94a3b8;
                                                    font-size:11px;
                                                    font-weight:800;
                                                    letter-spacing:2px;
                                                    margin-bottom:8px;
                                                "
                                            >
                                                PENALTY STATUS
                                            </div>

                                            <div
                                                style="
                                                    color:#ef4444;
                                                    font-size:28px;
                                                    font-weight:900;
                                                "
                                            >
                                                ACTIVE
                                            </div>

                                        </div>

                                        <div
                                            style="
                                                text-align:right;
                                            "
                                        >

                                            <div
                                                style="
                                                    color:#94a3b8;
                                                    font-size:11px;
                                                    font-weight:800;
                                                    letter-spacing:2px;
                                                    margin-bottom:8px;
                                                "
                                            >
                                                ACCOUNT FREEZE
                                            </div>

                                            <div
                                                style="
                                                    color:#facc15;
                                                    font-size:28px;
                                                    font-weight:900;
                                                "
                                            >
                                                76 HOURS
                                            </div>

                                        </div>

                                    </div>

                                    <p
                                        style="
                                            margin:0;
                                            font-size:16px;
                                            line-height:2;
                                            color:#cbd5e1;
                                        "
                                    >
                                        Your tokens have been omitted and you have been penalised for 76 hours.
                                        Further violations can lead to permanent deletion of your account and legal escalation.
                                    </p>

                                    <div
                                        style="
                                            margin-top:32px;
                                            display:flex;
                                            justify-content:space-between;
                                            align-items:center;
                                            background:rgba(239,68,68,0.06);
                                            border:1px solid rgba(239,68,68,0.1);
                                            border-radius:20px;
                                            padding:20px 24px;
                                        "
                                    >

                                        <div>

                                            <div
                                                style="
                                                    color:#94a3b8;
                                                    font-size:11px;
                                                    font-weight:800;
                                                    letter-spacing:2px;
                                                    margin-bottom:8px;
                                                "
                                            >
                                                TOKEN DEDUCTION
                                            </div>

                                            <div
                                                style="
                                                    color:#ef4444;
                                                    font-size:30px;
                                                    font-weight:900;
                                                "
                                            >
                                                -500 ATK
                                            </div>

                                        </div>

                                        <div
                                            style="
                                                width:68px;
                                                height:68px;
                                                border-radius:22px;
                                                background:rgba(239,68,68,0.08);
                                                display:flex;
                                                align-items:center;
                                                justify-content:center;
                                                font-size:30px;
                                            "
                                        >
                                            ⛔
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                `;

                document.body.appendChild(
                    popup
                );

                setTokenBalance(
                    balance =>
                        balance - 500
                );

                setTransactions(
                    txs => [

                        {
                            type:
                                'Penalty Deduction',

                            desc:
                                'Violation of escrow agreement',

                            amount:
                                '-500 ATK',

                            date:
                                'Today',

                            isCredit:
                                false
                        },

                        ...txs
                    ]
                );

            }

        }, 15000)}

    </div>

)}
                                                        {trackingMap[activeJob.id].stage === "Paid" && (
                                                            <span className="text-[10px] font-bold text-green-500 flex items-center gap-2 bg-green-500/5 px-4.5 py-2.5 rounded-xl border border-green-500/10">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                                <span>Funds Disbursed to Student</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-12 text-center rounded-3xl bg-slate-900/20 border border-slate-900 shadow-xl">
                                                <p className="text-slate-500 text-xs font-semibold">No executor active. Review pitches in the **Student Pitches** tab and assign one to start tracking.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* 4. Approve & Pay Escrow Sign-off */}
                                    {trackingMap[activeJob.id] && trackingMap[activeJob.id].stage === "Completed" && (
                                        <div className="p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/25 shadow-2xl text-left space-y-5 animate-[fadeIn_0.5s_ease-out]">
                                            <div className="flex items-center gap-2.5 pb-3 border-b border-orange-500/20">
                                                <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">4</span>
                                                <h3 className="font-black text-base text-white tracking-wide">Approve & Secure Escrow Release</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                                                    Deliverables have been submitted successfully by **{trackingMap[activeJob.id].studentName}**. Perform the digital sign-off below to release the locked budget from escrow to the student.
                                                </p>
                                                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850/60 space-y-4 shadow-inner">
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="text-slate-500 font-semibold">Deliverable Cost</span>
                                                        <span className="font-extrabold text-white">${trackingMap[activeJob.id].cost}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-850/20">
                                                        <span className="text-slate-500 font-semibold">Escrow Ledger Vault</span>
                                                        <span className="font-extrabold text-green-500">Locked - Secure</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDigitalSignOff(activeJob.id)}
                                                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold rounded-2xl transition-all duration-300 active:scale-95 shadow-md shadow-orange-500/20 text-xs tracking-wider uppercase cursor-pointer"
                                                    >
                                                        Digital Sign-Off & Release Escrow Funds
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payout Confirmation Success */}
                                    {isSignedOff[activeJob.id] && (
                                        <div className="p-8 rounded-3xl bg-green-500/10 border border-green-500/20 text-left space-y-3 shadow-xl animate-[fadeIn_0.5s_ease-out]">
                                            <h4 className="text-sm font-extrabold text-green-400 flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                                <span>Escrow Release Confirmed</span>
                                            </h4>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                                Secure ledger keys verified. Escrow transaction was successfully broadcast, releasing **${trackingMap[activeJob.id]?.cost}** to the digital wallet of **{trackingMap[activeJob.id]?.studentName}**. Thank you for executing through Aethon Grid!
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        {/* WORKSPACE 4: TOKENS */}
                        {activeTab === 'tokens' && (
                            <div className="space-y-10 animate-[fadeIn_0.4s_ease-out]">

                                {/* Token Balance Hero */}
                                <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-orange-500/10 via-slate-900/60 to-slate-950 border border-orange-500/20 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_60%)]"></div>
                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                                        <div className="space-y-3">
                                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                                                Aethon Token Wallet
                                            </span>
                                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                                                {tokenBalance.toLocaleString()} <span className="text-orange-500">ATK</span>
                                            </h2>
                                            <p className="text-slate-400 font-semibold text-sm">≈ $62.50 USD · Last topped up 3 days ago</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold rounded-2xl transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/20 text-sm tracking-wider uppercase cursor-pointer">
                                                Top Up Tokens
                                            </button>
                                            <button className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold rounded-2xl transition-all duration-300 active:scale-95 text-sm cursor-pointer">
                                                Withdraw
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                    {[
                                        { label: 'Total Spent', value: '3,800 ATK', sub: 'All campaigns' },
                                        { label: 'Locked in Escrow', value: `${Object.values(trackingMap).filter(t => t && t.stage !== "Pending" && t.stage !== "Paid").length * 500} ATK`, sub: `${Object.values(trackingMap).filter(t => t && t.stage !== "Pending" && t.stage !== "Paid").length} active jobs` },
                                        { label: 'Refunded', value: '200 ATK', sub: 'Past 30 days' },
                                        { label: 'Earned Rewards', value: '75 ATK', sub: 'Referral bonus' },
                                    ].map(({ label, value, sub }) => (
                                        <div key={label} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
                                            <p className="text-xl font-black text-white">{value}</p>
                                            <p className="text-[10px] text-slate-500 font-semibold">{sub}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Transaction History */}
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                                        <h3 className="font-black text-lg text-white tracking-wide">Transaction History</h3>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last 5 transactions</span>
                                    </div>
                                    <div className="space-y-3">
                                        {transactions.map((tx, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all duration-200">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${tx.isCredit ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                                        {tx.isCredit ? '+' : '−'}
                                                    </div>
                                                    <div>
                                                        <p className="font-extrabold text-sm text-white leading-tight">{tx.type}</p>
                                                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{tx.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-black text-sm ${tx.isCredit ? 'text-green-400' : 'text-orange-400'}`}>{tx.amount}</p>
                                                    <p className="text-[10px] text-slate-600 font-semibold mt-0.5">{tx.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>
                </main>
            </div>

            <Footer3 />

            {/* Slide-in Toast Alert Feedback */}
            {toastMessage && (
                <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3.5 bg-slate-900 text-white px-6 py-4.5 rounded-2xl shadow-2xl border border-slate-850 animate-[slideIn_0.3s_ease-out] max-w-md">
                    <svg className="w-5 h-5 text-orange-500 shrink-0 fill-orange-500/10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xs font-bold tracking-wide text-left">{toastMessage}</span>
                </div>
            )}
            
            {/* Custom keyframes injected via CSS to ensure smooth premium workspace transitions */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}