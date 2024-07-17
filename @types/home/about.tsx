import React from "react";
import { color } from "types";


export function About() {
    const rank_color = [
        { name: "Newbie", rank: "< 1200", color: "#808080" },
        { name: "Pupil", rank: "1200 - 1399", color: "#008000" },
        { name: "Specialist", rank: "1400 - 1599", color: "#03a89e" },
        { name: "Expert", rank: "1600 - 1899", color: "#0000ff" },
        { name: "Candidate Master", rank: "1900 - 2199", color: "#aa00aa" },
        { name: "Master", rank: "2200 - 2399", color: "#ff8c00" },
        { name: "Grandmaster", rank: "≥ 2400", color: "#ff0000" }

    ]

    const administrator = ["nekoteam", "kuumoneko", "kuroneko"]
    const return_res: any = {
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
    }

    const header = Object.keys(return_res);
    const themes = color[JSON.parse((localStorage.getItem("user") as string)).themes.mode] || color.light;
    return (
        <div>
            <p>
                OJ.KUUMOOJ.NET là hệ thống chấm điểm trực tuyến môn Tin học. Hệ thống này được xây dựng dựa trên open-source
                <a target="_blank" rel="noopener noreferrer" href="https://dmoj.ca/" style={{ color: themes.font }}>
                    {" DMOJ "}
                </a>
                và
                <a target="_blank" rel="noopener noreferrer" href="https://oj.vnoi.info/" style={{ color: themes.font }}>
                    {" VNOJ "}
                </a>
                nhưng được xây dựng trên nền
                <a target="_blank" rel="noopener noreferrer" href="https://react.dev/?uwu=true">
                    {" React.js "}
                </a>
                , xây dựng với mục đích giúp học sinh học tập - trau dồi kiến thức lập trình và khoa học máy tính cũng như tổ chức các cuộc thi liên quan.
            </p>

            <p>
                {"Hệ thống được phát triển và duy trì bởi "}
                <span className="rating rate-none admin">
                    <a href="/user/kuumoneko" className="font-bold" style={{ display: "inline-block", color: themes.font }}>
                        {" kuumoneko"}
                    </a>
                </span>
                {" - tRẠI cỪ"}
            </p>


            <h4>
                Các mã trạng thái chấm
            </h4>
            <p>
                <table>
                    <tbody>
                        {
                            header.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <a style={{ display: "inline-block", color: return_res[item].color, width: "50px", paddingBottom: "15px" }}>
                                                {item}:
                                            </a>

                                        </td>
                                        <td>
                                            <a style={{ display: "inline-block", color: themes.font, width: "1200px", paddingBottom: "15px" }}>
                                                {return_res[item].mess}
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </p>
            {/* <h4>
                Điểm cộng khác với điểm ghi trên vấn đề
            </h4>
            <p>
                Để cho dễ hiểu thì khi bạn càng làm nhiều bài tập với cùng số điểm (ví dụ như 200 điểm) thì hệ thống sẽ không cộng cho bạn 100% của 200 điểm mà sẽ giảm đi 1 tí. Việc này nhằm khuyến khích bạn làm nhiều bài tập hơn.
            </p> */}
            <h4>
                Làm cách nào để tên có màu sắc?
            </h4>
            <p>
                {"Đơn giản! Chỉ cần tham gia các cuộc thi được đánh giá! Các cuộc thi này có thể dễ dàng được phân biệt bằng thẻ "}
                <span style={{ backgroundColor: "#e54c14", color: "#ffffff" }} className="contest-tag">
                    <i className="fa fa-bar-chart">
                    </i>
                    rated
                </span>
                {" trong danh sách cuộc thi."}
            </p>
            <p>
                Các màu tương ứng với các xếp hạng sau:
            </p>
            <table className="table" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
                <tbody style={{ display: "table-row-group", verticalAlign: "middle", borderColor: "inherit", border: "1px solid rgb(221, 221, 221)" }}>

                    <tr>
                        <th style={{ border: "1px solid rgb(221, 221, 221)" }} >Tên</th>
                        <th style={{ border: "1px solid rgb(221, 221, 221)" }}>Khoảng rating</th>
                    </tr>
                    {
                        rank_color.map((item, index) => {
                            const color = item.color
                            return (
                                <tr className={`rating rate-${item.name}`} >
                                    <td className="font-bold" style={{ border: "1px solid rgb(221, 221, 221)", color: color }}>
                                        {item.name}
                                    </td>
                                    <td className="font-bold" style={{ border: "1px solid rgb(221, 221, 221)", color: color }}>
                                        {item.rank}
                                    </td>
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
            <p>
                Cuối cùng, tên người dùng màu đen dành cho quản trị, như
                {
                    administrator.map((item, index) => (
                        <>
                            <a className="font-bold" href={`/user/${item}`} style={{ color: themes.font }}>
                                {` ${item}`}
                            </a>
                            {
                                (index != administrator.length - 1) ? "," : "."
                            }
                        </>

                    ))
                }


            </p>
        </div >
    )
}