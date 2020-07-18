export default {
  // firstName: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   length: {
  //     maximum: 32
  //   }
  // },
  // lastName: {
  //   presence: { allowEmpty: false, message: 'is required' },
  //   length: {
  //     maximum: 32
  //   }
  // },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },

};
