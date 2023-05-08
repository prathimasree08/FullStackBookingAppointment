let url = "http://localhost:3000";
const form = document.getElementById("form");
const users = document.getElementById("users");

let flag = false;

//-------Display the data from server to UI after each time refresh screen
//axios.get request to getting data from crudcrud to UI.

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(url)
    .then((result) => {
      result.data.allUsers.forEach((ele) => {
        showNewUserOnscreen(ele);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// event on form submission
form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();

  let hidden = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let phone = document.getElementById("number").value;
  let email = document.getElementById("email").value;

  let obj = { hidden, name, phone, email };

  postRequest = async () => {
    try {
      if (flag === false) {
        //add new data in server as well as in UI.

        const response = await axios.post(url, obj);
        //console.log(response);
        console.log(response.data.newUserDetail);
        return;
      } else {
        console.log(obj.hidden);
        const response = await axios.put(`${url}/${obj.hidden}`, obj);
        console.log(response.data);
        location.reload();
      }
    } catch (err) {
      document.body.innerHTML += "<h4>Something went wrong!</h4>";
      console.log(err);
    }
  };
  postRequest();
}

//delete data from UI and Server as well

deleteUserfromApi = async (id) => {
  try {
    const users = await axios.delete(`${url}/${id}`);
    deleteUser(id);
  } catch (err) {
    document.body.innerHTML += "<h4>Something went wrong!</h4>";
    console.log(err);
  }
};

//for display list on screen
function showNewUserOnscreen(userDetails) {
  const user = document.getElementById("users");
  let li = `<li id = "${userDetails.id}"> '${userDetails.name}','${userDetails.phone}','${userDetails.email}'
    <button onclick = editUser('${userDetails.id}','${userDetails.name}','${userDetails.phone}','${userDetails.email}')>Edit</button>
    
    <button onclick = deleteUserfromApi('${userDetails.id}')> Delete </button>
    </li>`;

  user.innerHTML += li;
}

// function for delete and edit button

function deleteUser(id) {
  let child = document.getElementById("id");
  let parent = document.getElementById("users");

  parent.removeChild(child);
}

function editUser(id, name, phone, email) {
  document.getElementById("id").value = id;
  document.getElementById("name").value = name;
  document.getElementById("number").value = phone;
  document.getElementById("email").value = email;
  deleteUserfromApi(id);
}