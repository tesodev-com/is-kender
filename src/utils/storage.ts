export function setItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) as T : null;
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

export function clear(): void {
  localStorage.clear();
}