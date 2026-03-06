import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";

import { Panel, Group, Separator } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import { executeCode } from "../lib/piston.js";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState("two-sum");
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];

    // update problem when URL param changes
    useEffect(() => {
        if (id && PROBLEMS[id]) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang]);
        setOutput(null);
    };

    const handleProblemChange = (newProblemId) => navigate(`/problem/${newProblemId}`);

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const normalizeOutput = (output) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
            .trim()
            .split("\n")
            .map((line) =>
                line
                    .trim()
                    // remove spaces after [ and before ]
                    .replace(/\[\s+/g, "[")
                    .replace(/\s+\]/g, "]")
                    // normalize spaces around commas to single space after comma
                    .replace(/\s*,\s*/g, ",")
            )
            .filter((line) => line.length > 0)
            .join("\n");
    };

    const checkIfTestsPassed = (actualOutput, expectedOutput) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);

        return normalizedActual == normalizedExpected;
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);

        // check if code executed successfully and matches expected output

        if (result.success) {
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
            const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

            if (testsPassed) {
                triggerConfetti();
                toast.success("All tests passed! Great job!");
            } else {
                toast.error("Tests failed. Check your output!");
            }
        } else {
            toast.error("Code execution failed!");
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
                    {/* left panel- problem desc */}
                    <Panel defaultSize={40} minSize={30} className="rounded-l-4xl">
                        <ProblemDescription
                            problem={currentProblem}
                            currentProblemId={currentProblemId}
                            onProblemChange={handleProblemChange}
                            allProblems={Object.values(PROBLEMS)}
                        />
                    </Panel>

                    <Separator className="w-1.5 bg-base-content/10 hover:bg-primary transition-all duration-300 cursor-col-resize group flex items-center justify-center">
                        <div className="h-12 w-0.5 bg-base-content/20 group-hover:bg-primary-content transition-colors rounded-full" />
                    </Separator>

                    {/* right panel- code editor & output */}
                    <Panel defaultSize={60} minSize={30} className="rounded-r-4xl">
                        <Group orientation="vertical">
                            {/* Top panel - Code editor */}
                            <Panel defaultSize={70} minSize={30}>
                                <CodeEditorPanel
                                    selectedLanguage={selectedLanguage}
                                    code={code}
                                    isRunning={isRunning}
                                    onLanguageChange={handleLanguageChange}
                                    onCodeChange={setCode}
                                    onRunCode={handleRunCode}
                                />
                            </Panel>

                            <Separator className="h-1.5 bg-base-content/10 hover:bg-primary transition-all duration-300 cursor-row-resize group flex items-center justify-center">
                                <div className="w-12 h-0.5 bg-base-content/20 group-hover:bg-primary-content transition-colors rounded-full" />
                            </Separator>

                            {/* Bottom panel - Output Panel*/}

                            <Panel defaultSize={30} minSize={30}>
                                <OutputPanel output={output} />
                            </Panel>
                        </Group>
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

export default ProblemPage;