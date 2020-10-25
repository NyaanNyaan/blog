---
title: "upsolve(AtCoder 600点以下)"
date: 2020-10-20T12:17:34+09:00
draft: false
tags: ["upsolve"]
---

# upsolve(~600)

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [upsolve(~600)](#upsolve~600)
  - [ABC](#abc)
      - [ABC169-F](#abc169-fhttpsatcoderjpcontestsabc169tasksabc169_f)
      - [ABC170-F](#abc170-fhttpsatcoderjpcontestsabc170tasksabc170_f)
      - [ABC175-F](#abc175-fhttpsatcoderjpcontestsabc175tasksabc175_f)
      - [ABC176-F](#abc176-fhttpsatcoderjpcontestsabc175tasksabc176_f)
      - [ABC178-F](#abc178-fhttpsatcoderjpcontestsabc178tasksabc178_f)
      - [ABC180-F](#abc180-fhttpsatcoderjpcontestsabc180tasksabc180_f)
  - [ABC-like](#abc-like)
      - [AISING2020-E](#aising2020-ehttpsatcoderjpcontestsaising2020tasksaising2020_e)
      - [HHKB2020-F](#hhkb2020-fhttpsatcoderjpcontestshhkb2020taskshhkb2020_f)

<!-- /code_chunk_output -->

## ABC

#### [ABC169-F](https://atcoder.jp/contests/abc169/tasks/abc169_f)

これがdiff: 1605なのかなり信じられない。自力ではまともな解法が思い浮かばなかった。2変数FPSで殴ると$\mathrm{O}(S \log S)$で解けるっちゃ解けるけど…

集合$(T,U)$を状態とみなしてDPを考えて3通りの遷移を考える、というのは全く見えなかった。(ちょっと面白いので覚えときたい)初手で$\sum_A=S$を満たす組み合わせを数える、と言い換えをしたのがマズくて沼にハマってしまった感はある。

#### [ABC170-F](https://atcoder.jp/contests/abc170/tasks/abc170_f)

解けなかったわけではないけどこういうの苦手。

- 自明解法がTLE -> **うまい枝刈りをする** -> **計算量が改善されて通る**

みたいなのがかなり不得手だと思う。こういうのに慣れないと…

この問題の場合は01-BFSについて「現在のマスと同じ手数でたどり着けるマスを踏んだ場合break」という枝刈りを加える。(正当性は明らか) この時、一つのマスを訪問する回数は高々4回になる(1方向につき1回しか訪問しないことが証明できる。)ので計算量が削減できる。

落ち着いて計算量を示せばそこまで難しくないけどそういうのをコンテスト中にやるのが苦手なんだよね…

#### [ABC175-F](https://atcoder.jp/contests/abc175/tasks/abc175_f)

解法は自明なのにコンテスト中にinf時間かけて解けなかったやつ。

なぜ解けなかったのかというと、計算量を見積もらなかった結果、文字列の比較を$\mathrm{O}(1)$でやらなければいけないと思い込んで重実装に走ってしまったから。**計算量を解析する重要性**！！

計算量をまじめに解析すると、文字列の長さの最大を$L$として状態数は$\mathrm{O}(NL)$、一つの状態当たりの遷移は$N$通りなので、愚直に遷移を$\mathrm{O}(L)$で計算しても$\mathrm{O}(N^2L^2 + N^2L\log NL)$でこの問題を解ける。

かなり易しい解析、これくらいなら1分あれば出来る。計算量の自明でない問題では落ち着いて解析をするのが大事か？

#### [ABC176-F](https://atcoder.jp/contests/abc175/tasks/abc176_f)

upsolveでドドドハマリした問題。

解法の方は言われてみるとシンプルなin-place DPなんだけど見えなかったなあ… **遷移がsparseである**という性質を利用して$\mathrm{O}(N^3)$を$\mathrm{O}(N^2)$に落とすみたいなのは典型なので心にとめておきたい。

バグの方は初歩的な添え字ミスで、

`rep(j, N) if(mai[j] != -1) buf.push_back({s, j, mai[j]});`

とすべきところを

`rep(j, N) if(mai[i] != -1) buf.push_back({s, i, mai[i]});`

としていた… こういうのプログラムじゃ検出できないよなあ…-Wallつけてもunused出ないパターンだし。

デバッグの時も添え字に全然注意がいってなかったんだよね。もしかして`{}`でくくっていればこういうバグは防ぎやすいのかなあ、`{}`必ずつける癖をつけるか？

#### [ABC178-F](https://atcoder.jp/contests/abc178/tasks/abc178_f)

計算量のわからない乱択で通した…(おそらくexpected $\mathrm{O}(N \log N)$だが…)

こういう問題の方針の立て方がさっぱりわからない。まともに解くなら不変条件を利用して構築するしかない問題だと思っていたが解説・FAはかなりad-hocな解法だった。

Yesの必要条件(一つの数が高々$N$個)は自明なので十分性を考える。$x$=$1\ldots N$に対して$f(x):=$upper_bound(A,x) - lower_bound(B,x) のように置く。(A,Bにxが存在しないときは0) この時$B$を$\max f(x)$だけ右にrotate shiftしたものが条件を満たすことが証明できる。(証明は少し面倒なので略…)

かなり非自明だし証明も面倒(紙に書けば直感的な理解はできるけど)。こんなんどうやって見つけるんだ。うーん…

#### [ABC180-F](https://atcoder.jp/contests/abc180/tasks/abc180_f)

そこまで難しくないが、

- **$\max(a_1,a_2,\ldots,a_k) = L$の数え上げは$\max(a_1,a_2,\ldots,a_k) \leq L$から$\max(a_1,a_2,\ldots,a_k) \leq L-1$を取り除いたもの**

、という典型をうっかり見落としていて時間を浪費してしまった(これはひどい…)

FPSでも解けるようだ。与えられたグラフはパス(孤立点を含む)と大きさ$2$以上のサイクルからなる。パスの個数は頂点の数と辺の数の差に等しいのでパスの個数は$N-M$個とわかる。次数と場合の数が対応したパスのEGFを$P(x)$とおくと…(以下書きかけ(後で書く))

## ABC-like

#### [AISING2020-E](https://atcoder.jp/contests/aising2020/tasks/aising2020_e)

延々嘘解法を投げ続けなかったが通らなかった問題。

まず、自分は**コンテスト中に嘘解法を投げ続けて通ったためしがほとんどない。**(おそらく嘘を生やすセンスがない。)

- **「嘘解法/TLE解法」を投げるより「考察を深める」「自分の解法の計算量を確認する」**

というのを強く意識すべきなのかなと思う。

この問題は「ラクダの数は$N$以下なので、左右からそれぞれ貪欲してもラクダの衝突は発生しない」という事実に気が付けばあとは易しい貪欲で解ける。(逆にその事実を使わないと高速に解くことはおそらく出来ない。)**考察を深めなかったのが敗因**。

#### [HHKB2020-F](https://atcoder.jp/contests/hhkb2020/tasks/hhkb2020_f)

うーんこういう連続的な確率の問題は苦手…本番は「ある区間にmaxとなりうる点が何個あって…」のような発想で$\mathrm{O}(N^2 log^2 N)$を無理やり通したがこれではそのうち足元をすくわれるのでwriter解を履修する。

まず、 **$N$個の変数の$\max$が$x$** という条件がかなり条件として扱いづらい。これを **$\max$が$x$以下のものが$N$個** とうまく置き換えてよしなにすることで式が扱いやすくなる。(典型)

この時、$x \in [L, R)$に対して$\forall i, x_i < x$である確率は$0,1,\frac{x-L_i}{R_i-L_i}$の積で表されるので、これを利用して$f(x) := $ ($\forall i, x_i < x$である確率)が求まる。

更に、確率密度関数を$g(x)$とおく。すると、$\int_0^x g(x) = f(x) \rightarrow g(x) = f'(x)$となり、$[L,R)$における期待値は$\int_L^R xg(x)=\int_L^R xf'(x)$となる。(**ここ重要**)

全体の計算量は、$f(x)$を更新していくことで$\mathrm{O}(N)$個の区間の期待値を各区間ごとに$O(N)$で計算できるので$\mathrm{O}(N^2)$となる。

感想としては確率密度関数周りの処理が慣れてないのでむずいなーという感じ。こういう内容はそのうち数え上げの新ジャンルとして確立される可能性もあるし、問題解いていくうちに慣れていきたいな。