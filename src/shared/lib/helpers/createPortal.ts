/**
 * Create portal root
 * @param {string} id - attribute id
 * @returns {HTMLDivElement} - portal root
 */
export const createPortalRoot = (id: string) => {
  const root = document.createElement("div");
  root.setAttribute("id", id);

  return root;
};
