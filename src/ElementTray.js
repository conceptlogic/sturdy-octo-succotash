import { elementIdentifiers } from "./constants";

import s from "./ElementTray.module.scss";

const ElementTray = () => {
  const handlers = {
    dragStart: (e) => {
      const element = e.target.dataset.element;
      const data = {
        element,
      };

      if (
        element === elementIdentifiers.heading ||
        element === elementIdentifiers.button
      ) {
        data.text = e.target.innerText;
      }

      if (element === elementIdentifiers.textInput) {
        data.label = "";
        data.placeholder = e.target.querySelector("input").placeholder;
      }

      e.dataTransfer.setData("text/json", JSON.stringify(data));
    },
  };

  return (
    <ul onDragStart={handlers.dragStart} className={s.elementTray}>
      <li title="Add a Heading">
        <div
          className={s.draggable}
          draggable
          data-element={elementIdentifiers.heading}
        >
          <h1>Heading</h1>
        </div>
      </li>

      <li title="Add a Text Input">
        <div
          className={s.draggable}
          draggable
          data-element={elementIdentifiers.textInput}
        >
          <input tabIndex="-1" type="text" placeholder="Text Input" />
        </div>
      </li>

      <li title="Add a Button">
        <div
          className={s.draggable}
          draggable
          data-element={elementIdentifiers.button}
        >
          <button tabIndex="-1">Button</button>
        </div>
      </li>
    </ul>
  );
};

export default ElementTray;
