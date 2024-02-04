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

function getRowColor(note, type) {
  if (!note || type !== 'row') return;
  if (note > 35) return 'table-success';
  if (note < 20 && note > 0) return 'table-danger';
}

export default {
  isObjectEqual,
  cloneObject,
  getRowColor
}
