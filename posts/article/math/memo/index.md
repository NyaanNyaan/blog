---
title: "形式的冪級数"
date: 2020-02-19T00:00:00+09:00
draft: true
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [EGF記事の解読メモ](#egf記事https37zigencomexponential-generating-functionの解読メモ)
    - [基本](#基本)
      - [種](#種)
      - [畳み込み](#畳み込み)
      - [代入](#代入)
      - [根付き種](#根付き種)
    - [例題・演習](#例題演習)

<!-- /code_chunk_output -->


## [EGF記事](https://37zigen.com/exponential-generating-function/)の解読メモ

参考：[37zigenさんの書いた大変充実した内容のEGF記事](https://37zigen.com/exponential-generating-function/)
- 自分の知らない記号が大量に使われていて読み直すたびに何を書いているのかわからなくて困るので、見慣れた式に直してメモ

#### 基本
##### 種
- 集合$X$に対応する集合$\mathcal{A}(X)$がいい性質を満たすと、集合の大きさの母関数$\sum_n \frac{\lvert\mathcal{A}(X)\rvert x^n}{n!}\ \ (|X|=n)$がいい性質を持つね！という話(そういう集合を種と呼ぶ)
  - そのあとに出てくるカリグラフは種の例
- $S = \frac{1}{1-x} \ldots n!$の母関数　置換/順列の種
- $E = e^x \ldots 1$の母関数　集合の種
- $E_k = \frac{x^k}{k!}\ldots [n=k]$の母関数　大きさ$k$の集合の種
- $E_{nonempty} = e^x - 1 \ldots [n\neq 0]$の母関数　空でない集合の種
##### 畳み込み
- いつもの
- $\sum_{s \in X} \lvert \mathcal{A}(s)\times\mathcal{B}(X\setminus s)\rvert$がEGFでの$AB$と対応する
##### 代入
- $\left\lvert \frac{\mathcal{A}^k(X)}{k!}\right\rvert \ldots$$X$を$k$個の集合に(順序無し)分割したものの$\mathcal{A}$への像
- $B(A(x)) = \sum_{k}B_k \frac{A(x)^k}{k!}\ldots$ 
  - 種$\mathcal{A}$の$X$の順序無し分割に対する像を$\mathcal{E}\lbrack\mathcal{A}\rbrack(X)$とおく
  - 順序無し分割への畳み込み$\sum_{s\in \mathcal{E}\lbrack\mathcal{A}\rbrack(X)} |\mathcal{B}(s)|$が代入と一致！
    - ここで$\lvert \mathcal{B}(s) \rvert$は$s$の分割の個数に依存することに注意
  - 注意として、0個への分割を許すと分割が一意に定まらなくなり破滅するため$\mathcal{A}(\phi)=\phi$が必要
    - これはFPSの代入の成立条件$A_0=0$に対応
- $e^{A(x)} = \sum_{k}\frac{A(x)^k}{k!}$
  - 上の例の$B=e^x$版　$e^x$は集合の種なので集合の個数が計算結果になる
  - よって順序なし分割の数え上げを意味する
- $\frac{1}{1-A(x)}= \sum_{k}A(x)^k$ 
  - 順列の種$B=\frac{1}{1-x}$への代入
  - 順序付き分割の数え上げを意味する

##### 根付き種
- 根付き種$\mathcal{A}^\bullet(X)=X\times \mathcal{A}(X)$ ...$A$の重みを$\lvert X \rvert$倍したもの
- 根付き木の根をどれか全部試したいときに使える
- $A^\bullet(x)$と$A(x)$の関係式は
$$A^\bullet(x) = x\frac{d}{dx}A(x)$$
- (わざわざ記号がついているがやっていることは問題を解く分にはほとんど変わらないように思う)

#### 例題・演習
- 問題1
  > N個のラベル付きボールをaの倍数サイズの集合bの倍数サイズの集合cの倍数サイズの集合の 3 つに分ける。ただし a,b,c は互いに異なる。そのような方法は何通りあるか。
  - $f_a = 1 + \frac{1}{a!}x^a+\frac{1}{(2a)!}x^{2a}\ldots$のように置いたとき$f_af_bf_c$が答え
- 問題2
  > N 個のラベル付きボールを K 個の非空なラベルなしグループに分け、そのグループをリストに並べる方法は何通りか。例えば ({a,b},{c}) と ({c},{a,b}) を区別する数え方である。
  - 実家　$(e^x-1)^k$
- 問題3
  > N 個のラベル付きボールを非空なラベルなしグループに分け、そのグループをリストに並べる方法は何通りか。例えば ({a,b},{c}) と ({c},{a,b}) を区別する数え方である。（出典：ordered Bell number）
  - 問題2を$k$に対して累積和を取るだけ　$\frac{1}{1-(e^x-1)}$
- 問題4
  > {1,2,…,N} の順列 {p1,…,pN} のうち任意の i について i≠pi が成り立つ場合の数を求めよ。（出典：攪乱順列）
  - 求める答えを$f(x)$、$g(x)=e^x$とすると$fg=\frac{1}{1-x}$になる (天才？？？)
    - 順列全体のうち$k$個が一致、$n-k$個が不一致とする
    - これを数え上げると$(n,k) f_k$
    - $k$に対してシグマを取ると順列全体$n!$になる
    - EGFを計算すると上の式になる
  - よって$\frac{e^{-x}}{1-x}$が答え
- 問題5
  > {1,2,…,N} の順列 {p1,…,pN} のうちちょうど N−K 個の i について i≠pi が成り立つ場合の数を求めよ。（出典：ARC009 問題C）
  - 問題4の答えを$f$とおくと$\frac{fx^k}{k!}$が答え
- 問題6
  > K 個のラベル付きボールを N 個のラベル付き箱に入れる。全ての箱にボールが入っている入れ方は何通りあるか。
  - 問題2のKとNを入れ替えたもの
  - 求める答えを$f(x)$、$g(x)=e^x$、$h(x)=\sum_i \frac{i^k x^i}{i!}$とすると$fg=h$になる
    - $N$個の箱のうち$k$個にボールが入っている->$f_k (n,k)$
    - シグマを取ってEGFに直すと上の式を得る
- 問題7
  > K 個のラベル付きボールを N 個のラベル付き箱に入れる。ボールの入っていない箱を奇数個にする入れ方は何通りあるか。（出典：yukicoder No.1100）
  - 問題6の答えを$g$、$E_{odd}=\frac{e^x-e^{-x}}{2}$として$f=gE_{odd}$が答え
- 問題8
  > N 個のラベル付きボールをいくつかの a,b,c 元集合に分ける方法は何通りか（a,b,c は互いに異なる）。
  - $f_a = 1 + \frac{1}{a!}x^a+\frac{1}{(2a)!}x^{2a}\ldots$のように置くと、$f_a$は集合の数え上げ
  - よって$e^{f_a}$が順序無し分割への数え上げ
  - 以上より$e^{f_a+f_b+f_c}$が答え
- 問題9
  > N 個のラベル付きボールを非空なラベルなしグループに分ける方法は何通りか。（出典：Bell number）
  - 有名公式。$e^{e^x-1}$
  - $e^x-1\ldots$が「空でない集合」なので、それをexpすると順序無し分割の数え上げになる
    - $[x^0]e^x-1=0$なのでexpしてよい
- 問題10
  > 単純グラフにおけるラベル付き N 頂点サイクルの個数を求めよ。
  - 巡回置換の種$\mathcal{C}$の母関数$C$を考える
    - サイズ$n$の巡回置換の個数は$n-1!$
    - EGFは$C = x+\frac{1}{2}x^2+\frac{1}{3}x^3+\ldots=\int \frac{1}{1-x}dx=\frac{1}{\log(1-x)}$
  - 巡回置換とサイクルの関係は？
    - $n=1,2$のとき…サイクルは存在しない
    - $n\geq 3$のとき…サイクルは巡回置換の半分(反転を同一視)
  - よって$\frac{1}{2}(C-x-\frac{x^2}{2})$が答え

- 問題11
  > ラベル付き N 頂点をすべて使って複数のサイクル（単純グラフ）を生成する個数を求めよ。N 頂点ラベル付き2-正則グラフの個数を求めよと言い換えてもよい。
  - 問題10の答えを$f$として$e^f$が答え
- 問題12
  > N 頂点ラベル付き木の個数を求めよ。（出典：Cayley の定理）
  - $N+1$頂点の根付き木は$N$頂点の根付き森に根を加えたもの
    
  - $\mathcal{T}^\bullet$を根付き木の種として、EGFを求める
    - $T^\bullet_{N+1}=(N+1)\times$($N$要素の順序無し分割に対する根付き森の個数の畳み込み)
    - 式にすると$T^\bullet(x)=x e^{T^\bullet(x)}$
    - x倍することで分母の差から$n$次の項に$n$が掛かっている
  - これをラグランジュの反転公式で解けば$T_N=\frac{T^\bullet_N}{N}=N^{N-1}$を得る。

TODO: 問題13以降
