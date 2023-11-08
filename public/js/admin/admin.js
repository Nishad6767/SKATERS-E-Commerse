function adminLoginValidator() {
  const email = $("#email").val();
  const password = $("#password").val();

  // You should perform server-side validation in a production environment
  $.post('/admin', { email, password }, function(response) {
    if (response.success) {
      // Email and password match, enable the login button
      $("#loginButton").prop("disabled", false);
      $("#loginError").empty();
    } else {
      // Email and password do not match, disable the login button and show an error message
      $("#loginButton").prop("disabled", true);
      $("#loginError").html('<i class="fa fa-exclamation"></i> Invalid email or password.');
    }
  });
}



// ============================= BANNER  ===========================



// banners making api call for delete and changeActivity for Banner
//Change Activity
function changeActivity(id, active){
  $.ajax({
    url:'/admin/banner_management',
    type: 'patch',
    data: {bannerID: id, currentActivity : active,},
    success : (res)=>{
      $("#" + id).load(location.href + " #" + id);
      $("." +id).load(location.href + " ."+id )
    },
  });
}

// delte Banner
function deleteBanner(id){
  $.ajax({
    url:'/admin/banner_management',
    type:'delete',
    data : {bannerID : id},
    success: (res)=> {
      $("#" + id).load(location.href + " #" + id);
    },

  });
}





function changeAccess(id, access) {
  $.ajax({
    url: "/admin/customer_management",
    type: 'patch',
    data: {
      userId: id,
      currentAccess: access,
    },
    success: (res) => {
      // $("#" + id).load(location.href + " #" + id);
      location.reload()
    }
  });
}


function editCategory(id,e,element){
  e.preventDefault()
  Swal.fire({
    title: 'Do you want to edit category?',
    showCancelButton: true,
    confirmButtonText: 'Yes, i want to edit category'
  }).then((result) => {
    if (result.isConfirmed) {
      let url = element.getAttribute('href');
            window.location.href = url;
    } 
  })
}


function editBrand(id,e,element){
  e.preventDefault()
  Swal.fire({
    title: 'Do you want to edit brand?',
    showCancelButton: true,
    confirmButtonText: 'Yes, i want to edit brand'
  }).then((result) => {
    if (result.isConfirmed) {
      let url = element.getAttribute('href');
            window.location.href = url;
}
})
}



function showProductConfirmation(e, element, itemName, action) {
  e.preventDefault();
  const name = itemName;

  Swal.fire({
    title: `<h5 style="color: white">Are you sure to ${action} ${name}?</h5>`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    confirmButtonColor: '#4CAF50',
    cancelButtonText: 'No',
    cancelButtonColor: '#d33',
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title',
    },
    background: '#333',
    confirmButtonClass: 'btn-lg btn-success',
    cancelButtonClass: 'btn-lg btn-danger',
  }).then((result) => {
    if (result.isConfirmed) {
     // Get the href value from the element's href attribute
     const href = element.getAttribute('href');
     // Route to the href
     window.location.href = href;
    }
  });
}
