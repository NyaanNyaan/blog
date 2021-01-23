---
title: "Combinatorics"
date: 2020-11-14T19:46:18+09:00
draft: false
---

#### min-max包除

- 集合$S = \lbrace a_1,\ldots,a_n \rbrace$に対して
$$\max(S) = \sum_{\phi \neq T \subseteq S}(-1)^{|T|+1}\min(T)$$
が成り立つ

  - 証明は$i\neq 0$について
  $$\sum_{j=0}^i (-1)^j \ _i C_j=0$$
  が成り立つことから示せる

- この事実を期待値の計算に応用できないか？
- $1$から$n$からなる集合を$[n]$と表す。確率変数$X_1 \ldots X_n$について
$$E[\max_{i \subseteq [n]} X_i] = \sum_{\phi \neq S \subseteq [n]}(-1)^{|S|+1} E[\min_{i \in S}X_i]$$
  - 期待値の線形性から従う

- [中国ブログ](https://www.cnblogs.com/Mr-Spade/p/9636968.html)

