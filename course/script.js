const listContainer = document.getElementById("list-courses");
const btnConfirmar = document.getElementById("confirm");
const btnAdd = document.getElementById("btnAdd");
const bntDeleteCourse = document.getElementById("bntDeleteCourse");
let id = 0;

function handleClickAdd() {
  id = 0;
  document.getElementById("txtNameCourse").value = "";
  document.getElementById("textModal").textContent = "Cadastrar novo curso";
}

function handleClickEdit(course) {
  id = course.id;
  document.getElementById("txtNameCourse").value = course.name;
  $("#addModal").modal("show");
  document.getElementById("textModal").textContent = "Alterar novo curso";
}

function handleClickDelete(course) {
  id = course.id;
  const defaultMessage = "Você deseja remover o curso: ";
  document.getElementById("txtDelete").textContent =
    defaultMessage + course.name;

  $("#modalDelete").modal("show");
}

function saveCourse() {
  const nomeCurso = document.getElementById("txtNameCourse");

  if (!nomeCurso.value) {
    alert("É necessário informar um nome!");
    return;
  }

  if (!id) {
    create(nomeCurso.value);
  } else {
    updateCourse(id, nomeCurso.value);
  }

  nomeCurso.value = "";
}

function createListItem(course) {
  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = course.name;

  const contentBtns = document.createElement("div");

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "Editar";
  btnEdit.type = "button";
  btnEdit.classList.add("btn");
  btnEdit.classList.add("btn-warning");
  btnEdit.addEventListener("click", () => handleClickEdit(course));

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Remover";
  btnDelete.type = "button";
  btnDelete.classList.add("btn");
  btnDelete.classList.add("btn-danger");
  btnDelete.addEventListener("click", () => handleClickDelete(course));

  contentBtns.appendChild(btnEdit);
  contentBtns.appendChild(btnDelete);

  item.appendChild(span);
  item.appendChild(contentBtns);

  listContainer.appendChild(item);
}

async function loadItems() {
  const divAwait = document.getElementById("await");
  divAwait.classList.add("aguardando");
  listContainer.innerHTML = "";
  const courses = await getList();

  courses.forEach((c) => createListItem(c));
  $("#addModal").modal("hide");
  $("#modalDelete").modal("hide");
  divAwait.classList.remove("aguardando");
}

btnAdd.addEventListener("click", handleClickAdd);
btnConfirmar.addEventListener("click", saveCourse);
bntDeleteCourse.addEventListener("click", deleteCourse);

loadItems();
