import Routes from "./routes";
import { SWRProvider } from "./swr-provider";
import GlobalAlert from "../components/common/GlobalAlert";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <SWRProvider>
          <Routes />
          <GlobalAlert />
        </SWRProvider>
      </HashRouter>
    </RecoilRoot>
  );
}
