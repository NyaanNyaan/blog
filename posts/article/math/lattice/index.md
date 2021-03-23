---
title: "Lattice"
date: 2021-03-23T14:00:41+09:00
draft: false
---

書きかけ

数え上げ問題の中で`01`列の数え上げに帰着できる問題は多く存在するが、そのような問題はうまく言い換えることで格子状の経路や数え上げに帰着できる。

この記事では格子上の数え上げテクニックをまとめることを目標にしている。

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [鏡像法](#鏡像法)
  - [鏡像法の概要](#鏡像法の概要)
  - [カタラン数と鏡像法](#カタラン数と鏡像法)
    - [カタラン数の計算](#カタラン数の計算)
    - [終点が$(n,m)$である場合](#終点がnmである場合)
    - [境界線が$y=x+b$である場合](#境界線がyxbである場合)
    - [境界線が$y=ax+b$である場合](#境界線がyaxbである場合)
    - [境界線が2本ある場合](#境界線が2本ある場合)
  - [例題](#例題)
    - [yukicoder No.1241 Eternal Tours](#yukicoder-no1241-eternal-tourshttpsyukicodermeproblemsno1241)
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

### 鏡像法の概要

グリッド上の経路を数え上げるときに「グリッド上の特定領域から出てはいけない」という境界条件があるとする。このような条件を境界線に対称的な位置に(仮想的な始点/仮想的な終点)を置いて言い換えることで問題の見通しをよくする手法を鏡像法と呼ぶ。

### カタラン数と鏡像法

鏡像法の例として非常に有名な数え上げとしてカタラン数およびその変種が挙げられる。

#### カタラン数の計算

> $(0,0)$を始点、$(n,n)$を終点として常に$x\geq y$を満たす経路の数$C_n$は？

まずは数式的に処理した解法を説明する。余事象として始点・終点は一緒だが条件を満たさない経路の数を考えると、初めて$x\lt y$になった点を$x=i$として$\sum_{0 \leq i \lt n} C_i \times \binom{2n-2i-1}{n-i}$であるとわかるが、この式は$(0,0)$から$(x-1,y+1)$への経路の和の式として解釈できる。(図を書くと容易に確かめられる。)よって答えは$\binom{2n}{n}-\binom{2n}{n-1}$となる。

この問題を鏡像法で解くと、$y=x+1$を境界線として$(x-1,y+1)$に寄与が$-1$倍である仮想の終点を置いて計算すればよい。正当性は上の計算と同様にして確かめられる。

また、同様の議論によって以下の場合も鏡像法を使用して容易に計算できる。

#### 終点が$(n,m)$である場合

> $(0,0)$から$(n,m)$への$y=x$をまたがないパスの通り数は？$(n\gt m)$

終点の鏡像を$(m-1,n+1)$に置くことで

$$\binom{n+m}{m}-\binom{n+m}{m-1}$$

であるとわかる。　関連：[Catalanの三角形](https://en.wikipedia.org/wiki/Catalan%27s_triangle)

#### 境界線が$y=x+b$である場合

> $(0,0)$から$(n,m)$への$y=x+b$をまたがないパスの通り数は？$(n\gt m,b\geq 0)$

$m \leq b$の時は明らかに

$$\binom{n+m}{m}$$

である。$m \gt b$の時は$(m-(b+1),n+b+1)$に仮想の終点を置くことで

$$\binom{n+m}{m}-\binom{n+m}{m-(b+1)}$$

が導かれる。　関連：[Catalanの台形](https://en.wikipedia.org/wiki/Catalan%27s_triangle#Generalization)

#### 境界線が$y=ax+b$である場合

TODO:書く

#### 境界線が2本ある場合

TODO:書く

### 例題

#### [yukicoder No.1241 Eternal Tours](https://yukicoder.me/problems/no/1241)

Editorialでは始点を増やす方法で説明しているが、自分は終点を増やす方で通したのでそちらで説明する。

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
