import { getDifficultyBadgeClass } from "../lib/utils";
function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
    return (
        <div className="h-full overflow-y-auto bg-base-100/50 backdrop-blur-sm custom-scrollbar">
            {/* HEADER SECTION */}
            <div className="p-6 md:p-8 bg-base-200/50 border-b border-base-content/10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-base-content to-base-content/70">{problem.title}</h1>
                    <span className={`badge border-0 font-bold px-4 py-1.5 shadow-sm ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-base-content/50 bg-base-300/80 px-2 py-1 rounded-md border border-base-content/5">
                        {problem.category}
                    </span>
                 </div>

                {/* Problem selector */}
                <div className="mt-2">
                    <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest mb-1.5 block">Select Problem</label>
                    <select
                        className="select select-bordered w-full bg-base-100/80 border-base-content/20 focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-medium text-base-content"
                        value={currentProblemId}
                        onChange={(e) => onProblemChange(e.target.value)}
                    >
                        {allProblems.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.title} - {p.difficulty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                {/* PROBLEM DESC */}
                <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                    <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                       Description
                    </h2>

                    <div className="space-y-4 text-base leading-relaxed">
                        <p className="text-base-content/80 text-[15px]">{problem.description.text}</p>
                        {problem.description.notes.map((note, idx) => (
                            <p key={idx} className="text-base-content/80 text-[15px] pl-4 border-l-2 border-secondary/30 italic">
                                {note}
                            </p>
                        ))}
                    </div>
                </div>

                {/* EXAMPLES SECTION */}
                <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                    <h2 className="text-xl font-bold mb-6 text-base-content flex items-center gap-2">
                       <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                       Examples
                    </h2>
                    <div className="space-y-6">
                        {problem.examples.map((example, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-base-300 text-xs font-bold text-base-content/70 group-hover:bg-secondary/20 group-hover:text-secondary transition-colors">{idx + 1}</div>
                                    <p className="font-bold text-base-content/90 tracking-wide">Example {idx + 1}</p>
                                </div>
                                <div className="bg-base-200/80 rounded-xl p-5 font-mono text-sm space-y-3 border border-base-content/5 shadow-inner">
                                    <div className="flex gap-3 items-start">
                                        <span className="text-primary font-bold min-w-[70px] select-none">Input:</span>
                                        <span className="text-base-content/90 break-all">{example.input}</span>
                                    </div>
                                    <div className="flex gap-3 items-start">
                                        <span className="text-secondary font-bold min-w-[70px] select-none">Output:</span>
                                        <span className="text-base-content/90 break-all">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="pt-3 border-t border-base-content/10 mt-3 flex gap-3 items-start">
                                            <span className="text-accent font-bold min-w-[70px] select-none">Notes:</span>
                                            <span className="text-base-content/70 font-sans text-sm">{example.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONSTRAINTS */}
                <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                    <h2 className="text-xl font-bold mb-5 text-base-content flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                        Constraints
                    </h2>
                    <ul className="space-y-3">
                        {problem.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-base-content/30 shrink-0"></div>
                                <code className="text-[13px] font-mono bg-base-200/80 text-base-content/80 px-3 py-1.5 rounded-lg border border-base-content/5 shadow-sm">{constraint}</code>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProblemDescription;