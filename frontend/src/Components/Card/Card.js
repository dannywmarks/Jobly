import React from "react";
// import "./Card.css";
import CompanyCard from "../Companies/Company/CompanyCard";
import JobCard from "../Jobs/Job/JobCard";

function Card({ item = {}, apply = () => null, idx }) {
  if (item.handle) {
    return <CompanyCard item={item} />;
  } else {
    return <JobCard item={item} handleApply={() => apply(idx)} />;
  }
}

export default Card;