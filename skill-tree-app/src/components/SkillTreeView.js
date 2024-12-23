import React from 'react';
import SkillTree from './SkillTree';

function SkillTreeView({ 
  tree, 
  onBack, 
  onRenameTree, 
  onAddNode, 
  onRenameSkill 
}) {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Tree Name */}
        <h2
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#ffd700',
          }}
          onClick={onRenameTree}
        >
          {tree.name}
        </h2>
        <button onClick={onBack} style={{ marginRight: '10px' }}>Back</button>
      </div>

      {/* Render the SkillTree Component */}
      <SkillTree
        tree={tree}
        onAddNode={onAddNode}
        onRenameSkill={onRenameSkill}
      />
    </div>
  );
}

export default SkillTreeView;
