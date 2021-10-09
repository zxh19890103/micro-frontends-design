import React, { memo, useEffect, useReducer, useRef, useState } from "react";
import { A } from "components/Text";

const PortalApp = (props) => {
  return (
    <div>
      <h2>This is portal {A}</h2>
      <main>{props.children}</main>
    </div>
  );
};

/**
 * @type {Map<string, import('./index').HrPlugin>}
 */
const plugins = new Map();
const settleFns = {};

window.__HR_Plugin_Load__ = function (mod) {
  const name = mod.name;
  const settle = settleFns[name];
  settle(mod);
  delete settleFns[name];
};

function __loadPlugin__(name) {
  return new Promise((resolve, reject) => {
    if (plugins.has(name)) {
      resolve(plugins.get(name));
      return;
    }
    const scriptTag = document.createElement("script");
    scriptTag.src = `http://0.0.0.0:1992/${name}.js`;
    document.head.appendChild(scriptTag);
    scriptTag.onerror = reject;
    scriptTag.onabort = reject;
    settleFns[name] = resolve;
  });
}

function __installPlugin__(name, mod) {
  mod.bootstrap();
  plugins.set(name, mod);
}

function __destroyPlugin__(name) {
  const plugin = plugins.get(name);
  if (plugin) {
    plugin.destroy();
  }
}

/**
 * What is the render function?
 * - as react component
 * - as an iframe
 * - as a program to render anything (given an html element)
 * @param {import("./index").UsePluginProps} param0
 * @returns
 */
const UsePlugin = memo(({ name, type, ...more }) => {
  // useEffect(() => {
  //   const plugin = plugins.get(name);
  //   plugin && plugin?.update();
  // }, []);

  switch (type) {
    case "iframe":
      return <UseIframePlugin {...more} />;
    case "parcel":
      return <UseParcelPlugin name={name} {...more} />;
    case "program":
      return <UseProgramPlugin name={name} {...more} />;
    case "react-component":
      return <UseReactComponentPlugin name={name} {...more} />;
    default:
      return <h1>type is wrong!</h1>;
  }
});

function useGettingPlugin(name) {
  const [plugin, setPlugin] = useState(require("./plugins/loading"));

  useEffect(() => {
    __loadPlugin__(name).then(
      (mod) => {
        __installPlugin__(name, mod);
        if (!mod.render || typeof mod.render !== "function") {
          setPlugin({
            ...mod,
            render: ({ name }) => <h1>no render for {name}</h1>,
          });
        } else {
          setPlugin(mod);
        }
      },
      (err) => {
        setPlugin(require("./plugins/error"));
      }
    );

    return () => {
      __destroyPlugin__(name);
    };
  }, []);

  return plugin;
}

function UseIframePlugin({ url, ...more }) {
  if (!url) {
    return <div>src is not right.</div>;
  }
  return <iframe src={url} {...more} />;
}

function UseReactComponentPlugin({ name, ...more }) {
  const plugin = useGettingPlugin(name);
  return <plugin.render name={name} {...more} />;
}

function UseParcelPlugin({ name, ...more }) {
  const plugin = useGettingPlugin(name);
  const elementRef = useRef();
  const timeout = useRef();

  clearTimeout(timeout.current);
  timeout.current = setTimeout(() => {
    if (!elementRef.current) return;
    plugin.render({ name, domElement: elementRef.current, ...more });
  }, 100);

  return <div ref={elementRef} />;
}

function UseProgramPlugin({ name, ...more }) {
  const plugin = useGettingPlugin(name);
  const timeout = useRef();

  clearTimeout(timeout.current);
  timeout.current = setTimeout(() => {
    plugin.render({ name, ...more });
  }, 100);

  return null;
}

export { UsePlugin, PortalApp };
