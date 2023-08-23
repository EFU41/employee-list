import { Request } from "./requests";
import { UI } from "./ui";
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const UpdateEmployeeButton = document.getElementById("update");
let activeEmployeeId;

const requests = new Request("http://localhost:3000/employess");
const ui = new UI();

eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", getALLEmployees);
  form.addEventListener("submit", addEmployee);
  employeesList.addEventListener("click", UpdateORDelete);
  UpdateEmployeeButton.addEventListener("click", employeeUpdateClick);
}
function getALLEmployees() {
  requests
    .get()
    .then((employees) => {
      ui.addALLEmployeesToUI(employees);
    })
    .catch(() => console.error("veri alınamadı"));
}

function addEmployee(e) {
  const employeeName = nameInput.value.trim();
  const employeeDepartment = departmentInput.value.trim();
  const employeeSalary = salaryInput.value.trim();

  if (
    employeeDepartment === "" ||
    employeeName === "" ||
    employeeSalary === ""
  ) {
    alert("lütfen bilgilerin hepsini girin");
  } else {
    requests
      .post({
        name: employeeName,
        department: employeeDepartment,
        salary: Number(employeeSalary),
      })
      .then((employee) => {
        ui.addEmployeesToUI(employee);
      })
      .catch(() => console.error("ui'a employee yüklenemedi"));
  }
  ui.clearInputs();
  e.preventDefault();
}
function UpdateORDelete(e) {
  if (e.target.id === "delete-employee") {
    deleteEmployee(e.target);
  } else if (e.target.id === "update-employee") {
    UpdateEmployeeController(e.target.parentElement.parentElement);
    activeEmployeeId =
      e.target.parentElement.previousElementSibling.textContent;
  }
}

function deleteEmployee(targetEmployee) {
  const id =
    targetEmployee.parentElement.previousElementSibling.previousElementSibling
      .textContent;
  requests
    .delete(id)
    .then((employee) => {
      ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch(() => console.error("delete Employee problem çıktı"));
}
function UpdateEmployeeController(targetEmployee) {
  ui.toggleUpdateButton(targetEmployee);
}

function employeeUpdateClick() {
  const Name = nameInput.value.trim();
  const Department = departmentInput.value.trim();
  const Salary = salaryInput.value.trim();

  requests
    .put(activeEmployeeId, {
      name: Name,
      department: Department,
      salary: Number(Salary),
    })
    .then((employee) => ui.UpdateEmployee(employee, activeEmployeeId))
    .catch(() => console.error("update başarısız"));

  ui.toggleUpdateButton();
  confirm("GÜNCELLENDİ...");
  location.reload();
}

// requests
//   .get()
//   .then((employee) => console.log(employee))
//   .catch(() => console.error("hataaaa"));

// requests
//   .post({ name: "ahmet", department: "pazarlama", salary: 8000 })
//   .then((employee) => console.log(employee))
//   .catch(() => console.error("hataaaa"));

// requests
//   .put(4, { name: "şeyma", department: "tasarım", salary: 5000 })
//   .then((employee) => console.log(employee))
//   .catch(() => console.error("hataaaa"));

// requests
//   .delete(4)
//   .then((message) => console.log(message))
//   .catch(() => console.error("hata"));
