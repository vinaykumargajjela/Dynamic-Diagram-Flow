import React, { useState, useEffect, useCallback } from 'react';
import {
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow'; 

import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';
import initialData from './metadata.json'; // Import the sample data

//  LOCAL STORAGE 
const NODES_KEY = 'react-flow-nodes';
const EDGES_KEY = 'react-flow-edges';

function App() {
  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // Add a state to track if we are loading from storage.
  // This prevents the "save" effects from running on initial render
  // and wiping our saved data before it's loaded.
  const [isLoading, setIsLoading] = useState(true);

  // State for the currently selected node (for editing)
  const [selectedNode, setSelectedNode] = useState(null);

  // LOCAL STORAGE (LOAD) 
  // This effect runs only ONCE when the app first loads
  useEffect(() => {
    // Try to get saved nodes and edges from localStorage
    const savedNodes = localStorage.getItem(NODES_KEY);
    const savedEdges = localStorage.getItem(EDGES_KEY);

    if (savedNodes && savedEdges) {
      // If we found saved data, parse it and set it as our state
      setNodes(JSON.parse(savedNodes));
      setEdges(JSON.parse(savedEdges));
    } else {
      // Otherwise (e.g., first time user), load the default data
      setNodes(initialData.nodes);
      setEdges(initialData.edges);
    }
    
    
    // We are done loading, so set loading to false
    setIsLoading(false);

  }, []); // The empty array [] means this runs only once on mount

  //  LOCAL STORAGE (SAVE NODES) 
  // This effect runs every time the `nodes` state changes
  useEffect(() => {
    // Only save if we are NOT in the initial loading phase
    if (!isLoading) {
      localStorage.setItem(NODES_KEY, JSON.stringify(nodes));
    }
    // We add isLoading as a dependency
  }, [nodes, isLoading]); 

  //  LOCAL STORAGE (SAVE EDGES) 
  // This effect runs every time the `edges` state changes
  useEffect(() => {
    // Only save if we are NOT in the initial loading phase
    if (!isLoading) {
      localStorage.setItem(EDGES_KEY, JSON.stringify(edges));
    }
    // We add isLoading as a dependency
  }, [edges, isLoading]); 


  // === React Flow Handlers ===
  // (The code below is unchanged)

  /**
   * This function is called by React Flow when nodes are dragged, selected, etc.
   */
  const onNodesChange = (changes) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  };

  /**
   * This function is called by React Flow when edges are selected or deleted.
   */
  const onEdgesChange = (changes) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  };

  /**
   * This function is called when a user drags a new connection between two nodes.
   */
  const onConnect = useCallback(
    (params) =>
      setEdges((currentEdges) =>
        addEdge({ ...params, type: 'smoothstep', animated: true }, currentEdges)
      ),
    [setEdges] 
  );

  // === Custom Sidebar Functions ===

  /**
   * Function to ADD a new node
   */
  const addNode = (nodeLabel) => {
    const newNode = {
      id: `node_${+new Date()}`,
      type: 'default', 
      position: { x: 50, y: 50 },
      data: { label: nodeLabel },
    };
    setNodes((currentNodes) => currentNodes.concat(newNode));
  };

  /**
   * Function to EDIT a node's label
   */
  const updateNode = (nodeId, newLabel) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      })
    );
    setSelectedNode(null);
  };

  /**
   * Function to DELETE a node
   */
  const deleteNode = (nodeId) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id !== nodeId));
    setEdges((currentEdges) =>
      currentEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    setSelectedNode(null);
  };

  /**
   * Callback function when a node is clicked in the diagram
   */
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  /**
   * Callback function when the diagram pane is clicked
   */
  const onPaneClick = () => {
    setSelectedNode(null);
  };

  // --- Render ---
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <div className="sidebar">
          <Sidebar
            addNode={addNode}
            updateNode={updateNode}
            deleteNode={deleteNode}
            selectedNode={selectedNode}
          />
        </div>

        <div className="diagram-container">
          <Diagram
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
          />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;