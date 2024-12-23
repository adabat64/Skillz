export const addNodeToTree = (nodes, parentId, nextNodeId) => {
  return nodes.map((node) => {
    if (node.id === parentId) {
      const newNode = {
        id: nextNodeId,
        label: `Skill ${nextNodeId}`,
        children: [],
      };
      return { ...node, children: [...node.children, newNode] };
    }
    return { ...node, children: addNodeToTree(node.children, parentId, nextNodeId) };
  });
};

export const renameSkillInTree = (nodes, skillId, newLabel) => {
  return nodes.map((node) => {
    if (node.id === skillId) {
      return { ...node, label: newLabel };
    }
    return { ...node, children: renameSkillInTree(node.children, skillId, newLabel) };
  });
};
