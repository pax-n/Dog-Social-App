import React, { useState, useContext, useEffect } from "react";
import "./SearchResults.css";
import SearchResultElement from "./SearchResultElement";
import { toggleContext } from "./providers/ToggleProvider";
import axios from 'axios';

function SearchResults({ changePage, searchQuery }) {
  const [results, setResults] = useState([]);
  const { settargetID } = useContext(toggleContext);

  const handleProfileClick = (page, friend) => () => {
    settargetID(friend);
    changePage(page);
  }

  useEffect(() => {
    //Gets results from search query and populates the results section.
    axios.get(`/api/search/${searchQuery}`).then((response) => {
      console.log("Search response: ", response);
      let resultlist = response.data;
      setResults(resultlist);
    });
  }, []);

  return (
  <div className="searchresult__main">
        <div className="searchresult__title">
          <h2>Search Result</h2>
        </div>
        <div className="searchresult__users">
        {results &&
          <div>{results.map((result) => {
            return (
              <div>
                <SearchResultElement
                  profile_pic_url={result.profile_pic_url}
                  name={result.dog_name}
                  onClick={handleProfileClick("Profile", result.id)}
                />
              </div>
            );
          })}
          </div>
          }
          {!results &&
          <h4>No results matched!</h4>}
        </div>
      </div>
  );
};

export default SearchResults;
