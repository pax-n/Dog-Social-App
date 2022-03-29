import React from "react";
import "./CreateAd.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function CreateAd() {
  return (
    <div className="CreateAd">
      <div className="CreateAd__button">
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: 100, height: "70px", width: "70px" }}
        >
          <AddIcon sx={{ height: "40px", width: "40px" }} />
        </Button>
      </div>
      <div className="CreateAd__text">
        <h3>Create Ad</h3>
      </div>
    </div>
  );
}

export default CreateAd;
