$(function common() {

  $(".toggle-mnu").click(function() {
      $(this).toggleClass("on");
      $(".heading_mnu").slideToggle();
      return false;
    });
    
  });