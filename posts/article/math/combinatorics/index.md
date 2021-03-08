---
title: "Combinatorics"
date: 2021-02-19T17:10:18+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [操作が停止する期待値を求める問題](#操作が停止する期待値を求める問題)
  - [テンプレ](#テンプレ)
  - [マルチンゲールと最適停止定理](#マルチンゲールと最適停止定理)
    - [概要](#概要)
    - [期待値の計算への応用](#期待値の計算への応用)
    - [例題](#例題)
      - [CF 850F](#cf-850fhttpscodeforcescomcontest850problemf)
      - [CF 1025G](#cf-1025ghttpscodeforcescomproblemsetproblem1025g)
      - [CF 1349D](#cf-1349dhttpscodeforcescomproblemsetproblem1349d)
      - [CF 1479E](#cf-1479ehttpscodeforcescomblogentry87598)
  - [母関数を利用する解法](#母関数を利用する解法)
    - [概要](#概要-1)
    - [例題](#例題-1)
      - [AGC038E Gachapon](#agc038e-gachaponhttpsatcoderjpcontestsagc038tasksagc038_e)
      - [CF 1477F](#cf-1477fhttpscodeforcescomcontest1477problemf)
      - [luogu4707　重返現世](#luogu4707-重返現世httpswwwluogucomcnproblemp4707)
- [包除原理](#包除原理)
  - [min-max包除](#min-max包除)
    - [概要](#概要-2)
    - [kth Maxのminmax包除](#kth-maxのminmax包除)
    - [例題](#例題-2)
      - [51nod 1355 フィボナッチ的最小公倍数](#51nod-1355-フィボナッチ的最小公倍数httpwww51nodcomchallengeproblemhtmlproblemid1355)
      - [bzoj4833 最小公倍ペル数](#bzoj4833-最小公倍ペル数)
      - [LOJ2542 随機游走(ランダムウォーク)](#loj2542-随機游走ランダムウォークhttpslojacp2542)
      - [luogu4707　重返現世 (解法その2)](#luogu4707-重返現世-解法その2httpswwwluogucomcnproblemp4707)
- [連続量をテーマにした問題](#連続量をテーマにした問題)
  - [基本](#基本)
    - [確率密度関数(PDF)と累積分布関数(CDF)](#確率密度関数pdfと累積分布関数cdf)
    - [PDF,CDFと期待値](#pdfcdfと期待値)
  - [ベータ関数とベータ分布](#ベータ関数とベータ分布)
    - [例題](#例題-3)
      - [(典型) $m$番目に大きい数](#典型-m番目に大きい数)
      - [CF 1153F](#cf-1153fhttpscodeforcescomcontest1153problemf)
  - [問題集](#問題集)
      - [ARC113F Social Distance](#arc113f-social-distancehttpsatcoderjpcontestsarc113tasksarc113_f)
      - [yukicoder No.907 Continuous Kadomatsu](#yukicoder-no907-continuous-kadomatsuhttpsyukicodermeproblemsno907)
      - [(AtCoder) HHKB2020 F Random Max](#atcoder-hhkb2020-f-random-maxhttpsatcoderjpcontestshhkb2020taskshhkb2020_f)
      - [(典型) $n$個の区間の幅の最小値](#典型-n個の区間の幅の最小値)

<!-- /code_chunk_output -->

## 操作が停止する期待値を求める問題

### テンプレ

- 状態数が$1000$程度の時は連立一次方程式で解けるのでそれ以外の場合を考える。
  - 例題　多すぎるので略

### マルチンゲールと最適停止定理

#### 概要

- なにこれ

- [わからん](http://www.math.kobe-u.ac.jp/HOME/higuchi/h26kogi/14prob2-4.pdf)　[読みやすい](http://bin.t.u-tokyo.ac.jp/spzemi2013/chap4.pdf)

- $n$期目までの期待値が分かっている時に$n+1$期目の条件付き期待値が$n$期目の値と同じになる確率変数列をマルチンゲールと呼ぶ

    - 確率変数の列$x_0,x_1,\ldots,x_i$と$X_0,X_1,\ldots,X_i$があり、$X$は$x$の関数とする。この時$1 \leq n \leq i$について
    $E(X_{n+1} \vert x_n,\ldots,x_0)=X_n$
    が成り立つ時、$X$はマルチンゲールであると呼ぶ

- 最適停止定理　わからへん

#### 期待値の計算への応用

ランダムな出来事の列$A_0,A_1,A_2,\ldots$について考える。また、乱数$T \in \mathbb{N}$を停止時刻とする。出来事から実数値への写像$\phi$を次の式を満たすように定める。

$$\mathrm{E}[\phi(A_{t+1}) - \phi(A_t) \vert A_t,\ldots,A_1,A_0] = -1$$

この時、$X_t = \phi(A_t) + t$とおくと、

$$\mathrm{E}[X_{t+1} \vert A_t,\ldots,A_1,A_0] = X_t$$

が成り立つ。よって$X_0,X_1,X_2,\ldots$はマルチンゲールであり、最適停止定理より$\mathrm{E}[X_T] = \mathrm{E}[X_0]$が成り立つ。よって、$T$の期待値は

$$\mathrm{E}[T] = \mathrm{E}[\phi(A_0) - \phi(X_T)]$$

であり、さらに$\phi(A_T)$が定数であるとき

$$\mathrm{E}[T] = \phi(A_0) - \phi(A_T)$$

になる。

#### 例題

- 何もわかっていないが、とりあえず問題は解ける

##### [CF 850F](https://codeforces.com/contest/850/problem/F)

> $i$色のボールが$a_i$個入った袋がある。ボールを$2$個取り出して$2$個目のボールを$1$個目のボールの色に塗り替える操作を、袋の中のボールの色が同じになるまで繰り返す。操作を終了するまでにかかる時間の期待値は？

$m=\sum_i a_i$と置く。また、状態$A_t = (a_1,a_2,\ldots,a_n)$に対してポテンシャル関数を次のように定める。

$$\phi(A_t) = \sum_i f(a_i)$$

この時、

$$-1 = \mathrm{E}[\phi(A_{t+1}) - \phi(A_t) \vert A_t,\ldots,A_0]$$

$$= \sum_i \frac{a_i}{m}\left(\sum_{j\neq i}\frac{a_j}{m-1}\lbrace f(a_i+1) + f(a_j-1) - f(a_i)-f(a_j)\rbrace\right)$$

変形して

$$\sum_i \lbrace(m-a_i)\left(f(a_i+1)-2f(a_i)+f(a_i-1)\right) + m - 1\rbrace = 0$$

を得る。この式を満たすように$f(a)$を定めればよく、

$$(m-a)\left(f(a+1)-2f(a)+f(a-1)\right) + m - 1 = 0$$

とおいて初項を適当に定めて漸化式を解けばよい。($f(0)=0,f(1)=-\frac{m-1}{m}$と置いてガチャガチャやると$f(m)=m(m-1)$を導くことが出来るので$\phi(A_T)$は直ちに求まり、$\phi(A_0)$を計算するために前から$1$項ずつ$f(a)$を計算すれば$\mathrm{O}(n \log \bmod + \max a_i)$で解くことが出来る。)

##### [CF 1025G](https://codeforces.com/problemset/problem/1025/G)

> スターグラフからなる$n$頂点の森が与えられる。1秒ごとにランダムに連結成分を$2$つ選び、片方の連結成分の辺を全て消して中心だったノードをもう片方の連結成分の中心と辺で結ぶ。この操作をグラフが全ての頂点が連結になるまで繰り返す。かかる時間の期待値は？

状態を連結成分の大きさからなる多重集合で定義する。すなわち状態$A_t$を$A_t = \lbrace a_1,a_2,\ldots,a_{m_t}\rbrace$とおき、ポテンシャル関数を次のように定める。

$$\phi(A_t) = \sum_i f(a_i)$$

  - 注：直感的には$\phi(A_t)$は$m_t$に依存しそうに感じるがここでは$m$に依存しないと仮定すると上手くいくようだ。

この時$\phi(A_{t+1})$の条件付き期待値は、

$$\mathrm{E}[\phi(A_{t+1}) - \phi(A_t)\vert A_t,\ldots,A_0] $$

$$=\sum_i \frac{1}{m_t} \sum_{j\neq i}\frac{1}{m_t-1}\lbrace f(a_i+1)-f(a_i)+(a_j-1)f(1)-f(a_j) \rbrace $$

$$=\sum_i \frac{1}{m_t}f(a_i + 1) - \frac{2}{m_t}f(a_i) + \frac{a_i-1}{m_t}f(1) = -1 = \sum_i -\frac{1}{m_t}$$

この式が任意の$A_t$および$m_t$に対して成り立つには、$f(a)$を

$$f(a + 1) - 2f(a) + (a-1)f(1) + 1 = 0$$

を満たすようにとればよい。漸化式の初項である$f(1)$は自由に取っていいので定数項を消すために$f(1)=0$とおくと

$$f(a+1)-2f(a)+1=0$$

であり、これを解いて$f(a)=1-2^{a-1}$を得る。

##### [CF 1349D](https://codeforces.com/problemset/problem/1349/D)

> $n$人の人が$a_i$枚のビスケットを持っている。ランダムなビスケットを選んで、その所有者が自分以外の誰かにビスケットを渡すのを繰り返し、ビスケットを持っているのが一人だけになったら操作をやめる。操作の回数の期待値は？

1問目とほとんど同じ風に立式して数式をガチャガチャやると[apiad先生のコメント](https://codeforces.com/blog/entry/77284?#comment-620956)と同じ式が出るので漸化式を回せばよい。

##### [CF 1479E](https://codeforces.com/blog/entry/87598)

[editorial](https://codeforces.com/blog/entry/87598)に全てが書いてあるので省略…
(editorial後半の記号が入り乱れている部分はmin_25氏のアルゴリズムを利用した計算量改善の話、たぶんLibrary Checker勢には典型なので読む必要はなさそう？)

### 母関数を利用する解法

お　ま　た　せ

複数の独立した問題が集まっている場合はこちらのアプローチの方が良さそう。包除原理が絡んでいるときも使える。

#### 概要

複数の独立した小問題があり、1回の操作ごとに小問題のいずれか1つを1ステップ進めるゲームを考える。小問題$i$が選ばれる確率を$a_i$、小問題$i$が$s$ステップ進んだときに終了する確率を$p_{i,s}$とおき、$p_{i,s}$のEGFを$P_i$とおく。この時、$s$回の操作後に全ての小問題が終了している確率のEGFは

$$P(x) = \prod_i P_i(a_ix)$$

になり、操作が終了する時間の期待値は

$$\sum_{n=0}^\infty (1-p_n) = \sum_{n=0}^\infty n![x^n]\left(e^x - P(x)\right)$$

から求められる。

#### 例題

##### [AGC038E Gachapon](https://atcoder.jp/contests/agc038/tasks/agc038_e)

maroon神のeditorialが理解不能で涙が止まらない… -> なんとか理解できるようになりました

母関数で解く。小問題の母関数は

$$P_i = \sum_{j\geq B_i}\frac{x^j}{j!}=e^x-\sum_{j\lt B_i}\frac{x^j}{j!}$$

であり、問題全体の母関数は

$$P(x) = \prod_i \left(e^{a_ix}-\sum_{j\lt B_i}\frac{(a_ix) ^j}{j!}\right)$$

になる。また、この問題の最終的な答えは

$$\sum_{n=0}^\infty (1-p_n) = \sum_{n=0}^\infty n![x^n]\left(e^x - P(x)\right)$$

になる。$e^x-P(x)$は$P(x)$を展開すると$e^{(1未満)x}\mathrm{poly}(x)$の和で表されることがわかるため上の式は収束すると示せる。$P(x)$の展開は愚直に計算して問題ないので、$\sum_n n! [x^n] x^s e^{tx}$を高速に計算できればこの問題を解けるとわかった。この式は

$$\sum_n n![x^n]x^se^{tx} = \sum_{n=s}^\infty n![x^n] x^s \frac{(tx)^{n-s}}{(n-s)!} = \sum_{n=0}^\infty (n+s)^{\underline{s}}t^{n}$$

と変形すると[sum of exp](https://judge.yosupo.jp/problem/sum_of_exponential_times_polynomial_limit)に帰着するので$\mathrm{O}(s)$で計算できる。さらに高速化すると、上の式のOGFを取って

$$\sum_{n=0}^\infty(n+s)^{\underline{s}}t^n x^n = s! \sum_{n=0}^\infty \binom{n+s}{s}(tx)^n = \frac{s!}{(1-tx)^{s+1}}$$

と変形すれば総和が$\frac{s!}{(1-t)^{s+1}}$であるとわかるので$\mathrm{O}(\log s)$で計算出来る。

##### [CF 1477F](https://codeforces.com/contest/1477/problem/F)

> $n$本のチョコレートバーが与えられる。全てのチョコレートバーの長さが$k$以下になるまで以下の操作を繰り返す。操作が終了するまでの回数の期待値は？
> - 長さに比例する確率でバーを1本選ぶ
> - バーの長さを$l$とする。$[0,l]$から一様ランダムに数$x$を選び、バーを$x$と$l-x$の2本に分ける
>
> $n\leq50,k\leq2000,\sum l \leq 2000$

これを短時間コンテストで解く人間、激ヤバ！w

部分問題として1本だけの場合を考える。

$p_k$を$1-(k$回チョコを切っても終わらない確率)と置く。すると$p_k$は次のように言い換えられる。

- $[0,L]$内から一様ランダムに取る$k$個の確率変数を昇順にソートしたものを$X_1,\ldots,X_k$と呼ぶ。また$X_0=0$と置く。この時、$X_{i+1} - X_i \leq K(0\leq i \lt k)$かつ$L - X_k \leq K$を$X$が満たす確率は$p_k$と一致する。

$w = \frac{K}{L}$とおく。また、$Z_i = \frac{X_{i+1} - X_i}{L}$と置き換える。この時、確率変数$Z_1,Z_2,\ldots,Z_n$の確率密度関数(PDF)は、$Z_1,Z_2,\ldots,Z_n$から得られる値の組$(z_1,z_2,\ldots,z_n)$に対して、$[0,1]$上の一様分布に従う確率変数$n$個の値$(z'_1,z'_2,\ldots,z'_n)$が$n!$通り対応することから、

$$f(z_1,z_2,\ldots,z_n) = n! \lbrack 0 \lt z_i \lt 1, \sum_{i} z_i \lt 1 \rbrack$$

になるので、

$$p_n = n! \int_{0 \lt z_i \lt w,1-w \lt \sum_i z_i \lt 1} dz = n! w^n \int_{0 \lt z_i \lt 1, \frac{1}{w} - 1 \lt \sum_i z_i \lt \frac{1}{w}} dz$$

$Y_1,Y_2,\ldots,Y_n$を$[0,1]$における一様分布に従う確率変数とすると、$p_n = \mathrm{Pr}[\frac{1}{w} - 1 \lt \sum_i Y_i \lt \frac{1}{w}]$になる。ここで$\sum_i Y_i$は[Irwin-Hallの分布](https://en.wikipedia.org/wiki/Irwin%E2%80%93Hall_distribution)に従い(なにこれ)、その累積分布関数(CDF)は

$$F(x) = \frac{1}{n!}\sum_{k=0}^{\lfloor x \rfloor}(-1)^k \binom{n}{k} (x-k)^n$$

で表される。よって

$$p_n = n! w^n \left(F\left(\frac{1}{w}\right) - F\left(\frac{1}{w} - 1\right)\right)$$

であり、これを整理して

$$p_n = 1 - \left(\sum_{k=1}^{\lfloor\frac{1}{w}\rfloor} (-1)^{k-1} \left(\binom{n}{k}+\binom{n}{k-1}\right) (1-kw)^n \right)$$

を得る。また、$p$の指数型母関数$P$は

$$P(x) = e^x - \sum_{k = 1}^{\lfloor \frac{1}{w} \rfloor}(-1)^{k-1}\left(\frac{(1-kw)^k}{k!}x^k  + \frac{(1-kw)^{k-1}}{(k-1)!}x^{k-1} \right)e^{(1-kw)x}$$

になる。

問題全体での場合を考える。$i$本目のチョコレートバーの長さを$L_i$のように表すと、$i$本目のバーに相当する母関数は上式に$w = \frac{K}{L_i}$を代入したものなので

$$P\left(\frac{L_i}{L}x\right) = e^{\frac{L_i}{L}x} - \sum_{k = 1}^{\lfloor \frac{L_i}{K} \rfloor}(-1)^{k-1}\left(\frac{(\frac{L_i-kK}{L})^k}{k!}x^k  + \frac{(\frac{L_i-kK}{L})^{k-1}}{(k-1)!}x^{k-1} \right)e^{\frac{L_i-kK}{L}x}$$

となる。以下はGachaponと同様に$e^x - \prod_i P\left(\frac{L_i}{L}x\right)$の係数の和を計算すればよい。
(実装によっては$k = 1, K = L_i$の時に第二項が$0$にならずバグるので要注意。)

##### [luogu4707　重返現世](https://www.luogu.com.cn/problem/P4707)

> $n$個の鍵の材料があり、単位時間当たり$\frac{a_i}{m}$の確率で材料$i$が手に入る。(ただし$m=\sum_i a_i$とする)
> $n$個の材料のうち任意の$k$個が揃うと鍵を作ることが出来る。条件を満たすまでに掛かる時間の期待値は？
> $k \leq n \leq 1000, n - k \leq 10, m \leq 10000$

minmax包除で解けるが(後述)ここでは母関数で解く。

[参考](https://blog.csdn.net/alan_cty/article/details/83513932?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522161371855616780274118520%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fall.%252522%25257D&request_id=161371855616780274118520&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-1-83513932.pc_search_result_hbase_insert&utm_term=alan_cty++%25E9%2587%258D%25E8%25BF%2594%25E7%258E%25B0%25E4%25B8%2596)

最後に手に入れた材料$v$を固定する。$v$以外の要素が$k-1$個集まっている母関数は

$$g_v(x) = \sum_{T \in [n] \setminus \lbrace v \rbrace, |T|=k-1} \prod_{i \in T} (e^{\frac{a_i}{m}x}-1)$$

であるから、求める答えは

$$\sum_{1 \leq v \leq n} \frac{a_i}{m} \sum_{i = 0}^\infty (i+1) i! [x^i] g_v(x)$$

$g_v(x)$は$\sum_{|T| = s} \prod_{i \in T}(e^{\frac{a_i}{m}x} - 1)$を$s=k$から$s=n$まで$\mathrm{O}(nm(n-k))$で前計算した後に戻すDPの要領で$\mathrm{O}(m(n-k))$で復元できる。復元した後は

$$\sum_{0 \leq i}(i+1)i![x^i]e^{\frac{n}{m}x} = \sum_{i} \left(\frac{n}{m}\right)^i (i+1) = \left.\left(\frac{1}{1-x}\right)' \right\vert_{x=\frac{n}{m}} = \left(\frac{n}{n-m}\right)^2$$

を利用して各項ごとに$\mathrm{O}(m)$で計算できるので、全体で$\mathrm{O}(nm(n-k))$の計算量になる。

## 包除原理

// 色々テクニックが眠っていそうだが、わからない

### min-max包除

#### 概要

- 集合$S = \lbrace a_1,\ldots,a_n \rbrace$に対して
$$\max(S) = \sum_{\phi \neq T \subseteq S}(-1)^{|T|+1}\min(T)$$
が成り立つ

  - 証明は$i\neq 0$について
  $$\sum_{j=0}^i (-1)^j \ _i C_j=0$$
  が成り立つことから示せる

- この事実を期待値の計算に応用できないか？
- $1$から$n$からなる集合を$[n]$と表す。確率変数$X_1 \ldots X_n$について
$$\mathrm{E}[\max_{i \subseteq [n]} X_i] = \sum_{\phi \neq S \subseteq [n]}(-1)^{|S|+1} \mathrm{E}[\min_{i \in S}X_i]$$
  - 期待値の線形性から従う

#### kth Maxのminmax包除

参考：[中国ブログ](https://www.cnblogs.com/Mr-Spade/p/9636968.html)

minmax包除の式を$K$番目の数に拡張することを考える。

$$\mathrm{kthmax}(S) = \sum_{T \subseteq S}f_{\lvert T \rvert} \min(T)$$

を満たす$f_{\lvert T\rvert}$を考える。大きさ$j$の集合の最小値が$i$番目に小さい数であるような集合の数は$\binom{i - 1}{j - 1}$であるから、

$$\sum_{j=1}^{i}\binom{i-1}{j-1}f_j = [i = k]$$

のようになり、反転公式を使うと

$$\mathrm{kthmax}(S) = \sum_{T \subseteq S}(-1)^{\lvert T \rvert - k} \binom{\lvert T \rvert - 1}{k - 1} \min(T)$$

を得る。

#### 例題

##### [51nod 1355 フィボナッチ的最小公倍数](http://www.51nod.com/Challenge/Problem.html#problemId=1355)

> フィボナッチ数列$f_0=0,f_1=1,f_{n+2}=f_{n+1}+f_n$と数列$a$が与えられる。$\mathrm{lcm}(a_1, a_2,\ldots,a_n) \bmod{10^9+7}$を求めよ。
> $|a| \leq 10^6, a_i \leq 10^6$

補題として次の事実を証明する。

- $\gcd(f_i,f_j) = f_{\gcd(i,j)}$

(略証) $i\lt j,k=j-i$ とおく。$f_j=f_{i+1}f_k + f_{k+1}f_i$が成り立つ(行列累乗の式から従う)ので

$$\gcd(f_i,f_j)=\gcd(f_{i+1}f_k + f_{k+1}f_i,f_i)=\gcd(f_{i+1}f_k,f_i)$$

であり、$\gcd(f_{i+1},f_i)=1$(互除法+帰納法で示せる)と合わせると

$$\gcd(f_i,f_j)=\gcd(f_k,f_i)=\gcd(f_{i-j},f_i)$$

になる。よって互除法の要領で題意を示せる。

minmax包除はgcd-lcmの関係に応用出来る。$S=\lbrace a_1,\ldots,a_n\rbrace$とおいて

$$\mathrm{lcm}(f_S) = \prod_{\phi \neq T \subseteq S}\gcd(f_T)^{(-1)^{|T|+1}} = \prod_{\phi \neq T \subseteq S}f_{\gcd(T)}^{(-1)^{|T|+1}}$$

となるので$f_n$の寄与度を計算すれば解けるが、これは直接計算できるものではないらしい。$f$のメビウス変換$g$を$f_n = \prod_{d\vert n}g_d$のように置くと、

$$\mathrm{lcm}(f_S) = \prod_{\phi \neq T \subseteq S}\left(\prod_{d\vert \gcd(T)}g_d\right) ^{(-1)^{|T|+1}}$$

$$=\prod_d g_d^{\sum_{\phi \neq T \subseteq S}[d\vert \gcd(T)] (-1)^{|T| +1}}$$

となるので$\sum_{\phi \neq T \subseteq S}[d\vert \gcd(T)] (-1)^{|T|+1}$を高速に計算できればよいが、包除原理より上式は$[\exists a_i\in S, d | a_i]$と等しい。よって

$$\mathrm{lcm}(f_S) =\prod_{\exists a_i\in S, d | a_i} g_d$$

であり、$g$は$f$をメビウス変換すれば求められるのでこの問題を高速に($\mathrm{O}(n \log \log n)$程度)解くことが出来た。

##### bzoj4833 最小公倍ペル数

> $(1 \pm \sqrt{2})^n = e_n \pm f_n \sqrt{2}$を満たす整数列$f$に対して$g_n = \mathrm{lcm}(f_1, f_2,\ldots,f_n)$とおく。$g_n \mod p$を求めよ。
> $n \leq 10^6, 2 \leq p \leq 10^9+7,p$は素数

上の問題の類題。$f$に対する漸化式を計算すると$f(n) = 2f(n-1)+f(n-2)$になり、残りは同様の考察が従う。

##### [LOJ2542 随機游走(ランダムウォーク)](https://loj.ac/p/2542)

> $N$頂点の木の上を$x$を始点としてランダムウォークを行う。次の$Q$個のクエリに答えなさい。
> - 頂点集合$S$が与えられるので、$S$に含まれる全ての点を$1$回以上通るまでに掛かる歩数の期待値$\mod 998244353$を返す。
>
> $N \leq 18, Q \leq 5000$

頂点$i$に初めてたどり着くまでの歩数を表す確率変数を$X_i$とする。求める答えはmin-max包除を利用すると

$$\mathrm{E}[\max_{i \in S} X_i] = \sum_{\phi \neq T \subseteq S}(-1)^{|T|+1} \mathrm{E}[\min_{i \in S}X_i]$$

になる。$\mathrm{E}[\min_{i\in S} X_i]$を全て計算できれば高速メビウス変換することでクエリに$\mathrm{O}(1)$で答えられるので、$\mathrm{E}[\min_{i\in S} X_i]$を高速に列挙する問題に帰着する。この問題を根を任意に取る木DPで高速に計算する。

$f(i, S)$を「頂点$i$をスタートして集合$S$内の頂点に初めて到達するまでにかかる歩数の期待値」と置くと、遷移式は

$$f(i, S) = 1 + \frac{1}{\deg(i)}\left(f(\mathrm{par}(i),S) + \sum_{j \in \mathrm{chd}(i)} f(j, S)\right)$$

になり、$S$を固定すると上式は連立一次方程式になるので掃き出し法で解けるが、計算量は全体で$\mathrm{O}(2^n n^3)$となりTLに間に合わない。

グラフが木であるという性質を生かして考察する。$S$を固定すると$f(i) = A_i f(\mathrm{par}(i)) + B_i$という形で表せることを利用すると、

$$f(i) = 1 + \frac{1}{\deg(i)}\left(f(\mathrm{par}(i)) + \sum_{j \in \mathrm{chd}(i)} A_j f(i) + B_j \right)$$

$$(\deg(i) - \sum_{j\in \mathrm{chd}(i)} A_j) f(i) = f(\mathrm{par}(i)) + \deg(i) + \sum_{j\in \mathrm{chd}(i)} B_j$$

と表せるので葉から$A_i,B_i$を計算する木DPで$\mathrm{O}(n)$で高速に解ける。よってこの問題を$\mathrm{O}(2^n n)$で解くことが出来た。

- この解法本当か？ (分母が$0$になるケースが存在しないことを証明する必要がありそうだが…)

##### [luogu4707　重返現世 (解法その2)](https://www.luogu.com.cn/problem/P4707)

> $n$個の鍵の材料があり、単位時間当たり$\frac{a_i}{m}$の確率で材料$i$が手に入る。(ただし$m=\sum_i a_i$とする)
> $n$個の材料のうち任意の$k$個が揃うと鍵を作ることが出来る。条件を満たすまでに掛かる時間の期待値は？
> $k \leq n \leq 1000, n - k \leq 10, m \leq 10000$

minmax包除の公式

$$\mathrm{E}[\mathrm{kthmax}(S)] = \sum_{T \subseteq S}(-1)^{\lvert T \rvert - k} \binom{\lvert T \rvert - 1}{k - 1} \mathrm{E}[\min(T)]$$

を利用する。$n - k + 1$番目に大きい数の期待値が答えなので$k\leftarrow n-k+1$と置き換えると、

$$\mathrm{E}[\mathrm{kthmax}(S)] = \sum_{T \subseteq S}(-1)^{\lvert T \rvert - k} \binom{\lvert T \rvert - 1}{k - 1} \frac{m}{\sum_{i \in T}a_i}$$

が答えになるので右辺を計算できれば良く、これは一見するとDPで簡単に解けそうに見える。しかし、直感的に思い浮かぶ$(\lvert T \rvert,\sum_{i\in T} a_i)$をインデックスにしたDPでは$\mathrm{O}(N^2M)$の計算量がかかりTLEしてしまう。そこで以下の$f(i,j,t)$を計算するDPを考える。

$$f(i,j,t) = \sum_{T \subseteq [i]} (-1)^{\lvert T \rvert - t} \binom{\lvert T \rvert - 1}{t - 1} \left\lbrack \sum_{i \in T}p_i = j \right\rbrack$$

$f(i,j,t)$と$f(i-1,\ast,\ast)$の関係式は、$\binom{a}{b} = \binom{a-1}{b} + \binom{a-1}{b-1}$を利用すると

$$f(i,j,t) = f(i-1,j,t) + \sum_{|T|\subseteq [i - 1]}(-1)^{|T| + 1 - t}\binom{|T|}{t-1} \left\lbrack \sum_{i \in T}p_i = j - a_i \right\rbrack$$

$$=f(i-1,j,t)-f(i-1,j-a_i,t)+f(i-1,j-a_i,t-1)$$

になる。負の二項定理を利用して初期値を埋めた後DPを行えば$\mathrm{O}(nmk)$で高速にDPを計算することが出来て、答えは$\sum_{j=1}^m \frac{f(n,j,k)}{j}$から求まる。

## 連続量をテーマにした問題

TODO: http://zory.ink/posts/3e6e の連続量の問題を埋める

### 基本

#### 確率密度関数(PDF)と累積分布関数(CDF)

確率変数$X$の確率密度関数$f(x)$とは、確率変数がある値をとるという事象の確率密度を表す関数である。言い換えると、確率変数がある範囲の値を取る確率を$f(x)$の定積分により得られるように定義された関数であり、確率との間には次のような関係式が成り立つ。

$$P(a\leq X \leq b) = \int_a^b f(x) dx$$

$$\int_{-\infty}^\infty f(x)dx = 1$$

次に、確率変数$X$の累積分布関数$F(x)$は「$X \leq x$である確率」の関数であり、次の式が従う。

$$\mathrm{P}(X \leq x) = F(x)$$

$$\mathrm{P}(a \lt X \leq b) = F(b) - F(a)$$

また、「$X \geq x$である確率」を相補累積分布関数と呼び、$\overline{F}(x)$と表す。$F(x)$と$\overline{F}(x)$の間には

$$F(x) + \overline{F}(x) = 1$$

という関係がある。

また、今までの定義から確率密度関数と累積分布関数の間には次の関係式が成り立つ。

$$F(x) = \int_{-\infty}^x f(t)dt$$

#### PDF,CDFと期待値

確率変数$X$が$a \leq x \leq b$の範囲の値を取る時、$X$のPDF $f(x)$,CDF $F(x)$と$\mathrm{E}[X]$の関係式は次の式で与えられる。

$$\mathrm{E}[X] = \int_{a}^b xf(x)dx$$

$$\mathrm{E}[X] = a + \int_{a}^b (1 - F(x))dx$$

2本目の式は

$$\int_a^b(1-F(x))dx=\int_a^b \mathrm{P}(X\geq x)dx$$

$$\int_a^b \left(\int_x^b f(t) dt\right) dx = \int_a^b \left(\int_a^t f(t)dx\right) dt$$

$$\int_a^b \left(\int_a^t f(t)dx\right) dt = \int_a^b (t-a)f(t) dt = \mathrm{E}[X]-a$$

と変形できる。(ここでは触れていないが、$F(x)$を微分して$x$を掛けて積分しても計算できる。)

### ベータ関数とベータ分布

$$B(m,n) = \int_0^1 x^{m-1}(1−x)^{n-1} dx= \frac{(m-1)!(n-1)!}{(m+n-1)!}$$

$$f(x;m,n)=\frac{x^{m-1}(1-x)^{n-1}}{B(m,n)}$$

#### 例題

##### (典型) $m$番目に大きい数

> [0,1]上の一様分布に従う$n$個の確率変数$X_1,\ldots,X_n$のうち$m$番目に大きい数の期待値は？
> $ m \leq n \leq 10^7$

答えが$x$以上である確率を表す関数$\overline{F}(x)$は

$$\overline{F}(x) = \sum_{i=m}^n \binom{n}{i} (1-x)^i x^{n-i}$$

になる。よって確率密度関数$f(x)$は

$$f(x) = (1-\overline{F}(x))' = \binom{n}{m}m\cdot x^{n-m}(1-x)^{m-1} = \frac{x^{n-m}(1-x)^{m-1}}{B(n-m+1,m)}$$

で与えられる(ベータ分布)。よって期待値は

$$\int_0^1 xf(x)dx = \binom{n}{m}m x^{n-m+1}(1-x)^{m-1}=\frac{n-m+1}{n+1}$$

になる。

##### [CF 1153F](https://codeforces.com/contest/1153/problem/F)

> $[0,1]$から一様に$x,y$を選び、小さい方を左端、大きい方を右端として区間を選ぶ操作を$n$回繰り返す。次に、選んだ$n$個の区間のうち$k$個以上と重なるような部分に色を塗る。色を塗った部分の長さの期待値は？
> $k \leq n \leq 2000$ ($10^5$でも解ける)

区間を$1$つ取った時、点$x$が区間に覆われる確率は$p(x) = 2x(1-x)$と表せる。よって、点$x$が問題文の条件を満たす確率$P(x)$は

$$P(x)=\int_0^1\sum_{|T|\geq K}p(x)^{|T|} (1-p(x))^{n-|T|} dx$$

$$=\int_0^1 \sum_{i=k}^n \binom{n}{i}p(x)^i (1-p(x))^i dx$$

と表せる。積分の内側の式を変形して$p(x)$の次数で分けると

$$\sum_{k\leq j\leq n}\frac{n!p^j}{(n-j)!}\sum_{k\leq i\leq j}\frac{1}{i!}\frac{(-1)^{j-i}}{(j-i)!}$$

と変形できるのでNTTで2個目のシグマを外すことが出来る。また、$p(x)^j$の積分はベータ関数の積分なので

$$\int_0^1 p(x)^j = 2^j \int_0^1 x^j(1-x)^j dx = \frac{2^j (j!)^2}{(2j+1)!}$$

となる。以上よりこの問題を$\mathrm{O}(N \log N)$で解くことが出来た。

### 問題集

##### [ARC113F Social Distance](https://atcoder.jp/contests/arc113/tasks/arc113_f)

> 狭義単調増加な整数列$X_0=0,X_1,\ldots,X_N$が与えられる。人$i$が数直線の$\lbrack X_{i-1},X_i \rbrack$上を一様ランダムに立つ時、$\min_j(X_{j+1}-X_j)$の期待値は？
>
> $N \leq 20, X_N \leq 10^6$

実装部分が一番重い問題だが、考察の時点で言い換えが出来ずに門前払いされてしまった…反省。

最小値が$z$以上である確率の関数$F(z)$を計算できれば、答えは$\int_0^\infty F(z)dz$になるので問いに答えられる。$F(z)$を計算することを考える。

$z$を固定して考える。確率変数$Y_i$を$\lbrack X_i,X_{i+1}\rbrack$上の一様分布に従う変数とすると、$F(z)$は$Y_{i+1} - Y_i \geq z$を満たす確率になる。そこで、$Y_i$を$\lbrack X_i - iz, X_{i+1} - iz\rbrack$内の一様分布上の変数として定義しなおすと、$F(z)$は$Y_0 \leq Y_1 \leq \ldots \leq Y_{n-1}$を満たす確率になる。

  - このように「確率変数の大小を確定させる」ことでDPや積分などで計算可能な問題に持ち込めるというのが1つの大事な着眼点だと思う。

この問題は次に説明するDPで解くことが出来る。まず、$Y_i$の両端である$2N$個の点を数直線上に並べて数直線を$2N+1$個の区間に分ける。そして、次のようなDPを考える。

- $dp_{i,j,k} :=$ $Y_i$まで決めた時、$Y_i$が$j$番目の区間の中で$k$個目に小さい値である確率

このようにDPを置いて、$i$の昇順にDPを埋めていく。$Y_i$が$j$番目の区間に入る確率を$p_{i,j}$と置くと、$dp_{i-1,\ast,\ast}$から$dp_{i,j,k}$への寄与は次のようになる。

$$dp_{i,j,k} \leftarrow 
\begin{cases}
  dp_{i-1,j,k-1} \cdot p_{i,j} \cdot \frac{1}{k} & k \geq 2 \newline \\
  dp_{i-1,j',\ast} \cdot p_{i,j} & j' \lt j, k = 1 
\end{cases}
$$

1行目が本質で、区間$j$に$k$個の変数がある場合に順列になる確率が$\frac{1}{k!}$であることを反映した式になっている。このDPを計算することで$F(z)$を求めることが出来た。

次に$z$を変数として扱う場合を考える。$z$を変数として考えると、$p_{i,j}$は$z$の1次式で与えられるので、DPの各要素は$z$の多項式になる。よって、DPの値を多項式として保持してDPを行えばよく、計算量は$\mathrm{O}(N^5)$になる。(計算の際に$k$に対して累積和を取れば$\mathrm{O}(N^4)$に高速化できる。)

$Y_i$の両端である頂点の大小が入れ替わるのは$\mathrm{O}(N^2)$回なので、それぞれの場合に対してこの問題を解いて積分すれば$\mathrm{O}(N^7)$か$\mathrm{O}(N^6)$でこの問題を解くことが出来た。

##### [yukicoder No.907 Continuous Kadomatsu](https://yukicoder.me/problems/no/907)

上の問題と同様に、両端である$2N$個の点を数直線上に並べて数直線を$2N+1$個の区間に分ける。そして、次のようなDPを考える。

- $dp_{i,j,k} :=$ $a_i$まで決めた時、$a_i$が$j$番目の区間にあり、$a_{i-k+1}$から$a_i$まで$k$連続で$j$番目の区間の中にある確率

このDPは長さ$k$の順列が門松列になる確率を$kado_k$として

$$dp_{i,j,k} \leftarrow 
\begin{cases}
  dp_{i-1,j,k-1} \cdot p_{i,j} \cdot \frac{kado_{k-1}}{kado_{k}} & k \geq 2 \newline \\
  dp_{i-1,j',\ast} \cdot p_{i,j} & i \bmod 2 = 0, j' \lt j, k = 1  \newline \\
  dp_{i-1,j',\ast} \cdot p_{i,j} & i \bmod 2 = 1, j' \gt j, k = 1 
\end{cases}
$$

という遷移で表せるので、累積和と組み合わせてこの問題を$\mathrm{O}(N^3)$で解くことが出来た。

##### [(AtCoder) HHKB2020 F Random Max](https://atcoder.jp/contests/hhkb2020/tasks/hhkb2020_f)

> 確率変数$X_1,X_2,\ldots,X_N$が与えられる。$X_i$は$[L_i,R_i]$の範囲を取る一様分布に従う。$\mathrm{E}[\max X_i]$を求めよ。
>
> $N \leq 1000, 0 \leq L_i \lt R_i \leq 10^9$

区間同士の内外関係を一意に定めるために、上の問題と同様に$L,R$をソートすることで区間を$\mathrm{O}(N)$個に分割する。

区間$\lbrack P, Q\rbrack$において$F(x):=($最大値が$x$以下であるような確率)を計算する。条件を満たす確率は変数ごとに独立なので、確率変数$X_i$が$x$以下である確率を$p_i$として$F(x) = \prod_i p_i$の形で表せる。$p_i$は場合分けをすると以下の式で表せる。(初めに区間を分けたおかげで区間が交差しているときは必ず$L_i \leq P$になる事実を利用している。)

$$p_i = 
\begin{cases}
1 & R_i < P \newline \\
0 & Q < L_i \newline \\
\frac{x - L_i}{R_i - L_i} & \mathrm{otherwise}
\end{cases}
$$

よって$F(x)$を$p_i$として計算すれば、区間$[P,Q]$の解答への寄与は$\int_P^Q xF'(x)dx$になる。これを全ての区間に対して計算すれば$\mathrm{O}(N^2\log^2 N)$でこの問題を解くことが出来た。($F(x)$を求める時に一つ前の$F(x)$から変化させて計算する方法を取れば$\mathrm{O}(N^2)$で計算できる。)

##### (典型) $n$個の区間の幅の最小値

> 区間$[0,1]$上に一様ランダムに区切り線を$n-1$本入れて$n$個の区間に分けた時、区間の幅の最小値の期待値は？

最小値が$x$以上である確率$\overline{F}(x)$は、
$[0,1]$上の一様分布の確率変数$X_1,X_2,\ldots,X_{n-1}$と$X_0 = 0, X_n = 1$に対して$X_{i+1} - X_i \geq x$を満たす確率に$(n-1)!$を掛けたものに等しい。

ここで$Y_i = X_i - ix$とおくと、$Y_0 = 0 \leq Y_1 \leq Y_2 \leq \ldots \leq X_n = 1 - nx$を満たす確率を求めればよく、これは明らかに$\max(1-nx,0)^{n-1}$である。

よって答えは

$$\int_{0}^{\frac{1}{n}}(1-nx)^{n-1}dx = \frac{1}{n^2}$$

である。

