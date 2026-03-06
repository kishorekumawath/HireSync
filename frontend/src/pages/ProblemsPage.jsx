import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon, SparklesIcon, TargetIcon, ZapIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
    const problems = Object.values(PROBLEMS);

    const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
    const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
    const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

    return (
        <div className="min-h-screen bg-base-300 relative overflow-hidden transition-colors duration-500 flex flex-col">
            {/* DYNAMIC BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full animate-pulse blur-3xl" />
                <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-secondary/10 rounded-full animate-pulse delay-700 blur-3xl" />
                <div className="absolute bottom-[5%] left-[30%] w-[50%] h-[30%] bg-accent/10 rounded-full animate-pulse delay-1000 blur-3xl" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <Navbar />

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 flex-1 w-full flex flex-col">
                {/* HEADER SECTION */}
                <div className="mb-12 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-base-100/50 backdrop-blur-md border border-base-content/10 text-primary text-sm font-semibold mb-6 shadow-sm">
                        <TargetIcon className="size-4" />
                        Algorithm Library
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-base-content">
                        Practice <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Problems</span>
                    </h1>
                    <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
                        Sharpen your coding skills with these curated challenges designed to test your logic and optimization abilities.
                    </p>
                </div>

                {/* STATS HERO GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up [animation-delay:100ms]">
                    <div className="bg-base-100/40 backdrop-blur-xl border border-base-content/10 p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-base-100/60 transition-colors shadow-lg">
                        <div className="text-3xl font-black text-base-content mb-1">{problems.length}</div>
                        <div className="text-sm font-medium text-base-content/50 uppercase tracking-wider">Total</div>
                    </div>
                    <div className="relative overflow-hidden group bg-base-100/40 hover:bg-success/5 backdrop-blur-xl border border-success/20 p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-success/20">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-2xl group-hover:bg-success/20 transition-colors"></div>
                        <div className="text-3xl font-black text-success mb-1 relative z-10">{easyProblemsCount}</div>
                        <div className="text-sm font-medium text-success/70 uppercase tracking-wider relative z-10">Easy</div>
                    </div>
                    <div className="relative overflow-hidden group bg-base-100/40 hover:bg-warning/5 backdrop-blur-xl border border-warning/20 p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-warning/20">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-full blur-2xl group-hover:bg-warning/20 transition-colors"></div>
                        <div className="text-3xl font-black text-warning mb-1 relative z-10">{mediumProblemsCount}</div>
                        <div className="text-sm font-medium text-warning/70 uppercase tracking-wider relative z-10">Medium</div>
                    </div>
                    <div className="relative overflow-hidden group bg-base-100/40 hover:bg-error/5 backdrop-blur-xl border border-error/20 p-6 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-error/20">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-error/10 rounded-full blur-2xl group-hover:bg-error/20 transition-colors"></div>
                        <div className="text-3xl font-black text-error mb-1 relative z-10">{hardProblemsCount}</div>
                        <div className="text-sm font-medium text-error/70 uppercase tracking-wider relative z-10">Hard</div>
                    </div>
                </div>

                {/* PROBLEMS LIST */}
                <div className="grid gap-4 animate-fade-in-up [animation-delay:200ms]">
                    {problems.map((problem, index) => (
                        <Link
                            key={problem.id}
                            to={`/problem/${problem.id}`}
                            className="group block relative bg-base-100/50 backdrop-blur-xl border border-base-content/10 rounded-2xl p-6 hover:bg-base-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
                            style={{ animationDelay: `${200 + index * 50}ms` }}
                        >
                            {/* Hover Gradient Background */}
                             <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                {/* LEFT SIDE */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-4">
                                        <div className="hidden sm:flex mt-1 size-12 rounded-xl bg-base-200 border border-base-content/10 items-center justify-center group-hover:scale-110 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300 shrink-0 shadow-inner">
                                            <Code2Icon className="size-6 text-base-content/60 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors truncate">
                                                    {problem.title}
                                                </h2>
                                                <span className={`badge border-0 font-semibold px-3 py-1 ${getDifficultyBadgeClass(problem.difficulty)} shadow-sm`}>
                                                    {problem.difficulty}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-mono uppercase tracking-wider text-base-content/50 bg-base-200/50 px-2 py-0.5 rounded-md border border-base-content/5">
                                                    {problem.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed max-w-3xl group-hover:text-base-content/80 transition-colors">
                                                {problem.description.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* RIGHT SIDE - CTA */}
                                <div className="sm:self-center shrink-0 flex justify-end mt-2 sm:mt-0">
                                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-base-200 text-base-content font-medium group-hover:bg-primary group-hover:text-primary-content transition-all duration-300 shadow-sm border border-base-content/5 group-hover:border-primary/50">
                                        <span>Solve Problem</span>
                                        <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
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
            `}} />
        </div>
    );
}

export default ProblemsPage;