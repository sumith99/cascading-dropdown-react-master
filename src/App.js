import React, { useState, useEffect } from "react";
import Select from "react-select";
import data from './data.json';
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";

function App() {
  const [country, setCountry] = useState(null);
  const [lang, setLang] = useState(null);
  const [langList, setLangList] = useState([]);
  const [link, setLink] = useState("");

  // handle change event of the country dropdown
  const handleCountryChange = (obj) => {
    setCountry(obj);
    setLangList(obj.languages);
    setLang(null);
  };

  // handle change event of the language dropdown
  const handleLanguageChange = (obj) => {
    setLang(obj);
  };

  // generate the link when both dropdowns are selected
  useEffect(() => {
    if (country?.lang) {
      setLink("both the fields are selected")
    }
  }, [country, lang]);
  var yesterday = moment().subtract(1, "day");
  function valid(current) {
    return (
      current.day() !== 0 && current.day() !== 6 && current.isAfter(yesterday)
    );
  }
  return (
    <div className="App">
      <h3>Cascading dropdown in React</h3>
      <div style={{ width: 400, marginBottom: 20 }}>
        <b>Country</b>
        <Select
          placeholder="Select Country"
          value={country}
          options={data}
          onChange={handleCountryChange}
          getOptionLabel={x => x.region}
          getOptionValue={x => x.country_code}
        />
        <br />
        <b>Language</b>
        <Select
          placeholder="Select Language"
          value={lang}
          options={langList}
          onChange={handleLanguageChange}
          getOptionLabel={x => x.name}
          getOptionValue={x => x.code}
        />
      </div>
      <span><b>message:</b> {country && lang ? link : '-'}</span>

      <h3>React datetime library used here</h3>
      <h3>Disabling previous and weekends using moment and datetime</h3>
      <Datetime isValidDate={valid} />;
    </div>
  );
}

export default App;
