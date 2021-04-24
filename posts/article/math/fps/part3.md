---
title: "Part3"
date: 2021-04-22T17:59:34+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [スターリング数・下降冪 関連](#スターリング数下降冪-関連)
  - [第1種スターリング数](#第1種スターリング数)
    - [公式集](#公式集)
    - [組合せ的解釈](#組合せ的解釈)
  - [第2種スターリング数](#第2種スターリング数)
    - [公式集](#公式集-1)
    - [組合せ的解釈とベル数](#組合せ的解釈とベル数)
  - [(典型) 第2種スターリング数の$n$列目](#典型-第2種スターリング数のn列目)
  - [(典型) コイン投げの回数の$k$乗の期待値](#典型-コイン投げの回数のk乗の期待値)
  - [CF 1278F](#cf-1278fhttpscodeforcescomcontest1278problemf)
  - [(自作) Newton interpolation](#自作-newton-interpolation)
  - [CF 1516E](#cf-1516ehttpscodeforcescomcontest1516probleme)

<!-- /code_chunk_output -->

### スターリング数・下降冪 関連

知っている性質・問題をまとめておく。

#### 第1種スターリング数

##### 公式集

$$x^{\overline{n}} = \sum_{k=0}^n {n \brack k} x^k$$

$$\sum_{k=0}^n {n \brack k} = n!$$

$$\sum_{k=0}^n {n \brack k} x^k = x^{\overline{n}}$$

漸化式 

$${n \brack k} = (n-1){n - 1 \brack k} + {n - 1 \brack k - 1}$$

$${0 \brack 0} = 1, {n \brack 0} = {0 \brack n} = 0$$

${n \brack m}$を二項係数や累乗の和で表した閉じた公式は存在しないようだ。

##### 組合せ的解釈

${n \brack k}$は$n$個の要素を$k$個の巡回列に分ける場合の数を意味する。

証明は漸化式の形が同じであることから従う。$n-1$個の要素からなる巡回列の集合に要素$n$を追加して$k$個のグループを作ることを考えると、$n$が新たなグループを作るのが${n-1 \brack k-1}$通り、$n$を既存のグループに入れるのが$(n-1) {n-1 \brack k}$通りなので${n \brack k} = (n-1){n - 1 \brack k} + {n - 1 \brack k - 1}$という式を得る。


#### 第2種スターリング数

##### 公式集

$${n \brace k} = \frac{1}{k!}\sum_{i=0^k}(-1)^i \binom{k}{i} (k-i)^n $$

$$x^n=\sum_{k=0}^n {n \brace k}x^{\underline{k}}$$

漸化式

$${n \brace k} = {n - 1 \brace k - 1} + k {n-1 \brace k}$$

$${0 \brace 0} = 1, {n \brace 0} = {0 \brace n} = 0$$

##### 組合せ的解釈とベル数

${n \brace k}$は「$n$個の要素を$k$個のグループに分割する場合の数」に対応している。

証明は漸化式の形が同じであることから従う。$n-1$個の要素からなるグループの集合に要素$n$を追加して$k$個のグループを作ることを考えると、$n$が新たなグループを作るのが${n-1 \brace k-1}$通り、$n$を既存のグループに入れるのが$k {n-1 \brace k}$通りなので${n \brace k} = {n - 1 \brace k - 1} + k {n-1 \brace k}$という式を得る。

また、$n$要素をいくつかのグループに分割する場合の数をBell numberと呼ぶ。これは第二種スターリング数を用いて

$$B_n = \sum_{k=0}{n \brace k}$$

で計算できる。また、$n$要素を区別可能なグループに分割する場合の数をordered Bell numberと呼ぶが、こちらも同様に

$$a_n = \sum_{k=0}k!{n \brace k}$$

で計算できる。

#### (典型) 第2種スターリング数の$n$列目

> ${n \brace 0},{n \brace 1},\ldots,{n \brace n}$を$\mathrm{O}(n \log n)$で求めよ。

公式

$$m^n=\sum_{k=0}^n {n \brace k}m^{\underline{k}}$$

を

$$\mathrm{EGF}(m^{\underline{k}})=\sum_{i=n}^\infty \frac{i^{\underline{k}}}{i!}m^i=x^ke^x$$

利用して変形すると、

$$\sum_{i=0}^\infty \frac{i^n}{i!}x^i=e^x\sum_k {n \brace k}x^k$$

となるので、第2種スターリング数の母関数は

$$\sum_k  {n \brace k} x^k=e^{-x}\sum_{i=0}^\infty \frac{i^n}{i!}x^i$$

から計算できる。

#### (典型) コイン投げの回数の$k$乗の期待値

> $p$の確率で表が出るコインが与えられる。$X$が表になるまで投げる回数を$T$とするとき、$E[T^k]$を求めよ。

期待値の線形性より

$$E[x^k] = \sum_{i=0}^k {k \brace i} E[x^{\underline i}] $$

であるから$E\lbrack x^{\underline{k}} \rbrack$が計算できれば良い。$k\gt 1$のとき

$$ f_k := E\lbrack x^{\underline{k}}\rbrack = \sum_{x=0}^\infty (x+1)^{\underline{k}} (1-p)^x p $$

$$= k! \sum_{x=0}^\infty \binom{x+1}{k}(1-p)^x p$$

$$= k! \sum_{x=0}^\infty \left\lbrace\binom{x}{k}+\binom{x}{k-1}\right\rbrace(1-p)^x p$$

$$= (1-p) ( f_k + k f_{k-1}) \iff f_k = \frac{k(1-p)}{p} f_{k-1}$$

を得るので、$f_0=1,f_1=\frac{1}{p}$と合わせて解を得られた。

(モーメント母関数テクニックを使った方が見通しがよさそう…)

#### [CF 1278F](https://codeforces.com/contest/1278/problem/F)

> $p$の確率で表が出るコインを$N$回投げる。表が出た回数を$T$とするとき、$E[T^k]$を求めよ。
>
> $n \lt 998244353, k \lt 5000$

読みづらいが前のブログにいくつかの解法を書いた。[記事](https://nyaan.hatenablog.com/entry/2019/12/21/171210)

モーメント母関数を利用すると$[t^k](pe^t + 1 - p)^n$が答えだとわかるので$\mathrm{O}(k \log k)$で速やかに解けるが、ここでは$\mathrm{O}(k)$解法を考えたい。

表が$x$回出る確率を$f_x$として母関数$F(t)$を

$$F(t) = \sum_{x=0}^n f_x t^x$$

とおくと、

$$F^{(k)}(1) = \sum_{x=k}^n f_x x^{\underline{k}} = E[x^{\underline{k}}]$$

になることを利用する。この問題では$F(t)$は二項分布の母関数なので

$$F(t) = (pt + 1 - p) ^ n$$

となるから、

$$E[x^{\underline{k}}] = n^{\underline{k}} p^k$$

を得られる。よってスターリング数の公式より

$$E\lbrack x^k \rbrack = \sum_{i=0}^k {k \brace i} n^{\underline{i}} p^i$$

が答えだとわかる。この式を展開すると

$$\sum_{j=0}^k \frac{1}{j!} \sum_{i=0}^{j}(-1)^{j-i} \binom{j}{i} i^k j! \binom{n}{j} p^j$$

$$ = \sum_{i=0}^k i^k \binom{n}{i} p^i \left( \sum_{j=0}^{k-i} (-1)^j \binom{n-i}{j} p^j \right)$$

と変形出来て、かっこ内部は格子上の問題に言い換えると全体を$\mathrm{O}(k)$で計算できる。($n$と$k$の大小で場合分けが必要で少し面倒だが。)よってこの問題を$\mathrm{O}(k)$で解くことが出来た。

なお、$n \gg p$の時はポアソン分布と呼ばれる分布になり、

$$E\lbrack x^k \rbrack = \sum_{i=0}^k {k \brace i} (np)^i $$

を得る。(ポアソン分布の$n$次のモーメント)

#### (自作) Newton interpolation

> $k$次多項式$f(n)$を$n=0,1,\ldots,k$で評価した値$f(0),f(1),\ldots,f(k)$が与えられる。
> 
> $$ f(n) = \sum_{i=0}^k p_i n^{\underline{i}}$$
>
> を満たす$p_0,\ldots,p_k$を求めよ。
> 
> $n \leq 10^6$

上式の両辺の通常型母関数を考えると、

$$\mathrm{(LHS)} = \sum_{i=0}^\infty f(i)x^i$$

$$\mathrm{(RHS)}= \sum_{n=0}^\infty \sum_{i=0}^k  p_i n^{\underline{i}}x^n = \sum_{i=0}^k  p_i \sum_{n=0}^\infty n^{\underline{i}} x^n$$

である。ここで$n^{\underline{i}}$の部分は

$$\sum_{n=0}^\infty n^{\underline{i}} x^n = \sum_{n=i}^\infty \frac{n!}{(n-i)!} x^n $$

$$= \sum_{n=0}^\infty \binom{n+i}{i} i! x^{n+i} = \frac{i! x^i}{(1-x)^{i+1}}$$

と変換できるので、

$$\mathrm{(RHS)} = \sum_{i=0}^k \frac{p_i i! x^i}{(1-x)^{i+1}}$$

と表すことが出来る。次に、

$$\mathrm{EGF}\left([x^n]\frac{i!x^k}{(1-x)^{i+1}}\right)=\sum_{n=0}^\infty\binom{n+i}{i}\frac{i!x^{n+i}}{(n+i)!}$$

$$=x^i \sum_{n=0}^\infty \frac{x^n}{n!}=x^i e^x$$

を利用すると、

$$\mathrm{EGF}(f(n)) = \sum_{i=0}^k \mathrm{EGF}\left( [x^n] \frac{p_i i! x^i}{(1-x)^{i+1}} \right)$$

$$ = \sum_{i=0}^k p_k x^k e^x = e^x \mathrm{OGF}(p_n)$$

と変形できる。よって

$$p_i = [x^i] \left(\mathrm{EGF}(f(n)) e^{-x} \right)$$

から$p$を高速に列挙できる。

> 追記：後で気づいたが、ここまで回りくどいことをしなくても右辺を展開すれば容易に2重シグマからFFTに持ち込める。

この問題は$f(0),f(1),\ldots,f(k)$から元の関数を復元するアルゴリズムについて考察したときに得られたものである。ここから$f(0),f(1),\ldots,f(k)$に対する$\mathrm{o}(k \log^2 k)$の多項式補間が出来ないか考えたり調べたりしたが、ニュートン基底と単項式基底の変換は$\mathrm{O}(k \log^2 k)$が限界のようだ…残念。(スターリング行列の乗算周りを色々漁ったが無理そうだった。) [引っ掛かった論文](https://core.ac.uk/download/pdf/82336238.pdf)

#### [CF 1516E](https://codeforces.com/contest/1516/problem/E)

> $1$から$N$からなる長さ$N$の順列が与えられる。$1 \leq j \leq K$について、$j$回のswapで得られる順列の場合の数は？
> 
> $N \leq 10^9, K \leq 200$

$\mathrm{O}(K \log K)$解法を説明する。

この解法は第一種Stirling数${n \brack k}$を用いる。${n \brack k}$は$n$個の要素を$k$個の巡回列に分割する場合の数である。巡回列の集合と順列を適切に一対一対応させると、$n$個の要素からなる$k$個の巡回列に対応する順列は$n-k+2i$回のswapによって可能であるから、${N \brack N-k},{N \brack N-k+1},\ldots,{N \brack N}$が計算できればこの問題を解けるとわかる。

$$\sum_{0 \leq i \leq N} {N \brack i} x^i = \prod_{0 \leq i \lt N}(x+i)$$

であるから

$$\sum_{0 \leq i \leq N} {N \brack N - i} x^i = \prod_{1 \leq i \lt N-1}(ix+1)$$

を$\mod x^{K+1}$で計算すればこの問題を解けるとわかる。この式を$\exp(\log(f))$を経由する方針で計算する。

$$ \log\left( \prod_{1 \leq i \lt N-1}(ix+1) \right) = \sum_i \log(ix + 1)$$

$$ = \sum_i \left(\sum_{k=1}^\infty \frac{(-1)^{k+1}(ix)^k}{k!}\right) $$

$$= \sum_{k=1}^\infty \frac{(-1)^{k+1}x^k}{k!} \left( \sum_{1 \leq i \lt N-1} i^k \right)$$

であるから、$k = 1$から$k=K$に対して$k$乗和$S_k(n) = \sum_{1 \leq i \leq n} i ^ k$が計算出来ればよい。関・ベルヌーイの冪和公式より$S_k(n)$はベルヌーイ数$B_j$を用いて

$$\frac{S_k(n)}{k!} = \sum_{j=0}^k \frac{B_j}{j!} \cdot \frac{n^{k-j+1}}{(k-j+1)!}$$

と表せて、ベルヌーイ数は

$$\sum_{j} \frac{B_j}{j!}x^j = \frac{xe^x}{e^x-1}$$

と表せるのでFFTにより$S_k(n)$を$\mathrm{O}(k \log k)$で計算できる。以上よりこの問題を準線形で解くことが出来た。

> 追記: Codeforcesのコメントで気づいたが、$S_k(n)$の部分は公式を使わずとも
> 
> $$\sum_{k=1}^{n-1} e^{kx} = \frac{e^{nx}-1}{e^x-1}-1$$
> 
> から導出することが出来る。

[提出](https://codeforces.com/contest/1516/submission/113863894)　思いついたときは初出か？と思ったが、すでに何人か中国勢が同じ解法で提出していた…

$k$乗和周りの問題は似たような問題が多くてかなり混乱するのでまとめておく。

1. $k=1,\ldots,m$について$\sum_{1 \leq i \leq n} i^k$を計算する
  - 上記の解法
  - $\mathrm{O}(m \log m)$

2. $k=1,\ldots,m$と数列$(a_n)$について$\sum_{1 \leq i \leq n} a_i i^k$を計算する
  - $A(x) = \sum_i a_i x^i$に$x=e^t$を代入
  - $\mathrm{O}((n+m) \log^2 (n+m))$

3. $k=1,\ldots,m$と数列$(a_n)$について$\sum_{1 \leq i \leq n} {a_n}^k$を計算する
  - $\log(1-a_n x)=\sum_{k=1}^\infty \frac{a_n^k}{k!} x^k$を利用
  - $\mathrm{O}((n+m) \log^2 (n+m))$

また、スターリング数関連の計算量は[EntropyIncreaser先生のブログ](https://www.luogu.com.cn/blog/EntropyIncreaser/ying-ye-ri-zhi-20201225-qiu-si-te-lin-shuo-di-yi-suo-ji-ta-fu-za-du)に詳しく載っている。
