---
title: "Part3"
date: 2021-04-22T17:59:34+09:00
draft: true
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [問題集(2)](#問題集2)
    - [CF 1516E](#cf-1516ehttpscodeforcescomcontest1516probleme)
    - [(自作) Newton interpolation](#自作-newton-interpolation)

<!-- /code_chunk_output -->

## 問題集(2)

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

この問題は$f(0),f(1),\ldots,f(k)$から元の関数を復元するアルゴリズムについて考察したときに得られたものである。ここから$f(0),f(1),\ldots,f(k)$に対する$\mathrm{o}(k \log^2 k)$の多項式補間が出来ないか考えたり調べたりしたが、ニュートン基底と単項式基底の変換は$\mathrm{O}(k \log^2 k)$が限界のようだ…残念。(スターリング行列の乗算周りを色々漁ったが無理そうだった。) [引っ掛かった論文](https://core.ac.uk/download/pdf/82336238.pdf)

