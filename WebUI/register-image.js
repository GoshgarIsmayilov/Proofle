window.addEventListener('load', async () => {
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    await provider.send("eth_requestAccounts", []);
});
