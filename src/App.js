import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Loading from "./Loading";
import logo from "./people.png";
const App = () => {
  const [cardData, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const allData = async () => {
    if (visibility) {
      const res = await axios.get("https://reqres.in/api/users?page=1");
      const delay = 3500;
      await new Promise((resolve) => setTimeout(resolve, delay));
      setData(res.data.data);
    }
    setLoading(false);
  };
  const display = () => {
    setVisibility(true);
    setLoading(true);
  };
  
  useEffect(() => {
    if (visibility) {
    

      allData();
    }
  }, [loading]);
  const renderCard = (user) => {
    if (loading) return loading;
    else {
      return (
        <div className="card text-center div ">
          <img
            src={user.avatar}
            alt=""
            className="square-img"
            style={{ width: "150px" }}
          />
          <h3>
            {user.first_name} {user.last_name}
          </h3>
          <h3>{user.email}</h3>
        </div>
      );
    }
  };
  return (
    <div className="App">
      <nav className="navbar " style={{ backgroundColor: "black" }}>
        <img src={logo} alt="" style={{ height: "80px", width: "100px" }} />

        <button
          className="btn "
          style={{ backgroundColor: "black" }}
          onClick={display}
        >
          Get Users
        </button>
      </nav>

      {loading ? <Loading /> : null}
      <div className="container" style={userStyle}>
        {loading ? null : cardData.map(renderCard)}
      </div>
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "3rem",
  marginBottom: "40px",
  borderRadius: "20px",
};

export default App;
