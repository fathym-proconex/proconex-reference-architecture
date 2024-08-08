export function createDocPath(
  workspaceLookup: string,
  workflowLookup?: string,
  segmentPath?: string,
  docLookup?: string,
): string {
  let filePath = new URL(`https://notused.com/${workspaceLookup}/`);

  if (workflowLookup) {
    filePath = new URL(`${workflowLookup}/`, filePath);
  }

  if (segmentPath) {
    filePath = new URL(`${segmentPath}/`, filePath);
  }

  if (docLookup) {
    filePath = new URL(`${docLookup}/`, filePath);
  }

  return filePath.pathname;
}
