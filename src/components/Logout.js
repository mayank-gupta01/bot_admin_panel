import env from "react-dotenv";
import "./Logout.css";
import Subscriber from "./Subscriber";
import axios from "axios";
import { useState, useEffect } from "react";
function Logout(props) {
  const [subscriberData, setSubscriberData] = useState([]);
  async function fetchInfo() {
    const subscribers = await axios.get(`${env.BASE_URL}/subscriber`);
    setSubscriberData(subscribers.data);
  }
  useEffect(() => {
    fetchInfo();
  }, []);

  const delBlockHandler = () => {
    fetchInfo();
  };
  return (
    <div>
      {subscriberData.length > 0 && (
        <Subscriber
          subData={subscriberData}
          onDeleteBlock={delBlockHandler}
        ></Subscriber>
      )}
      {subscriberData.length === 0 && <h1>No Data Found</h1>}
      <div className="container">
        <button className="buttons" onClick={props.onLoggedOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
