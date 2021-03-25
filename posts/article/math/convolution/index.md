---
title: "Convolution"
date: 2021-03-01T18:47:38+09:00
draft: false
---

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [特殊なFFT](#特殊なfft)
  - [Rader's FFT algorithm](#raders-fft-algorithm)
  - [Cooley-Tukey FFT algirithm](#cooley-tukey-fft-algirithm)
  - [Chirp Z-transform(Bluestein's algorithm, CZT)](#chirp-z-transformbluesteins-algorithm-czt)
  - [例題](#例題)
    - [yukicoder No.931 Multiplicative Convolution](#yukicoder-no931-multiplicative-convolutionhttpsyukicodermeproblemsno931)
    - [ABC137C Polynomial Construction](#abc137c-polynomial-constructionhttpsatcoderjpcontestsabc137tasksabc137_f)
    - [CF 1054H  Epic Convolution](#cf-1054h-epic-convolutionhttpscodeforcescomcontest1054problemh)
      - [解法1 高次元FFT(Editorial)](#解法1-高次元ffteditorial)
      - [解法2 Multipoint Evaluation](#解法2-multipoint-evaluation)
      - [解法3 Cooley-Tukey アルゴリズム & 解法4 Chirp Z変換](#解法3-cooley-tukey-アルゴリズム-解法4-chirp-z変換)
    - [その他畳み込み関連問題](#その他畳み込み関連問題)
      - [任意長FFT](#任意長fft)
      - [長さpのFFT](#長さpのfft)
- [特殊な畳み込み](#特殊な畳み込み)
  - [Subset Convolution](#subset-convolution)
    - [概要](#概要)
    - [原理](#原理)
    - [応用](#応用)
    - [例題](#例題-1)
      - [ARC 105F Lights Out on Connected Graph](#arc-105f-lights-out-on-connected-graphhttpsatcoderjpcontestsarc105tasksarc105_f)
      - [Xmas2020 H](#xmas2020-hhttpsatcoderjpcontestsxmascon20tasksxmascon20_h)
- [高次元FFT・FPS](#高次元fftfps)
  - [高次元FFT・畳み込み](#高次元fft畳み込み)
    - [概要](#概要-1)
  - [Multivariate Multiplication(多変数FPSの乗算)](#multivariate-multiplication多変数fpsの乗算)
    - [概要](#概要-2)
  - [問題例](#問題例)
    - [CF 1103E](#cf-1103ehttpscodeforcescomcontest1103probleme)
    - [UOJ 596 三维立体混元劲](#uoj-596-三维立体混元劲httpsuojacproblem596)
      - [多変数FPSの逆元](#多変数fpsの逆元)
      - [多変数冪級数の微積分](#多変数冪級数の微積分)

<!-- /code_chunk_output -->

## 特殊なFFT

2べきFFT/畳み込み以外の特殊な状況で使用出来るFFTをまとめた。

### Rader's FFT algorithm

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%AC%E3%83%BC%E3%83%80%E3%83%BC%E3%81%AEFFT%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0)

長さ$p$のFFTの式

$$F(n) = \sum_{k=0}^{p-1} f(k) W_p^{nk}$$

を計算するアルゴリズムがRaderのFFTアルゴリズムである。

$\mod p$上の原始根$g$を用いて$n=g^{n'},k=g^{k'}\ (n\neq 0,k\neq 0)$と変換すると

$$F(n') - f(0) = \sum_{k'=0}^{p-2} f(g^{k'}) {W_p}^{g^{n'+k'}}$$

と変形できるので巡回畳み込みに帰着できる。($F(0)$は別途計算する。)

同様のアルゴリズムで長さ$p$のFFT畳み込みも可能である。

### Cooley-Tukey FFT algirithm

[Wikipedia](https://ja.wikipedia.org/wiki/%E9%AB%98%E9%80%9F%E3%83%95%E3%83%BC%E3%83%AA%E3%82%A8%E5%A4%89%E6%8F%9B#%E3%82%AF%E3%83%BC%E3%83%AA%E3%83%BC%E2%80%93%E3%83%86%E3%83%A5%E3%83%BC%E3%82%AD%E3%83%BC%E5%9E%8BFFT%E3%82%A2%E3%83%AB%E3%82%B4%E3%83%AA%E3%82%BA%E3%83%A0)

任意長FFT,任意長畳み込みを行うアルゴリズムを紹介する。長さ$N$のFFTの式

$$F(n) = \sum_{k=0}^{N-1} f(k) W_{N}^{nk}$$

を計算することを考える。この式は一見さっきの長さ$p$のFFTの式と似ているが、添え字を原始根で変換することができないため上手くいかない。

この問題を解決するためにCooley-Tukey FFTアルゴリズムを利用する。Cooley-Tukey FFTは長さが2冪の時の式のみがあまりにも有名だが実際は任意長に対して適用できる。

長さ$N$($N$は非素数)のFFTを考える。$N=PQ$とした時、FFTの式

$$F(n) = \sum_{k=0}^{N-1}f(k)W^{nk}$$

は、$n = sQ + r, k = qP + p$とおいて変形すると

$$F(sQ+r) = \sum_{p=0}^{P-1}\lbrace W^{pr} \sum_{q=0}^{Q-1} f(qP+p) \left(W^P\right)^{rq} \rbrace \left(W^{Q}\right)^{sp}$$

と変形することで、長さ$P$のFFTを$Q$回と長さ$Q$のFFTを$P$回に分割することが出来る。この操作を再帰的に繰り返して、長さが素数になったらRaderのFFTアルゴリズムを適用すればよい。

- [実装](https://nyaannyaan.github.io/library/ntt/cooley-tukey-ntt.hpp)　まともに最適化をしていないのでハチャメチャに遅い上にバグも怖い…

また、FFTが計算できるということは当然ながら任意長畳み込みもできる。(回転因子が存在する時に限る。)

- [提出(Library Checker)](https://judge.yosupo.jp/submission/20097)　一部を2べき用に特殊化してなおSIMD無し2べきFFTの5倍くらい遅い。終わりです

### Chirp Z-transform(Bluestein's algorithm, CZT)

Chirp Z変換とはFFTアルゴリズムを一般化したものであるが、競技プログラミングではFFTを計算するアルゴリズムとして利用される。

$$F(n) = \sum_{k=0}^{N-1} f(k) W_N^{nk}$$

の回転因子の部分を

$$W_N^{nk} = W_{2N}^{n^2} \cdot W_{2N}^{k^2} \cdot W_{2N}^{-(n-k)^2}$$

を利用して

$$F(n)W_{2N}^{-n^2} = \sum_{k=0}^{N-1} \left(f(k) W_{2N}^{k^2} \right) W_{2N}^{-(n-k)^2}$$

と変形して畳み込みに帰着させるのが通常のChirp Z変換アルゴリズムである。(Bluesteinのアルゴリズムとも。)しかし、$\bmod\ p$上の場合は回転因子$W$が平方剰余でない時に$W_{2N}$が定義できず困る場合がある。そこで、

$$nk = \binom{n+k}{2} - \binom{k}{2} - \binom{n}{2}$$

を利用して

$$F(n)=W_{N}^{-\binom{n}{2}}  \sum_{k=0}^{N-1} \left(f(k) W_{N}^{-\binom{k}{2}} \right) W_{N}^{\binom{n+k}{2}}$$

と変形するのがうまい式変形で、これを利用することで任意の$W$に対して$F(n)$が計算できる。

定数倍は一見良さそうだが、$N$の3倍の長さの畳み込みをする必要があるためCooley-Tukeyより実行時間が遅くなるケースの方が多そう。しかし、任意mod畳み込みを既に持っている場合は実装が15行程度で書けるので、modに応じた書き換えなどが簡単で使いやすい。

- [実装](https://nyaannyaan.github.io/library/ntt/chirp-z.hpp)　軽い！

### 例題

#### [yukicoder No.931 Multiplicative Convolution](https://yukicoder.me/problems/no/931)

> 素数$p$と長さ$p-1$の列$A,B$(1-indexed)が与えられる。
> $$C_k \equiv \sum_{ij \equiv k \pmod p} A_i B_j \pmod{998244353}$$
>
> を満たす列$C$を求めよ。
> 
> $p \leq 99991$

今では典型となってしまった問題。

Rader FFTのアルゴリズムを適用すればよい。すなわち、$\mod p$上の原始根$g$を取ってきて$i = g^{i'}, j = g^{j'}$と原始根の冪の形に式を変形すると、シグマの部分が$\sum_{i'+j' \equiv k' \pmod{p-1}}$の形になるので巡回畳み込みに帰着する。

ポイントとしては、原始根を用いて添え字を変換するアルゴリズムは

- 長さ$p$のFFT・畳み込み
- 畳み込み$c_k = \sum_{ij \equiv k \pmod{p}}a_i b_j$

に適用できる、と覚えておくと良さそう。実装も軽いので道具として使いやすい。

#### [ABC137C Polynomial Construction](https://atcoder.jp/contests/abc137/tasks/abc137_f)

> $a_0,a_1,\ldots,a_{p-1}$が与えられるので、$f(i) \equiv a_i \pmod{p}$を満たす多項式$f(x)=\sum_{i=0}^{p-1}b_ix^i$を求めよ。
>
> $p \leq 2999$

想定解は多項式補間を用いた$\mathrm{O}(p^2)$または$\mathrm{O}(p \log^2 p)$だが、この問題は$\mathrm{O}(p \log p)$で解ける。$\mod p$上の原始根を回転因子$W$として題意の式を変形すると

$$F(n) = \sum_{k=0}^{p-2} f(k) W^{nk}$$

と変形できてこの式はCooley-Tukey's FFTで計算できる。

- [提出](https://atcoder.jp/contests/abc137/submissions/7051101)　Fastest

#### [CF 1054H  Epic Convolution](https://codeforces.com/contest/1054/problem/H)

> 長さ$n,m$の列$A,B$と整数$c$が与えられる。
> $$\sum_{i=0}^{n-1} \sum_{j=0}^{m-1} a_i b_j c^{i^2j^3} \pmod {490019}$$
>
> を求めよ。
> 
> $n,m \leq 100000, c \not\equiv 0 \pmod{490019}$

$i^2,j^3$の部分を原始根を用いて置き換えると、$p = 490019$に対して

$$\sum_{0 \leq i \lt p} \sum_{0 \leq j \lt p} a_i b_j c^{ij}$$

を計算する問題に落ちる。この問題は様々な解き方が考えられる。

(なお、1つ前の問題と同様にLader FFTは使えない。なぜなら$ij \mod {p-1}$に対する畳み込みと見なせるからである。)

##### 解法1 高次元FFT(Editorial)

もし適当な素数$P$に対して$c^P \equiv 1 \mod p$だったならば、長さ$P$の畳み込みと見なしてLader FFTを行えば容易にこの問題を解くことが出来る。

そこで、$p - 1 = 2 \times 491 \times 499$なのを利用して指数部を$n$から
$(n \bmod 2, n \bmod 491, n \bmod 499)$に変換する。(正当性はCRTから従う。)こうすることでLader + 高次元FFTをすれば解ける問題に帰着する。(Laderのアルゴズム同様$n \mid 2,n \mid 491,n \mid 499$の場合が途轍もなく面倒で、かな～りやりたくない…)

計算量はFFTで$\mathrm{O}(p \log p)$、場合分けの処理で$\mathrm{O}(\frac{nm}{\sqrt{p}})$のようである。

ちなみに、Multiplicative Convolutionを一般化した問題

$$c_k = \sum_{ij\equiv k \mod n} a_i b_j$$

は同様のアルゴリズムで解けるように思える。(実装したくはないが…)

##### 解法2 Multipoint Evaluation

$$\sum_{0 \leq i \lt p} a_i \sum_{0 \leq j \lt p} b_j \left(c^{i}\right)^{j}$$

と変形すると、$B(x) = \sum_j b_j x^j$を$c^0,c^1,\ldots,c^{p-1}$に対して多項式補間すればこの問題を解ける。計算量は$\mathrm{O}(p \log^2 p)$になり、定数倍がかなりシビアなのでTLには間に合わなさそうに思える…

(元の問題の指数部分が$i^2,j^3$になっているのはおそらくこの解法を落とすためか？指数部の片方が$i$か$j$だと計算量が$\mathrm{O}((N+M) \log^2{(N+M)})$になって定数倍次第で通るように思える。

##### 解法3 Cooley-Tukey アルゴリズム & 解法4 Chirp Z変換

適宜文字を置き換えると

$$\sum_{0 \leq i \lt p} a_i \sum_{0 \leq j \lt p} b_j c^{ij}$$

を求める問題に落ちて、これは明らかに任意長FFTの形をしているのでCooley Tukey/CZTで計算できる。計算量は$\mathrm{O}(p\log p)$である。

#### その他畳み込み関連問題

##### 任意長FFT
- [CF 1184A3](https://codeforces.com/contest/1184/problem/A3)
- [CF 901E](https://codeforces.com/contest/901/problem/E)　かなり面白い

##### 長さpのFFT
- [AGC047-C](https://atcoder.jp/contests/agc047/tasks/agc047_c)
- [FHC2011 Round 2](http://techtipshoge.blogspot.com/2012/04/facebook-hacker-cup-2011-round2-scott.html)

## 特殊な畳み込み

### Subset Convolution

#### 概要

参考：[wataさんのスライド](https://www.slideshare.net/wata_orz/ss-12131479)　[arxivの論文](https://arxiv.org/pdf/cs/0611101.pdf) [hosさんの関連記事(わかりやすい)](https://hos-lyric.hatenablog.com/entry/2021/01/14/201231)

$\lbrace {1,2,\ldots,n}\rbrace$の全ての部分集合を元とする集合を$[n]$とする。$[n]$上で定義される集合関数$f,g$に対して

$$h(S) = \sum_{T \subseteq S} f(T)g(S \setminus T)$$

を満たす$h$を計算するアルゴリズムをsubset convolutionと呼ぶ。

#### 原理

subset convolutionの話をする前に、まずはbitwise or convolutionのアルゴリズムについて説明する。

bitwise or convolutionとは、関数$f,g$に対して

$$h(S) = \sum_{T \cup U = S} f(T)g(U)$$

を満たす関数$h$を計算するアルゴリズムを言う。

このアルゴリズムは高速ゼータ変換・高速メビウス変換を利用して解くことが出来る。$f,g$をゼータ変換して得られる

$$F(S) = \sum_{T \subseteq S} f(T) , G(S) = \sum_{T \subseteq S} g(T)$$

に対して、$F,G$の各点積$H$は

$$H(S) = F(S) G(S) = \sum_{T\subseteq S} A(T) \sum_{U \subseteq S}B(U) $$

$$= \sum_{(T \cup U) \subseteq S} A(T) B(U)$$

を満たすので、$H$をメビウス変換すれば$h$を得る。

このアルゴリズムに一工夫を加えることでsubset convolutionを計算できるようにしたい。(もちろんそのままだと両方1が立っているbitの部分で壊れるので、何らかの情報を加えることでアルゴリズムが上手く回るようにしたい。)

そこで、subset convolutionが$H = F \mid G$かつ$|H| = |F| + |G|$なのに注目して、集合の大きさの情報を加えたランク付き集合関数を考える。すなわち、集合関数$f$を

$$f \leftarrow \sum_{S \in \lbrack n \rbrack} f(S) x^{|S|}$$

のようにランクの情報を付け加えた状態に置き換える。こうして得られた$f,g$に対してbitwise or convolutionを行うと、得られた結果は

$$h(S) = \sum_{T \mid U = S} f(T) g(U) x ^{|T| + |U|}$$

のようにランクの情報が付加されたものになるので、$x^{|S|}$次の項が求める答えとなる。計算量は$\mathrm{O}(n^2 2^n)$である。

[verify用問題](https://judge.yosupo.jp/problem/subset_convolution) $N=2^{20}$だとSIMDを使わない実装で1.0s程度が相場のようだ。

#### 応用

集合関数$f,g$に対して加法を各点和、積をsubset convolutionとして定めると集合関数が環になる。この時、乗法の単位元$1$は$1(\emptyset) = 1, 1(S) = 0(S \neq \emptyset)$を満たす関数になる。

また、集合関数に対してinv,exp,log,sqrtなどを定義して計算することも出来る。計算方法は積の時と同様である。すなわち、$\phi(f)$を計算するには$f$をゼータ変換して、各点について多項式関数での$\phi(F)$を計算した後にメビウス変換で戻せばよい。

#### 例題

##### [ARC 105F Lights Out on Connected Graph](https://atcoder.jp/contests/arc105/tasks/arc105_f)

> $N$頂点$M$辺のグラフ$G$が与えられる。頂点$1$から$N$を含む$G$の部分グラフのうち二部グラフであるようなものの個数は？
>
> $N \leq 17$

この記事を書くために解き直したのだがかなり時間がかかってしまった、厳しい…

[Elegia氏(EntropyIncreaser氏)](https://codeforces.com/blog/entry/83535?#comment-709269)のコメントにより日本にSubset Convolutionが広まるきっかけとなった問題である。

まず、$e(S)$を$u,v \in S$である辺の本数と置く。これは$\mathrm{O}(M + N 2^N)$で求まる。

次に、集合関数$f(S)$を「頂点集合$S$に対して、$v \in S$頂点を赤と青に塗り分けて色の異なる頂点同士にのみ辺を貼る組み合わせ」のように置く。すると$F(S)$は、赤く塗る頂点集合を固定することで次の式により求まる。

$$f(S) = \sum_{T \subseteq S} 2^{e(S) - e(T) - e(S \setminus T)}$$

上式は整理すると$T$の式と$T\setminus S$の式の畳み込みの形をしているので$\mathrm{O}(N^2 2^N)$で計算できる。

次に$g(S)$を「(f(S)の条件) + 連結性を満たすグラフの個数」と置く。すると、$f,g$の母関数$F(S),G(S)$は

$$F(S) = 1 + G(S) + \frac{G^2(S)}{2} + \ldots = e^{G(S)}$$

を満たすので、

$$G(S) = \log F(S)$$

を満たす母関数$G(S)$が答えになるとわかる。

##### [Xmas2020 H](https://atcoder.jp/contests/xmascon20/tasks/xmascon20_h)

(問題概要は省略)

葉にふさわしい集合に対応する集合母関数を$L(S)$とすると、求める数え上げの答えの母関数$F(S)$は

$$F(S) = L(S) + \frac{F^2(S)}{2}$$

と表される。これを変形して

$$ (F(S) - 1) ^ 2 = 1 - 2L(S)$$

になる。ここで$g^2(S)=1-2L(S)$を満たす関数のうち$g(\emptyset)=1$である方を$\sqrt{1-2L(S)}$とおくと、$F(S) = 1 \pm \sqrt{1-2L(S)}$が成り立つことが帰納的に証明できる。よって、$F(\emptyset) = 0$とあわせて

$$F(S) = 1 - \sqrt{1 - 2 L(S)}$$

を計算すればよいとわかる。

## 高次元FFT・FPS

### 高次元FFT・畳み込み

$k$変数多項式$f(x_1,\ldots,x_k),g(x_1,\ldots,x_k)$に対して、

$$f(x_1,\ldots,x_k)\cdot g(x_1,\ldots,x_k) \mod (x_1^{n_1}-1,x_2^{n_2}-1,\ldots,x_k^{n_k}-1)$$

を計算するアルゴリズム。

#### 概要

TODO: 書く

### Multivariate Multiplication(多変数FPSの乗算)

$k$変数多項式$f(x_1,\ldots,x_k),g(x_1,\ldots,x_k)$に対して、

$$f(x_1,\ldots,x_k)\cdot g(x_1,\ldots,x_k) \mod (x_1^{n_1},x_2^{n_2},\ldots,x_k^{n_k})$$

を、$N= \prod_i n_i$と置いたときに$\mathrm{O}(kN \log N)$で計算するアルゴリズム。

#### 概要

$k$変数冪級数を乗算するアルゴリズムは、愚直で$\mathrm{O}(N^2)$、または多次元FFTを利用して$\mathrm{O}(N 2^k \log (N2^k))$程度のアルゴリズムが良く知られているが、EntropyIncreaser氏によって$\mathrm{O}(k N \log N)$のアルゴリズムが出題された。

- [EntropyIncreaser氏のブログ](https://www.luogu.com.cn/blog/EntropyIncreaser/hello-multivariate-multiplication)　他にも色々アルゴリズムを発明してるけど一体何者なんですかね…
- [参考](https://rushcheyo.blog.uoj.ac/blog/6547)　同内容だけどこっちのサイトの方が翻訳に投げた時に文字が乱れないのでよさげ

ここで紹介するアルゴリズムはsubset convolutionを一般の次数に対して拡張したものとして解釈できる。(実際、$\forall i, n_i = 2$の時がsubset convolutionと同じ演算になる。)そこで、subset convolutionのアルゴリズムと比較しながら説明する。

まず、指数部分の添え字$(i_1,i_2,\ldots,i_k)$を$(n_1,n_2,\ldots,n_k)$進数に置き換える。すなわち、$i = i_1 + i_2 n_i + \ldots + i_n n_1 \cdot n_2 \cdots n_{k-1}$と置き換える。こうすることで$(i_1,i_2,\ldots,i_k)$同士の加算を$i$同士の加算として扱えるが、繰り上がりが発生する部分の寄与を取り除く必要がある。

そこで、subset convolutionと同様にして畳み込みに新たな情報を載せることで繰り上がりがない部分のみを取り出せないかを考える。今、$i$に対応する占位関数$\chi(i)$を、$i+j$が繰り上がりせず、かつその時に限り$\chi(i) + \chi(j) = \chi(i+j)$が成り立つように定める。すると、$f$を占位多項式$\sum_i f_i x^i t^{\chi(i)}$へと変換して畳み込みを行い、得られた式の$x^i t^{\chi(i)}$次の項を見れば答えが求まる。

subset convolutionと同様に考えると$\chi(i)$は$\sum_j i_j$なら上手くいくとわかる。しかし計算量の観点から考えると$n_j$が非常に大きいときに$\chi(i)$は大きくなってしまいよろしくない。

発想を転換して考える。$i$ごとに$\lbrace \chi(i-j) + \chi(j) \vert 0 \leq j \leq i \rbrace$の得られる集合が極めて小さければ、しきい値$D$を置いて$\mod(t^D - 1)$上で計算すればよいとわかる。そこで、占位関数$\chi(i)$を

$$\chi(i) = \lfloor\frac{i}{n_1}\rfloor + \lfloor\frac{i}{n_1n_2}\rfloor + \ldots + \lfloor\frac{i}{n_1n_2\ldots n_{k-1}}\rfloor$$

とおく。この式はよく観察すると$\chi(i+j) - (\chi(i) + \chi(j))  = $($i+j$で繰り上がりが起こった回数)になるとわかる。よって$\chi(i) + \chi(j) - \chi(i+j) \in \lbrack -k+1,0 \rbrack$になるので、$\sum_i f_i x^i t^{\chi(i)}$を$\mod (t^k - 1)$上で多項式乗算を行えば復元可能な計算ができるとわかる。

計算量を考える。行う操作としては$f,g$を$x$に対して長さ$2N$のDFTを行った後に$t$について愚直に$f,g$の畳み込みを行いIDFTして元に戻すので$\mathrm{O}(k N \log N + k^2 N)$であるが、$k \leq \log_2 N$なので$\mathrm{O}(k N \log N)$と書ける。

### 問題例

#### [CF 1103E](https://codeforces.com/contest/1103/problem/E)

> $a$と$b$のradix sumを、$a,b$の各桁が$a_1a_2\ldots a_k,b_1b_2\ldots b_k$と表せる時に$(a_1+b_1)\bmod 10,(a_2+b_2)\bmod 10,\ldots,(a_k+b_k)\bmod 10$として定義する。
> 数列$a_1,\ldots,a_n$が与えらえる。$a$から数を1つ選ぶ操作を$n$回繰り返すと、あり得る組み合わせは$n^n$通りあるが、この時$b_k:=$(選んだ数のradix sumが$k$になる場合の数)を$0 \leq k \lt m$について求めよ。
>
> $n \leq 10^5,a_i \lt 10^5, m \lt 10^5$

問題文を一目読んだ感じただの実装問なんだけど$\mod 2^{58}$の扱いを間違えて詰んだ…考察要素が面白い。

5次元DFT->N乗->5次元IDFTをすれば解けるのは明らかだが、法が$2^{58}$であることによる弊害がいくつかある。具体的には

- $10^5$の逆元が存在しない
- $1$の$10$乗根が存在しない

の二つを解決しなければならない。

実は前者は簡単に解決できる。(自分は気づかなかったが…)$\mod 2^{63}$で計算を行った後に得られた答えを$(5^{-5})^{-1} \mod 2^{63}$を掛けて$2^5$で割ればよい。(正当性は明らか。)

後者も一見すると簡単に解決するように見える。$1$の原始$10$乗根$\omega^{10} = 1$を満たす回転因子を使い、各要素を$\mod \omega^{10} - 1$で管理する。これでDFT,IDFTが出来るようになる。

しかし、$\omega$を導入することで新たな問題が浮上して、答えを求める時に$\mod{\omega^{10} - 1}$を整数に直す方法が必要になる。

$\omega^2 \neq 1, \omega^5 \neq 1$かつ $\omega^{10} = 1$を満たす$\omega$とは$\omega^4 - \omega^3 + \omega^2 - \omega + 1  = 0$を満たす$\omega$である。よって答えを$\mod\ \omega^4 - \omega^3 + \omega^2 - \omega + 1$で剰余を取ることが出来て、$a\omega^3 + b\omega^2 + c\omega + d$という形の答えを得ることが出来る。

ここで、次の事実が初等的な考察により示せる。(証明略)
- $a,b,c,d$が有理数であり$a\omega^3 + b\omega^2 + c\omega + d$が整数であるとき、$a=b=c=0$である。

よって$\bmod$を取った後の0次の係数が答えになることが示せたので、この問題を解くことが出来た。

#### [UOJ 596 三维立体混元劲](https://uoj.ac/problem/596)

> 色$1,2,\ldots,k$のついたラベル付き頂点がそれぞれ$n_1,n_2,\ldots,n_k$個あり、色$i$の着いた頂点とと色$j$の着いた頂点の間には$a_{ij}$本のラベル付き辺が張られている。($i=j$の時にも辺は貼られているが自己ループは存在しない。)
> 部分グラフのうち全ての頂点が連結になるグラフの個数は？

グラフが連結でない場合を認めるとこの問題は容易に解くことが出来る。そこで、頂点を$i_1,i_2,\ldots,i_k$個ずつ持つ無向連結グラフ/無向グラフの個数のEGFをそれぞれ$f(x_1,\ldots,x_k),g(x_1,\ldots,x_k)$と置くと

$$e^f \equiv g \leftrightarrow f \equiv \log g \pmod{x_1^{n_1}\ldots x_k^{n_k}}$$

という関係を得るので、$\log g$をうまく計算できればよいとわかる。
一変数FPSの時は$\log$は微積分と逆元を適切に定義することで計算が可能であった。

##### 多変数FPSの逆元

subset convolutionの逆元はゼータした後に$t$の式についてinvを取れば上手くいったが、今回は$t$を$\pmod {t^k-1}$で計算しているため上手くいかない。

そこで、通常のFPSと同様にニュートン法を行う。つまり、乗算を占位多項式の乗算によって定めた多項式$F(x)$に対して、$G_{(k)}(x) := \equiv G(x) \bmod{x^k}$を

$$G_{(1)} = (\lbrack x^0\rbrack F(x))^{-1}$$

$$G_{(2k)} \equiv 2G_{(k)} - FG_{(k)}^2 \mod x^{2k}$$

という漸化式に基づいて計算する。乗算ごとに正しい項のみを取り出す操作を行えば不要な項が寄与するのを防げるため、このアルゴリズムは適切に動作する。

##### 多変数冪級数の微積分

冪級数$f(x)$に対して特殊な微分演算子$\mathfrak{D}F$を

$$\mathfrak{D}f = \sum i f_i x^i $$

によって定める。するとこの演算子は、多変数冪級数$f,g$、および冪級数$h$に対して

$$\mathfrak{D}(fg) = f\mathfrak{D}g+ g\mathfrak{D}f $$

$$\mathfrak{D}(h\circ g) = (h' \circ g)\cdot \mathfrak{D}g $$

が成り立つ。この式を$f \equiv \log g$に適用すると

$$\mathfrak{D}(f) = \mathfrak{D}(\log g) = \frac{\mathfrak{D}(g)}{g} $$

が成り立つので、$g$から$f \equiv \log g$を計算することが出来た。

[提出](https://uoj.ac/submission/460059)　

c++11用のNTT/Montgomery Modintライブラリを作成してなんとかAC...　信じがたいことにinvは巡回畳み込みを用いた$\mathrm{O}(\frac{5}{3}M(n))$のものでないと通らないようだ。さらに自分の場合は2d vectorの定数倍が悪いのかmodintをmontgomeryにしないと通らなかった。やべ～～～～
