newAccountSetup = function (elementId, paletteOverride, styleOverride) {
  var domElement = document.getElementById(elementId);

  var dataContext = {
    guid: generateGuid(),
//  style: style(paletteOverride, styleOverride),
    errorMessage: new ReactiveVar('')
  };

  renderedView = Blaze.renderWithData(Template.newAccount, dataContext, domElement);
};

Template.newAccount.rendered = function () {
};

Template.newAccount.helpers({
  statusMessage: function () {
    var data = Template.instance().data;
    return data.errorMessage.get();
  },
  guid: function () {
    var data = Template.instance().data;
    return data.guid;
  }
});

Template.newAccount.events({
  'click #signupButton': function (event, template) {
    console.log('clicked signup button');

    signup(
      null,
      trimmedElementValueById("newAccountEmail-" + template.data.guid),
      elementValueById("newAccountPassword-" + template.data.guid), // notably not trimmed. a password could (?) start or end with a space
      template.data.errorMessage
    );
  }
});

var signup = function (username, email, password, errorMessageRv) {
  var options = {}; // to be passed to Accounts.createUser

  if (username !== null) {
    var v = validateUsername(username);
    if (!v.success) {
      errorMessageRv.set(v.errorMessage);
      return;
    }
    else {
      options.username = username;
    }
  }

  if (email !== null) {
    var v = validateEmail(email);
    if (!v.success) {
      errorMessageRv.set(v.errorMessage);
      return;
    }
    else {
      options.email = email;
    }
  }

  if (password !== null) {
    var v = validatePassword(password);
    if (!v.success) {
      errorMessageRv.set(v.errorMessage);
      return;
    }
    else {
      options.password = password;
    }
  }

  Accounts.createUser(options, function (error) {
    if (error) {
      errorMessageRv.set(error.reason || "Unknown error");
    } else {
      errorMessageRv.set("Account creation successful");
    }
  });
};