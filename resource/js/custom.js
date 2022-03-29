require(['jquery'], function($) {
    $(document).ready(function() {

        //mobile nav close button
        $(".nav-close").off('click').on('click', function(e) { 
            $("html").removeClass("nav-open");
            setTimeout(function() {
                $("html").removeClass("nav-before-open");
            }, 300);
        });

        //pc/mo check
        var mode;
        function chkMode() {
            if ($(window).width()< 768 && mode != "mo") {
                mode = "mo";
            }
            if ($(window).width() > 767 && mode != "pc") { // 2022.03.21
                mode = "pc";
            }
        }chkMode();

        $(window).resize(function (e) {
            chkMode();
        });
        
        //scroll GNB
        if (mode == 'mo' && $('.page-top').length) {
            var scrolling = false;
            $(window).scroll(function() { 
                if (0 < $(window).scrollTop() && !scrolling) {
                    $('body').addClass('page-top-top');
                    scrolling = true;
                    }
                if (0 >= $(window).scrollTop() && scrolling) {
                    $('body').removeClass('page-top-top');
                    scrolling = false;
                }
            });

            if (0 < $(window).scrollTop() && !scrolling) {
                $('body').addClass('page-top-top');
                scrolling = true;
                }
            if (0 >= $(window).scrollTop() && scrolling) {
                $('body').removeClass('page-top-top');
                scrolling = false;
            }
        }
        
        //category 2depth tab 
        $('.category-tab-list li').click(function(e){
            e.preventDefault();
            var idx = $(this).index();
            $('.depth-item').removeClass('active');
            $('.category-3depth-list').removeClass('dropdown-open');
            $('.category-3depth-dropdown').removeClass('arrow-up');
            var $idx = $(this).index();
            $('.category-tab-cont').removeClass('open');
            $('.category-tab-list li').removeClass('active');
            $(this).addClass('active');
            if($idx ==  0){
                return;
            }
            $('.category-tab-cont').eq($idx-1).addClass('open');
            $('.category-tab-cont').eq($idx-1).find('li').eq(0).addClass('active');
            $('.category-tab-cont').eq($idx-1).find('.sel-3depth').text('전체');
        });

        //3depth category select 
        $('.category-tab-cont').each(function(){
            var $item = $(this).find('.depth-item');
            var $sel_text = $(this).find('.sel-3depth');
            $item.find('a').click(function(e){
                e.preventDefault();
                var $this = $(this);
                var idx = $this.index();
                var $this_li = $this.parent('.depth-item');
                if($this_li.hasClass('active')){
                    return;
                }else{
                    $item.removeClass('active');
                    $this_li.addClass('active');
                    $item_name = $this.text();
                    $sel_text.text($item_name);
                    $('.category-3depth-list').removeClass('dropdown-open');
                    $('.category-3depth-dropdown').removeClass('arrow-up');
                }
            });
        });

        $('html').click(function(e){
            if($(e.target).parents('.page-top').length < 1){ 
                $('.category-3depth-list').removeClass('dropdown-open');
                $('.category-3depth-dropdown').removeClass('arrow-up');
            }
        });

        //3depth category dropdown
        if (mode == 'mo' && $('.page-top').length){
            $('.category-3depth-dropdown').click(function(e){
                e.preventDefault();
                $this = $(this);
                $drop_list = $(this).siblings('.category-3depth-list')
                if($drop_list.hasClass('dropdown-open')){
                    $drop_list.removeClass('dropdown-open');
                    $this.removeClass('arrow-up');
                }else{
                    $drop_list.addClass('dropdown-open');
                    $this.addClass('arrow-up');
                }
                
            });
        }

        //breadcrumbs
        var $drop_btn = $('.breadcrumbs-btn');
        $drop_btn.stop().click(function(){
            var $bread_menu = $(this).parent('.breadcrumbs-drop');
            $('.breadcrumbs-drop').not($bread_menu).removeClass('drop-open');
            if($bread_menu.hasClass('drop-open')){
                $bread_menu.removeClass('drop-open');
            }else{
                $bread_menu.addClass('drop-open');
            }
        });

        var $bread_item = $('.breadcrumbs-menu a');
        $bread_item.click(function(e){
            e.preventDefault();
            var $bread_item_li = $(this).parent('li');
            var $bread_tit = $(this).parents('.breadcrumbs-drop').children('.breadcrumbs_tit').find('strong');
            var $bread_item_txt = $(this).text();
            $(this).parents('.breadcrumbs-menu').find('li').removeClass('active');
            $bread_item_li.addClass('active');
            $bread_tit.text($bread_item_txt);
            $('.breadcrumbs-drop').removeClass('drop-open');

            if($(this).parents('.breadcrumbs-drop').next('.breadcrumbs-drop').length){
                var $next_bread = $(this).parents('.breadcrumbs-drop').next('.breadcrumbs-drop');
                if($bread_item_li.hasClass('all')){
                    $next_bread.css('display','none');
                }else{
                    $next_bread.css('display','inline-block'); 
                    $next_bread.find('.breadcrumbs-menu').find('li').removeClass('active');
                    $next_bread.find('.breadcrumbs-menu').find('.all').addClass('active');
                    $next_bread.find('.breadcrumbs_tit').find('strong').text('전체');
                }
            }

        });

        $('html').click(function(e){
            if($(e.target).parents('.breadcrumbs-drop').length < 1){ 
                $('.breadcrumbs-drop').removeClass('drop-open');
            }
        });


        //product detail : product info detail top menu 
        if($('.product.info.detailed').length){
            var $product_cont = $('.product.info.detailed');
            var $product_cont_t = $product_cont.offset().top;
            var $cart_menu = $('.product-bottom-menu');
            var scrolling2 = false;
            function prodFix() {
                if( mode == "mo"){
                    var fixtop_h = 48; 
                }else {
                    var fixtop_h = 120; 
                }

                if ($product_cont_t < $(window).scrollTop()+fixtop_h && !scrolling2) {
                    $product_cont.addClass('fixed');
                    $cart_menu.addClass('open');
                    scrolling2 = true;
                    }
                if ($product_cont_t >= $(window).scrollTop()+fixtop_h && scrolling2) {
                    $product_cont.removeClass('fixed');
                    $cart_menu.removeClass('open');
                    scrolling2 = false;
                }
            }prodFix();
            
            $(window).scroll(function() { 
                prodFix();
            });
            
            $(window).resize(function(){
                $product_cont_t = $product_cont.offset().top;
                prodFix();
            });
        }
        
        //cart : order top menu 
        if($('.cart-summary').length && mode == "pc"){ 
            var $summary_cont = $('.cart-summary');
            var $summary_cont_btm = $summary_cont.offset().top + $summary_cont.outerHeight();
            var $order_menu = $('.main-order-button');
            var scrolling3 = false;
            function orderFix() {
                if ($summary_cont_btm < $(window).scrollTop()+120 && !scrolling3) {
                    $order_menu.addClass('open');
                    scrolling3 = true;
                    }
                if ($summary_cont_btm >= $(window).scrollTop()+120 && scrolling3) {
                    $order_menu.removeClass('open');
                    scrolling3 = false;
                }
            }orderFix();
            
            $(window).scroll(function() { 
                orderFix();
            });
            
            $(window).resize(function(){
                $summary_cont_btm = $summary_cont.offset().top + $summary_cont.outerHeight();
                orderFix();
            });
        }
        
        if($('.item.content').length){
            var $cont_top = $('.product.info.detailed .item.content').offset().top;
            if( mode == "mo"){
                var $top = 60; 
            }else {
                var $top = 240; 
            }
            $('.product.info.detailed .item.title').click(function(){
                $(window).scrollTop($cont_top - $top); 
            });
        }
        
        //Move the product label position
        var $prod = $('.product-item-info');
        if($prod.length){
            $prod.each(function(){
                $this = $(this);
                var $prod_label = $this.find('.product-labels');
                if($prod_label.length){
                    $this.find('.product-item-name').before($prod_label);
                }
                
            });
            
        }


        //mobile top button (fixed menu on the bottom)
        if (mode == 'mo') {
            if($('.product-bottom-menu').length || $('.main-order-button').length || $('.bottom-fixed-menu').length ){
                $('#totop').addClass('up');
            }
        }

        //mobile search popup 2022.03.11
        if (mode == 'mo') {
            $('.block-search .label').off().click(function(){
                $(this).siblings('.control').slideToggle(200, "linear");
                $(this).parent().siblings('.actions').slideToggle(400, "linear");
                $(this).parents('.page-header').toggleClass('search-open');
            }); 

            $('html').click(function(e){
                if($(e.target).parents('.block-search').length < 1){ 
                    $('.page-header').removeClass('search-open');
                    $('.block-search .control').slideUp(200, "linear");
                    $('.block-search .actions').hide();
                }
            });
        }
              
       


        
    });
});














