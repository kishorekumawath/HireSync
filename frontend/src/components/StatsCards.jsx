import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
      {/* Active Count */}
      <div className="relative overflow-hidden group bg-base-100/40 backdrop-blur-xl border border-primary/20 hover:border-primary/50 p-6 rounded-4xl flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
         <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
         <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                <UsersIcon className="w-7 h-7 text-primary" />
              </div>
              <div className="badge border-0 bg-primary/10 text-primary font-bold px-3 py-1 animate-pulse shadow-sm">Live</div>
            </div>
            <div className="text-5xl font-black mb-1 tracking-tight text-base-content">{activeSessionsCount}</div>
            <div className="text-sm font-medium opacity-60 uppercase tracking-widest">Active Sessions</div>
         </div>
      </div>

      {/* Recent Count */}
      <div className="relative overflow-hidden group bg-base-100/40 backdrop-blur-xl border border-secondary/20 hover:border-secondary/50 p-6 rounded-4xl flex flex-col justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-secondary/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3.5 bg-linear-to-br from-secondary/20 to-secondary/5 border border-secondary/20 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
              <TrophyIcon className="w-7 h-7 text-secondary" />
            </div>
          </div>
          <div className="text-5xl font-black mb-1 tracking-tight text-base-content">{recentSessionsCount}</div>
          <div className="text-sm font-medium opacity-60 uppercase tracking-widest">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;