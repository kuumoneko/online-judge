var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { get_rank_color, getdata, getGravatarURL, User_role, geturl } from "types";
function sanitizeHtml(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, 'text/html');
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.parentNode.removeChild(script));
    return doc.body.innerHTML;
}
export function Profile() {
    // console.log(user)
    const [pointsRank, setPR] = useState(0);
    const [rankRank, setRR] = useState(0);
    const [user, setuser] = useState();
    useEffect(() => {
        function lmao() {
            return __awaiter(this, void 0, void 0, function* () {
                const rank_by_points = yield getdata("sort", "users", { mode: "points", search: geturl()[1], reverse: true, page: 1, lineperpage: 100 });
                const rank_by_rank = yield getdata("sort", "users", { mode: "rank", search: geturl()[1], reverse: true, page: 1, lineperpage: 100 });
                // console.log(rank_by_points.data.data[0])
                setRR(rank_by_rank.data.data[0].stt);
                setPR(rank_by_points.data.data[0].stt);
                const data = yield getdata("get", "users", geturl()[1]);
                // console.log(data.data.data[0])
                setuser(data.data.data[0]);
            });
        }
        lmao();
    }, []);
    const [html, sethtml] = useState(React.createElement(React.Fragment, null));
    const color = get_rank_color(Number(localStorage.getItem("rank")), User_role.user, "#ff9797");
    useEffect(() => {
        if (!user) {
            return;
        }
        sethtml(React.createElement(React.Fragment, null,
            React.createElement("div", { style: { width: "100%" } },
                React.createElement("div", { style: { float: "left", height: "400px", minWidth: "15%", border: "1px 1px 1px 1px" } },
                    React.createElement("div", null,
                        React.createElement("img", { src: getGravatarURL(user.email, 200), style: { borderRadius: "100px" } }),
                        React.createElement("br", null),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, " Email: "),
                            React.createElement("a", { style: { fontSize: "20px" } }, user.email)),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, "Points: "),
                            React.createElement("a", { style: { fontSize: "20px" } }, user.points)),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, "Rank by points: "),
                            React.createElement("a", { style: { fontSize: "20px" } }, `#${pointsRank}`)),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, "Problems solved: "),
                            React.createElement("a", { style: { fontSize: "20px" } }, user.problems_count)),
                        React.createElement("a", { style: { display: "block", borderBottom: "1px solid #d2d2d2", minWidth: "30%" } }),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, "Rank by rating: "),
                            React.createElement("a", { style: { fontSize: "20px" } }, `#${rankRank}`)),
                        React.createElement("h4", { style: { borderBottom: "0px" } },
                            React.createElement("a", { className: "font-bold" }, "Rating: "),
                            React.createElement("a", { className: "font-bold", style: { fontSize: "20px", color: color } }, user.rank)))),
                React.createElement("div", { style: { height: "400px", minWidth: "60%" } },
                    (user.group.length != 0) ? (React.createElement(React.Fragment, null,
                        React.createElement("div", null,
                            React.createElement("h1", { className: "font-bold" }, "FROM:")),
                        React.createElement("br", null),
                        React.createElement("div", null,
                            React.createElement("a", null, user.group.map((i, index) => {
                                // console.log(i);
                                if (index == user.group.length - 1) {
                                    return (React.createElement("a", { href: `/group/${i}` }, ` ${i}`));
                                }
                                return (React.createElement("a", { href: `/group/${i}` }, ` ${i},`));
                            }))),
                        React.createElement("br", null))) : (React.createElement(React.Fragment, null)),
                    (user.profile) ?
                        (React.createElement(React.Fragment, null,
                            React.createElement("div", null,
                                React.createElement("h1", { className: "font-bold" }, "ABOUT ME:")),
                            React.createElement("div", null,
                                React.createElement(Markdown, { children: sanitizeHtml(user.profile), rehypePlugins: [rehypeRaw, rehypeSanitize] }))))
                        :
                        (React.createElement(React.Fragment, null))))));
    }, [user]);
    return (html);
}
//# sourceMappingURL=profile.js.map