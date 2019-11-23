module.exports = input => {
  for (var key in input) {
    if (input[key].trim() === "") {
      return false;
    }
  }
  return true;
};
