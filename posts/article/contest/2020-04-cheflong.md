---
title: "CodeChef April Challenge 2020 Div.1"
date: 2020-04-14T20:26:31+09:00
tag: "contest"
---

(過去記事の移植です。)

- 15位…と思ったら今見たら14位になっている [順位表](https://www.codechef.com/rankings/APRIL20A)

- $\mathrm{mod}$ 1e9+7と998...ばかりで個人的にかなり楽しめたセットでした

#### STRNO,SQRDSUB

- 簡単枠 同値変形をすると解ける

#### ANSLEAK

- マラソン枠 高速化+遷移を工夫しただけの山登りで94点

    - かなり雑な出来だと思ったが、やり込んだ人が少なかったからかDiv1では8番目の成績

- 時間内に山を登り切れないと踏んで焼きなましに書き換えなかったが、高速化の甲斐あって最後の方は$10 ^ 6$回ループが回っていたので焼きなましにすべきだったね…

#### REBIT

- 構文解析やるだけ 再帰下降構文解析を[ここ](http://dai1741.github.io/maximum-algo-2012/docs/parsing/)を見ながら書くと通る

#### PPDIV

- 数学問　メビウス関数を使うと包除の部分は取り除けて$N + \sum _ { i = 2 } ^ {60} - \mu ( i ) \sum _ {2 \leq n \leq \ _i \sqrt {N} }  n ^ i \lfloor \frac{N}{n ^ i} \rfloor$が答えになる

    - これは愚直に計算すると$O(N^ {\frac{1}{2}} ) \  (N \leq 10 ^ {18})$

- 式の見た目がProject Eulerの知識を要求しそうでやばい

- 冷静に考えてPE典型が800人に解かれるわけないだろ！となり式を睨むと、floorの部分の値で場合分けするいつものやつで$\mathrm{O}( N ^ {\frac{1}{3} } )$に落ちて終了

#### FCTRE

- 問題文を読むと、木上のMoをやるだけだとわかる

- ところで木上のMoを書いたことがありますか？僕はありません

    - それどころか長さ2Nのオイラーツアーすら書いたことがなく…(本当に橙？笑)

- [うしさんの記事](https://ei1333.hateblo.jp/entry/2017/09/11/211011)をガン見、parityを持つ実装を参考にしつつMoを書いてAC(うしさんに、感謝！)

- [提出](https://www.codechef.com/viewsolution/31726113)

#### LLLGRAPH

- Line Graph何もわからん

- Edmondのアルゴリズムを貼って部分点を通してあとは撤退…

#### TRIPWAYS

- これ面白かった この記事の本題です

- [問題へのリンク](https://www.codechef.com/APRIL20A/problems/TRIPWAYS)

- 形式的冪級数で殴る(い　つ　も　の)

    - 次数と日数を対応させた母関数を考えると、スタート地点が$\frac{1}{1-L_1 x}$、遷移が$\frac{x}{1-L_i x}$になる

    - DPの部分は、分母を$\Pi _i \left (1-L_i x  \right )$で固定して分子の値を要素として持つと遷移が$\mathrm{O} (N)$、DP全体で$\mathrm{O}(NM)$となりTLに間に合う

- 結局、「分母が$N$次以下の分数式を冪級数展開した時の$x^{D_i}$の係数を求めるクエリに$Q$個答えよ$(N \leq 4000, Q \leq 500, D_i \leq 10 ^ {18} )$」という問題に落ちる

    - →高速kitamasa法で解けた！勝ったな(確信)

        - → TLE… (kitamasa法を使った時の計算量は$\mathrm{O} (QN \log N \log D)$なので、当然落ちる)

- 線形漸化式、kitamasa法じゃ間に合わない、分母が既に因数分解できている…といえば？

- →部分分数分解！

    - [maspyさんの記事](https://maspypy.com/atcoder-g-%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0%E3%81%AE%E7%B7%8F%E5%92%8C%EF%BC%88square869120contest%EF%BC%89)

- 最初は変数変換の部分をFFTで実装したが、$\mathrm{O}( N ^ 2 \log N)$でTLE…(Arbitrary Mod FFTは定数倍が重い…)

    - よくよく考えると変数変換はFFTせずとも部分分数分解に必要な次数だけ計算すればよく、そうするとlogが落ちて$\mathrm{O} (N ^ 2)$になる

    - 追記：分割統治をすると$O(N \log ^ 2 N)$になる

- 部分分数分解が出来れば、あとは各クエリに対して$\mathrm{O} (N \log ( \min(D , \mathrm{mod}) ) )$で答えを求めればよい

- 最終的に全体の計算量は$\mathrm{O} (NM+N ^ 2+QN \log ( \min( D , \mathrm{mod}) ) )$となり、通る

    - [提出](https://www.codechef.com/viewsolution/31817716)　結構勉強になった
