const updateCompanyInput = document.querySelector("#update-company-input");
const updatePositionInput = document.querySelector("#update-position-input");
const updateResultInput = document.querySelector("#update-result-input");
const submitInput = document.querySelector("#submit-input");
const mainPagebtn = document.querySelector("#main-page");
const params = new URLSearchParams(window.location.search);
const id = new URLSearchParams(params).get("id");

const updateJob = () => {
  fetch("/api/v1/jobs" + "/" + id, {
    method: "PATCH",

    body: JSON.stringify({
      company: updateCompanyInput.value,
      position: updatePositionInput.value,
      resultInput: updateResultInput.value,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NDAyNjEzZWIxZmFjMDQ5MGJmYjQiLCJuYW1lIjoicmFqYXQiLCJpYXQiOjE2NTgyMjc3NzMsImV4cCI6MTY2MDgxOTc3M30.MsrPZp0Pce9TXznQCv8c0wvoKJvrXyjrdbx-s-Tic_o",
    },
  });
  updateCompanyInput.value = "";
  updatePositionInput.value = "";
};

const getSingleJob = async () => {
  const response = await fetch("/api/v1/jobs" + "/" + id, {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NDAyNjEzZWIxZmFjMDQ5MGJmYjQiLCJuYW1lIjoicmFqYXQiLCJpYXQiOjE2NTgyMjc3NzMsImV4cCI6MTY2MDgxOTc3M30.MsrPZp0Pce9TXznQCv8c0wvoKJvrXyjrdbx-s-Tic_o",
    },
  });

    const data = await response.json();
    const job = data.job;

  const { company, position, status } = job;
  updateCompanyInput.value = company;
  updatePositionInput.value = position;
  updateResultInput.value = status;
};

getSingleJob();
