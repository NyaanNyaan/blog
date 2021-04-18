---
title: "確率数理工学"
date: 2021-04-10T01:11:37+09:00
draft: true
---

# 1. 確率空間

「サイコロを振る」といった１つ１つの**試行**の結果、観測される**事象**の確率を定める

試行(trial)
- $\Omega$：**標本空間**
- $\omega \in \Omega$：**標本点**
  - 例：サイコロ
  - $\Omega = \lbrace 1,2,3,4,5,6\rbrace$
  - $\omega = 2$など、サイコロの目

Def (事象)
- $A \subset \Omega$：**事象**
- $A^c := \Omega - A$：余事象(complementのc)
- $= \lbrace \omega \in \Omega \vert \omega \not \in A \rbrace$
- $A_1 \cup A_2$ 和事象
- $A_1 \cap A_2$ 積事象

事象に確率を定めたい
$\to$標本空間$\Omega$が有限集合なら難しくない(例：サイコロ)
$\to$連続・無限も扱いたい
$\to$下手にやると矛盾が起こることが知られている
$\to$確率を定義しても矛盾が生じない体系を用意する(無限和・積を取っても問題ない範囲を定めたい)
$\to$「$\sigma-$加法族」「可測空間」「確率測度」

Def. **($\sigma-$加法族)** 

(部分集合族…「部分集合」の集合)

$\Omega$の部分集合族$\mathcal{F}$が$\sigma-$加法族
$\iff$
1. $\Omega \in \mathcal{F}$
2. $A \in \mathcal{F} \to A^c \in \mathcal{F}$
3. $A_1,A_2,\ldots, \in \mathcal{F}$ (**可算無限個**)
  $\to {\displaystyle \bigcup_{n=1}^\infty} A_n$