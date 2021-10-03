import React, { useEffect, useReducer, useState } from "react";
import { A } from "components/Text";

const PortalApp = (props) => {
  return (
    <div>
      <h2>This is portal {A}</h2>
      <main>{props.children}</main>
    </div>
  );
};

const plugins = new Map();

window.__HR_Plugin_Load__ = function (mod) {
  const fulfill = plugins.get(mod.name);
  fulfill(mod);
  plugins.set(mod.name, mod);
};

function __loadPlugin__(name) {
  return new Promise((fulfill, reject) => {
    if (plugins.has(name)) {
      fulfill(plugins.get(name));
      return;
    }
    const scriptTag = document.createElement("script");
    scriptTag.src = `/dist/${name}.js`;
    document.head.appendChild(scriptTag);
    scriptTag.onerror = reject;
    plugins.set(name, fulfill);
  });
}

const Err = (props) => {
  return <h1 style={{ color: "red" }}>Err to load plugin {props.name}</h1>;
};

function UsePlugin({ name }) {
  const [plugin, setPlugin] = useState(null);

  useEffect(() => {
    __loadPlugin__(name).then(
      (mod) => {
        mod.bootstrap();
        setPlugin(mod);
      },
      (err) => {
        setPlugin({
          render: Err,
        });
      }
    );

    return () => {
      plugins.get(name).destroy();
    };
  }, []);

  if (plugin === null) {
    return <div>loading...</div>;
  }

  if (plugin.render) {
    return <plugin.render name={name} />;
  }
}

export { UsePlugin, PortalApp };
