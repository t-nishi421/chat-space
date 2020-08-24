$(function(){
  function buildHTML(message) {
    let html = ""
    if (message.image) {
      html = 
        `<div class="message-items" data-message-id=${message.id}>
          <div class="message-items__top">
            <div class="message-items__top__name">
              ${message.user_name}
            </div>
            <div class="message-items__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-items__message">
            <p>
              ${message.content}
            </p>
            <img class="Message-items__message__image" src="${message.image}">
          </div>
        </div>`
    } else {
      html = 
        `<div class="message-items" data-message-id=${message.id}>
          <div class="message-items__top">
            <div class="message-items__top__name">
              ${message.user_name}
            </div>
            <div class="message-items__top__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-items__message">
            <p>
              ${message.content}
            </p>
          </div>
        </div>`
    }

    return html;
  }

  $("#new-content").on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);

      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form-items__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form-items__submit').prop('disabled', false);
    });
  });
});
