$(document).on('turbolinks:load', function() {

var search_list = $("#user-search-result");
var member_result = $("#member_result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a></div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<p class="chat-group-user__name">${user}</p>`
    search_list.append(html);
  }

  function addMember(name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'data-user-id=${user_id}>削除</a></div>`
    member_result.append(html);
  }

  function removeMember() {
    var html = ``
    member_result.append(html);
  }

  var m = 10;
  var old_list = new Array(m);//使ったユーザーのリスト
  for(var i = 0; i < m; i++){
    old_list[i] = 0;
  }
  console.log(old_list);

  $('#user-search-field').on("keyup",function() {
    var input = $("#user-search-field").val();
    if(input !== ""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json',
      })
      .done(function(data){
        $("#user-search-result").empty();
        if (data.length !== 0) {
          data.forEach(function(user){
            if(old_list[user.id] == 0){
              appendUser(user);
            }
          });
        } else {
          $("#user-search-result").empty();
          appendNoUser("一致する名前がありませんでした");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    }
  });

  $(document).on('click','.user-search-add',function(){
    var name = $(this).data('user-name');
    var user_id = $(this).data('user-id');
    old_list[user_id] = 1;//追加したユーザーをold_listに追加していく
    console.log(old_list);
    $(this).parent().remove();
    addMember(name,user_id);
  });
  $(document).on('click','.user-search-remove',function(){
    var user_id = $(this).data('user-id');
    old_list[user_id] = 0;//削除したユーザーをold_listから削除する
    console.log(old_list);
    $(this).parent().remove();
    removeMember();
   });
});
