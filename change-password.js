changePasswordSetup = function (elementId, paletteOverride, styleOverride) {
  var domElement = document.getElementById(elementId);

  var dataContext = {
    guid: generateGuid(),
    style: changePasswordStyle(paletteOverride, styleOverride),
    errorMessage: new ReactiveVar('')
  };

  renderedView = Blaze.renderWithData(Template.changePassword, dataContext, domElement);
};

Template.changePassword.rendered = function () {
};

Template.changePassword.helpers({
  statusMessage: function () {
    var data = Template.instance().data;
    return data.errorMessage.get();
  },
  guid: function () {
    var data = Template.instance().data;
    return data.guid;
  }
});

Template.changePassword.events({
  'click .changePasswordButton': function (event, template) {
    console.log('clicked change password button');

    changePassword(
      elementValueById("newPassword-" + template.data.guid), // notably not trimmed. a password could (?) start or end with a space
      elementValueById("existingPassword-" + template.data.guid), // notably not trimmed. a password could (?) start or end with a space
      template.data.errorMessage
    );
  }
});

var changePassword = function (oldPassword, password, errorMessageRv) {
  var v = validatePassword(password);
  if (!v.success) {
    errorMessageRv.set(v.errorMessage);
    return;
  }

  Accounts.changePassword(oldPassword, password, function (error) {
    if (error) {
      errorMessageRv.set(error.reason || "Unknown error");
    } else {
      errorMessageRv.set("Password changed");
    }
  });
};