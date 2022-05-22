import Services from "./services.js";
import ToDo from "./todo.js";
import ListData from "./listarr.js";
import Validation from "./validation.js";

const services = new Services();
const listData = new ListData();
const validation = new Validation();
const getEle = (id) => {
  return document.getElementById(id);
};

const renderItem = (data) => {
  let content = "";
  data.forEach((item) => {
    console.log(item);
    if (item.status === false) {
      content += `
          <li>${item.title} 
              <div>
                <i style=" cursor: pointer" class="fa-solid fa-trash-can" onclick="deleteItem(${item.id})"></i>
                <i style=" cursor: pointer" class="fa-solid fa-circle-check" onclick="checkItem(${item.id})"></i>
              </div>
          </li>
      `;
    }
  });
  document.getElementById("todo").innerHTML = content;
};

const renderItemDone = (data) => {
  let content = "";
  data.forEach((item) => {
    if (item.status === true) {
      content += `
            <li>${item.title}
                <div>
                  <i style=" cursor: pointer; color: #444" class="fa-solid fa-trash-can" onclick="deleteItem(${item.id})"></i>
                  <i style=" cursor: pointer; color: #25b99a" class="fa-solid fa-circle-check"></i>
                </div
            </li>
      `;
    }
  });

  getEle("completed").innerHTML = content;
};

// lay data item xuong

const getListItem = () => {
  services
    .fetchData()
    .then((res) => {
      renderItemDone(res.data);
      listData.arr = res.data;
      if (listData.sort) {
        renderItem(
          listData.arr.sort((a, b) => {
            return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
          })
        );
      } else {
        renderItem(
          listData.arr.sort((a, b) => {
            return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
          })
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getListItem();

// xoa item

const deleteItem = (id) => {
  services
    .deleteItemById(id)
    .then(() => {
      getListItem();
    })
    .catch((err) => {
      console.log(err);
    });
};
window.deleteItem = deleteItem;

// them item

getEle("addItem").addEventListener("click", () => {
  const title = getEle("newTask").value;
  const toDo = new ToDo("", title);
  let isValid = true;
  if (validation.checkEmty(title)) {
    isValid = false;
  }
  if (isValid) {
    services
      .addItem(toDo)
      .then(() => {
        getListItem();
        getEle("newTask").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// cap nhat item

const updateItem = (id) => {
  services
    .updateItem(id, { status: true })
    .then(() => {
      window.location.reload();
      document.querySelector(".todo .fa-trash-can").style = "color:gray";
      deleteItem();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.checkItem = updateItem;

//sort item todo

getEle("two").addEventListener("click", () => {
  listData.sort = false;
  getListItem();
});

getEle("three").addEventListener("click", () => {
  listData.sort = true;
  getListItem();
});
