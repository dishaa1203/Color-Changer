const Storage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  load(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn(`Storage error for key "${key}", resetting.`);
      return fallback;
    }
  }
};
