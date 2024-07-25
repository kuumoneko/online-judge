var User_role;
(function (User_role) {
    User_role["administrator"] = "admin";
    User_role["contributor"] = "cont";
    User_role["moderator"] = "mod";
    User_role["user"] = "user";
})(User_role || (User_role = {}));
export const color_themes = "#ff9797";
export const color = {
    dark: {
        font: "#ffffff",
        background: "#6e6e6e",
        content: "#222222"
    },
    light: {
        font: "#000000",
        background: "#f8f8f8",
        content: "#ffffff"
    }
};
export function get_rank_color(points, role, themes = color_themes) {
    let rank_color;
    (function (rank_color) {
        rank_color["Newbie"] = "#808080";
        rank_color["Pupil"] = "#008000";
        rank_color["Specialist"] = "#03a89e";
        rank_color["Expert"] = "#0000ff";
        rank_color["Candidate_Master"] = "#aa00aa";
        rank_color["Master"] = "#ff8c00";
        rank_color["Grandmaster"] = "#ff1a1a";
    })(rank_color || (rank_color = {}));
    if (role == User_role.administrator) {
        return themes;
    }
    else if (points < 1200) {
        return rank_color.Newbie;
    }
    else if (points >= 1200 && points <= 1399) {
        return rank_color.Pupil;
    }
    else if (points >= 1400 && points <= 1599) {
        return rank_color.Specialist;
    }
    else if (points >= 1600 && points <= 1899) {
        return rank_color.Expert;
    }
    else if (points >= 1900 && points <= 2199) {
        return rank_color.Candidate_Master;
    }
    else if (points >= 2200 && points <= 2399) {
        return rank_color.Master;
    }
    else if (points >= 2400) {
        return rank_color.Grandmaster;
    }
    return rank_color.Newbie;
}
export function get_UI_color(mode, getting = "background") {
}
//# sourceMappingURL=index.js.map