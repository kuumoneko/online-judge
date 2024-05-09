import React from "react"


export function Admin() {

    const url = document.URL.split("//")[1].split("/")


    return (
        <div>
            <a>
                {
                    url[2] || "Admin Home"
                }
            </a>
        </div>
    )
}