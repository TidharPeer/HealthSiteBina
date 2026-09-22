/**
 * תמונות שמוגשות מתוך public/.
 * כל הקבצים כאן הם גרסאות WebP דחוסות; המקורות שמורים תחת assets-source/
 * ואינם נכללים ב-build.
 *
 * המידות הן המידות האמיתיות של הקבצים, ונמסרות כ-attributes על כל <img>
 * כדי שהדפדפן ישריין מקום עוד לפני שה-CSS נטען (מניעת CLS).
 */

export type ImageAsset = {
  src: string
  width: number
  height: number
}

export const HERO_IMAGE: ImageAsset = {
  src: '/hero-holiday-table.webp',
  width: 1600,
  height: 1066,
}

export const TABATA_IMAGE: ImageAsset = {
  src: '/tabata.webp',
  width: 500,
  height: 500,
}

export const WAKE_SHAKE_IMAGE: ImageAsset = {
  src: '/product-wake-shake.webp',
  width: 600,
  height: 800,
}

export const MY_SIA_IMAGE: ImageAsset = {
  src: '/product-my-sia.webp',
  width: 600,
  height: 800,
}
