import type { ReactElement } from "react";


export function SidebarItem(props : {
    icon : ReactElement;
    type : string;
}) {
  return (<div className="flex items-center gap-3">
    {props.icon} 
    {props.type}
  </div>
  )
}