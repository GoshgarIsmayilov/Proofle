const { initialize } = require('zokrates-js')
const fs = require('fs');

function generate_proof(mins, maxs, values, hMinMax, hValues){
    initialize().then((zokratesProvider) => {
        const source = 'import "hashes/sha256/512bit" as sha256;\n\
                        import "utils/pack/u32/pack256" as pack256;\n\
                        def main(private u32[8] mins, private u32[8] maxs, private u32[8] values, public field hMinMax, public field hValues) -> field {\n\
                            u32[8] cMinMaxUnpacked = sha256(mins, maxs);\n\
                            field cMinMax = pack256(cMinMaxUnpacked);\n\
                            u32[8] cValuesUnpacked = sha256(values, values);\n\
                            field cValues = pack256(cValuesUnpacked);\n\
                            for u32 i in 0..7 {\n\
                                assert(mins[i] <= values[i]);\n\
                                assert(values[i] <= maxs[i]);\n\
                            }\n\
                            field result = (cMinMax == hMinMax && cValues == hValues) ? 1 : 0;\n\
                            return result;\n\
                        }'

        const artifacts = zokratesProvider.compile(source);
        const { witness, output } = zokratesProvider.computeWitness(artifacts, [mins, maxs, values, hMinMax, hValues]);

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

        /* var pkStr = Buffer.from(keypair.pk).toString('base64');
        console.log(pkStr);
        console.log(keypair.vk);
        console.log(verifier); */
    });
} 


mins = ["0","0","1","1","1","1","1","123"]
maxs = ["0","0","3","3","3","3","3","123"]
values = ["0","0","2","2","2","2","2","123"]
hMinMax = "8482097640612807505771856599912536419895334381901009345550235530541317844415"
hValues = "18684161795510445006676305293951307887830581482484779158418065868680491995359"

generate_proof(mins, maxs, values, hMinMax, hValues)  
