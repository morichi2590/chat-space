  json.body  @message.body
  json.image  @message.image.url
  json.created_at  @message.created_at.in_time_zone('Tokyo').strftime("%Y/%m/%d %H:%M")
  json.user_id  @message.user.id
  json.user_name  @message.user.name
  json.group_id  @message.group.id
  json.id  @message.id
