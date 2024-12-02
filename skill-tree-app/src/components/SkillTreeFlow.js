// src/components/SkillTreeFlow.js
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import './SkillTreeFlow.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start Skill' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

function SkillTreeFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => nds.map((node) => ({ ...node, ...changes }))),
    []
  );
  const onEdgesChange = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNewNode = () => {
    if (!reactFlowWrapper.current) {
      console.error("React Flow wrapper reference is null");
      return;
    }

    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Skill ${nodes.length + 1}` },
      position: { x: nodes[0]?.position.x || 250, y: nodes[nodes.length - 1]?.position.y + 100 || 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  useEffect(() => {
    if (reactFlowWrapper.current) {
      reactFlowWrapper.current.focus();
    }
  }, []);

  return (
    <div className="skill-tree-flow-container">
      <button className="add-node-button" onClick={addNewNode}>
        Add Skill Node
      </button>
      <div
        ref={reactFlowWrapper}
        tabIndex={0}
        style={{ height: '600px', width: '100%' }}
      >
        {reactFlowWrapper.current && (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}

export default SkillTreeFlow;
