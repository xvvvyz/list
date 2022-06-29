const getSelectionRange = (fallback: number) => {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return [fallback, fallback];
  const range = selection.getRangeAt(0);
  return [range.startOffset, range.endOffset];
};

export default getSelectionRange;
