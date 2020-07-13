export default {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6
    }
  },
  confirm: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6
    }
  },
};
