import React, { useState, useEffect } from 'react';
import SkillTree from './components/SkillTree';
import './App.css';
import backgroundImage from './assets/space-background.jpg';

function App() {
  const [skillTrees, setSkillTrees] = useState([]);
  const [currentTreeIndex, setCurrentTreeIndex] = useState(null);

  const addSkillTree = () => {
    const newTree = {
      name: `Skill Tree ${skillTrees.length + 1}`,
      nodes: [
        {
          id: 1,
          label: 'Skill 1',
          children: [],
        },
      ],
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
            case 'ADD_BRANCH':
              const { parentId, direction } = data;
              const updatedNodes = addBranchToNodes(tree.nodes, parentId, direction);
              return {
                ...tree,
                nodes: updatedNodes,
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

  const addBranchToNodes = (nodes, parentId, direction) => {
    return nodes.map((node) => {
      if (node.id === parentId && node.children.length < 3) {
        const newChild = {
          id: nodes.length + node.children.length + 1,
          label: `Skill ${nodes.length + node.children.length + 1}`,
          direction: direction,
          children: [],
        };
        return {
          ...node,
          children: [...node.children, newChild],
        };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: addBranchToNodes(node.children, parentId, direction),
        };
      }
      return node;
    });
  };

  useEffect(() => {
    // Add a default skill tree when the component mounts
    addSkillTree();
  }, []);

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
      </div>
      <div className='skill-tree-content'>
        {currentTreeIndex !== null && (
          <SkillTree
            treeName={skillTrees[currentTreeIndex].name}
            nodes={skillTrees[currentTreeIndex].nodes}
            onAddBranch={(parentId, direction) => handleSkillTreeEvent('ADD_BRANCH', { parentId, direction })}
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
