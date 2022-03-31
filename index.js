function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());
    document.querySelector("#name").innerText =`${profile.getName()}`
    document.querySelector("#email").innerText =`${profile.getEmail()}`
    document.querySelector("#image").attributes('src', profile.getImageUrl())
    document.querySelector(".data").style.display = "block;"
    document.querySelector(".g-signin2").style.display = "none;"
   
    // The ID token you need to pass to your backend: 
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    const button = document.getElementById("signout_button");
    button.onclick = () => {
      google.accounts.id.disableAutoSelect();
      alert('You have been singed out successfully')
      document.querySelector(".g-signin2").style.display = "block;"
      document.querySelector(".data").style.display = "none;"  
    }
  }