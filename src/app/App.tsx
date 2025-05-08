import { HashRouter } from "react-router-dom";
import Routes from "./routes";
import { SWRProvider } from "./swr-provider";

export default function App() {
  return (
    <SWRProvider>
      <HashRouter>
        <Routes />
      </HashRouter>
    </SWRProvider>
  );
}
