import { DeleteIcon } from "../../icons/DeleteIcon";
import { NotesIcon } from "../../icons/NotesIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";


interface CardProps {
    title: string;
    type: "youtube" | "twitter";
    link: string;
}

const CardTypeVariant = {
    youtube: <YoutubeIcon />,
    note: <NotesIcon />,
    twitter: <TwitterIcon />
}


export const Card = (props: CardProps) => {
    return <div className="rounded-md shadow-md border-gray-200 border-2 p-2 min-w-72 max-w-96 flex-col min-h-48">
        <div className="flex justify-between">
            <div className="flex items-center gap-4"> {CardTypeVariant[props.type]} {props.title}</div>
            <div className="flex items-center gap-4"><a href={props.link} target="_blank"><ShareIcon size="md" /></a> <DeleteIcon size="md" /></div>
        </div>
        <div className="mt-4 max-w-fit">
            {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}

            {props.type === "twitter" && <blockquote className="twitter-tweet">
                <a href={props.link.replace("x.com" ,"twitter.com")}></a>
            </blockquote>}
        </div>
    </div>
}