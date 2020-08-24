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

  let reloadMessages = function(){
    let last_message_id = $('.message-items:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages,7000);
});