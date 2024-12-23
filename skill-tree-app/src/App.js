import React, { useState, useEffect, useRef } from 'react';
import SkillTreeView from './components/SkillTreeView';
import RenameModal from './components/RenameModal';
import { addNodeToTree, renameSkillInTree } from './utils/treeUtils';
import './App.css';
import backgroundImage from './assets/space-background.jpg';

function App() {
  const [skillTrees, setSkillTrees] = useState([]);
  const [viewState, setViewState] = useState({ depth: 1, selectedTree: null });
  const [nextNodeId, setNextNodeId] = useState(2);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [currentTreeToRename, setCurrentTreeToRename] = useState(null);
  const [newTreeName, setNewTreeName] = useState('');
  const [isRenameSkillModalOpen, setIsRenameSkillModalOpen] = useState(false);
  const [currentSkillToRename, setCurrentSkillToRename] = useState(null);
  const [newSkillName, setNewSkillName] = useState('');

  const hasAddedInitialTree = useRef(false);

  useEffect(() => {
    if (!hasAddedInitialTree.current) {
      addSkillTree();
      hasAddedInitialTree.current = true;
    }
  }, []);

  const addSkillTree = () => {
    const newTree = {
      id: skillTrees.length + 1,
      name: `Skill Tree ${skillTrees.length + 1}`,
      nodes: [{ id: 1, label: 'Skill 1', children: [] }],
    };
    setSkillTrees((prevTrees) => [...prevTrees, newTree]);
  };

  const handleAddNode = (parentId) => {
    if (!viewState.selectedTree) return;

    setSkillTrees((prevTrees) => {
      const updatedTrees = prevTrees.map((tree) => {
        if (tree.id === viewState.selectedTree.id) {
          const updatedNodes = addNodeToTree(tree.nodes, parentId, nextNodeId);
          return { ...tree, nodes: updatedNodes };
        }
        return tree;
      });

      const updatedSelectedTree = updatedTrees.find(
        (tree) => tree.id === viewState.selectedTree.id
      );
      setViewState((prevState) => ({
        ...prevState,
        selectedTree: updatedSelectedTree,
      }));

      return updatedTrees;
    });

    setNextNodeId((prevId) => prevId + 1);
  };

  const openRenameSkillModal = (skill) => {
    setCurrentSkillToRename(skill);
    setNewSkillName(skill.label);
    setIsRenameSkillModalOpen(true);
  };

  const handleRenameSkill = () => {
    if (!currentSkillToRename || !viewState.selectedTree) return;

    setSkillTrees((prevTrees) => {
      const updatedTrees = prevTrees.map((tree) => {
        if (tree.id === viewState.selectedTree.id) {
          const updatedNodes = renameSkillInTree(tree.nodes, currentSkillToRename.id, newSkillName);
          return { ...tree, nodes: updatedNodes };
        }
        return tree;
      });

      const updatedSelectedTree = updatedTrees.find(
        (tree) => tree.id === viewState.selectedTree.id
      );
      setViewState((prevState) => ({
        ...prevState,
        selectedTree: updatedSelectedTree,
      }));

      return updatedTrees;
    });

    setIsRenameSkillModalOpen(false);
    setCurrentSkillToRename(null);
  };

  const openRenameModal = (tree) => {
    setCurrentTreeToRename(tree);
    setNewTreeName(tree.name);
    setIsRenameModalOpen(true);
  };

  const handleRenameTree = () => {
    if (!currentTreeToRename) return;

    setSkillTrees((prevTrees) => {
      const updatedTrees = prevTrees.map((tree) =>
        tree.id === currentTreeToRename.id ? { ...tree, name: newTreeName } : tree
      );

      const updatedSelectedTree = updatedTrees.find(
        (tree) => tree.id === currentTreeToRename.id
      );

      setViewState((prevState) => ({
        ...prevState,
        selectedTree: updatedSelectedTree,
      }));

      return updatedTrees;
    });

    setIsRenameModalOpen(false);
    setCurrentTreeToRename(null);
  };

  const handleSelectTree = (tree) => {
    setViewState({ depth: 2, selectedTree: tree });
  };

  const goBack = () => {
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
          <h1 className='app-title'>Skill Tree</h1>
          {skillTrees.map((tree) => (
            <div key={tree.id} className="skill-tree-item">
              <button onClick={() => handleSelectTree(tree)}>{tree.name}</button>
            </div>
          ))}
          <button onClick={addSkillTree}>Add New Skill Tree</button>
        </div>
      ) : (
        viewState.selectedTree && (
          <SkillTreeView
            tree={viewState.selectedTree}
            onBack={goBack}
            onRenameTree={() => openRenameModal(viewState.selectedTree)}
            onAddNode={handleAddNode}
            onRenameSkill={openRenameSkillModal}
          />
        )
      )}

      {isRenameModalOpen && (
        <RenameModal
          title="Rename Skill Tree"
          value={newTreeName}
          onChange={setNewTreeName}
          onSave={handleRenameTree}
          onCancel={() => setIsRenameModalOpen(false)}
        />
      )}

      {isRenameSkillModalOpen && (
        <RenameModal
          title="Rename Skill"
          value={newSkillName}
          onChange={setNewSkillName}
          onSave={handleRenameSkill}
          onCancel={() => setIsRenameSkillModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
