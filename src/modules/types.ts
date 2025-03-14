 export type Task = {
    done: boolean,
    task: string,
    department: string,
    status: string,
    date: string,
    assignedMember: string,
    description: string,
}

export type Member = {
    name: string,
    role: string,
}



export class MemberArray = {
    name: string;
    role: string;
}


export class TaskArray {
    done: boolean;
    task: string;
    department: string;
    status: string;
    date: string;
    assignedMember: string;
    description: string;

    constructor(taskData: {
        done: boolean;
        task: string;
        department: string;
        status: string;
        date: string;
        assignedMember: string;
        description: string;
    }) {
        this.done = taskData.done;
        this.task = taskData.task;
        this.department = taskData.department;
        this.status = taskData.status;
        this.date = taskData.date;
        this.assignedMember = taskData.assignedMember;
        this.description = taskData.description;
    }
}
    