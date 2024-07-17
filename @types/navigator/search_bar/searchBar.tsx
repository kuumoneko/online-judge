import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { color } from "types";
import Cookies from "js-cookie";
import { Searching } from "./searching.js";

export function SearchBar() {

    const [clicked, setclick] = useState(false);
    const [search, setsearch] = useState("");

    const theme = Cookies.get("theme") as string;

    useEffect(() => {
        const search_element = document.getElementsByClassName("search-input")[0] as HTMLInputElement;

        if (!clicked) {
            setsearch("")
            search_element.style.width = "0%";
            search_element.style.backgroundColor = "transparent"
        }
        else {
            search_element.style.width = "50%";
            search_element.style.backgroundColor = color[theme].background
        }
    }, [clicked])
    return (
        <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "10px", width: "30%" }}
            onMouseLeave={(e) => { setclick(false); setsearch("") }}
            onKeyDown={(e) => {

                if (e.key === "Enter") {
                    console.log("Search")
                }
            }}
        >
            <FontAwesomeIcon
                style={{
                    color: color[theme].font,
                    fontSize: "20px",
                    cursor: "pointer"
                }}
                icon={faSearch}
                onClick={(e) => {
                    if (clicked) {
                        setsearch("")
                    }
                    setclick(!clicked)

                }}

            />
            <input
                type="text"
                value={search}
                className="search-input"
                style={{
                    // backgroundColor: color[theme].background,
                    color: color[theme].font,
                    marginLeft: "5px",
                    height: "60%",
                    // width: "95%",
                    borderRadius: "5px",
                    transition: "all 1s ease-in-out"
                }}

                onChange={(e) => {
                    setsearch(e.target.value)
                }}

            />

            <Searching search={search as string} />
        </div>
    )
}