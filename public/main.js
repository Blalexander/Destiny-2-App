"use strict";

$('#login').submit(e => {
  e.preventDefault();
  let email = $('[name="logemail"]').val();
  let password = $('[name="logpass"]').val();
  if (email === "") {
    alert(`Please enter valid email`);
    return;
  }
  if (password === "") {
    alert(`Please enter a valid password`);
    return;
  }
  (async () => {
    let token = await $.ajax({
      url: "/api/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      })
    });
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("user_id", token.user);
    $('#signupPage').hide();
    $('#characterPage').show();
    // window.location.replace("/character.html");
  })();
});

$('#signup').submit(e => {
  e.preventDefault();
  let email = $('[name="email"]').val();
  let password = $('[name="pass"]').val();
  let cpassword = $('[name="cpass"]').val();
  if (password !== cpassword) {
    alert(`Please make sure your passwords match!`);
    return;
  }
  if (password === "" || cpassword === "") {
    alert(`Please enter a password and confirm it`);
    return;
  }
  if (email === "") {
    alert(`Please enter valid email`);
    return;
  }

  //Create New User Request
  (async () => {
    await $.ajax({
      url: "/api/users",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      }),
      error: function(err) {
        console.log(`Error!`, err);
      }
    });
    let token = await $.ajax({
      url: "/api/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        email,
        password
      })
    });
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("user_id", token.user);
    $('#signupPage').hide();
    $('#characterPage').show();
    // window.location.replace("/character.html");
  })();
});


$("#saveLoadout").submit(event => {
  event.preventDefault();
  const itemHash = "fakeasshash";
  const itemName = "super duper wep";
  const itemThumbnail = "ew a thumbnail";
  const itemType = "a good one";
  const itemSlot = "main";

  const settings = {
    url:"/loadouts",
    method: "POST",
    dataType: "JSON",
    // contentType: "application/json",
    data: {
      "itemHash": itemHash,
      "itemName": itemName,
      "itemThumbnail": itemThumbnail,
      "itemType": itemType,
      "itemSlot": itemSlot
    },
    success: function(data) {
      console.log("Success!", data);
    },
    error: function(data) {
      console.log("Error", data);
    }
  };

  $.ajax(settings);
})
