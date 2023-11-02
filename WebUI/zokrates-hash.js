import { initialize } from 'zokrates-js';

export default async function zokrates_hash(a, b) {
  const hash = initialize().then((zokratesProvider) => {
    const code = 'import "hashes/sha256/512bit" as sha256;\n\
                    import "utils/pack/u32/pack256" as pack256;\n\
                    def main(private u32[8] a, private u32[8] b) -> field {\n\
                        u32[8] h1 = sha256(a, b);\n\
                        field h2 = pack256(h1);\n\
                        return h2;\n\
                  }'

    const artifacts = zokratesProvider.compile(code);
    const { witness, output } = zokratesProvider.computeWitness(artifacts, [a, b]);
    return output;
  });
  return hash;
}

