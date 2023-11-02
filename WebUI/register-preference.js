window.addEventListener('load', async () => {
    provider = new ethers.providers.Web3Provider(web3.currentProvider);
    await provider.send("eth_requestAccounts", []);
});

var contract_abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"dislike","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAppStatistics","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMyMatches","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"}],"name":"like","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_profileCommitment","type":"uint256"},{"internalType":"uint256","name":"_preferenceCommitment","type":"uint256"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[2]","name":"a","type":"uint256[2]"},{"internalType":"uint256[2][2]","name":"b","type":"uint256[2][2]"},{"internalType":"uint256[2]","name":"c","type":"uint256[2]"},{"internalType":"address","name":"_to","type":"address"}],"name":"verify","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

var contract_bytecode = "6080604052600060065560006007556000600855600060095534801561002457600080fd5b50600580546001600160a01b0319163317905560405161004390610085565b604051809103906000f08015801561005f573d6000803e3d6000fd5b50600a80546001600160a01b0319166001600160a01b0392909216919091179055610092565b6112c580610a6583390190565b6109c4806100a16000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063050abd1e146100675780637c1bf6c91461007c5780638492f2be146100a9578063d66d6c10146100be578063d86a9e13146100d1578063e465c465146100e4575b600080fd5b61007a610075366004610714565b6100f7565b005b610084610254565b6040805194855260208501939093529183015260608201526080015b60405180910390f35b6100b16102ce565b6040516100a091906107b3565b61007a6100cc366004610800565b610369565b61007a6100df366004610822565b610401565b61007a6100f2366004610822565b6104a5565b33600081815260208190526040812054900361012e5760405162461bcd60e51b815260040161012590610844565b60405180910390fd5b6001600160a01b0382166000908152602081905260408120548391036101665760405162461bcd60e51b815260040161012590610844565b600a5460408051606081018252336000908152600160208181528483205484526001600160a01b0389811684528382528584205491850191909152838501919091529251632b72745f60e11b8152909392909216916356e4e8be916101d4918b918b918b919060040161089e565b602060405180830381865afa1580156101f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102159190610945565b3360009081526003602090815260408083206001600160a01b0398909816835296905294909420805460ff191694151594909417909355505050505050565b6005546000908190819081906001600160a01b031633146102b75760405162461bcd60e51b815260206004820152601f60248201527f596f7520617265206e6f742074686520636f6e7472616374206f776e657221006044820152606401610125565b505060065460075460085460095492959194509250565b3360008181526020819052604081205460609291036102ff5760405162461bcd60e51b815260040161012590610844565b336000908152600460209081526040918290208054835181840281018401909452808452909183018282801561035e57602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610340575b505050505091505090565b33600081815260208190526040902054156103c65760405162461bcd60e51b815260206004820152601b60248201527f596f752061726520616c726561647920726567697374657265642100000000006044820152606401610125565b33600090815260208181526040808320869055600191829052822084905560068054919290916103f7908490610967565b9091555050505050565b33600081815260208190526040812054900361042f5760405162461bcd60e51b815260040161012590610844565b6001600160a01b0382166000908152602081905260408120548391036104675760405162461bcd60e51b815260040161012590610844565b3360009081526002602090815260408083206001600160a01b03871684529091528120805460ff1916905560088054600192906103f7908490610967565b3360008181526020819052604081205490036104d35760405162461bcd60e51b815260040161012590610844565b6001600160a01b03821660009081526020819052604081205483910361050b5760405162461bcd60e51b815260040161012590610844565b3360009081526003602090815260408083206001600160a01b0387168452909152902054839060ff16151560011461057e5760405162461bcd60e51b8152602060048201526016602482015275596f75206469646e277420766572696679207965742160501b6044820152606401610125565b3360009081526002602090815260408083206001600160a01b03881684529091528120805460ff1916600190811790915560078054919290916105c2908490610967565b90915550506001600160a01b038416600090815260026020908152604080832033845290915290205460ff161561066b573360008181526004602090815260408083208054600181810183559185528385200180546001600160a01b038b166001600160a01b0319918216811790925590855291842080548083018255908552928420909201805490911690931790925560098054909190610665908490610967565b90915550505b50505050565b6040805190810167ffffffffffffffff811182821017156106a257634e487b7160e01b600052604160045260246000fd5b60405290565b600082601f8301126106b957600080fd5b6106c1610671565b8060408401858111156106d357600080fd5b845b818110156106ed5780358452602093840193016106d5565b509095945050505050565b80356001600160a01b038116811461070f57600080fd5b919050565b600080600080610120858703121561072b57600080fd5b61073586866106a8565b9350604086605f87011261074857600080fd5b610750610671565b8060c088018981111561076257600080fd5b8389015b81811015610787576107788b826106a8565b84526020909301928401610766565b508196506107958a826106a8565b9550505050506107a861010086016106f8565b905092959194509250565b6020808252825182820181905260009190848201906040850190845b818110156107f45783516001600160a01b0316835292840192918401916001016107cf565b50909695505050505050565b6000806040838503121561081357600080fd5b50508035926020909101359150565b60006020828403121561083457600080fd5b61083d826106f8565b9392505050565b60208082526017908201527f596f7520617265206e6f74207265676973746572656421000000000000000000604082015260600190565b8060005b600281101561066b57815184526020938401939091019060010161087f565b61016081016108ad828761087b565b60408083018660005b60028082106108c55750610900565b82518460005b838110156108e95782518252602092830192909101906001016108cb565b5050509284019250602091909101906001016108b6565b5050505061091160c083018561087b565b61010082018360005b600381101561093957815183526020928301929091019060010161091a565b50505095945050505050565b60006020828403121561095757600080fd5b8151801515811461083d57600080fd5b8082018082111561098857634e487b7160e01b600052601160045260246000fd5b9291505056fea2646970667358221220f4fd912ae18131d9e84b5308ef06fdd742462daffe70fca5297d9af1a294222e64736f6c63430008150033608060405234801561001057600080fd5b506112a5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80630f9c5d491461003b57806356e4e8be14610062575b600080fd5b61004e610049366004611066565b610075565b604051901515815260200160405180910390f35b61004e61007036600461112b565b610115565b604080516003808252608082019092526000918291906020820160608036833701905050905060005b60038110156100ed578381600381106100b9576100b96111cb565b60200201518282815181106100d0576100d06111cb565b6020908102919091010152806100e5816111f7565b91505061009e565b506100f88185610234565b60000361010957600191505061010f565b60009150505b92915050565b600061011f610dff565b60408051808201825287518152602080890151818301529083528151608080820184528851518285019081528951840151606080850191909152908352845180860186528a8501805151825251850151818601528385015285840192909252835180850185528851815288840151818501528585015283516003808252918101909452600093929091908301908036833701905050905060005b6003811015610208578481600381106101d4576101d46111cb565b60200201518282815181106101eb576101eb6111cb565b602090810291909101015280610200816111f7565b9150506101b9565b506102138183610234565b6000036102255760019250505061022c565b6000925050505b949350505050565b60007f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f0000001816102606103b7565b9050806080015151855160016102769190611210565b1461028057600080fd5b604080518082019091526000808252602082018190525b865181101561032e57838782815181106102b3576102b36111cb565b6020026020010151106102c557600080fd5b61031a8261031585608001518460016102de9190611210565b815181106102ee576102ee6111cb565b60200260200101518a8581518110610308576103086111cb565b6020026020010151610840565b61089e565b915080610326816111f7565b915050610297565b5061035781836080015160008151811061034a5761034a6111cb565b602002602001015161089e565b905061039b8560000151866020015161036f846108f4565b85604001516103818a604001516108f4565b60608801518851610391906108f4565b8960200151610993565b6103ab576001935050505061010f565b50600095945050505050565b6103bf610e50565b6040805180820182527f25b22c498961088411cb129ea1d0592403005c7aac9fa1236134d80c4a754ea781527f19f3d717823ef2a3f1f2edf84d7819302f29af3a1f44b016b42cd0a84b3e878f6020808301919091529083528151608080820184527f21f29a603e879a4cae6e82509ada1bcadf23a35a43814373ee1b7a9931b4a9908285019081527f0cc0faab935650c19a22a9698e90d135b1b4fa5dbddf8952a14439e6d07a5e9d606080850191909152908352845180860186527f2f8d47a07aa60e85eaee3a5cde482c508f4e6ddfcf1ab7872e9c64ee9f69a45081527f2c9a0a443548c46a0463ee267bd515c8873899992cb7f7e66c3e3b711b4cd8bd818601528385015285840192909252835180820185527f1c9994cdab907f76bc59b423983b4a2e13ef8145b7f06161b20a7dac65b2c4b88186019081527f2b493fa1412ea5008fb6c508d960cf1ac31174232b338c509e4dde5ab7a1a04a828501528152845180860186527f255d8eb99a8e1839cae974d8dfe5773dda65b03e02a62fe3934a8e084f31723181527f03c6f948560987af839aa39e598a15c67493321dceaa8adb18d012761409d911818601528185015285850152835190810184527f08b1f263075c62429eb3e3fe61d01a8381407a40ed3937fd1362f672facb082c8185019081527f21c270aab27f5497593bc128977b215165fed403679d2f712a8fd7584175201d828401528152835180850185527f0926f2b141a4b68938298b0897be68970d4c2985dcdb4945b75ceb403693a58681527f09954c594187c9b943c71cb640636a28d5d92da5a67ed2d875fb36f2032397408185015281840152908401528151600480825260a08201909352919082015b604080518082019091526000808252602082015281526020019060019003908161063a57505060808201908152604080518082019091527f0c431ca501b601f303f9060229b80bbf49115078731c84a2ddef49b96aa5212881527f1ecc76d4dfcaa0f2bb7ed95be5b1e8f69a69286c656be7490b375b10635110106020820152905180516000906106cd576106cd6111cb565b602002602001018190525060405180604001604052807f1a9c447c0debf7714fa3d8f6438fb3bfb9b4c728f3d7ed57f0063ca0bb30f74581526020017f06a45ac2fd60b97a011c5d7dd8a05cc1e558a5a10268488071023363a42adb1c8152508160800151600181518110610744576107446111cb565b602002602001018190525060405180604001604052807f2888a3d812ed01b1e144f72eadc7354a86692067f65e6b1a23327277a186d86081526020017f192a8a53418fd21d1f265cc86b2bd9153e2df617cf6318862af696be152a0d3681525081608001516002815181106107bb576107bb6111cb565b602002602001018190525060405180604001604052807f174509c2b91d94a301def587e66efde248d83b4ee659dce400431c038fff818a81526020017f1ac4f3056447929d728d8fd4c1ba8a05b5e53bb152e6874589ecfd0fc04d94d38152508160800151600381518110610832576108326111cb565b602002602001018190525090565b604080518082019091526000808252602082015261085c610ea1565b835181526020808501519082015260408101839052600060608360808460076107d05a03fa9050808061088b57fe5b508061089657600080fd5b505092915050565b60408051808201909152600080825260208201526108ba610ebf565b8351815260208085015181830152835160408301528301516060808301919091526000908360c08460066107d05a03fa9050808061088b57fe5b604080518082019091526000808252602082015281517f30644e72e131a029b85045b68181585d97816a916871ca8d3c208c16d87cfd479015801561093b57506020830151155b1561095b5750506040805180820190915260008082526020820152919050565b6040518060400160405280846000015181526020018285602001516109809190611223565b61098a9084611245565b90529392505050565b60408051600480825260a08201909252600091829190816020015b60408051808201909152600080825260208201528152602001906001900390816109ae57505060408051600480825260a0820190925291925060009190602082015b6109f8610edd565b8152602001906001900390816109f05790505090508a82600081518110610a2157610a216111cb565b60200260200101819052508882600181518110610a4057610a406111cb565b60200260200101819052508682600281518110610a5f57610a5f6111cb565b60200260200101819052508482600381518110610a7e57610a7e6111cb565b60200260200101819052508981600081518110610a9d57610a9d6111cb565b60200260200101819052508781600181518110610abc57610abc6111cb565b60200260200101819052508581600281518110610adb57610adb6111cb565b60200260200101819052508381600381518110610afa57610afa6111cb565b6020026020010181905250610b0f8282610b1e565b9b9a5050505050505050505050565b60008151835114610b2e57600080fd5b82516000610b3d826006611258565b905060008167ffffffffffffffff811115610b5a57610b5a610f39565b604051908082528060200260200182016040528015610b83578160200160208202803683370190505b50905060005b83811015610dbe57868181518110610ba357610ba36111cb565b60200260200101516000015182826006610bbd9190611258565b610bc8906000611210565b81518110610bd857610bd86111cb565b602002602001018181525050868181518110610bf657610bf66111cb565b60200260200101516020015182826006610c109190611258565b610c1b906001611210565b81518110610c2b57610c2b6111cb565b602002602001018181525050858181518110610c4957610c496111cb565b60209081029190910181015151015182610c64836006611258565b610c6f906002611210565b81518110610c7f57610c7f6111cb565b602002602001018181525050858181518110610c9d57610c9d6111cb565b6020908102919091010151515182610cb6836006611258565b610cc1906003611210565b81518110610cd157610cd16111cb565b602002602001018181525050858181518110610cef57610cef6111cb565b602002602001015160200151600160028110610d0d57610d0d6111cb565b602002015182610d1e836006611258565b610d29906004611210565b81518110610d3957610d396111cb565b602002602001018181525050858181518110610d5757610d576111cb565b602002602001015160200151600060028110610d7557610d756111cb565b602002015182610d86836006611258565b610d91906005611210565b81518110610da157610da16111cb565b602090810291909101015280610db6816111f7565b915050610b89565b50610dc7610efd565b6000602082602086026020860160086107d05a03fa90508080610de657fe5b5080610df157600080fd5b505115159695505050505050565b6040805160a081019091526000606082018181526080830191909152815260208101610e29610edd565b8152602001610e4b604051806040016040528060008152602001600081525090565b905290565b6040805160e08101909152600060a0820181815260c0830191909152815260208101610e7a610edd565b8152602001610e87610edd565b8152602001610e94610edd565b8152602001606081525090565b60405180606001604052806003906020820280368337509192915050565b60405180608001604052806004906020820280368337509192915050565b6040518060400160405280610ef0610f1b565b8152602001610e4b610f1b565b60405180602001604052806001906020820280368337509192915050565b60405180604001604052806002906020820280368337509192915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715610f7257610f72610f39565b60405290565b600060408284031215610f8a57600080fd5b610f92610f4f565b9050813581526020820135602082015292915050565b600082601f830112610fb957600080fd5b610fc1610f4f565b806040840185811115610fd357600080fd5b845b81811015610fed578035845260209384019301610fd5565b509095945050505050565b600082601f83011261100957600080fd5b6040516060810181811067ffffffffffffffff8211171561102c5761102c610f39565b60405280606084018581111561104157600080fd5b845b8181101561105b578035835260209283019201611043565b509195945050505050565b60008082840361016081121561107b57600080fd5b6101008082121561108b57600080fd5b6040516060810181811067ffffffffffffffff821117156110ae576110ae610f39565b6040526110bb8787610f78565b81526080603f19840112156110cf57600080fd5b6110d7610f4f565b92506110e68760408801610fa8565b83526110f58760808801610fa8565b602084015282602082015261110d8760c08801610f78565b6040820152935061112086868301610ff8565b925050509250929050565b600080600080610160858703121561114257600080fd5b61114c8686610fa8565b9350604086605f87011261115f57600080fd5b611167610f4f565b8060c088018981111561117957600080fd5b8389015b8181101561119e5761118f8b82610fa8565b8452602090930192840161117d565b508196506111ac8a82610fa8565b9550505050506111c0866101008701610ff8565b905092959194509250565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201611209576112096111e1565b5060010190565b8082018082111561010f5761010f6111e1565b60008261124057634e487b7160e01b600052601260045260246000fd5b500690565b8181038181111561010f5761010f6111e1565b808202811582820484141761010f5761010f6111e156fea26469706673582212209949b1d43132995e57b977605b049159478aeede57f4c01c44cfebbb4143b62164736f6c63430008150033";
var contract_address = "0x82A94Bb925a87ba842e71700F49F35aA53755245";
    
async function register_preference(event) {
    // Prevent until all operations are finished
    event.preventDefault();

    // Define smart contract
    let signer = provider.getSigner(0);
    let contract = new ethers.Contract(contract_address, contract_abi, signer);

    // Collect user data
    let preferred_gender = parseInt($("#your-gender").val());
    let min_preferred_age = parseInt($("#min-your-age").val());
    let max_preferred_age = parseInt($("#max-your-age").val());
    let min_preferred_salary = parseInt($("#min-your-salary").val());
    let max_preferred_salary = parseInt($("#max-your-salary").val());
    let min_preferred_height = parseInt($("#min-your-height").val());
    let max_preferred_height = parseInt($("#max-your-height").val());
    let max_preferred_distance = parseInt($("#max-your-distance").val()); 

    // Collect user location
    let position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    let user_location_lat = parseInt(position.coords.latitude.toString().replace(".", "").substring(0, 6));
    let user_location_lon = parseInt(position.coords.longitude.toString().replace(".", "").substring(0, 6));

    // Calculate preferred location of user
    let min_preferred_location_lat = user_location_lat - max_preferred_distance * 90;
    let max_preferred_location_lat = user_location_lat + max_preferred_distance * 90;
    
    let min_preferred_location_lon = user_location_lon - max_preferred_distance * 117;
    let max_preferred_location_lon = user_location_lon + max_preferred_distance * 117;   

    // Calculate commitment for user preferences
    let preference_commitment = await zokrates_hash(
        ["0", preferred_gender.toString(), min_preferred_age.toString(), min_preferred_salary.toString(), min_preferred_height.toString(), min_preferred_location_lat.toString(), min_preferred_location_lon.toString(), "0"],
        ["0", preferred_gender.toString(), max_preferred_age.toString(), max_preferred_salary.toString(), max_preferred_height.toString(), max_preferred_location_lat.toString(), max_preferred_location_lon.toString(), "0"]);
    preference_commitment = JSON.parse(preference_commitment); 

    // Store preference data as json 
    let preference_data = {
        "preferredGender": preferred_gender,
        "minPreferredAge": min_preferred_age,
        "maxPreferredAge": max_preferred_age,
        "minPreferredSalary": min_preferred_salary,
        "maxPreferredSalary": max_preferred_salary,
        "minPreferredHeight": min_preferred_height,
        "maxPreferredHeight": max_preferred_height,
        "minPreferredLocationLat": min_preferred_location_lat,
        "maxPreferredLocationLat": max_preferred_location_lat,
        "minPreferredLocationLon": min_preferred_location_lon,
        "maxPreferredLocationLon": max_preferred_location_lon,
        "preferenceCommitment": preference_commitment
    };

    // Fetch user data from local storage
    let user_data = localStorage.getItem("user_data");
    user_data = JSON.parse(user_data);

    // Merge user data and preference data
    let request_data = { ...user_data, ...preference_data};

    // Call API request
    console.time('Server Response Time - Register');
    var response = await fetch("http://localhost:3000/register", {
        method: "POST",
        body: JSON.stringify(request_data),
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.timeEnd('Server Response Time - Register');
    response_data = await response.json();

    console.log(user_data);
    console.log(response_data);
    console.log(response_data.success);

    // Call smart contract function to register
    if (response_data.success) {
        let transaction = await contract.register(user_data["profileCommitment"].toString(), preference_commitment.toString());
        console.log(transaction.hash);

        window.location.href = "login.html";
    }
}