---
title: "FPS part 1"
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
  - [モーメント母関数](#モーメント母関数)
    - [例題](#例題-1)
      - [(自作) $k$乗和](#自作-k乗和)
      - [yukicoder No.1124 Earthquake Safety](#yukicoder-no1124-earthquake-safetyhttpsyukicodermeproblemsno1124)

<!-- /code_chunk_output -->

## FPS/多項式ライブラリの解説まとめ

自分のライブラリ解説へのリンク集。

リンクが無いものは解説を書いていないものだが、大半は実装がライブラリに存在する。

- 基本演算
  - [四則演算/剰余/逆元/累乗/指数関数/対数関数](https://nyaannyaan.github.io/library/fps/formal-power-series.hpp)
  - [平方根](https://nyaannyaan.github.io/library/fps/fps-sqrt.hpp)
  - [平行移動](https://nyaannyaan.github.io/library/fps/taylor-shift.hpp)
  - [関数の合成](https://nyaannyaan.github.io/library/fps/fps-composition.hpp)
  - [三角関数](https://nyaannyaan.github.io/library/fps/fps-circular.hpp)
- 応用
  - 多点評価(multipoint evaluation)
  - 多項式補間
  - [線形漸化式の第$k$項を求める](https://nyaannyaan.github.io/library/fps/kitamasa.hpp)
  - 線形漸化式を求める(berlekamp-massey)
  - p-recursiveの第$k$項を求める
  - p-recursiveを求める
  - [常微分方程式](https://nyaannyaan.github.io/library/fps/differential-equation.hpp)
  - [$\frac{1}{f(x)} \mod g(x)$, 多項式GCD](https://nyaannyaan.github.io/library/fps/polynomial-gcd.hpp)
  - $f(x)^k \mod g(x)$
  - $\prod_i (x + a_i)$
  - $\prod_i (1 - x^{a_i})$
  - [階乗 $\mod p$](https://nyaannyaan.github.io/library/modulo/factorial.hpp)
  - 有名数列(スターリング数/ベル数/ベールヌイ数/分割数/Eulerian number)
  - [$\sum_i a^if(i)$](https://nyaannyaan.github.io/library/fps/sum-of-exponential-times-poly.hpp)
  - 部分分数分解
  - 分割統治FFT(オンラインFFT)
  - 標本点のシフト
  - 多次元FFT
  - 多変数FPS(multivariate multiplication)
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

数え上げでは主に以下の二つの公式が出てくる。

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

$$[x^n]F(x) = \frac{1}{n} \lbrack\omega^{n-1}\rbrack(\omega+1)^{2n}= \frac{1}{n+1} \binom{2n}{n}$$

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

### モーメント母関数

TODO:概要を書く

#### 例題

##### (自作) $k$乗和

> 数列$a_0,\ldots,a_n$が与えられる。$k=0,1,\ldots,m$について$S(k) = \sum_i a_i i^k$を$\mathrm{O}(n \log^2 n)$で求めよ。

$\forall i, a_i = 1$の場合は[Sums of Powers](https://yukicoder.me/problems/no/1145)のようにして解けるが、今回は$a_i$を掛ける必要があり微妙に設定が異なる。(Sums of Powersの方針でも解けるのか？不明)

$A(x) = \sum_i a_i x^i$に$x=e^t$を代入すると、

$$A(e^t)=\sum_i a_i e^{ti}=\sum_i a_i \left(\sum_k \frac{i^k t^k}{k!}\right)$$

$$=\sum_k \frac{t^k}{k!} \left(\sum_i a_i i^k \right) = \sum_k S(k) \frac{t^k}{k!} $$

となるので$A(e^t)$は$S(k)$のEGFであるとわかる。よって$A(e^t)$を$\mathrm{O}(n \log^2 n)$で計算すればよい。

この関係式は$\sum_k$($k$である場合の数)×($k$の多項式で表されるスコア)の和を求める問題に適用できる。

##### [yukicoder No.1124 Earthquake Safety](https://yukicoder.me/problems/no/1124)

> $N$頂点の木$(V,E)$が与えられる。$E$の部分集合$e$に対して、スコア$S(e)$を次のように定める。
> - グラフ$(V,e)$における頂点$i$を含む連結成分の大きさを$D_i$としたとき、$S(e)=\sum_i (D_i)^2$とおく。
>
> $\sum_{e \subseteq E} S(e) \bmod {10^9+7}$を求めよ。

大きさ$k$の連結成分のスコアの寄与は$k\times k^2 = k^3$であることに着目して、連結成分を数え上げる問題に帰着して考える。

木を適当に根を取り根付き木と見なして、各頂点$n$について$n$を根とする部分木の寄与を計算したい。これは

- $dp_{n,k}$:$n$と$n$の子孫の間の辺の有無を自由に決めた時の、根が$n$でサイズが$k$である部分木の場合の数

とすることで木DPで計算できる形に持ち込める。また、$dp_{n}$をFPSと見なすと子の寄与のマージを多項式の積で表せるので、下の疑似コードのような簡潔な遷移で表せる。

```python
ans = 0

def dfs(c):
  dp = poly([0, 1]) # polyは多項式クラス
  for d in (child of c): dp *= dfs(d)
  # スコア(s(c) := cの部分木のサイズ)
  score = 0
  for i in range(len(dp)):
    score += dp[i] * i * i * i
  # 根以外の辺の場合の数
  rest = pow(2, max(0, N - 1 - c(s)), mod)
  # 答えへの寄与
  ans += score * rest
  # cの親の辺がない場合を足しておく
  dp[0] = pow(2, c(s) - 1, mod)
  return dp

dfs(0)
```

ただしこのDPは計算量が$\mathrm{\tilde{O}(N^2)}$になってしまう。ここで、欲しいものは$\sum_{dp_n} dp_{n,k} k^3$なのに注目してモーメント母関数を登場させる。すなわち、多項式$dp_n(x)$を計算する代わりに4次のFPS$dp_n(e^t)$を管理する。すると、子のマージが$\mathrm{O}(1)$で済むため計算量が$\mathrm{O}(N)$に落ちる。

```python
ans = 0

def dfs(c):
  dp = fps([1, 1, 1/2, 1/6])
  for d in (child of c): dp *= dfs(d)
  score = dp[3] * 6
  rest = pow(2, max(0, N - 1 - c(s)), mod)
  ans += score * rest
  dp[0] += pow(2, c(s) - 1, mod)
  return dp

dfs(0)
```

[提出](https://yukicoder.me/submissions/516887)

