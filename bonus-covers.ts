import type { BONUSES } from "@/config/content";
import { IMAGES } from "@/config/images";

/** Capas reais dos bônus, pelo número do bônus. */
export const BONUS_COVERS: Record<(typeof BONUSES)[number]["number"], string> = {
  "1": IMAGES.bonus1,
  "2": IMAGES.bonus2,
  "3": IMAGES.bonus3,
  "4": IMAGES.bonus4,
  "5": IMAGES.bonus5,
};
