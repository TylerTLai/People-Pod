import { Provider as ReduxProvider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0";
import { store } from "../redux/store";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <div className="text-gray-800">
          <Component {...pageProps} />
        </div>
      </ReduxProvider>
    </UserProvider>
  );
}

export default MyApp;
