import Routes from "./routes";
import { GlobalAlert } from "@ph-mold/ph-ui";
import { SWRProvider } from "./swr-provider";
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
