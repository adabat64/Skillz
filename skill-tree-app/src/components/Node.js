import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Node.css';

function Node({ node, onAddNode }) {
  const handleAddNode = () => {
    onAddNode(node.id);
  };

  return (
    <div className='node-container'>
      <div className='node'>
        <span className='node-label'>{node.label}</span>
        <FontAwesomeIcon
          icon={faPlusCircle}
          className='add-node-button'
          onClick={handleAddNode}
        />
      </div>
      <div className='children-container'>
        {node.children.map((child) => (
          <Node key={child.id} node={child} onAddNode={onAddNode} />
        ))}
      </div>
    </div>
  );
}

export default Node;
