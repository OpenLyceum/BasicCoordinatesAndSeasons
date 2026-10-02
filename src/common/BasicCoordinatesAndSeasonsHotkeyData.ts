/**
 * BasicCoordinatesAndSeasonsHotkeyData.ts
 *
 * Single source of truth for the arrow-key bindings shared by the sim's
 * keyboard listeners:
 *   - ARROW_KEYS          — nudge a draggable marker (observer, star, Earth).
 *   - ROTATE_SKY          — free-rotate the focused celestial sphere.
 *   - ROTATE_ABOUT_ZENITH — rotate the sphere about the zenith only.
 *
 * The two sphere bindings are HotkeyData, so the listener in
 * attachSkyCameraInteraction and the rows in SkySphereKeyboardHelpSection read
 * the same keys and labels. Marker nudging is documented by the stock
 * MoveDraggableItemsKeyboardHelpSection.
 */

import { HotkeyData } from "scenerystack/scenery";
import { StringManager } from "../i18n/StringManager.js";

const ARROW_KEYS = ["arrowLeft", "arrowRight", "arrowUp", "arrowDown"] as const;
const ALT_ARROW_KEYS = ["alt+arrowLeft", "alt+arrowRight", "alt+arrowUp", "alt+arrowDown"] as const;

const REPO_NAME = "basic-coordinates-and-seasons";
const controls = StringManager.getInstance().getControls();

const BasicCoordinatesAndSeasonsHotkeyData = {
  /** Nudge a draggable marker (map/globe observer, sky-map star, orbiting Earth). */
  ARROW_KEYS,

  /** Free-rotate a focused celestial sphere. */
  ROTATE_SKY: new HotkeyData({
    keys: [...ARROW_KEYS],
    repoName: REPO_NAME,
    keyboardHelpDialogLabelStringProperty: controls.rotateSphereStringProperty,
  }),

  /** Rotate a focused celestial sphere about its zenith only (Alt + arrows). */
  ROTATE_ABOUT_ZENITH: new HotkeyData({
    keys: [...ALT_ARROW_KEYS],
    repoName: REPO_NAME,
    keyboardHelpDialogLabelStringProperty: controls.rotateSphereAboutZenithStringProperty,
  }),
} as const;

export default BasicCoordinatesAndSeasonsHotkeyData;
