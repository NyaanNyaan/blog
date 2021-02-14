---
title: "Combinatorics"
date: 2020-11-14T19:46:18+09:00
draft: true
---


## 操作が停止する期待値を求める問題

### テンプレ

- 状態数が$1000$程度の時は連立一次方程式で解けるのでそれ以外の場合を考える。
  - 例題　多すぎるので略

### マルチンゲールと最適停止定理

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

### 母関数解法

お　ま　た　せ

複数の独立した問題が集まっている場合はこちらのアプローチの方が良さそう。包除原理が絡んでいるときも使える。

複数の独立した小問題があり、1回の操作ごとに小問題のいずれか1つを1ステップ進めるゲームを考える。小問題$i$が選ばれる確率を$a_i$、小問題$i$が$s$ステップ進んだときに終了する確率を$p_{i,s}$とおき、$p_{i,s}$のEGFを$P_i$とおく。この時、$s$回の操作後に全ての小問題が終了している確率のEGFは

$$P(x) = \prod_i P_i(a_ix)$$

になり、操作が終了する時間の期待値は

$$\sum_{n=0}^\infty (1-p_n) = \sum_{n=0}^\infty n![x^n]\left(e^x - P(x)\right)$$

から求められる。

##### [AGC038E Gachapon](https://atcoder.jp/contests/agc038/tasks/agc038_e)

maroon神のeditorialが理解不能で涙が止まらない…

母関数で解く。小問題の母関数は

$$P_i = \sum_{j\geq B_i}\frac{x^j}{j!}=e^x-\sum_{j\lt B_i}\frac{x^j}{j!}$$

であり、問題全体の母関数は

$$P(x) = \prod_i \left(e^{a_ix}-\sum_{j\lt B_i}\frac{{a_ix}^j}{j!}\right)$$

になる。また、この問題の最終的な答えは

$$\sum_{n=0}^\infty (1-p_n) = \sum_{n=0}^\infty n![x^n]\left(e^x - P(x)\right)$$

になる。$e^x-P(x)$は$P(x)$を展開すると$e^{(1未満)x}\mathrm{poly}(x)$の和で表されることがわかるため上の式は収束すると示せる。$P(x)$の展開は愚直に計算して問題ないので、$\sum_n n! [x^n] x^s e^{tx}$を高速に計算できればこの問題を解けるとわかった。この式は

$$\sum_n n![x^n]x^se^{tx} = \sum_n n![x^n] x^s \frac{{tx}^{n-s}}{(n-s)!} = \sum_{n=s}^\infty n^{\underline{s}}t^{n-s}$$

と変形すると[Library Checkerの例のアレ](https://judge.yosupo.jp/problem/sum_of_exponential_times_polynomial_limit)に帰着するので高速に計算できる。

TODO: AC

## 包除原理

// 色々テクニックが眠っていそうだが、わからない
// スターリング数との関連は？

// 反転公式 (下に参考文献がいくつか載っている)
// https://www.cnblogs.com/ubospica/p/10618460.html

### 反転

#### 反転公式

数列$f,g$が反転可能であるとは、ある行列$a,b$が存在して、

$$g_n=\sum_{i=0}^n a_{ni}f_i$$

かつ

$$f_n = \sum_{i=0}^n b_{ni}g_i$$

が成り立つことを言う。(この時$ab=I$が成り立つことが上式の片方を他方に代入することで証明できる。)

反転公式の使用方法としては、「直接計算できない数列$f$を求める時に$g$を経由して$f$を求める」という場合が多い。

- 個人的な感想としては、意識的に公式を使おうとするとしばしば混乱してしまうが、反転操作は包除原理やFPSで無意識的に使っていることも多いのでうまく感覚的に捉えていきたい。

#### 二項係数の反転公式(パスカル行列)

(狭義の)包除原理に関連した反転公式。

$$f_n = \sum_{i=0}^n\binom{n}{i}g_i \leftrightarrow g_n = \sum_{i=0}^n (-1)^{n-i} \binom{n}{i}f_i$$

(いつもよくやる「1個の場合を引いて、2個の場合を足して…」を集合に対して適用すると上のような式になる。)

他にも添え字が少し違うバージョンがいくつかある。
$f$から$g$への変換は$\mathrm{O}(n \log n)$。

#### スターリング数の反転公式(スターリング行列)

実はかなり良い性質を持っていていろんなところに顔を出すが正体はよくわかっていない…

$f$から$g$への変換は計算量$\mathrm{O}(n \log ^2 n)$のアルゴリズムを知っているが、もっと計算量の良い方法があるかも…

#### ラグランジュの反転公式

親の顔より見た約数/倍数変換　[ここに何か書いた](https://nyaannyaan.github.io/library/multiplicative-function/divisor-multiple-transform.hpp)　

日本でも割と流行っている　[noshi大先生のブログ](https://noshi91.hatenablog.com/entry/2020/01/15/185642)　

#### 原始根の反転公式

FFTです。(終わり)

#### FPS関連の反転公式

$\mathrm{exp}$や$\log$や逆元です。(終わり)

#### 高速ゼータ変換/メビウス変換/アダマール変換

はい。

#### [LOJ575 不等関係](https://loj.ac/p/575)

> [EDPC T Permutation](https://atcoder.jp/contests/dp/tasks/dp_t)の$N \leq 10^5$版。

$\mathrm{dp}_{i,j}$:=左から順に$i$番目の数字まで決めた時、$i$番目の数が今までで$j$番目に大きい場合の数、とすると$\mathrm{O}(N^2)$で解ける。

高速化のために見方を変えて、連続する$<$の列を1つの区間として見る。すると、求める列は昇順列からなる区間が並んだもので、連続する区間は前の区間の最後の数字が後ろの区間の最初の数字より大きくなければならない。

//　なんか包除をうまく使うっぽい？

### min-max包除

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

minmax包除の式を拡張する

$$\mathrm{kthmax}(S) = \sum_{T \subseteq S}f_{\lvert T \rvert} \min(T)$$

を満たす$f_{\lvert T\rvert}$を考える。大きさ$j$の集合の最小値が$i$番目に小さい数であるような集合の数は$\binom{i - 1}{j - 1}$であるから、

$$\sum_{j=1}^{i}\binom{i-1}{j-1}f_j = [i = k]$$

$i \leftarrow i + 1$とすると

$$\sum_{j=0}^{i}\binom{i}{j}f_{j+1} = [i = k - 1]$$

TODO [中国ブログ](https://www.cnblogs.com/Mr-Spade/p/9636968.html)の読解

#### [51nod 1355 フィボナッチ的最小公倍数](http://www.51nod.com/Challenge/Problem.html#problemId=1355)

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

#### bzoj4833 最小公倍ペル数

> $(1 \pm \sqrt{2})^n = e_n \pm f_n \sqrt{2}$を満たす整数列$f$に対して$g_n = \mathrm{lcm}(f_1, f_2,\ldots,f_n)$とおく。$g_n \mod p$を求めよ。
> $n \leq 10^6, 2 \leq p \leq 10^9+7,p$は素数

上の問題の類題。$f$に対する漸化式を計算すると$f(n) = 2f(n-1)+f(n-2)$になり、残りは同様の考察が従う。

#### [LOJ2542 随機游走(ランダムウォーク)](https://loj.ac/p/2542)

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

#### [luogu4707　重返現世](https://www.luogu.com.cn/problem/P4707)

> $n$個の鍵の材料があり、単位時間当たり$\frac{a_i}{m}$の確率で材料$i$を手に入れることが出来る。(ただし$m=\sum_i a_i$とする)
> $n$個の材料のうち任意の$k$個が揃うと鍵を作ることが出来る。条件を満たすまでに掛かる手数の期待値は？

