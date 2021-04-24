---
title: "FPS Part 2"
date: 2021-04-22T15:18:01+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [問題集(1)](#問題集1)
    - [CF 865G](#cf-865ghttpscodeforcescomproblemsetproblem865g)
    - [UOJ0424 count](#uoj0424-counthttpsuojacproblem424localeen)
      - [解法1 通常型母関数](#解法1-通常型母関数)
      - [解法2 ラグランジュの反転公式](#解法2-ラグランジュの反転公式)
    - [yukicoder No.963 門松列列(2)](#yukicoder-no963-門松列列2httpsyukicodermeproblemsno963)
    - [yukicoder No.1145 Sums of Powers](#yukicoder-no1145-sums-of-powershttpsyukicodermeproblemsno1145)
    - [CF 755G](#cf-755ghttpscodeforcescomcontest755problemg)
    - [CF 438E](#cf-438ehttpscodeforcescomcontest438probleme)
    - [LOJ575 不等関係](#loj575-不等関係httpslojacp575)
    - [$\deg(f)$が小さいときの$f(x)^k \mod x^n$](#degfが小さいときのfxk-mod-xn)
      - [実装例(自分用)](#実装例自分用)
    - [CF 773F](#cf-773fhttpscodeforcescomproblemsetproblem773f)

<!-- /code_chunk_output -->

分量が多すぎるので過去の記事を分割しました。

## 問題集(1)

- 形式的冪級数の式変形の部分にポイントが置かれている印象の問題をここにまとめる。

#### [CF 865G](https://codeforces.com/problemset/problem/865/G)

> $n$種類の花びらと$m$種類のお菓子箱があり、$i$番目の花には$p_i$枚の花弁が、$j$番目の箱には$c_i$枚のチョコレートが入っている。
> $N$本の花とチョコレートをそれぞれ一列に並べる。この時、花びらの枚数とチョコレートの枚数が一致するようにする。条件を満たす並べ方は何通り？$\pmod{10^9+7}$
> 
> $n\leq 10,m\leq 100,p_i \leq 10^9,N \leq 10^{18}, c_i \leq 250$

$$P(x) = (\sum_i x^{p_i})^N, Q(x) = 1 - \sum_i x^{c_i}$$

とおくと、答えは$\sum_i [x^i]P(x)^N \cdot [x^i]\frac{1}{Q(x)}$になる。

ここで$k = \max(c)$とおくと、Fiduccia's algorithmより$[x^i]\frac{1}{Q(x)}$は$x^i \mod \mathrm{rev}(Q)$の係数と$[x^i]\frac{1}{Q(x)},i \lt k$の内積で表されるとわかるので、$P(x)^N \mod \mathrm{rev}(Q)$を計算すれば容易に答えが求まる。

- 初めは以下のように解いたが答えが合わない、どこか間違えているらしい…たぶんテイラー級数とローラン級数を雑に掛けているのが問題？ TODO: Editorialを読む
> (P,Qの定義までは同じ。)これを計算できる形に変えるために$Q$に$x\leftarrow \frac{1}{x}$を代入すると
> $$\sum_i [x^i]P(x)^N \cdot \lbrack x^{-i}\rbrack \frac{1}{Q(x^{-1})} = [x^0]\frac{P(x)^N}{Q(x^{-1})} $$
> 
> $k = \max(c)$とおくと
> $$= [x^0] \frac{x^k P(x)^N}{\mathrm{rev}(Q)}$$
> 
> と変形出来て、上式はFiduccia's algorithmで計算できる。

#### [UOJ0424 count](https://uoj.ac/problem/424?locale=en)

> 長さが$N$であり、$1$以上$M$以下の整数から構成されて、かつ$1$から$M$までの全ての整数が数列内に登場する数列を良い数列と呼ぶ。
>
> 良い数列$a$に対して、$f_a(l,r)$を$a$の$l$番目から$r$番目の整数のうち最大値の添え字とする。(最大値が複数ある場合は最小の添え字を取る。)
>
> 二つの良い数列$a,b$に対して、任意の$1 \leq i \leq j \leq N$において$f_a(i,j) = f_b(i,j)$が成り立つ時、が$a$と$b$が同型であると言う。
>
> $N$と$M$が与えられるので、同型でない数列がいくつかあるかを数え上げて$998244353$で割った余りを求めよ。
> $M \leq N \leq 10^6$

この問題は包除原理を使えば見通しよく解くことが出来るが(鏡像法)、冪級数を用いた解法を紹介する。[参考(解法1)](https://www.cnblogs.com/Mr-Spade/p/10215081.html)　[参考(解法2)](https://www.luogu.com.cn/blog/EntropyIncreaser/sheng-cheng-han-shuo-di-bai-gei)

Cartesian Treeを考えることでこの問題は特定の条件を満たす頂点数$N$の二分木の数え上げに帰着する。
構築されたCartesian Treeは左の子は自分より小さく、右の子は自分以下になる。よって$M$以下の整数という条件を満たす二分木は
$\mathrm{len}(x) :=${頂点$x$から開始して左の子へ移動することを繰り返す時の操作回数}としたとき、$\max(\mathrm{len}(x))\lt M$という性質を持つ。


$d_{i,j}:=${$\max(\mathrm{len}(x))\lt i$、頂点数$j$の場合の数}とする愚直DPを考えると

$$d_{1,j} = 1, d_{i,j} = \sum_{k=0}^{i-1}d_{i-1,k}d_{i,j-1-k}$$

となる。ここから通常型母関数$F_i = \sum_j d_{i,j} x^j$を考えると

$$F_1 = \frac{1}{1-x},  F_i = \frac{1}{1-F_{i-1}x}$$

という漸化式を得る。

##### 解法1 通常型母関数

$$F_i(x) = \frac{P_i(x)}{Q_i(x)}$$

とおくと$\frac{P_i}{Q_i} = \frac{Q_{i-1}}{Q_{i-1}-P_{i-1}x}$となり、行列表示すると

$$
  \left(
    \begin{array}{cc}
      0 & 1 \newline
     -x & 1 
    \end{array}
  \right)
  \left(
    \begin{array}{cc}
      P_{i-1}  \newline
      Q_{i-1}  
    \end{array}
  \right)
  = \left(
    \begin{array}{cc}
      P_i  \newline
      Q_i
    \end{array}
  \right)
$$
より
$$
\left(
    \begin{array}{cc}
      P_i   \newline
      Q_i
    \end{array}
  \right)=
  \left(
    \begin{array}{cc}
      0 & 1  \newline
     -x & 1 
    \end{array}
  \right)^{i}
  \left(
    \begin{array}{cc}
      1   \newline
      1
    \end{array}
  \right)
$$
が従う。

ここから特性方程式を立てて特性解を求めて愚直に計算しても解けるが(解法2を参照のこと)、式が非常に煩雑で計算・実装ともに厳しすぎる。

そこで上の式の行列累乗を計算することを考える。愚直に計算すると定数倍が重いので、実装の工夫として$P,Q$をNTTした$\mathcal{F}(P),\mathcal{F}(Q)$を求める。$\mathcal{F}(P),\mathcal{F}(Q)$の$n$次の係数は$P,Q$に$x=g^n$を代入したものなので($g$は原始根)、$\mathrm{O}(N)$回の行列累乗で$\mathcal{F}(P),\mathcal{F}(Q)$が求まる。あとは得られた数列をIDFTしたものが答えになる。(このテクニックは多項式補間を$\log$1個で行う手法として知られている。)

計算量は全体で$\mathrm{O}(N \log N)$であり、FFTが$7$回で済む(乗算$\frac{7}{3}$回相当)ので$N=10^6$でも十分高速に動作する。

##### 解法2 ラグランジュの反転公式

$$\lambda = \frac{1+\sqrt{1-4x}}{2}$$

と置くと特性方程式の解を$\lambda,1-\lambda$と表すことが出来る。
$$
  \left(
    \begin{array}{cc}
      0 & 1  \newline
     -x & 1 
    \end{array}
  \right)^{n}=
  \left(
    \begin{array}{cc}
      1 & 1  \newline
     \lambda & 1-\lambda 
    \end{array}
  \right)^{-1}
  \left(
    \begin{array}{cc}
      \lambda & 0 \newline
     0 & 1 - \lambda 
    \end{array}
  \right)^{n}
  \left(
    \begin{array}{cc}
      1 & 1  \newline
     \lambda & 1-\lambda 
    \end{array}
  \right)
$$
を用いて
$$
\left(
    \begin{array}{cc}
      P_n  \newline
      Q_n
    \end{array}
  \right)= \frac{1}{1-2\lambda}
   \left(
    \begin{array}{c}
      2(1-\lambda) \lambda^n -(1-\lambda)^n \newline
     (1-\lambda)^n - 2\lambda^{n+1}
    \end{array}
  \right)
$$
から
$$
F_k=\frac{(1-\lambda)^{k+1}-\lambda^{k+1}}{(1-\lambda)^{k+2}-\lambda^{k+2}}
$$
を得る。(fps-sqrtを利用すればこの式を$x$の式に変形して答えを求めることも出来るが、極めて定数倍が重い。)

この式はラグランジュの反転公式を$H=F_n,\phi(\lambda)=\frac{1}{1-\lambda}$としたものとしてみることが出来る。よって

$$[x^n]F_k(x) = \frac{1}{n}\lbrack\lambda^{n-1}\rbrack\left(\frac{(1-\lambda)^{k+1}-\lambda^{k+1}}{(1-\lambda)^{k+2}-\lambda^{k+2}}\right)' \left(\frac{1}{1-\lambda}\right)^n$$

となり、右辺を変形すると

$$Q(\lambda)=(-\lambda^{2 (k + 1)} + (k + 1) (2 \lambda - 1) ((1-\lambda) \lambda)^k + (1 - \lambda)^{2 (k + 1)})$$

とおいて

$$\lbrack\lambda^{n-1}\rbrack\frac{Q(\lambda)}{(1-\lambda^{k+2}/(1-\lambda)^{k+2})^2} \frac{1}{(1-\lambda)^{n+2k+4}}$$

$$=\lbrack\lambda^{n-1}\rbrack\frac{Q(\lambda)}{(1-\lambda)^{n+2k+4}}\left(1+\sum_{i=1}^{\infty}\left(\frac{\lambda}{1-\lambda}\right)^{i(k+2)}\right)$$

となり、$\lambda$と$1-\lambda$の積からなる$\mathrm{O}(\frac{N}{k})$項の和で表せたので$\mathrm{O}(\frac{N}{k})$で計算することが出来る。

#### [yukicoder No.963 門松列列(2)](https://yukicoder.me/problems/no/963)

> 長さ$N$の交代順列の個数を求めよ。

長さ$N$の交代順列のうち不等号の順番が<><><><>...となるものの個数を$dp _ N$と置いてDP遷移を考える。(便宜上$dp _ 0 = 1$とおく。)
$n$を左から$i+1(0 \leq i < n)$個目に置いたときの全ての交代順列の個数は($n-1$個から左に置く$i$個を選ぶ)$\cdot$(左の$i$個が交代順列)$\cdot$(右の$n-i-1$個が交代順列)なので
$$\binom{n-1}{i} dp _ i dp _ {n-i-1} \cdot \frac{1}{2}$$
となる。
(<><><><>...である順列と><><><><...である順列の個数が同じことを利用して立式している。また、最後に2で割るのは、長さ$N$の交代順列のうち半分は不等式の順番が><><><...だから。)
よって次の漸化式が成り立つ。
$$dp _ n =\sum_{0\leq i\lt n}\left(\frac{1}{2}\binom{N-1}{i} dp _ i dp _ {n-i-1}\right),dp _ 0 = 1$$
$dp_i$のEGFを$F$とおくと
$$[x^n]F(x) = \lbrack x^{n-1}\rbrack \frac{F^2}{2}(n>1),[x^0]F(x)=1$$
になるので、
$$F = 1 + \int\frac{F^2}{2} dx $$
を得る。両辺を微分して微分方程式を解くと
$$F = \frac{1 + \sin x}{\cos x}$$
を得る。

#### [yukicoder No.1145 Sums of Powers](https://yukicoder.me/problems/no/1145)

> 数列$a_0,...a_{N-1}$が与えられる。
> $n=0$から$n=M$に対して$\sum_i a_i^k \bmod 998244353$を計算せよ。
> $N,M \leq 10^5, 0 \leq a_i \lt 998244353$

どうやら様々な解法がある問題のようで、[Editorial](https://yukicoder.me/problems/no/1145/editorial)でいくつかの解法が紹介されている。さらに、LOJ#2409にも同じ問題があるらしく、検索するとEditorialに載っていない解法が出てくる。[(参考)](https://blog.trisolaris.top/%E3%80%8Cthupc2017%E3%80%8Dsum/#more) いずれの解法も計算量は$\mathrm{O}((M + N) \log^2 (M + N))$であるようだ。

その上、どうやら僕のコンテスト中の解法も微妙に違うのでここに記しておく。(本質は中国ブログの解法と同じだが…)

$F(x) = \sum_i (1-a_ix)^{-1}$が答えのOGFなので$F$の先頭$M+1$項を計算すればよい。ここで$G(x)=\prod_i (1-a_ix)$とおくと、

$$\frac{xG'(x)}{G(x)} = \frac{x \left(\sum_j -a_j \prod_{i\neq j}(1-a_ix)\right)}{G(x)}$$

$$= \sum_j \frac{-a_jx}{1-a_jx} = n - F(x)$$

を得る。よって

$$F(x) = n-\frac{xG'(x)}{G(x)}$$

が答えとなる。

#### [CF 755G](https://codeforces.com/contest/755/problem/G)

> $1$から$n$までの数字が書かれた$n$個のボールから$m$個のグループを作る。各グループは1個のボール、または連続する2個の数字が書かれたボールから構成される。
> $n,k$が与えられる。$1\leq m\leq k$に対して条件を満たす組み合わせは何通りか？
>
> $n \leq 10^9, k \leq 2^{15}$

答えである$a_{n,m}$の母関数$f_n$は

$$f_{n+2}=f_{n+1}(x+1)+f_nx$$

という関係式が成り立つ。この式は

$$
\left(
  \begin{array}{c}
  f_{n+2} \newline
  f_{n+1}
  \end{array}
\right) =
\left(
  \begin{array}{cc}
  x+1 & x \newline
  1 & 0
  \end{array}
\right)
\left(
  \begin{array}{c}
  f_{n+1} \newline
  f_{n}
  \end{array}
\right)
$$

と変形すれば行列累乗の問題に持ち込めるので$\mathrm{O}(k \log k \log n)$でこの問題を解ける。(行列累乗の際に適宜$\mod x^{k+1}$を取る必要があるのに注意すること。)

#### [CF 438E](https://codeforces.com/contest/438/problem/E)

> $n,m$と$c_1,\ldots,c_n$が与えられるので、$c$に含まれる数をノードに書き込んだ根付き二分木を作ることを考える。$1\leq s\leq m$について、ノードに書かれた数字の和が$s$であるような二分木の個数は？
>
> $n,m \leq 10^5$

Editorialがfps-inv,fps-sqrtの解説としてしばしば引用されることで有名な問題。

$i$番目の答えを$f_i$とおくと、漸化式として

$$f_0 = 1, f_i = \sum_{r \in c}\sum_i f_i f_{s-i-r}$$

を得る。$f_i$の母関数を$F(x)$とおき、$C(x) = \sum_i c_ix^i$とすると

$$F(x) = C(x) F^2(x) + 1 \rightarrow F(x) = \frac{1-\sqrt{1-4C(x)}}{2C(x)}$$

を得るのでfps-sqrt, fps-invを利用すればこの問題を解くことが出来る。(上の形だと$C(x) \equiv 0 \pmod x$になってしまうので、計算の際は分子の有理化などの処理が必要である。)

#### [LOJ575 不等関係](https://loj.ac/p/575)

> 整数$N$と`<`と`>`からなる長さ$N-1$の文字列$S$が与えられる。次の条件を満たす長さ$N$の順列$p_1,p_2,\ldots,p_n$は何通りあるか？
> - $S_i$が`<`のときは$p_i\lt p_{i+1}$であり、$S_i$が`>`のときは$p_i\gt p_{i+1}$である。
>
> $N \leq 10^5, \mod 998244353$

$dp_{i,j}$:=左から順に$i$番目の数字まで決めた時、$i$番目の数が今までで$j$番目に大きい場合の数、とすると$\mathrm{O}(N^2)$で解ける。

高速化のために見方を変えて、連続する`<`の列を1つの区間として見て、`>`に対する包除原理を行う。
- 例えば$S=$`>><><`の時は、|`>>?>?`| - |`>>>>?`| - |`>>?>>`| + |`>>>>>`| $=\frac{6!}{3!2!1!}-\frac{6!}{5!1!}-\frac{6!}{3!3!} + \frac{6!}{6!} = 60-6-20+1=35$になる。

便宜上$S_0=S_{N}=$`<`とおき、$S[0,i]$間の`<`の個数を$c_i$とおくと

$$f_0 = 1, f_i = [(S_i\ \ \mathrm{is}\ \lt)]\sum_{j=0}^{i-1}f_j(-1)^{c_{i-1}-c_j} \frac{1}{(i-j)!}$$

という漸化式が立ち、答えは$N!f_N$である。この式は分割統治FFT(オンラインFFT)で$\mathrm{O}(N \log^2 N)$で計算できる。

AtCoderに$N\lt 3000$のジャッジがあるので中国OJのアカウントがなくてもAC確認が出来る。
- [EDPC T Permutation](https://atcoder.jp/contests/dp/tasks/dp_t)　[提出](https://atcoder.jp/contests/dp/submissions/20426492)

#### $\deg(f)$が小さいときの$f(x)^k \mod x^n$

> $\deg(f)$が定数と見なせるとき、
>  1. $f(x)^k \mod x^n$を$\mathrm{O}(n)$で求めよ。
>  2. $[x^n] f(x)^k$を$\mathrm{\tilde{O}}(\sqrt{n})$で求めよ。

$g(x) := f(x)^k$とおく。両辺を微分して$f$を掛けると次式を得る。

$$fg' = k f' g$$

両辺の係数を比較すると、$a$次の係数は

$$\sum_{i=0}^{a}(a-i+1) f_i g_{a-i+1} = k \sum_{i=0}^a (i+1)f_{i+1} g_{a-i}$$

になる。ここで$d := \deg(f)$とおくと、$d < i$のとき$f_i=0$なので、

$$\sum_{i=0}^{d}(a-i+1)f_i g_{a-i+1} = k \sum_{i=0}^{d-1} (i+1)f_{i+1}g_{a-i}$$

になり、上式を整理すると$a\geq 0$に対して以下の漸化式を得る。

$$g_{a} = \frac{\sum_{i=1}^{d} f_{i}((k+1)i-a)g_{a-i}}{af_0}$$

この式に初項$g_0 = f_0^k$を代入して漸化式を前から計算していけばよく、逆元の前計算を利用すれば$g_0,g_1,\ldots, g_n$を高速に列挙出来る。

さらに、上式は数列$(g_i)$が多項式係数を持つ線形漸化式で表せることを意味している。よって$g_n$はmin25氏によるp-recursiveを復元するアルゴリズムで高速に復元できる。

追記:[この記事の3問目](https://codeforces.com/blog/Retired_MiFaFaOvO)に同じ問題が取り上げられている。

##### 実装例(自分用)

```cpp
vm fast_pow(const vm &f, long long k, int n) {
  if (f.size() == 0 or n == 0) return vm(n, mint(0));
  int d = f.size() - 1;
  vm g(n);
  g[0] = f[0].pow(k);
  mint denom = f[0].inverse();
  k %= mint::get_mod();
  for (int a = 1; a < n; a++) {
    int ie = min(a, d);
    for (int i = 1; i <= ie; i++) {
      g[a] += f[i] * g[a - i] * ((k + 1) * i - a);
    }
    g[a] *= denom * C.inv(a);
  }
  return g;
}
```

#### [CF 773F](https://codeforces.com/problemset/problem/773/F)

> 問題の本質部分：
> $$\sum_{0 \leq i \lt m} \sum_{0 \leq j \leq n}\binom{2i}{2j}$$ を任意modで計算せよ。
> $n \leq 30000, m \leq 10^9$

式を母関数で表すと

$$\sum_{i,j} \lbrack x^{2j} \rbrack (1+x)^{2i}$$

と書いてあるのがわかるので$\sum_i (1+x)^{2i} \bmod{x^n}$を二分累乗法で計算すると$\mathrm{O}(n \log n \log m)$で解ける。

(任意modじゃないと(=逆元ありだと)もっと高速に解けるのか？を少し考えたがわからなかった…)
