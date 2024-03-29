# GTCL-For-Python
[![Python](https://img.shields.io/badge/-Python-F9DC3E.svg?logo=python&style=flat)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-MIT-F9DC3E?style=flat)](https://github.com/konekato/gtcl/blob/master/LICENSE)
[![CodeSize](https://img.shields.io/github/languages/code-size/konekato/gtcl?style=flat&color=F9DC3E)]()
[![GitHub followers](https://img.shields.io/github/followers/konekato?label=Follow&style=social)](https://github.com/konekato)

Meaning **Go To CLass**.  
コマンドラインからオンライン授業(へのURL)を開きます。

## 目次
- [GTCL-For-Python](#gtcl-for-python)
  - [目次](#目次)
  - [環境](#環境)
  - [環境構築](#環境構築)
      - [リポジトリをクローン](#リポジトリをクローン)
      - [pythonの環境を構築](#pythonの環境を構築)
      - [設定ファイル保存用ディレクトリを作成](#設定ファイル保存用ディレクトリを作成)
      - [セットアップ](#セットアップ)
  - [使用方法](#使用方法)
    - [実行系](#実行系)
      - [手動で実行](#手動で実行)
    - [設定系](#設定系)
      - [設定確認](#設定確認)
      - [設定変更](#設定変更)
  - [カスタマイズ](#カスタマイズ)
      - [曜日数を変更する](#曜日数を変更する)
      - [時限数を変更する](#時限数を変更する)
      - [時限の時間を変更する](#時限の時間を変更する)
      - [エイリアスに設定する](#エイリアスに設定する)
  - [ライセンス](#ライセンス)

---
## 環境
- [Python 3.7(.7)](https://www.python.org/)
  - [Pipenv](https://github.com/pypa/pipenv) : python環境を管理してくれるライブラリ
  - [tabulate](https://github.com/astanin/python-tabulate) : コマンドライン上で表を表示してくれるライブラリ
  
***※ 現在、Windows Subsystem for Linux には対応しておりません。ご理解のほどよろしくお願いいたします。***

## 環境構築
#### リポジトリをクローン
```bash
$ git clone https://github.com/konekato/gtcl.git
```

#### pythonの環境を構築
```bash
$ cd gtcl
$ pipenv install
$ pipenv shell
```

#### 設定ファイル保存用ディレクトリを作成
```bash
$ mkdir src/gtcl-for-python/data
```

#### セットアップ
```bash
$ python3 src/gtcl-for-python/manage.py setup
各授業のURLを入力してください。（returnキーでスキップ。）
月曜日
1限目:
...
```

以上で環境の構築は完了です。

---
## 使用方法
以下は全て`gtcl`ディレクトリ上で行われています。
```bash
$ pwd
[clone先]/gtcl

$ python3 src/gtcl-for-python/manage.py
使用方法: python3 src/manage.py [引数]

引数は以下の通りです。

 setup      初期セットアップ

 gtcl       実行
 go         手動で実行

 confirm    設定確認
 update     設定変更

```

### 実行系
`gtcl: 今の時間の授業に飛びます。`
```bash
$ python3 src/gtcl-for-python/manage.py gtcl
```

#### 手動で実行
`go: 指定した曜日と時限の授業に飛びます。`
```bash
$ python3 src/gtcl-for-python/manage.py go
いつが良い？
曜日を選択してください。（ 火 のように入力してください。）
火
時限を選択してください。（ 3 のように入力してください。）
...
```

### 設定系
#### 設定確認
`confirm: 登録しているURLを確認します。`
```bash
$ python3 src/gtcl-for-python/manage.py confirm

https:// は省略
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
|    | 月                       | 火                       | 水                       | 木                       | 金                       | 土   |
+====+=========================+=========================+=========================+=========================+=========================+=====+
|  1 | xxxxxx.zoom.us/dammy... |                         |                         |                         | xxxxxx.zoom.us/dammy... |     |
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
|  2 |                         | xxxxxx.zoom.us/dammy... | xxx.box.com/dddammyy... |                         | xxxxxx.zoom.us/dammy... |     |
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
|  3 |                         |                         | xxx.xx.xxxxxx.ac.jp/... | xxxxxx.zoom.us/dammy... |                         |     |
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
|  4 |                         |                         |                         |                         |                         |     |
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
|  5 |                         |                         |                         |                         |                         |     |
+----+-------------------------+-------------------------+-------------------------+-------------------------+-------------------------+-----+
```

#### 設定変更
`update: 指定した曜日と時限の授業の登録を変更します。`
```bash
$ python3 src/gtcl-for-python/manage.py update
設定内容を編集します。
何曜日の何限のURLを変更しますか？
曜日を選択してください。（ 火 のように入力してください。）
火
時限を選択してください。（ 3 のように入力してください。）
3
更新する授業のURLを入力してください。
...
```

---
## カスタマイズ
#### 曜日数を変更する
src/gtcl-for-python/config.py:
```python
DOW_LIST = ['月', '火', '水', '木', '金', '土'] # 変更する
~省略~
EMPTY_URLS_DICT = {
    # 任意で変更
}
```

#### 時限数を変更する
src/gtcl-for-python/config.py:
```python
~省略~
EMPTY_URLS_DICT = {
    # 任意で変更
}
~省略~
PERIOD_NUMBER = 5　# 変更する
```

#### 時限の時間を変更する
src/gtcl-for-python/config.py:
```python
~省略~
CLASS_TIME_LIST = ['09:10', '11:00', '13:30', '15:20', '17:10', '19:00'] # 変更する
```
デフォルトで開始10分前からその授業へ飛ぶようになっている。(電大時間)

#### エイリアスに設定する
1. エイリアスの登録
~/.bashrc
```bash
alias gtcl='python3 [clone先]/gtcl/src/gtcl-for-python/manage.py gtcl"
~省略~
```

2. bashrcの適用
```bash
source ~/.bashrc
```

---
## ライセンス
[MIT License](https://github.com/konekato/gtcl/blob/master/LICENSE)の元、提供されています。
