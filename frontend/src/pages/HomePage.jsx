import { Link } from "react-router";
import {
    ArrowRightIcon,
    CheckIcon,
    Code2Icon,
    SparklesIcon,
    UsersIcon,
    VideoIcon,
    ZapIcon,
    BotIcon,
    CpuIcon,
    NetworkIcon
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
    return (
        <div className="min-h-screen bg-base-300 relative overflow-hidden transition-colors duration-500">
            {/* DYNAMIC BACKGROUND EFFECTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full animate-pulse blur-3xl" />
                <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-secondary/20 rounded-full animate-pulse delay-700 blur-3xl" />
                <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[40%] bg-accent/20 rounded-full animate-pulse delay-1000 blur-3xl" />
                {/* Subtle Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            {/* NAVBAR */}
            <nav className="relative z-50  border-b border-base-content/10 bg-base-100/40 backdrop-blur-xl supports-backdrop-filter:bg-base-100/40 shadow-2xl transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* LOGO */}
                    <Link
                        to={"/"}
                        className="flex items-center gap-3 group"
                    >
                        <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                            <SparklesIcon className="size-5 text-primary-content transition-transform group-hover:scale-110" />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-black text-xl tracking-wider text-base-content group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                HireSync
                            </span>
                            <span className="text-[10px] text-base-content/50 font-medium -mt-1 uppercase tracking-widest group-hover:text-primary transition-colors">Code Together</span>
                        </div>
                    </Link>

                    {/* AUTH BTN */}
                    <SignInButton mode="modal">
                        <button className="group relative px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex items-center gap-2 border border-base-content/10 bg-base-100/50 backdrop-blur-md">
                            <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 group-hover:text-primary-content transition-colors duration-300 text-base-content flex items-center gap-2">
                              Sign In
                              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </SignInButton>
                </div>
            </nav>

            {/* HERO SECTION */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pt-12 pb-24 lg:pt-24 lg:pb-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    {/* LEFT CONTENT */}
                    <div className="space-y-8 lg:pr-8">
                        {/* Eyebrow badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium shadow-[0_0_15px_rgba(var(--color-primary),0.2)] hover:shadow-[0_0_25px_rgba(var(--color-primary),0.4)] transition-shadow cursor-default animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Real-time Collab 2.0
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-base-content animate-fade-in-up [animation-delay:100ms]">
                            Code Interviews,
                            <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent animate-gradient bg-size-[200%_auto]">
                                Reimagined.
                            </span>
                        </h1>

                        <p className="text-lg lg:text-xl text-base-content/70 leading-relaxed max-w-lg font-medium animate-fade-in-up [animation-delay:200ms]">
                            The unified platform for collaborative coding and technical assessments. Connect instantly, code seamlessly, and hire (or get hired) faster.
                        </p>

                        {/* FEATURE PILLS */}
                        <div className="flex flex-wrap gap-3 animate-fade-in-up [animation-delay:300ms]">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-100/50 backdrop-blur-sm border border-base-content/10 shadow-sm hover:border-primary/50 transition-colors">
                                <VideoIcon className="size-4 text-secondary" />
                                <span className="text-sm font-medium">HD Video</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-100/50 backdrop-blur-sm border border-base-content/10 shadow-sm hover:border-primary/50 transition-colors">
                                <Code2Icon className="size-4 text-primary" />
                                <span className="text-sm font-medium">Live IDE</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-100/50 backdrop-blur-sm border border-base-content/10 shadow-sm hover:border-primary/50 transition-colors">
                                <NetworkIcon className="size-4 text-accent" />
                                <span className="text-sm font-medium">P2P Chat</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-5 pt-4 animate-fade-in-up [animation-delay:400ms]">
                            <SignInButton mode="modal">
                                <button className="group relative px-8 py-4 bg-linear-to-r from-primary to-secondary rounded-2xl text-primary-content font-bold text-lg shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)] hover:shadow-[0_0_45px_-5px_rgba(var(--color-primary),0.7)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 overflow-hidden">
                                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                                    <span className="relative z-10 flex items-center gap-2">
                                        Start Session
                                        <ArrowRightIcon className="size-5 group-hover:translate-x-1.5 transition-transform" />
                                    </span>
                                </button>
                            </SignInButton>
                        </div>
                    </div>

                    {/* RIGHT IMAGE - Hero Graphic */}
                    <div className="relative animate-fade-in-up [animation-delay:300ms]">
                         {/* Decorative background glows behind image */}
                        <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-accent/30 blur-3xl rounded-full scale-110 opacity-70 animate-pulse"></div>
                        
                        <div className="relative rounded-3xl p-2 bg-linear-to-br from-base-100/80 to-base-300/80 backdrop-blur-xl border border-base-content/10 shadow-2xl hover:shadow-primary/20 transition-all duration-500 ease-in-out hover:-translate-y-2 group">
                             {/* Browser Chrome mockup */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-base-200/50 rounded-t-2xl border-b border-base-content/10">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-error/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-success/80"></div>
                                </div>
                               
                            </div>
                            <img
                                src="/hero.png"
                                alt="HireSync IDE Platform"
                                className="w-full h-auto rounded-b-2xl object-cover border-t border-base-content/5 filter group-hover:contrast-110 transition-all duration-500"
                            />
                            
                            {/* Floating floating UI element */}
                            <div className="absolute -bottom-6 -left-6 bg-base-100/90 backdrop-blur-xl border border-base-content/10 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                                    <CheckIcon className="size-6 text-success" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-base-content">Compilation Successful</p>
                                    <p className="text-xs text-base-content/60 font-mono">0.42s latency</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* LOGO MARQUEE / STATS (Optional addition for aesthetics) */}
            <div className="relative z-10 border-y border-base-content/5 bg-base-100/30 backdrop-blur-md py-8">
                 <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
                    <div className="space-y-1 hover:scale-105 transition-transform">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">15+</div>
                        <div className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Languages</div>
                    </div>
                     <div className="hidden md:block w-px h-12 bg-base-content/10"></div>
                    <div className="space-y-1 hover:scale-105 transition-transform">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent">0</div>
                        <div className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Friction</div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-base-content/10"></div>
                    <div className="space-y-1 hover:scale-105 transition-transform">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-accent to-primary">∞</div>
                        <div className="text-sm font-medium text-base-content/60 uppercase tracking-widest">Collab Potential</div>
                    </div>
                 </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-32">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3 animate-fade-in-up">The Toolkit</h2>
                    <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-base-content animate-fade-in-up [animation-delay:100ms]">
                        Built for <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Engineers</span>
                    </h3>
                    <p className="text-lg text-base-content/60 leading-relaxed animate-fade-in-up [animation-delay:200ms]">
                        We stripped away the noise so you can focus on what matters: the code. Everything required for a technical deep-dive is native to the platform.
                    </p>
                </div>

                {/* FEATURES GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <SignInButton mode="modal">
                    <div className="group relative bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-3xl p-8 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden cursor-pointer text-left h-full">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="size-14 bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                <VideoIcon className="size-6 text-primary" />
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-base-content group-hover:text-primary transition-colors">Integrated Video</h4>
                            <p className="text-base-content/60 leading-relaxed">
                                Never drop a Zoom link again. Crisp, low-latency WebRTC video and audio built directly into the IDE.
                            </p>
                        </div>
                    </div>
                    </SignInButton>

                    {/* Feature 2 */}
                    <SignInButton mode="modal">
                    <div className="group relative bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-3xl p-8 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/20 overflow-hidden cursor-pointer text-left h-full">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="size-14 bg-linear-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                <Code2Icon className="size-6 text-secondary" />
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-base-content group-hover:text-secondary transition-colors">Piston-Powered IDE</h4>
                            <p className="text-base-content/60 leading-relaxed">
                                Monaco editor under the hood with immediate compilation. Write, run, and debug in a secure sandboxed environment.
                            </p>
                        </div>
                    </div>
                    </SignInButton>

                    {/* Feature 3 */}
                    <SignInButton mode="modal">
                    <div className="group relative bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-3xl p-8 hover:bg-base-100/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 overflow-hidden cursor-pointer text-left h-full">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors"></div>
                        <div className="relative z-10">
                            <div className="size-14 bg-linear-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                <BotIcon className="size-6 text-accent" />
                            </div>
                            <h4 className="text-2xl font-bold mb-3 text-base-content group-hover:text-accent transition-colors">Curated Problems</h4>
                            <p className="text-base-content/60 leading-relaxed">
                                Access a built-in library of common algorithmic questions with predefined constraints and edge-case examples.
                            </p>
                        </div>
                    </div>
                    </SignInButton>
                </div>
            </div>

             {/* GLOBALS FOR ANIMATIONS */}
             <style dangerouslySetInnerHTML={{__html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient-x 8s ease infinite;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}} />
        </div>
    );
}

export default HomePage;