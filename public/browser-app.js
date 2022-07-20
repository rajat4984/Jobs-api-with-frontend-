const companyInput = document.querySelector("#company-input");
const positionInput = document.querySelector("#position-input");
const resultInput = document.querySelector("#result-input");
const submitInput = document.querySelector("#submit-input");
const cardsContainer = document.querySelector(".cards-container");
const deleteBtn = document.querySelector(".delete-btn");
const editBtn = document.querySelector(".edit-btn");

const createJob = async (event) => {
  event.preventDefault();
  fetch("/api/v1/jobs", {
    method: "POST",

    body: JSON.stringify({
      company: companyInput.value,
      position: positionInput.value,
      resultInput: resultInput.value,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NDAyNjEzZWIxZmFjMDQ5MGJmYjQiLCJuYW1lIjoicmFqYXQiLCJpYXQiOjE2NTgyMjc3NzMsImV4cCI6MTY2MDgxOTc3M30.MsrPZp0Pce9TXznQCv8c0wvoKJvrXyjrdbx-s-Tic_o",
    },
  });
  companyInput.value = "";
  positionInput.value = "";
  getAllJobs();
};
const getAllJobs = async () => {
  const response = await fetch("/api/v1/jobs", {
    method: "GET",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NDAyNjEzZWIxZmFjMDQ5MGJmYjQiLCJuYW1lIjoicmFqYXQiLCJpYXQiOjE2NTgyMjc3NzMsImV4cCI6MTY2MDgxOTc3M30.MsrPZp0Pce9TXznQCv8c0wvoKJvrXyjrdbx-s-Tic_o",
    },
  });
  const jobs = await response.json();
  const jobsArray = jobs.jobs;

  cardsContainer.innerHTML = "";
  jobsArray.forEach((job) => {
    const { _id } = job;
    cardsContainer.innerHTML += `<div class="card">
      <div class="card-contents">
        <h3 class="company-name">${job.company}</h3>
        <p>${job.position}</p>
        <p>${job.status}</p>
      </div>
      <div class="card-btns">
        <button class="delete-btn" id="${_id}" onclick = 'deleteJob(event)'>Delete</button>
        <a target="_blank" href="update.html?id=${_id}"><button class="edit-btn" id="${_id}" onclick = 'updateJob(event)'>Edit </button></a>
      </div>
    </div>`;
  });
};

const deleteJob = (event) => {
  const jobId = event.target.getAttribute("id");
  fetch("/api/v1/jobs" + "/" + jobId, {
    method: "DELETE",

    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NDAyNjEzZWIxZmFjMDQ5MGJmYjQiLCJuYW1lIjoicmFqYXQiLCJpYXQiOjE2NTgyMjc3NzMsImV4cCI6MTY2MDgxOTc3M30.MsrPZp0Pce9TXznQCv8c0wvoKJvrXyjrdbx-s-Tic_o",
    },
  });
  getAllJobs();
};

submitInput.addEventListener("click", createJob);

