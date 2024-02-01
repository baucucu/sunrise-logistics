import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { PropTypes } from "prop-types";

const Layout = ({ children }) => {
  return (
    <div>
      <SideBar />
      <div style={{ marginLeft: "200px" /* Adjust based on SideBar width */ }}>
        <Topbar />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
