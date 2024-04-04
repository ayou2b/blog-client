import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faUser,
  faEnvelope,
  faAt,
  faUnlock,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

import { Icon } from "react-icons-kit";
import { youtube } from "react-icons-kit/icomoon/youtube";
import { instagram } from "react-icons-kit/fa/instagram";
import { facebookSquare } from "react-icons-kit/fa/facebookSquare";
import { twitterSquare } from "react-icons-kit/fa/twitterSquare";
import { github } from "react-icons-kit/fa/github";
import { sphere } from "react-icons-kit/icomoon/sphere";
import { eye } from "react-icons-kit/icomoon/eye";
import { eyeBlocked } from "react-icons-kit/icomoon/eyeBlocked";
import { fileText2 } from "react-icons-kit/icomoon/fileText2";
import { quill } from "react-icons-kit/icomoon/quill";

import bg from "../Images/profile.jpg";

function Dashboard() {
  const [passwordType, setPasswordType] = useState("password");

  return (
    <React.Fragment>
      <div className="flex gap-16 px-16 py-5  lg:px-20 xl:px-[100px] 2xl:px-[300px]"></div>
    </React.Fragment>
  );
}

export default Dashboard;
