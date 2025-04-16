export const getSections = async () => {
  const response = await fetch('/api/section');
  const data = await response.json();

  return data;
};
