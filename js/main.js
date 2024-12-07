// RTL/LTR Support
const toggelDirection = document.querySelector(".fa-language");
const container = document.querySelector(".page-body");

toggelDirection.addEventListener("click", () => {
  const currentDirection = container.getAttribute("dir");
  container.setAttribute("dir", currentDirection === "ltr" ? "rtl" : "ltr");
});

// Form Validation and Table Integration
const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Input declarations
  const name = document.getElementById("name");
  const description = document.getElementById("Description");
  const date = document.getElementById("Date");
  const select = document.getElementById("select");

  // Remove previous error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  let isValid = true;

//  form validations 
  if (name.value.trim() === "") {
    displayError(name, "Name is required.");
    isValid = false;
  }

  if (description.value.trim() === "") {
    displayError(description, "Description is required.");
    isValid = false;
  }


  if (select.value === "") {
    displayError(select, "Please select a frequency.");
    isValid = false;
  }

  if (!date.value) {
    displayError(date, "Please select a valid date.");
    isValid = false;
  }


  if (isValid) {
    //  form data
    const formData = {
      name: name.value,
      description: description.value,
      frequency: select.value,
      date: date.value,
    };

    // Add a new row to the table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formData.name}</td>
      <td>${formData.description}</td>
      <td>${formData.frequency}</td>
      <td>${formData.date}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);

    //  acttions to table
    row.querySelector(".delete-btn").addEventListener("click", () => {
      row.remove();
    });

    row.querySelector(".edit-btn").addEventListener("click", () => {
      name.value = formData.name;
      description.value = formData.description;
      select.value = formData.frequency;
      date.value = formData.date;
      row.remove();
    });

    form.reset();
  }
});

//  display  error messages
function displayError(element, message) {
  const error = document.createElement("span");
  error.className = "error-message";
  error.textContent = message;
  error.style.color = "#E03137";
  error.style.fontSize = "12px";
  error.style.marginTop = "5px";
  element.parentElement.appendChild(error);
}
