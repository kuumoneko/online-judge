
// import Ansi from "ansi-to-react";

export const colortheme = {
    light: {
        background: "#000000",
        text: "#ffffff",
    },
    dark: {
        background: "#ffffff",
        text: "#000000",
    }
}

const rank_color = {
    "Newbie": "#808080",
    "Pupil": "#008000",
    "Specialist": "#03a89e",
    "Expert": "#0000ff",
    "Candidate Master": "#aa00aa",
    "Master": "#ff8c00",
    "Grandmaster": "#ff0000",
}

/**
 * 
 */
export function get_rank_color(points, role) {
    if (role == "administrator") {
        return "#222222"
    }
    if (points < 1200) {
        return rank_color.Newbie
    }
    if (points >= 1200 && points <= 1399) {
        return rank_color.Pupil
    }
    if (points >= 1400 && points <= 1599) {
        return rank_color.Specialist
    }
    if (points >= 1600 && points <= 1899) {
        return rank_color.Expert
    }
    if (points >= 1900 && points <= 2199) {
        return rank_color["Candidate Master"]
    }
    if (points >= 2200 && points <= 2399) {
        return rank_color.Master
    }
    if (points >= 2400) {
        return rank_color.Grandmaster
    }


}


/**
 * 
 * @param {IDBDatabase} db 
 * @param {{username: string , password: string}} user 
 */
export function insertUser(db, user) {
    // create a new transaction
    // console.log(db)
    const txn = db.transaction('user', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('user');
    //
    // console.log(user)
    let query = store.put(user, user.username)

    // handle success case
    query.onsuccess = function (_event) {
        // console.log(event);
    };

    // handle the error case
    query.onerror = function (_event) {
        // console.log(event.target);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}

/**
 * 
 * @param {IDBDatabase} db 
 * @param {{group: string , unt: number}} group 
 */
export function insertGroup(db, group) {
    // create a new transaction
    // console.log(db)
    const txn = db.transaction('group', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('group');
    //
    // console.log(user)
    let query = store.put(group, group.group)

    // handle success case
    query.onsuccess = function (_event) {
        // console.log(event);
    };

    // handle the error case
    query.onerror = function (_event) {
        // console.log(event.target);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
        db.close();
    };
}

/**
 * 
 * @param {IDBDatabase} db 
 * @param {string} key
 */
export async function getUser(db, key) {
    return new Promise((resolve, _reject) => {
        const txn = db.transaction('user', 'readonly');

        // get the Contacts object store
        const store = txn.objectStore('user');

        const res = store.get(key);
        // console.log(res.result)

        res.onsuccess = (e) => {

            db.close();
            resolve(e.target)
        }
    })


}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * 
 * @param {[{fullname: string, username: string,password: string,points: Number,problems_count: Number,group : [],rank:Number,role:string,contribute:number}]} users 
 * @param {string} mode 
 * @param {boolean} [reverse=false] 
 * @param {string} search 
 */
export function SortUser(users, mode, reverse = false, search) {
    // console.log(search)
    search = search.toLowerCase()
    // console.log(mode)
    users.sort((a, b) => (
        (a[mode] - b[mode]) * ((reverse == false) ? 1 : -1)
    )
    )

    const res = []
    let indexx = 1;
    users.forEach((item) => {

        if (search == "") {
            res.push({
                stt: indexx,
                username: item.username,
                user: item
            })
            indexx += 1;
        }
        else if (item.fullname.toLowerCase().includes(search) || item.username.toLowerCase().includes(search)) {
            res.push({
                stt: indexx,
                username: item.username,
                user: item
            })
            if (item.fullname.toLowerCase().includes(search)) {

                const string = item.fullname.toLowerCase();

                const indices = [];
                let currentIndex = 0;

                while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                    indices.push(currentIndex);
                    currentIndex++;
                }

                const temp = []
                let i = 0;
                indices.forEach((itemm) => {
                    temp.push(item.fullname.slice(i, itemm))
                    temp.push(item.fullname.slice(itemm, itemm + search.length))
                    i = itemm + search.length
                })

                temp.push(item.fullname.slice(i))

                item.fullname = (
                    <a>
                        {
                            temp.map((item) => {
                                if (item.toLowerCase() == search) {
                                    return (
                                        <a style={{ backgroundColor: "yellow" }}>
                                            {item}
                                        </a>
                                    )
                                }
                                else {
                                    return (
                                        <a>
                                            {item}
                                        </a>
                                    )
                                }
                            })
                        }
                    </a>
                )
            }
            if (item.username.toLowerCase().includes(search)) {


                const string = item.username.toLowerCase();

                const indices = [];
                let currentIndex = 0;

                while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                    indices.push(currentIndex);
                    currentIndex++;
                }

                const temp = []
                let i = 0;
                indices.forEach((itemm) => {
                    temp.push(item.username.slice(i, itemm))
                    temp.push(item.username.slice(itemm, itemm + search.length))
                    i = itemm + search.length
                })

                temp.push(item.username.slice(i))

                item.username = (
                    <a>
                        {
                            temp.map((item) => {
                                if (item.toLowerCase() == search) {
                                    return (
                                        <a style={{ backgroundColor: "yellow" }}>
                                            {item}
                                        </a>
                                    )
                                }
                                else {
                                    return (
                                        <a>
                                            {item}
                                        </a>
                                    )
                                }
                            })
                        }
                    </a>
                )
            }

            indexx += 1;
        }

    })
    // console.log(res)
    return res;
}

/**
 * 
 * @param { [{group : string , unt:number}] } groups 
 * @param {string} mode 
 * @param {boolean} [reverse=false] 
 * @param {string} search 
 */
export function SortGroup(groups, mode, reverse, search) {
    search = search.toLowerCase()
    // console.log(groups[0][mode])
    groups.sort((a, b) => (
        (a[mode] - b[mode]) * ((reverse == false) ? 1 : -1)
    ))


    const res = []
    let indexx = 1;
    groups.forEach((item) => {

        if (search == "") {
            res.push({
                stt: indexx,
                name: item.group,
                group: item
            })
            indexx += 1;
        }
        else if (item.group.toLowerCase().includes(search)) {
            res.push({
                stt: indexx,
                name: item.group,
                group: item
            })
            const string = item.group.toLowerCase();

            const indices = [];
            let currentIndex = 0;

            while ((currentIndex = string.indexOf(search, currentIndex)) !== -1) {
                indices.push(currentIndex);
                currentIndex++;
            }

            const temp = []
            let i = 0;

            // console.log(item.group.)
            indices.forEach((itemm) => {
                temp.push(item.group.slice(i, itemm))
                temp.push(item.group.slice(itemm, itemm + search.length))
                i = itemm + search.length
            })

            temp.push(item.group.slice(i))

            item.group = (
                <a>
                    {
                        temp.map((item) => {
                            if (item.toLowerCase() == search) {
                                return (
                                    <a style={{ backgroundColor: "yellow" }}>
                                        {item}
                                    </a>
                                )
                            }
                            else {
                                return (
                                    <a>
                                        {item}
                                    </a>
                                )
                            }
                        })
                    }
                </a>
            )
            indexx += 1
        }

    })
    return res;

}

/**
 * 
 * @param {[]} list 
 * @param {Number} size 
 * @returns {[]}
 */
export function ConvertToPage(list, size) {
    return list.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        if (!chunks[chunkIndex]) {
            chunks[chunkIndex] = [];
        }
        chunks[chunkIndex].push(item);
        return chunks;
    }, []);
}

// /**
//  *
//  * @param { { fullname: string, username: string, password: string, points: Number, problems_count: Number, group: [], rank: Number, role: string, contribute: number } } user
//  */
// export function UsersToString(user) {
//     return `${user.username}`
// }

/**
 * 
 * @param { [{ fullname: string, username: string, password: string, points: Number, problems_count: Number, group: [], rank: Number, role: string, contribute: number }] } users 
 */
export function getGroup(users) {
    const res = [];
    const vs = {}
    users.forEach((user) => {
        // console.log(user.group)
        user.group.forEach((group) => {
            if (vs[group] == undefined) {
                vs[group] = 1;
            }
            else {
                vs[group] += 1;
            }
        })

    })

    const bruh = Object.keys(vs);
    bruh.forEach((item) => {
        if (item != "") {
            res.push({
                group: item,
                unt: vs[item]
            })
        }


    })
    return res;
}