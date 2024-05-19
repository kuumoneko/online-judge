var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
export function get_problem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const temp = (problem) => problem.id == data;
        const res = yield axios.get(`http://localhost:3001/data/problems/${temp}`, {});
        return res.data;
    });
}
export function add_problem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.post(`http://localhost:3001/data`, { mode: "problems", data: data }, {});
        return res.data;
    });
}
export function delete_problem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.delete(`http://localhost:3001/data/problems/${data}`, {});
        return res.data;
    });
}
export function sort_problems(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.patch(`http://localhost:3001/data/problems`, {
            mode: "problems",
            data: {
                data: data.mode,
                reverse: data.reverse
            },
            lineperpage: data.lineperpage,
            page: data.page
        }, {});
    });
}
//# sourceMappingURL=problems.js.map