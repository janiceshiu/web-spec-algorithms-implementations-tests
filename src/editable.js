import isEditingHost from "../src/editing-host.js";

export default function isEditable(node) {
  // <p>A node <var>node</var> is <dfn data-export="">editable</dfn> if the
  // following algorithm returns true:</p>

  // note - better scoping. discovered after discovering spec bug with node's parent
  // <li>If <var>node</var> is not an instance of Element or Attr, then return false.</li>
  if (node instanceof Element === false && node instanceof Attr === false) {
    return false;
  }

  // <li>If <var>node</var> is an <span>editing host</span>, then return false.</li>
  if (isEditingHost(node)) return false;

  // <li>If <var>node</var> is an Element and <var>node</var>'s <code
  // data-x="attr-contenteditable">contenteditable</code> attribute
  // is set to the <i>false</i> state, then return false.</li>
  if (node instanceof Element && node.contentEditable === "false") return false;

  // <li>If <node>var</node> is an instance of Attr, let <var>parent</var>
  // be the <var>node</var>'s ownerElement. Otherwise, if <var>node</var>
  // is an instance of Element, let <var>parent</var> be the <var>node</var>'s
  // parentElement.</li>
  let parent;
  if (node instanceof Element) {
    parent = node.parentElement;
  } else if (node instanceof Attr) {
    parent = node.ownerElement;
  }

  // <li>If <var>parent</var> is null, then return false.</li>
  if (parent === null) return false;

  // <li>If <var>parent</var> is neither an <span>editing host</span> nor
  // <span>editable</span>, then return false.</li>
  if (isEditingHost(parent) === false && isEditable(parent) === false) {
    return false;
  }

  // <li>If <var>node</var> is an Element in the <span>HTML namespace</span>, <span>SVG
  // namespace</span>, or <span>MathML namespace</span>, then return true.</li>
  const allowedNamespaces = [
    "http://www.w3.org/1999/xhtml",
    "http://www.w3.org/2000/svg",
    "http://www.w3.org/1998/Math/MathML"
  ];
  if (node instanceof Element && allowedNamespaces.includes(node.namespaceURI))
    return true;

  // <li>If <var>node</var> is an Attr and <var>parent</var>
  // is an element in the HTML namespace, then return true.</li>
  const HTMLNameSpace = "http://www.w3.org/1999/xhtml";
  if (
    node instanceof Attr === true &&
    parent instanceof Element &&
    parent.namespaceURI === HTMLNameSpace
  ) {
    return true;
  }

  // <li>Return false.</li>
  return false;
}
