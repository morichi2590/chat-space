# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* DB設計

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|text|null:false,index|
|email|text|null:false,unique:true|
|password|text|null:false|

### Association
- has_many :groups,through: :groups_users
- has_many :groups_users
- has_many :massages

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|text|null:false|

### Association
- has_many :users,through: :groups_users
- has_many :groups_users
- has_many :massages

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|user_id|references|null:false,foreign_key:true|
|group_id|references|null:false,foreign_key:true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|references|null:false,foreign_key:true|
|group_id|references|null:false,foreign_key:true|

### Association
- belongs_to :user
- belongs_to :group
