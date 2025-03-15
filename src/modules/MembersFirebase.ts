// MembersFirebase.ts
import { Member } from "./types";

const BASE_URL = 'https://slutprojekt-js2-654ce-default-rtdb.europe-west1.firebasedatabase.app/members';

export async function getAllMembers(): Promise<Object> {
    const url = BASE_URL + '.json';
    const res = await fetch(url);
    const memberObj = await res.json();
    
    // Map the raw object into Member instances
    const members = Object.keys(memberObj).map(id => new Member(memberObj[id].name, memberObj[id].role));
    
    return members;
}

export async function postMembers(member: Member) {
    const url = BASE_URL + '.json';
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name: member.name,
            role: member.role
        }),
        headers: {
            'Content-type': 'application/json'
        }
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}
