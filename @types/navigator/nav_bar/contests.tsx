import { color, color_themes } from 'ultility/color.js';
import { User_role } from 'ultility/enum.js';
import React, { useState } from 'react'
import Cookies from 'js-cookie';

export function Nav_Contests() {
    const [touch, settouch] = useState(false);

    const theme: "dark" | "light" = Cookies.get("theme") as "dark" | "light";
    const role = localStorage.getItem("role") as User_role
    // console.log(color[theme])
    return (
        <div
        // className='navigator-fi'
        >
            <div
                className='navigator-fi'
                onMouseEnter={(e) => {
                    settouch(true)
                }}
                onMouseLeave={(e) => {
                    settouch(false)
                }}
            >
                <a href="/contests">
                    CONTESTS
                </a>


            </div>

            {
                (touch && (role === User_role.administrator || role == User_role.moderator)) && (
                    <div style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: color[theme].content,
                        // borderLeft: `5px solid ${color_themes}`,
                        zIndex: "1",
                        position: "relative"
                    }}
                        onMouseEnter={(e) => {
                            settouch(true)
                        }}
                        onMouseLeave={(e) => {
                            settouch(false)
                        }}
                    >


                        <div
                            style={{
                                height: "40px",
                                backgroundColor: color[theme].content,
                                borderLeft: `5px solid ${color_themes}`,
                                zIndex: "1px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center"

                            }}
                        >
                            All
                        </div>
                        <div
                            style={{
                                height: "40px",
                                backgroundColor: color[theme].content,
                                borderLeft: `5px solid ${color_themes}`,
                                zIndex: "1px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center"

                            }}
                        >
                            Types
                        </div>
                        <div
                            style={{
                                height: "40px",
                                backgroundColor: color[theme].content,
                                borderLeft: `5px solid ${color_themes}`,
                                zIndex: "1px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center"

                            }}
                        >
                            Groups
                        </div>
                    </div>
                )
            }

        </div>
    )
}