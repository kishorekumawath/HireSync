import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden mb-8">
      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-base-100/40 backdrop-blur-xl border border-base-content/10 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl animate-fade-in-up">
           {/* Decorative corner glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
                <SparklesIcon className="w-7 h-7 text-primary-content" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-xl text-base-content/60 ml-18 font-medium">
              Ready to level up your coding skills?
            </p>
          </div>
          
          <div className="relative z-10 lg:pl-8">
             <button
              onClick={onCreateSession}
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-secondary rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.5)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <div className="relative z-10 flex items-center gap-3 text-primary-content font-bold text-lg">
                <ZapIcon className="w-6 h-6 fill-current opacity-80 group-hover:opacity-100" />
                <span>Create Session</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;