---
title: "形式的冪級数"
date: 2020-11-14T19:46:18+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [FPS/多項式ライブラリの解説まとめ](#fps多項式ライブラリの解説まとめ)
- [FPS 公式集](#fps-公式集)
  - [OGF](#ogf)
  - [EGF](#egf)
  - [ラグランジュの反転公式](#ラグランジュの反転公式)
    - [概要](#概要)
    - [例題](#例題)
      - [例1 カタラン数](#例1-カタラン数)
      - [例2 N頂点の根付き木の数え上げ(ケイリーの公式)](#例2-n頂点の根付き木の数え上げケイリーの公式)

<!-- /code_chunk_output -->

## FPS/多項式ライブラリの解説まとめ

自分のライブラリ解説へのリンク集(解説を書いてないものはリンク無し)

- 基本演算
  - [四則演算/剰余/逆元/累乗/指数関数/対数関数](https://nyaannyaan.github.io/library/fps/formal-power-series.hpp)
  - [平方根](https://nyaannyaan.github.io/library/fps/fps-sqrt.hpp)
  - [平行移動](https://nyaannyaan.github.io/library/fps/taylor-shift.hpp)
  - [関数の合成](https://nyaannyaan.github.io/library/fps/fps-composition.hpp)
  - [三角関数](https://nyaannyaan.github.io/library/fps/fps-circular.hpp)
- 応用
  - 多点評価(multipoint evaluation)
  - 多点補間(multipoint interpolation)
  - [線形漸化式の第$k$項を求める](https://nyaannyaan.github.io/library/fps/kitamasa.hpp)
  - 線形漸化式を求める(berlekamp-massey)
  - [常微分方程式](https://nyaannyaan.github.io/library/fps/differential-equation.hpp)
  - [$\frac{1}{f(x)} \mod g(x)$, 多項式GCD](https://nyaannyaan.github.io/library/fps/polynomial-gcd.hpp)
  - $f(x)^k \mod g(x)$
  - [階乗 $\mod p$](https://nyaannyaan.github.io/library/modulo/factorial.hpp)
  - 有名数列(スターリング数/ベル数/ベールヌイ数/分割数/Eulerian number)
  - [$\sum_i a^if(i)$](https://nyaannyaan.github.io/library/fps/sum-of-exponential-times-poly.hpp)
  - 部分分数分解
  - 標本点のシフト
  - 多項式行列の行列式
  - Black Box Linear Algebra(ベクトル/行列の列の最小多項式)

## FPS 公式集

### OGF

一般項は0-indexで表している。
$a_x$のOGFを$A$と置く。
$[$条件文$]$は条件文が真の時に1、偽の時に0である値とする。

|数列|一般項|母関数|
|:---:|:---:|:---:|
|$1,0,0,0,0,\ldots$|$[n=0]$|1|
|$1,1,1,1,1,\ldots$|$1$|$\frac{1}{1-x}$|
|$1,2,3,4,5,\ldots$|$n+1$|$\frac{1}{(1-x)^2}$|
|$1,3,6,10,15,\ldots$|$\binom{n+2}{2}$|$\frac{1}{(1-x)^3}$|
|$1,4,10,20,35,\ldots$|$\binom{n+3}{3}$|$\frac{1}{(1-x)^4}$|
|$1,k,\frac{k(k+1)}{2},\ldots$|$\binom{n+k-1}{k-1}$|$\frac{1}{(1-x)^k}$|
|$1,-1,1,-1,1,\ldots$|$(-1)^n$|$\frac{1}{1+x}$|
|$1,c,c^2,c^3,c^4,\ldots$|$c^n$|$\frac{1}{1-cx}$|
|$1,1,2,3,5,8,\ldots$|$\frac{1}{\sqrt{5}}\left(\phi^n+(1-\phi)^n\right)$|$\frac{1}{1-x-x^2}$|
|$c_1+c_2,c_1\alpha+c_2\beta,\ldots$|$c_1\alpha^n+c_2\beta^n$|$\frac{c_1}{1-\alpha x}+\frac{c_2}{1-\beta x}$|
|$0,1,4,9,16,25,\ldots$|$n^2$|$\frac{x(1+x)}{(1-x)^3}$|
|$0,1,\frac{1}{2},\frac{1}{3},\frac{1}{4}\ldots$|$\frac{1}{n}$|$\log(\frac{1}{1-x})$|
||$[n=ja]\cdot\frac{1}{j}$|$\log(\frac{1}{1-x^a})=\sum_{j=1}^\infty\frac{x^{aj}}{j}$|
||||
|$0,\ldots,0,a_0,a_1,a_2,\ldots$|$[n \geq k] \cdot a_{n-k}$|$A(x)x^k$|
|$a_0,-a_1,a_2,-a_3,a_4,\ldots$|$(-1)^na_n$|$A(-x)$|
|$a_0,a_1c,a_2c^2,a_3c^3,\ldots$|$a_nc^n$|$A(cx)$|
|$a_0,0,a_2,0,a_4 \ldots$|$a_n \cdot [n\ \mathrm{is}\ \mathrm{even}]$|$\frac{A(x)+A(-x)}{2}$|
|$0,a_1,0,a_3,0 \ldots$|$a_n \cdot [n\ \mathrm{is}\ \mathrm{odd}]$|$\frac{A(x)-A(-x)}{2}$|
|$a_0,a_0+a_1,a_0+a_1+a_2\ldots$|$\sum_{i=0}^n a_n$|$\frac{A(x)}{1-x}$|
|$a_0,a_1-a_0,a_2-a_1, \ldots$|$a_n-a_{n-1}$|$A(x)(1-x)$|
|$a_1,2a_2,3a_3,4a_4,\ldots$|$(n+1)a_{n+1}$|$\frac{d}{dx}A(x)$|
|$0,a_1,a_22^k,a_33^k,a_44^k\ldots$|$a_nn^k$|$\left(x\frac{d}{dx}\right)^k A(x)$|
||$\sum_{i+j=n}a_ib_j$|$A(x)B(x)$|
||$\sum_{\sum i_k=n}\Pi {a_k}_{i_k}$|$\Pi A_k(x)$|

### EGF

|数列|一般項|母関数|
|:---:|:---:|:---:|
|$1,1,1,1,1,\ldots$|$1$|$e^x$|
|$0,1,2,3,4,\ldots$|$n$|$xe^x$| 
|$1,2,6,24,\ldots$|$n!$|$\frac{1}{1-x}$|
|$1,c,c^2,c^3,\ldots$|$c^n$|$e^{cx}$| 
|$1,0,1,0,1,\ldots$|$[n\ \mathrm{is}\ \mathrm{even}]$|$\frac{e^x+e^{-x}}{2}$|
|$0,1,0,1,0,\ldots$|$$[n\ \mathrm{is}\ \mathrm{odd}]$$|$\frac{e^x-e^{-x}}{2}$|
||||
|$a_k,a_{k+1},a_{k+2},\ldots$|$a_{n+k}$|$\left(\frac{d}{dx}\right)^kA(x)$|
|$0,a_0,2a_1,3a_2,\ldots$|$na_{n-1}$|$xA(x)$|
||$\sum_{i+j=n}a_ib_j\ _nC_i$|$A(x)B(x)$|
||$\sum_{\sum i_k=n}\Pi {(a_k)}_{i_k}\cdot\binom{n}{i_0,i_1,\ldots}$|$\Pi A_k(x)$|
||$\sum_i a_i\cdot i^n$　($A$はOGF)|$A(e^x)$|


### ラグランジュの反転公式

ラグランジュの反転公式は関数$f(\omega)=x$に対して$g(x)=\omega$である逆関数を求める公式である。

#### 概要

(1)$f(\omega) = \frac{\omega}{\phi(\omega)}$であるとき任意の関数$H$に対して

$$[x^n]H(g(x))=\frac{1}{n}[\omega^{n-1}]\left(H(\omega)'\phi(\omega)^n\right)$$

とくに$H$が恒等写像のとき

$$[x^n]g(x)=\frac{1}{n}[\omega^{n-1}]\phi(\omega)^n$$

(2)関数$g(x)$が$g(x) = a + x\phi(g(x))$を満たすとき、

$$[x^n]g(x) = \frac{1}{n!} \left|\frac{d^{n-1}}{d \omega ^{n-1}} \left(\phi(\omega)^n\right)\right|_{\omega=a}$$

特に$g(x) = x\ \phi(g(x))$のとき

$$[x^n]g(x)=\frac{1}{n}[\omega^{n-1}]\phi(\omega)^n$$

#### 例題

##### 例1 カタラン数
(カタラン数の母関数)=$C(x),F(x)=C(x)-1$とおくと

$$F(x) = x(F(x) + 1)^2$$

となり、上の公式に$\phi(\omega)=(\omega +1)^2, a=0$を代入したものになる。よって

$$[x^n]F(x) = \frac{1}{n} [\omega^{n-1}](\omega+1)^{2n}= \frac{1}{n+1} \binom{2n}{n}$$

が従う。

##### 例2 N頂点の根付き木の数え上げ(ケイリーの公式)

$n$頂点からなる根付き木の総数を$R_n$とおく。
$R_n$の値を根とつながっている子の個数ごとで場合分けして数え上げる。
- 子が0個のとき $[n=1]$
- 子が1個のとき $n\cdot R_{n-1}$
- 子が2個のとき $\frac{n}{2!}\sum_{i+j=n-1}R_iR_j \ _{n-1}C_i$
- 子が3個のとき $\frac{n}{3!}\sum_{i+j+k=n-1}R_iR_jR_k\binom{n-1}{i,j,k}$
...
ここで$R(n)$のEGFを$F(x)$とおくと

$$R_n=n[x^{n-1}]\left(1 + F(x)+\frac{F(x)^2}{2!}+\frac{F(x)^3}{3!}+\ldots\right) = n[x^{n-1}]e^{F(x)}$$

よって$F(x)=xe^{F(x)}$が従う。
よって$R_n$はラグランジュの反転公式に$\phi(\omega)=e^\omega,a=0$を代入すれば求まり、

$$R_n=\left|\frac{d^{n-1}}{d \omega ^{n-1}} e^{n\omega}\right|_{\omega=0}=n^{n-1}$$

となる。
また、$n$頂点の根無し木1個につき$n$個の根の選び方が存在することから、$n$頂点の根無し木の個数は$n^{n-2}$とわかる。(ケイリーの公式)