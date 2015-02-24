Package.describe({
  summary: 'Flexible replacement for accounts-ui-unstyled',
  version: '0.0.1',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use(['templating', 'reactive-var', 'tracker', 'accounts-base', 'accounts-password', 'maxharris9:template-instance-utils', 'maxharris9:straightsix'], 'client');

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  // Allow us to call Accounts.oauth.serviceNames, if there are any OAuth
  // services.
  api.use('accounts-oauth', { weak: true } );
  // Allow us to directly test if accounts-password (which doesn't use
  // Accounts.oauth.registerService) exists.
  api.use('accounts-password', { weak: true } );

  api.addFiles([
    'validation.js',
    'accounts-ui-good.js',
    'sign-in.html',
    'sign-in-style.js',
    'sign-in.js',
    'new-account.html',
    'new-account.js',
    'change-password.html',
    'change-password-style.js',
    'change-password.js'], 'client');
  api.export(['loginButtonsExSetup', 'newAccountSetup', 'changePasswordSetup'], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('accounts-ui-good');
  api.addFiles('accounts-ui-good-tests.js');
});