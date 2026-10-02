/**
 * SkySphereKeyboardHelpSection.ts
 *
 * Keyboard-help section for the celestial sphere shown on every screen: arrow
 * keys rotate it freely, Alt + arrows rotate it about the zenith. The rows come
 * from the same HotkeyData the sphere's KeyboardListener uses. Icons are given
 * explicitly because the four-key lists would otherwise render as long chains.
 */

import { KeyboardHelpIconFactory, KeyboardHelpSection, KeyboardHelpSectionRow } from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import BasicCoordinatesAndSeasonsHotkeyData from "../BasicCoordinatesAndSeasonsHotkeyData.js";

export class SkySphereKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {
    super(StringManager.getInstance().getControls().skySphereHelpHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(BasicCoordinatesAndSeasonsHotkeyData.ROTATE_SKY, {
        icon: KeyboardHelpIconFactory.arrowKeysRowIcon(),
      }),
      KeyboardHelpSectionRow.fromHotkeyData(BasicCoordinatesAndSeasonsHotkeyData.ROTATE_ABOUT_ZENITH, {
        icon: KeyboardHelpIconFactory.altPlusIcon(KeyboardHelpIconFactory.arrowKeysRowIcon()),
      }),
    ]);
  }
}
