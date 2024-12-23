import React from 'react';
import Node from './Node';

function SkillTree({ tree, onAddNode, onRenameSkill }) {
  return (
    <div>
      {/* Render Tree Nodes */}
      {tree.nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          onAddNode={onAddNode}
          onRenameSkill={onRenameSkill}
        />
      ))}
    </div>
  );
}

export default SkillTree;
