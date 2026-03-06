import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center relative z-20">
          <div className="text-center p-8 bg-base-100/60 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl">
            <Loader2Icon className="w-16 h-16 mx-auto animate-spin text-primary mb-6" />
            <p className="text-xl font-bold tracking-tight text-base-content/80">Joining room...</p>
            <p className="text-sm text-base-content/50 mt-2">Connecting to video streams</p>
          </div>
        </div>
    );
  }

  return (
    <div className="h-full flex gap-4 relative str-video isolate">
      <div className="flex-1 flex flex-col gap-4 relative z-10 w-full min-w-0">
        {/* Participants count badge and Chat Toggle */}
        <div className="flex items-center justify-between gap-3 bg-base-100/50 backdrop-blur-md p-3.5 sm:px-5 rounded-2xl border border-base-content/10 shadow-lg shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-1.5 bg-primary/10 rounded-xl border border-primary/20">
            <div className="relative">
                <UsersIcon className="w-5 h-5 text-primary" />
                <div className="absolute -top-1 -right-1.5 w-2 h-2 bg-success rounded-full border border-base-100 animate-pulse"></div>
            </div>
            <span className="font-bold text-sm tracking-wide text-primary">
              {participantCount} {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 text-xs font-monotext-base-content/50 bg-base-300/50 px-3 py-1.5 rounded-lg border border-base-content/5 select-none">
                 <SparklesIcon className="w-3.5 h-3.5 text-secondary" />
                 <span>Secure Connection</span>
             </div>
             
            {chatClient && channel && (
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`group relative px-4 py-2 rounded-xl flex items-center gap-2 font-bold overflow-hidden transition-all border ${
                  isChatOpen 
                  ? "bg-primary text-primary-content border-primary shadow-lg shadow-primary/30" 
                  : "bg-base-300 text-base-content/80 border-base-content/10 hover:border-primary/50 hover:text-base-content hover:shadow-md"
                }`}
                title={isChatOpen ? "Hide chat" : "Show chat"}
              >
                {!isChatOpen && <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                <MessageSquareIcon className={`size-4 relative z-10 ${isChatOpen ? "animate-pulse" : "group-hover:text-primary transition-colors"}`} />
                <span className="relative z-10 text-sm tracking-wide">Chat</span>
              </button>
            )}
           </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 bg-[#1c1e22]/90 backdrop-blur-xl rounded-2xl border border-base-content/10 overflow-hidden relative shadow-inner flex flex-col min-h-[300px]">
           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] z-20"></div>
           <div className="flex-1 h-full w-full [&_.str-video__speaker-layout]:h-full [&_.str-video__speaker-layout]:w-full relative z-10">
              <SpeakerLayout />
           </div>
        </div>

        {/* Video Controls Area */}
        <div className="bg-base-100/50 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-base-content/10 shadow-lg flex justify-center shrink-0">
          <div className="[&_.str-video__call-controls]:bg-transparent [&_.str-video__call-controls]:shadow-none [&_.str-video__call-controls]:p-0 [&_.str-video__call-controls]:gap-3 sm:[&_.str-video__call-controls]:gap-5">
             <CallControls onLeave={() => navigate("/dashboard")} />
          </div>
        </div>
      </div>

      {/* CHAT SECTION */}
      {chatClient && channel && (
        <div
          className={`shrink-0 flex flex-col rounded-2xl border border-base-content/10 shadow-2xl overflow-hidden bg-[#272a30]/95 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 ${
            isChatOpen ? "w-[300px] lg:w-[350px] opacity-100 translate-x-0 ml-0 lg:ml-2" : "w-0 opacity-0 translate-x-8 -ml-4 pointer-events-none"
          }`}
        >
          {isChatOpen && (
            <>
              {/* Chat Header */}
              <div className="bg-[#1c1e22]/90 backdrop-blur-md p-4 border-b border-[#3a3d44] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-primary/20 rounded-lg">
                       <MessageSquareIcon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-white tracking-wide text-sm">Session Chat</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3a3d44]/50 text-gray-300 hover:text-white hover:bg-error/80 transition-all"
                  title="Close chat"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
              
              {/* Chat Body */}
              <div className="flex-1 overflow-hidden stream-chat-dark relative">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default VideoCallUI;