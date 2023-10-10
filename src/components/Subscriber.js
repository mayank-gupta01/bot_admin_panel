import axios from "axios";
import "./Subscriber.css";
import env from "react-dotenv";

const Subscriber = (props) => {
  //get data ot display
  //Name button(DELETE) button(BLOCK)
  const blockHandler = async (chatId) => {
    //add user to the block list and also delete it from the subscriber
    try {
      await axios.post(`${env.BASE_URL}/block`, {
        chatId: chatId,
      });
      deleteHandler(chatId);
    } catch (error) {
      console.error("Error in Block handler", error);
    }
  };
  const deleteHandler = async (chatId) => {
    try {
      //delete the user with the help of delete apis
      await axios.delete(`${env.BASE_URL}/subscriber/${chatId}`);
      props.onDeleteBlock();
    } catch (error) {
      console.error("Error in Delete Handler", error);
    }
  };
  return (
    <div>
      <h1 className="heading">List Of Subscribers</h1>
      <ul className="name-list">
        {props.subData.map((data) => (
          <li className="name-item" key={data.chatId}>
            <span>{data.firstName + " " + data.lastName}</span>
            <div className="name-buttons">
              <button
                className="block-button"
                onClick={() => blockHandler(data.chatId)}
              >
                BLOCK
              </button>
              <button
                className="delete-button"
                onClick={() => deleteHandler(data.chatId)}
              >
                DELETE
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriber;
