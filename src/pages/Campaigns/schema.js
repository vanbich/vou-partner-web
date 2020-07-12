export default {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  promo_code: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 5
    }
  },
  description:{
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 256
    }
  },
  num_of_voucher:{
    presence: { allowEmpty: false, message: 'is required' },
  },
  discount: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};
