import { Task } from "./types";
import { renderAllTasks } from "./render";
import { getAllTasks } from "./TaskFirebase";


function applyCategoryFilter(tasks: Task[], categoryFilter: string): Task[] {
    if (categoryFilter !== "all") {
        return tasks.filter(task => task.department === categoryFilter);
    }
    return tasks;
}

function applyMemberFilter(tasks: Task[], memberFilter: string): Task[] {
    if (memberFilter !== "all") {
        return tasks.filter(task => task.assignedMember === memberFilter);
    }
    return tasks;
}

function applySorting(tasks: Task[], sortBy: string): Task[] {
    switch (sortBy) {
        case "Date (oldest to newest)":
            return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case "Date (newest to oldest)":
            return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case "Alphabetical order (ascending)":
            return tasks.sort((a, b) => a.task.localeCompare(b.task));
        case "Alphabetical order (descending)":
            return tasks.sort((a, b) => b.task.localeCompare(a.task));
        default:
            return tasks;
    }
}

export function activateSortingAndFiltering(
    tasks: Task[],
    categoryFilter: string,
    memberFilter: string,
    sortBy: string
) {

    let filteredTasks = applyCategoryFilter(tasks, categoryFilter);

    filteredTasks = applyMemberFilter(filteredTasks, memberFilter);

    filteredTasks = applySorting(filteredTasks, sortBy);

    renderAllTasks(filteredTasks);
}