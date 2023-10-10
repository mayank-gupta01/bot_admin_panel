import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import env from "react-dotenv";
import axios from "axios";
import "./Login.css"

const Login = (props) => {
  const clientId = env.GOOGLE_CLIENT_ID;
  async function verifyAdmin(decodedData) {
    const email = decodedData.email;
    const res = await axios.get(`${env.BASE_URL}/admin/${email}`);
    console.log(res.data);
    if (res.data) {
      props.setAdmin();
    }
  }
  return (
    <div className="container">
      <h1>Welcome to Admin panel of Weather Bot</h1>
      <p><strong>Bot Link 🤖: </strong><a href="https://t.me/WeatherProjecttttttBot" target="_blank" rel="noopener noreferrer">Weather bot</a></p>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            const decode1 = jwt_decode(credentialResponse.credential);
            console.log(decode1);
            verifyAdmin(decode1);
            props.onLoggedIn();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
