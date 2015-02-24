changePasswordStyle = function (paletteOverride, styleOverride) {
  var palette = paletteOverride || {
    passive: css.color(0.897, 0.897, 0.897, 1.0),
    active: css.color(0.227, 0.529, 0.678, 1.0),
    demoForChris: css.color(0.227, 0.529, 0.678, 1.0).lighten(0.1), // lightens this color 10%
    background: css.color(1.0, 1.0, 1.0, 1.0),
    deactivated: css.color(0.6, 0.6, 0.6, 1.0)
  };

  return styleOverride || {
    general: css.merge( {
    }, css.userSelect(css.none)),
    switchBase: css.merge( {
    }, css.transition([css.marginLeft, 'cubic-bezier(0.34,1.61,0.7,1)', css.ms(250)])),
    open: {
    },
    closed: {
    },
    switchLabelBase: {
    },
    switchLabelOpen: {
    },
    switchLabelClosed: {
    }
  };
};