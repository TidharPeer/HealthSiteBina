export type FoodTag = 'protein' | 'veg' | 'carb' | 'extra' | 'dessert'

export type FoodItem = {
  id: string
  label: string
  emoji: string
  tag: FoodTag
}

/**
 * העיקרון שהאינטראקטיב מלמד: צלחת מאוזנת = ירקות + חלבון + פחמימה.
 * תוספות וקינוח הם אקסטרה — הם לא מחליפים אף אחת משלוש הקטגוריות.
 * ה-tag של כל פריט הוא "מאחורי הקלעים" בלבד: הוא מזין את המשוב ואינו מוצג בממשק.
 */
export const plateBuilder = {
  title: '🍽️ בואו נרכיב את צלחת החג שלכם',
  intro:
    'בחרו את המאכלים שהייתם שמים בצלחת בארוחת חג — ונראה יחד איך אפשר ליצור יותר איזון בלי לוותר על מה שאתם אוהבים.',
  items: [
    { id: 'meat', label: 'בשר / עוף', emoji: '🥩', tag: 'protein' },
    { id: 'fish', label: 'דג', emoji: '🐟', tag: 'protein' },
    { id: 'salad', label: 'סלטים / ירקות', emoji: '🥗', tag: 'veg' },
    { id: 'rice', label: 'אורז', emoji: '🍚', tag: 'carb' },
    { id: 'potato', label: 'תפוחי אדמה', emoji: '🥔', tag: 'carb' },
    { id: 'bread', label: 'לחם', emoji: '🥖', tag: 'carb' },
    { id: 'sides', label: 'תוספות', emoji: '🧆', tag: 'extra' },
    { id: 'dessert', label: 'קינוח', emoji: '🍰', tag: 'dessert' },
  ] satisfies readonly FoodItem[],
  emptyPlate: 'הצלחת עדיין ריקה — בחרו מה שהייתם לוקחים באמת.',
  submit: 'הצלחת שלי מוכנה',
  reset: 'להתחיל מחדש',
  resultTitle: 'הצלחת שלכם מוכנה! עכשיו בואו נבדוק אותה.',
  /** המשוב לא נותן ציון של "טוב / רע", אלא מצביע על מה אפשר להוסיף. */
  feedback: {
    winning:
      '🎉 זאת הצלחת המנצחת! ירקות, חלבון ופחמימה באותה צלחת — בסיס שמשאיר אתכם שבעים לאורך זמן ומאפשר ליהנות מהארוחה בנחת.',
    /** אותו שילוב נכון, אבל עם יותר ממנת פחמימה אחת */
    winningManyCarbs:
      'השילוב עצמו נכון — יש ירקות, חלבון ופחמימה. שימו לב רק שבחרתם יותר ממנת פחמימה אחת: אפשר לבחור את הפחמימה שהכי מתחשק לכם, ולהשאיר בצלחת מקום לירקות ולחלבון.',
    manyCarbs:
      'שימו לב שבחרתם יותר ממנת פחמימה אחת. אפשר לבחור את זו שהכי מתחשק לכם ולהסתפק בה.',
    missingVeg:
      'כמעט שם. יש חלבון ופחמימה, אבל חסרים ירקות — והסיבים שבהם הם מה ששומר על תחושת השובע לאורך הארוחה. כף סלט לצד המנה עושה את ההבדל.',
    missingCarb:
      'יש כאן בחירות חכמות — חלבון וירקות הם בסיס מצוין. חסרה פחמימה: היא זו שנותנת אנרגיה, ובחג היא גם חלק מההנאה. אין סיבה לוותר עליה.',
    missingProtein:
      'ירקות ופחמימה הם התחלה טובה, אבל חסר החלבון — הוא זה שמשלים את השובע ומחזיק אתכם לאורך הארוחה. הוסיפו מנה של בשר, עוף או דג.',
    carbsOnly:
      'הצלחת מבוססת כרגע רק על פחמימות. פחמימה לבדה מתעכלת מהר, השובע ממנה קצר יותר, וקל למצוא את עצמכם חוזרים לשולחן לעוד סיבוב. הוסיפו חלבון וירקות — ותרגישו את ההבדל כבר באותה ארוחה.',
    proteinOnly:
      'התחלה טובה, אבל הצלחת עוד לא שלמה: חסרים ירקות שישביעו, וחסרה פחמימה שתיתן אנרגיה.',
    vegOnly:
      'ירקות הם התחלה מצוינת, אבל לבדם הם לא ישאירו אתכם שבעים לאורך הארוחה. הוסיפו חלבון ופחמימה.',
    noBase:
      'עוד לא בחרתם את הבסיס. צלחת מאוזנת נבנית מירקות + חלבון + פחמימה — ומשם מוסיפים את מה שאוהבים.',
    extras:
      'לגבי התוספות — קשה לדעת מה בדיוק יש בהן. התייחסו אליהן כאקסטרה: קחו בכמות קטנה, אחרי שהרכבתם את הבסיס.',
    dessert:
      'ולגבי הקינוח — אין שום בעיה ליהנות מקינוח בארוחת חג. קחו כמות קטנה, ובחרו דווקא את הקינוח שאתם באמת נהנים ממנו.',
  },
  tipLabel: '💡 הטיפ שלי',
  tip: 'התחילו ממה שישביע אתכם ורק אחר כך הוסיפו את מה שאתם רוצים ליהנות ממנו.',
} as const

export const allFoodItems: readonly FoodItem[] = plateBuilder.items

/**
 * הודעה ראשית אחת לפי שלוש הקטגוריות, ואחריה הערות על תוספות וקינוח.
 */
export function plateFeedback(selectedIds: readonly string[]): string[] {
  const selected = allFoodItems.filter((item) => selectedIds.includes(item.id))
  const has = (tag: FoodTag) => selected.some((item) => item.tag === tag)

  const protein = has('protein')
  const veg = has('veg')
  const carbCount = selected.filter((item) => item.tag === 'carb').length
  const carb = carbCount > 0
  const manyCarbs = carbCount > 1

  const { feedback } = plateBuilder
  const messages: string[] = []

  if (protein && veg && carb) {
    // השילוב נכון, אבל יותר ממנת פחמימה אחת מצדיקה הערה במקום "צלחת מנצחת"
    messages.push(manyCarbs ? feedback.winningManyCarbs : feedback.winning)
  } else if (protein && carb) {
    messages.push(feedback.missingVeg)
  } else if (protein && veg) {
    messages.push(feedback.missingCarb)
  } else if (veg && carb) {
    messages.push(feedback.missingProtein)
  } else if (carb) {
    messages.push(feedback.carbsOnly)
  } else if (protein) {
    messages.push(feedback.proteinOnly)
  } else if (veg) {
    messages.push(feedback.vegOnly)
  } else {
    messages.push(feedback.noBase)
  }

  // ההערה על ריבוי פחמימות כבר כלולה בהודעה הראשית של הצלחת המנצחת
  if (manyCarbs && !(protein && veg)) {
    messages.push(feedback.manyCarbs)
  }

  if (has('extra')) {
    messages.push(feedback.extras)
  }

  if (has('dessert')) {
    messages.push(feedback.dessert)
  }

  return messages
}
