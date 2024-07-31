import React from "react";
import { Nav_Problems } from "./nav_bar/problems.tsx";
import { Nav_Submissions } from "./nav_bar/submissions.tsx";
import { Nav_Users } from "./nav_bar/users.tsx";
import { Nav_Contests } from "./nav_bar/contests.tsx";
import { Nav_Themes } from "./user/thememode.tsx";
import { Nav_User } from "./user/user.tsx";
import { SearchBar } from "./search_bar/searchBar.tsx";

export function Navigator() {

    return (

        <div className="navigator-container">
            <div className="navigator">
                <div style={{
                    display: "flex"
                }}>
                    <div className="navigator-fi"
                        style={{
                            cursor: "pointer",
                            paddingLeft: "5px"
                        }}
                        onClick={(e) => {
                            window.location.href = "/"
                        }}
                    >
                        <img src="https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/React/React.png"
                            height={35}
                            width={90}

                        />
                        {/* </a> */}
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div
                            style={{
                                display: "block",
                                height: "85%",
                                width: "3px",
                                marginLeft: "5px",
                                backgroundColor: "gray"
                            }}>

                        </div>
                    </div>


                    {/* 
                    task bar
                */}

                    <Nav_Problems />
                    <Nav_Submissions />
                    <Nav_Users />
                    <Nav_Contests />

                    <div className="navigator-fi">
                        <a href="/about">
                            ABOUT
                        </a>
                    </div>
                </div>

                <SearchBar />
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Nav_Themes />
                    <Nav_User />
                </div>

            </div >
        </div>


    )
}