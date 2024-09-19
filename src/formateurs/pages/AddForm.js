import React from "react";
import { Link } from "react-router-dom";

const AddForm = () => {
  return (
    <div>
      <div className="divImgAdd">
        <div className="divImA">
          <div className="divTitAdd">
            <h3 className="titAdd">Lorem ipsum dolor</h3>
            <p className="parAdd">
              Lorem ipsum dolor sit amet consectetur. In sit tempor ac arcu
              euismod. Mauris rutrum diam diam odio suspendisse.
            </p>
          </div>
          <div className="divbtnAdd">
            <Link to="/newformation">
              <button className="btnAdd" href="Newformation.js">
                Ajouter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
