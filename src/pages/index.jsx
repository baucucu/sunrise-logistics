import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function IndexPage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Button color="secondary" onClick={() => navigate("/signup")}>
        Sign up
      </Button>
    </Box>
  );
}

export default IndexPage;
