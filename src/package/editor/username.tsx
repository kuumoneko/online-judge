import { useEffect, useState } from "react"
import { Preview } from "./preview.tsx"
import { getdata } from "ulti";
import { color, get_rank_color } from "color";
import Cookies from "js-cookie";
import { User_role } from "enum";


export function Username({ line }: { line: string }) {
    const temp = {
        fi: line.slice(0, line.indexOf("@{")),
        select: line.slice(line.indexOf("@{"), line.indexOf("}", line.indexOf("@{") + 1) + 1),
        ed: line.slice(line.indexOf("}", line.indexOf("@{") + 1) + 1, line.length)
    }
    const themes = color["light"] // color[Cookies.get("theme") as "dark" | "light"];

    const [UI, setUI] = useState(<></>);

    useEffect(() => {
        async function getuser() {
            const res = await getdata("get", "users", temp.select.slice(2, temp.select.length - 1))

            setUI(
                <a
                    className="font-bold"
                    style={{
                        padding: "0 0 0 0",
                        marginLeft: "5px",
                        marginRight: "5px",
                        cursor: "pointer",
                        color: get_rank_color(res.data.data[0].rank, User_role.user, themes.font)
                    }}
                    href={`/user/${res.data.data[0].username}`}
                >
                    {
                        res.data.data[0].username
                    }
                </a>
            )
        }

        getuser();
    }, [temp.select])

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <Preview str={temp.fi} />
            {
                UI
            }
            <Preview str={temp.ed} />
        </div>
    )
}