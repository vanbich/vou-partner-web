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
      minimum: 6
    }
  },
  display_name:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 256
    }
  },
};
