import { useState } from "react";

import nextData from "./nextData";
import ElementTray from "./ElementTray";
import FormGrid from "./FormGrid";
import PropertyEditor from "./PropertyEditor";
import SvgDefs from "./SvgDefs";

const App = () => {
  const cellCount = 8;
  const [formData, _setFormData] = useState(new Array(cellCount).fill({}));

  const setFormData = ({ index, indexData }) => {
    const next = nextData({
      formData,
      index,
      indexData,
    });

    _setFormData(next);
  };

  return (
    <div className="App">
      <SvgDefs />

      <header>
        <h1>Form Builder</h1>
        <p>
          Drag elements from the menu onto the grid to build and customize your
          form.
        </p>
      </header>

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
        }}
      >
        <ElementTray />

        <FormGrid formData={formData} setFormData={setFormData} />

        <PropertyEditor formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default App;
