import isEditingHost from "../src/editing-host.js";

export default function isEditingHostTests() {
  // Tests for isEditingHost(element)
  // An editing host is either an
  // HTML element with its contenteditable attribute in the true state
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  console.assert(isEditingHost(svg) === false);

  const editingHostDiv = document.createElement("div");
  console.assert(editingHostDiv instanceof HTMLElement === true);
  editingHostDiv.contentEditable = "false";
  console.assert(isEditingHost(editingHostDiv) === false);
  editingHostDiv.contentEditable = "true";
  console.assert(isEditingHost(editingHostDiv) === true);
  editingHostDiv.contentEditable = "inherit";
  console.assert(isEditingHost(editingHostDiv) === false);

  // or a child HTML element whose Document has designMode enabled
  editingHostDiv.contentEditable = "false";
  document.designMode = "off";
  console.assert(isEditingHost(editingHostDiv) === false);
  document.designMode = "on";
  console.assert(isEditingHost(editingHostDiv) === true);

  console.log("finished running isEditingHost tests");
}
