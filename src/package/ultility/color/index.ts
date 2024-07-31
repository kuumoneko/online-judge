import { User_role } from "../enum/index.ts"

const color_themes = "#ff9797"

const color: {
    dark: {
        font: string,
        background: string,
        content: string
    },
    light: {
        font: string,
        background: string,
        content: string
    }
} = {
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
}

function get_rank_color(points: number, role: User_role, themes: string = color_themes): string {
    enum rank_color {
        "Newbie" = "#808080",
        "Pupil" = "#008000",
        "Specialist" = "#03a89e",
        "Expert" = "#0000ff",
        "Candidate_Master" = "#aa00aa",
        "Master" = "#ff8c00",
        "Grandmaster" = "#ff1a1a",
    }

    if (role == User_role.administrator) {
        return themes;
    }
    else if (points < 1200) {
        return rank_color.Newbie
    }
    else if (points >= 1200 && points <= 1399) {
        return rank_color.Pupil
    }
    else if (points >= 1400 && points <= 1599) {
        return rank_color.Specialist
    }
    else if (points >= 1600 && points <= 1899) {
        return rank_color.Expert
    }
    else if (points >= 1900 && points <= 2199) {
        return rank_color.Candidate_Master
    }
    else if (points >= 2200 && points <= 2399) {
        return rank_color.Master
    }
    else if (points >= 2400) {
        return rank_color.Grandmaster
    }

    return rank_color.Newbie
}

// export function get_UI_color(mode: string, getting: string = "background") {

// }
export {
    color, color_themes, get_rank_color
}