import { deleteTask, getAllTasks, patchDone, assignTask, changeTaskStatus } from "./TaskFirebase.ts";
import { getAllMembers } from "./MembersFirebase.ts";
import { memberForm } from "../main.ts";
import { Task } from "./types.ts";
//import { filterByMember, filterByCategory, sortByTimestamp, sortByTitle } from "./FilterAndSort";

const assignButton = document.querySelector('#assign-task-to-member-final') as HTMLButtonElement;

const taskSelect = document.querySelector("#assign-task-to-member-task") as HTMLSelectElement;
const memberSelect = document.querySelector("#assign-task-to-member-member") as HTMLSelectElement;


const filterForm = document.getElementById('filterForm') as HTMLFormElement;
const filterCategorySelect = document.getElementById('category-filter') as HTMLSelectElement;
const filterMemberSelect = document.getElementById('member-filter') as HTMLSelectElement;
const sortSelect = document.getElementById('sort-tasks') as HTMLSelectElement;

export function renderAllTasks(taskArray: Task[]): void {
    const newTasksContainer = document.querySelector("#new-tasks") as HTMLDivElement;
    const inProgressContainer = document.querySelector("#in-progress-tasks") as HTMLDivElement;
    const doneTasksContainer = document.querySelector("#done-tasks") as HTMLDivElement;

    newTasksContainer.innerHTML = '';
    inProgressContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';
    taskSelect.innerHTML = '';

    for (const task of taskArray) {
        const taskID = task.id|| "unknown-id";

        const container = document.createElement('div');
        const taskName = document.createElement('h3');

        container.id = taskID;
        taskName.innerText = task.task;
        container.append(taskName);

        const showDate = document.createElement('p');
        showDate.innerText = `Date: ${task.date}`;
        container.append(showDate);

        const showDescription = document.createElement('p');
        showDescription.innerText = `Description: ${task.description}`;
        container.append(showDescription);

        const showAssignedMember = document.createElement('p');
        showAssignedMember.innerText = `Assigned member: ${task.assignedMember}`;
        container.append(showAssignedMember);

        const showDepartment = document.createElement('p');
        showDepartment.innerText = `Category: ${task.department}`;
        container.append(showDepartment);

        if (task.status === "in progress") {

            inProgressContainer.append(container);

            //Använt chatgpt
            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.display = "flex";
            checkboxContainer.style.alignItems = "center";
            checkboxContainer.style.gap = "5px"; // Adds spacing

            const doneLabel = document.createElement('label');
            doneLabel.innerText = "Done:";

            const doneCheckbox = document.createElement('input');
            doneCheckbox.type = 'checkbox';
            doneCheckbox.addEventListener('change', async () => {
                if (doneCheckbox.checked) {
                    await changeTaskStatus(taskID, "done");
                    const tasks = await getAllTasks();
                    renderAllTasks(tasks);

                }
            });

            checkboxContainer.append(doneLabel, doneCheckbox);
            container.append(checkboxContainer);
        }
        else if (task.status === "done") {

            doneTasksContainer.append(container);

            const deleteContainer = document.createElement('div');
            deleteContainer.style.display = "flex";
            deleteContainer.style.alignItems = "center";
            deleteContainer.style.gap = "5px";

            //Used chatgpt for creating the labels and buttons
            //  Add "Delete:" label
            const deleteLabel = document.createElement('label');
            deleteLabel.innerText = "Delete:";

            //  Add delete button
            const delBtn = document.createElement('button');
            delBtn.innerText = 'X';
            container.append(delBtn);

            delBtn.addEventListener('click', async () => {
                await deleteTask(taskID);
                const tasks = await getAllTasks();
                renderAllTasks(tasks);
            });


            // Append label and delete button to container
            deleteContainer.append(deleteLabel, delBtn);
            container.append(deleteContainer);
        }
        else {
            newTasksContainer.append(container);

            const taskOption = document.createElement('option') as HTMLOptionElement;
            taskOption.value = task.id as string;
            taskOption.innerText = task.task;
            taskSelect.append(taskOption);
        }
        console.log(task.task);
    }
}


export function renderAllMembers(memberObj: Object) {
    //console.log(memberObj)

    const containerAllMembers = document.querySelector("#membersContainer") as HTMLDivElement;
    containerAllMembers.innerHTML = '';
    memberSelect.innerHTML = '';

    for (const firebaseID in memberObj) {
        //console.log(firebaseID, memberObj[firebaseID]);

        const container = document.createElement('div');
        const memberP = document.createElement('h3');


        container.id = firebaseID;
        memberP.innerText = memberObj[firebaseID].name;

        container.append(memberP);
        containerAllMembers.append(container);

        const showRole = document.createElement('p');
        showRole.innerText = `Role: ${memberObj[firebaseID].role}`;
        container.append(showRole);

        const membersOptions = document.createElement('option') as HTMLOptionElement;
        membersOptions.value = firebaseID;
        membersOptions.innerText = memberObj[firebaseID].name;
        memberSelect.append(membersOptions);
        memberSelect.value = firebaseID;

        const filterByMemberOption = document.createElement('option') as HTMLOptionElement;
        filterByMemberOption.value = firebaseID;
        filterByMemberOption.innerText = memberObj[firebaseID].name;
        filterMemberSelect.append(filterByMemberOption);
        filterMemberSelect.value = firebaseID;
    }
}


assignButton.addEventListener('click', async event => {

    event.preventDefault();

    const selectedTaskID = taskSelect.value;
    const selectedMemberID = memberSelect.value;

    console.log("tasSelect")
    console.log(selectedTaskID);
    // console.log("hej");

    if (!selectedTaskID || !selectedMemberID) {
        console.log("Please select both a task and a member.");
        return;
    }

    const members = await getAllMembers();
    const tasks2 = await getAllTasks();

    const selectedMember = members[selectedMemberID];

/** 
    if (!selectedMember) {
        console.log("Error: Member not found!");
        return;
    }

    **/
    const memberDepartment = members[selectedMemberID].role;
    //const taskDepartment = tasks2[selectedTaskID].department;
    const selectedTask = tasks2.find(task => task.id === selectedTaskID);

if (!selectedTask) {
    console.log("Error: Selected task not found!");
    return;
}

const taskDepartment = selectedTask.department;

    console.log("Member's Role:", memberDepartment);
    console.log("Task's Department:", taskDepartment);

    if (memberDepartment === taskDepartment) {

        await assignTask(selectedTaskID, selectedMember.name);
        await changeTaskStatus(selectedTaskID, "in progress");

        // Uppdaterar tasks efter att ha assignat
        const tasks = await getAllTasks();
        renderAllTasks(tasks);
    }
    else {
        console.log('choose a member whose role matches the department of your chosen task');
        window.alert("choose a member whose role matches the department of your chosen task!");
    }
});