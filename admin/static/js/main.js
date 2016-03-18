  //阻止浏览器的默认行为
  function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault) e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
    window.event.returnValue = false;
    return false;
  }


$(function(){

  //绑定点赞按钮事件
  $("[data-action='good_for']").on("click",function(e){
    stopDefault(e);
    var thisBtn = $(this);
    if(!thisBtn.hasClass('am-disabled')){
      $.getJSON(thisBtn.attr('href'), function(data) {
        if(data=="ok"){
          thisBtn.addClass("am-disabled");
        }
      });
    }
  });
  
  //生成二维码
  (function(){
      var $qr = $('#doc-qrcode');
      if($qr.length >0){
      var $text= $("#qrcode_text").val();
      makeCode($text);
    function makeCode(text) {
      $qr.empty().qrcode({text: text});
      $qr.html(convertCanvasToImage($qr.find('canvas')[0])).show();
    }
    function convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    }
    }
  })();

  //绑定打卡详情页，删除打卡评论
  $("[data-action='delete_remark']").on("click",function(){
    if(confirm("您确定要删除这条评论吗？")){
      window.location.href = $(this).attr("data-href");
    }
  });






})