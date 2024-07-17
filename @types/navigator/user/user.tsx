import { color, color_themes, get_rank_color, getdata, User, User_role } from 'types';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

export function Nav_User() {
    const [touch, settouch] = useState(false);
    const role = localStorage.getItem("role") as User_role;
    const username = localStorage.getItem("username") as string;

    const rank = Number(localStorage.getItem("rank") as string);


    const [logout, setlogout] = useState(false)

    useEffect(() => {
        async function lmao() {
            if (logout == false)
                return;
            Cookies.remove("remember");

            const res = await getdata("logout", "", "");
            console.log(res)


            localStorage.clear();
            window.location.reload();
        }
        lmao();
    }, [logout])
    return (
        <div>
            <div
                // className='navigator-fi'
                style={{
                    verticalAlign: "middle",
                    paddingLeft: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    height: "100%",
                    paddingRight: "15px"


                }}
                onMouseEnter={(e) => {
                    settouch(true)
                }}
                onMouseLeave={(e) => {
                    settouch(false)
                }}
            >

                {
                    (username) ? (
                        <a href={`/user/${username}`}>
                            {
                                `Hello, `
                            }
                            <a
                                className='font-bold'
                                style={{
                                    color: get_rank_color(rank, User_role.user)
                                }}>
                                {username}
                            </a>
                        </a>
                    ) : (

                        <a href="/account">
                            Login or Signup
                        </a>
                    )
                }


            </div>

            {
                (touch && username) && (
                    <div style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "black",
                        color: "white",
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


                        {
                            (role === User_role.administrator || role == User_role.moderator) && (
                                <div
                                    style={{
                                        height: "40px",
                                        backgroundColor: "black",
                                        borderLeft: `5px solid ${color_themes}`,
                                        zIndex: "1px",
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        cursor: "pointer"

                                    }}
                                >
                                    <a href="/admin">
                                        Admin
                                    </a>
                                </div>
                            )
                        }
                        <div
                            style={{
                                height: "40px",
                                backgroundColor: "black",
                                borderLeft: `5px solid ${color_themes}`,
                                zIndex: "1px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center",
                                cursor: "pointer"

                            }}
                        >
                            <a href={`/user/${username}/edit_profile`}>
                                Edit profile
                            </a>
                        </div>
                        <div
                            style={{
                                height: "40px",
                                backgroundColor: "black",
                                borderLeft: `5px solid ${color_themes}`,
                                zIndex: "1px",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center",
                                cursor: "pointer"

                            }}
                            onClick={(e) => {
                                setlogout(true)
                            }}
                        >
                            Log out
                        </div>
                    </div>
                )
            }

        </div>
    )
}