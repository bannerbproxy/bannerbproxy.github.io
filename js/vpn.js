var plan_period=7;var is_trial=false;var amount=0.00;var thread_promo=null;var page_lang=document.getElementsByTagName("html")[0].getAttribute("lang");function getParameterByName(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+ name+"=([^&#]*)"),results=regex.exec(location.search);return results===null?"":decodeURIComponent(results[1].replace(/\+/g," "));}
function createOrderForm(){$('#order-error').hide();$('.order-errors').hide();$('#order-in-progress').hide();disablePaymentButton(false);$('#amount').html(amount.toFixed(2));$('#discount').html(0);$('#promo-coupon').val('');$('.payment-systems').show();$('.order-countries').show();$('.order-form2').show();$('#checkout-page').hide();if($('.payment-tipe-list').length)
$('.payment-tipe-list').show();disablePromoCodeField(is_trial);if(is_trial){$('.no-in-trial').hide();$('.in-trial-only').show();}
else{$('.in-trial-only').hide();$('.no-in-trial').show();}
$('.order-period').hide();$('.order-days-'+ plan_period).show();}
function checkPromoCoupon(coupon){$.ajax({url:"/vpn/payment/check_coupon",data:{"coupon":coupon},cache:false}).success(function(percent){if(amount<=0)
return;$("#discount").hide();$("#discount").html(percent);$("#discount").show(600);$("#amount").hide();$('#amount').html((amount-(amount*percent/100)).toFixed(2));$("#amount").show(600);});}
function makeOrderRequest(){var promoCoupon=$('#promo-coupon').val();var email=$('.order-form input[name=email]').val();var paymentSystem=$('select[name=payment-system]').val();var hiddenCaptcha=$('.order-form input[name=hidden_captcha]').val();$('#order-error').hide();$('.order-errors').hide();if(is_trial)
paymentSystem='free';if(!validateEmail(email)){$('#order-error').show();$('#invalid-email').show();return;}
$('#order-in-progress').show();disablePaymentButton(true);var url_lang="/"+ page_lang;if(url_lang=="/en"){url_lang="";}
$.ajax({url:url_lang+"/vpn/payment/create/"+ paymentSystem,data:{"coupon":promoCoupon,"email":email,"plan":plan_period,"hidden_captcha":hiddenCaptcha},cache:false}).success(function(result){if(result["error"]==1){$('#serverside-error').html(result["error_msg"]);$('#order-error').show();$('#serverside-error').show();}
else{$('.order-form2').hide();$('#checkout-page').html(result["data"]);$('#checkout-page').show();if($('.payment-tipe-list').length)
$('.payment-tipe-list').hide();}}).fail(function(){$('#order-error').show();$('#internal-error').show();}).complete(function(){$('#order-in-progress').hide();disablePaymentButton(false);});}
function disablePaymentButton(is_disabled){$('input[name=pay]').prop("disabled",is_disabled);}
function disablePromoCodeField(is_disabled){$('#promo-coupon').prop("disabled",is_disabled);}
function validateEmail(email){var re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(email);}
$(document).ready(function(){var part=getParameterByName('part');if(part){$(".tab-control li").removeClass("active");$(".tab").removeClass('active');$("#"+part).addClass('active');$("#block-"+part).addClass('active');$("#tab-"+part).addClass('active');if(part!="buy"){$(".vpn-promo-block").hide();$(".promo-tabset .tab-holder").css("width","962px");if(getParameterByName('questions')){var questions=getParameterByName('questions');switch(questions){case'tech':questions=0;break;case'pay':questions=1;break;case'app':questions=2;break;}
$("#tabs2").tabs({active:questions});}
if(getParameterByName('current')){var destination=$("#"+getParameterByName('current')).offset().top;$('body, html').animate({scrollTop:destination},500);}}}
$(".question-list li").click(function(){$('body, html').animate({scrollTop:$(this).offset().top},500);var questCat=getParameterByName('questions');var stateParameters={foo:"bar"};history.pushState(stateParameters,"New page title",window.location.pathname+"?part=faq&questions="+questCat+"&current="+$(this).attr('id'));});$(".tab-control li").click(function(){var id=$(this).attr('id');var stateParameters={foo:"bar"};history.pushState(stateParameters,"New page title",window.location.pathname+"?part="+id);});$(".question-control li a").click(function(){var questId=$(this).attr('href');questId=questId.slice(-1)- 1;switch(questId){case 0:questId="tech";break;case 1:questId="pay";break;case 2:questId="app";break;}
var stateParameters={foo:"bar"};history.pushState(stateParameters,"New page title",window.location.pathname+"?part=faq&questions="+questId);});$(".btn-download").click(function(){$(".btn-download").removeClass('active');$(this).addClass('active');if($(this).hasClass('btn-download-file')){var url=$(this).data("download");location.href=url;}});$('.accessRecover').click(function(){$('.recoverBlock').show();});$('.download-list li').hover(function(){$('.tune-description-block').fadeIn(500);var id=$(this).attr("id");$("#tabs3").tabs("option","active",id);});$('.download-list li').click(function(){$('.download-list li').removeClass('active');$(this).addClass('active');var id=$(this).attr("id");++id;$('.tune-description-block').addClass("active");$('.tune-description-block div').removeClass('active');$('.tune-description-block div[id="tabs-'+id+'"]').addClass("active");});$('#promo-coupon').keyup(function(){clearTimeout(thread_promo);var $this=$(this);thread_promo=setTimeout(function(){checkPromoCoupon($this.val())},700);});});