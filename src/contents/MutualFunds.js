import React, { useState, useEffect } from "react";
import axios from "axios";
import mystyles from "./MutualFunds.module.scss";
import styles from "../style.module.scss";
import { riskProfile, investment } from "./FilterList";
import CheckBox from "./CheckBox";
import { Settings } from "../utils/constants";

function MutualFunds() {
  const [funds, setFunds] = useState([]);
  const [isLoading, setLoading] = useState(Settings.BOOLEANFALSE);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const Data = async () => {
      setLoading(Settings.BOOLEANTRUE);
      try {
        const result = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://prr7fx7sh0.execute-api.ap-south-1.amazonaws.com/dev/pten/funds`,
          {
            mode: "cors",

            headers: {
              "Content-Type": "text/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          }
        );
        setFunds(result.data.result);
        setLoading(Settings.BOOLEANFALSE);
      } catch (err) {
        setLoading(Settings.BOOLEANFALSE);
        setError(err.message);
      }
    };
    Data();
  }, []);


  {/*filtering by name uses below two functions*/}
  // const handleName = (event) => {
  //   setSearch(event.target.value);
  // };

  // const filterdata = funds.filter((c) => {
  //   return c.name.toLowerCase().indexOf(search) !== -1;
  // });

  const onFilterChange = (event, val) => {
    let temp = [...activeFilter];
    if (event.target.checked) {
      temp.push(val);
      setActiveFilter(temp);
    } else {
      temp.splice(temp.indexOf(val), 1);
      setActiveFilter(temp);
    }
  };

  //rendering cardlist section
  const renderCardList = (data) => {
    return (
      <ul>
        {data &&
          data.map((item) => (
            <li key={item.id}>
              <div
                className={`card mb-4 shadow rounded`}
                style={{ borderRadius: "15px" }}
              >
                <div
                  className={`d-flex justify-content-start align-items-center`}
                >
                  <img src={item.fundImage} alt={item.fundImage} />
                  <h5>{item.name}</h5>
                </div>
                <div className={mystyles.tableWrapper}>
                  <table className={`m-2 rounded ${mystyles.myTable}`}>
                    <thead>
                      <tr>
                        <th>{Settings.ANNUALRETURNS}</th>
                        <th>{Settings.THREE_YR_RETURNS}</th>
                        <th>{Settings.MININVESTMENT}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{item.annualizedReturn}</td>
                        <td>{item.threeYearReturn}</td>
                        <td>
                          <span>
                            <i className={`fas fa-rupee-sign`}></i>
                          </span>
                          {item.minInvestment}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" style={{ fontWeight: "lighter" }}>
                          {Settings.RISKPROFILE}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3">{item.riskProfile}</td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="button" className={mystyles.myButton}>
                    {Settings.SELECTFUND}
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  };

  let list;

  if (activeFilter.length === 0) {
    list = funds;
  } else {
    list = funds.filter((i) => {
      return (
        activeFilter.includes(i.riskProfile) ||
        activeFilter.includes(i.minInvestment)
      );
    });
  }

 

  return (
    <>
      <section className={`container-fluid`}>
        <h4 className={styles.filter}>{Settings.FILTERS}</h4>
        <div className={styles.splitBox}>
          <p>{Settings.FILTERBYRISK}</p>
        </div>

        <ul>
          {riskProfile.map((item) => (
            <li key={item.id}>
              <div className={mystyles.checkbox}>
                <CheckBox
                  name={item.name}
                  id={item.id}
                  value={item.value}
                  onChange={(event) => onFilterChange(event, item.value)}
                  className={styles.square}
                />
                <label htmlFor={item.id}>{item.value}</label>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.splitBox}>
          <p>{Settings.FILTER_BY_MININUM_INVESTMENT}</p>
        </div>

        <ul>
          {investment.map((item) => (
            <li key={item.id}>
              <div className={mystyles.checkbox}>
                <CheckBox
                  name={item.name}
                  id={item.id}
                  value={item.value}
                  onChange={(event) => onFilterChange(event, item.value)}
                  className={styles.checkboxRounded}
                />
                <label htmlFor={item.id} style={{color: '#006400'}}><i className={`fas fa-rupee-sign`}></i>{item.value}</label>
              </div>
            </li>
          ))}
        </ul>
{/* Improvisation to Application by adding searching filter through name}*/}
        {/* <div className={styles.splitBox}>
          <p>{Settings.FILTER_BY_FILTER}</p>
        </div>
        <div>
          <input
            type="text"
            value={search}
            placeholder={Settings.SEARCH}
            onChange={handleName}
            className={mystyles.search}
          />
        </div> */}
      </section>
      {/* displaying main content  */}
      <section>
        <div className={`container-fluid mt-2`}>
          {isLoading && (
            <h3 className={styles.loading}>{Settings.LOADING} ....</h3>
          )}
          {renderCardList(list)}
          {error && <h3 className={styles.error}> {error} </h3>}
        </div>
      </section>
    </>
  );
}

export default MutualFunds;
