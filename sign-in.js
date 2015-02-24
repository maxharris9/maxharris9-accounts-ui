loginButtonsExSetup = function (elementId, paletteOverride, styleOverride) {
  var domElement = document.getElementById(elementId);

  var dataContext = {
    guid: generateGuid(),
    style: signInStyle(paletteOverride, styleOverride),
    errorMessage: new ReactiveVar('')
  };

  renderedView = Blaze.renderWithData(Template.loginButtonsEx, dataContext, domElement);
};

Template.loginButtonsEx.rendered = function () {
};

Template.loginButtonsEx.helpers({
  statusMessage: function () {
    var data = Template.instance().data;
    return data.errorMessage.get();
  },
  guid: function () {
    var data = Template.instance().data;
    return data.guid;
  },
  emailStyle: function () {
    var data = Template.instance().data;
    return css.styleString(data.style.general);
  },
  passwordStyle: function () {
    var data = Template.instance().data;
    return css.styleString(data.style.general);
  },
  signInButtonStyle: function () {
    var data = Template.instance().data;
    return css.styleString(data.style.general);
  }
});

Template.loginButtonsEx.events({
  'click .loginButton': function (event, template) {
    console.log('clicked login button');

    login(
      null,
      trimmedElementValueById("loginEmail-" + template.data.guid),
      elementValueById("loginPassword-" + template.data.guid), // notably not trimmed. a password could (?) start or end with a space
      template.data.errorMessage
    );
  }
});

var login = function (username, email, password, errorMessageRv) {
  console.log('attempting login with: ' + username + ' password:' + password);  

  var loginSelector;
  if (username !== null) {
    var v = validateUsername(username);
    if (!v.success) {
      errorMessageRv.set('Invalid username');
      return;
    }
    else {
      loginSelector = { username: username };
    }
  } else if (email !== null) {
    var v = validateEmail(email);
    if (!v.success) {
      errorMessageRv.set(v.errorMessage);
      return;
    }
    else {
      loginSelector = { email: email };
    }
  } else {
    throw new Error("Unexpected -- no element to use as a login user selector");
  }

  console.log("loginSelector, password:", loginSelector, password);

  Meteor.loginWithPassword(loginSelector, password, function (error) {
    if (error) {
      // XXX: this is where we'd customize the login error message
      errorMessageRv.set(error.reason || "Unknown error");
    }
    else {
      errorMessageRv.set("Login successful");
    }
  });
};