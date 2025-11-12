## Dynamic Diagram Flow (React Flow Assignment)

## Live : https://dynamic-diagram-flow-rho.vercel.app
 
A dynamic, interactive diagram-building application built with React and React Flow. This project allows users to create, modify, and delete nodes in a flowchart-style diagram. All changes are saved directly to the browser's localStorage, so your work persists even after refreshing the page.

## Application Preview

 Features

Dynamic Rendering: Renders a diagram from a metadata.json file on first load.

Full Node CRUD: Add, Edit, and Delete nodes using an interactive sidebar.

Edge Management: Create edges by dragging between nodes; delete them by selecting one and pressing the Backspace key.

Persistent State: Automatically saves your complete diagram (nodes and edges) to localStorage, so you never lose your work on refresh.

Responsive Design: The UI (sidebar and canvas) adapts smoothly to mobile and desktop screens using a clean CSS flexbox layout.

Clean UI: Built with react-bootstrap for a modern, intuitive, and clean user interface.

## Tech Stack

React (v18+)

React Flow

Bootstrap & React-Bootstrap

HTML5 & CSS3

localStorage for client-side storage

## Project Structure

Here is the high-level structure of the project:
```

dynamic-diagram-flow/
│
├── assets/
│   └── app-preview.png      
│
├── public/
│   └── index.html           
│
├── src/
│   ├── components/
│   │   ├── Diagram.js      
│   │   └── Sidebar.js       
│   │
│   ├── App.js               
│   ├── App.css              
│   ├── index.js            
│   └── metadata.json        
│
├── .gitignore
├── package.json
└── README.md               

```


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites

You must have Node.js (v16 or higher) and npm (or yarn) installed on your computer.

Installation & Setup

Clone the repository (or download and unzip the folder):

git clone https://github.com/vinaykumargajjela/Dynamic-Diagram-Flow.git


Navigate to the project directory:

cd dynamic-diagram-flow


Install all the required dependencies:

npm install


(This installs react, reactflow, bootstrap, react-bootstrap, etc.)

## Available Scripts

npm start

Runs the app in development mode. Open http://localhost:3000 in your browser to see it.

The page will automatically reload if you make any code changes. You will also see any lint warnings (like unused variables) in the console.

npm run build

Builds the app for production into the build folder. This correctly bundles React in production mode and optimizes the build for the best performance.
