import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function Dashboard() {
 
  const [activePage, setActivePage] = useState("dashboard");
  const [showSellerPopup, setShowSellerPopup] = useState(false);

  const userRole = localStorage.getItem("userRole") || "individual";

  if (userRole === "business") {
    return (
      <div className="w-full min-h-screen grid grid-cols-[250px_minmax(0,1fr)] bg-[linear-gradient(135deg,#fff8f0,#ffffff,#ffe2bf)] text-[#241200] dark:bg-[linear-gradient(135deg,#120700,#1f0d00,#000000)] dark:text-white">
        <main className="w-full min-w-0 min-h-screen p-8 pb-[90px] max-[1000px]:p-5 max-[1000px]:pb-[90px] max-[650px]:p-4 max-[650px]:pb-[100px]">
          <h1 className="m-0 text-[34px] max-[650px]:text-[28px]">Business Dashboard</h1>
          <p>Business dashboard will be created later.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-[250px_minmax(0,1fr)] bg-[linear-gradient(135deg,#fff8f0,#ffffff,#ffe2bf)] text-[#241200] overflow-x-hidden max-[1000px]:grid-cols-1 dark:bg-[linear-gradient(135deg,#120700,#1f0d00,#000000)] dark:text-white">
      <aside className="h-screen sticky top-0 bg-white/75 border-r border-[#ffd1a1] p-6 flex flex-col justify-between overflow-y-auto max-[1000px]:hidden dark:bg-[#1a0d00] dark:border-white/10">
        <h2 className="m-0 mb-8 text-[#ff8a00]">I-COCKROACH</h2>

        <nav className="flex flex-col gap-2.5">
          {[
            ["dashboard", "Dashboard"],
            ["profile", "My Profile"],
            ["tasks", "Find Tasks"],
            ["pitches", "My Pitches"],
            ["work", "Active Work"],
            ["payments", "Payments"],
            ["messages", "Messages"],
            ["settings", "Settings"],
          ].map(([key, label]) => {
            const isActive = activePage === key;

            return (
              <button
                key={key}
                className={cx(
                  "border-0 px-3.5 py-[13px] rounded-[14px] text-left font-bold cursor-pointer",
                  isActive
                    ? "bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white"
                    : "bg-transparent text-[#7a5a37] hover:bg-[#ff8a00] hover:text-white dark:text-[#ffd6aa] dark:hover:bg-[linear-gradient(90deg,#ff8a00,#ffb347)] dark:hover:text-white"
                )}
                onClick={() => setActivePage(key)}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 bg-[#fff1df] p-3 rounded-[18px] dark:bg-[#2b1400] dark:text-white">
          <div className="w-[42px] h-[42px] bg-[linear-gradient(135deg,#ff8a00,#ffb347)] text-white font-black grid place-items-center rounded-full shrink-0">
            JA
          </div>
          <div>
            <h4 className="m-0">John</h4>
            <p className="m-0 text-xs text-[#7a5a37] dark:text-[#ffd6aa]">
              Student Freelancer
            </p>
          </div>
        </div>
      </aside>

      <main className="w-full min-w-0 min-h-screen p-8 pb-[90px] max-[1000px]:p-5 max-[1000px]:pb-[90px] max-[650px]:p-4 max-[650px]:pb-[100px]">
        {activePage === "dashboard" && <DashboardHome />}
        {activePage === "profile" && (
          <MyProfile
            showSellerPopup={showSellerPopup}
            setShowSellerPopup={setShowSellerPopup}
          />
        )}
        {activePage === "tasks" && <FindTasks />}
        {activePage === "pitches" && (
          <SimplePage title="My Pitches" text="Track pitch status and client responses." />
        )}
        {activePage === "work" && (
          <SimplePage title="Active Work" text="View ongoing work, milestones and deadlines." />
        )}
        {activePage === "payments" && (
          <SimplePage title="Payments" text="Track escrow, pending and released payments." />
        )}
        {activePage === "messages" && (
          <SimplePage title="Messages" text="Chat with clients and manage project communication." />
        )}
        {activePage === "settings" && <Settings />}
      </main>
    </div>
  );
}

const monthlyProjects = [
  { month: "Jan", completed: 4, accepted: 3 },
  { month: "Feb", completed: 6, accepted: 4 },
  { month: "Mar", completed: 5, accepted: 6 },
  { month: "Apr", completed: 9, accepted: 7 },
  { month: "May", completed: 8, accepted: 9 },
  { month: "Jun", completed: 11, accepted: 9 },
  { month: "Jul", completed: 12, accepted: 10 },
];

function DashboardHome() {
  const navigate = useNavigate();
  return (
    <>
      <button
    onClick={() =>
        navigate(-1)
    }
    className="
        px-5
        py-2
        rounded-xl
        bg-orange-500
        text-white
        font-bold
        mb-5
    "
>
    ← Back
</button>
      <Header title="Dashboard" text="Welcome back, John 👋">
        <button className="border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white max-[650px]:w-full">
          Find New Tasks
        </button>
      </Header>

      <section className="grid grid-cols-3 gap-4 mb-[22px] max-[1200px]:grid-cols-2 max-[650px]:grid-cols-1">
        <Stat dark title="Accepted Earnings" value="₹12,500" />
        <Stat title="Pending Amount" value="₹3,200" />
        <Stat title="Projects Done" value="28" />
      </section>

      <section className="grid grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)] gap-5 mb-[22px] max-[1200px]:grid-cols-1">
        <div className="bg-white/80 border border-[#ffd1a1] rounded-[28px] shadow-[0_20px_60px_rgba(255,138,0,0.12)] p-6 max-[650px]:rounded-[22px] max-[650px]:p-[18px] dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15 dark:shadow-[0_20px_60px_rgba(255,138,0,0.14)]">
          <div className="flex justify-between items-center gap-3 mb-4">
            <h3 className="m-0 dark:text-white">Your Performance vs Platform Average</h3>
            <span className="text-[#ff8a00] font-extrabold">Monthly Analytics</span>
          </div>

          <div className="w-full min-h-[280px] rounded-3xl bg-[linear-gradient(180deg,#ffffff,#fff8f0)] border border-[#ffd1a1] p-5 max-[650px]:min-h-[300px] max-[650px]:p-[18px_20px_28px] dark:bg-[linear-gradient(180deg,#1a0d00,#2b1400)] dark:border-white/15">
            <svg className="w-full h-[230px] overflow-visible" viewBox="0 0 700 260" preserveAspectRatio="none">
              <polyline points="40,185 140,145 240,165 340,95 440,115 540,65 660,40" fill="none" stroke="#ff8a00" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="40,205 140,190 240,150 340,140 440,95 540,100 660,70" fill="none" stroke="#ffc985" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

              {monthlyProjects.map((item, index) => {
                const xPoints = [40, 140, 240, 340, 440, 540, 660];
                const yourY = [185, 145, 165, 95, 115, 65, 40];
                const avgY = [205, 190, 150, 140, 95, 100, 70];

                return (
                  <g key={item.month}>
                    <g className="group">
                      <circle className="fill-[#ff8a00] opacity-0 cursor-pointer transition group-hover:opacity-100" cx={xPoints[index]} cy={yourY[index]} r="10" />
                      <foreignObject className="opacity-0 pointer-events-none transition group-hover:opacity-100" x={xPoints[index] - 55} y={yourY[index] - 78} width="130" height="68">
                        <div className="bg-white border border-[#ffd1a1] rounded-[14px] p-[9px_11px] shadow-[0_12px_30px_rgba(255,138,0,0.22)] text-[#241200] text-left flex flex-col gap-[3px] min-w-[115px] font-[Inter,system-ui,sans-serif] dark:bg-[#180b00] dark:text-white dark:border-white/15">
                          <strong className="text-[13px] text-[#ff8a00]">{item.month}</strong>
                          <span className="text-xs text-[#7a5a37] leading-[1.35] dark:text-[#ffd6aa]">You: {item.completed} projects</span>
                        </div>
                      </foreignObject>
                    </g>

                    <g className="group">
                      <circle className="fill-[#ffc985] opacity-0 cursor-pointer transition group-hover:opacity-100" cx={xPoints[index]} cy={avgY[index]} r="10" />
                      <foreignObject className="opacity-0 pointer-events-none transition group-hover:opacity-100" x={xPoints[index] - 55} y={avgY[index] - 78} width="145" height="68">
                        <div className="bg-white border border-[#ffd1a1] rounded-[14px] p-[9px_11px] shadow-[0_12px_30px_rgba(255,138,0,0.22)] text-[#241200] text-left flex flex-col gap-[3px] min-w-[115px] font-[Inter,system-ui,sans-serif] dark:bg-[#180b00] dark:text-white dark:border-white/15">
                          <strong className="text-[13px] text-[#ff8a00]">{item.month}</strong>
                          <span className="text-xs text-[#7a5a37] leading-[1.35] dark:text-[#ffd6aa]">Average: {item.accepted} projects</span>
                        </div>
                      </foreignObject>
                    </g>
                  </g>
                );
              })}
            </svg>

            <div className="grid grid-cols-7 text-[#7a5a37] text-sm text-center mt-2 px-2 dark:text-[#ffd6aa]">
              {monthlyProjects.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center bg-white/80 border border-[#ffd1a1] rounded-[28px] shadow-[0_20px_60px_rgba(255,138,0,0.12)] p-6 max-[650px]:rounded-[22px] max-[650px]:p-[18px] dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15">
          <div className="w-[110px] h-[110px] rounded-full grid place-items-center text-[54px] mx-auto mb-[18px] bg-[linear-gradient(135deg,#ffd700,#ff9f00)]">
            🏆
          </div>
          <h3 className="text-[26px] m-0 mb-2">Gold Badge</h3>
          <p className="text-[#7a5a37] leading-normal dark:text-[#ffd6aa]">
            Based on client reviews, delivery quality and completed projects.
          </p>

          <BadgeRow label="Client Rating" value="4.9/5" />
          <BadgeRow label="Successful Projects" value="28" />
          <BadgeRow label="On-time Delivery" value="96%" />
        </div>
      </section>

      <Panel>
        <div className="flex justify-between items-center gap-3 mb-4">
          <h3 className="m-0">Active Projects</h3>
          <button className="border-0 bg-transparent cursor-pointer text-[#ff8a00] font-extrabold">
            View all
          </button>
        </div>

        <ProjectRow heading client="Client" project="Project" budget="Budget" progress="Progress" />
        <ProjectRow client="Steven Terry" project="Landing Page" budget="₹5,000" progress="90%" />
        <ProjectRow client="Audrey Jones" project="Social Media Kit" budget="₹3,000" progress="50%" />
      </Panel>
    </>
  );
}

function Header({ title, text, children }) {
  return (
    <header className="flex justify-between items-center gap-5 mb-6 max-[650px]:flex-col max-[650px]:items-start">
      <div>
        <h1 className="m-0 text-[34px] max-[650px]:text-[28px] dark:text-white">{title}</h1>
        <p className="text-[#7a5a37] dark:text-[#ffd6aa]">{text}</p>
      </div>
      {children}
    </header>
  );
}

function Stat({ title, value, dark }) {
  return (
    <div className={cx(
      "p-[22px] bg-white/80 border border-[#ffd1a1] rounded-[28px] shadow-[0_20px_60px_rgba(255,138,0,0.12)] max-[650px]:rounded-[22px] max-[650px]:p-[18px]",
      dark
        ? "bg-[linear-gradient(135deg,#ff8a00,#ffb347)] text-white"
        : "dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15 dark:text-white"
    )}>
      <p className={cx("m-0 mb-2", dark ? "text-white" : "text-[#7a5a37] dark:text-[#ffd6aa]")}>{title}</p>
      <h2 className="m-0 text-3xl dark:text-white">{value}</h2>
    </div>
  );
}

function BadgeRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3 border-t border-[#ffd1a1] py-[13px] text-[#7a5a37] dark:border-white/15 dark:text-[#ffd6aa]">
      <span>{label}</span>
      <strong className="text-[#241200] dark:text-white">{value}</strong>
    </div>
  );
}

function ProjectRow({ heading, client, project, budget, progress }) {
  return (
    <div className={cx(
      "grid grid-cols-4 gap-3.5 py-3.5 border-b border-[#ffd1a1] max-[650px]:grid-cols-1 dark:border-white/15",
      heading && "text-[#7a5a37] font-extrabold dark:text-[#ffd6aa]"
    )}>
      <span>{client}</span>
      <span>{project}</span>
      <span>{budget}</span>
      <span>{progress}</span>
    </div>
  );
}

function Panel({ children }) {
  return (
    <section className="bg-white/80 border border-[#ffd1a1] rounded-[28px] shadow-[0_20px_60px_rgba(255,138,0,0.12)] p-6 max-[650px]:rounded-[22px] max-[650px]:p-[18px] dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15">
      {children}
    </section>
  );
}

function MyProfile({ showSellerPopup, setShowSellerPopup }) {
  const [verifyPopup, setVerifyPopup] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [collegeVerified, setCollegeVerified] = useState(false);

  return (
    <>
      <Header title="My Profile" text="Customize your freelancer profile.">
        <button className="border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white max-[650px]:w-full" onClick={() => setShowSellerPopup(true)}>
          Want to be a Seller?
        </button>
      </Header>

      <section className="bg-white/80 border border-[#ffd1a1] rounded-[28px] shadow-[0_20px_60px_rgba(255,138,0,0.12)] p-6 max-[650px]:rounded-[22px] max-[650px]:p-[18px] dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15">
        <div className="flex items-center gap-[18px] mb-[18px] max-[650px]:flex-col max-[650px]:items-start">
          <div className="w-[82px] h-[82px] text-[26px] bg-[linear-gradient(135deg,#ff8a00,#ffb347)] text-white font-black grid place-items-center rounded-full shrink-0">
            JA
          </div>

          <div>
            <h2 className="m-0">John Alan</h2>
            <p className="m-0 mt-1.5 text-[#7a5a37] dark:text-[#ffd6aa]">
              Frontend Developer • Digital Marketer • Student Freelancer
            </p>
            <span className="inline-block mt-2 bg-[#fff1df] text-[#ff8a00] px-2.5 py-1.5 rounded-full font-extrabold text-[13px]">
              Available for work
            </span>
          </div>

          <button className="bg-white text-[#ff8a00] border border-[#ffd1a1] rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap max-[650px]:w-full">
            Upload Picture
          </button>
        </div>

        <textarea className="w-full min-h-[90px] resize-y border border-[#ffd1a1] rounded-[18px] p-[15px] font-inherit text-[15px] outline-none mb-4 dark:bg-[#180b00] dark:text-white dark:border-white/15" defaultValue="I help small businesses build clean websites, social media creatives, automation workflows, and digital marketing systems." />

        <div className="grid grid-cols-4 gap-3 max-[1200px]:grid-cols-2 max-[650px]:grid-cols-1">
          <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" defaultValue="John Alan" />
          <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" defaultValue="Frontend Developer" />
          <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" defaultValue="New Delhi, India" />
          <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" defaultValue="₹300/hr" />
        </div>

        <button className="mt-[18px] border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white">
          Save Profile
        </button>
      </section>

      {showSellerPopup && (
        <SellerPopup
          setShowSellerPopup={setShowSellerPopup}
          setVerifyPopup={setVerifyPopup}
          emailVerified={emailVerified}
          mobileVerified={mobileVerified}
          collegeVerified={collegeVerified}
        />
      )}

      {verifyPopup && (
        <MiniPopup
          verifyPopup={verifyPopup}
          setVerifyPopup={setVerifyPopup}
          setEmailVerified={setEmailVerified}
          setMobileVerified={setMobileVerified}
          setCollegeVerified={setCollegeVerified}
        />
      )}
    </>
  );
}

function SellerPopup({
  setShowSellerPopup,
  setVerifyPopup,
  emailVerified,
  mobileVerified,
  collegeVerified
}) {
  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-[100] p-5">
      <div className="w-full max-w-[620px] bg-white/95 border border-[#ffd1a1] rounded-[28px] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] relative dark:bg-[#1a0d00] dark:text-white dark:border-white/15">
        <button className="absolute right-[18px] top-3.5 border-0 bg-transparent text-[32px] cursor-pointer text-[#ff8a00]" onClick={() => setShowSellerPopup(false)}>
          ×
        </button>

        <h2 className="m-0 mb-2">Become a Verified Seller</h2>
        <p className="text-[#7a5a37] mb-[22px] dark:text-[#ffd6aa]">
          Complete these checks to start pitching for paid business tasks.
        </p>

        <div className="flex flex-col gap-3.5">
          <Verification
            icon="📧"
            title="Email Verification"
            text="Verify your email address to secure your account (only valid college ID allowed)."
            btn={emailVerified ? "Verified" : "Verify"}
            verified={emailVerified}
            onClick={() => setVerifyPopup("email")}
          />

          <Verification
            icon="📱"
            title="Mobile Verification"
            text="Confirm your phone number for trusted communication."
            btn={mobileVerified ? "Verified" : "Verify"}
            verified={mobileVerified}
            onClick={() => setVerifyPopup("mobile")}
          />

          <Verification
            icon="🎓"
            title="College ID Verification"
            text="Upload your student ID to prove your student status."
            btn={collegeVerified ? "Verified" : "Upload"}
            verified={collegeVerified}
            onClick={() => setVerifyPopup("college")}
          />

          <Verification
            icon="💼"
            title="Skill Proof"
            text="Add portfolio links, GitHub, LinkedIn or sample work."
            btn="Add"
            onClick={() => setVerifyPopup("skill")}
          />
        </div>

        <button className="w-full mt-5 border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white">
          Submit Verification
        </button>
      </div>
    </div>
  );
}

function Verification({ icon, title, text, btn, onClick, verified }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 p-[15px] border border-[#ffd1a1] rounded-[18px] bg-[#fffaf5] max-[650px]:grid-cols-1 dark:bg-[#180b00] dark:border-white/15">
      <span className="text-[26px]">{icon}</span>
      <div>
        <h4 className="m-0">{title}</h4>
        <p className="m-0 mt-1 text-[#7a5a37] text-sm dark:text-[#ffd6aa]">{text}</p>
      </div>
      <button
        className={cx(
          "border-0 rounded-xl px-3.5 py-2.5 text-white font-extrabold cursor-pointer max-[650px]:w-full",
          verified ? "bg-green-500" : "bg-[linear-gradient(90deg,#ff8a00,#ffb347)]"
        )}
        onClick={onClick}
      >
        {btn}
      </button>
    </div>
  );
}

function MiniPopup({
  verifyPopup,
  setVerifyPopup,
  setEmailVerified,
  setMobileVerified,
  setCollegeVerified
}) {

  const [emailMessage, setEmailMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-[120] p-5">
      <div className="w-full max-w-[460px] bg-white border border-[#ffd1a1] rounded-3xl p-7 relative shadow-[0_30px_80px_rgba(0,0,0,0.25)] dark:bg-[#1a0d00] dark:text-white dark:border-white/15">

        <button
          className="absolute right-[18px] top-3.5 border-0 bg-transparent text-[32px] cursor-pointer text-[#ff8a00]"
          onClick={() => setVerifyPopup(null)}
        >
          ×
        </button>

        {verifyPopup === "email" && (
          <>
            <h2 className="m-0 mb-2">
              Email Verification
            </h2>

            <p className="text-[#7a5a37] mb-[18px] dark:text-[#ffd6aa]">
              Enter your email address for verification.
            </p>

            <input
              id="edu-email-input"
              className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15"
              type="email"
              placeholder="Enter your email"
            />

            <button
              className="w-full border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white mb-3"
              onClick={async () => {

                try {

                  const email =
                    document.getElementById(
                      "edu-email-input"
                    ).value.trim();

                  const allowedDomains = [
                    ".edu",
                    ".ac.in",
                    ".edu.in"
                  ];

                  const validEducational =
                    allowedDomains.some(
                      (domain) =>
                        email.endsWith(domain)
                    );

                  if (!validEducational) {

                    setEmailMessage(
                      "Only educational emails are allowed"
                    );

                    return;
                  }

                  const response =
                    await fetch(
                      `http://localhost:8080/auth/send-otp?email=${email}`
                    );

                  const data =
                    await response.text();

                  setEmailMessage(data);

                } catch (error) {

                  console.error(error);

                  setEmailMessage(
                    "Failed to send OTP"
                  );

                }

              }}
            >
              Send Verification Link
            </button>

            <input
              id="otp-input"
              className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15"
              type="text"
              placeholder="Enter OTP"
            />

            <button
              className="w-full border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white"
              onClick={async () => {

                try {

                  const email =
                    document.getElementById(
                      "edu-email-input"
                    ).value;

                  const otp =
                    document.getElementById(
                      "otp-input"
                    ).value;

                  const response =
                    await fetch(
                      `http://localhost:8080/auth/verify-otp?email=${email}&otp=${otp}`
                    );

                  const data =
                    await response.text();

                  if (
                    data ===
                    "OTP VERIFIED"
                  ) {

                    setEmailVerified(
                      true
                    );

                    setVerifyPopup(
                      null
                    );

                  } else {

                    setEmailMessage(
                      "Invalid OTP"
                    );

                  }

                } catch (error) {

                  console.error(
                    error
                  );

                  setEmailMessage(
                    "Verification failed"
                  );

                }

              }}
            >
              Verify OTP
            </button>

            {emailMessage && (
              <p className="mt-3 text-red-500 font-bold text-sm">
                {emailMessage}
              </p>
            )}

          </>
        )}

        {verifyPopup === "mobile" && (
          <>
            <h2 className="m-0 mb-2">
              Mobile Verification
            </h2>

            <p className="text-[#7a5a37] mb-[18px] dark:text-[#ffd6aa]">
              Enter your mobile number to receive an OTP.
            </p>

            <input
              className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15"
              type="tel"
              placeholder="Enter mobile number"
            />

            <button
  className="
    w-full
    border-0
    rounded-[14px]
    px-[18px]
    py-3
    font-extrabold
    cursor-pointer
    text-white
    bg-green-500
  "
  onClick={() => {

    setMobileVerified(
      true
    );

    setVerifyPopup(
      null
    );

  }}
>
  Verified
</button>
          </>
        )}

        {verifyPopup === "college" && (
          <>
            <h2 className="m-0 mb-2">
              College ID Verification
            </h2>

            <p className="text-[#7a5a37] mb-[18px] dark:text-[#ffd6aa]">
              Upload your college ID card for student verification.
            </p>

            <input
              id="college-id-file"
              className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15"
              type="file"
              accept="image/*,.pdf"
            />

            <button
              className="w-full border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white"
              onClick={async () => {

                try {

                  const fileInput =
                    document.getElementById(
                      "college-id-file"
                    );

                  const file =
                    fileInput.files[0];

                  if (!file) {

                    alert(
                      "Please select a file first"
                    );

                    return;

                  }

                  const formData =
                    new FormData();

                  formData.append(
                    "file",
                    file
                  );

                  const response =
                    await fetch(
                      "http://localhost:8080/api/ocr",
                      {
                        method: "POST",
                        body: formData,
                      }
                    );

                  const data =
                    await response.text();

                  if (data === "true") {

                    setCollegeVerified(
                      true
                    );

                    alert(
                      "College ID Verified"
                    );

                  } else {

                    alert(
                      "Invalid College ID"
                    );

                  }

                  setVerifyPopup(
                    null
                  );

                } catch (error) {

                  console.error(error);

                  alert(
                    "Upload failed"
                  );

                }

              }}
            >
              Upload ID
            </button>
          </>
        )}

        {verifyPopup === "skill" && (
          <>
            <h2 className="m-0 mb-2">Skill Proof</h2>
            <p className="text-[#7a5a37] mb-[18px] dark:text-[#ffd6aa]">Add your GitHub and LinkedIn profile links.</p>
            <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" type="url" placeholder="GitHub URL" />
            <input className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] mb-3.5 outline-none dark:bg-[#180b00] dark:text-white dark:border-white/15" type="url" placeholder="LinkedIn URL" />
            <button className="w-full border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white">Submit Links</button>
          </>
        )}
      </div>
    </div>
  );
}

function FindTasks() {
  return (
    <>
      <Header title="Find Tasks" text="Browse digital tasks posted by businesses." />

      <div className="grid grid-cols-3 gap-5 max-[1200px]:grid-cols-1 max-[650px]:grid-cols-1">
        <Task title="Instagram Poster Design" budget="₹1,500" />
        <Task title="Landing Page for Boutique" budget="₹5,000" />
        <Task title="WhatsApp Automation Setup" budget="₹3,000" />
      </div>
    </>
  );
}

function Task({ title, budget }) {
  return (
    <div className="border border-[#ffd1a1] rounded-[20px] p-4 bg-[#fffaf5] dark:bg-[#180b00] dark:border-white/15">
      <h4 className="m-0">{title}</h4>
      <p className="m-0 my-1.5 text-[#7a5a37] dark:text-[#ffd6aa]">Client needs fast digital execution.</p>
      <span className="block font-extrabold mb-3">Budget: {budget}</span>
      <button className="border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white">
        Pitch Now
      </button>
    </div>
  );
}

function SimplePage({ title, text }) {
  return (
    <>
      <Header title={title} text={text} />
      <Panel>
        <h3>{title}</h3>
        <p className="text-[#7a5a37] dark:text-[#ffd6aa]">This section can be expanded with backend data later.</p>
      </Panel>
    </>
  );
}

function Settings() {
  return (
    <>
      <Header title="Settings" text="Manage account, privacy, visibility and preferences." />

      <section className="grid grid-cols-2 gap-5 max-[800px]:grid-cols-1">
        <SettingsCard title="Profile Visibility" text="Control who can discover your freelancer profile.">
          <select className="w-full p-[13px] rounded-[14px] border border-[#ffd1a1] outline-none font-inherit dark:bg-[#180b00] dark:text-white dark:border-white/15">
            <option>Public - visible to all businesses</option>
            <option>Limited - visible only after pitching</option>
            <option>Private - hidden from search</option>
          </select>
        </SettingsCard>

        <SettingsCard title="Privacy Settings" text="Choose what personal information clients can view.">
          <Check label="Show location" checked />
          <Check label="Show earnings range" checked />
          <Check label="Show online status" />
        </SettingsCard>

        <SettingsCard title="Experience Level" text="Set your skill level so businesses can match tasks properly.">
          <div className="flex flex-col gap-3">
            <Experience label="Entry" text="Best for beginners building their first portfolio." />
            <Experience label="Intermediate" text="Good for users with some completed projects." checked />
            <Experience label="Expert" text="For highly skilled users with strong client reviews." />
          </div>
        </SettingsCard>

        <SettingsCard danger title="Account Control" text="Temporarily disable or permanently delete your account.">
          <div className="flex flex-wrap items-center gap-3 max-[800px]:flex-col max-[800px]:items-stretch">
            <button className="bg-white text-[#ff8a00] border border-[#ffd1a1] rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer whitespace-nowrap max-[650px]:w-full">
              Temporarily Disable Account
            </button>
            <button className="border-0 rounded-[14px] px-[18px] py-3 font-extrabold cursor-pointer bg-[#ff4d4d] text-white max-[800px]:w-full">
              Delete Account
            </button>
          </div>
        </SettingsCard>
      </section>
    </>
  );
}

function SettingsCard({ title, text, children, danger }) {
  return (
    <div className={cx(
      "bg-white/80 border border-[#ffd1a1] rounded-[28px] p-6 shadow-[0_20px_60px_rgba(255,138,0,0.12)] dark:bg-[rgba(36,19,0,0.92)] dark:border-white/15",
      danger && "border-[#ffb4b4]"
    )}>
      <h3 className="m-0 mb-2 dark:text-white">{title}</h3>
      <p className="text-[#7a5a37] m-0 mb-[18px] leading-normal dark:text-[#ffd6aa]">{text}</p>
      {children}
    </div>
  );
}

function Check({ label, checked }) {
  return (
    <label className="flex items-center gap-2.5 mb-3 text-[#241200] font-bold dark:text-[#ffd6aa]">
      <input type="checkbox" defaultChecked={checked} />
      {label}
    </label>
  );
}

function Experience({ label, text, checked }) {
  return (
    <label className="flex items-start gap-2.5 mb-0 text-[#241200] font-bold bg-[#fffaf5] border border-[#ffd1a1] rounded-2xl p-3.5 dark:bg-[#180b00] dark:text-[#ffd6aa] dark:border-white/15">
      <input type="radio" name="experience" defaultChecked={checked} />
      <div>
        <strong>{label}</strong>
        <span className="block text-[#7a5a37] text-[13px] mt-1 font-medium dark:text-[#ffd6aa]">
          {text}
        </span>
      </div>
    </label>
  );
}