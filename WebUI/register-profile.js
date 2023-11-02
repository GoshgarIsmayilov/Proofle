window.addEventListener('load', async () => {
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    await provider.send("eth_requestAccounts", []);
});

async function register_profile(event) {
    // Prevent until all operations are finished
    event.preventDefault();

    // Collect user data
    let username = $("#username").val();
    let password = $("#password").val();
    let user_gender = parseInt($("#my-gender").val());
    let user_age = parseInt($("#my-age").val());
    let user_salary = parseInt($("#my-salary").val());
    let user_height = parseInt($("#my-height").val());
   
    // Collect user location
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    let user_location_lat = parseInt(position.coords.latitude.toString().replace(".", "").substring(0, 6));
    let user_location_lon = parseInt(position.coords.longitude.toString().replace(".", "").substring(0, 6));

    // Calculate commitment for user profile
    let profile_commitment = await zokrates_hash(
        ["0", user_gender.toString(), user_age.toString(), user_salary.toString(), user_height.toString(), user_location_lat.toString(), user_location_lon.toString(), "0"], 
        ["0", user_gender.toString(), user_age.toString(), user_salary.toString(), user_height.toString(), user_location_lat.toString(), user_location_lon.toString(), "0"]
    );
    profile_commitment = JSON.parse(profile_commitment);    

    // Define blockchain address
    let signer = provider.getSigner(0);
    let user_blockchain_address = await signer.getAddress();

    // Store user data as json 
    let user_data = {
        "username": username,
        "password": password,
        "userGender": user_gender,
        "userAge": user_age,
        "userSalary": user_salary,
        "userHeight": user_height,
        "userLocationLat": user_location_lat,
        "userLocationLon": user_location_lon,
        "profileCommitment": profile_commitment,
        "userBlockchainAddress": user_blockchain_address,
        "userPhoto": localStorage.getItem("user_photo")
    };

    localStorage.removeItem("user_data");
    localStorage.setItem("user_data", JSON.stringify(user_data));

    window.location.href = "register-preference.html";

    
}
