---
title: "Graph"
date: 2020-10-26T23:53:01+09:00
draft: false
tags: ["math"]
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [二部グラフ](#二部グラフ)
  - [Hallの結婚定理](#hallの結婚定理)

<!-- /code_chunk_output -->

## 二部グラフ

### Hallの結婚定理

- 二部グラフの片方の頂点集合を全て含むマッチングが存在するかを判定するのに使える定理

- 頂点$U,V$からなる二部グラフ$G$に対して次の二つの命題は同値

  - $U$に含まれる全ての頂点をカバーするマッチングが存在する
  - 任意の$U$の部分集合$A$と$A$に隣接する頂点の集合$\Gamma(A)$について$|A|\leq|\Gamma(A)|$が成り立つ。

- 例題:52枚のトランプを4枚ずつ13組に分けた時、各組からカードを1枚ずつ選んで1~13が1枚ずつ含まれる組を作れることを示せ。

  - 頂点集合$A:\lbrace a_1\ldots a_{13}\rbrace$:カードの組
  - 頂点集合$B:\lbrace b_1\ldots b_{13}\rbrace$:カードの数字
  - $i$番目の組に数字$j$の書かれたカードが存在するときに$a_i$と$b_j$に辺を貼る
  - すると条件を満たす構築は$A$をカバーするマッチングと一致する
  - よって$\forall S\subset A,|S|\leq |\Gamma(S)|$を示せればよい
  - $S$には$4|S|$枚のカードが含まれるので少なくとも$|S|$種類の数字が存在する、よって$|S|\leq|\Gamma(S)|$、よって示された

- [参考1(電通大の講義資料)](http://dopal.cs.uec.ac.jp/okamotoy/lect/2013/graphtheory/handout12.pdf) [参考2(高校数学の美しい物語)](https://mathtrain.jp/hall)
