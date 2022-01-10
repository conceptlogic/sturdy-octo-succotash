import pt from "prop-types";

import GridCell from "./GridCell";

import s from "./FormGrid.module.scss";

const FormGrid = ({ formData, setFormData }) => {
  return (
    <div className={s.grid}>
      {formData.map((data, i) => (
        <GridCell data={data} key={i} index={i} setFormData={setFormData} />
      ))}
    </div>
  );
};

FormGrid.propTypes = {
  formData: pt.array.isRequired,
  setFormData: pt.func.isRequired,
};

export default FormGrid;
