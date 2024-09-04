export const checkToken = () => {
  const results = localStorage.getItem("hakiki-auth");
  if (results) {
    const toJSON = JSON.parse(results);
    return `Bearer ${toJSON.ACCESS_TOKEN}`;
  } else {
    return null;
  }
};
