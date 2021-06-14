import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="text-gray-800">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
