import isEditable from "../src/editable.js";
import isEditingHost from "../src/editing-host.js";

export default function isEditableTests() {
  // <p>A node <var>node</var> is <dfn data-export="">editable</dfn> if the following algorithm returns
  // true:</p>

  // test setup: make sure document's designMode is set to the default `off`
  // to prevent it interfering with other tests
  document.designMode = "off";

  // <li>If <var>node</var> is not an instance of Element or Attr, then return false.</li>
  console.assert(isEditable(document.createComment("nonsense")) === false);
  console.assert(isEditable(document.createDocumentFragment()) === false);
  console.assert(isEditable(document) === false);
  console.assert(
    isEditable(document.implementation.createDocumentType("a", "b", "c")) ===
      false
  );

  // <li>If <var>node</var> is an <span>editing host</span>, then return false.</li>
  const div1 = document.createElement("div");
  div1.contentEditable = "true";
  console.assert(isEditingHost(div1) === true);
  console.assert(isEditable(div1) === false);

  // <li>If <var>node</var> is an Element and <var>node</var>'s <code
  // data-x="attr-contenteditable">contenteditable</code> attribute
  // is set to the <i>false</i> state, then return false.</li>
  const div2 = document.createElement("div");
  div2.contentEditable = "false";
  console.assert(isEditable(div2) === false);

  // <li>If <var>node</var> is an instance of Attr, let <var>parent</var>
  // be the <var>node</var>'s ownerElement. Otherwise, if <var>node</var>
  // is an instance of Element, let <var>parent</var> be the <var>node</var>'s
  // parentElement.</li>
  // <li>If <var>parent</var> is null, then return false.</li>
  const div3 = document.createElement("div");
  console.assert(div3.parentElement === null);
  console.assert(isEditable(div3) === false);

  const attr1 = document.createAttribute("class");
  console.assert(attr1.ownerElement === null);
  console.assert(isEditable(attr1) === false);

  // <li>If <var>parent</var> is neither an <span>editing host</span> nor
  // <span>editable</span>, then return false.</li>
  const div4 = document.createElement("div");
  const div4Parent = document.createElement("div");
  div4Parent.append(div4);
  console.assert(isEditingHost(div4.parent) === false);
  console.assert(isEditable(div4.parent) === false);
  console.assert(isEditable(div4) === false);

  // <li>If <var>node</var> is an Element in the <span>HTML namespace</span>, <span>SVG
  // namespace</span>, or <span>MathML namespace</span>, then return true.</li>
  const editingHostDiv = document.createElement("div");
  editingHostDiv.contentEditable = true;

  // test elements in the allowed namespaces
  // Element in the HTML namespace
  const htmlElem = document.createElement("div");
  editingHostDiv.append(htmlElem);
  // make sure it passes an earlier check in the algo
  // so that it reaches the part that checks the element's namespace
  console.assert(isEditingHost(editingHostDiv) === true);
  console.assert(isEditable(htmlElem) === true);

  // Element in the SVG namespace
  const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  editingHostDiv.append(svgElem);
  // make sure it passes an earlier check in the algo
  // so that it reaches the part that checks the element's namespace
  console.assert(isEditingHost(editingHostDiv) === true);
  console.assert(isEditable(svgElem) === true);

  // Element in the MathML namespace
  const mathElem = document.createElementNS(
    "http://www.w3.org/1998/Math/MathML",
    "math"
  );
  editingHostDiv.append(mathElem);
  // make sure it passes an earlier check in the algo
  // so that it reaches the part that checks the element's namespace
  console.assert(isEditingHost(editingHostDiv) === true);
  console.assert(isEditable(mathElem) === true);

  // <li>If <var>node</var> is an Attr and <var>parent</var>
  // is an element in the HTML namespace, then return true.</li>
  const attr2 = document.createAttribute("class");
  editingHostDiv.setAttributeNode(attr2);
  // make sure it passes an earlier check in the algo
  console.assert(isEditingHost(editingHostDiv) === true);
  // debugger;
  console.assert(isEditable(attr2) === true);

  // <li>Return false.</li>

  // test the case where <var>node</var> is an Attr and
  // <var>parent</var> is an element NOT in the HTML namespace
  // to get to the last line of the algo, <var>parent</var> has to be <span>editable</span>
  // since by definition, <var>parent</var> cannot be an <span>editing host</span>
  // if <var>parent</var> is not an Element
  const attr3 = document.createAttribute("class");
  const svgElem2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  editingHostDiv.append(svgElem2);
  svgElem2.setAttributeNode(attr3);
  console.assert(isEditable(svgElem2) === true);
  console.assert(isEditable(attr3) === false);

  console.log("finished running isEditable tests");
}
