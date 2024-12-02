import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './SkillTree.css';

function SkillTree({ treeName, nodes, onAddBranch, onEditTreeName }) {
  const handleEditTreeName = () => {
    const newName = prompt('Enter new name for the skill tree:');
    if (newName && newName.trim() !== '') {
      onEditTreeName(newName);
    }
  };

  const handleAddBranch = (parentId, direction) => {
    onAddBranch(parentId, direction);
  };

  const renderNodes = (nodes) => {
    return nodes.map((node) => (
      <div key={node.id} className={`node tree-node ${node.direction || ''}`}>
        <FontAwesomeIcon icon={faStar} className='node-icon' />
        <span className='node-label'>{node.label}</span>
        <div className='add-branch-buttons'>
          <FontAwesomeIcon icon={faPlusCircle} className='add-branch-button' onClick={() => handleAddBranch(node.id, 'left')} />
          <FontAwesomeIcon icon={faPlusCircle} className='add-branch-button' onClick={() => handleAddBranch(node.id, 'right')} />
          <FontAwesomeIcon icon={faPlusCircle} className='add-branch-button' onClick={() => handleAddBranch(node.id, 'center')} />
        </div>
        {node.children.length > 0 && <div className='children-container'>{renderNodes(node.children)}</div>}
      </div>
    ));
  };

  return (
    <div className='skill-tree-container'>
      <div className='nodes-container tree-layout'>
        {renderNodes(nodes)}
      </div>
      <h2 onClick={handleEditTreeName} className='tree-name-label'>{treeName}</h2>
    </div>
  );
}

export default SkillTree;
