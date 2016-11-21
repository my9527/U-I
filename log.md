
##2016-11-20
   构建
   重写构建, 主要实现server, dev, build 三个模块任务分离
   构建采用 模块化 分离， modules,libs,res,common 分别定制不同的任务
   同时，modules 内部也采用 模块化( 待后期增加 img 处理，以便实现模块的快速移植以及删除);

   打包apk;
   打包所有的模块;
   Todo....
   按所需打包模块, 减小apk 体积;

##2016-11-21
    增加构建测试;
    测试命令格式： gulp test --task [task]
    [task]: 待执行的任务
