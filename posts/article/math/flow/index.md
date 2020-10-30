---
title: "Flow"
date: 2020-10-30T00:00:00+09:00
draft: false
tags: ["math"]
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [燃やす埋める問題(Project Selection Problem)](#燃やす埋める問題project-selection-problem)
  - [概要](#概要)
  - [原理](#原理)
  - [具体例](#具体例)

<!-- /code_chunk_output -->

## 燃やす埋める問題(Project Selection Problem)

参考にした記事

[診断人さんのスライド](https://www.slideshare.net/shindannin/project-selection-problem) 図が多くわかりやすい。

[ferinさんの記事](https://ferin-tech.hatenablog.com/entry/2019/10/28/%E7%87%83%E3%82%84%E3%81%99%E5%9F%8B%E3%82%81%E3%82%8B%E5%95%8F%E9%A1%8C)　色々まとまっていて参考になる。

### 概要

- 「燃やす埋める」とは、特殊な最適化問題をフローに帰着して最大流で解くアルゴリズムの通称である
  
- 「燃やす埋める問題」はおおむね次のような問題である
  - 複数の小問題があり、小問題ごとに$a$か$b$のどちらかを選ぶ
  - 選択肢同士に依存関係がある
  - コストの最小値(最大値)を求めよ

- このような問題を有向グラフに落とし込むことで最小カットで解くことが出来る
  - 問題に対応する頂点を持つグラフを作る
  - 必ず$a$を選ぶ点$S$と必ず$b$を選ぶ点$T$を追加する
  - 制約に応じて適切にグラフに辺を貼る
  - $S$から$T$への最大流が答え

- 得点を最大化する問題の時は「得点」を「得点-(得点の最大値)」に置き換える
  - 損失を最小化する問題に帰着するので最小カットで解ける

### 原理

- [yosupoさんの記事](https://yosupo.hatenablog.com/entry/2015/03/31/134336)、および
[kimiyukiさんの記事](https://kimiyuki.net/blog/2017/12/05/minimum-cut-and-project-selection-problem/)が非常に参考になった

- 「辺を選んで切る」のではなく「頂点に色を塗る」イメージで考える
  - 「$a$を選ぶ」,「$b$を選ぶ」を「赤で塗る」,「青で塗る」と言い換える

- 次のような彩色問題を考える
  - 全ての頂点を赤か青で塗る
  - 頂点$S$は必ず赤く塗る
  - 頂点$T$は必ず青く塗る
  - 頂点$x$が赤、頂点$y$が青で塗られているとコスト$c(c \geq 0)$がかかる
  - コストの最小値は？

- この問題の答えは$x$から$y$に流量$c$の有向辺を貼った時の$S-T$間の最小カットに等しくなる
  - よって最大流で高速に解ける

- これを応用することで多くの条件に対応したグラフを作ることが出来る

### 具体例

- 基本例だけ書いておく
  ($x,y,w$で$x$から$y$の向きに流量$w$の辺を貼るという意味)

- $x$が赤で$y$が青だと$w$失う
  - $(x,y,w)$

- $x$が赤だと$w$失う
  - $(x,T,w)$

- $x$が青だと$w$失う
  - $(S,x,w)$

- $x$,$y$が両方赤だと$w$得る
  - 頂点$U$を追加
  - 無条件で$w$得る
  - $(S,U,w),(U,x,\infty),(U,y,\infty)$

- $x$,$y$が両方青だと$w$得る
  - 頂点$U$を追加
  - 無条件で$w$得る
  - $(U,T,w),(U,x,\infty),(U,y,\infty)$

- 他にも色々なケースがある [参考1](https://ferin-tech.hatenablog.com/entry/2019/10/28/%E7%87%83%E3%82%84%E3%81%99%E5%9F%8B%E3%82%81%E3%82%8B%E5%95%8F%E9%A1%8C) [参考2](https://ei1333.github.io/luzhiled/snippets/memo/project-selection.html)

- **「両方赤なら$w$失う」はうまくいかない**
  - ただし二部グラフの場合は片方の部集合の辺を逆の順番で貼ると上手くいく([診断人さんのスライド](https://www.slideshare.net/shindannin/project-selection-problem)のp.66がわかりやすい)

