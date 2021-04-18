---
title: "ドはまりしたことをメモするアレ"
date: 2021-04-18T16:28:29+09:00
draft: false
---

- 色々罠にハマってきたけどメモってないせいで忘れていることが多い(バカ)
- 思い出したら絶対ここに書く

## C++

- staticメンバ変数は初期化順が不定なので雑に初期化してはいけない
  - [具体例](https://technologicaladvance.blog.fc2.com/blog-entry-165.html)
  - 初期化順が怖いときはstaticメンバ関数を使った方がいい

- `minmax(a, b)`は参照が帰るので、`a,b`の寿命が切れるとバグる

## データ構造

- LCTの頂点$u,v$に対して、$u,v$パスの$u$の隣の点$p$を得る方法

```cpp
lct.evert(vs[v]); // vを根にする
lct.expose(vs[u]); // uをsplay木の根にする
auto p = vs[u]->l; // splay木の上で隣の点は？
while(true) { // 注意: うっかりp->lとしない
  if(p->rev) lct.push(vs[p]);
  if(p->l == nullptr) break;
  p = p->l; 
}
```
