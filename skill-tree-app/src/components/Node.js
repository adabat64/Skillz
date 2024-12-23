import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Node.css';

function Node({ node, onAddNode, onRenameSkill }) {
  const handleAddNode = () => {
    onAddNode(node.id);
  };

  const handleRenameSkill = () => {
    if (onRenameSkill) {
      onRenameSkill(node); // Trigger rename modal for this node
    } else {
      console.error('onRenameSkill is not defined');
    }
  };

  return (
    <div className='node-container'>
      <div className='node'>
        <span
          className='node-label'
          onClick={handleRenameSkill} // Trigger rename modal
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {node.label}
        </span>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className='add-node-button'
          onClick={handleAddNode}
        />
      </div>
      <div className='children-container'>
        {node.children.map((child) => (
          <Node
            key={child.id}
            node={child}
            onAddNode={onAddNode}
            onRenameSkill={onRenameSkill} // Pass handler recursively
          />
        ))}
      </div>
    </div>
  );
}

export default Node;
