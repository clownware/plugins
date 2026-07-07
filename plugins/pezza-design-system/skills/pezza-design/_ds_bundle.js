/* @ds-bundle: {"format":3,"namespace":"PezzaDesignSystem_8fc740","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"MetaRow","sourcePath":"components/music/MetaRow.jsx"},{"name":"WaveBar","sourcePath":"components/music/WaveBar.jsx"}],"sourceHashes":{"components/core/Button.jsx":"14e390c4d929","components/core/IconButton.jsx":"994ea3b3f3ac","components/display/Avatar.jsx":"9c3128b0c0e9","components/display/Badge.jsx":"71c301bcddbd","components/display/Card.jsx":"354ecd981e85","components/display/Tag.jsx":"8c0834e994ac","components/forms/Checkbox.jsx":"b7978ec8bd91","components/forms/Input.jsx":"3cf4019036e1","components/forms/Select.jsx":"f84479dcb6e0","components/forms/Switch.jsx":"0cc34cd8e382","components/music/MetaRow.jsx":"92b039bef6ab","components/music/WaveBar.jsx":"2af82652f628","ui_kits/app/AddPanel.jsx":"2ccba1aeda57","ui_kits/app/AppIcons.jsx":"6f5dfeebb17d","ui_kits/app/AppShell.jsx":"376b42d1a21a","ui_kits/app/RecordCard.jsx":"7e94c1695425","ui_kits/app/Sidebar.jsx":"ee5c2f81d623","ui_kits/app/data.js":"513a6c291cab","ui_kits/site/SiteApp.jsx":"a915e9f61ebd","ui_kits/site/SiteIcons.jsx":"c3ec938e0794","ui_kits/site/data.js":"16e6dfd4d607"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PezzaDesignSystem_8fc740 = window.PezzaDesignSystem_8fc740 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pezza Button — geometric grotesque label, restrained rounding,
 * confident motion. Variants map to the monochrome brand: solid ink,
 * outline hairline, ghost, and a sparing accent.
 */
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padding: '0 14px',
      font: 'var(--text-lg)',
      gap: 7
    },
    md: {
      height: 40,
      padding: '0 20px',
      font: 'var(--text-lg)',
      gap: 8
    },
    lg: {
      height: 48,
      padding: '0 28px',
      font: 'var(--text-xl)',
      gap: 10
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'hsl(var(--text-strong))',
      color: 'hsl(var(--text-inverse))',
      border: '1px solid hsl(var(--text-strong))'
    },
    secondary: {
      background: 'transparent',
      color: 'hsl(var(--text-strong))',
      border: '1px solid hsl(var(--border-strong))'
    },
    ghost: {
      background: 'transparent',
      color: 'hsl(var(--text-body))',
      border: '1px solid transparent'
    },
    accent: {
      background: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-ink))',
      border: '1px solid hsl(var(--accent))'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      font: `var(--weight-medium) ${s.font}/1 var(--font-ui)`,
      letterSpacing: '0.01em',
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pezza IconButton — square, hairline or ghost, for toolbar / nav actions.
 * Pass an inline SVG or icon node as children.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  label,
  active = false,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size] || dims.md;
  const variants = {
    ghost: {
      background: active ? 'hsl(var(--bg-sunken))' : 'transparent',
      color: active ? 'hsl(var(--text-strong))' : 'hsl(var(--text-muted))',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'hsl(var(--text-body))',
      border: '1px solid hsl(var(--border-soft))'
    },
    solid: {
      background: 'hsl(var(--text-strong))',
      color: 'hsl(var(--text-inverse))',
      border: '1px solid hsl(var(--text-strong))'
    }
  };
  const v = variants[variant] || variants.ghost;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      ...v,
      ...style
    },
    onMouseEnter: e => {
      if (!active && variant === 'ghost') e.currentTarget.style.background = 'hsl(var(--bg-sunken))';
    },
    onMouseLeave: e => {
      if (!active && variant === 'ghost') e.currentTarget.style.background = 'transparent';
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.92)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza avatar — square-rounded or round, ink fallback with initials or the emblem. */
function Avatar({
  src,
  alt = '',
  initials,
  size = 40,
  shape = 'round',
  emblem = false,
  style,
  ...rest
}) {
  const radius = shape === 'square' ? 'var(--radius-md)' : 'var(--radius-round)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: 'none',
      borderRadius: radius,
      overflow: 'hidden',
      background: 'hsl(var(--ink-1000))',
      color: 'hsl(var(--ink-0))',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semi)',
      fontSize: Math.round(size * 0.4),
      letterSpacing: '0.02em',
      userSelect: 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : emblem ? /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/emblem-white.png",
    alt: alt,
    style: {
      width: '54%',
      height: '54%',
      objectFit: 'contain'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza badge — small status pill. Mono label, muted tones, optional dot. */
function Badge({
  tone = 'neutral',
  dot = false,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      bg: 'hsl(var(--bg-sunken))',
      fg: 'hsl(var(--text-muted))',
      dotC: 'hsl(var(--text-faint))'
    },
    ink: {
      bg: 'hsl(var(--text-strong))',
      fg: 'hsl(var(--text-inverse))',
      dotC: 'hsl(var(--text-inverse))'
    },
    accent: {
      bg: 'rgba(0,229,192,0.14)',
      fg: 'hsl(var(--accent-dim))',
      dotC: 'hsl(var(--accent))'
    },
    ok: {
      bg: 'rgba(61,214,140,0.14)',
      fg: 'hsl(var(--ok))',
      dotC: 'hsl(var(--ok))'
    },
    warn: {
      bg: 'rgba(232,178,58,0.16)',
      fg: 'hsl(var(--warn))',
      dotC: 'hsl(var(--warn))'
    },
    err: {
      bg: 'rgba(242,88,91,0.14)',
      fg: 'hsl(var(--err))',
      dotC: 'hsl(var(--err))'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      padding: '0 9px',
      background: t.bg,
      color: t.fg,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dotC,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza surface card — flat, hairline border, minimal elevation. Depth comes from contrast. */
function Card({
  as: Tag = 'div',
  padding = 'md',
  interactive = false,
  elevated = false,
  children,
  style,
  ...rest
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  };
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: e => {
      setHover(true);
      rest.onMouseEnter && rest.onMouseEnter(e);
    },
    onMouseLeave: e => {
      setHover(false);
      rest.onMouseLeave && rest.onMouseLeave(e);
    },
    style: {
      background: 'hsl(var(--bg-surface))',
      border: '1px solid hsl(var(--border-soft))',
      borderRadius: 'var(--radius-lg)',
      padding: pads[padding] ?? pads.md,
      boxShadow: elevated ? 'var(--shadow-md)' : 'var(--shadow-none)',
      transition: 'transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : 'default',
      ...(interactive && hover ? {
        borderColor: 'hsl(var(--border-strong))',
        transform: 'translateY(-2px)',
        boxShadow: 'var(--shadow-md)'
      } : null),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza tag — hairline chip, optional remove affordance. For filters, key/genre. */
function Tag({
  mono = true,
  removable = false,
  onRemove,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 26,
      padding: '0 10px',
      background: 'hsl(var(--bg-surface))',
      border: '1px solid hsl(var(--border-soft))',
      color: 'hsl(var(--text-body))',
      borderRadius: 'var(--radius-sm)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
      fontSize: 'var(--text-sm)',
      letterSpacing: mono ? 'var(--tracking-mono)' : '0',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children, removable && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 14,
      height: 14,
      padding: 0,
      border: 'none',
      background: 'transparent',
      color: 'hsl(var(--text-faint))',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 9 9"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l7 7M8 1l-7 7",
    stroke: "currentColor",
    strokeWidth: "1.3",
    strokeLinecap: "round"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza checkbox — square, hairline, accent fill with a draw-on check. */
function Checkbox({
  checked,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  const box = /*#__PURE__*/React.createElement("span", _extends({
    onClick: toggle,
    role: "checkbox",
    "aria-checked": isOn,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      flex: 'none',
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${isOn ? 'hsl(var(--accent))' : 'hsl(var(--border-strong))'}`,
      background: isOn ? 'hsl(var(--accent))' : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    style: {
      opacity: isOn ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6.2L5 8.7L9.6 3.4",
    stroke: "hsl(var(--accent-ink))",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
  if (!label) return box;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, box, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--text-body))'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza text input — hairline field, accent focus ring, mono-friendly. */
function Input({
  size = 'md',
  invalid = false,
  mono = false,
  prefix = null,
  suffix = null,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      font: 'var(--text-lg)',
      pad: 10
    },
    md: {
      height: 40,
      font: 'var(--text-xl)',
      pad: 12
    },
    lg: {
      height: 48,
      font: 'var(--text-xl)',
      pad: 14
    }
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: s.height,
      padding: `0 ${s.pad}px`,
      background: 'hsl(var(--bg-surface))',
      border: `1px solid ${invalid ? 'hsl(var(--err))' : focused ? 'hsl(var(--accent))' : 'hsl(var(--border-soft))'}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focused && !invalid ? '0 0 0 3px rgba(0,229,192,0.18)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'hsl(var(--text-faint))',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'hsl(var(--text-strong))',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-ui)',
      fontSize: s.font,
      letterSpacing: mono ? 'var(--tracking-mono)' : '0'
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'hsl(var(--text-faint))',
      display: 'inline-flex',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-base)'
    }
  }, suffix));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza select — hairline field matching Input, custom chevron. */
function Select({
  size = 'md',
  invalid = false,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      font: 'var(--text-lg)',
      pad: 10
    },
    md: {
      height: 40,
      font: 'var(--text-xl)',
      pad: 12
    },
    lg: {
      height: 48,
      font: 'var(--text-xl)',
      pad: 14
    }
  };
  const s = sizes[size] || sizes.md;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: style?.width || 'auto'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: s.height,
      padding: `0 ${s.pad + 22}px 0 ${s.pad}px`,
      background: 'hsl(var(--bg-surface))',
      color: 'hsl(var(--text-strong))',
      border: `1px solid ${invalid ? 'hsl(var(--err))' : focused ? 'hsl(var(--accent))' : 'hsl(var(--border-soft))'}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focused && !invalid ? '0 0 0 3px rgba(0,229,192,0.18)' : 'none',
      fontFamily: 'var(--font-ui)',
      fontSize: s.font,
      cursor: 'pointer',
      outline: 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }), children), /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    style: {
      position: 'absolute',
      right: s.pad,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 4.5L6 8L9.5 4.5",
    stroke: "hsl(var(--text-muted))",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Pezza toggle switch — ink track, snaps with crossfade easing; accent when on. */
function Switch({
  checked,
  onChange,
  disabled = false,
  label,
  style,
  ...rest
}) {
  const [internal, setInternal] = React.useState(false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  const sw = /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": isOn,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: 44,
      height: 26,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      background: isOn ? 'hsl(var(--accent))' : 'hsl(var(--border-strong))',
      transition: 'background var(--dur-base) var(--ease-crossfade)',
      padding: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: isOn ? 21 : 3,
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-round)',
      background: 'hsl(var(--ink-0))',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-crossfade)'
    }
  }));
  if (!label) return sw;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, sw, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--text-body))'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/music/MetaRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pezza MetaRow — a single tracklist / release-credit line in Space Mono.
 * The metadata register: index, title, and right-aligned technical tags.
 */
function MetaRow({
  index,
  title,
  artist,
  bpm,
  musicKey,
  duration,
  active = false,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    style: {
      display: 'grid',
      gridTemplateColumns: '28px 1fr auto',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'hsl(var(--bg-raised))' : 'transparent',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-mono)',
      transition: 'background var(--dur-fast) var(--ease-out)',
      ...style
    },
    onMouseEnter: e => {
      if (onClick && !active) e.currentTarget.style.background = 'hsl(var(--bg-sunken))';
    },
    onMouseLeave: e => {
      if (onClick && !active) e.currentTarget.style.background = 'transparent';
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: active ? 'hsl(var(--accent))' : 'hsl(var(--text-faint))'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--text-strong))'
    }
  }, title), artist && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--text-muted))'
    }
  }, " \u2014 ", artist)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 'var(--space-4)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-muted))',
      letterSpacing: 'var(--tracking-mono)'
    }
  }, bpm && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'hsl(var(--accent))'
    }
  }, bpm, " BPM"), musicKey && /*#__PURE__*/React.createElement("span", null, musicKey), duration && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'hsl(var(--text-faint))'
    }
  }, duration)));
}
Object.assign(__ds_scope, { MetaRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/music/MetaRow.jsx", error: String((e && e.message) || e) }); }

// components/music/WaveBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Pezza WaveBar — the audio-waveform motif. Accent bars on a dark track,
 * with a played/un-played split at `progress`. Deterministic bars from a seed
 * so it renders identically on server/print.
 */
function WaveBar({
  bars = 48,
  progress = 0.4,
  height = 48,
  seed = 7,
  playedColor,
  style,
  ...rest
}) {
  // simple deterministic PRNG
  let s = seed;
  const rnd = () => {
    s = s * 1103515245 + 12345 & 0x7fffffff;
    return s % 1000 / 1000;
  };
  const heights = Array.from({
    length: bars
  }, () => 0.18 + rnd() * 0.82);
  const playedIdx = Math.floor(bars * progress);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height,
      width: '100%',
      ...style
    }
  }, rest), heights.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: `${Math.round(h * 100)}%`,
      minWidth: 2,
      borderRadius: 2,
      background: i <= playedIdx ? playedColor || 'hsl(var(--accent))' : 'hsl(var(--border-strong))',
      opacity: i <= playedIdx ? 1 : 0.55,
      transition: 'background var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { WaveBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/music/WaveBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AddPanel.jsx
try { (() => {
/* New-item slide-over panel for the generic app shell. */
function AddPanel({
  open,
  onClose,
  onAdd
}) {
  const {
    Button,
    Input,
    Select
  } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  const [name, setName] = React.useState('');
  const [group, setGroup] = React.useState('inbox');
  const [status, setStatus] = React.useState('active');
  React.useEffect(() => {
    if (open) {
      setName('');
      setGroup('inbox');
      setStatus('active');
    }
  }, [open]);
  const labelStyle = {
    font: 'var(--type-meta)',
    color: 'hsl(var(--text-muted))',
    letterSpacing: 'var(--tracking-wide)',
    textTransform: 'uppercase'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(10,10,11,0.32)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-out)',
      zIndex: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 380,
      zIndex: 21,
      background: 'hsl(var(--bg-surface))',
      borderLeft: '1px solid hsl(var(--border-soft))',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-6)',
      boxSizing: 'border-box',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--dur-base) var(--ease-crossfade)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-heading)',
      fontSize: 'var(--text-3xl)',
      color: 'hsl(var(--text-strong))',
      margin: 0
    }
  }, "New item"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'hsl(var(--text-muted))'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Name"), /*#__PURE__*/React.createElement(Input, {
    placeholder: "e.g. Weekly digest",
    value: name,
    onChange: e => setName(e.target.value),
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Group"), /*#__PURE__*/React.createElement(Select, {
    value: group,
    onChange: e => setGroup(e.target.value),
    style: {
      width: '100%'
    }
  }, window.AppData.groups.map(g => /*#__PURE__*/React.createElement("option", {
    key: g.id,
    value: g.id
  }, g.name)))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, "Status"), /*#__PURE__*/React.createElement(Select, {
    value: status,
    onChange: e => setStatus(e.target.value),
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "active"
  }, "Active"), /*#__PURE__*/React.createElement("option", {
    value: "review"
  }, "Review"), /*#__PURE__*/React.createElement("option", {
    value: "draft"
  }, "Draft")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    block: true,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    iconLeft: /*#__PURE__*/React.createElement(I.Plus, {
      size: 15
    }),
    onClick: () => {
      if (name.trim()) onAdd({
        name: name.trim(),
        group,
        status
      });
    }
  }, "Create item"))));
}
window.AppAddPanel = AddPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AddPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppIcons.jsx
try { (() => {
/* App icons — monoline, 1.6 stroke, rounded. Matches the Pezza mark. */
const AIc = paths => props => React.createElement('svg', {
  width: props.size || 18,
  height: props.size || 18,
  viewBox: '0 0 24 24',
  fill: props.fill ? 'currentColor' : 'none',
  stroke: props.fill ? 'none' : 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props
}, paths.map((d, i) => React.createElement('path', {
  key: i,
  d
})));
window.AppIcons = {
  Home: AIc(['M4 11l8-7 8 7', 'M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9']),
  Grid: AIc(['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z']),
  Star: AIc(['M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z']),
  Activity: AIc(['M3 12h4l3 8 4-16 3 8h4']),
  Inbox: AIc(['M4 13l2-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1l2 7v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z', 'M4 13h5l1 2h4l1-2h5']),
  Folder: AIc(['M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z']),
  Archive: AIc(['M3 4h18v4H3z', 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8', 'M9 12h6']),
  Search: AIc(['M11 11m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0', 'M16 16l5 5']),
  Plus: AIc(['M12 5v14', 'M5 12h14']),
  List: AIc(['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01']),
  Settings: AIc(['M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z']),
  StarFill: p => React.createElement('svg', {
    width: p.size || 18,
    height: p.size || 18,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    ...p
  }, React.createElement('path', {
    d: 'M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z'
  }))
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppIcons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppShell.jsx
try { (() => {
/* Generic web-app shell — sidebar, topbar, overview stats, items grid/list,
   activity feed, add slide-over. A neutral starter for Pezza's personal apps. */
function AppShell() {
  const NS = window.PezzaDesignSystem_8fc740;
  const {
    Button,
    IconButton,
    Input,
    Badge,
    Card
  } = NS;
  const I = window.AppIcons;
  const [items, setItems] = React.useState(window.AppData.items);
  const [view, setView] = React.useState('overview');
  const [layout, setLayout] = React.useState('grid');
  const [query, setQuery] = React.useState('');
  const [adding, setAdding] = React.useState(false);
  const counts = React.useMemo(() => {
    const c = {
      all: items.length
    };
    window.AppData.groups.forEach(g => c[g.id] = items.filter(i => i.group === g.id).length);
    return c;
  }, [items]);
  const star = id => setItems(prev => prev.map(i => i.id === id ? {
    ...i,
    starred: !i.starred
  } : i));
  const addItem = ({
    name,
    group,
    status
  }) => {
    setItems(prev => [{
      id: Date.now(),
      name,
      group,
      status,
      meta: 'Just now',
      count: 0,
      starred: false
    }, ...prev]);
    setAdding(false);
    setView('all');
  };
  const isGroup = window.AppData.groups.some(g => g.id === view);
  const visible = items.filter(i => {
    const inView = view === 'all' || view === 'overview' ? true : view === 'starred' ? i.starred : isGroup ? i.group === view : true;
    return inView && i.name.toLowerCase().includes(query.toLowerCase());
  });
  const titleMap = {
    overview: 'Overview',
    all: 'All items',
    starred: 'Starred',
    activity: 'Activity'
  };
  const groupObj = window.AppData.groups.find(g => g.id === view);
  const title = titleMap[view] || (groupObj ? groupObj.name : 'Items');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      background: 'hsl(var(--bg-app))',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement(window.AppSidebar, {
    active: view,
    onSelect: setView,
    counts: counts
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 'var(--space-5) var(--space-6)',
      borderBottom: '1px solid hsl(var(--border-soft))',
      background: 'hsl(var(--bg-surface))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-meta)',
      color: 'hsl(var(--text-faint))',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, "Workspace"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)',
      color: 'hsl(var(--text-strong))',
      margin: '4px 0 0',
      letterSpacing: '-0.01em'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search\u2026",
    prefix: /*#__PURE__*/React.createElement(I.Search, {
      size: 16
    }),
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(I.Plus, {
      size: 15
    }),
    onClick: () => setAdding(true)
  }, "New item")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 'var(--space-6)'
    }
  }, view === 'overview' && /*#__PURE__*/React.createElement(OverviewStats, null), view === 'activity' ? /*#__PURE__*/React.createElement(ActivityFeed, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-semi) var(--text-2xl)/1 var(--font-display)',
      color: 'hsl(var(--text-strong))',
      margin: 0
    }
  }, view === 'overview' ? 'Recent items' : title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-muted))'
    }
  }, visible.length), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    label: "Grid view",
    active: layout === 'grid',
    onClick: () => setLayout('grid')
  }, /*#__PURE__*/React.createElement(I.Grid, {
    size: 17
  })), /*#__PURE__*/React.createElement(IconButton, {
    label: "List view",
    active: layout === 'list',
    onClick: () => setLayout('list')
  }, /*#__PURE__*/React.createElement(I.List, {
    size: 17
  }))), visible.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    query: query
  }) : layout === 'grid' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
      gap: 'var(--space-4)'
    }
  }, visible.map(i => /*#__PURE__*/React.createElement(window.AppRecordCard, {
    key: i.id,
    item: i,
    onStar: star
  }))) : /*#__PURE__*/React.createElement(ListView, {
    items: visible,
    onStar: star
  })))), /*#__PURE__*/React.createElement(window.AppAddPanel, {
    open: adding,
    onClose: () => setAdding(false),
    onAdd: addItem
  }));
}
function OverviewStats() {
  const {
    Card
  } = window.PezzaDesignSystem_8fc740;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-7)'
    }
  }, window.AppData.stats.map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-meta)',
      color: 'hsl(var(--text-muted))',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-bold) var(--text-5xl)/1 var(--font-display)',
      color: 'hsl(var(--text-strong))',
      margin: '10px 0 6px',
      letterSpacing: '-0.02em'
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--accent-dim))'
    }
  }, s.delta))));
}
function ListView({
  items,
  onStar
}) {
  const {
    Card,
    Badge
  } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  return /*#__PURE__*/React.createElement(Card, {
    padding: "none",
    style: {
      overflow: 'hidden'
    }
  }, items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px var(--space-5)',
      borderTop: idx ? '1px solid hsl(var(--border-hair))' : 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onStar(it.id),
    "aria-label": "Star",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: it.starred ? 'hsl(var(--accent))' : 'hsl(var(--text-faint))',
      display: 'inline-flex'
    }
  }, it.starred ? /*#__PURE__*/React.createElement(I.StarFill, {
    size: 15
  }) : /*#__PURE__*/React.createElement(I.Star, {
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--weight-medium) var(--text-xl)/1 var(--font-ui)',
      color: 'hsl(var(--text-strong))'
    }
  }, it.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-faint))',
      width: 130,
      textAlign: 'right'
    }
  }, it.meta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--text-strong))',
      width: 40,
      textAlign: 'right'
    }
  }, it.count), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, window.appStatusBadge(it.status, Badge)))));
}
function ActivityFeed() {
  const {
    Card
  } = window.PezzaDesignSystem_8fc740;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "none",
    style: {
      overflow: 'hidden'
    }
  }, window.AppData.activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px var(--space-5)',
      borderTop: i ? '1px solid hsl(var(--border-hair))' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'hsl(var(--accent))',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: 'var(--text-lg)/1.4 var(--font-ui)',
      color: 'hsl(var(--text-body))'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'hsl(var(--text-strong))',
      fontWeight: 600
    }
  }, a.who), " ", a.what, " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'hsl(var(--text-strong))',
      fontWeight: 600
    }
  }, a.target)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-faint))'
    }
  }, a.when)))));
}
function EmptyState({
  query
}) {
  const I = window.AppIcons;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      padding: '80px 0',
      color: 'hsl(var(--text-faint))'
    }
  }, /*#__PURE__*/React.createElement(I.Grid, {
    size: 38
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      margin: 0
    }
  }, query ? `No items match “${query}”` : 'Nothing here yet'));
}
window.AppShell = AppShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/RecordCard.jsx
try { (() => {
/* Record card + status mapping for the generic app shell. */
function appStatusBadge(status, Badge) {
  const map = {
    active: {
      tone: 'ok',
      label: 'Active'
    },
    review: {
      tone: 'warn',
      label: 'Review'
    },
    draft: {
      tone: 'neutral',
      label: 'Draft'
    },
    archived: {
      tone: 'neutral',
      label: 'Archived'
    }
  };
  const s = map[status] || map.draft;
  return /*#__PURE__*/React.createElement(Badge, {
    tone: s.tone,
    dot: status !== 'draft' && status !== 'archived'
  }, s.label);
}
function RecordCard({
  item,
  onStar
}) {
  const {
    Card,
    Badge,
    IconButton
  } = window.PezzaDesignSystem_8fc740;
  const I = window.AppIcons;
  const dim = item.status === 'archived';
  return /*#__PURE__*/React.createElement(Card, {
    padding: "md",
    interactive: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-semi) var(--text-2xl)/1.15 var(--font-display)',
      color: dim ? 'hsl(var(--text-muted))' : 'hsl(var(--text-strong))'
    }
  }, item.name), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onStar(item.id);
    },
    "aria-label": "Star",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: item.starred ? 'hsl(var(--accent))' : 'hsl(var(--text-faint))',
      display: 'inline-flex',
      padding: 2
    }
  }, item.starred ? /*#__PURE__*/React.createElement(I.StarFill, {
    size: 16
  }) : /*#__PURE__*/React.createElement(I.Star, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8,
      fontFamily: 'var(--font-mono)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-4xl)',
      fontWeight: 700,
      color: dim ? 'hsl(var(--text-faint))' : 'hsl(var(--text-strong))',
      lineHeight: 1
    }
  }, item.count), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-muted))',
      letterSpacing: 'var(--tracking-mono)'
    }
  }, "entries")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTop: '1px solid hsl(var(--border-hair))'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--text-faint))'
    }
  }, item.meta), appStatusBadge(item.status, Badge)));
}
window.AppRecordCard = RecordCard;
window.appStatusBadge = appStatusBadge;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/RecordCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Sidebar.jsx
try { (() => {
/* Generic app sidebar — emblem lockup, nav + groups, settings footer. */
function AppSidebar({
  active,
  onSelect,
  counts
}) {
  const I = window.AppIcons;
  const navItem = (id, label, Icon, count) => {
    const on = active === id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onSelect(id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '9px 12px',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        background: on ? 'hsl(var(--bg-raised))' : 'transparent',
        color: on ? 'hsl(var(--text-strong))' : 'hsl(var(--text-muted))',
        cursor: 'pointer',
        textAlign: 'left',
        font: 'var(--weight-medium) var(--text-lg)/1 var(--font-ui)',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'hsl(var(--bg-sunken))';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18,
      style: {
        color: on ? 'hsl(var(--accent))' : 'currentColor',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'hsl(var(--text-faint))'
      }
    }, count));
  };
  const heading = t => /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-meta)',
      color: 'hsl(var(--text-faint))',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      padding: '0 12px 8px'
    }
  }, t);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 232,
      flex: 'none',
      height: '100%',
      boxSizing: 'border-box',
      background: 'hsl(var(--bg-surface))',
      borderRight: '1px solid hsl(var(--border-soft))',
      display: 'flex',
      flexDirection: 'column',
      padding: 'var(--space-5) var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 8px 22px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      background: 'hsl(var(--ink-1000))',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/emblem-white.png",
    alt: "",
    style: {
      width: 17
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-bold) var(--text-xl)/1 var(--font-display)',
      letterSpacing: '0.18em',
      color: 'hsl(var(--text-strong))'
    }
  }, "PEZZA")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, window.AppData.nav.map(n => navItem(n.id, n.name, I[n.icon], n.id === 'all' ? counts.all : null))), heading('Groups'), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, window.AppData.groups.map(g => navItem(g.id, g.name, I[g.icon], counts[g.id]))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      width: '100%',
      padding: '9px 12px',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      background: 'transparent',
      color: 'hsl(var(--text-muted))',
      cursor: 'pointer',
      font: 'var(--weight-medium) var(--text-lg)/1 var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement(I.Settings, {
    size: 18
  }), " ", /*#__PURE__*/React.createElement("span", null, "Settings")));
}
window.AppSidebar = AppSidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
/* Generic web-app demo data — a neutral "items" collection so the shell
   reads as a starter for any of Pezza's personal apps. */
window.AppData = {
  nav: [{
    id: 'overview',
    name: 'Overview',
    icon: 'Home'
  }, {
    id: 'all',
    name: 'All items',
    icon: 'Grid'
  }, {
    id: 'starred',
    name: 'Starred',
    icon: 'Star'
  }, {
    id: 'activity',
    name: 'Activity',
    icon: 'Activity'
  }],
  groups: [{
    id: 'inbox',
    name: 'Inbox',
    icon: 'Inbox'
  }, {
    id: 'projects',
    name: 'Projects',
    icon: 'Folder'
  }, {
    id: 'archive',
    name: 'Archive',
    icon: 'Archive'
  }],
  stats: [{
    label: 'Total items',
    value: '128',
    delta: '+6 this week'
  }, {
    label: 'Active',
    value: '94',
    delta: '73% of total'
  }, {
    label: 'Needs review',
    value: '12',
    delta: '4 overdue'
  }],
  items: [{
    id: 1,
    name: 'Onboarding flow',
    group: 'projects',
    status: 'active',
    meta: 'Updated 2h ago',
    count: 8,
    starred: true
  }, {
    id: 2,
    name: 'Weekly digest',
    group: 'inbox',
    status: 'active',
    meta: 'Updated yesterday',
    count: 3,
    starred: false
  }, {
    id: 3,
    name: 'Q3 roadmap',
    group: 'projects',
    status: 'review',
    meta: 'Due Jun 28',
    count: 14,
    starred: true
  }, {
    id: 4,
    name: 'Asset library',
    group: 'projects',
    status: 'active',
    meta: 'Updated 3d ago',
    count: 42,
    starred: false
  }, {
    id: 5,
    name: 'Saved searches',
    group: 'inbox',
    status: 'draft',
    meta: 'Draft',
    count: 0,
    starred: false
  }, {
    id: 6,
    name: 'Release notes',
    group: 'archive',
    status: 'archived',
    meta: 'Archived May 12',
    count: 21,
    starred: false
  }, {
    id: 7,
    name: 'Feedback inbox',
    group: 'inbox',
    status: 'review',
    meta: '5 new replies',
    count: 5,
    starred: false
  }, {
    id: 8,
    name: 'Brand kit',
    group: 'projects',
    status: 'active',
    meta: 'Updated 1w ago',
    count: 17,
    starred: true
  }, {
    id: 9,
    name: 'Old prototypes',
    group: 'archive',
    status: 'archived',
    meta: 'Archived Apr 02',
    count: 9,
    starred: false
  }],
  activity: [{
    who: 'You',
    what: 'starred',
    target: 'Q3 roadmap',
    when: '2h'
  }, {
    who: 'You',
    what: 'added 3 items to',
    target: 'Asset library',
    when: '5h'
  }, {
    who: 'You',
    what: 'archived',
    target: 'Old prototypes',
    when: '1d'
  }, {
    who: 'You',
    what: 'created',
    target: 'Weekly digest',
    when: '2d'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/site/SiteApp.jsx
try { (() => {
/* Pezza — DJ/producer site. Dark, photographic. Hero, player, discography, dates. */
const BG = {
  galaxy: '../../assets/img/bg-galaxy.jpg',
  desert: '../../assets/img/bg-desert.jpg',
  sunset: '../../assets/img/bg-sunset.jpg',
  smoke: '../../assets/img/bg-smoke-wide.jpg'
};
function SiteNav() {
  const I = window.SiteIcons;
  const link = t => /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: 'var(--weight-medium) var(--text-lg)/1 var(--font-ui)',
      color: 'hsl(var(--ink-300))',
      textDecoration: 'none',
      letterSpacing: '0.02em'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'hsl(var(--ink-0))',
    onMouseLeave: e => e.currentTarget.style.color = 'hsl(var(--ink-300))'
  }, t);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '18px 40px',
      background: 'rgba(10,10,11,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid hsl(var(--ink-800))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/emblem-white.png",
    alt: "",
    style: {
      height: 24
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-bold) var(--text-xl)/1 var(--font-display)',
      letterSpacing: '0.2em',
      color: 'hsl(var(--ink-0))'
    }
  }, "PEZZA")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), link('Releases'), link('Sets'), link('Live'), link('About'), /*#__PURE__*/React.createElement(window.PezzaDesignSystem_8fc740.Button, {
    variant: "accent",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.Play, {
      size: 13
    })
  }, "Latest set"));
}
function Hero({
  onPlay
}) {
  const I = window.SiteIcons;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      minHeight: 460,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: BG.smoke,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0.85) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '0 40px 48px',
      width: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'hsl(var(--accent))',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, "NOW PLAYING"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-meta)',
      color: 'hsl(var(--ink-400))'
    }
  }, "\xB7 CAT# PZA-007")), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--weight-bold) var(--text-8xl)/0.95 var(--font-display)',
      color: 'hsl(var(--ink-0))',
      margin: 0,
      letterSpacing: '-0.02em',
      maxWidth: 800
    }
  }, "Subsurface"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      fontSize: 'var(--text-2xl)',
      color: 'hsl(var(--ink-200))',
      maxWidth: 520,
      marginTop: 16
    }
  }, "Four tracks of deep, weightless techno. Mastered for the floor and the headphones alike."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(window.PezzaDesignSystem_8fc740.Button, {
    variant: "accent",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(I.Play, {
      size: 16
    }),
    onClick: onPlay
  }, "Play EP"), /*#__PURE__*/React.createElement(window.PezzaDesignSystem_8fc740.Button, {
    variant: "secondary",
    size: "lg",
    style: {
      color: 'hsl(var(--ink-0))',
      borderColor: 'hsl(var(--ink-600))'
    }
  }, "Bandcamp"))));
}
function Player({
  release,
  playing,
  progress,
  onToggle,
  activeTrack,
  setActiveTrack
}) {
  const {
    WaveBar,
    MetaRow,
    IconButton,
    Badge
  } = window.PezzaDesignSystem_8fc740;
  const I = window.SiteIcons;
  return /*#__PURE__*/React.createElement("section", {
    className: "on-dark",
    style: {
      padding: '40px',
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1/1',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid hsl(var(--ink-800))'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: BG[release.bg],
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(10,10,11,0.25)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/emblem-white.png",
    alt: "",
    style: {
      width: 64,
      filter: 'drop-shadow(0 2px 12px rgba(0,0,0,.5))'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, release.kind), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-400))'
    }
  }, "CAT# ", release.cat, " \xB7 ", release.year)), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)',
      color: 'hsl(var(--ink-0))',
      margin: '10px 0 0'
    }
  }, release.title)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 20px',
      background: 'hsl(var(--ink-900))',
      border: '1px solid hsl(var(--ink-800))',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-label": playing ? 'Pause' : 'Play',
    style: {
      width: 48,
      height: 48,
      flex: 'none',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'hsl(var(--accent))',
      color: 'hsl(var(--accent-ink))',
      display: 'grid',
      placeItems: 'center',
      boxShadow: playing ? 'var(--glow-accent)' : 'none',
      transition: 'box-shadow var(--dur-base) var(--ease-out)'
    }
  }, playing ? /*#__PURE__*/React.createElement(I.Pause, {
    size: 18
  }) : /*#__PURE__*/React.createElement(I.Play, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-0))'
    }
  }, release.tracks[activeTrack].t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-400))'
    }
  }, release.tracks[activeTrack].bpm, " BPM \xB7 ", release.tracks[activeTrack].key)), /*#__PURE__*/React.createElement(WaveBar, {
    progress: progress,
    height: 40,
    seed: activeTrack * 5 + 3
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, release.tracks.map((t, i) => /*#__PURE__*/React.createElement(MetaRow, {
    key: i,
    index: i + 1,
    title: t.t,
    bpm: t.bpm,
    musicKey: t.key,
    duration: t.dur,
    active: i === activeTrack,
    onClick: () => setActiveTrack(i)
  })))));
}
function Discography({
  onSelect,
  currentId
}) {
  const {
    Card
  } = window.PezzaDesignSystem_8fc740;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '20px 40px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)',
      color: 'hsl(var(--ink-0))',
      margin: 0
    }
  }, "Releases"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-500))'
    }
  }, window.SiteData.releases.length, " ON PEZZA REC.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--space-4)'
    }
  }, window.SiteData.releases.map(r => {
    const on = r.id === currentId;
    return /*#__PURE__*/React.createElement("button", {
      key: r.id,
      onClick: () => onSelect(r.id),
      style: {
        textAlign: 'left',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        aspectRatio: '1/1',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: on ? '1.5px solid hsl(var(--accent))' : '1px solid hsl(var(--ink-800))',
        transition: 'border-color var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: BG[r.bg],
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,10,11,0.3)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo/emblem-white.png",
      alt: "",
      style: {
        width: 38
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--weight-semi) var(--text-xl)/1.2 var(--font-display)',
        color: on ? 'hsl(var(--accent))' : 'hsl(var(--ink-0))'
      }
    }, r.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'hsl(var(--ink-500))'
      }
    }, r.cat)));
  })));
}
function Dates() {
  const I = window.SiteIcons;
  const {
    Button
  } = window.PezzaDesignSystem_8fc740;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '20px 40px 56px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--weight-bold) var(--text-4xl)/1 var(--font-display)',
      color: 'hsl(var(--ink-0))',
      margin: '0 0 20px'
    }
  }, "Live"), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid hsl(var(--ink-800))',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, window.SiteData.dates.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '18px 22px',
      borderTop: i ? '1px solid hsl(var(--ink-800))' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      color: 'hsl(var(--accent))',
      width: 70
    }
  }, d.date), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-semi) var(--text-2xl)/1.1 var(--font-display)',
      color: 'hsl(var(--ink-0))'
    }
  }, d.city), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-500))'
    }
  }, d.venue)), d.status === 'soldout' ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-500))',
      letterSpacing: '0.08em'
    }
  }, "SOLD OUT") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    style: {
      color: 'hsl(var(--ink-0))',
      borderColor: 'hsl(var(--ink-600))'
    },
    iconRight: /*#__PURE__*/React.createElement(I.Arrow, {
      size: 14
    })
  }, "Tickets")))));
}
function SiteFooter() {
  const I = window.SiteIcons;
  const social = Icon => /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'hsl(var(--ink-400))',
      display: 'inline-flex'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'hsl(var(--accent))',
    onMouseLeave: e => e.currentTarget.style.color = 'hsl(var(--ink-400))'
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 20
  }));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '32px 40px',
      borderTop: '1px solid hsl(var(--ink-800))',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/emblem-white.png",
    alt: "",
    style: {
      height: 22
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'hsl(var(--ink-500))'
    }
  }, "\xA9 2026 PEZZA RECORDINGS"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, social(I.Soundcloud), social(I.Bandcamp), social(I.Instagram)));
}
function SiteApp() {
  const [currentId, setCurrentId] = React.useState('pza007');
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0.32);
  const [activeTrack, setActiveTrack] = React.useState(0);
  const release = window.SiteData.releases.find(r => r.id === currentId);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => p >= 1 ? 0 : p + 0.012), 180);
    return () => clearInterval(id);
  }, [playing]);
  const selectRelease = id => {
    setCurrentId(id);
    setActiveTrack(0);
    setProgress(0.05);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "on-dark",
    style: {
      background: 'hsl(var(--ink-1000))',
      minHeight: '100%',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement(SiteNav, null), /*#__PURE__*/React.createElement(Hero, {
    onPlay: () => setPlaying(true)
  }), /*#__PURE__*/React.createElement(Player, {
    release: release,
    playing: playing,
    progress: progress,
    onToggle: () => setPlaying(p => !p),
    activeTrack: activeTrack,
    setActiveTrack: setActiveTrack
  }), /*#__PURE__*/React.createElement(Discography, {
    onSelect: selectRelease,
    currentId: currentId
  }), /*#__PURE__*/React.createElement(Dates, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
window.SiteApp = SiteApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/SiteApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/SiteIcons.jsx
try { (() => {
/* Site icons — monoline, matches brand. */
const SIc = paths => props => React.createElement('svg', {
  width: props.size || 18,
  height: props.size || 18,
  viewBox: '0 0 24 24',
  fill: props.fill ? 'currentColor' : 'none',
  stroke: props.fill ? 'none' : 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...props
}, paths.map((d, i) => React.createElement('path', {
  key: i,
  d
})));
window.SiteIcons = {
  Play: p => React.createElement('svg', {
    width: p.size || 18,
    height: p.size || 18,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    ...p
  }, React.createElement('path', {
    d: 'M6 4l14 8-14 8V4z'
  })),
  Pause: SIc(['M8 5v14', 'M16 5v14']),
  Soundcloud: SIc(['M3 16v-4', 'M6 17v-7', 'M9 17v-9', 'M12 17V9a4 4 0 0 1 8 0v8z']),
  Bandcamp: SIc(['M4 16l4-8h12l-4 8z']),
  Instagram: SIc(['M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z', 'M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0', 'M17 7h.01']),
  Arrow: SIc(['M5 12h14', 'M13 6l6 6-6 6']),
  Calendar: SIc(['M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M4 9h16', 'M9 4V2', 'M15 4V2'])
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/SiteIcons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/data.js
try { (() => {
/* Pezza site data — releases, current set, dates. */
window.SiteData = {
  releases: [{
    id: 'pza007',
    cat: 'PZA-007',
    title: 'Subsurface',
    kind: 'EP',
    year: '2026',
    bg: 'galaxy',
    tracks: [{
      t: 'Subsurface',
      bpm: 124,
      key: 'A♭ min',
      dur: '6:42'
    }, {
      t: 'Ice VIII (Pezza Edit)',
      bpm: 126,
      key: 'F maj',
      dur: '5:18'
    }, {
      t: 'Galaxy Bleed',
      bpm: 128,
      key: 'C min',
      dur: '7:03'
    }, {
      t: 'Subsurface (Reprise)',
      bpm: 120,
      key: 'A♭ min',
      dur: '4:51'
    }]
  }, {
    id: 'pza006',
    cat: 'PZA-006',
    title: 'Desert Glass',
    kind: 'Single',
    year: '2025',
    bg: 'desert',
    tracks: [{
      t: 'Desert Glass',
      bpm: 122,
      key: 'G min',
      dur: '6:10'
    }, {
      t: 'Desert Glass (Dub)',
      bpm: 122,
      key: 'G min',
      dur: '6:44'
    }]
  }, {
    id: 'pza005',
    cat: 'PZA-005',
    title: 'Slow Tide',
    kind: 'EP',
    year: '2025',
    bg: 'sunset',
    tracks: [{
      t: 'Slow Tide',
      bpm: 118,
      key: 'D min',
      dur: '7:22'
    }, {
      t: 'Undertow',
      bpm: 120,
      key: 'A min',
      dur: '5:55'
    }, {
      t: 'Lowlight',
      bpm: 116,
      key: 'E min',
      dur: '6:30'
    }]
  }],
  dates: [{
    date: 'JUL 12',
    city: 'Berlin',
    venue: 'Hoppetosse',
    status: 'tickets'
  }, {
    date: 'JUL 26',
    city: 'Amsterdam',
    venue: 'Shelter',
    status: 'tickets'
  }, {
    date: 'AUG 09',
    city: 'London',
    venue: 'FOLD',
    status: 'soldout'
  }, {
    date: 'AUG 23',
    city: 'Lisbon',
    venue: 'Lux Frágil',
    status: 'tickets'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.MetaRow = __ds_scope.MetaRow;

__ds_ns.WaveBar = __ds_scope.WaveBar;

})();
