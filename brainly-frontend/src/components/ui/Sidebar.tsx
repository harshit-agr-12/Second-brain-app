import { BrainIcon } from "../../icons/BrainIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className="absolute top-0 left-0 min-w-72 bg-gray-100 h-screen p-4">
        <div className="p-4 flex items-center gap-4">
            <div className="text-purple-600"><BrainIcon /></div>
            <div className="text-xl ">Brainly</div>
        </div>
        <div className="hover:bg-slate-300 rounded-md transition-all duration-300 cursor-pointer p-4">
            <SidebarItem type="youtube" icon={<YoutubeIcon/>}/>
        </div>
    </div>
  )
}