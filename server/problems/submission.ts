import { getDataFromDatabase } from "data";
export function get_submission(data: string) {
    const temp = data.split("-");
    const temp_prlblm = getDataFromDatabase("problems", "submissions");
    console.log(temp)
    // data: all
    if (temp[0] == "all") {
        return temp_prlblm;
    }
    else if (temp[1]) {
        // data: problem_id-all
        if (temp[1] == "all") {
            return temp_prlblm.filter((e: any) => e.problem == temp[0]);
        }
        else if (temp[0] == "all") {
            return temp_prlblm.filter((e: any) => e.user == temp[1]);
        }
        // data: problem_id-user_id
        else {
            return temp_prlblm.filter((e: any) => e.problem == temp[0] && e.user == temp[1]);
        }
    }
    // data : id
    else {
        return temp_prlblm.filter((e: any) => e.id == temp[0]);
    }
}