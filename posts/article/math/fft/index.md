---
title: "FFT 高速化記"
date: 2021-05-02T21:31:00+09:00
draft: false
---

**目指せLC mod 1e9+7 100ms切り**

やったこと逐次メモしていく。やる気が無くなったらやめる

### やること

- 実数FFTを高速化する
  - NTTをこれ以上高速化するのはしんどすぎてやりたくない
  - 実数FFTはまともに書いたことがないので伸びしろありまくり
  - SIMD初心者なので色々アーキ周りの知識をつけたい

### 読む

[Luzhiled's Library](https://ei1333.github.io/library/math/fft/fast-fourier-transform.cpp)　おまたせ　いつもの　親の顔より見たページ　

[AC](https://atcoder.jp/contests/atc001/tasks/fft_c)　[LC](https://judge.yosupo.jp/problem/convolution_mod_1000000007)

### アルゴリズムの理解

FFTを3回から1.5回に減らす謎の高速化アルゴリズムと、Python勢がLCで使っているToom-3を勉強する

#### 高速化1(Halfcomplex-format DFT)

> $W$は$1$の$M$乗根とする。また、数列$(f_i),(g_i)$は実数からなる長さ$M$の列とする。
>
> $$A_k = \sum_{n\lt M} (f_n+ig_n)W^{nk}$$
>
> と
>
> $$H_k = \left(\sum_{n\lt M} f_n W^{nk} \right)\left(\sum_{n\lt M} g_n W^{nk} \right)$$
>
> の関係式は？

$F_k,G_k$を$f,g$をフーリエ変換した列として定義する。

$k=0,\frac{M}{2}$の時は$F_k,G_k$はともに実数なので$A_k$の実部と虚部がそのまま$F_k,G_k$になる。$k\ne 0,\frac{M}{2}$の場合を考える。

$$A_k = F_k + i G_k$$

$$A_{-k} = \overline{F_k +iG_k}$$

であるから、

$$A_k + \overline{A_{-k}} = 2 F_k$$

$$A_k - \overline{A_{-k}} = 2 i G_k$$

を得るので辺々掛けて求めるものを得る。

#### 高速化2(Halfcomplex-format DFT)

> $M = 2m, W$は$1$の$M$乗根とする。また、数列$(a_i)$は実数からなる列とする。
> 
> $$A_k = \sum_{n \lt M} a_n W^{nk}$$
>
> であるとき、列$(a_0+i a_1, a_2 + i a_3 ,\ldots, a_{M-2} + i a_{M - 1})$をフーリエ変換した列
> 
> $$B_k = \sum_{n \lt m} (a_{2n}+i a_{2n+1}) W^{2nk}$$
>
> を考える。列$A$と列$B$の関係式は？

$$A_{k,e} = \sum_{n \bmod 2 = 0} a_{n} W^{nk}$$

$$A_{k,o} = \sum_{n \bmod 2 = 1} a_{n} W^{nk}$$

とおくと、

$$B_k = \sum_{n \bmod 2 = 0} a_{n} W^{nk} + i \sum_{n \bmod 2 = 1} a_{n} W^{(n-1)k}$$

$$= A_{k,e} + i W^{-k}  A_{k,o}$$

を得る。さらに、

$$A_k = A_{k,e} + A_{k,o}, A_{k+m} = A_{k,e} - A_{k,o}$$

より

$$2A_{k,e} = A_k + A_{k+m}$$

$$2A_{k,o} = A_k - A_{k+m}$$

を得るので、

$$2B_k = (A_k + A_{k+m}) + i W^{-k} (A_k - A_{k+m})$$

がわかる。

##### Toom-3

Karatsubaだと誤差落ちするという欠点を解消するためにPython勢が使用しているアルゴリズム。

詳細は[wiki](https://en.wikipedia.org/wiki/Toom%E2%80%93Cook_multiplication)に、丸投げ…

### 投げる

注：LCはその日のサーバーの機嫌次第でタイムが1割変動するのに留意する必要がある。

スタート地点　[575ms](https://old.yosupo.jp/submission/46509)

defineあれこれ　余り変わらず　[553ms](https://old.yosupo.jp/submission/46510)

三角関数を呼ぶ回数を減らしたらそれだけでだいぶ早くなって草　[358ms](https://old.yosupo.jp/submission/46513)

Cooley-Tukeyを4基底に変える　[297ms](https://old.yosupo.jp/submission/46543)

キャッシュブロッキング コード量が倍になる代わりに効果が誤差レベルなので廃案… [292ms](https://judge.yosupo.jp/submission/46573)
  - `a`でブロッキングしても`w`をランダムアクセスするせいでブロッキングの効果が薄いのか？

三角関数を無くす 手元だと30ms程度伸びたがLC上では変化なし… [302ms](https://old.yosupo.jp/submission/46599)

過去の提出を読んでいたら[Karatsubaを通している提出](https://judge.yosupo.jp/submission/2845)に気づく。参考にしてゴッソリ書き換えて大幅に高速化。 [182ms](https://old.yosupo.jp/submission/46604)
  - 正当性が怪しいが、通っているので問題ない(は？) ($N=2^{20}$だと落ちる気がする…)

高速化のために構造体を取っ払ってベタ書き(しんどい) [180ms](https://old.yosupo.jp/submission/46633)

待望のSIMD化です→全く早くなってないが？HELP [179ms](https://old.yosupo.jp/submission/46645)

プロファイラを起動 とりあえず激重`llround`くんを消す [171ms](https://old.yosupo.jp/submission/46674)

行きだけSIMD化したバージョンとそうでないバージョンを作って比較する

- 非SIMD
  - genw 6.45% 行き 52.62% 帰り 33.47% 
- SIMD
  - genw 6.17% 行き 46.81% 帰り 34.16%

SIMD版がほんのわずかに高速化されてそう、それでもわずか過ぎない？

気分転換に非本質部分(入出力周り)を高速化　[165ms](https://judge.yosupo.jp/submission/46700)

アセンブリを覗いてみる
  - SIMDベタ打ちしなくても自動でSIMD化されとるやんけ！？知らなかった…

これはNTT3回に勝てないんじゃないか？

- 真面目に考える
  - FFT 回数
    - 実数 6回 mod 9回
  - 乗算の速度と回数
    - 実数 2クロック程度 mod 2.5クロック程度
    - 実数がmodの0.667倍の回数
  - 空間計算量
    - 実数がmodの10倍(ヤバ)
  - ロード/ストア命令の回数
    - 実数がmodの2.667倍の回数
  - 速度(LC,入出力を除く)
    - 実数 140ms程度 mod 90ms程度

-> 明らかにロード/ストアが重すぎるせい

キャッシュ回りのテクを調べる　[最適化マニュアル](https://www.intel.ru/content/dam/www/public/ijkk/jp/ja/documents/developer/iaopt_j.pdf)

prefetchを効かせる　早くなったのか…？　[160ms](https://judge.yosupo.jp/submission/46709)
