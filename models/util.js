
const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';

    if (
      !isValidObjectId(obj[k]) &&
      typeof obj[k] === 'object' &&
      obj[k] &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      const newKey = pre + k;
      acc[newKey] = obj[k];
    }

    return acc;
  }, {});
};


module.exports = {
  flattenObject
};