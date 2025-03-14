export const BASE_URL = 'https://slutprojekt-js2-654ce-default-rtdb.europe-west1.firebasedatabase.app/tasks';

import { Task} from "./types.ts";
//import {TaskArray} from "./types.ts";

export async function getAllTasks():Promise<Object>{
    const url = BASE_URL+'.json'

    const res = await fetch(url);
    const taskObj = await res.json();
    // console.log(taskObj)

    return taskObj;
    
}

export async function postTask(tasks: Task){
    const url = BASE_URL+'.json';

    const options = {
        method: 'POST',
        body: JSON.stringify(tasks),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    //console.log(data);
}

export async function patchDone(id:string, done:boolean){
    console.log(id, done)

    const url = BASE_URL + `/${id}.json`;
    const options = {
        method: 'PATCH', 
        body: JSON.stringify( {done} ),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}

export async function deleteTask(id:string){
    const url = BASE_URL + `/${id}.json`;
    const options = {
        method: 'DELETE'
    }
    
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}



export async function assignTask(id:string, assignedMember:string){
    console.log(id, assignedMember)

    const url = BASE_URL + `/${id}.json`;
    const options = {
        method: 'PATCH', 
        body: JSON.stringify( {assignedMember} ),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}


export async function changeTaskStatus(id:string, status:string){
    console.log(id, status)

    const url = BASE_URL + `/${id}.json`;
    const options = {
        method: 'PATCH', 
        body: JSON.stringify( {status} ),
        headers: {
            'Content-type': 'application/json'
        }
    }

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
}