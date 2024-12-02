import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './SkillTree.css';

function SkillTree({ treeName, nodes, onAddNode, onDeleteNode, onEditNode, onEditTreeName }) {
  const handleEditNode = (nodeId) => {
    const newLabel = prompt('Enter new label for the skill node:');
    if (newLabel && newLabel.trim() !== '') {
      onEditNode(nodeId, newLabel);
    }
  };

  const handleEditTreeName = () => {
    const newName = prompt('Enter new name for the skill tree:');
    if (newName && newName.trim() !== '') {
      onEditTreeName(newName);
    }
  };

  return (
    <div className='skill-tree-container'>
      <div className='nodes-container tree-layout'>
        {[...nodes].reverse().map((node) => (
          <div key={node.id} className='node tree-node'>
            <FontAwesomeIcon icon={faStar} className='node-icon' />
            <span onClick={() => handleEditNode(node.id)} className='node-label'>
              {node.label}
            </span>
            <button className='delete-node-button' onClick={() => onDeleteNode(node.id)}>Delete</button>
          </div>
        ))}
      </div>
      <h2 onClick={handleEditTreeName} className='tree-name-label'>{treeName}</h2>
      <button className='add-node-button' onClick={onAddNode}>
        Add Skill Node
      </button>
    </div>
  );
}

export default SkillTree;
