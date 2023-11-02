window.addEventListener('load', async () => {
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    await provider.send("eth_requestAccounts", []);
});

async function login(event) {
    // Prevent until credentials are correct
    event.preventDefault();

    // Collect user data
    let username = $("#username").val();
    let password = $("#password").val();

    // Store data as json 
    let user_data = {
        "username": username,
        "password": password
    };

    // Call API request
    console.time('Server Response Time - Login');
    var response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(user_data),
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.timeEnd('Server Response Time - Login');
    response_data = await response.json();

    // Go swipe page if credentials are correct
    if (response_data.success) {
        localStorage.removeItem("username");
        localStorage.setItem("username", username);
        window.location.href = "swipe.html";
    }
}
