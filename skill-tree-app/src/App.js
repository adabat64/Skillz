import React, { useState } from 'react';
import SkillTree from './components/SkillTree';
import './App.css';
import backgroundImage from './assets/space-background.jpg';

function App() {
  const [skillTrees, setSkillTrees] = useState([]);
  const [currentTreeIndex, setCurrentTreeIndex] = useState(null);

  const addSkillTree = () => {
    const newTree = {
      name: `Skill Tree ${skillTrees.length + 1}`,
      nodes: [],
    };
    setSkillTrees((prevTrees) => [...prevTrees, newTree]);
    setCurrentTreeIndex(skillTrees.length);
  };

  const handleSkillTreeEvent = (eventType, data) => {
    if (currentTreeIndex === null) return;

    setSkillTrees((prevTrees) => {
      const updatedTrees = prevTrees.map((tree, index) => {
        if (index === currentTreeIndex) {
          switch (eventType) {
            case 'ADD_NODE':
              const newNode = {
                id: tree.nodes.length + 1,
                label: `Skill ${tree.nodes.length + 1}`,
              };
              return {
                ...tree,
                nodes: [...tree.nodes, newNode],
              };
            case 'DELETE_NODE':
              const filteredNodes = tree.nodes.filter((node) => node.id !== data.nodeId);
              return {
                ...tree,
                nodes: filteredNodes,
              };
            case 'EDIT_NODE':
              const editedNodes = tree.nodes.map((node) =>
                node.id === data.nodeId ? { ...node, label: data.newLabel } : node
              );
              return {
                ...tree,
                nodes: editedNodes,
              };
            case 'EDIT_TREE_NAME':
              return {
                ...tree,
                name: data.newName,
              };
            default:
              return tree;
          }
        }
        return tree;
      });
      return updatedTrees;
    });
  };

  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div className='header'>
        <h1>Skill Tree App</h1>
        <button className='add-skill-tree-button' onClick={addSkillTree}>
          Add Skill Tree
        </button>
      </div>
      <div className='skill-tree-content'>
        {currentTreeIndex !== null && (
          <SkillTree
            treeName={skillTrees[currentTreeIndex].name}
            nodes={skillTrees[currentTreeIndex].nodes}
            onAddNode={() => handleSkillTreeEvent('ADD_NODE')}
            onDeleteNode={(nodeId) => handleSkillTreeEvent('DELETE_NODE', { nodeId })}
            onEditNode={(nodeId, newLabel) => handleSkillTreeEvent('EDIT_NODE', { nodeId, newLabel })}
            onEditTreeName={(newName) => handleSkillTreeEvent('EDIT_TREE_NAME', { newName })}
          />
        )}
      </div>
      <div className='skill-trees-list'>
        {skillTrees.map((tree, index) => (
          <button
            key={index}
            onClick={() => setCurrentTreeIndex(index)}
            className='skill-tree-button'
          >
            {tree.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
