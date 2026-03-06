# HireSync

## Overview

HireSync is a comprehensive, real-time collaborative platform designed specifically for technical interviews and pair programming. It seamlessly integrates a live code editor, high-definition video calling, and interactive chat into a single, cohesive environment. Built with modern web technologies, HireSync empowers interviewers (hosts) and candidates (participants) to connect face-to-face, tackle coding challenges in multiple programming languages, and instantly execute code to verify solutions—all within a highly responsive and customizable workspace.

## Context

Technical interviews and remote pair programming often suffer from fragmented tooling—requiring users to juggle separate video conferencing apps, external code editors, and messaging platforms. HireSync was developed to solve this friction by providing a unified "Code Together, Learn Together" experience. The platform streamlines the entire workflow: hosts can create dedicated sessions with curated algorithmic problems (categorized by difficulty), while participants can join in with a single click. The goal was to build a robust, scalable application that mimics a real-world collaborative coding environment, ensuring minimal latency and high reliability during critical technical assessments.

## Key Features

- **Real-Time Video & Audio Communication**: Embedded HD video calling within the interview workspace, powered by Stream Video SDK, allowing for natural, face-to-face interaction.
- **Live Code Execution & Editor**: Integrated Monaco Editor with syntax highlighting for multiple languages. Code can be executed instantly within the browser using the Piston API to validate outputs against test cases.
- **Customizable Workspace**: A flexible UI built with `react-resizable-panels`, allowing users to dynamically adjust the layout of the problem description, code editor, output terminal, and video feed.
- **Integrated Problem Library**: Rich problem descriptions complete with difficulty badges, input/output examples, explanations, and technical constraints to guide the participant.
- **Session Management & Role-Based Access**: Secure authentication via Clerk. Hosts can create sessions, select problems, and end sessions, while participants join via unique session links.
- **Real-Time Chat**: Integrated text chat (Stream Chat SDK) alongside the video feed for sharing snippets, links, or notes without interrupting the flow of the interview.

## Technical Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, DaisyUI, Tanstack Query, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose) for scalable data storage.
- **Authentication**: Clerk (Frontend & Backend integration) for secure user identity management.
- **Real-Time Infrastructure**: Stream SDK (Video & Chat) for low-latency peer-to-peer communication.
- **Code Execution Engine**: Piston API for secure, multi-language code interpretation.
- **Background Jobs**: Inngest for reliable event and background task processing.

## Future Improvements (Suggestions based on current architecture)

- **Session Recording & Playback**: Implement features to record the video and code keystrokes for playback, allowing interviewers to review a candidate's problem-solving approach asynchronously.
- **Collaborative Whiteboarding**: Add a live digital whiteboard tab next to the code editor for system design and architecture discussions.
- **Automated Test Cases & Grading**: Enhance the problem execution to automatically run user code against hidden test cases and provide a pass/fail score.
- **Interview Analytics Dashboard**: Provide users with insights into their performance over time, such as average completion time, languages used, and success rates by problem difficulty.
