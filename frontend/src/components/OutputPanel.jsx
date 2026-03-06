import { TerminalIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";

function OutputPanel({ output }) {
    return (
        <div className="h-full bg-base-300/90 flex flex-col relative overflow-hidden">
            {/* Terminal Header */}
            <div className="px-5 py-3 bg-base-100/50 backdrop-blur-md border-b border-t border-base-content/10 flex items-center justify-between z-10 transition-colors">
                <div className="flex items-center gap-2.5">
                    <TerminalIcon className="size-4 text-base-content/60" />
                    <span className="font-bold text-sm tracking-wide text-base-content/80 uppercase">Execution Output</span>
                </div>
                
                {/* Status Indicator */}
                {output !== null && (
                     <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${output.success ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'}`}>
                         {output.success ? <CheckCircle2Icon className="size-3.5" /> : <XCircleIcon className="size-3.5" />}
                         <span>{output.success ? 'SUCCESS' : 'ERROR'}</span>
                     </div>
                )}
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 overflow-auto p-5 custom-scrollbar relative z-0">
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div>
                
                {output === null ? (
                    <div className="h-full flex items-center justify-center text-base-content/40 font-mono text-sm opacity-60">
                         <div className="flex flex-col items-center gap-3">
                             <TerminalIcon className="size-8 opacity-20" />
                             <span>Ready to compile and run...</span>
                         </div>
                    </div>
                ) : output.success ? (
                    <div className="relative font-mono">
                        <div className="text-success/50 mb-2 text-xs flex items-center gap-2 select-none border-b border-success/10 pb-2">
                             <span className="text-primary font-bold">~</span>
                             <span>/hiresync/execution/output</span>
                             <span className="opacity-50">exit code 0</span>
                        </div>
                        <pre className="text-sm text-base-content/90 whitespace-pre-wrap leading-relaxed tracking-wide">{output.output}</pre>
                    </div>
                ) : (
                    <div className="relative font-mono">
                         <div className="text-error/50 mb-2 text-xs flex items-center gap-2 select-none border-b border-error/10 pb-2">
                             <span className="text-error font-bold">~</span>
                             <span>/hiresync/execution/error</span>
                             <span className="opacity-50">exit code 1</span>
                        </div>
                        {output.output && (
                            <pre className="text-sm text-base-content/80 whitespace-pre-wrap mb-4 opacity-70">
                                {output.output}
                            </pre>
                        )}
                        <pre className="text-sm text-error/90 whitespace-pre-wrap font-medium leading-relaxed bg-error/5 p-3 rounded-md border border-error/10">{output.error}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
export default OutputPanel;