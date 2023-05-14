export const getValidated = async (options) => {
  const url = `http://localhost:3001/products/`;
  const request = await fetch(url, options);
  const response = await request.json();
  return response;
}

export const update = async (options) => {
  const url = `http://localhost:3001/update/`;
  const request = await fetch(url, options);
  const response = await request.json();
  return response;
}