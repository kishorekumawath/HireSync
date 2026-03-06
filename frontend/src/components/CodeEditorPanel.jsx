import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, CodeIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
    selectedLanguage,
    code,
    isRunning,
    onLanguageChange,
    onCodeChange,
    onRunCode,
}) {
    return (
        <div className="h-full bg-base-300/80 flex flex-col relative overflow-hidden group/editor">
            {/* Editor Top Bar - Glassmorphism */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-base-100/50 backdrop-blur-md border-b border-base-content/10 z-10 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-base-200/50 px-3 py-1.5 rounded-lg border border-base-content/5 shadow-inner">
                        <img
                            src={LANGUAGE_CONFIG[selectedLanguage].icon}
                            alt={LANGUAGE_CONFIG[selectedLanguage].name}
                            className="w-5 h-5 object-contain"
                        />
                        <select 
                            className="bg-transparent text-sm font-semibold text-base-content focus:outline-none cursor-pointer tracking-wide appearance-none pr-4" 
                            value={selectedLanguage} 
                            onChange={onLanguageChange}
                        >
                            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                                <option key={key} value={key} className="bg-base-200">
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button 
                    className="group relative px-6 py-2 bg-base-300 text-base-content font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all border border-base-content/10 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={isRunning} 
                    onClick={onRunCode}
                >
                    <div className="absolute inset-0 bg-linear-to-r from-primary to-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    {isRunning ? (
                        <>
                            <Loader2Icon className="size-4 animate-spin relative z-10 group-hover:text-primary-content transition-colors" />
                            <span className="relative z-10 group-hover:text-primary-content transition-colors text-sm">Running...</span>
                        </>
                    ) : (
                        <>
                            <PlayIcon className="size-4 relative z-10 group-hover:text-primary-content transition-colors fill-current" />
                            <span className="relative z-10 group-hover:text-primary-content transition-colors text-sm tracking-wide">Run Code</span>
                            
                            {/* Glow effect on hover */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </>
                    )}
                </button>
            </div>

            <div className="flex-1 relative">
                {/* Subtle inset shadow to embed the editor nicely */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10"></div>
                <Editor
                    height={"100%"}
                    language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
                    value={code}
                    onChange={onCodeChange}
                    theme="vs-dark"
                    options={{
                        fontSize: 15,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        minimap: { enabled: false },
                        padding: { top: 20, bottom: 20 },
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        fontLigatures: true,
                        renderLineHighlight: "all",
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        }
                    }}
                    className="pt-2"
                />
            </div>
        </div>
    );
}
export default CodeEditorPanel;