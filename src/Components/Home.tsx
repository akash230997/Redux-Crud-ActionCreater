import React from "react";
// import NavBar from "./NavBar.tsx";
// import { name } from "./NavBar.tsx";
// import Button from "@mui/material/Button";
import NavBar from "./NavBar.tsx";

function Home() {
  // console.log(name);

  return (
    <div>
      <NavBar />
      {/* <NavBar PropName={name} />
      <center>
        <Button variant="contained">Hello world</Button>
      </center> */}
      <center>
        <h1>Home Component</h1>
      </center>
    </div>
  );
}

export default Home;
