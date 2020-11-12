---
title: "CodeForces"
date: 2020-10-26T17:22:45+09:00
draft: false
tags: ["upsolve"]
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Div.1](#div1)
  - [#679-C](#679-chttpscodeforcescomcontest1444problemc)

<!-- /code_chunk_output -->

## Div.1

### [#679-C](https://codeforces.com/contest/1444/problem/C)

3分ほど間に合わなくて通せなかった問題。Dが通せたのでレートは増えたものの悔しい…

時間が足りなかった原因としては
- **グラフの二部グラフ判定は頂点倍加+Union Findでシミュレーション可能**

というドドド典型を度忘れして30分ほど迷走していたのが致命傷だった。これさえ見えればあとはRollback UFを使うだけの軽実装問題なので落としたのがかなり勿体ない…しっかり頭に入れておきたい。

- [#681-D](https://codeforces.com/contest/1442/problem/D)

この問題はかなり難しく、さらに考察の初手でそっぽに行ってしまったため解けないのはしょうがなかった面はある。とはいえ1時間くらい嘘解法を投げ続けていたのはひどかった…反省。