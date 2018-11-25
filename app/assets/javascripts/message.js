$(function () {
    function buildHTML(message){
    var html = `<div class="message">
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
});
