import { useState } from "react";
import pt from "prop-types";

import { elementIdentifiers } from "./constants";

import s from "./PropertyEditor.module.scss";

const HeadingEditor = ({ editing }) => {
  const [text, setText] = useState();

  return (
    <div>
      <label htmlFor="headingText">Heading Text</label>
      <input
        id="headingText"
        name="headingText"
        type="text"
        value={text ?? editing?.text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

const ButtonEditor = ({ editing }) => {
  const [text, setText] = useState();

  return (
    <div>
      <label htmlFor="buttonText">Button Text</label>
      <input
        id="buttonText"
        name="buttonText"
        type="text"
        value={text ?? editing?.text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

const TextInputEditor = ({ editing }) => {
  const [label, setLabel] = useState();
  const [placeholder, setPlaceholder] = useState();

  return (
    <>
      <div className={s.row}>
        <label htmlFor="buttonLabel">Label</label>
        <input
          id="buttonLabel"
          name="buttonLabel"
          type="text"
          value={label ?? editing?.label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
      </div>

      <div className={s.row}>
        <label htmlFor="buttonPlaceholder">Placeholder</label>
        <input
          id="buttonPlaceholder"
          name="buttonPlaceholder"
          type="text"
          value={placeholder ?? editing?.placeholder}
          onChange={(e) => {
            setPlaceholder(e.target.value);
          }}
        />
      </div>
    </>
  );
};

const PropertyEditor = ({ formData, setFormData }) => {
  const index = formData.findIndex((x) => x.isEditing);
  const editing = formData[index];

  const getEditor = () => {
    const lookup = {
      [elementIdentifiers.heading]: (
        <HeadingEditor editing={editing} index={index} />
      ),
      [elementIdentifiers.textInput]: (
        <TextInputEditor editing={editing} index={index} />
      ),
      [elementIdentifiers.button]: (
        <ButtonEditor editing={editing} index={index} />
      ),
    };

    return lookup[editing?.element];
  };

  if (!editing?.element) {
    return null;
  }

  const applyChanges = (e) => {
    e.preventDefault();

    const elements = e.target.elements;
    let data = {
      isEditing: false,
    };

    switch (editing?.element) {
      case elementIdentifiers.button:
        data.text = elements.buttonText.value;
        break;
      case elementIdentifiers.heading:
        data.text = elements.headingText.value;
        break;
      case elementIdentifiers.textInput:
        data.placeholder = elements.buttonPlaceholder.value;
        data.label = elements.buttonLabel.value;
        break;
      default:
        break;
    }

    setFormData({ index, indexData: { ...editing, ...data } });
  };

  const cancelChanges = (e) => {
    e.preventDefault();

    editing.isEditing = false;
    setFormData({ index, indexData: editing });
  };

  return (
    <form onSubmit={applyChanges} className={s.propertyEditor}>
      {getEditor()}

      <ul className={s.links}>
        <li>
          <button type="submit">Apply</button>
        </li>
        <li>
          <button onClick={cancelChanges}>Cancel</button>
        </li>
      </ul>
    </form>
  );
};

PropertyEditor.propTypes = {
  formData: pt.array.isRequired,
  setFormData: pt.func.isRequired,
};

export default PropertyEditor;
