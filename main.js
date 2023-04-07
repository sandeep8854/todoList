const addUserBtn = document.getElementById("addUser");
let btnText = addUserBtn.innerText;
// console.log(btnText);
const userNameTextField = document.getElementById("userName");
const recordsDisplay = document.getElementById("records");
// console.log(addUserBtn); // button list
// console.log(userNameTextField); // and input list
let userArray = [];
let edit_id = null;
let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}

displayInformation();
addUserBtn.addEventListener("click", () => {
  const name = userNameTextField.value;
  if (edit_id != null) {
    //edit
    userArray.splice(edit_id, 1, { Name: name });
    edit_id = null;
  } else {
    //insert
    userArray.push({ Name: name });
  }

  saveInformation(userArray);
  userNameTextField.value = "";
  addUserBtn.innerText = btnText;
});

function saveInformation(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  displayInformation();
}

function displayInformation() {
  let statement = "";
  userArray.map((ele, index) => {
    statement += `<tr>
    <th scope="row">${index + 1}</th>
    <td>
      ${ele.Name}
    </td>
    <td class="awasomeButton">
      <i
        class="fas fa-edit"
        style="font-size: 24px; color: green" onClick='editInformation(${index})'
      ></i>
      <i
        class="fas fa-trash-alt"
        style="font-size: 24px; color: red" onClick='deleteInformation(${index})'
      ></i>
    </td>
  </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function editInformation(id) {
  edit_id = id;
  userNameTextField.value = userArray[id].Name;
  addUserBtn.innerText = "Save Changes";
}

function deleteInformation(id) {
  userArray.splice(id, 1);
  saveInformation(userArray);
}
// for search opreation.

const allTableRow = document.querySelectorAll("#records tr");
// console.log(allTableRow);
const searchInputField = document.querySelector("#search");

searchInputField.addEventListener("input", (e) => {
  //  console.log(e.target.value);
  const searchStr = e.target.value.toLowerCase();
  recordsDisplay.innerHTML = "";
  allTableRow.forEach((element) => {
    //  console.log(element);
    const elementTR_TD = element.querySelectorAll("td");
    if (elementTR_TD[0].innerText.toLowerCase().indexOf(searchStr) > -1) {
      recordsDisplay.appendChild(element);
    }
  });
  if (recordsDisplay.innerHTML == "") {
    recordsDisplay.innerHTML = "No Records Founds";
  }
});
