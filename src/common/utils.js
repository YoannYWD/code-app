import dayjs from 'dayjs';

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

function getRowColor (note, type) {
  if (!note || type !== 'row') return;
  if (note > 35) return 'table-success';
  if (note < 20 && note > -1) return 'table-danger';
}

function getCardColor (note) {
  if (note > 35) return 'success';
  if (note < 20) return 'danger';
}

function getLearnerDetails (learner) {
  return learner.lastName + ' ' + learner.firstName + ' ' + dayjs(learner.birthDate).format('DD/MM/YYYY');
}

function getCardHeaderTextColor (note) {
  if (note > 35 || note < 20) return 'light';
  return;
}

export default {
  isObjectEqual,
  cloneObject,
  getRowColor,
  getCardColor,
  getLearnerDetails,
  getCardHeaderTextColor
}
