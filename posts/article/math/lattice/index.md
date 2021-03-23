---
title: "Lattice"
date: 2021-03-23T14:00:41+09:00
draft: false
---

書きかけ

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [鏡像法](#鏡像法)
- [Young tableau](#young-tableau)
  - [ヤング図形(Young diagram)](#ヤング図形young-diagram)
  - [共役ヤング図形](#共役ヤング図形)
  - [Young Tableau(ヤング盤)](#young-tableauヤング盤)
  - [フック長の公式(Hook length formula)](#フック長の公式hook-length-formula)
    - [例：カタラン数](#例カタラン数)
- [Lindström–Gessel–Viennot lemma](#lindströmgesselviennot-lemma)
- [その他](#その他)

<!-- /code_chunk_output -->

## 鏡像法

TODO:書く

## Young tableau

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A4%E3%83%B3%E3%82%B0%E5%9B%B3%E5%BD%A2)

### ヤング図形(Young diagram)

ヤング図形とは正方形を下に行くにしたがって一列当たりの正方形の個数が少なくなるように左揃えに並べた図形を言う。(図を見たほうが早い。)

正方形$n$個からなるヤング図形は、整数$n$の分割と一対一対応している。ここで分割とは、整数の組$(k_1,k_2,\ldots,k_n)$が

- $n = \sum_{1 \leq i \leq n} k_i$
- $k_1 \geq k_2 \ldots \geq k_n$

を満たすことを言い、$i$列目の正方形の個数が$k_i$個であるヤング図形と対応している。

### 共役ヤング図形

ヤング図形を対角線に沿って反転したものを共役ヤング図形と呼ぶ。例えば、分割$(5,4,1)$に対応するヤング図形の共役ヤング図形は分割$(3,2,2,2,1)$に対応する。

共役ヤング図形を利用することで次の定理が証明できる。

> $k$個以下の整数からなる分割の個数と、$k$以下の整数からなる分割の個数は一致する。

証明はそれぞれの分割が1列当たりの正方形が$k$個以下であるヤング図形の集合、および共役ヤング図形の集合に対応することから従う。

### Young Tableau(ヤング盤)

ヤング盤とはヤング図形の$n$個の正方形に$1$から$n$までの整数を次の条件を満たすように配置したものを言う。

- 各行内で数が左から右に向けて増加する。
- 各列内で数が上から下に向けて増加する。

特に$1,2,\ldots,n$が1回ずつ登場するヤング盤を標準盤、そうでないものを半標準盤と呼ぶ。

### フック長の公式(Hook length formula)

あるヤング図形について、その形をした標準盤を数え上げる公式をフック長の公式と呼ぶ。

分割$\lambda=(\lambda_1,\ldots,\lambda_m)$に対応するヤング図形のマス$(i,j)$に対してフック長$H_\lambda(i,j)$を$a=i \wedge b \geq j$または$a \geq i \wedge j = b$を満たすマス$(a,b)$の個数と置く。この時、標準盤の個数$d_\lambda$は

$$d_\lambda = \frac{n!}{\prod_{i,j} H_\lambda(i,j)}$$

で計算出来る。

#### 例：カタラン数

TODO:書く

## Lindström–Gessel–Viennot lemma

[Wikipedia](https://en.wikipedia.org/wiki/Lindstr%C3%B6m%E2%80%93Gessel%E2%80%93Viennot_lemma)

DAGであるグラフ$G$および始点の集合$A=\lbrace a_1,a_2,\ldots,a_n\rbrace$、終点の集合$B=\lbrace b_1,b_2,\ldots,b_n\rbrace$が与えられる。頂点$a$から頂点$b$へのパス$P$に対して、パス上の辺の重みの積を$\omega(P)$と表す。そして、関数$e(a,b)$を$e(a,b) = \sum_{P:a\rightarrow b} \omega(P)$と定める。
- 特に全ての辺の重みが$1$の時、$\omega(P)$は$a$から$b$へのパスの通り数に一致する。

次に、以下の条件を満たす$n$要素のパスのタプルを$A$から$B$へのパスのタプル$(P_1,\ldots,P_n)$と呼ぶ。
- ある順列$\sigma$が存在して、パス$P_i$は$a_i$から$b_{\sigma(i)}$へのパスである。(この時の順列を$\sigma(P)$と表す。)
- $i\not = j$のとき、パス$P_i$とパス$P_j$は共有点を持たない。

この時、パスのタプルの集合と、$M_{i,j}=e(a_i,b_j)$を満たす$n\times n$行列$M$との間には以下の関係式が成り立つ。(Lindström–Gessel–Viennot lemma)

$$\det(M) = \sum_{(P_1,\ldots,P_n):A\rightarrow B} \mathrm{sgn}(\sigma(P)) \prod_{i=1}^n \omega(P_i)$$

特に条件を満たすパスのタプルが$\sigma(P)=(1,2,\ldots,n)$の時に限り、かつ辺の重みが全て$1$である時、$\det(M)$は$a_i\rightarrow b_i$への交差しないパスのタプルの通り数に一致する。

## その他

ad-hocなAtCoderの問題などをまとめる

BBQ hard
バイナリハック
Japanese Knowledge
