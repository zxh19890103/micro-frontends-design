import React from "react";
import ReactDOM from "react-dom";
import { PortalApp, UsePlugin } from "@hr/core";
import { Button, A } from "@hr/components";

ReactDOM.render(
  <PortalApp>
    <Button />
    {A}
    <div>
      <UsePlugin type='react-component' name="plugin02" />
      <UsePlugin type='parcel' name="plugin01" />
      <UsePlugin type='parcel' name="plugin03" />
      <UsePlugin type='iframe' url="https://zhangxinghai.cn" width={1200} height={500} />
    </div>
  </PortalApp>,
  document.querySelector("#app")
);
