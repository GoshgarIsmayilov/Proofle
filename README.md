# Proofle

Proofle: A Privacy-Preserving Online Dating in Blockchain

_Zero-Knowledge in Mind, Infinite Love in Heart_

The number of individuals actively participating in online dating has been drastically surging up over the recent years. Accordingly, they have been revealing a significant amount 
of private information about themselves. In this work, we propose a novel privacy-preserving and partially-decentralized dating protocol (i.e. Proofle) based on zero-knowledge proof
on blockchain where the user attributes and preferences are private to the other users. The proposed protocol establishes trust between the users and the trusted party by allowing 
the correctness of the zero-knowledge proofs to be verified on-chain. The protocol consists of several layers including the zero-knowledge proof, blockchain, API server, database
and web user interface layers. We have analyzed the protocol with respect to the security perspective in order to identify its strengths and weaknesses. We have also carried out 
the extensive experimental study on the reference implementation of the protocol to measure blockchain gas consumption, proof size, proof generation/verification times and server 
response times. The experimental results justify the correctness and the applicability of our protocol.

# To Run

Our application needs all its layers to be running.

1. Install and configure Metamask extension on browser for Avalanche Fuji Testnet.
2. Deploy Proofle and verifier contracts (/Blockchain) to blockchain. (Blockchain layer completed...)
3. Run Web UI (/WebUI) with ```node server.js``` on port 3300.
4. Open Web UI on browser with ```http://localhost:3300/```. (Web UI layer completed...)
5. Update ```api.js``` (/Server) with the latest contract address and run with ```node api.js``` on port 3000. (API server and ZKP layers completed...)
6. Start PostgreSQL database (/Database) on port 3306. (Database layer completed...)
7. Interact with Web UI to create entries for two users within their preferences.
8. API server will find the match and trigger ZKP layer to generate the corresponding proof.

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/architecture.png" width="100%"/>

# Experimental Study 

## Blockchain Gas Consumption 

| Function        | Gas Units        | Gas Cost (Avax)  | Gas Cost (USD)  |
| --------------- | ---------------- | ---------------- | --------------- |
| Deploy Contract | 1,711,965        | 0.04707903       | 1.07            |
| Register        | 89,016           | 0.00235892       | 0.05            |
| Like            | 169,197          | 0.00524200       | 0.12            |
| Dislike         | 50,795           | 0.00136167       | 0.03            |
| Verify Proof    | 286,845          | 0.00768950       | 0.18            |

The transaction hashes can be traced on ```https://testnet.snowtrace.io```:
1. Deploy Contract:

   0xc9da7c3384c2cddb19bc63319e466f5ab3bb14986dbb44326e493a1f956427f1
2. Register:
   
   0xcd4db1b8437ad53cfff1ea61cba00e03077ff9e163362466e93cfa8bb130b141
   0xb009203871e6c48df7b71e4dd3a4280683e1f390428e7b4e1ef693e3c47df159
3. Like:

   0xf615d9ba777dee3a48f382930daa8df332a9ed233121080a2046441c1fe92769
   0x28e90029af72b94ed58d10c71c26f2403f99ec409e6a2670bb3fcdfa15b21043
4. Dislike:
   
   0x38d713832871f9d42ad7862dea450beeb7555e907fbf030e7bf32255fed1fc05
5. Verify Proof:

   0x755eb6538e0b7c8b894883bb18c67dcde44a95aba618cb3951b3d33694462d80
   0x18c7bfdac0c6e45771b3ccfd66fb8ab847515d7c7a54a0f47bdf78395306d461

## Zero-Knowledge Proof Size

| Constraints     | Proving Key      | Verification Key | Proof Size      |
| --------------- | ---------------- | ---------------- | --------------- |
| 57,837          | 22.6 MB          | 1.9 KB           | 997 B           |

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/proof.png" width="70%"/>

## Zero-Knowledge Proof Generation/Verification Times

| Run             | Generation Time (sec) | 
| --------------- | --------------------- | 
| 0               | 7.863                 |   
| 1               | 7.892                 |  
| 2               | 7.944                 |  
| 3               | 7.924                 |  
| 4               | 7.937                 |  
| 5               | 8.009                 |  
| 6               | 7.931                 |  
| 7               | 7.889                 |  
| 8               | 7.968                 |  
| 9               | 7.949                 |  
| 10              | 7.955                 |  
| 11              | 8.162                 |  
| 12              | 7.917                 |  
| 13              | 7.956                 |  
| 14              | 7.992                 |  
| 15              | 7.927                 |  
| 16              | 7.916                 |  
| 17              | 7.887                 |  
| 18              | 7.966                 |  
| 19              | 8.158                 |  

The zero-knowledge proofs are verified on-chain, without requiring any time cost. Note that the outliers are excluded in the figure.

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/proof_generation_times.png" width="70%"/>

## Server Response Times

| Run             | Register (sec)    | Log-in (sec)      | Match (sec)       | 
| --------------- | ----------------- | ----------------- | ----------------- | 
| 0               | 3.357             | 0.018             | 8.199             |
| 1               | 3.308             | 0.011             | 8.028             |
| 2               | 3.331             | 0.009             | 7.932             |
| 3               | 3.308             | 0.013             | 7.969             |
| 4               | 3.322             | 0.024             | 7.950             |
| 5               | 3.414             | 0.010             | 8.036             |
| 6               | 3.282             | 0.010             | 7.973             |
| 7               | 3.348             | 0.009             | 7.933             |
| 8               | 3.275             | 0.009             | 8.212             |
| 9               | 3.281             | 0.014             | 7.991             |
| 10              | 3.297             | 0.019             | 7.997             |
| 11              | 3.310             | 0.014             | 7.986             |
| 12              | 3.363             | 0.016             | 7.917             |
| 13              | 3.295             | 0.011             | 8.016             |
| 14              | 3.276             | 0.009             | 8.065             |
| 15              | 3.287             | 0.012             | 7.955             |
| 16              | 3.329             | 0.024             | 7.967             |
| 17              | 3.298             | 0.012             | 7.972             |
| 18              | 3.317             | 0.009             | 7.949             |
| 19              | 3.279             | 0.009             | 7.920             |

Note that the outliers are excluded in the figure.

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/server_response_times.png" width="60%"/>

# Some Maths

The problem is treated as a constraint satisfaction problem and formulated with the following way:

$$
\begin{align}
& x_{ii'} \cdot (\lambda_{ij} - \lambda_{i'j}^{min}) \geq 0, \forall \lambda_{ij} \in \lambda_{i} \\
& x_{ii'} \cdot (\lambda_{i'j}^{max} - \lambda_{ij}) \geq 0, \forall \lambda_{ij} \in \lambda_{i} \\
& x_{ii} = 0  \\
& x_{ii'} \in \{ 0, 1 \}
\end{align}
$$

where $\lambda_{ij}$ is the _j_ th attribute of the _i_ th user, $\lambda_{ij}^{min}$ and $\lambda_{ij}^{min}$ are the minimum and maximum preferences of the _i_ th user on the _j_ th attribute, $x_{ii'}$ is the binary decision variable (i.e. 1 if matched, 0 if not matched), $i$ and $i'$ are two different users.

The security of _Proofle_ is formulated with the following way:

$$
\begin{align}
c^i & = Comm([\lambda_{i0} \odot \lambda_{i1} \odot \dots \odot \lambda_{i{M-1}}], r^i) \\
c^i_{mm} & = Comm([\lambda_{i0}^{min} \odot \lambda_{i1}^{min} \odot \dots \odot \lambda_{i{M-1}}^{min}], [\lambda_{i0}^{max} \odot \lambda_{i1}^{max} \odot \dots \odot \lambda_{i{M-1}}^{max}], r^i_{mm}) 
\end{align}
$$

where $c^i$ and $c^i_{mm}$ are the resulting commitments of the commitment function $Comm$, $r$ is the large salting value, $M$ is the number of total attributes considered and $\odot$ is the binary concatenation operation.

Proof is generated off-chain for a successful match: 

$$
\begin{align}
\pi^{ii'}[A, B, C] = ZkpGen( & [\lambda_{i'j}^{min} \leq \lambda_{ij} \leq \lambda_{i'j}^{max}], [r^i, r^{i'}\_{mm}, c^i, c^i\_{mm}, pk]) 
\end{align}
$$

where $\pi$ is the resulting proof of the zero-knowledge proof generation function $ZkpGen$ with the list of three curve points $[A, B, C]$ and $pk$ is the proving key. 

Proof is verified on-chain for a successful match: 

$$
\begin{align}
b^{ii'} = ZkpVfy([\pi^{ii'}[A, B, C], c^i, c^{i'}_{mm}, vk])
\end{align}
$$

where $b^{ii'}$ is the resulting Boolean variable of the zero-knowledge proof verification function $ZkpVfy$ and $vk$ is the verification key.

# WebUI Visualization

Starter...   Registration-Photo...   Registration-Profile...

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/starter.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/registration-photo.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/registration-profile.png" width="30%"/>

Registration-Preference...   Login...   Swipe...

<img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/registration-preference.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/login.png" width="30%"/> <img src="https://github.com/GoshgarIsmayilov/Proofle/blob/main/Auxiliary/swipe.png" width="30%"/>

# Publications to Read

1. Shafi Goldwasser, Silvio Micali, and Chales Rackoff. The knowledge complexity of interactive proof-systems. SIAM Journal on Computing, 18(1):186–208, 1989.
2. Jacob Eberhardt and Stefan Tai. Zokrates-scalable privacy-preserving off-chain computations. In IEEE International Conference on Internet of Things (iThings) and Cyber, Physical and Social Computing (CPSCom), pages 1084–1091, 2018.
3. Paulo SLM Barreto and Michael Naehrig. Pairing-friendly elliptic curves of prime order, 2005.
4. Jens Groth. On the size of pairing-based non-interactive arguments. In Advances in Cryptology: 35th Annual International Conference on the Theory and Applications of Cryptographic Techniques, pages 305–326. Springer, 2016.
5. Eli Ben-Sasson, Alessandro Chiesa, Eran Tromer, and Madars Virza. Succinct {Non-Interactive} zero knowledge for a von neumann architecture. In 23rd USENIX Security Symposium (USENIX Security 14), pages 781–796, 2014.
6. Bryan Parno, Jon Howell, Craig Gentry, and Mariana Raykova. Pinocchio: Nearly practical verifiable computation. Communications of the ACM, 59(2):103–112, 2016.
