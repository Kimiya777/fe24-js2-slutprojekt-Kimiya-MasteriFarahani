import { getAllTasks, postTask, BASE_URL, assignTask } from "./modules/TaskFirebase";
import { getAllMembers, postMembers } from "./modules/MembersFirebase";
import { renderAllTasks, renderAllMembers } from "./modules/render";
import { Member, Task } from "./modules/types.ts";
import { activateSortingAndFiltering } from "./modules/FilterAndSort.ts";
//import { TaskArray } from "./modules/types.ts";

getAllTasks().then(renderAllTasks);
getAllMembers().then(renderAllMembers);

const taskForm = document.getElementById('task-form') as HTMLFormElement;
export const memberForm = document.getElementById('member-form') as HTMLFormElement;

const taskDepartmentSelect = document.getElementById('task-department-select') as HTMLSelectElement;
const memberSelect = document.getElementById('member-select') as HTMLSelectElement;

const taskDescription = document.getElementById('task-description') as HTMLInputElement;
const taskName = document.getElementById('task-name') as HTMLInputElement;

//const assignButton = document.getElementById('assign-task-to-member-final') as HTMLButtonElement;

taskForm!.addEventListener('submit', async event => {
  event.preventDefault();

  const task = taskName!.value;
  const department = taskDepartmentSelect!.value;
  console.log(task);

  const TaskDate = new Date(Date.now());
  const TaskDate2 = TaskDate.toString();

  const description = taskDescription!.value;

  const taskObj: Task = {
    task,
    done: false,
    department,
    date: TaskDate2,
    status: 'new',
    assignedMember: 'none',
    description,

  }

  await postTask(taskObj);
  const tasks = await getAllTasks();
  renderAllTasks(tasks);
})

memberForm!.addEventListener('submit', async event => {
  event.preventDefault();

  const member = memberForm.querySelector('input')!.value;
  const memberRole = memberSelect!.value;

  console.log(member);
  /** 
      const memberObj:Member = {
  
          name: member,
          role: memberRole,
   
      }**/
  const memberObj: Member = new Member(member, memberRole);

  await postMembers(memberObj);
  const members = await getAllMembers();
  renderAllMembers(members);
})

const filterForm = document.getElementById('filter-form') as HTMLFormElement;
filterForm!.addEventListener('submit', async event => {
  event.preventDefault();

  const categoryFilter = (document.getElementById('category-filter') as HTMLSelectElement).value;
  const memberFilter = (document.getElementById('member-filter') as HTMLSelectElement).value;
  const sortBy = (document.getElementById('sort-tasks') as HTMLSelectElement).value;

  await getAllTasks().then(tasks => {
    activateSortingAndFiltering(tasks, categoryFilter, memberFilter, sortBy);
  });
  console.log("value of" + memberFilter);
});


