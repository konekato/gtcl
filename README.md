# GTCL
Meaning **go to class**.

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
$ mkdir src/data
```

#### セットアップ
```bash
$ python(3) src/manage.py setup
```

## 使用方法
今の時間の授業に飛びます。
```bash
$ python(3) src/manage.py gtcl
```

#### 手動で実行
```bash
$ python(3) src/manage.py go
```

#### 設定確認
```bash
$ python(3) src/manage.py confirm
```

#### 設定変更
```bash
$ python(3) src/manage.py update
```
