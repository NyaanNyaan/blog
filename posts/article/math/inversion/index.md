---
title: "Inversion"
date: 2021-02-20T13:18:37+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [反転](#反転)
  - [反転公式](#反転公式)
  - [二項係数の反転公式(パスカル行列)](#二項係数の反転公式パスカル行列)
    - [2種類の公式](#2種類の公式)
    - [パスカル行列](#パスカル行列)
    - [実装](#実装)
    - [例題](#例題)
      - [ (Library Checker) Montmort Number](#library-checker-montmort-numberhttpsjudgeyosupojpproblemmontmort_number_mod)
      - [ (Library Checker) Polynomial Taylor Shift](#library-checker-polynomial-taylor-shifthttpsjudgeyosupojpproblempolynomial_taylor_shift)
      - [CF 923E](#cf-923ehttpscodeforcescomcontest923probleme)
      - [LOJ575 不等関係](#loj575-不等関係httpslojacp575)
  - [スターリング数の反転公式(スターリング行列)](#スターリング数の反転公式スターリング行列)
    - [例題](#例題-1)
      - [ (TCO 2014 Wildcard) CountTables](#tco-2014-wildcard-counttableshttpscommunitytopcodercomstatcproblem_statementpm13444rd16189)
  - [メビウスの反転公式(約数変換/倍数変換)](#メビウスの反転公式約数変換倍数変換)
    - [メビウス関数　$\mu(n)$](#メビウス関数-mun)
    - [メビウスの反転公式](#メビウスの反転公式)
    - [もう一つのゼータ/メビウス変換](#もう一つのゼータメビウス変換)
    - [実装](#実装-1)
    - [乗法的関数](#乗法的関数)
    - [有名な乗法的関数](#有名な乗法的関数)
    - [例題](#例題-2)
      - [メビウス関数と包除原理](#メビウス関数と包除原理)
      - [(HackerRank) Cube-loving Numbers](#hackerrank-cube-loving-numbershttpswwwhackerrankcomcontestsuniversity-codesprint-5challenges)
  - [1の冪根を利用した反転](#1の冪根を利用した反転)
    - [概要](#概要)
    - [例題](#例題-3)
      - [LOJ6358 前夕](#loj6358-前夕httpslojacp6358)
      - [bzoj 3328](#bzoj-3328)

<!-- /code_chunk_output -->

## 反転

### 反転公式

数列$f,g$が反転可能であるとは、ある行列$a,b$が存在して、

$$g_j=\sum_{i=0}^n a_{ji}f_i$$

かつ

$$f_j = \sum_{i=0}^n b_{ji}g_i$$

が成り立つことを言う。

反転公式の使用方法としては、「直接計算できない数列$f$を求める時に$g$を経由して$f$を求める」という場合が多い。

- 個人的な感想としては、意識的に公式を使おうとするとしばしば混乱してしまうが、反転操作は包除原理やらゼータ変換やらFPSやらで無意識的に使っていることも多いのでうまく感覚で理解したい。

また、上式の片方を他方に代入することで$ab=I$が成り立つことが証明できる。つまり、反転公式は、行列の積・および逆行列の積と捉えることが出来る。

以下に反転の例を挙げていく。

### 二項係数の反転公式(パスカル行列)

(狭義の)包除原理に関連した反転公式。

#### 2種類の公式

二項係数の反転公式は大きく分けて2つの種類がある。

$$f_i = \sum_{j=0}^i\binom{i}{j}g_j \leftrightarrow g_i = \sum_{j=0}^i (-1)^{i-j} \binom{i}{j}f_j$$

$$f_i = \sum_{j=i}^n\binom{n}{j}g_j \leftrightarrow g_i = \sum_{j=i}^n (-1)^{j-i} \binom{n}{j}f_j$$

式だけだとイメージがつかめないので具体例を考える。$n$個の対称性を持つ集合$S_1,\ldots,S_n$が存在する。1個目の式は

$$f(i):=\lvert \overline{S_1} \cap \overline{S_2} \cap \overline{S_3} \cap \ldots \cap \overline{S_i} \rvert$$

$$g(i):=\lvert S_1\cap S_2 \cap S_3 \cap \ldots \cap S_i \rvert$$

とおいた時である。

#### パスカル行列

二項係数を要素に持つ行列をパスカル行列と呼ぶ。[wikipedia](https://en.wikipedia.org/wiki/Pascal_matrix) 

下三角Pascal行列と上三角Pascal行列はそれぞれ次のような形になる。

$$
L_5 = 
\left(
  \begin{array}{ccccc}
  1 & 0 & 0 & 0 & 0 \newline \\
  1 & 1 & 0 & 0 & 0 \newline \\
  1 & 2 & 1 & 0 & 0 \newline \\
  1 & 3 & 3 & 1 & 0 \newline \\
  1 & 4 & 6 & 4 & 1
  \end{array}
\right)
$$

$$
U_5 = 
\left(
  \begin{array}{ccccc}
  1 & 1 & 1 & 1 & 1 \newline \\
  0 & 1 & 2 & 3 & 4 \newline \\
  0 & 0 & 1 & 3 & 6 \newline \\
  0 & 0 & 0 & 1 & 4 \newline \\
  0 & 0 & 0 & 0 & 1
  \end{array}
\right)
$$

式を観察すると、2種類の二項係数の反転公式はそれぞれ下三角行列と上三角行列の積で表されることがわかる。この事実から$U^{-1},L^{-1}$はそれぞれ次の形になる。

$$
L_5^{-1} = 
\left(
  \begin{array}{ccccc}
  1 & 0 & 0 & 0 & 0 \newline \\
  -1 & 1 & 0 & 0 & 0 \newline \\
  1 & -2 & 1 & 0 & 0 \newline \\
  -1 & 3 & -3 & 1 & 0 \newline \\
  1 & -4 & 6 & -4 & 1
  \end{array}
\right)
$$

$$
U_5^{-1} = 
\left(
  \begin{array}{ccccc}
  1 & -1 & 1 & -1 & 1 \newline \\
  0 & 1 & -2 & 3 & -4 \newline \\
  0 & 0 & 1 & -3 & 6 \newline \\
  0 & 0 & 0 & 1 & -4 \newline \\
  0 & 0 & 0 & 0 & 1
  \end{array}
\right)
$$

#### 実装

$(a)$から$(b)$への反転はFFTを利用して$\mathrm{O}(N \log N)$で計算出来ることが知られている。例えば、上三角Pascal行列は

$$b_i = \sum_{i\leq j\leq n}\binom{j}{i}a_j = \frac{1}{i!} \sum_{i \leq j \leq n} \frac{1}{j-i!} \cdot a_j j!$$

と変形することでFFTが可能な形に持ち込める。

```cpp
void pascal(fps& f, bool inv = false) {
  int n = f.size();
  fps g(n);
  for (int i = 0; i < n; i++) {
    f[i] *= C.fac(i), g[i] = C.finv(i);
    if (inv and (i & 1)) g[i] = -g[i];
  }
  f = (f.rev() * g).pre(n).rev();
  for (int i = 0; i < n; i++) f[i] *= C.finv(i);
}
```

#### 例題

##### [ (Library Checker) Montmort Number](https://judge.yosupo.jp/problem/montmort_number_mod)

> $n,m$が与えられるので$a_i := $長さ$i$の攪乱順列の個数 $\mod m$を$1 \leq i \leq n$に対して求めよ。

これくらいの難易度だと包除原理を使った方が楽だが、反転公式を利用して説明する。

陽に計算するのは難しいので反転を利用する。長さ$i$の順列のうち$j$要素が一致しているような順列の個数は$\binom{i}{j}a_j$で与えられるので、$a_0=0$と置いて

$$i! = \sum_{0 \leq j \leq i} \binom{i}{j} a_j$$

を得る。反転すると

$$a_i = \sum_{0 \leq j \leq i} (-1)^{i-j} \binom{i}{j} j! $$

$$= i! \sum_{0\leq j\leq i}\frac{(-1)^{i-j}}{(i-j)!}$$

$$=i! \sum_{0\leq j\leq i}\frac{(-1)^j}{j!}$$

を得る。

余談だが、この公式から$a_n$は$\frac{n!}{e}$に最も近い整数であることが示せる。また、Library Checkerの問題は任意modなので逆元は使えないため、3項間漸化式

$$a_{i+2}=(n-1)(a_{i+1}+a_{i})$$

を利用して通す必要がある。

##### [ (Library Checker) Polynomial Taylor Shift](https://judge.yosupo.jp/problem/polynomial_taylor_shift)

> $f(x)=\sum_{0\leq i\lt n} a_ix^i$および$c$が与えられる。$f(x+c)=\sum_{0\leq i\lt n} b_ix^i$を求めよ。

$$f(x+c)=\sum_{0\leq i\lt n}a_i(x+c)^i$$

の右辺を二項係数で展開すると

$$\sum_{0\leq j\lt n}c^{-j}x^j\sum_{j\leq i\lt n}\binom{i}{j}a_ic^i$$

と表せるので、Pascal行列を用いて

$$
\left(
  \begin{array}{c}
  b_0 c^0 \newline \\
  b_1 c^1 \newline \\
  b_2 c^2 \newline \\
  \vdots \newline \\
  b_{n-1} c^{n-1}
  \end{array}
\right) =
\left(
  \begin{array}{ccccc}
    \binom{0}{0} & \binom{1}{0} & \binom{2}{0} & \ldots & \binom{n-1}{0} \newline \\
    0 & \binom{1}{1} & \binom{2}{1} & \ldots & \binom{n-1}{1}\newline \\
    0 & 0 & \binom{2}{2} & \ldots & \binom{n-1}{2} \newline \\
    \vdots & \vdots & \vdots & \ddots & \vdots \newline \\
    0 & 0 & 0 & \ldots & \binom{n-1}{n-1}
  \end{array}
\right)
\left(
  \begin{array}{c}
  a_0 c^0 \newline \\
  a_1 c^1 \newline \\
  a_2 c^2 \newline \\
  \vdots \newline \\
  a_{n-1} c^{n-1}
  \end{array}
\right)
$$

と表せる。[関連](https://www.slideshare.net/KeigoNitadori/pascal-43628658)

##### [CF 923E](https://codeforces.com/contest/923/problem/E)

> 正方行列
> $$
A = \left(
\begin{array}{ccccc}
1 & \frac{1}{2} & \frac{1}{3} & \ldots & \frac{1}{n+1} \newline \\
0 & \frac{1}{2} & \frac{1}{3} & \ldots & \frac{1}{n+1}\newline \\
0 & 0 & \frac{1}{3} & \ldots & \frac{1}{n+1} \newline \\
\vdots & \vdots & \vdots & \ddots & \vdots \newline \\
0 & 0 & 0 & \ldots & \frac{1}{n+1}
\end{array}
\right)
$$
> および$N+1$次元ベクトル$P$、整数$M$が与えられる。$A^MP \mod 998244353$を出力せよ。
> $N \leq 10^5, M \leq 10^{18}$

実は$A$はパスカル行列を利用して対角化が可能である。具体的には、

$$
A_4 = \left(
\begin{array}{cccc}
1 & \frac{1}{2} & \frac{1}{3} & \frac{1}{4} \newline \\
0 & \frac{1}{2} & \frac{1}{3} & \frac{1}{4} \newline \\
0 & 0 & \frac{1}{3} & \frac{1}{4} \newline \\
0 & 0 & 0 & \frac{1}{4}
\end{array}
\right) $$

$$=
\left(
\begin{array}{cccc}
1 & -1 & 1 & -1 \newline \\
0 & 1 & -2 & 3 \newline \\
0 & 0 & 1 & -3 \newline \\
0 & 0 & 0 & 1
\end{array}
\right)
\left(
\begin{array}{cccc}
1 & 0 & 0 & 0 \newline \\
0 & \frac{1}{2} & 0 & 0 \newline \\
0 & 0 & \frac{1}{3} & 0 \newline \\
0 & 0 & 0 & \frac{1}{4}
\end{array}
\right)
\left(
\begin{array}{cccc}
1 & 1 & 1 & 1 \newline \\
0 & 1 & 2 & 3 \newline \\
0 & 0 & 1 & 3 \newline \\
0 & 0 & 0 & 1
\end{array}
\right)
$$

のように表せるので$\mathrm{O}(N(\log N+\log M))$で計算できる。

ゴリゴリ式変形する解法もあるようだ。(読めていない) [参考](https://blog.trisolaris.top/cf923e/)

##### [LOJ575 不等関係](https://loj.ac/p/575)

> [EDPC T Permutation](https://atcoder.jp/contests/dp/tasks/dp_t)の$N \leq 10^5$版。

$\mathrm{dp}_{i,j}$:=左から順に$i$番目の数字まで決めた時、$i$番目の数が今までで$j$番目に大きい場合の数、とすると$\mathrm{O}(N^2)$で解ける。

高速化のために見方を変えて、連続する$<$の列を1つの区間として見る。すると、求める列は昇順列からなる区間が並んだもので、連続する区間は前の区間の最後の数字が後ろの区間の最初の数字より大きくなければならない。

TODO:続きを書く

### スターリング数の反転公式(スターリング行列)

TODO: 色々書く

#### 例題

##### [ (TCO 2014 Wildcard) CountTables](https://community.topcoder.com/stat?c=problem_statement&pm=13444&rd=16189)

> $N\times M$のグリッドの各マスに$1$から$C$を入れていく。任意の2つの行の並びが異なり、かつ任意の2つの列の並びが異なるような数の入れ方は？
>
> $N,M\leq 4000$

$g(m)$:=$N$行$m$列のグリッドの全ての行が異なる並び方、と置くと

$$g(m) = (C^m)^{\underline{N}}$$

を得る。次に、$f(m)$:=$N$行$m$列のグリッドの全ての行・列が異なる並べ方と置く。

$g(m)$を$f(i)$の和で表すことを考える。$N$行$m$列の全てのグリッドの行が異なり、かつ列は全部で$i$種類だったとする。すると場合の数は($m$行の列を$i$個のグループに分ける方法)$*f(i)$になる。よって第二種スターリング数${m \brace i}$を用いて

$$g(m) = \sum_{i=0}^m {m \brace i} f(i)$$

を得る。よって、反転公式より

$$f(m) = \sum_{i=0}^m (-1)^{m-i} {m \brack i} g(i)$$

を得るので、$g(m)$とスターリング数を$O(nm+m^2)$で前計算すればこの問題を解くことが出来る。

### メビウスの反転公式(約数変換/倍数変換)

日本でも割と流行っている反転公式。

#### メビウス関数　$\mu(n)$

メビウス関数とは自然数$n$に対して次のように定義される関数である。

$$\mu(n)=\begin{cases}1 & (n=1) \newline \\ 0 & (nが平方因子を持つ) \newline \\ (-1)^k & (nがk個の素因数を持つ)\end{cases}$$

メビウス関数には以下の基本公式が成り立つ。(包除原理で証明できる。)

$$\sum_{d\mid n}\mu (d)=\begin{cases}1 & (n=1) \newline \\ 0 & (n\neq 1)\end{cases}$$

また、メビウス関数が登場する基本的な公式としてメビウスの反転公式が挙げられる。

#### メビウスの反転公式

関数$f,g$が全ての正の整数$n$に対して

$$g(n) = \sum_{d\mid n}f(d)$$

を満たしているとする。上の式を言い換えると、$g(n)$は全ての$n$の約数$d$について$f(d)$を足し合わせたものである。競技プログラミングの文脈では「$g$は$f$の**約数ゼータ変換**である」としばしば表現される。(正式な呼称ではない。)

このとき$f$と$g$の間には次の関係式が成り立つ。(**メビウスの反転公式**)

$$f(n) = \sum_{d\mid n}\mu(d)g\left(\frac{n}{d}\right)=\sum_{d\mid n}\mu\left(\frac{n}{d}\right)g(d)$$

証明は[高校数学の美しい物語](https://mathtrain.jp/mobiusinversion)に詳しい。また、$g$から$f$への変換を**約数メビウス変換**と呼ぶ。

#### もう一つのゼータ/メビウス変換

集合関数に対して上位集合へのゼータ/メビウス変換と下位集合へのゼータ/メビウス変換が定義されるように、**倍数ゼータ変換/メビウス変換**を定義することが出来る。

関数$f,g$が全ての正の整数$n$に対して

$$g(n) = \sum_{n\mid m}f(m)$$

を満たしているとする。上の式を言い換えると、$g(n)$は全ての$n$の倍数$m$について$f(m)$を足し合わせたものである。競技プログラミングの文脈では「$g$は$f$の**倍数ゼータ変換**である」としばしば表現される。

このとき$f$と$g$の間には次の関係式が成り立つ。**(倍数メビウス変換)**

$$f(n) = \sum_{n\mid m}\mu\left(\frac{m}{n}\right)g(m)$$

#### 実装

約数変換・倍数変換はともに$\mathrm{O}(n \log \log n)$で出来ることが知られている。

解説を[noshi大先生のブログ](https://noshi91.hatenablog.com/entry/2018/12/27/121649)に、丸投げ…

#### 乗法的関数

代数的なメビウス変換に関する重要な概念として乗法的関数と呼ばれるものがある。

$f(n)$が任意の$\gcd(a,b) = 1$である自然数$a,b$に対して$f(ab) = f(a)f(b)$となる時、$f(n)$は乗法的であると呼ぶ。特に任意の$a,b$について$f(ab)=f(a)f(b)$が成り立つ時は完全乗法的であると呼ぶ。

乗法的関数の重要な性質は以下のようなものが挙げられる。

- $f(n),g(n)$が乗法的である時、$h(n)=f(n)g(n)$も乗法的である。
- $f(n),g(n)$が乗法的である時、ディリクレの畳み込みで得られる関数$h(n)=\sum_{d\mid n}f(d)g\left(\frac{n}{d}\right)$も乗法的である。

また、乗法的関数に関するアルゴリズムは以下のものが知られている。

- $f(n)$が乗法的であり、かつ$f(p^k)$が$\mathrm{O}(1)$で求まるとき、
  - $f(n)$の計算が$\mathrm{O}(n^{\frac{1}{4}})$程度　(Pollard's Rho法)
  - $f(n)$の初め$n$項の列挙が$\mathrm{O}(n)$　([実装](https://nyaannyaan.github.io/library/multiplicative-function/enamurate-multiplicative-function.hpp))
  - $f(n)$の初め$n$項のprefix sumが$\mathrm{O}(n^{\frac{2}{3}})$　([実装](https://nyaannyaan.github.io/library/multiplicative-function/enamurate-multiplicative-function.hpp))
  - $g(n)=\sum_{d\mid n}\mu\left(\frac{n}{d}\right)f(d)$の初め$n$項の列挙が$\mathrm{O}(n \log \log n)$　([実装](https://nyaannyaan.github.io/library/multiplicative-function/divisor-multiple-transform.hpp))

#### 有名な乗法的関数

- 定数関数　$\mathrm{I}(n)=c$
- 恒等写像　$\mathrm{Id}(n)=n$
- 指数関数　$\mathrm{Id}_a(n)=n^a$
- Unit Function $\epsilon(n)=[n = 1]$
- メビウス関数　$\mu(p^k) =[k = 0]-[k = 1]$
- 約数関数 $\sigma_a(p^k) = \sum_{i=0}^k p^{ai}$
- トーシェント関数　$\phi(p^k) = p^k - p^{k-1}$

このうち下の3つは次の畳み込みの関係が知られている。

- メビウス関数　$\sum_{d \mid n} \mu(n) = \epsilon(n)$
- 約数関数 $\sum_{d \mid n} d^a = \sigma_a(n)$
- トーシェント関数　$\sum_{d \mid n} \phi(d) = n$

#### 例題

##### メビウス関数と包除原理

> $N$の約数$n$に対して$g(n)=\sum_{d\mid n}f(d)$と$\mu(n)$がわかっているとする。この時$f(N)$を$\mathrm{O}(\sigma(N))$で計算せよ。

約数系包除を使えば$\mathrm{O}(\sigma(N)^2)$で解けるがより高速な解法を考えたい。
まずは反転公式を使わずに考察してみる。具体的な$N$についていくつか実験してみると、

$$f(16)=g(16)-g(8)$$

$$f(12)=g(12)-g(6)-g(4)+g(2)$$

$$f(30)=g(30)-g(15)-g(10)-g(6)+g(5)+g(3)+g(2)-g(1)$$

のようになり、これは包除原理+BIT全探索で解くことが出来る。([tsutajさんの非常にわかりやすい包除PDF](https://compro.tsutaj.com//archive/181015_incexc.pdf)に類題の詳しい説明がある。)

一方、反転公式を使うと、例えば$n=12$の時は

$$f(12) = \sum_{d \in \lbrace 1,2,3,4,6,12\rbrace}\mu\left(\frac{n}{d}\right)g(d)=g(12)-g(6)-g(4)+g(2)$$

となり包除原理によって得られる結果と一致する。

下位集合に対するゼータ変換が包除原理で解けることと、約数集合に対するゼータ変換がメビウス関数で解けることは同じような関係にある(？)と言える。

##### [(HackerRank) Cube-loving Numbers](https://www.hackerrank.com/contests/university-codesprint-5/challenges)

> $N$が与えられるので、「自然数$a>1,b\geq 1$を用いて$a^3\times b$と表せる$N$以下の自然数の個数」を$\mathrm{O}(\sqrt[3]{N})$で計算せよ。

$1\leq n\leq N$において自然数$a,b$を用いて$n=a^3\times b$と表せる$n$の個数$g(a)$は$g(a)=\lfloor\frac{N}{a^3}\rfloor$と容易に表せるので、この式をうまく利用して答えを求めたい。(直感的には、$g(n)$は一つの自然数を複数回カウントする関数なのでメビウス変換したいという気持ちになる。)

対象を重複なく数え上げるために、自然数$n$に一対一対応する$(a,b)$を決定したい。具体的には、「$n=A^3\times B$を満たす自然数の組$(A,B)$の中で最も$B$が小さい組」を$n$に対応する組$(a,b)$とおく。そして、$f(a)$を「$(a,\frac{n}{a^3})$と対応している$N$以下の自然数$n$の個数」とおく。

$f$と$g$の関係式を得るために、$g(a)$でカウントされている自然数$n$が$f$のどこでカウントされているかを考える。$n=a^3\times b$としたとき、$b$に一対一対応する整数の組を$(c,d)$とおくと、$n$に対応する組は$(ca,d)$であるから$f(ca)$で数え上げられていることが分かる。逆に$f(ca)$で数え上げられた$n$が$g(a)$で数えられていることも示せる。よって$f(a)$と$g(a)$の間には

$$g(a)=\sum_{a\mid m}f(m) \leftrightarrow f(a)=\sum_{a\mid m}\mu\left(\frac{m}{a}\right)g(m)$$

という倍数変換の関係式が成り立つことがわかる。また、求める答えは$M=\lfloor\sqrt[3]{N}\rfloor$と置いたとき$\sum_{a=2}^Mf(a)$である。
($M\lt a$のとき$f(a)=g(a)=0$である事実を利用している。)

よって倍数メビウス変換を用いれば$\mathrm{O}(M\log \log M)$で計算できることが示せたが、メビウス関数を用いることでさらなる高速化を図りたい。$\sum_{a=2}^Mf(a)$を$g(m)$の線形和に分解したときの$g(m)$の寄与を考察すると、

$$\sum_{a=2}^M f(a)=\sum_{2\leq a\leq M, a\mid m} \left( \mu\left(\frac{m}{a}\right)g(m)\right)$$

$$=\sum_{2\leq m\leq M} g(m)\left(\sum_{a\mid m,a\neq 1}\mu\left(\frac{m}{a}\right)\right)$$

$$=\sum_{2\leq m\leq M} g(m)(-\mu(m)+\sum_{a\mid m}\mu(a))=-\sum_{2\leq m\leq M} g(m)\mu(m)$$

と非常にきれいな式になる。$\mu(m)$および$g(m)$は線形で列挙できるため、求める答えも線形で列挙できる。以上よりこの問題を$\mathrm{O}(\sqrt[3]{N})$で解くことが出来た。

### 1の冪根を利用した反転

#### 概要

整数$k$および数列$a$に対して、添え字が$m$の倍数の時の和$\sum_i a_i [m\vert i]$を高速に計算したいとする。

この式の計算に$1$の$M$乗根$W_m$を利用する。$W_m$は次の性質を持つ。

$$\sum_{i=0}^{m-1}W_m^{ki} =
\begin{cases}
m & k \equiv 0 \pmod m \newline \\
0 & \mathrm{otherwise}
\end{cases}
$$

この式を利用すると、

$$\sum_i a_i [m\vert i] = \frac{1}{m}\sum_i a_i \sum_j W^{ij} = \frac{1}{m} \sum_j \left(\sum_i a_i (W^{j})^i\right)$$

と変形できるので、$\sum_i a_i x^i$が良い性質を持つ場合に計算が高速化できる。

#### 例題

##### [LOJ6358 前夕](https://loj.ac/p/6358)

> $\lbrace 1,2,\ldots,n\rbrace$の部分集合からなる集合のうち、共通部分の要素の個数が$m$の倍数になる集合の個数は？
>
> $n \leq 10^7, m = 4$

少なくとも$i$種類の要素が共通部分に含まれる場合の数$b_i$は

$$b_i = \binom{n}{i} (2^{2^{n-i}}-1)$$

であるので、ちょうど$i$種類の要素が共通部分に含まれる場合の数$a_i$は

$$a_i = \sum_{i\leq j\leq n}(-1)^{j-i}\binom{j}{i}b_j$$

で得られる。よって答えは

$$\sum_{m\vert i}a_i = \sum_{m\vert i}\sum_{i\leq j\leq n}(-1)^{j-i}\binom{j}{i}b_j$$

$$=\sum_j b_j \sum_{0 \leq i\leq j}(-1)^{j-i}\binom{j}{i}\lbrack m \vert i \rbrack$$

であるから、
$$f_k = \sum_{0 \leq i\leq k}(-1)^{k-i}\binom{k}{i}\lbrack m \vert i \rbrack$$

を高速に計算できればよいとわかる。$1$の$M$乗根$W_m$を利用すると、

$$f_k = \sum_{0 \leq i\leq k}(-1)^{k-i}\binom{k}{i} \frac{1}{m}\sum_{0\leq j\lt m}W_m^{ij}$$
$$=\frac{1}{m}\sum_{0\leq i\leq k,0\leq j\lt m}(-1)^{k-i} (W_m^j)^i \binom{k}{i}$$
$$=\sum_{0\leq j \lt m} (W_m^i - 1)^k$$

と変形できるので高速に計算できる。

##### [bzoj 3328]()

> $n,k,p$が与えられる。
> $$\left(\sum_{i=0}^{\lfloor\frac{n}{k}\rfloor}\binom{n}{ik}F_{ik}\right)\bmod p$$
> を求めよ。ただし$p$は素数で、$F_i$は$F_0=F_1=1,F_{i+2}=F_{i+1}+F_{i}$を満たす数列である。
>
> $n\leq 10^{18},k\leq 20000,p\leq 10^9, p \bmod k = 1$

$$\sum_{i=0}^n \binom{n}{i}F_i [k\vert i]$$

を計算できればよい。$\mod p$上の$1$の$k$乗根$W_k$を利用して変換すると、

$$\frac{1}{k} \sum_{j=0}^k \left(\sum_{i=0}^n \binom{n}{i} F_i (W^{j})^i\right)$$

という形になるので、$\sum_i \binom{n}{i} F_i x^i$を高速に計算できれば良いとわかる。

計算のために行列を利用する。行列$A$をフィボナッチ数列の遷移行列とすると、$F_n = (A^n)_{11}$になる。よって、$I$を単位行列とすると、

$$f(x) = (Ax + I)^n = \sum_{i=0}^n \binom{n}{i}A^i x^i$$

の$1$行$1$列目は$\sum_i \binom{n}{i} F_i x^i$と一致する。よって答えは

$$\left(\frac{1}{k} \sum_{j=0}^k f(W_j)\right)_{11}$$

である。