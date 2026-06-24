import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPopup({
    showLogin,
    setShowLogin,
    onAuthenticate,
    onSocialLogin,
}) {
    const navigate = useNavigate();
    const [role, setRole] = useState("business");
    const [theme, setTheme] = useState("light");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const mockAuth = ({ email, password, role }) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    resolve({ user: { email, role } });
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 700);
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim()) {
            return setError("Please enter your email.");
        }

        if (!password) {
            return setError("Please enter your password.");
        }

        setLoading(true);

        try {

            const authFn = onAuthenticate || mockAuth;

            const result = await authFn({
                email: email.trim(),
                password,
                remember,
                role,
            });

            console.log(result);

            setShowLogin(false);

            localStorage.setItem("userRole", role);

            // Redirect based on selected role
            if (role === "student" || role === "individual") {
                navigate("/common");
            } else if (role === "business") {
                navigate("/business");
            }

        } catch (err) {

            setError(err.message || "Login failed.");

        } finally {

            setLoading(false);

        }
    };

    const handleSocial = async (provider) => {

        setLoading(true);

        try {

            const socialFn =
                onSocialLogin ||
                ((p) => Promise.resolve({ provider: p }));

            await socialFn(provider);

            setShowLogin(false);

        } catch (err) {

            setError(err.message || "Social login failed.");

        } finally {

            setLoading(false);

        }
    };

    if (!showLogin) return null;

    return (
        <div
            className={`
      min-h-screen w-full flex items-center justify-center
      px-10 py-6 transition-all duration-300
      ${theme === "light"
                    ? "bg-[linear-gradient(135deg,#fff8f0,#ffffff,#ffe2bf)] text-[#241200]"
                    : "bg-[linear-gradient(135deg,#1a0d00,#2b1400,#000000)] text-white"
                }
    `}
        >
            <div className="w-full max-w-[1280px] min-h-[88vh] grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

                {/* LEFT SIDE */}
                <section className="flex flex-col justify-center px-6">
                    <div className="w-max bg-[#ff8a00] text-white px-5 py-2 rounded-full text-sm font-bold mb-8">
                        Hyperlocal Digital Execution Marketplace
                    </div>

                    <h1 className="text-[56px] md:text-[72px] leading-none font-extrabold tracking-[-2px]">
                        I-COCKROACH
                    </h1>

                    <p className="mt-6 max-w-[650px] text-[22px] leading-[1.55] opacity-80">
                        A verified platform where businesses post digital tasks and skilled students
                        pitch, complete, track, and get paid securely.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-5 max-w-[700px]">
                        {["AI job matching", "Escrow payments", "Student pitches", "Task tracking"].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="
                  bg-[rgba(255,138,0,0.12)]
                  border border-[rgba(255,138,0,0.25)]
                  rounded-[18px]
                  px-6 py-5
                  text-[22px]
                  font-extrabold
                "
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>
                </section>

                {/* RIGHT CARD */}
                <section
                    className={`
          w-full max-w-[560px] justify-self-end
          rounded-[28px] p-8
          border backdrop-blur-[18px]
          shadow-[0_24px_70px_rgba(255,138,0,0.18)]
          ${theme === "light"
                            ? "bg-white/80 border-[#ffd1a1]"
                            : "bg-[rgba(36,19,0,0.82)] border-white/10"
                        }
        `}
                >
                    <div className="flex items-start justify-between gap-5 mb-7">
                        <div>
                            <h2 className="text-[36px] font-extrabold leading-none">
                                Welcome back
                            </h2>
                            <p
                                className={`mt-3 text-xl ${theme === "light" ? "text-[#7a5a37]" : "text-[#ffd6aa]"
                                    }`}
                            >
                                Sign in to continue
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setTheme((current) => (current === "light" ? "dark" : "light"))
                            }
                            className={`
              flex items-center gap-1 w-[82px] p-[6px] rounded-full border
              ${theme === "light"
                                    ? "bg-[#fff7ef] border-[#ffd1a1]"
                                    : "bg-[#1d0d00] border-white/15"
                                }
            `}
                        >
                            <span
                                className={`w-8 h-8 grid place-items-center rounded-full ${theme === "dark" ? "bg-[#ff8a00] opacity-100" : "opacity-45"
                                    }`}
                            >
                                🌙
                            </span>
                            <span
                                className={`w-8 h-8 grid place-items-center rounded-full ${theme === "light" ? "bg-[#ff8a00] opacity-100" : "opacity-45"
                                    }`}
                            >
                                ☀️
                            </span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">
                        <div className="grid grid-cols-2 gap-[10px]">
                            {["business", "individual"].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={`
                  py-3 rounded-[14px] border font-extrabold capitalize
                  ${role === r
                                            ? "bg-[linear-gradient(90deg,#ff8a00,#ffb347)] text-white border-[#ff8a00]"
                                            : theme === "light"
                                                ? "bg-white text-[#e86f00] border-[#ffd1a1]"
                                                : "bg-[#180b00] text-[#ffb347] border-white/10"
                                        }
                `}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>

                        <label className="flex flex-col gap-2 text-sm font-bold">
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="owner@business.com"
                                className={`
                w-full px-4 py-[13px] rounded-[14px] border outline-none text-[15px]
                focus:border-[#ff8a00] focus:ring-4 focus:ring-orange-200/60
                ${theme === "light"
                                        ? "bg-white text-[#241200] border-[#ffd1a1]"
                                        : "bg-[#180b00] text-white border-white/10"
                                    }
              `}
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-bold">
                            Password
                            <div className="flex items-center gap-2">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`
                  flex-1 px-4 py-[13px] rounded-[14px] border outline-none text-[15px]
                  focus:border-[#ff8a00] focus:ring-4 focus:ring-orange-200/60
                  ${theme === "light"
                                            ? "bg-white text-[#241200] border-[#ffd1a1]"
                                            : "bg-[#180b00] text-white border-white/10"
                                        }
                `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="text-[#ff8a00] font-bold"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </label>

                        <div className="flex items-center justify-between gap-3">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                Remember me
                            </label>

                            <button type="button" className="text-[#ff8a00] font-bold">
                                Forgot?
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
              mt-1 py-4 rounded-2xl border-0
              bg-[linear-gradient(90deg,#ff8a00,#ffb347)]
              text-white font-black
              shadow-[0_14px_28px_rgba(255,138,0,0.25)]
              disabled:opacity-60
            "
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div
                        className={`flex items-center gap-3 my-[18px] text-sm ${theme === "light" ? "text-[#7a5a37]" : "text-[#ffd6aa]"
                            }`}
                    >
                        <div className="h-px flex-1 bg-[#ffd1a1]" />
                        <span>Or continue with</span>
                        <div className="h-px flex-1 bg-[#ffd1a1]" />
                    </div>

                    <div className="grid grid-cols-3 gap-[10px]">
                        {["Google", "GitHub", "LinkedIn"].map((p) => (
                            <button
                                key={p}
                                onClick={() => handleSocial(p.toLowerCase())}
                                className={`
                py-[10px] rounded-[13px] border font-extrabold
                ${theme === "light"
                                        ? "bg-white text-[#e86f00] border-[#ffd1a1]"
                                        : "bg-[#180b00] text-[#ffb347] border-white/10"
                                    }
              `}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="mt-[18px] flex justify-center gap-2 text-sm">
                        Don&apos;t have an account?
                        <button className="text-[#ff8a00] font-extrabold">
                            Create account
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}