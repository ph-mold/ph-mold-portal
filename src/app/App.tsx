import { HashRouter } from "react-router-dom";
import Routes from "./routes";
import { SWRProvider } from "./swr-provider";
import { RecoilRoot } from "recoil";
import GlobalAlert from "../components/common/GlobalAlert";

export default function App() {
  return (
    <RecoilRoot>
      <SWRProvider>
        <HashRouter>
          <Routes />
          <GlobalAlert />
        </HashRouter>
      </SWRProvider>
    </RecoilRoot>
  );
}
