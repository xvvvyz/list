const setCaretPosition = (el: HTMLElement, offset: number) => {
  const range = document.createRange();
  const selection = window.getSelection();
  if (!selection) return;
  range.setStart(el.childNodes[0] || el, offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

export default setCaretPosition;
