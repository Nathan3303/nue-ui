import printLogo from "./print-logo";
import { makeInstaller } from "@nue-ui/utils";
import components from "./components";
import "@nue-ui/theme/index.css";

printLogo();

const installer = makeInstaller(components);

export * from "@nue-ui/components";
export default installer;
