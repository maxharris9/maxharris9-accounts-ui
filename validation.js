// XXX improve these. should this be in accounts-password instead?
//
// XXX these will become configurable, and will be validated on
// the server as well.
validateUsername = function (username) {
  if (username.length >= 3) {
    return { success: true, errorMessage: '' };
  } else {
    return { success: false, errorMessage: 'Username must be at least 3 characters long' };
  }
};

validateEmail = function (email) {
  if (email.indexOf('@') !== -1) {
    return { success: true, errorMessage: '' };
  } else {
    return { success: false, errorMessage: 'Invalid email' };
  }
};

validatePassword = function (password) {
  if (password.length >= 6) {
    return { success: true, errorMessage: '' };
  } else {
    return { success: false, errorMessage: 'Password must be at least 6 characters long' };
  }
};

/// docs!!!