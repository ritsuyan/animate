/*
    MVC设计：

       模型：
            用户模型：暂不修改
            条目模型：需要修改
            		  //TODO


       控制器：
        	把原首页的控制器全部移植到新首页，这样我们就能解决
        	首页两种状态了。

       		用户主页：
       		        //TODO      	
       视图：
       首页，有未登录状态与登录状态
       注册表单，
       登录表单，
       用户主页，(用户登录即跳转之)
       编辑主页，
       用户管理：
       			个人信息
       			修改密码
       条目管理：
        					


       首页视图两种状态都采用视图A，
       问题：是否拆分视图A？ 
       答：  不拆分 首页试图 但是必须引用公共静态资源记为模板A

       模板A ：包括一切静态资源 head.hbs




TODO LIST :
       @0 : 
       		不采用部分EXPRESS 全部页面采用视图
       @1 :
            把原首页的前端全部替换为新首页
            //TODO
            //complete
          
            测试：
            	成功后首页是否正常显示两种状态
            	//complete
       @2 ：
       		把用户页的必要字段改成相关字段
       		//TODO
       		//complete

       @3 :

            把条目模型即原来的博客模型进行修改
            //TODO
            //complete
           
            基于博客编辑视图即在原视图上进行修改
            为新的条目编辑视图必须和条目模型相对应
            //TODO
            //complete
             
            创建新条目后会到名为 /admin/post 的视图下
            也就是说admin下的用户profile 与 密码修改 和 管理条目  都不需要修改 
       		



  /----------------- ***   以上为第一阶段任务          ***-------------------------- \         

第一阶段完成，获得数据库可视化成就



	

/------------------ ***   第二阶段任务                         *** -------------------------------\

      



  	@1: 
  		用户创建条目之后跳转到主页后可以看到他所创建的条目，因为我们之前已经
  		动态生成了占满首页的六个条目了，所以按照时间排序最新创建的应该在第二页显示
  		//TODO
      //complete

  		用户可以选择Tag查找自己想要的条目
  		//TODO
      应该使用ajax或者直接从条目里根据隐藏的tag字段排序
      选择后者
      //complete

  		用户可以使用search功能查找条目
  		//TODO
      //complete
      search 功能是采用跳转到新页面显示查询结果或者是直接在页面中显示呢？
      用户可查询字段
                    title
      我们仅实现title功能查找并且直接显示于主页
      其主要实现逻辑与tag查询一样




      以上tag与search实现的都不完整,anyway   


/----------------- ***  第三阶段任务  ** --------------------------------\



     @1:
        将首页注册登录两个框去掉
        //TODO
        //complete

     
     @2:
        将底部阴影去掉
        //TODO
        //complete

     @3：
        tag选中后active类实现
        //TODO
        //complete

     @4：
        首页还要更酷的部分
        //TODO

     @5：
        管理类字段去掉关于博客的各种信息
        //TODO
        //complete
        

     @6：
        编辑条目时必须再重复登陆一次
        //TODO
        //complete

    /---------------------- 第四阶段任务  -------------------------/



     @7：
        条目详细页              // 从豆瓣抓取信息并且可以直接进入豆瓣主页

       

     @8：
        条目详细页评论收藏实现喜欢实现

     
                         

/*
*   设计用户注册登陆模型，必须设置第三方比如微博登陆
*   构建新建动画模型，用户添加新动画后必须通过tag访问
*   进入详情页后，可以发表评论，收藏，喜欢等功能。
*   考虑中:评论社交功能，关注其他用户，私信。
*/


        


    





*/


// sum(a,b) arguments 

// 伪数组

// str = "aaaabbbsfsff";  the letter count

// sessionStorage

//垂直水平居中

//HTTP事务过程

//
