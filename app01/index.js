import React from "react";
import ReactDOM from "react-dom";
import { PortalApp, UsePlugin } from "@hr/portal";
import { Button } from "@hr/components/Button";
import { A } from "@hr/components/Text";

ReactDOM.render(
  <PortalApp>
    <Button />
    {A}
    <div>
      <UsePlugin name="plugin02" />
      <UsePlugin name="plugin01" />
    </div>
  </PortalApp>,
  document.querySelector("#app")
);
