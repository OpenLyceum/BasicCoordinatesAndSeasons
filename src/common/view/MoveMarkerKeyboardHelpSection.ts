/**
 * MoveMarkerKeyboardHelpSection.ts
 *
 * Keyboard-help section for the draggable markers (map/globe observer, sky-map
 * star, orbiting Earth, coordinate guides). Their KeyboardListeners bind the
 * arrow keys only, so this replaces the stock MoveDraggableItemsKeyboardHelpSection,
 * which would also list WASD and Shift fine movement. The row comes from
 * BasicCoordinatesAndSeasonsHotkeyData.MOVE_MARKER, built from the same key list.
 */

import { KeyboardHelpIconFactory, KeyboardHelpSection, KeyboardHelpSectionRow } from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import BasicCoordinatesAndSeasonsHotkeyData from "../BasicCoordinatesAndSeasonsHotkeyData.js";

export class MoveMarkerKeyboardHelpSection extends KeyboardHelpSection {
  public constructor() {
    super(StringManager.getInstance().getControls().markerHelpHeadingStringProperty, [
      KeyboardHelpSectionRow.fromHotkeyData(BasicCoordinatesAndSeasonsHotkeyData.MOVE_MARKER, {
        icon: KeyboardHelpIconFactory.arrowKeysRowIcon(),
      }),
    ]);
  }
}
