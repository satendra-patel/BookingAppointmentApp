const myForm = document.querySelector('#my-form');
// const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  var name=event.target.name.value;
  var email=event.target.email.value;
  var phonenumber=event.target.phonenumber.value;
  
    let obj={
        name,
        email,
        phonenumber
    };
    
    axios.post("http://localhost:5000/admin/add-user",obj)
    .then((response)=>{ 
      console.log(response)
      showNewUserOnScreen(response.data.newUserDetail) 
    })
    .catch((err)=>{
      document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
      console.log(err);
    })
    
    
    
    // localStorage.setItem(obj.email,JSON.stringify(obj));



    // showNewUserOnScreen(obj);
}
window.addEventListener("DOMContentLoaded", () =>{

  axios.get("http://localhost:5000/admin/get-users")
  .then((response)=>{
    console.log(response);
    for(var i=0;i<response.data.allUsers.length;i++){
      showNewUserOnScreen(response.data.allUsers[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  })

})


function showNewUserOnScreen(user){

  document.getElementById('email').value='';
  document.getElementById('name').value='';
  document.getElementById('phonenumber').value='';

  if(localStorage.getItem(user.email) !== null){
    removeUserFromScreen(email);
  }


  const parentNode=document.getElementById('listOfUsers');
  const childHTML = `<li id=${user.id} class="list-group-item "> ${user.name} - ${user.email} - ${user.phonenumber}
                                        <button onclick=deleteUser('${user.id}')> Delete User </button>
                                        <button onclick=editUserDetails('${user.id}','${user.name}','${user.email}','${user.phonenumber}')>Edit User </button>
                                     </li>`
  parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

function editUserDetails(uid, name,email,phonenumber){
  document.getElementById('email').value = email;
  document.getElementById('name').value = name;
  document.getElementById('phonenumber').value=phonenumber;
  deleteUser(uid)
}

function deleteUser(uid){
  axios.delete(`http://localhost:5000/admin/delete-user/${uid}`)
  .then((response)=>{  
    console.log(response);  
    removeUserFromScreen(uid)
  })
  .catch((err)=>{
      console.log(err);
  })
  
}

function removeUserFromScreen(uid){
  const parentNode = document.getElementById('listOfUsers');
  const childNodeToBeDeleted = document.getElementById(uid);
  if(childNodeToBeDeleted){
    parentNode.removeChild(childNodeToBeDeleted);
  }
  
}