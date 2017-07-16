/**
 * Created by may on 2014/9/15.
 */
function Resume(){
    this.$navMenu = $(".sf-menu");
}
Resume.prototype = {
    /**
     * 点击导航效果
     */
    meauClick : function(){
        var $navMenu = this.$navMenu,
            _this = this;
        $navMenu.children().each(function(){
            var $desId = $(this).children().eq(0);
            $desId.click(function(){
                if(!$(this).hasClass("active")){
                    _this.changeActive($navMenu,$(this));
                    var href = $(this).attr("href"),
                        pos = $(href).offset().top;
                    $("html,body").animate({scrollTop: pos}, 1000);
                    return false;
                }
            });
        });
    },
    /**
     * 导航选中状态改变
     * @param $navMenu
     * @param $sMenu
     */
    changeActive : function($navMenu,$sMenu){
        $navMenu.find(".active").removeClass("active");
        $sMenu.addClass("active");
    },
    /**
     * 滚动条滚动时对应的效果
     */
    windowScroll : function(){
        var _this = this;
        $(window).scroll(function(){
            _this.navFixed();
            _this.scrollNavChecked();
            _this.progressDynamic();
            _this.showHidebackToTop();
        });
    },
    /**
     * 导航悬浮
     */
    navFixed : function(){
        var $navOuter = $(".nav-outer"),
            navTop = $navOuter.offset().top,
            $nav = $(".nav"),
            scrollTop = $(window).scrollTop();
        if(!$nav.hasClass("stuck") && scrollTop >= navTop) {
            $nav.addClass("stuck");
        }
        if(scrollTop < navTop && $nav.hasClass("stuck")){
            $nav.removeClass("stuck");
        }
    },
    /**
     * 上下滚动条移动时，导航的选中状态
     */
    scrollNavChecked : function(){
        var scrollTop = $(window).scrollTop(),
            $navMenu = this.$navMenu,
            $personalA = $("a[href=#personal-profile]"),
            personalTop = $("#personal-profile").offset().top,
            $workA = $("a[href=#work-experience]"),
            workTop = $("#work-experience").offset().top,
            $educationA = $("a[href=#education]"),
            educationTop = $("#education").offset().top,
            $skillsA = $("a[href=#skills]"),
            skillsTop = $("#skills").offset().top;

        //我的信息
        if(scrollTop >= personalTop && scrollTop < workTop && !$personalA.hasClass("active")){
            this.changeActive($navMenu,$personalA);
        }

        //工作经验
        if(scrollTop >= workTop && scrollTop < educationTop && !$workA.hasClass("active")){
            this.changeActive($navMenu,$workA);
        }

        //教育经历
        if(scrollTop >= educationTop && scrollTop < skillsTop && !$educationA.hasClass("active")){
            this.changeActive($navMenu,$educationA);
        }

        //我的技能
        if(scrollTop >= skillsTop && !$skillsA.hasClass("active")){
            this.changeActive($navMenu,$skillsA);
        }
    },
    /**
     * 我的技能，动态效果
     */
    progressDynamic : function(){
        $(".progress-bar").each(function(){
            if(!$(this).hasClass("already-animated") && $(this).isOnScreen()){
                var $this = $(this),
                    $progress = $this.find(".progress-bar-outer"),
                    proWidth = $progress.attr("data-width") + "%";
                $progress.animate({
                    width : proWidth
                },{
                    duration: 5000,
                    complete: function() {
                        $this.addClass("already-animated");
                    }
                });
            }
        });
    },
    /**
     * 显示/隐藏返回顶部图标
     */
    showHidebackToTop : function(){
        var $backToTop = $("#back-to-top");
        if ($(window).scrollTop() > $(window).height() / 2 ) {
            $backToTop.removeClass('gone');
            $backToTop.addClass('visible');
        } else {
            $backToTop.removeClass('visible');
            $backToTop.addClass('gone');
        }
    },
    /**
     * 收起图片
     */
    packPic : function(){
        $(".header-flex").click(function(){
            $("html,body").animate({scrollTop: $(".nav-outer").offset().top}, 800);
        });
    },
    /**
     * 绑定返回顶部的click事件
     */
    handleBackToTop : function(){
        $('#back-to-top').click(function(){
            $('html, body').animate({scrollTop:0}, 'slow');
            return false;
        });
    },
    init : function(){
        this.meauClick();
        this.windowScroll();
        this.packPic();
        this.progressDynamic();
        this.handleBackToTop();
        this.showHidebackToTop();
    }
};