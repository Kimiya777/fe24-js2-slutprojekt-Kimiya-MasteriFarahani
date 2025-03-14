
import { TaskArray } from "./types";
import { renderAllTasks } from "./render";

export const sortTasks = (tasks: TaskArray[], sortBy: string): TaskArray[] => {
    switch (sortBy) {
        case 'Date (oldest to newest)':
            return tasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        case 'Date (newest to oldest)':
            return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        case 'Alphabetical order (ascending)':
            return tasks.sort((a, b) => a.task.localeCompare(b.task));
        case 'Alphabetical order (descending)':
            return tasks.sort((a, b) => b.task.localeCompare(a.task));
        default:
            return tasks;
    }
};

// Filtrera tsksen
export const filterTasks = (tasks: TaskArray[], filterBy: string, value: string): TaskArray[] => {
    if (filterBy === 'assignedMember') {
        return tasks.filter(task => task.assignedMember === value);
    } else if (filterBy === 'category') {
        return tasks.filter(task => task.department === value);
    }
    return tasks; // Return all tasks if 'all' is selected
};


export const activateSortingAndFiltering = (tasks: TaskArray[]) => {
    const filterForm = document.getElementById('filter-form') as HTMLFormElement;
    const sortForm = document.getElementById('sort-form') as HTMLFormElement;

    const filterSelect = document.getElementById('filter-tasks') as HTMLSelectElement;
    const sortSelect = document.getElementById('sort-tasks') as HTMLSelectElement;


    filterForm?.addEventListener('change', () => {
        const filterValue = filterSelect.value;
        const selectedMember = document.getElementById('member-select') as HTMLSelectElement;
        const selectedCategory = document.getElementById('category-select') as HTMLSelectElement;

        let filteredTasks = tasks;

        if (filterValue !== 'all') {
            // filter baserad på vald member eller category
            if (filterValue === 'assignedMember') {
                filteredTasks = filterTasks(tasks, filterValue, selectedMember.value);
            } else if (filterValue === 'category') {
                filteredTasks = filterTasks(tasks, filterValue, selectedCategory.value);
            }
        }

        // Applya filtret
        const sortedTasks = sortTasks(filteredTasks, sortSelect.value);
        renderAllTasks(sortedTasks); // Assuming renderAllTasks is your function for displaying tasks
    });

    
    sortForm?.addEventListener('change', () => {
        const sortedTasks = sortTasks(tasks, sortSelect.value);
        renderAllTasks(sortedTasks);
    });
};
