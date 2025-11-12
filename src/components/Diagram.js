import React from 'react';
import ReactFlow, {
  // We no longer need state hooks (useNodesState, etc.) here
  // We just need the UI components
  Controls,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

/**
 * This is a "controlled" or "dumb" component.
 * It does not manage any state itself.
 * It receives all state (nodes, edges) and all event handlers
 * (onNodesChange, onConnect, etc.) as props from its parent (App.js).
 * This prevents the infinite loop error.
 */
function Diagram({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onPaneClick,
}) {
  
  // All the state hooks (useNodesState, useEdgesState) and
  // useEffects have been removed from this file.
  
  return (
    // The height: '100%' makes it fill its container
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        // Pass the props directly to ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        
        // --- Optional settings ---
        fitView // Zooms to fit all nodes on load
        
        // You can uncomment these to customize edge/node types
        // nodeTypes={...}
        // edgeTypes={...}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Diagram;