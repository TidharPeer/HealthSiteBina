import { SECTION_IDS } from '../config/links'

export const problem = {
  title: 'למה דווקא בחגים כל כך קל לאבד את האיזון?',
  eyebrow: 'מכירים את התסריט הזה?',
  spiral: [
    { text: '"נשמור כל היום"', emoji: '💭' },
    { text: 'כמעט לא אוכלים', emoji: '🚫' },
    { text: 'מגיעים מורעבים לארוחה', emoji: '😖' },
    { text: 'אוכלים מהר ומהכול', emoji: '🍽️' },
    { text: 'מרגישים כבדים / מלאים מדי', emoji: '😣' },
    { text: '"כבר הרסנו... נחזור לשמור אחרי החגים"', emoji: '🙃' },
  ],
  message:
    'הבעיה היא לא ארוחת החג. הבעיה היא שאין אסטרטגיה לתקופה שבה השגרה משתנה.',
  tilesTitle: 'אז מה עושים?',
} as const

/** קוביות הניווט שמופיעות מיד אחרי השרשרת ומקשרות לתכנים בהמשך הדף. */
export const jumpTiles = [
  { emoji: '🍽️', label: '4 עקרונות לאיזון', target: SECTION_IDS.principles },
  {
    emoji: '😌',
    label: 'אכלנו יותר מדי, מה עכשיו?',
    target: SECTION_IDS.afterMeal,
  },
  { emoji: '🌿', label: 'איזון תזונתי ותמיכה', target: SECTION_IDS.program },
  { emoji: '💚', label: 'הקהילה שלי', target: SECTION_IDS.community },
] as const
