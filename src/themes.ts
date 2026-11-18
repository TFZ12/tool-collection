import type { GlobalThemeOverrides } from 'naive-ui';
import { appThemes } from './ui/theme/themes';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: appThemes.light.primary.color,
    primaryColorHover: appThemes.light.primary.colorHover,
    primaryColorPressed: appThemes.light.primary.colorPressed,
    primaryColorSuppl: appThemes.light.primary.colorHover,
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: { color: '#f1f5f9' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: appThemes.dark.primary.color,
    primaryColorHover: appThemes.dark.primary.colorHover,
    primaryColorPressed: appThemes.dark.primary.colorPressed,
    primaryColorSuppl: '#936B1C',
  },

  Notification: {
    color: '#333333',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '32px',
  },

  Layout: {
    color: '#1c1c1c',
    siderColor: '#232323',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#232323',
    borderColor: '#282828',
  },

  Table: {
    tdColor: '#232323',
    thColor: '#353535',
  },
};
