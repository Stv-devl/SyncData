export const getClickedFolder = (files, fileId) => {
  const clickedFile = files?.find((file) => file.id === fileId);
  if (!clickedFile || clickedFile.type !== 'folder') return null;
  return clickedFile;
};
