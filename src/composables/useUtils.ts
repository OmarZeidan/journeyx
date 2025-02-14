export const useUtils = () => {
  const resetObject = (objectData: Record<string, string>) => {
    for (const key in objectData) {
      objectData[key] = "";
    }
  };

  return {
    resetObject,
  };
};
