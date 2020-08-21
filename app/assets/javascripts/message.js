$(function(){
  function buildHTML(message) {
    let html = ""
    if (message.image) {
      html = 
        `<div class="message-items">
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
        `<div class="message-items">
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
      $('.MessageField').append(html);
      $('form')[0].reset();
    })
  });
});