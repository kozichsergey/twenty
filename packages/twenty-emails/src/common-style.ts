/* oxlint-disable twenty/no-hardcoded-colors */

// [grafit] Письма — единственное место, где значения приходится держать hex-ами:
// почтовые клиенты не понимают CSS-переменные, каждое правило приезжает инлайном.
// Значения — из dizayn/grafit.tokens.json репозитория «ГК СЭТ»; серая шкала
// пересчитана по той же лестнице, что и тема CRM (crm/tema_grafit.py).
//
// Письмо уходит наружу и приходит к клиенту, поэтому расходиться с интерфейсом
// ему нельзя: это то же самое обращение, только доставленное почтой.

const grayScale = {
  gray100: '#1c1a17',
  gray90: '#1c1a17',
  gray85: '#1c1a17',
  gray80: '#1e1b18',
  gray75: '#201d1a',
  gray70: '#25221f',
  gray65: '#2d2925',
  gray60: '#38332e',
  gray55: '#534d45',
  gray50: '#6d685f',
  gray45: '#8a8378',
  gray40: '#a29b90',
  gray35: '#bbb5ab',
  gray30: '#d2cec6',
  gray25: '#dbd7d1',
  gray20: '#eeece8',
  gray15: '#f3f1ee',
  gray10: '#fbfaf8',
  gray0: '#fbfaf8',
};

const colors = {
  // Цвет ссылок — тот же «цвет данных», что в интерфейсе.
  blue40: '#3b6ea8',
};

export const emailTheme = {
  font: {
    colors: {
      highlighted: '#1c1a17',
      primary: grayScale.gray55,
      tertiary: grayScale.gray40,
      inverted: grayScale.gray0,
      blue: colors.blue40,
    },
    // IBM Plex в письме почти наверняка не подгрузится — почтовые клиенты
    // веб-шрифты в большинстве своём не тянут. Оставляем его первым для тех,
    // у кого он установлен, а дальше — надёжный запасной ряд.
    family: "'IBM Plex Sans', 'Trebuchet MS', Helvetica, Arial, sans-serif",
    weight: {
      regular: 400,
      bold: 600,
    },
    size: {
      sm: '12px',
      md: '13px',
      lg: '16px',
      xl: '24px',
    },
    lineHeight: '20px',
  },
  border: {
    radius: { sm: '4px', md: '6px' },
    color: { highlighted: grayScale.gray25 },
  },
  background: {
    colors: { highlight: grayScale.gray15 },
    // Главное действие тёмное, а не цветное: цвет в системе занят под смысл.
    button: '#1c1a17',
    transparent: {
      medium: 'rgba(28, 26, 23, 0.08)',
      light: 'rgba(28, 26, 23, 0.04)',
    },
  },
};
