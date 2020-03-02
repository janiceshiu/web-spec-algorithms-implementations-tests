/*
 * Checks whether something is an editing host
 * Definition from https://html.spec.whatwg.org/#editing-host
 */
export default function isEditingHost(element) {
  // An editing host is either an

  // HTML element with its contenteditable attribute in the true state
  if (element instanceof HTMLElement && element.contentEditable === "true") {
    return true;
  }

  // or a child HTML element whose Document has designMode enabled.
  if (
    element instanceof HTMLElement &&
    element.ownerDocument.designMode === "on"
  ) {
    return true;
  }

  return false;
}
