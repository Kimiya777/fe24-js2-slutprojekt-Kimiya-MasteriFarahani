const BASE_URL = 'https://slutprojekt-js2-654ce-default-rtdb.europe-west1.firebasedatabase.app/members';

import { Member } from "./types";

export async function getAllMembers():Promise<Object>{
    const url = BASE_URL+'.json'

    const res = await fetch(url);
    const memberObj = await res.json();
    // console.log(taskObj)

    return memberObj;
}

export async function postMembers(members: Member){
    const url = BASE_URL+'.json';
console.log(members);
    const options = {
        method: 'POST',
        body: JSON.stringify(members),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}

export async function patchDone(id:string, role:string){
    console.log(id, role)

    const url = BASE_URL + `/${id}.json`;
    const options = {
        method: 'PATCH', 
        body: JSON.stringify( {role} ),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}
