
$(window).on('load', function(){
  if($(window).width() <= 768){
      $(document).on("click", ".toggleMenuContainer", function() {
      /*$('.menu_names').toggleClass('textNone');*/
        $('.leftMenuParent').toggleClass('responsive_hide');
        $('.rightParentDiv').toggleClass('width100');
        
    });
    }
    /* $(document).on("click", ".leftmenuimg", function() {
         $(this).find(".submenu").toggle();
        $(this).siblings().find(".submenu").hide();
    });*/
    
   
     $(document).on("click", ".gotoReset", function() {
     
    $("#loginclass").addClass('dsplyNone');
    $("#resetclass").removeClass('dsplyNone');
    $("#loginclass").removeClass('dsplyShow');
    $("#resetclass").addClass('dsplyShow');
  });
   $(document).on("click", ".gotoLogin", function() {  
  
    $("#loginclass").removeClass('dsplyNone');
    $("#resetclass").addClass('dsplyNone');
    $("#loginclass").addClass('dsplyShow');
    $("#resetclass").removeClass('dsplyShow');
  });
  $(document).on("click", ".click_editable", function() {  
    
        $("#inputanble .inputClass").prop("disabled", false);
        $('.update_show').removeClass('dsplyNone');

    });
  $(document).on("click", ".decline_hide", function() {  
    
        $("#inputanble .inputClass").prop("disabled", true);
        $('.update_show').addClass('dsplyNone');
    })
    

    
    $(document).on("click", ".linkedText", function() {  
   
    	$('.innerdivContainer').removeClass('dsplyNone');
    });

    $(document).on("click", ".toggleMenuContainer", function() {
    	$('.menuText').toggleClass('textNone');
        $('.leftMenuParent').toggleClass('width62');
        $('.rightParentDiv').toggleClass('width100');
        $('.leftImg_logo').toggleClass('width60');
        $('.headerRight').toggleClass('width100');
        
    });

    $(document).on("click", ".show-menu", function() {
        $('.leftMenuParent').removeClass('width62');
        $('.rightParentDiv').removeClass('width100');
        $('.leftImg_logo').removeClass('width60');
        $('.headerRight').removeClass('width100');
    });
    
    $(document).on("click", ".click_showMenu", function() {
    	$('.menuText').removeClass('textNone');
        $('.leftMenuParent').removeClass('width62');
        $('.rightParentDiv').removeClass('width100');
        $('.rightParentDiv').addClass('col-lg-10');
        $('#dash_board_menu').addClass('width238');
        $('.leftImg_logo').removeClass('width60');
        $('.headerRight').removeClass('width100');
        $('.headerRight').addClass('col-lg-10');
    });
 
     $(document).on("click", ".configmenu1 li", function() {
    
   $(".configmenu1 li.active").removeClass("active");
   $(this).addClass("active");
    });
 
     $(document).on("click", ".leftMenus", function() {
    	 $(".border_transperent").slideToggle(1000);
     });
    

     $(document).on("click", ".main_menus", function() {
    	 var _this = $(this);
    	 if(_this.hasClass('active_menu')){
    		 $('.sub_menu').slideDown(1000);
    	 }
     });
     $(document).on("click", ".sub_menu", function() {
    	 var _this = $(this);
    	
    		 $('.subSub_menu').slideDown(1000);
    	 
     });
     
     
      $(document).on("click", ".category_section", function() {
    
        $('.slide_down').slideToggle();
        $('.right_arrow').toggleClass('rotate90')
    });
    /*$(document).on("click", ".table_icon", function() {
          if ($('tr.panel-collapse.collapse').hasClass("in")) {
              $('tr.panel-collapse.collapse').removeClass('in');
          }
          else {
              $('#collpased tr.panel-collapse.collapse').addClass('in');
          }
         
      });*/
      $(document).on("click", "*_click", function() {
    	   var target = $(this).attr('rel');
    	   $("#"+target).show().siblings(".admin").hide();

    	});
      
      $(document).ready(function(){
    	    $('[data-toggle="tooltip"]').tooltip();   
    	});
});


