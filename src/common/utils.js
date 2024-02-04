function isObjectEqual (object1, object2) {
  const keys1 = Object.keys(object1);
  for (let key of keys1) {
    if (object1[key].toUpperCase() !== object2[key].toUpperCase()) {
      return false;
    }
  }
  return true;
}

function cloneObject (object) {
  return Object.assign({}, object);
}

export default {
  isObjectEqual,
  cloneObject
}
