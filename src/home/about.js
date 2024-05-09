import React from "react";
import { color } from "../@classes/ultility.js";
export function About() {
    const rank_color = [
        { name: "Newbie", rank: "< 1200", color: "#808080" },
        { name: "Pupil", rank: "1200 - 1399", color: "#008000" },
        { name: "Specialist", rank: "1400 - 1599", color: "#03a89e" },
        { name: "Expert", rank: "1600 - 1899", color: "#0000ff" },
        { name: "Candidate Master", rank: "1900 - 2199", color: "#aa00aa" },
        { name: "Master", rank: "2200 - 2399", color: "#ff8c00" },
        { name: "Grandmaster", rank: "≥ 2400", color: "#ff0000" }
    ];
    const administrator = ["nekoteam", "kuumoneko", "kuroneko"];
    const return_res = {
        AC: {
            mess: "OK rồi đó, trong một số trường hợp có thể kèm với phản hồi bổ sung nho nhỏ thôi.",
            status: "Accepted",
            color: "#009926"
        },
        WA: {
            mess: "Chương trình của bạn không gặp chút sự cố nào khi biên dịch, nhưng kết quả chưa khớp với đáp án mà thôi. Thử lại đê.",
            status: "Wrong Answer",
            color: "#f52d00"
        },
        IR: {
            mess: "Ồ, chương trình của bạn trả về lỗi khác 0 (Nếu bạn đang dùng C C++). Đối với các ngôn ngữ khác như Python hoặc Java thì sẽ đi kèm với ngoại lệ như NameError hoặc java.lang.NullPointerException",
            status: "Invalid Return",
            color: "#ff9d00"
        },
        RTE: {
            mess: "Ồ, có vẻ như chường trình của bạn gặp một số vấn đề khi chạy chương trình, bạn nên thử debug lại chương trình của bạn nhé",
            status: "Runtime Exception",
            color: "#ff9d00"
        },
        OLE: {
            mess: "Chương trình của bạn xuất ra quá nhiều dữ liệu stdout vượt quá ràng buộc của bài toán",
            status: "Output Limit Exceeded",
            color: "#ff9d00"
        },
        MLE: {
            mess: "Chương trình của bạn đã hết bộ nhớ giới hạn",
            status: "Memory Limit Exceeded",
            color: "#ff9d00"
        },
        TLE: {
            mess: "Chương trình của bạn mất quá nhiều thời gian để thực thi",
            status: "Time Limit Exceeded",
            color: "#87b4b5"
        },
        IE: {
            mess: "Oh no, có vẻ như hệ thống đã xảy ra lỗi rồi, hãy thử lại sau nhé",
            status: "Internal Error",
            color: "#ff0000"
        }
    };
    const header = Object.keys(return_res);
    const themes = color[JSON.parse(localStorage.getItem("user")).themes.mode] || color.light;
    return (React.createElement("div", null,
        React.createElement("p", null,
            "OJ.LEQUYDON.NET l\u00E0 h\u1EC7 th\u1ED1ng ch\u1EA5m \u0111i\u1EC3m tr\u1EF1c tuy\u1EBFn m\u00F4n Tin h\u1ECDc. H\u1EC7 th\u1ED1ng n\u00E0y \u0111\u01B0\u1EE3c x\u00E2y d\u1EF1ng d\u1EF1a tr\u00EAn open-source",
            React.createElement("a", { rel: "nofollow", href: "https://dmoj.ca/", style: { color: themes.font } }, " DMOJ "),
            "v\u00E0",
            React.createElement("a", { rel: "nofollow", href: "https://oj.vnoi.info/", style: { color: themes.font } }, " VNOJ "),
            "nh\u01B0ng \u0111\u01B0\u1EE3c s\u1EED d\u1EE5ng react.js, x\u00E2y d\u1EF1ng v\u1EDBi m\u1EE5c \u0111\u00EDch gi\u00FAp h\u1ECDc sinh h\u1ECDc t\u1EADp - trau d\u1ED3i ki\u1EBFn th\u1EE9c l\u1EADp tr\u00ECnh v\u00E0 khoa h\u1ECDc m\u00E1y t\u00EDnh c\u0169ng nh\u01B0 t\u1ED5 ch\u1EE9c c\u00E1c cu\u1ED9c thi li\u00EAn quan."),
        React.createElement("p", null,
            "Hệ thống được phát triển và duy trì bởi ",
            React.createElement("span", { className: "rating rate-none admin" },
                React.createElement("a", { href: "/user/kuumoneko", className: "font-bold", style: { display: "inline-block", color: themes.font } }, " kuumoneko")),
            " - tRẠI cỪ"),
        React.createElement("h4", null, "C\u00E1c m\u00E3 tr\u1EA1ng th\u00E1i ch\u1EA5m"),
        React.createElement("p", null,
            React.createElement("table", null,
                React.createElement("tbody", null, header.map((item) => {
                    return (React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("a", { style: { display: "inline-block", color: return_res[item].color, width: "50px", paddingBottom: "15px" } },
                                item,
                                ":")),
                        React.createElement("td", null,
                            React.createElement("a", { style: { display: "inline-block", color: themes.font, width: "1200px", paddingBottom: "15px" } }, return_res[item].mess))));
                })))),
        React.createElement("h4", null, "L\u00E0m c\u00E1ch n\u00E0o \u0111\u1EC3 t\u00EAn c\u00F3 m\u00E0u s\u1EAFc?"),
        React.createElement("p", null,
            "Đơn giản! Chỉ cần tham gia các cuộc thi được đánh giá! Các cuộc thi này có thể dễ dàng được phân biệt bằng thẻ ",
            React.createElement("span", { style: { backgroundColor: "#e54c14", color: "#ffffff" }, className: "contest-tag" },
                React.createElement("i", { className: "fa fa-bar-chart" }),
                "rated"),
            " trong danh sách cuộc thi."),
        React.createElement("p", null, "C\u00E1c m\u00E0u t\u01B0\u01A1ng \u1EE9ng v\u1EDBi c\u00E1c x\u1EBFp h\u1EA1ng sau:"),
        React.createElement("table", { className: "table", style: { borderCollapse: "collapse", width: "100%", textAlign: "center" } },
            React.createElement("tbody", { style: { display: "table-row-group", verticalAlign: "middle", borderColor: "inherit", border: "1px solid rgb(221, 221, 221)" } },
                React.createElement("tr", null,
                    React.createElement("th", { style: { border: "1px solid rgb(221, 221, 221)" } }, "T\u00EAn"),
                    React.createElement("th", { style: { border: "1px solid rgb(221, 221, 221)" } }, "Kho\u1EA3ng rating")),
                rank_color.map((item, index) => {
                    const color = item.color;
                    return (React.createElement("tr", { className: `rating rate-${item.name}` },
                        React.createElement("td", { className: "font-bold", style: { border: "1px solid rgb(221, 221, 221)", color: color } }, item.name),
                        React.createElement("td", { className: "font-bold", style: { border: "1px solid rgb(221, 221, 221)", color: color } }, item.rank)));
                }))),
        React.createElement("p", null,
            "Cu\u1ED1i c\u00F9ng, t\u00EAn ng\u01B0\u1EDDi d\u00F9ng m\u00E0u \u0111en d\u00E0nh cho qu\u1EA3n tr\u1ECB, nh\u01B0",
            administrator.map((item, index) => (React.createElement(React.Fragment, null,
                React.createElement("a", { className: "font-bold", href: `/user/${item}`, style: { color: themes.font } }, ` ${item}`),
                (index != administrator.length - 1) ? "," : "."))))));
}
//# sourceMappingURL=about.js.map