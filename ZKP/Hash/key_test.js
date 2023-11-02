const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_proof(a, b, c ,d){
    initialize().then((zokratesProvider) => {
        const source = 'import "hashes/sha256/512bitPacked" as sha256packed;\n\
                        def main(private field a, private field b, private field c, private field d) -> field {\n\
                            field[2] h = sha256packed([a, b, c, d]);\n\
                            return h[1];\n\
                        }' 

        const artifacts = zokratesProvider.compile(source);
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [a, b, c ,d]);

        // var pkStr = "";
        // const pkRestored = new Uint8Array(Buffer.from(pkStr, 'base64')); 
        
        const keypair = zokratesProvider.setup(artifacts.program);
        const proof = zokratesProvider.generateProof(artifacts.program, witness, keypair.pk);

        console.log(proof.proof.a);
        console.log(proof.proof.b);
        console.log(proof.proof.c); 
        console.log(proof.inputs);
    
        const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);
        const isVerified = zokratesProvider.verify(keypair.vk, proof);

        // var pkStr = Buffer.from(keypair.pk).toString('base64');
        // console.log(pkStr);
        // console.log(keypair.vk);
        // console.log(verifier);
    });
} 


a = "0"
b = "0"
c = "0"
d = "0"

generate_proof(a, b, c, d)  
