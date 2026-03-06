import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSession.js";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSession";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = Array.isArray(activeSessionsData) ? activeSessionsData : activeSessionsData?.sessions || [];
  const recentSessions = Array.isArray(recentSessionsData) ? recentSessionsData : recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <>
      <div className="min-h-screen bg-base-300 relative overflow-hidden transition-colors duration-500 flex flex-col">
        {/* DYNAMIC BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[40%] bg-primary/10 rounded-full animate-pulse blur-3xl" />
          <div className="absolute top-[20%] right-[5%] w-[40%] h-[30%] bg-secondary/10 rounded-full animate-pulse delay-700 blur-3xl" />
          <div className="absolute bottom-[0%] left-[20%] w-[50%] h-[40%] bg-accent/10 rounded-full animate-pulse delay-1000 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <Navbar />
        
        <div className="relative z-10 flex-1 w-full">
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

          {/* Grid layout */}
          <div className="container mx-auto px-6 pb-16 animate-fade-in-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
              <ActiveSessions
                sessions={activeSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
              />
            </div>

            <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;