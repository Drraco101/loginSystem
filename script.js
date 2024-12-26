var signUpName=document.getElementById("signUpName");
var signUpEmail=document.getElementById("signUpEmail");
var signUpPassword=document.getElementById("signUpPassword");
var signInEmail=document.getElementById("signInEmail");
var signInPassword=document.getElementById("signInPassword");
var username=localStorage.getItem("sessionUsername");

if (localStorage.getItem("users")) {
  signUpArray = JSON.parse(localStorage.getItem("users"));
} else {
  signUpArray = [];
}
if(username){
    document.getElementById('username').innerHTML="Welcome "+username;
}
if(localStorage.getItem("signUpArray")){
    signUpArray=JSON.parse(localStorage.getItem("users"));
}
function isEmpty(){
  if(signUpName.value==""||signUpEmail.value==""||signUpPassword.value==""){
    return false;
  } else{
    return true;
  }
}
function isEmailExist(){
  for (var i=0; i<signUpArray.length;i++){
    if(signUpArray[i].email.toLowerCase()==signUpEmail.value.toLowerCase()){
      return false;
    }
  }
}
function signUp(){
  if(isEmpty()==false){
    document.getElementById('exist').innerHTML='<span class="text-danger m-3">All inputs are required</span>'
  return false;
  }
  if(isEmailExist()==false){
    document.getElementById("exist").innerHTML='<span class="text-danger m-3">email already exists</span>'
  } else{
    var signUp={
      name: signUpName.value,
      email:signUpEmail.value,
      password:signUpPassword.value
    }

    signUpArray.push(signUp);
    localStorage.setItem("users",JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML='<span class="text-success m-3">Success</span>'
  }
}
function isLoginEmpty() {
  if (signInPassword.value == "" || signInEmail.value == "") {
      return false
  } else {
      return true
  }
}
function login() {
  if (isLoginEmpty() == false) {
      document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>'
      return false;
  };
  if(!localStorage.getItem("users")||JSON.parse(localStorage.getItem("users")).length === 0){
    document.getElementById("incorrect").innerHTML="<span class='text-danger m-3'>No user found, sign up first please</span>"
  };
  var password = signInPassword.value;
  var email = signInEmail.value;
  for (var i = 0; i < signUpArray.length; i++) {
      if(signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
        localStorage.setItem('sessionUsername', signUpArray[i].name);
        window.open('home.html', '_self')
        return true;
      }
  }
  console.log("not cool 2")
  document.getElementById('incorrect').innerHTML = 
        '<span class="p-2 text-danger">Incorrect email or password</span>';
    return false;
}
function logout() {
  localStorage.removeItem('sessionUsername')
}