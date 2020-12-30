const idPreedit = "Edit-";

$(function(){
  renderStudent();})


  // tạo hàm render
  function renderStudent(){
  $.ajax({
    method: "GET",
    url: "https://quan-li-sinh-vien.herokuapp.com/users",
      }).done(function (data) {
  
     let tableContent = `
   <tr>
  <td>Họ và tên</td>  
  <td>Ngày sinh</td>  
  <td>Email</td>  
  <td>Số điện thoại</td>  
  <td>Hành động</td>  
  </tr>
 `;

  for (let i = 0; i < data.length; i++) {
      tableContent += `
  <tr>
  <td> ${data[i].name}</td>
  <td> ${data[i].birthday}</td>
  <td> ${data[i].email}</td>
  <td> ${data[i].phone}</td>
  <td><a href="index2.html" class="edit" id="${idPreedit}${data[i].id}"  onclick="addEventEditStudent()" ><i class="fas fa-edit"></i> Chỉnh sửa</a>|<a href="#" class="delete"  id="${data[i].id}" onclick=" deleteStudent()" ><i class="fas fa-trash-alt"></i>Xóa</a></td>
  </tr>              
         `;
    }
    $("#table-list-student").html(tableContent);
  });
}


 // tạo hàm xóa

function deleteStudent(){
  let deleted =$(".delete");

  for(let i=0; i< deleted.length; i++){

   $(deleted[i]).click( function () {
      $.ajax({
        method: "DELETE",
         url: "https://quan-li-sinh-vien.herokuapp.com/users/" +  `${deleted[i].id}`,
       
      }).done(function (data) {
        renderStudent();
        });
    });// ket thuc onclick
  }

}


// Thêm dữ liệu
function addEventAddStudent(){

     addEventEditStudent()
      $.ajax({
        method: "POST",
        url: "https://quan-li-sinh-vien.herokuapp.com/users/" ,
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          phone:  $("#phone").val(),
          birthday:$("#year").val(),
        }
      })
}


// Chỉnh sửa dữ liệu: em chưa lamxong 

function addEventEditStudent(){
let edited = $(".edit");
 
for (let i = 0; i < edited.length; i++){
  $(edited[i]).click(function(){
     
   
  $.ajax({
    method: "PUT",
    url: "https://quan-li-sinh-vien.herokuapp.com/users/" +  
    `${edited[i].id.replace(idPreedit, "")}`,
    data:{
      name: $("#name").val(),
      email: $("#email").val(),
      phone:  $("#phone").val(),
      birthday:$("#year").val(),}
  })

  })  // ket thuc click
}// ket thuc for  
}





