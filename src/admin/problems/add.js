var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useRef, useState } from "react";
import { color, getdata, all_language } from "types";
import { faEye, faPenToSquare, faPlus, faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { sanitize } from "dompurify";
import Cookies from "js-cookie";
export function Add_Problems() {
    // for editor
    const [mode, setmode] = useState("editor");
    const [lines, setlines] = useState([{ line: 1, more: 0 }]);
    // general
    const [name, setname] = useState("");
    const [Title, settitle] = useState("");
    const [isPrivate, setPrivate] = useState(false);
    const [isPublished, setPublished] = useState(false);
    const [groups, setgroups] = useState([""]);
    // host
    const [search, setsearch] = useState("");
    const [users, setusers] = useState([]);
    const [host, sethost] = useState([""]);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                if (search == "") {
                    return setusers([]);
                }
                const searchmode = {
                    mode: "username",
                };
                if (search.includes("\"")) {
                    searchmode.search = search.split("\"")[1];
                }
                else {
                    searchmode.find = search;
                }
                const res = yield getdata("sort", "users", { mode: "username", search: searchmode, reverse: true, page: 1, lineperpage: 5 });
                if (res == undefined) {
                    return setusers([]);
                }
                setusers((res.data == undefined) ? [res] : res.data.data.map((item) => { return item; }));
            });
        }
        lmao();
    }, [search]);
    // source
    const [soucre, setsoucre] = useState("");
    //body
    const [data, setdata] = useState("");
    const [html, sethtml] = useState("");
    // points
    const [points, setpoints] = useState(0);
    // limit
    const [timeLimit, setTimeLimit] = useState(1);
    const [memoryLimit, setMemoryLimit] = useState(512);
    const [allowed_language, setallowed_language] = useState(all_language.map((item) => {
        return {
            id: item,
            time: {
                data: 0,
                isDef: true
            },
            memory: {
                data: 0,
                isDef: true
            },
        };
    }));
    useEffect(() => {
        const temping = allowed_language.map((bruh) => {
            if (bruh.time.isDef == true) {
                bruh.time.data = timeLimit;
            }
            if (bruh.memory.isDef == true) {
                bruh.memory.data = memoryLimit;
            }
            return bruh;
        });
        setallowed_language(temping);
    }, [timeLimit, memoryLimit]);
    // problem data
    const [Titlecheck, checktit] = useState(false);
    const [datacheck, checkdata] = useState(false);
    const [timecheck, checktime] = useState(false);
    const [publish, setpublish] = useState("");
    const contentRef = useRef(null);
    const onClick = (e) => {
        e.preventDefault();
        console.log(data);
        setmode(e.target.id);
    };
    useEffect(() => {
        const lmao = document.getElementById("editorr");
        if (lmao != null && lmao.innerHTML == "") {
            lmao.innerHTML = html;
        }
    });
    const [save, setsave] = useState(false);
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                // console.log("lmao")
                // console.log(`Name: ${name}`);
                // console.log(`title: ${Title}`)
                // console.log(`Publish time: ${publish}`)
                // console.log(`Published: ${isPublished}`)
                // console.log(`Private: ${isPrivate}`)
                // console.log(`Groups: ${groups}`)
                // console.log(`Points: ${points}`)
                // console.log(`Time limit: ${timeLimit}`)
                // console.log(`Memory limit: ${memoryLimit}`)
                // Object.keys(allowed_language).forEach((item, index) => {
                //     console.log(`${index + 1}. ${item}: ${allowed_language[item].time.data} , ${allowed_language[item].memory.data}`)
                // })
                // console.log(`Source: ${soucre}`)
                // console.log(`Body: ${data}`)
                // console.log(host.slice(1, host.length))
                const temp = {};
                Object.keys(allowed_language).forEach((item) => {
                    temp[allowed_language[item].id] = {
                        time: allowed_language[item].time.data,
                        memory: allowed_language[item].memory.data
                    };
                });
                const res = yield getdata("post", "problems", {
                    name: name,
                    title: Title,
                    host: host.slice(1, host.length),
                    publish_time: (isPublished == false) ? publish : "",
                    isPublished: isPublished,
                    def_limit: {
                        time: timeLimit,
                        memory: memoryLimit
                    },
                    isPrivate: isPrivate,
                    groups: (isPrivate == true) ? groups : undefined,
                    points: points,
                    limit: temp,
                    source: soucre ? soucre : "None",
                    avaiable: false,
                    body: data,
                    hint: {
                        nani: false,
                        data: ""
                    }
                });
                console.log(res);
                if (res.status == 200) {
                    window.location.href = "/admin/problems";
                }
            });
        }
        if (save == true)
            lmao();
    }, [save]);
    const [allGroups, setAllGroups] = useState([]);
    const [GroupOptions, setGroupsOptions] = useState(React.createElement(React.Fragment, null));
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield getdata("get", "groups", "all");
                setAllGroups(res.data);
                const temping = (React.createElement(React.Fragment, null, res.data.map((group) => {
                    return (React.createElement("option", {
                        value: group.groupname, style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }
                    }, group.groupname));
                })));
                setGroupsOptions(temping);
            });
        }
        lmao();
    }, []);
    return (React.createElement("div", { className: "add-problems-content" },
        React.createElement("table", { style: { textAlign: "left" } },
            React.createElement("tr", null,
                React.createElement("th", null,
                    React.createElement("a", { className: "add-page-title" }, "general :")),
                React.createElement("th", null)),
            React.createElement("tr", null,
                React.createElement("th", null, "Name :"),
                React.createElement("th", null,
                    React.createElement("input", {
                        style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, type: "text", placeholder: "Problem name", onChange: (e) => {
                            setname(e.target.value);
                        }
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Title:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, type: "text", placeholder: "Title", onChange: (e) => {
                            settitle(e.target.value);
                        }
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Host"),
                React.createElement("th", { style: { display: "flex" } },
                    React.createElement("input", {
                        style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, type: "text", placeholder: "Add host", onChange: (e) => {
                            e.preventDefault();
                            setsearch(e.target.value);
                        }
                    }),
                    React.createElement("ul", { style: { zIndex: "1", display: "flex", flexDirection: "row" } }, users.map((item) => {
                        return (React.createElement("li", {
                            onClick: (e) => {
                                e.preventDefault();
                                if (host.findIndex((itemm) => itemm == item.username) == -1) {
                                    sethost([...host, item.username]);
                                }
                            }, style: {
                                display: "flex",
                                paddingRight: "10px",
                                paddingLeft: "10px"
                            }
                        },
                            React.createElement(FontAwesomeIcon, { icon: faUserPlus }),
                            React.createElement("a", { style: { padding: "0", paddingLeft: "5px", cursor: "pointer" } }, item.username)));
                    })))),
            React.createElement("tr", null,
                React.createElement("th", null),
                React.createElement("th", null, (host.length > 1) && (React.createElement("ul", null, host.map((item) => {
                    if (item != "") {
                        return (React.createElement("li", {
                            onClick: (e) => {
                                e.preventDefault();
                                const temping = host.map((user) => {
                                    if (user != item) {
                                        return user;
                                    }
                                });
                                temping.splice(temping.findIndex((item) => item == undefined || item == null), 1);
                                sethost(temping);
                            }, style: {
                                display: "flex",
                                paddingRight: "10px",
                                paddingLeft: "10px",
                            }
                        },
                            React.createElement(FontAwesomeIcon, { icon: faUserMinus, style: { cursor: "pointer" } }),
                            React.createElement("a", { style: { padding: "0", paddingLeft: "5px", cursor: "pointer" } }, item)));
                    }
                }))))),
            React.createElement("tr", null,
                React.createElement("th", null, "Publish time:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, type: "datetime-local", onChange: (e) => {
                            setpublish(e.target.value);
                        }
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Published:"),
                React.createElement("th", null,
                    React.createElement("li", {
                        style: { display: "flex", flexDirection: "row" }, onClick: (e) => {
                            setPublished((e.target.id == "yes") ? true : false);
                        }
                    },
                        React.createElement("ul", null,
                            React.createElement("input", { name: "isPublished", type: "radio", id: "yes", checked: isPublished == true }),
                            React.createElement("label", { style: { paddingRight: "5px" }, id: "yes" }, "Yes")),
                        React.createElement("ul", null,
                            React.createElement("input", { name: "isPublished", type: "radio", id: "no", checked: isPublished == false }),
                            React.createElement("label", { style: { paddingRight: "5px" }, id: "no" }, "No"))))),
            React.createElement("tr", null,
                React.createElement("th", null, "Private:"),
                React.createElement("th", null,
                    React.createElement("li", {
                        style: { display: "flex", flexDirection: "row" }, onClick: (e) => {
                            setPrivate((e.target.id == "yes") ? true : false);
                        }
                    },
                        React.createElement("ul", null,
                            React.createElement("input", { name: "isPrivate", type: "radio", id: "yes", checked: isPrivate == true }),
                            React.createElement("label", { style: { paddingRight: "5px" }, id: "yes" }, "Yes")),
                        React.createElement("ul", null,
                            React.createElement("input", { name: "isPrivate", type: "radio", id: "no", checked: isPrivate == false }),
                            React.createElement("label", { style: { paddingRight: "5px" }, id: "no" }, "No"))))),
            React.createElement("tr", null,
                React.createElement("th", null, "Groups:"),
                React.createElement("th", { style: { display: "flex" } },
                    React.createElement("input", {
                        list: "list", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, disabled: isPrivate == false, placeholder: "Add/Delete Groups", onChange: (e) => {
                            e.preventDefault();
                            const value = e.target.value;
                            // console.log()
                            const temp = [...groups];
                            if (temp.find((item) => item == value) == undefined && allGroups.find((item) => item.groupname == value)) {
                                temp.push(value);
                            }
                            else if (temp.find((item) => item == value)) {
                                temp.splice(temp.findIndex((item) => item == value), 1);
                            }
                            setgroups(temp);
                        }, value: ""
                    }),
                    React.createElement("datalist", { id: "list" }, GroupOptions),
                    React.createElement(FontAwesomeIcon, {
                        icon: faPlus, style: { paddingLeft: "5px" }, onClick: (e) => {
                            e.preventDefault();
                            window.open("/admin/groups/add", "test", 'width=1337, height=614, left=24, top=24, scrollbars, resizable');
                        }
                    })),
                React.createElement("th", null, groups.map((item) => {
                    return (React.createElement("a", null, ` ${item} `));
                }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Types:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        type: "text", placeholder: "Problem Type", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null,
                    React.createElement("a", { className: "add-page-title" }, "Points and Limit :")),
                React.createElement("th", null)),
            React.createElement("tr", null,
                React.createElement("th", null, "Points:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        type: "text", placeholder: "Points", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, onChange: (e) => {
                            e.preventDefault();
                            // console.log()
                            if (Number.isNaN(Number(e.target.value)))
                                return;
                            // console.log(Number(e.target.value))
                            setpoints(Number(e.target.value));
                        }, value: points == 0 ? "" : points
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Time limit:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        type: "text", placeholder: "Time limit", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, onChange: (e) => {
                            e.preventDefault();
                            if (Number.isNaN(Number(e.target.value)))
                                return;
                            setTimeLimit(Number(e.target.value));
                        }, value: timeLimit == 0 ? "" : timeLimit
                    }))),
            React.createElement("tr", null,
                React.createElement("th", null, "Memory Limit:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        type: "text", placeholder: "Memory Limit", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, onChange: (e) => {
                            e.preventDefault();
                            if (Number.isNaN(Number(e.target.value)))
                                return;
                            setMemoryLimit(Number(e.target.value));
                        }, value: memoryLimit == 0 ? "" : memoryLimit
                    }))),
            React.createElement("tr", null,
                React.createElement("th", { style: { display: "flex", flexDirection: "column" } },
                    React.createElement("a", null, "Allowed Languages &"),
                    React.createElement("a", null, "Spceific time and memory limit:")),
                React.createElement("th", null,
                    React.createElement("input", {
                        list: "language_list", style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, placeholder: "Add/Delete Allowed Language", onChange: (e) => {
                            e.preventDefault();
                            const temp = allowed_language.findIndex((bruh) => bruh.id == e.target.value);
                            let temping;
                            if (temp != -1) {
                                temping = allowed_language.map((item) => {
                                    // console.log(item)
                                    if (item.id != e.target.value) {
                                        return item;
                                    }
                                });
                                temping.splice(temping.findIndex((item) => item == undefined || item == null), 1);
                            }
                            else {
                                temping = [
                                    ...allowed_language,
                                    {
                                        id: e.target.value,
                                        time: {
                                            data: timeLimit,
                                            isDef: true
                                        },
                                        memory: {
                                            data: memoryLimit,
                                            isDef: true
                                        },
                                    }
                                ];
                            }
                            setallowed_language(temping);
                        }, value: ""
                    }),
                    React.createElement("datalist", { id: "language_list" }, all_language.map((item, index) => {
                        return (React.createElement("option", { value: item }, item));
                    })),
                    React.createElement("a", {
                        style: {
                            paddingLeft: "5px",
                            cursor: "pointer"
                        }, onClick: (e) => {
                            e.preventDefault();
                            const tempingg = all_language.map((bruh) => {
                                if (allowed_language.findIndex((lmao) => lmao.id == bruh) == -1) {
                                    return {
                                        id: bruh,
                                        time: {
                                            data: timeLimit,
                                            isDef: true
                                        },
                                        memory: {
                                            data: memoryLimit,
                                            isDef: true
                                        },
                                    };
                                }
                                else {
                                    return allowed_language.find((lmao) => lmao.id == bruh);
                                }
                            });
                            setallowed_language(tempingg);
                        }
                    }, "All language"))),
            React.createElement("tr", null,
                React.createElement("th", null),
                React.createElement("th", null,
                    React.createElement("div", null,
                        React.createElement("table", { style: { textAlign: "left" } },
                            React.createElement("tr", { style: { minWidth: "mac-content" } },
                                React.createElement("th", null, "Allowed Languages"),
                                React.createElement("th", null, "Time Limit"),
                                React.createElement("th", null, "Memory Limit")),
                            allowed_language.map((item, index) => {
                                return (React.createElement("tr", null,
                                    React.createElement("th", null, item.id),
                                    React.createElement("th", null,
                                        React.createElement("input", {
                                            type: "text", style: {
                                                background: color[Cookies.get("theme")].background,
                                                color: color[Cookies.get("theme")].font
                                            }, value: item.time.data == 0 ? "" : item.time.data, onChange: (e) => {
                                                e.preventDefault();
                                                if (Number.isNaN(Number(e.target.value))) {
                                                    return;
                                                }
                                                const temping = allowed_language.map((bruh) => {
                                                    if (bruh.id == item.id) {
                                                        return {
                                                            id: bruh.id,
                                                            time: {
                                                                data: Number(e.target.value),
                                                                isDef: false
                                                            },
                                                            memory: bruh.memory
                                                        };
                                                    }
                                                    else {
                                                        return bruh;
                                                    }
                                                });
                                                setallowed_language(temping);
                                            }
                                        })),
                                    React.createElement("th", null,
                                        React.createElement("input", {
                                            type: "text", style: {
                                                background: color[Cookies.get("theme")].background,
                                                color: color[Cookies.get("theme")].font
                                            }, value: item.memory.data == 0 ? "" : item.memory.data, onChange: (e) => {
                                                e.preventDefault();
                                                if (Number.isNaN(Number(e.target.value))) {
                                                    return;
                                                }
                                                const temping = allowed_language.map((bruh) => {
                                                    if (bruh.id == item.id) {
                                                        return {
                                                            id: bruh.id,
                                                            memory: {
                                                                data: Number(e.target.value),
                                                                isDef: false
                                                            },
                                                            time: bruh.time
                                                        };
                                                    }
                                                    else {
                                                        return bruh;
                                                    }
                                                });
                                                setallowed_language(temping);
                                            }
                                        }))));
                            }))))),
            React.createElement("tr", null,
                React.createElement("th", null, "Source:"),
                React.createElement("th", null,
                    React.createElement("input", {
                        style: {
                            background: color[Cookies.get("theme")].background,
                            color: color[Cookies.get("theme")].font
                        }, type: "text", placeholder: "Soucre", onChange: (e) => {
                            // console.log(e.target.value)
                            setsoucre(e.target.value);
                        }
                    })))),
        React.createElement("div", null,
            React.createElement("span", null, "Body:"),
            React.createElement("div", null,
                React.createElement("button", { onClick: onClick, id: "editor", style: { padding: "3px 3px 3px 3px" } },
                    React.createElement(FontAwesomeIcon, { icon: faPenToSquare }),
                    React.createElement("a", { onClick: onClick, id: "editor", style: { paddingLeft: "5px" } }, "Editor")),
                React.createElement("button", { onClick: onClick, id: "preview", style: { padding: "3px 3px 3px 10px" } },
                    React.createElement(FontAwesomeIcon, { icon: faEye }),
                    React.createElement("a", { onClick: onClick, id: "preview", style: { paddingLeft: "5px" } }, "Preview"))),
            React.createElement("div", { className: "editor" }, (mode == "editor") ? (React.createElement(React.Fragment, null,
                React.createElement("div", {
                    id: "row", style: {
                        color: color[Cookies.get("theme")].background
                    }
                }, lines.map((item, index) => (React.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "0px", paddingBottom: `${item.more * 20}px` } }, index + 1)))),
                React.createElement("div", {
                    className: "editorr", id: "editorr", contentEditable: "true", ref: contentRef,
                    // style={{
                    //     marginTop: "5px",
                    //     marginLeft: "1px",
                    //     height: "350px",
                    //     width: "1400px",
                    //     overflowY: "auto",
                    //     overflowX: "auto",
                    //     flex: "1"
                    // }}
                    onInput: (e) => {
                        e.preventDefault();
                        setdata(e.target.innerText.replace(/\n\n/g, '\n'));
                        sethtml(e.target.innerHTML);
                        const temp = [];
                        e.target.innerText.replace(/\n\n/g, '\n').split("\n").forEach((item, index) => {
                            // console.log(item.split("\n"))
                            if (item.length <= 303) {
                                temp.push({ line: index + 1, more: Math.floor(item.length / 215) });
                                return;
                            }
                            const length = item.length - 95;
                            temp.push({ line: index + 1, more: Math.floor(length / 208) + 1 });
                        });
                        setlines((e.target.innerText != "" && e.target.innerText != "\n") ? temp : [{ line: 1, more: 0 }]);
                    }, onScroll: (e) => {
                        document.getElementById("row").scrollTop = e.target.scrollTop;
                    }
                }))) : (React.createElement("div", {
                    className: "preview", id: "preview", style: {
                        borderColor: "#ccc",
                    }
                },
                    React.createElement(Markdown, { children: sanitize(data), rehypePlugins: [rehypeRaw, rehypeSanitize] })))),
            datacheck && (React.createElement(React.Fragment, null,
                React.createElement("br", null),
                React.createElement("a", { style: { WebkitTextFillColor: "red" } }, "lmao :)))")))),
        React.createElement("div", { style: { paddingTop: "10px" } },
            React.createElement("button", {
                id: "save", className: "submit", style: {
                    float: "right",
                    // backgroundColor: Theme_mode,
                    marginTop: "3px",
                    padding: "3px 3px 3px 3px",
                    borderRadius: "5px"
                }, onClick: (e) => {
                    setsave(true);
                }
            },
                React.createElement("a", {
                    id: "save", onClick: (e) => {
                        setsave(true);
                    }
                }, "Save")))));
}
//# sourceMappingURL=add.js.map