import utils from '../common/utils.js';

describe('Utils functions', () => { 

  describe('isObjectEqual', () => { 
    it('should return undefined if first param is not an object', done => {
      const object1 = '';
      const object2 = {};
      expect(utils.isObjectEqual(object1, object2)).toBe(undefined);
      done();
    });

    it('should return undefined if second param is not an object', done => {
      const object1 = {};
      const object2 = '';
      expect(utils.isObjectEqual(object1, object2)).toBe(undefined);
      done();
    });

    it('should return undefined if both params are not objects', done => {
      const object1 = '';
      const object2 = '';
      expect(utils.isObjectEqual(object1, object2)).toBe(undefined);
      done();
    });

    it('should return false if both objects do not have same keys', done => {
      const object1 = {
        lastName : 'Dupont',
        firstName : 'Antoine',
        birthDate : '2004-01-01'
      };
      const object2 = {
        nom : 'Dupont',
        prénom : 'Antoine',
        dateDeNaissance : '2004-01-01'
      };
      expect(utils.isObjectEqual(object1, object2)).toBe(false);
      done();
    });

    it('should return false if both objects do not have same values', done => {
      const object1 = {
        lastName : 'Dupont',
        firstName : 'Antoine',
        birthDate : '2004-01-01'
      };
      const object2 = {
        lastName : 'Dupont',
        firstName : 'Maxime',
        birthDate : '2004-01-01'
      };
      expect(utils.isObjectEqual(object1, object2)).toBe(false);
      done();
    });

    it('should return true if both objects are equals', done => {
      const object1 = {
        lastName : 'Dupont',
        firstName : 'Antoine',
        birthDate : '2004-01-01'
      };
      const object2 = {
        lastName : 'Dupont',
        firstName : 'Antoine',
        birthDate : '2004-01-01'
      };
      expect(utils.isObjectEqual(object1, object2)).toBe(true);
      done();
    });

    it('should return true if both objects are equals with upper case and lower case', done => {
      const object1 = {
        lastName : 'Dupont',
        firstName : 'Antoine',
        birthDate : '2004-01-01'
      };
      const object2 = {
        lastName : 'DUPONT',
        firstName : 'ANTOINE',
        birthDate : '2004-01-01'
      };
      expect(utils.isObjectEqual(object1, object2)).toBe(true);
      done();
    });
  });

  describe('cloneObject', () => { 
    it('should return undefined is param is not an object', done => {
      expect(utils.cloneObject('')).toBe(undefined);
      done();
    });

    it('should return same keys', done => {
      const myObject = {
        lastName : 'Dupont',
        firstName : 'Antoine'
      };
      const myClonedObject = utils.cloneObject(myObject);
      expect(Object.keys(myClonedObject).length).toBe(2);
      expect(Object.keys(myClonedObject)).toStrictEqual(['lastName', 'firstName']);
      done();
    });

    it('should return same values', done => {
      const myObject = {
        lastName : 'Dupont',
        firstName : 'Antoine'
      };
      const myClonedObject = utils.cloneObject(myObject);
      expect(myClonedObject.lastName).toBe(myObject.lastName);
      expect(myClonedObject.firstName).toBe(myObject.firstName);
      done();
    });
  });

  describe('getRowColor', () => { 
    it('should return undefined if first param is not a number', done => {
      expect(utils.getRowColor({})).toBe(undefined);
      done();
    });

    it('should return undefined if second param is not a string', done => {
      expect(utils.getRowColor(1, {})).toBe(undefined);
      done();
    });

    it('should return undefined if there is no second param', done => {
      expect(utils.getRowColor(1)).toBe(undefined);
      done();
    });

    it('should return undefined if second param is not "row"', done => {
      expect(utils.getRowColor(1, 'column')).toBe(undefined);
      done();
    });

    it('should return undefined if note is < 36 and > 19', done => {
      expect(utils.getRowColor(30, 'row')).toBe(undefined);
      done();
    });

    it('should return undefined if note is < 0', done => {
      expect(utils.getRowColor(-1, 'row')).toBe(undefined);
      done();
    });
 
    it('should return "table-success" if note > 35', done => {
      expect(utils.getRowColor(36, 'row')).toBe('table-success');
      done();
    });

    it('should return "table-danger" if note < 20 and > -1', done => {
      expect(utils.getRowColor(19, 'row')).toBe('table-danger');
      done();
    });
  });

  describe('getCardColor', () => { 
    it('should return undefined if param is not a number', done => {
      expect(utils.getCardColor({})).toBe(undefined);
      done();
    });

    it('should return undefined if note is < 0', done => {
      expect(utils.getCardColor(-1)).toBe(undefined);
      done();
    });
 
    it('should return "success" if note > 35', done => {
      expect(utils.getCardColor(36)).toBe('success');
      done();
    });

    it('should return "danger" if note < 20 and > -1', done => {
      expect(utils.getCardColor(19)).toBe('danger');
      done();
    });
  });

  describe('getLearnerDetails', () => { 
    it('should return undefined if param is not an object', done => {
      expect(utils.getLearnerDetails('Hello')).toBe(undefined);
      done();
    });

    it('should return a string concatenation with formatted date', done => {
      const learner = {
        firstName : 'Doe',
        lastName : 'John',
        birthDate : '1980-01-01'
      }
      expect(utils.getLearnerDetails(learner)).toBe('John Doe 01/01/1980');
      done();
    });
  });

  describe('getCardHeaderTextColor', () => { 
    it('should return undefined if param is not a number', done => {
      expect(utils.getCardHeaderTextColor('Hello')).toBe(undefined);
      done();
    });

    it('should return undefined if note is < 36', done => {
      expect(utils.getCardHeaderTextColor(35)).toBe(undefined);
      done();
    });

    it('should return undefined if note is > 19', done => {
      expect(utils.getCardHeaderTextColor(20)).toBe(undefined);
      done();
    });

    it('should return "light" if note is > 35', done => {
      expect(utils.getCardHeaderTextColor(36)).toBe('light');
      done();
    });
    it('should return "light" if note is < 20', done => {
      expect(utils.getCardHeaderTextColor(19)).toBe('light');
      done();
    });
  });
});
