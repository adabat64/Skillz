import React from 'react';
import Node from './Node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './SkillTree.css';

function SkillTree({ tree, onAddNode, onBack, onRename }) {
  return (
    <div className='skill-tree-container'>
      <button className='back-button' onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <h2 onClick={onRename} className='tree-name-label'>
        {tree.name}
      </h2>
      <div className='nodes-container'>
        {tree.nodes.map((node) => (
          <Node key={node.id} node={node} onAddNode={onAddNode} />
        ))}
      </div>
    </div>
  );
}

export default SkillTree;
