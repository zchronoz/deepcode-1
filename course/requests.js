const baseUrl = "https://professor-allocation.herokuapp.com/courses/";

// GET
async function getList() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    console.error("houve um erro, status: " + response.status);
  }

  return await response.json();
}

// POST
function create(courseName) {
  fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({ name: courseName }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      console.error("houve um erro, status: " + response.status);
    }

    loadItems();
  });
}

//DELETE
function deleteCourse() {
  fetch(baseUrl + id, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      console.error("houve um erro");
    }

    loadItems();
  });
}

//PUT
function updateCourse(id, courseName) {
  fetch(baseUrl + id, {
    method: "PUT",
    body: JSON.stringify({ name: courseName }),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) {
      console.log("houve um erro");
    }

    loadItems();
  });
}
