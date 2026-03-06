import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSession";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import Navbar from "../components/Navbar";
import { Panel, Group, Separator} from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  // find the problem data based on session problem title
  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  // auto-join session if user is not already a participant and not the host
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });

    // remove the joinSessionMutation, refetch from dependencies to avoid infinite loop
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  // redirect the "participant" when session ends
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    // use problem-specific starter code
    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      // this will navigate the HOST to dashboard
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="h-screen bg-base-300 flex flex-col relative overflow-hidden transition-colors duration-500">
      {/* DYNAMIC BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full animate-pulse blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[50%] bg-secondary/10 rounded-full animate-pulse delay-700 blur-3xl" />
          <div className="absolute top-[40%] left-[20%] w-[50%] h-[30%] bg-accent/10 rounded-full animate-pulse delay-1000 blur-3xl" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <Navbar className="relative z-10" />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 animate-fade-in-up transition-all relative z-10 overflow-hidden h-full flex mt-6 sm:mt-0">
        <Group orientation="horizontal" className="h-full rounded-4xl overflow-hidden border border-base-content/10 bg-base-100/30 backdrop-blur-xl shadow-2xl">
          {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
          <Panel defaultSize={50} minSize={30} className="rounded-l-4xl">
            <Group orientation="vertical">
              {/* PROBLEM DSC PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-100/50 backdrop-blur-sm custom-scrollbar">
                  {/* HEADER SECTION */}
                  <div className="p-6 md:p-8 bg-base-200/50 border-b border-base-content/10">
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-base-content to-base-content/70">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <span className="inline-block mt-3 text-xs font-mono uppercase tracking-wider text-base-content/50 bg-base-300/80 px-2 py-1 rounded-md border border-base-content/5">
                            {problemData.category}
                          </span>
                        )}
                        <p className="text-base-content/60 mt-3 font-medium">
                          Host: <span className="text-base-content font-bold">{session?.host?.name || "Loading..."}</span> •{" "}
                          <span className="text-primary font-bold">{session?.participant ? 2 : 1}/2</span> participants
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`badge border-0 font-bold px-4 py-1.5 shadow-sm ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty.slice(0, 1).toUpperCase() +
                            session?.difficulty.slice(1) || "Easy"}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="group relative px-4 py-1.5 bg-error/10 text-error font-bold rounded-lg flex items-center justify-center gap-2 overflow-hidden hover:shadow-lg hover:shadow-error/20 transition-all border border-error/20 hover:border-error/50 hover:bg-error hover:text-error-content"
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="w-4 h-4 animate-spin" />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            <span className="text-sm">End Session</span>
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span className="badge badge-ghost border border-base-content/20 bg-base-200 font-bold px-4 py-1.5">Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    {/* problem desc */}
                    {problemData?.description && (
                      <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                        <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                           <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                           Description
                        </h2>
                        <div className="space-y-4 text-base leading-relaxed">
                          <p className="text-base-content/80 text-[15px]">{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-base-content/80 text-[15px] pl-4 border-l-2 border-secondary/30 italic">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* examples section */}
                    {problemData?.examples && problemData.examples.length > 0 && (
                      <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                        <h2 className="text-xl font-bold mb-6 text-base-content flex items-center gap-2">
                           <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                           Examples
                        </h2>

                        <div className="space-y-6">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx} className="group/example">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-base-300 text-xs font-bold text-base-content/70 group-hover/example:bg-secondary/20 group-hover/example:text-secondary transition-colors">{idx + 1}</div>
                                <p className="font-bold text-base-content/90 tracking-wide">Example {idx + 1}</p>
                              </div>
                              <div className="bg-base-200/80 rounded-xl p-5 font-mono text-sm space-y-3 border border-base-content/5 shadow-inner">
                                <div className="flex gap-3 items-start">
                                  <span className="text-primary font-bold min-w-[70px] select-none">
                                    Input:
                                  </span>
                                  <span className="text-base-content/90 break-all">{example.input}</span>
                                </div>
                                <div className="flex gap-3 items-start">
                                  <span className="text-secondary font-bold min-w-[70px] select-none">
                                    Output:
                                  </span>
                                  <span className="text-base-content/90 break-all">{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-3 border-t border-base-content/10 mt-3 flex gap-3 items-start">
                                    <span className="text-accent font-bold min-w-[70px] select-none">
                                      Notes:
                                    </span>
                                    <span className="text-base-content/70 font-sans text-sm">
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints && problemData.constraints.length > 0 && (
                      <div className="bg-base-100/60 backdrop-blur-md rounded-2xl shadow-sm p-6 border border-base-content/5 hover:border-base-content/10 transition-colors">
                        <h2 className="text-xl font-bold mb-5 text-base-content flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                            Constraints
                        </h2>
                        <ul className="space-y-3">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-base-content/30 shrink-0"></div>
                              <code className="text-[13px] font-mono bg-base-200/80 text-base-content/80 px-3 py-1.5 rounded-lg border border-base-content/5 shadow-sm">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <Separator className="h-1.5 bg-base-content/10 hover:bg-primary transition-all duration-300 cursor-row-resize group flex items-center justify-center">
                  <div className="w-12 h-0.5 bg-base-content/20 group-hover:bg-primary-content transition-colors rounded-full" />
              </Separator>

              <Panel defaultSize={50} minSize={20}>
                <Group orientation="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>

                   <Separator className="h-1.5 bg-base-content/10 hover:bg-primary transition-all duration-300 cursor-row-resize group flex items-center justify-center">
                      <div className="w-12 h-0.5 bg-base-content/20 group-hover:bg-primary-content transition-colors rounded-full" />
                  </Separator>

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </Group>
              </Panel>
            </Group>
          </Panel>

           <Separator className="w-1.5 bg-base-content/10 hover:bg-primary transition-all duration-300 cursor-col-resize group flex items-center justify-center z-10">
              <div className="h-12 w-0.5 bg-base-content/20 group-hover:bg-primary-content transition-colors rounded-full" />
          </Separator>

          {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
          <Panel defaultSize={50} minSize={30} className="rounded-r-4xl">
            <div className="h-full bg-base-200/80 p-4 sm:p-6 overflow-auto backdrop-blur-sm relative custom-scrollbar z-0">
               <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10"></div>
               
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center relative z-20">
                  <div className="text-center p-8 bg-base-100/60 backdrop-blur-md rounded-3xl border border-base-content/10 shadow-2xl">
                    <Loader2Icon className="w-16 h-16 mx-auto animate-spin text-primary mb-6" />
                    <p className="text-xl font-bold tracking-tight text-base-content/80">Connecting to session...</p>
                    <p className="text-sm text-base-content/50 mt-2">Preparing video and chat layout</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center relative z-20">
                  <div className="card bg-base-100/60 backdrop-blur-md shadow-2xl border border-error/20 max-w-md">
                    <div className="card-body items-center text-center p-10">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-6 ring-4 ring-error/5">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl font-black mb-2">Connection Failed</h2>
                      <p className="text-base-content/60">Unable to connect to the interactive session room.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full relative z-20">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </Group>
      </div>
      
       <style dangerouslySetInnerHTML={{__html: `
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
                animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                opacity: 0;
            }
        `}} />
    </div>
  );
}

export default SessionPage;