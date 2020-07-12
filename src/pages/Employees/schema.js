export default {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6
    }
  },
  displayName:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 256
    }
  },
};
