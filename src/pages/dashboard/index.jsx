import { useNavigate } from "react-router-dom";

import AuthWrapper from "../../utils/AuthWrapper";
import { getAuth } from "firebase/auth";

import Layout from "../../globals/Layout";

function Page() {
  const navigate = useNavigate();
  const userEmail = getAuth().currentUser.email;
  return (
    <Layout>
      <p>User email: {userEmail}</p>
      <button onClick={() => getAuth().signOut()}>Sign out</button>
      <h1>Dashboard Page</h1>
      {/* back button using react dom router */}
      <button onClick={() => navigate(-1)}>Go back</button>
      <p>
        This is the dashboard page. You can edit it at{" "}
        <code>src/pages/dashboard/index.jsx</code>.
      </p>
    </Layout>
  );
}

const DashboardPage = AuthWrapper(Page);
export default DashboardPage;
