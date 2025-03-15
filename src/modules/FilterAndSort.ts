import { getAllTasks } from "./TaskFirebase.ts";
import { renderAllTasks } from "./render.ts";
import { Task } from "./types.ts";

// Get references to the DOM elements
const filterForm = document.getElementById('filterForm') as HTMLFormElement;
const filterCategorySelect = document.getElementById('category-filter') as HTMLSelectElement;
const filterMemberSelect = document.getElementById('member-filter') as HTMLSelectElement;
const sortSelect = document.getElementById('sort-tasks') as HTMLSelectElement;

// Define the functions for filtering and sorting tasks
function applyFilters(tasks: Task[], memberFilter: string, categoryFilter: string): Task[] {
    return tasks.filter(task => {
        const isAssignedToMember = memberFilter ? task.assignedMember === memberFilter : true;
        const isInCategory = categoryFilter ? task.department === categoryFilter : true;
        return isAssignedToMember && isInCategory && task.status === 'in progress'; // Only filter 'in progress' tasks
    });
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
            return tasks; // No sorting applied if invalid option
    }
}

export function renderFilteredAndSortedTasks(tasks: Task[], memberFilter: string, categoryFilter: string, sortBy: string): void {
    let filteredTasks = applyFilters(tasks, memberFilter, categoryFilter);
    let sortedTasks = applySorting(filteredTasks, sortBy);

    renderAllTasks(sortedTasks); // Update the view with filtered and sorted tasks
}

// Event listener for the filter apply button
filterForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const selectedMemberFilter = filterMemberSelect.value;
    const selectedCategoryFilter = filterCategorySelect.value;
    
    // Get all tasks and render them based on filters and sort
    getAllTasks().then((tasks) => {
        const selectedSortOption = sortSelect.value;
        renderFilteredAndSortedTasks(tasks, selectedMemberFilter, selectedCategoryFilter, selectedSortOption);
    });
});

// Event listener for the sort apply button
sortSelect.addEventListener('change', () => {
    const selectedMemberFilter = filterMemberSelect.value;
    const selectedCategoryFilter = filterCategorySelect.value;
    const selectedSortOption = sortSelect.value;

    // Get all tasks and render them based on filters and sort
    getAllTasks().then((tasks) => {
        renderFilteredAndSortedTasks(tasks, selectedMemberFilter, selectedCategoryFilter, selectedSortOption);
    });
});
