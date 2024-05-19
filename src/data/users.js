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
export function get_user(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const temp = (user) => user.username == data;
        const res = yield axios.get(`http://localhost:3001/data/users/${temp}`, {});
        return res.data;
    });
}
export function add_user(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.post(`http://localhost:3001/data`, { mode: "users", data: data }, {});
        return res.data;
    });
}
export function delete_user(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.delete(`http://localhost:3001/data/users/${data}`, {});
        return res.data;
    });
}
export function sort_users(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.patch(`http://localhost:3001/data/users`, {
            mode: "users",
            data: {
                data: data.mode,
                reverse: data.reverse
            },
            lineperpage: data.lineperpage,
            page: data.page
        }, {});
    });
}
//# sourceMappingURL=users.js.map