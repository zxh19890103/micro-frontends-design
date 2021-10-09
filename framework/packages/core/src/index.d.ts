import React from "react"

interface UsePluginProps {
  type: 'react-component' | 'parcel' | 'program' | 'iframe'
  name: string
  url: string
}

export const UsePlugin: (props: UsePluginProps) => JSX.Element
export const PortalApp: React.FunctionComponent
export interface HrPlugin {
  boostrap(): void;
  render(props: { name: string }): JSX.Element | void;
  destroy(): void;
}