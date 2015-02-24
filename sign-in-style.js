signInStyle = function (paletteOverride, styleOverride) {
  var palette = paletteOverride || {
    passive: css.color(0.897, 0.897, 0.897, 1.0),
    active: css.color(0.227, 0.529, 0.678, 1.0),
    demoForChris: css.color(0.227, 0.529, 0.678, 1.0).lighten(0.1), // lightens this color 10%
    background: css.color(1.0, 1.0, 1.0, 1.0),
    deactivated: css.color(0.6, 0.6, 0.6, 1.0)
  };

  return styleOverride || {
    general: css.merge( {
      border: [css.px(1), css.solid, palette.passive],
      position: css.relative,
      display: css.inlineBlock,
      height: css.em(2),
      width: css.em(5),
      background: palette.background,
      borderRadius: css.px(1000),
      cursor: css.pointer,
      overflow: css.hidden,
      marginTop: css.em(0.25),
      fontWeight: 600,
      textTransform: css.uppercase
//      nestedStyle: { 'x': 'foo', 'y': 'bar' }
    }, css.userSelect(css.none)),
    loginStyle: {},
    passwordStyle: {},
    signInButtonStyle: {},
    emailStyle: {},
    switchBase: css.merge( {
      display: css.inlineBlock,
      height: css.pct(100),
      width: css.pct(40),
      borderRadius: css.pct(75),
    }, css.transition([css.marginLeft, 'cubic-bezier(0.34,1.61,0.7,1)', css.ms(250)])),
    open: {
      marginLeft: css.pct(60),
      background: palette.active
    },
    closed: {
      marginLeft: 0,
      background: palette.passive
    },
    switchLabelBase: {
      position: css.absolute,
      left: 0,
      top: 0,
      width: css.pct(100),
      lineHeight: css.em(1.85),
    },
    switchLabelOpen: {
      color: palette.active,
      paddingLeft: css.em(0.85),
      textAlign: css.left
    },
    switchLabelClosed: {
      color: palette.deactivated,
      paddingRight: css.em(0.65),
      textAlign: css.right
    }
  };
};