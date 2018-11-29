$(function () {
  function buildHTML(message){
    var html = `<div class="message" data-message-id=${message.id}>
      <div class="message__name"> ${message.user_name} </div>
      <div class="message__time"> ${message.created_at} </div>
      <div class="message__clear"></div>
      <div class="message__text"> ${message.body} </div>
      </div>`;
    if (message.image == null){
      html = $(html).append(``)
    } else {
      html = $(html).append(`<img class="message__image" src="${message.image}" >`)
    }
    return html;
  }
  $('#ms-form').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      type: 'POST',
      url: href,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var ms = ".messages";
      var html = buildHTML(data);
      $(ms).append(html)
      $('.bottom__text').val('')
      $('.hidden').val('')
      $('.bottom__send').prop('disabled', false);
      $(ms).animate({scrollTop: $(ms)[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    });
  })
  setInterval(function() {
    if($('.message')[0]){
        var message_id = $('.message:last').data('message-id');
      } else {
        var message_id = 0
      }
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        type: 'GET',
        url: location.href,
        data: {
          message: { id: message_id }
        },
        dataType: 'json'
      })
      .done(function(data) {
        data.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      })
    } else
    clearInterval(interval);
  },5000);
});


