import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-3xl p-6 md:p-8 h-full shadow-2xl relative overflow-hidden group/container">
       <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover/container:bg-primary/10 transition-colors pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-base-content/10">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl shadow-inner">
              <ZapIcon className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl font-black text-base-content tracking-tight">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full shadow-sm">
            <div className="size-2.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(var(--color-success),0.8)]" />
            <span className="text-sm font-bold text-success uppercase tracking-wider">{sessions.length} active</span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar flex-1 relative">
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <LoaderIcon className="size-12 animate-spin text-primary opacity-80" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="group relative bg-base-200/50 backdrop-blur-sm border border-base-content/5 hover:bg-base-100 hover:border-primary/30 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden"
              >
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-5 flex-1 w-full">
                    <div className="relative size-14 rounded-2xl bg-base-300 border border-base-content/10 flex items-center justify-center shrink-0 shadow-inner group-hover:border-primary/30 transition-colors">
                      <Code2Icon className="size-6 text-base-content/60 group-hover:text-primary transition-colors" />
                      <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100 shadow-[0_0_5px_rgba(var(--color-success),0.5)]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-base-content truncate group-hover:text-primary transition-colors">{session.problem}</h3>
                        <span
                          className={`badge badge-sm border-0 font-semibold shadow-sm ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-base-content/70">
                        <div className="flex items-center gap-1.5 bg-base-300/50 px-2 py-0.5 rounded-md border border-base-content/5">
                          <CrownIcon className="size-4 text-warning" />
                          <span className="font-medium truncate max-w-[100px] sm:max-w-[150px]">{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span className="font-medium">{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="badge badge-error badge-sm">FULL</span>
                        ) : (
                          <span className="badge badge-success badge-sm shadow-[0_0_5px_rgba(var(--color-success),0.3)] bg-success/20 text-success border-success/30">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                 {/* RIGHT SIDE CTA */}
                 <div className="sm:self-center shrink-0 w-full sm:w-auto mt-2 sm:mt-0 flex justify-end">
                    {session.participant && !isUserInSession(session) ? (
                      <button className="btn btn-disabled font-bold px-6 border border-base-content/10">Full</button>
                    ) : (
                      <Link to={`/session/${session._id}`} className="group/btn relative px-6 py-2.5 bg-base-300 text-base-content font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden hover:shadow-md hover:shadow-primary/20 transition-all border border-base-content/10 hover:border-primary/50">
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <span className="relative z-10 group-hover/btn:text-primary-content transition-colors">
                           {isUserInSession(session) ? "Rejoin" : "Join"}
                        </span>
                        <ArrowRightIcon className="size-4 relative z-10 group-hover/btn:text-primary-content group-hover/btn:translate-x-1 transition-all" />
                      </Link>
                    )}
                 </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-base-200/30 rounded-2xl border border-dashed border-base-content/20 inset-0 absolute m-2 flex flex-col items-center justify-center">
              <div className="size-20 mb-6 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center shadow-inner">
                <SparklesIcon className="size-10 text-primary/50" />
              </div>
              <p className="text-xl font-bold text-base-content/80 mb-2">No active sessions</p>
              <p className="text-base text-base-content/50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(var(--color-primary), 0.2);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(var(--color-primary), 0.4);
        }
      `}} />
    </div>
  );
}
