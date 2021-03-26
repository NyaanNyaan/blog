---
title: "Lattice"
date: 2021-03-23T14:00:41+09:00
draft: false
---

書きかけ

数え上げ問題の中で`01`列の数え上げに帰着できる問題は多く存在するが、そのような問題はうまく言い換えることで格子状の経路や数え上げに帰着できる。

この記事では格子上の数え上げテクニックをまとめることを目標にしている。

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [鏡像法](#鏡像法)
  - [鏡像法の概要](#鏡像法の概要)
  - [Dyck pathと鏡像法](#dyck-pathと鏡像法)
  - [Dyck Pathの変種](#dyck-pathの変種)
    - [終点が$(n,m)$である場合](#終点がnmである場合)
    - [境界線が$y=x+b$である場合](#境界線がyxbである場合)
    - [境界線が$y=ax+b$である場合](#境界線がyaxbである場合)
    - [境界線が2本ある場合](#境界線が2本ある場合)
  - [例題](#例題)
    - [自作問題 k-括弧列](#自作問題-k-括弧列)
    - [yukicoder No.1388 Less than K](#yukicoder-no1388-less-than-khttpsyukicodermeproblemsno1388)
    - [yukicoder No.1241 Eternal Tours](#yukicoder-no1241-eternal-tourshttpsyukicodermeproblemsno1241)
    - [AGC***-*](#agc-httpsatcoderjpcontestsagc021tasksagc021_e)
- [Young tableau](#young-tableau)
  - [ヤング図形(Young diagram)](#ヤング図形young-diagram)
  - [共役ヤング図形](#共役ヤング図形)
  - [Young Tableau(ヤング盤)](#young-tableauヤング盤)
  - [フック長の公式(Hook length formula)](#フック長の公式hook-length-formula)
    - [例：カタラン数](#例カタラン数)
  - [Skew tableau](#skew-tableau)
  - [例題](#例題-1)
    - [EDPC-T Permutation](#edpc-t-permutationhttpsatcoderjpcontestsdptasksdp_t)
    - [ゆるふわ競プロオンサイト#3 Yet Another Cake Division](#ゆるふわ競プロオンサイト3-yet-another-cake-divisionhttpswwwhackerrankcomcontestsyfkpo3-1challengesyet-another-cake-division)
- [Lindström–Gessel–Viennot lemma](#lindströmgesselviennot-lemma)
  - [例題](#例題-2)
- [ad-hocなテクニック](#ad-hocなテクニック)
  - [AGC001 E BBQ hard](#agc001-e-bbq-hard)
  - [Japanese Knowledge](#japanese-knowledge)
  - [二項係数のprefix sumの多点評価](#二項係数のprefix-sumの多点評価)
    - [$\mathrm{O}(N^{1.5})$解](#mathrmon15解)
    - [$\mathrm{O}(N^{\frac{6}{5}} \log N)$解](#mathrmonfrac65-log-n解)
    - [$\mathrm{O}(N \log^ 3 N)$解](#mathrmon-log-3-n解)
  - [2019 ICPC Asia-East Continent Final B. Black and White](#2019-icpc-asia-east-continent-final-b-black-and-whitehttpscodeforcescomgym102471problemb)
- [FPS](#fps)
  - [カタラン数](#カタラン数)
  - [(Large) Schröder numberとDelannoy Number](#large-schröder-numberとdelannoy-number)
  - [CF 755G](#cf-755ghttpscodeforcescomcontest755problemg)

<!-- /code_chunk_output -->

## 鏡像法

### 鏡像法の概要

グリッド上の経路を数え上げるときに「グリッド上の特定領域から出てはいけない」という境界条件があるとする。このような条件を境界線に対称的な位置に(仮想的な始点/仮想的な終点)を置いて言い換えることで問題の見通しをよくする手法を鏡像法と呼ぶ。

### Dyck pathと鏡像法

鏡像法の例として非常に有名な数え上げとしてDyck pathおよびその変種が挙げられる。

Dyck Pathとは通り数がカタラン数であることで有名な経路で、その数え上げは次のような問題文で表される。

> $(0,0)$を始点、$(n,n)$を終点として常に$x\geq y$を満たす経路の数$C_n$は？

この問題を鏡像法で解く前にまずは数式的に処理した解法を説明する。余事象として始点・終点は一緒だが条件を満たさない経路の数を考えると、初めて$x\lt y$になった点を$x=i$として$\sum_{0 \leq i \lt n} C_i \times \binom{2n-2i-1}{n-i}$であるとわかるが、この式は$(0,0)$から$(x-1,y+1)$への経路の和の式として解釈できる。(図を書くと容易に確かめられる。)よって答えは$\binom{2n}{n}-\binom{2n}{n-1}$となる。

この問題を鏡像法で解くと、$y=x+1$に鏡を置いて$(x-1,y+1)$に寄与が$-1$倍である仮想の終点を置いて計算すればよい。正当性は上の計算と同様にして確かめられる。

### Dyck Pathの変種

Dyck Pathの始点・終点・境界条件が変化した場合も、同様の議論によって容易に計算できることが多い。

#### 終点が$(n,m)$である場合

> $(0,0)$から$(n,m)$への$y=x$をまたがないパスの通り数は？$(n\gt m)$

終点の鏡像を$(m-1,n+1)$に置くことで

$$\binom{n+m}{m}-\binom{n+m}{m-1}$$

であるとわかる。　関連：[Catalanの三角形](https://en.wikipedia.org/wiki/Catalan%27s_triangle)

#### 境界線が$y=x+b$である場合

> $(0,0)$から$(n,m)$への$y=x+b$をまたがないパスの通り数は？$(n\gt m,b\geq 0)$

$m \leq b$の時は明らかに

$$\binom{n+m}{m}$$

である。$m \gt b$の時は$(m-(b+1),n+b+1)$に仮想の終点を置くことで

$$\binom{n+m}{m}-\binom{n+m}{m-(b+1)}$$

が導かれる。　関連：[Catalanの台形](https://en.wikipedia.org/wiki/Catalan%27s_triangle#Generalization)

#### 境界線が$y=ax+b$である場合

> $(0,0)$から$(w,aw+b)$への$y=ax+b$をまたがないパスの通り数は？$b,w\geq 0, a \gt 0$

鏡像法で解く方法はわからなかった…

数式的に処理する。求める答えを$S_w$と表すことにする。余事象を考えると、またいた$x$座標で場合分けをすることで$\sum_{0 \leq i \lt w} S_i \binom{(w-i)(a+1)-1}{w-i}$を得る。

今までと同様の類推を働かせて、この式と$(w-1,aw+b+1)$への経路数に関連を持たせることを考える。$(0,0)$から$(w-1,aw+b+1)$への経路を同様の場合分けで処理すると$\sum_{0 \leq i \lt w} S_i \binom{(w-i)(a+1)-1}{w-i-1}$と表せるが、

$$\binom{(w-i)(a+1)-1}{w-i-1} \times a $$

$$= \binom{(w-i)(a+1)-1}{w-i-1} \times \frac{a(w-i)}{w-i}$$

$$= \binom{(w-i)(a+1)-1}{w-i}$$

なのを利用すると前者は後者の$a$倍なのがわかる。

以上の考察により、この問題の答えは

$$\binom{w+aw+b}{w} - a \times \binom{w+aw+b}{w-1}$$

なのが分かった。

- 鏡像法で処理すると$(w-1,aw+b+1)$に寄与が$-a$倍の終点を置くことになるが、これは図形的にどういう意味なんだ…？鏡像法では解釈できなさそうに思える。

#### 境界線が2本ある場合

> $(0,0)$から$(m,n)$への$a \leq |y-x| \leq b$を常に満たすパスの通り数は？

条件が2つに増えたが、鏡像法+包除原理で見通し良く解くことが出来る。

通常のDyck Pathが鏡を1枚張った世界ならば、境界線が2本あるこの問題では鏡を平行に2枚張った世界を考えれば鏡像法が適用できる。このとき仮想的な終点は鏡の反射によって無限に発生するが、包除原理を適用すると$1$枚隣の仮想的な終点の寄与は$-1$、$2$枚隣の仮想的な終点の寄与は$+1$…という風になるとわかる。よって辿り着くことが可能な終点の寄与を足し合わせると答えは$\mathrm{O}(\frac{m+n}{b-a})$項の二項係数の和で表せる。

関連：[yukicoder No.1388 Editorial 解法2](https://yukicoder.me/problems/no/1388/editorial)

### 例題

#### 自作問題 k-括弧列

UOJやOEISに同じ数列が答えになる問題があるのを知ってボツにした問題。

> 括弧の種類が$k$種類である長さ$2N$の良い括弧列は何通り？ $k \leq N \leq 10^6$

良い括弧列の定義はエスパーしてください。(は？)エスパーしたくない人は次の等価な問題に言い換えてください。

> 葉が$N$枚で深さが$k$以下の根付き二分木は何個？

この問題をグリッド上のパスの問題に落とすと次のように言い換えられる。

> $(0,0)$から$(N,N)$への$y \leq x \leq y+k$を満たすようなパスは何通り？

この問題を鏡像法+包除原理で解けばよい。

(なお、形式的冪級数を利用すると$N=1$から$N=M$までの解を$\mathrm{O}(M \log M)$で列挙できるのでそちらも抑えておくと良さそう。)

#### [yukicoder No.1388 Less than K](https://yukicoder.me/problems/no/1388)

> A君とB君がグリッド上を$(1,1)$から$(H,W)$まで最短距離で歩く。二人のマンハッタン距離が常に$K$以下になる歩き方は何通り？ $H,W\leq 2\times 10^5$

writer解は$\mathrm{O}((H+W)^{1.5})$、コンテスト中の自分の提出はFFTで$\mathrm{O}((H+W)\log (H+W))$だったが、線形解法が後に発見された。

簡単のため$H\leftarrow H-1,W \leftarrow W-1, K \leftarrow \lfloor \frac{K}{2} \rfloor$と置き換えて考察する。

問題文のグリッドとは別のグリッド$(u,v)$を作り、グリッド上の$u$軸方向をA君が$x$軸方向に進む操作、$v$軸方向をB君が$y$軸方向に進む操作に一対一対応させる。するとこの問題は

- 一回の操作で$(u,v)$から$(u,v),(u+1,v),(u,v+1),(u+1,v+1)$のいずれかに進む。
- $|u-v| \leq K$より外側に出てはいけない。
- $(0,0)$を始点として$H+W$回操作した後に$(H,H)$にいる場合の数は？

と言い換えられる。ここで操作が$y=x\pm (K+1)$に対して対称なので鏡像法を適用することが出来るから、鏡像法+包除原理で$\mathrm{O}(H+W)$で解くことが出来る。

#### [yukicoder No.1241 Eternal Tours](https://yukicoder.me/problems/no/1241)

> $(2^X-1) \times (2^Y-1)$のグリッドの$(a,b)$を始点として(何もしない or 上下左右いずれかに$1$マス動く)操作を$T$回繰り返す。操作後に$(c,d)$に着く通りの数は？
>
> $X+Y \leq 18, T \leq 10^{18}$

(Editorialでは始点を増やす方法で説明しているが、自分は終点を増やす方で通したのでそちらで説明する。)

この問題では動き方が4方向になったが、この場合は上下左右どの向きに反転しても操作できる方向が変わらないため、鏡の貼り方も自由に貼ることが出来る。

$x=0,2^X$と$y=0,2^Y$に鏡を置いて考えると、仮想的な終点およびその寄与は整数$(n,m)$を用いて次の4通りで表せるとわかる。

- 座標：$(2^{X+1}n+c,2^{Y+1}m+d)$　寄与：$+1$
- 座標：$(2^{X+1}n+c,2^{Y+1}m-d)$　寄与：$-1$
- 座標：$(2^{X+1}n-c,2^{Y+1}m+d)$　寄与：$-1$
- 座標：$(2^{X+1}n-c,2^{Y+1}m-d)$　寄与：$+1$

さらに、仮想的な終点の位置が$x$座標が$2^{X+1}$周期、$y$座標が$2^{Y+1}$周期なのに注目すると、遷移を$\mod (x^{2^{X+1}}-1)(y^{2^{Y+1}}-1)$でまとめて計算しても答えを得られるとわかる。よってFFTを利用した高速化で$\mathrm{O}(2^{X+Y}(X+Y)\log T)$で計算すればよい。

#### [AGC***-*](https://atcoder.jp/contests/agc021/tasks/agc021_e)

(鏡像法がメイン部分ではないのでネタバレ防止)

うまく言い換えると経路の問題に落ちて鏡像法でエイをすると解ける、簡単だな！→36AC 3WAになって発狂…(AGC本番じゃなくてよかった…)

細かいところまで丁寧に考察を詰める必要がある問題。コンテスト中の提出を見るとapiad,cospleermusoraなど上位のコンテスタントも微妙なWAにハマっているようだ、恐ろしい…

## Young tableau

[Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A4%E3%83%B3%E3%82%B0%E5%9B%B3%E5%BD%A2)

[hotmanさんの記事](https://qiita.com/hotman78/items/bbad58e5042da7837334)を参考にしました。

### ヤング図形(Young diagram)

ヤング図形とは正方形を下に行くにしたがって一列当たりの正方形の個数が少なくなるように左揃えに並べた図形を言う。(図を見たほうが早い。)

正方形$n$個からなるヤング図形は、整数$n$の分割と一対一対応している。ここで分割とは、整数の組$(k_1,k_2,\ldots,k_n)$が

- $n = \sum_{1 \leq i \leq n} k_i$
- $k_1 \geq k_2 \ldots \geq k_n$

を満たすことを言い、$i$列目の正方形の個数が$k_i$個であるヤング図形と対応している。

### 共役ヤング図形

ヤング図形を対角線に沿って反転したものを共役ヤング図形と呼ぶ。例えば、分割$(5,4,1)$に対応するヤング図形の共役ヤング図形は分割$(3,2,2,2,1)$に対応する。

共役ヤング図形を利用することで次の定理が証明できる。

> $k$個以下の整数からなる分割の個数と、$k$以下の整数からなる分割の個数は一致する。

証明はそれぞれの分割が1列当たりの正方形が$k$個以下であるヤング図形の集合、および共役ヤング図形の集合に対応することから従う。

### Young Tableau(ヤング盤)

ヤング盤とはヤング図形の$n$個の正方形に$1$から$n$までの整数を次の条件を満たすように配置したものを言う。

- 各行内で数が左から右に向けて増加する。
- 各列内で数が上から下に向けて増加する。

特に$1,2,\ldots,n$が1回ずつ登場するヤング盤を標準盤、そうでないものを半標準盤と呼ぶ。

### フック長の公式(Hook length formula)

あるヤング図形について、その形をした標準盤を数え上げる公式をフック長の公式と呼ぶ。

分割$\lambda=(\lambda_1,\ldots,\lambda_m)$に対応するヤング図形のマス$(i,j)$に対してフック長$H_\lambda(i,j)$を$a=i \wedge b \geq j$または$a \geq i \wedge j = b$を満たすマス$(a,b)$の個数と置く。この時、標準盤の個数$d_\lambda$は

$$d_\lambda = \frac{n!}{\prod_{i,j} H_\lambda(i,j)}$$

で計算出来る。

#### 例：カタラン数

カタラン数$C_n$の有名な言い換えの1つに「$2 \times n$のマス目の標準盤の個数」が挙げられる。よってカタラン数はフック長の公式より

$$C_n = \frac{(2n)!}{n! (n+1)!}$$

であるとわかる。

### Skew tableau

ヤング図形から小さいヤング図形を取り除いたものをskew diagramと呼ぶ。例えば

> ＸＸＯＯＯ <br>
> ＸＯＯＯ <br>
> ＯＯ <br>
> ＯＯ

のような形は条件を満たす。(便宜上$(5,4,2,2) / (2,1)$のように表す。)

skew diagramのマスに数を入れたものをskew tableauと呼ぶ。skew tableauに対してもフック長の公式を考えることが出来る。

図形が分割$\lambda,\mu$を用いて$\lambda / \mu$の形で表せるとする。初めに$\lambda$の各マスのフック長を計算しておく。元の図形の

> ＸＯ <br>
> ＯＯ

の部分を

> ＯＯ <br>
> ＯＸ

に替える操作を繰り返すことで出来る全ての図形を考える。例えば

> ＸＸＯ <br>
> ＸＯＯ <br>
> ＯＯＸ

の場合はあり得る図形は下の5つである。

> ＸＸＯ　ＸＯＯ　ＸＸＯ　ＸＯＯ　ＯＯＯ <br>
> ＸＯＯ　ＸＯＸ　ＯＯＯ　ＯＯＸ　ＯＸＸ <br>
> ＯＯＸ　ＯＯＸ　ＯＸＸ　ＯＸＸ　ＯＸＸ

各図形に対して（そのマスの$\lambda$におけるフック長)の逆数の積を計算したあと、全ての図形に対する総和を取り($\mu$のマス目の数の階乗)を掛けたものがskew tableauの標準盤の個数になる。

### 例題

#### [EDPC-T Permutation](https://atcoder.jp/contests/dp/tasks/dp_t)

> 整数$N$と`<`と`>`からなる長さ$N-1$の文字列$S$が与えられる。次の条件を満たす長さ$N$の順列$p_1,p_2,\ldots,p_n$は何通りあるか？
> - $S_i$が`<`のときは$p_i\lt p_{i+1}$であり、$S_i$が`>`のときは$p_i\gt p_{i+1}$である。
>
> $N \leq 3000, \mod 10^9 + 7$

この問題は言い換えると幅1のskeu diagram$(\lambda,\mu)$の標準盤の数え上げに帰着する。

このときskeu diagramを置き換えにより変形させた図形は、$\lambda$をグリッドと見なしたときの経路に言い換えられることがわかる。よってこの問題はヤング盤に対する$\mathrm{O}(N^2)$または$\mathrm{O}(N\log^2 N)$のDPで計算できる。

#### [ゆるふわ競プロオンサイト#3 Yet Another Cake Division](https://www.hackerrank.com/contests/yfkpo3-1/challenges/yet-another-cake-division)

TODO:書く

## Lindström–Gessel–Viennot lemma

[Wikipedia](https://en.wikipedia.org/wiki/Lindstr%C3%B6m%E2%80%93Gessel%E2%80%93Viennot_lemma)

DAGであるグラフ$G$および始点の集合$A=\lbrace a_1,a_2,\ldots,a_n\rbrace$、終点の集合$B=\lbrace b_1,b_2,\ldots,b_n\rbrace$が与えられる。頂点$a$から頂点$b$へのパス$P$に対して、パス上の辺の重みの積を$\omega(P)$と表す。そして、関数$e(a,b)$を$e(a,b) = \sum_{P:a\rightarrow b} \omega(P)$と定める。
- 特に全ての辺の重みが$1$の時、$\omega(P)$は$a$から$b$へのパスの通り数に一致する。

次に、以下の条件を満たす$n$要素のパスのタプルを$A$から$B$へのパスのタプル$(P_1,\ldots,P_n)$と呼ぶ。
- ある順列$\sigma$が存在して、パス$P_i$は$a_i$から$b_{\sigma(i)}$へのパスである。(この時の順列を$\sigma(P)$と表す。)
- $i\not = j$のとき、パス$P_i$とパス$P_j$は共有点を持たない。

この時、パスのタプルの集合と、$M_{i,j}=e(a_i,b_j)$を満たす$n\times n$行列$M$との間には以下の関係式が成り立つ。(Lindström–Gessel–Viennot lemma)

$$\det(M) = \sum_{(P_1,\ldots,P_n):A\rightarrow B} \mathrm{sgn}(\sigma(P)) \prod_{i=1}^n \omega(P_i)$$

特に条件を満たすパスのタプルが$\sigma(P)=(1,2,\ldots,n)$の時に限り、かつ辺の重みが全て$1$である時、$\det(M)$は$a_i\rightarrow b_i$への交差しないパスのタプルの通り数に一致する。

### 例題

TODO:書く

## ad-hocなテクニック

ad-hocな問題をまとめる。

### AGC001 E BBQ hard

> 整数列$A_1,\ldots,A_N$,$B_1,\ldots,B_N$について、
> $$ \sum_{i \lt j}\binom{A_i+A_j+B_i+B_j}{A_i+A_j}$$
> 
> を求めよ。
> 
> $N \leq 200000, A_i,B_i \leq 2000$

思いついた瞬間に感動した問題。

$\binom{A_i+A_j+B_i+B_j}{A_i+A_j}$が$(-A_i,-B_i)$から$(A_j,B_j)$への経路数であるのに注目すると、次のアルゴリズムで$1\leq i,j \leq N$での総和が求まる。

- 初期状態で$(-A_i,-B_i)$に$1$を記入してグリッド上の経路のDPを行い、$(A_i,B_i)$の値の和を取る。

あとは不要な部分の寄与を取り除けば答えが求まる。

### Japanese Knowledge

[こちらの記事](https://nyaannyaan.github.io/blog/article/upsolve/gp_of_tokyo/)に書いたので略。

### 二項係数のprefix sumの多点評価

> $(n,m)\ (m \leq n \leq N)$の組が$N$個与えられる。各$(n,m)$に対して
> $$ F(n,m) = \sum_{k=0}^m \binom{n}{k}$$
>
> を計算せよ。 $N \leq 2 \times 10^5$程度
> 

[EntropyIncreaser氏のブログ](https://www.luogu.com.cn/blog/EntropyIncreaser/post-ying-ye-ri-zhi-2021126-duo-xun-wen-zu-ge-shuo-qian-zhui-hu)が出典。

#### $\mathrm{O}(N^{1.5})$解

二項係数をグリッド上の各点に言い換えると$n,m$を$1$増減させたときの値の変化を$\mathrm{O}(1)$で記述できるので、Mo's Algorithmで計算できる。

#### $\mathrm{O}(N^{\frac{6}{5}} \log N)$解

$$v_{n,m} = \left( F(n,m), \binom{n}{m} \right) ^T$$

とおくと

$$v_{n,m+1}=
\left(
  \begin{array}{cc}
  1 & \frac{n-m}{m+1} \newline
  0 & \frac{n-m}{m+1}
  \end{array}
\right) v_{n,m}
$$

$$v_{n+1,m}=
\left(
  \begin{array}{cc}
  2 & -1 \newline
  0 & \frac{n-1}{n-m+1}
  \end{array}
\right) v_{n,m}
$$

という式が成り立つので、多項式行列のprefix productを計算する問題に帰着する。そこで適当なブロックの大きさ$B$を取ってmin-25's algorithmにより$v(iB,jB)$を計算する。そして、各クエリに対しても最も近い点からmin-25's algorithmで残りの部分を補間する。計算量は

- 多点評価で$\mathrm{O}(\frac{N}{B} \times \frac{N}{B}\log {\frac{N}{B}})$
- クエリごとの計算で$\mathrm{O}(N \times \sqrt{B} \log B)$

になるので、$B = N^{\frac{2}{5}}$と置いたとき$\mathrm{O}(N^{\frac{6}{5}} \log N)$になる。

#### $\mathrm{O}(N \log^ 3 N)$解

行列を$n$を変数とみなした多項式行列として考える。

$$ (m+1)! v_{n,m+1}=
\left(
  \begin{array}{cc}
  m+1 & n-m \newline
  0 & n-m
  \end{array}
\right) m! v_{n,m}
$$

であるから、$v_{n,0}$から$v_{n,m}$までは$m$次の$n$の多項式行列の乗算で表されることがわかる。そこで、セグメントツリーの要領で行列を乗算した木を作った後に、各ノードで必要な$n$について多点評価を行い必要な行列を得れば答えが求まる。計算量は各クエリについて多点評価を最大$\log N$回行う部分がボトルネックで$\mathrm{O}(N \log^3 N)$になる。

頑張って実装したが$N=2^{18}$でMo'sの5倍遅かったので封印…(monicな$2^n$次の乗算と多点評価を内部で行っているので色々とテクニックを使えば爆速になりそうだが、実装する気力ゼロ…)うまくやればlogが一個落ちないかなあと思ったがEI氏が書いてないってことは無理なんだろうなあ…

### [2019 ICPC Asia-East Continent Final B. Black and White](https://codeforces.com/gym/102471/problem/B)

TODO: 解く

## FPS

FPSパンチで解けるグリッド問題をまとめる。

### カタラン数

説明不要。

$$C(x) = \frac{1 - \sqrt{1 - 4x}}{2x}$$

また、漸化式$C_{k+1} = \frac{4k+2}{k+2} C_k$を利用するとmin-25's algorithmで第$k$項を$\mathrm{O}(\sqrt{k} \log k)$で計算できる。

### (Large) Schröder numberとDelannoy Number

書きかけ

(Large) Schröder number $S_n$とは次の条件を満たす通りの個数である。

> $(0,0)$から$(n,n)$まで$y \leq x$を満たしながら下,右,右下のいずれかを選んで進む経路の数は？

関連:[分割可能な順列](https://en.wikipedia.org/wiki/Separable_permutation)

また、カタラン数と二項係数の関係に対応するものとして、(Large) Schröder numberに対してDelannoy Numberと呼ばれる数がある。Delannoy Number$D_{a,b}$は次の条件を満たす経路の数である。

> $(0,0)$から$(a,b)$まで下,右,右下のいずれかを選んで進む経路の数は？

[参考](https://archive.lib.msu.edu/crcmath/math/math/d/d096.htm)

### [CF 755G](https://codeforces.com/contest/755/problem/G)

> $1$から$n$までの数字が書かれた$n$個のボールから$m$個のグループを作る。各グループは1個のボール、または連続する2個の数字が書かれたボールから構成される。
> $n,k$が与えられる。$1\leq m\leq k$に対して条件を満たす組み合わせは何通りか？
>
> $n \leq 10^9, k \leq 2^{15}$

この問題はグリッド上の経路の数え上げに言い換えられる。

> $(0,0)$から下,右,右下のいずれかを選んで$(n-k,k)$まで進む経路の個数$f_{n,k}$は？

母関数の漸化式を考えると

$$f_0=1,f_1=x+1,f_{i+2}=(x+1)f_{i+1}+x f_i$$

になるので、特性解を求めて一般項を求めると、

$$\lambda_+ (x) = \frac{x+1+\sqrt{x^2+6x+1}}{2}$$

$$\lambda_- (x) = \frac{x+1-\sqrt{x^2+6x+1}}{2}$$

と表したとき

$$f_n (x) = \frac{\lambda_+(x)^{n+1}-\lambda_-(x)^{n+1}}{\sqrt{x^2+6x+1}}$$

であるとわかる。よってこの問題は$\mathrm{O}(k \log k)$で計算できる。
