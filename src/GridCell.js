import { useState } from "react";
import pt from "prop-types";
import cx from "classnames";

import { elementIdentifiers } from "./constants";

import s from "./GridCell.module.scss";

const isSvg = (el) => typeof el.className !== "string"; // used to ignore drag events on SVG icons, where className is an object

const GridCell = ({ data, index, setFormData }) => {
  const [isDragging, setIsDragging] = useState();

  const handlers = {
    // see https://stackoverflow.com/a/50233827
    dragOver: (e) => {
      e.stopPropagation();
      e.preventDefault();
    },
    dragEnter: (e) => {
      if (!isSvg(e.target) && e.target.className.includes(s.dropCell)) {
        e.target.className = `${e.target.className} ${s.isDragging}`;
        setIsDragging(true);
      }
    },
    dragLeave: (e) => {
      if (!isSvg(e.target)) {
        e.target.className = e.target.className.replace(s.isDragging, "");
        setIsDragging(false);
      }
    },
    drop: (e) => {
      const indexData = JSON.parse(e.dataTransfer.getData("text/json"));

      setIsDragging(false);
      setFormData({
        index: e.target.dataset.index,
        indexData,
      });
      e.target.className = e.target.className.replace(s.isDragging, "");
    },
    clearCell: (e, index) => {
      setFormData({
        index,
        indexData: {},
      });
    },
    editCell: (e, index) => {
      setFormData({
        index,
        indexData: { ...data, isEditing: true },
      });
    },
  };

  const componentLookup = {
    [elementIdentifiers.heading]: <h1>{data.text || "Heading"}</h1>,
    [elementIdentifiers.button]: (
      <button tabIndex="-1">{data.text || "Button"}</button>
    ),
    [elementIdentifiers.textInput]: (
      <>
        {data.label && (
          <label tabIndex="-1" className={s.label}>
            {data.label}
          </label>
        )}
        <input
          tabIndex="-1"
          type="text"
          placeholder={data.placeholder || "Text Input"}
        />
      </>
    ),
  };

  const getClassNames = () => {
    let classNames = "";

    if (isDragging && data.element) {
      classNames = [s.isDragging, s.hasElement];
    }
    if (data.element) {
      classNames = s.hasElement;
    }

    return classNames;
  };

  return (
    <div
      className={cx(s.dropCell, getClassNames(), data.isEditing && s.isEditing)}
      data-index={index}
      onDragOver={handlers.dragOver}
      onDragEnter={handlers.dragEnter}
      onDragLeave={handlers.dragLeave}
      onDrop={handlers.drop}
    >
      {data.element && (
        <ul className={s.controls}>
          <li title="Edit" onClick={(e) => handlers.editCell(e, index)}>
            <svg className="icon icon-pencil">
              <use href="#icon-pencil"></use>
            </svg>
          </li>
          <li title="Clear cell" onClick={(e) => handlers.clearCell(e, index)}>
            <svg className="icon icon-cross">
              <use href="#icon-cross"></use>
            </svg>
          </li>
        </ul>
      )}

      {componentLookup[data.element]}
    </div>
  );
};

GridCell.propTypes = {
  data: pt.object.isRequired,
  index: pt.number.isRequired,
  setFormData: pt.func.isRequired,
};

export default GridCell;
