import { makeInstaller } from "@nue-ui/utils";
import components from "./components";
import "@nue-ui/theme/index.css";

const installer = makeInstaller(components);

export * from "../components";
export default installer;
