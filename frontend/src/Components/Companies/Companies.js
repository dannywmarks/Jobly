import React, { useState, useEffect } from "react";
import CardList from "../Card/CardList";
import Search from "../Search/Search";
import JoblyApi from "../../api/JoblyApi";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }

    getCompanies();
  }, []);

  async function handleSearch(search) {
    let companies = await JoblyApi.getCompanies(search);
    setCompanies(companies);
  }

  return (
    <div className="col-md-8 offset-md-2">
      <Search endpoint="companies" searchFor={handleSearch} />
      <CardList cards={companies} />
    </div>
  );
}

export default Companies
