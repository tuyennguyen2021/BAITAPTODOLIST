import Services from "./services.js";
import ToDo from "./todo.js";

const services = new Services();
const getEle = (id) => {
  return document.getElementById(id);
};

const renderItem = (data) => {
  let content = "";
  data.forEach((item) => {
    console.log(item);
    content += `
        <li>${item.title} 
            <div>
              <i style=" cursor: pointer" class="fa-solid fa-trash-can" onclick="deleteItem(${item.id})"></i>
              <i style=" cursor: pointer" class="fa-solid fa-circle-check" onclick="checkItem(${item.id})"></i>
            </div>
        </li>
    `;
  });
  document.getElementById("todo").innerHTML = content;
};

// lay data item xuong

const getListItem = () => {
  services
    .fetchData()
    .then((res) => {
      renderItem(res.data);
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

  services
    .addItem(toDo)
    .then(() => {
      getListItem();
    })
    .catch((err) => {
      console.log(err);
    });
});

// cap nhat item

const renderItemDone = (data) => {
  const content = data.reduce((contenthtml, item) => {
    return (contenthtml += `
          <li>${item.title}
              <div>
                <i style=" cursor: pointer" class="fa-solid fa-trash-can"></i>
                <i style=" cursor: pointer; color: green" class="fa-solid fa-circle-check"></i>
              </div
          </li>
    `);
  }, "");

  getEle("completed").innerHTML = content;
};

const getListItemDone = (id) => {
  services
    .getItemById(id)
    .then((res) => {
      renderItemDone(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getListItemDone();

const checkItem = (id) => {
  services
    .getItemById(id)
    .then(() => {
      deleteItem();
      getListItemDone();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.checkItem = checkItem;
