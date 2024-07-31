import React from "react";

const mardown_tags = [
    {
        key: "# ",
        value: "h1"
    },
    {
        key: "## ",
        value: "h2"
    },
    {
        key: "### ",
        value: "h3"
    },
    {
        key: "#### ",
        value: "h4"
    },
    {
        key: "##### ",
        value: "h5"
    },
    {
        key: "###### ",
        value: "h6"
    },
    {
        key: "",
        value: "p"
    },
    {
        key: "\n",
        value: "br"
    },
    {
        key: "**",
        value: "strong"
    },
    {
        key: "*",
        value: "em"
    },
    {
        key: "***",
        value: "em strong"
    },
    {
        key: "> ",
        value: "blockquote",
    },
    {

    }
]

// Custom mardown editor for Nzeko Online Judge
export function Editor(code: string) {

    let result: React.JSX.Element = (
        <div>

        </div>
    )
    let index: number = 0;
    while (index < code.length) {




    }
}