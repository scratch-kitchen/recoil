const Recoil = createElements();

const stories = [
  { name: "Recoil introduction", url: "example.com" },
  { name: "Rendering DOM elements ", url: "example.com" },
  { name: "Element creation and JSX", url: "example.com" },
  { name: "Instances and reconciliation", url: "example.com" },
  { name: "Components and state", url: "example.com" },
];

const appElement = {
  type: "div",
  props: {
    children: [
      {
        type: "ul",
        props: {
          children: stories.map(storyElement),
        },
      },
    ],
  },
};

function storyElement({ name, url }) {
  const likes = Math.ceil(Math.random() * 100);
  const buttonElement = {
    type: "button",
    props: {
      children: [
        { type: "TEXT ELEMENT", props: { nodeValue: likes } },
        { type: "TEXT ELEMENT", props: { nodeValue: "❤️" } },
      ],
    },
  };
  const linkElement = {
    type: "a",
    props: {
      href: url,
      children: [{ type: "TEXT ELEMENT", props: { nodeValue: name } }],
    },
  };

  return {
    type: "li",
    props: {
      children: [buttonElement, linkElement],
    },
  };
}

Recoil.render(appElement, document.getElementById("root"));

function createElements() {
  function render(element, parentDom) {
    const { type, props } = element;

    // Create DOM element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    // Add event listeners
    const isListener = (name) => name.startsWith("on");
    Object.keys(props)
      .filter(isListener)
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      });

    // Set properties
    const isAttribute = (name) => !isListener(name) && name != "children";
    Object.keys(props)
      .filter(isAttribute)
      .forEach((name) => {
        dom[name] = props[name];
      });

    // Render children
    const childElements = props.children || [];
    childElements.forEach((childElement) => render(childElement, dom));

    // Append to parent
    parentDom.appendChild(dom);
  }

  return {
    render,
  };
}
