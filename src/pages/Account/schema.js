export default {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  display_name: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 256
    }
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 11
    }
  },
  address: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 256
    }
  }
};
