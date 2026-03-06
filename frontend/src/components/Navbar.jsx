import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar({ className = "" }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`bg-base-100/50 backdrop-blur-xl border-b border-base-content/5 sticky top-0 z-50 shadow-sm transition-all duration-300 ${className}`}>
            <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative z-10">
                {/* LOGO */}
                <Link
                    to="/"
                    className="group flex items-center gap-3 hover:opacity-90 transition-all duration-300"
                >
                    <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                        <SparklesIcon className="size-5 text-white/90 relative z-10" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-black text-xl bg-linear-to-r from-base-content to-base-content/70 bg-clip-text text-transparent tracking-tight">
                            HireSync
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 -mt-1">Code Together</span>
                    </div>
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
                    {/* PROBLEMS PAGE LINK */}
                    <Link
                        to={"/problems"}
                        className={`relative px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 group
                            ${isActive("/problems")
                                ? "text-primary font-bold bg-primary/10 shadow-inner"
                                : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"
                            }
                        `}
                    >
                        <div className="flex items-center gap-x-2">
                            <BookOpenIcon className={`size-4 sm:size-4.5 transition-transform duration-300 ${isActive("/problems") ? "scale-110" : "group-hover:scale-110"}`} />
                            <span className="font-medium hidden sm:inline text-sm tracking-wide">Problems</span>
                        </div>
                    </Link>

                    {/* DASHBOARD PAGE LINK */}
                    <Link
                        to={"/dashboard"}
                         className={`relative px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 group
                            ${isActive("/dashboard")
                                ? "text-primary font-bold bg-primary/10 shadow-inner"
                                : "text-base-content/70 hover:text-base-content hover:bg-base-content/5"
                            }
                        `}
                    >
                        <div className="flex items-center gap-x-2">
                            <LayoutDashboardIcon className={`size-4 sm:size-4.5 transition-transform duration-300 ${isActive("/dashboard") ? "scale-110" : "group-hover:scale-110"}`} />
                            <span className="font-medium hidden sm:inline text-sm tracking-wide">Dashboard</span>
                        </div>
                    </Link>

                    <div className="ml-2 sm:ml-4 border-l border-base-content/10 pl-4 sm:pl-6 flex items-center">
                        <div className="hover:scale-105 transition-transform duration-200 inline-block rounded-full ring-2 ring-primary/20 hover:ring-primary/50 shadow-sm">
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 sm:w-9 sm:h-9"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;