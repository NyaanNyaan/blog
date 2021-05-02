---
title: "ドはまりしたことをメモするアレ"
date: 2021-04-18T16:28:29+09:00
draft: false
---

- 色々罠にハマってきたけどメモってないせいで忘れていることが多い(バカ)
- 思い出したら絶対ここに書く

## ドはまりしたバグ集

- 小数を求める時に`(int)/(int)`としてしまった
  - 小数の式に出てくる整数は`1.`,`2.`,... と書く癖をつけるべき？
  ```cpp
  // 最後、L / 2.が正しい
  x[2] = 1.0 * L / 2 * sin((t - 90) * pi / 180) + L / 2; 
  ```

## C++

- staticメンバ変数は初期化順が不定なので雑に初期化してはいけない
  - [具体例](https://technologicaladvance.blog.fc2.com/blog-entry-165.html)
  - 初期化順が怖いときはstaticメンバ関数を使った方がいい

- `minmax(a, b)`は参照が帰るので、`a,b`の寿命が切れるとバグる

- `__lg(0)`は値がコンパイラによって変わる、非常に危険

- `vector<bool>::operator[]`は参照が返る、余りにも危険
  ```cpp
  auto f = []() {
    vector<bool> dp(1, false);
    return dp[0]; // 参照が返っているので壊れる
  };
  ```

## アルゴリズム

- $n$個のものを$m$個にできるだけ均等に分けるのは
  ```cpp
  rep(i, n) a[i] = (n + i) / m;
  ```
  でうまくいく
  - $a,b\ (\vert a - b \vert \geq m)$を$m$個ずつに$a_i \neq b_i$を満たすように分ける時も使える

- noshi基底で掃き出される基底は**元の要素とは異なる**のに注意
  ```cpp
  vector<int> a{2, 3}, base;
  for(int x : a) {
    for(auto& b : base) x = min(x, x ^ b);
    if(x) base.push_back(x);
  }
  // base = {2, 1}
  ```
  - 元の要素が必要なときは次のようにするのが無難か。
    ```cpp
    vector<int> a{2, 3}, base, buf;
    for(int i : a) {
      int x = i;
      for(auto& b : buf) x = min(x, x ^ b);
      if(x) buf.push_back(x), base.push_back(i);
    }
    ```

## データ構造

- LCTの頂点$u,v$に対して、$u,v$パスの$u$の隣の点$p$を得る方法
  ```cpp
  lct.evert(vs[v]); // vを根にする
  lct.expose(vs[u]); // uをsplay木の根にする
  // splay木の上で隣の点は？
  auto p = vs[u]->l; // 注意:このままではいけない！！
  // 隣の点がvs[u]->lの右の子孫である可能性に注意する
  while(true) { 
    if(p->rev) lct.push(vs[p]);
    if(p->l == nullptr) break;
    p = p->r; 
  }
  ```

## OJ

- OJの現行バージョン(2021.4.29現在)では
  ```cpp
  #define GCC target("avx2")
  ```
  などと書いても無視されるためintrinsticsを使うとCEになるが
  ```cpp
  __attribute__(target("avx2"))) 
  ```
  は無視されないためverifyに通る(なんで？)