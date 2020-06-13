export const convertErrorToArray = (err: Error) => {
  try {
    return JSON.parse(err.message);
  } catch (parseError) {
    return [err];
  }
};
