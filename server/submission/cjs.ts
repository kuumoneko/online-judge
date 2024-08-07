
import { spawn, exec } from 'child_process';

export function cjs(user: string, problem: string, code: string, version: string) {
    const file = "submit.cjs"

    const command = 'start';
    const args = ['cmd.exe', "/c", "nvm", "use", "20.16.0"];

    spawn(command, args, { shell: true });


    

}