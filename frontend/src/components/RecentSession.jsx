import { Code2, Clock, Users, Trophy, Loader, Sparkles } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-3xl p-6 md:p-8 mt-8 shadow-2xl relative overflow-hidden group/container">
       <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover/container:bg-accent/10 transition-colors pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-base-content/10">
          <div className="p-2.5 bg-linear-to-br from-accent/20 to-secondary/5 border border-accent/20 rounded-xl shadow-inner">
            <Clock className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-2xl font-black text-base-content tracking-tight">Your Past Sessions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20 min-h-[200px]">
              <Loader className="w-12 h-12 animate-spin text-primary opacity-80" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`group relative backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden ${
                  session.status === "active"
                    ? "bg-success/5 border-success/20 hover:border-success/50 hover:shadow-success/10"
                    : "bg-base-200/50 border-base-content/5 hover:bg-base-100 hover:border-accent/30 hover:shadow-accent/10"
                }`}
              >
                  {/* Hover Gradient Background */}
                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${session.status === "active" ? "bg-linear-to-tr from-success/0 via-success/5 to-transparent" : "bg-linear-to-tr from-accent/0 via-accent/5 to-secondary/5"}`}></div>

                {session.status === "active" && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="badge border-0 bg-success/20 text-success font-bold gap-1.5 px-3 py-1 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_5px_rgba(var(--color-success),0.8)]" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div className="p-6 relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-colors group-hover:scale-105 ${
                        session.status === "active"
                          ? "bg-linear-to-br from-success/20 to-success/5 border border-success/30 text-success"
                          : "bg-base-300 border border-base-content/10 group-hover:border-accent/30 text-base-content/60 group-hover:text-accent"
                      }`}
                    >
                      <Code2 className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h3 className="font-bold text-lg mb-1.5 truncate text-base-content group-hover:text-primary transition-colors">{session.problem}</h3>
                      <span
                        className={`badge badge-sm border-0 font-semibold shadow-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                      >
                        {session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm font-medium text-base-content/60 mb-6 flex-1">
                    <div className="flex items-center gap-2.5 bg-base-300/30 px-3 py-1.5 rounded-lg border border-base-content/5">
                      <Clock className="w-4 h-4 text-base-content/40" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5">
                      <Users className="w-4 h-4 text-base-content/40" />
                      <span>
                        {session.participant ? "2" : "1"} participant{session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-base-content/10 mt-auto">
                    <span className="text-xs font-bold opacity-60 uppercase tracking-wider text-base-content">Completed</span>
                    <span className="text-xs font-mono font-medium opacity-50 text-base-content">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-base-200/30 rounded-2xl border border-dashed border-base-content/20 flex flex-col items-center justify-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-accent/20 to-secondary/20 rounded-3xl flex items-center justify-center shadow-inner">
                <Trophy className="w-10 h-10 text-accent/50" />
              </div>
              <p className="text-xl font-bold text-base-content/80 mb-2">No sessions yet</p>
              <p className="text-base text-base-content/50">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;