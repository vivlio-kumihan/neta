### 210209

## => create bookで生成させた本の素をnpm run buildしても本を生成しない問題。

`vivliostyle-cli` が修正されて、それから `create-book` も更新されないと解決しません。

`create-book` は
https://github.com/vivliostyle/create-book/blob/master/templates/default/package.json

```"@vivliostyle/cli": "next",```

になってます。

`next`は `"v3.0.0-rc.1"` なので、これを`latest`に直さないと最新の `v3.0.x` にはならないため。

```
templates/default/package.json
{
  "name": "{{kebab name}}",
  "description": "{{name}}",
  "version": "0.0.0",
  "author": "{{contact}}",
  "scripts": {
    "build": "vivliostyle build",
    "preview": "vivliostyle preview"
  },
  "dependencies": {
    "@vivliostyle/cli": "next",
    "{{theme.name}}": "^{{theme.version}}"
  },
  "license": "{{license}}",
  "private": true
}
```

`@vivliostyle/cli` の最新バージョンをインストールしないといけない。

```
npm i @vivliostyle/cli@latest
```

### 210210

## => githubを使う上での問題。

『.npmignore』を『.gitignore』 にリネームする。

### 210213

## => Markdown file name問題

ファイル名にスペースを入れるとビルド出来ない仕様。

`vivliostyle.config.js`の`entry:[...]`内のファイル名には`スペース`を入れてはいけない。

## => スタイリングをCSSからSCSSへ変更する方法。

`theme` ディレクトリを再帰的にコピーする。

```
cp -R node_modules/@vivliostyle/theme-techbook i-theme
```

* `vivliostyle.config.js` の `'theme: @vivliostyle/theme-techbook'` を  `theme: 'i-theme/theme.css'` に直す｡
* `package.json` の `"scripts": { ...` のところを次のものに変える。

```
  "scripts": {
    "build:pdf": "vivliostyle build",
    "build:css": "sass my-theme/scss/app.scss my-theme/theme.css",
    "build": "run-s build:css build:pdf",
    "preview": "vivliostyle preview",
    "watch:css": "sass --watch my-theme/scss/app.scss my-theme/theme.css",
    "watch": "run-p watch:css preview"
  },
```

* `"dependencies": {`  の下に次のものを加える。

```
    "npm-run-all": "^4.1.5",
    "sass": "^1.32.7",
```

`npm install` を実行する。

これで、`Sass`など必要なものがインストールされて、 `npm run build` で SCSS→CSS変換とCSS組版・PDF生成が行われます。また、 `npm run watch` でSCSS→CSS変換付きでPreviewができる。




249C	⒜
	to
24B5	⒵
1F110	🄐
	to
1F129	🄩
24B6	Ⓐ
	to
24E9	Ⓩ
1F150	🅐
	to
1F169	🅩
1F130	🄰
	to
1F149	🅉
1F150	🅰
	to
1F189	🆉
32D0	㋐
	to
32FE	㋾
24EA	⓪
2460	①
	to
2473	⑳
3251	㉑
	to
325F	㉟
32B1	㊱
	to
32BF	㊿
24FF	⓿
24EB	⓫
	to
24F4	⓴
24F5	⓵
	to
24FE	⓾
2488	⒈
	to
249B	⒛
2474	⑴
	to
2487	⒇
2160	Ⅰ
	to
216B	Ⅻ
2170	ⅰ
	to
217B	ⅻ
3280	㊀
	to
3289	㊉
3220	㈠
	to
3229	㈩
322A	㈪
322F	㈯