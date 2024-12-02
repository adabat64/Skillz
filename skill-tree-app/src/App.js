import React, { useState, useEffect, useRef } from 'react';
import SkillTree from './components/SkillTree';
import './App.css';
import backgroundImage from './assets/space-background.jpg';

function App() {
  const [skillTrees, setSkillTrees] = useState([]);
  const [viewState, setViewState] = useState({ depth: 1, selectedTree: null });
  const [nextNodeId, setNextNodeId] = useState(2);

  // Ref to track if the initial tree has been added
  const hasAddedInitialTree = useRef(false);

  useEffect(() => {
    if (!hasAddedInitialTree.current) {
      console.log("useEffect - Adding initial skill tree");
      addSkillTree(); // Add a default skill tree when the app loads only if there are no existing skill trees.
      hasAddedInitialTree.current = true; // Set the flag to true to avoid adding again
    }
  }, []); // Empty dependency array ensures this runs only once.

  // Add a new skill tree with a single default node
  const addSkillTree = () => {
    console.log("addSkillTree - Adding a new skill tree");
    const newTree = {
      id: skillTrees.length + 1,
      name: `Skill Tree ${skillTrees.length + 1}`,
      nodes: [{ id: 1, label: 'Skill 1', children: [] }],
    };
    setSkillTrees((prevTrees) => {
      console.log("addSkillTree - Updated skillTrees state", [...prevTrees, newTree]);
      return [...prevTrees, newTree];
    });
  };

  // Add a new child node to the selected parent node
  const handleAddNode = (parentId) => {
    if (!viewState.selectedTree) {
      console.warn("handleAddNode - No selected tree found!");
      return;
    }

    console.log(`handleAddNode - Adding new node under parent node ID: ${parentId}`);

    setSkillTrees((prevTrees) => {
      const updatedTrees = prevTrees.map((tree) => {
        if (tree.id === viewState.selectedTree.id) {
          const updatedNodes = addNodeToTree(tree.nodes, parentId);
          return { ...tree, nodes: updatedNodes };
        }
        return tree;
      });

      console.log("handleAddNode - Updated skillTrees after adding node", updatedTrees);

      // Update viewState immediately based on updated skillTrees
      const updatedSelectedTree = updatedTrees.find((tree) => tree.id === viewState.selectedTree.id);
      setViewState((prevState) => ({
        ...prevState,
        selectedTree: updatedSelectedTree,
      }));

      return updatedTrees;
    });

    setNextNodeId((prevId) => {
      console.log(`handleAddNode - Updating nextNodeId to: ${prevId + 1}`);
      return prevId + 1;
    });
  };

  // Recursive function to add a new node to the tree
  const addNodeToTree = (nodes, parentId) => {
    console.log("addNodeToTree - Adding node to tree structure", { nodes, parentId });
    return nodes.map((node) => {
      if (node.id === parentId) {
        const newNode = {
          id: nextNodeId,
          label: `Skill ${nextNodeId}`,
          children: [],
        };
        console.log(`addNodeToTree - Adding new child node: ${newNode.label} under parent node ID: ${parentId}`);
        return { ...node, children: [...node.children, newNode] };
      }
      return { ...node, children: addNodeToTree(node.children, parentId) };
    });
  };

  // Select a tree to view
  const handleSelectTree = (tree) => {
    console.log("handleSelectTree - Selecting tree:", tree);
    setViewState({ depth: 2, selectedTree: tree });
  };

  // Go back to the main menu
  const goBack = () => {
    console.log("goBack - Returning to main menu");
    setViewState({ depth: 1, selectedTree: null });
  };

  return (
    <div
      className='App'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      {viewState.depth === 1 ? (
        <div className='skill-tree-menu'>
          <h1>Skill Tree Menu</h1>
          {skillTrees.map((tree) => (
            <button key={tree.id} onClick={() => handleSelectTree(tree)}>
              {tree.name}
            </button>
          ))}
          <button onClick={addSkillTree}>Add New Skill Tree</button>
        </div>
      ) : (
        viewState.selectedTree && (
          <SkillTree
            tree={viewState.selectedTree}
            onAddNode={handleAddNode}
            onBack={goBack}
          />
        )
      )}
    </div>
  );
}

export default App;
