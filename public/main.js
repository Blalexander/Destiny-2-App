
$('#login').submit(e => {
  console.log("Hello from Login");
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
    console.log(token.user);
    $('#signupPage').hide();
    $('#characterPage').show();
    // window.location.replace("/character.html");
  })();
});

$('#signup').submit(e => {
  console.log("Hello from Signup");
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
    console.log(token.user);
    $('#signupPage').hide();
    $('#characterPage').show();
    // window.location.replace("/character.html");
  })();
});
