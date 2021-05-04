---
title: "Binomial Coefficient"
date: 2021-04-29T22:43:29+09:00
draft: true
---

先日、Library Checkerに$\binom{n}{k} \pmod m$を任意modで計算する問題を送り無事mergeされた。
[Binomial Coefficient](https://judge.yosupo.jp/problem/binomial_coefficient) 

この問題では制約は$N \leq 10^{18}, M \leq 10^{6}, Q \leq 2\times 10^5$にしてあるが、その後の調査により$N \leq 10^{18}, M \leq 10^{9}$でもC++で十分高速に計算できることがわかったのでその方法を簡単にメモしておく。

#### $M$が素数,$M \leq 10^6, N \leq 10^{18}$

- アルゴリズム：Lucasの定理
- 計算量：$\mathrm{O}(\min(N,M) + Q \log N)$

#### $M \leq 10^6, N \leq 10^{18}$

#### $M \leq 10^9, N \leq 10^7$

- アルゴリズム：Lucasの定理の素数冪への一般化
- 計算量：$\mathrm{O}(\min(N\omega(M),M) + Q  \omega (M) \log N)$

アルゴリズムの詳細は[ここ](https://nyaannyaan.github.io/library/modulo/arbitrary-mod-binomial.hpp)に詳しく書いた。

#### $M = 998244353, N \leq 10^{18}$

- アルゴリズム：FFTを利用した階乗の多点評価
- 計算量：$\mathrm{O}(\sqrt{MQ \log (NM/Q)})$

適当な幅$D$を取り、$D!,(2D)!,\ldots,(\lfloor M/D \rfloor D)!$を前計算で求めることを考える。

$(\prod_{1\leq i\leq D} a + i), (\prod_{1\leq i\leq D} a + D + i),\ldots, (\prod_{1\leq i\leq D} a + D ^2 + i)$の$D+1$点を$\mathrm{O}(D \log D)$で多点評価出来ることを利用すると、前計算は$\mathrm{O}(M \log D / D)$で計算できる。

クエリはLucasの定理を利用して$\mathrm{O}(Q D \log N)$で処理できるので、全体の計算量は$\mathrm{O}(M \log D / D + Q D \log N)$で、$D=\sqrt{\frac{M \log (M/Q)}{Q \log N}}$を代入して$\mathrm{O}(\sqrt{MQ \log (NM/Q)})$を得る。

#### $M \leq 10^9, N \leq 10^{18}, M$が素数

- アルゴリズム：前計算の並列化・ベクトル化
- 計算量：$\mathrm{O}(\frac{M}{w}+Q \log N)$

モンゴメリ乗算を利用してベクトル化を効かせるとおよそ$w=16$個の乗算+剰余算を並列に計算できるので、前計算を$\mathrm{O}(\frac{M}{w})$で行う高速化が可能であり、$M \leq 10^9$の制約では実用上高速に動作する。

#### $M \leq 10^9, N \leq 10^{18}$

- アルゴリズム：色々
- 計算量：むずかしい



### おまけ：その他のアルゴリズム

#### $NK \leq 10^7$

アルゴリズム：DP
計算量：$\mathrm{O}(NK + Q)$

#### $M$が素数$,M \leq 10^9, N \leq 10^7, N \lt M$

アルゴリズム：階乗・階乗の逆元の前計算
計算量：$\mathrm{O}(N + Q)$

#### $K \leq 1000, M \leq 10^{18},N \leq 10^{18},N$が固定

- アルゴリズム：行列累乗
- 計算量：$\mathrm{O}(K^2 \log N)$

次の行列を利用する。

$$\begin{pmatrix} 
  \binom{n}{k} \\ 
  \binom{n}{k-1} \\ 
  \binom{n}{k-2} \\ 
  \vdots \\ 
  \binom{n}{0} 
\end{pmatrix} = 
\begin{pmatrix} 
  1 & 0 & 0 & \cdots & 0 & 0 \\ 
  1 & 1 & 0 & \cdots & 0 & 0 \\ 
  0 & 1 & 1 & \cdots & 0 & 0 \\ 
  \vdots & \vdots & \ddots & \vdots & \vdots & \vdots \\
  0 & 0 & 0 & \cdots & 1 & 1
\end{pmatrix}^n 
\begin{pmatrix} 
  \binom{0}{k} \\ 
  \binom{0}{k-1} \\ 
  \binom{0}{k-2} \\ 
  \vdots \\ 
  \binom{0}{0} 
\end{pmatrix}
$$

#### $M=998244353$,$K \leq 10^5, N \leq 10^{18}, K \leq M$, $K$が一定

アルゴリズム：多点評価
計算量：$\mathrm{O}( Q \log^2 K )$

#### $M=998244353,K \leq 10^5, N \leq 10^{18}$

アルゴリズム：多点評価+Segment Tree
計算量：$\mathrm{O}((K+Q) \log^3 K)$
