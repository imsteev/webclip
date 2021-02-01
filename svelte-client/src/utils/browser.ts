export const copyToClipboard = (content: string): Promise<void> =>
  navigator.clipboard.writeText(content);

export const saveToLocalStorage = (key: string, value: any): void => {
  console.log("saving");
  window.localStorage.setItem(key, JSON.stringify(value));
};
