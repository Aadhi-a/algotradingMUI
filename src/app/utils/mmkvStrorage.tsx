// utils/storage.ts
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

// Set value
export const setStorage = (
  key: string,
  value: string | number | boolean | object
) => {
  if (typeof value === "object") {
    storage.set(key, JSON.stringify(value)); // convert object → string
  } else {
    storage.set(key, value);
  }
};

// Get string value (can be undefined)
export const getStorage = (key: string): string | undefined =>
  storage.getString(key);

// Get number value (optional)
export const getNumberStorage = (key: string): number | undefined =>
  storage.getNumber(key);

// Get boolean value (optional)
export const getBooleanStorage = (key: string): boolean | undefined =>
  storage.getBoolean(key);

// Remove a key
export const removeStorage = (key: string) => storage.delete(key);

// Clear all storage
export const clearAllStorage = () => storage.clearAll();
