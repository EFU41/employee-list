export class UI {
  constructor() {
    this.employeesList = document.getElementById("employees");
    this.nameInput = document.getElementById("name");
    this.departmentInput = document.getElementById("department");
    this.salaryInput = document.getElementById("salary");
    this.UpdateEmployeeButton = document.getElementById("update");
    this.addButton = document.getElementById("addbutton");
  }

  addALLEmployeesToUI(employees) {
    let result = "";
    employees.forEach((employee) => {
      result += `
        <tr>
                                            
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>
        `;
    });
    this.employeesList.innerHTML = result;
  }
  clearInputs() {
    this.nameInput.value = "";
    this.departmentInput.value = "";
    this.salaryInput.value = "";
  }
  addEmployeesToUI(employee) {
    this.employeesList.innerHTML += `
    <tr>
                                        
    <td>${employee.name}</td>
    <td>${employee.department}</td>
    <td>${employee.salary}</td>
    <td>${employee.id}</td>
    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
</tr>
    `;
  }
  deleteEmployeeFromUI(element) {
    element.remove();
  }

  toggleUpdateButton(target) {
    if (this.UpdateEmployeeButton.style.display === "none") {
      this.UpdateEmployeeButton.style.display = "block";
      this.addButton.style.display = "none";
      this.addEmployeesInfoToınputs(target);
    } else {
      this.UpdateEmployeeButton.style.display = "none";
      this.addButton.style.display = "block";
      this.clearInputs();
    }
  }
  addEmployeesInfoToınputs(element) {
    const children = element.children;
    this.nameInput.value = children[0].textContent;
    this.departmentInput.value = children[1].textContent;
    this.salaryInput.value = children[2].textContent;
  }

  UpdateEmployee(employee, id) {}
}
