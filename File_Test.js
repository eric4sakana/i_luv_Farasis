/**
 * gitlab webhook handler
 * @author LeoEatle   thank you LeoEatle    2021/6/6
 */
 const querystring = require('querystring');
 const ChatRobot = require('./chat');
 
 const HEADER_KEY = "x-gitlab-event";
 
 const HEADER_KEY_V2 = "X-Gitlab-Event";
 
 const EVENTS = {
     "Push Hook": "push",
     "Tag Push Hook": "tag_push",
     "Issue Hook": "issue",
     "Merge Request Hook": "merge_request",

 };
 
 const actionWords = {
     "open": "发起",
     "close": "关闭",
     "reopen": "重新发起",
     "update": "更新",
     "merge": "合并"
 };
 
 /**
  * 处理test事件
  * @param {*} ctx koa context
  * @param {*} robotid 机器人id
  */
 async function handleTest(body, robotid) {
     const msg = "收到一次webhook test";
     const robot = new ChatRobot(
         robotid || config.chatid
     );
     await robot.sendTextMsg(msg);
     ctx.status = 200;
     return;
 }
 
 /**
  * 处理push事件
  * @param ctx koa context
  * @param robotid 机器人id
  */
 async function handlePush(body, robotid) {
     const robot = new ChatRobot(
         robotid || config.chatid
     );
 
 /*********更新部分功能， 修改输出文本格式*********/
     let msg;
     let i;
     let j;
     let File_length1;
     let File_lenth2;
     let File_Array = [];
     let File_Array2 = [];
     let File_Name;
     let total_commits;
     let name_of_user;
     let lastCommit;
     let name_of_branch;
     let RTE_index = new RegExp('架构变更*'); 
     
     let ASW_Index = new RegExp('asw*');
     let SWC_Index = new RegExp('SWCD*');
     
     const {total_commits_count, user_name, repository, commits, ref, modified, added} = body;
 
     total_commits = `${total_commits_count}`;   // 根据commit数量输出    by Yifan   2021/6/12 20:12
     name_of_user = `${user_name}`;  // TODO: 使用 !== 判断上传者用户名   现在只能使用 === 条件
     //File_Array = 
     
     //File_Array2 = File_Array2.silce();  //增加modified文件的读取  用于通知   by Yifan  2021/7/6  13:47
     //File_length1 = File_Array2.length;
    
 
 
     if(total_commits == 0){
         return;
     }
      
     j = 0;
 
     //增加用户名判断、增加多条commit记录同时输出         2021/6/12   yifan
    
            lastCommit = commits[0];
            //File_Array2 = `${lastCommit.modified}`;
            for(File_length1 in lastCommit.modified){
                File_Array2[File_length1] = lastCommit.modified[File_length1];
                File_Array2[File_length1] = File_Array2[File_length1].replace("_SWCD.arxml", "\n\r");
               // await robot.sendTextMsg(File_Array2[File_length1]);  
            }

            await robot.sendTextMsg(File_Array2);  

            //File_Array2
            //File_length1 = File_Array2.length;
            // await robot.sendTextMsg(File_length1);  
        //      while(File_length1--){
        //         //if(ASW_Index.test(modified[File_length1]) && SWC_Index.test(modified[File_length1])){
        //         if(SWC_Index.test(modified[File_length1])){
                      
        //               File_Name = modified[File_length1].replace("fnbms_bsw_ES11_B/asw/", "");
        //               File_Name = File_Name.replace("_SWCD.arxml", "");       //删除文件头尾无效信息
        //               File_Array.push(File_Name); //存入File_Name 数组
  
                      
        //               File_lenth2++;        //记录新数组的长度
        //         }
        //       }
        //  if(j == 1){
             
        //          noti_msg = ` File_length1`;
        //    await robot.sendTextMsg(File_Array);  
             
           
        //  }
         
         j = 0;
     
     
 
     
 /***************END OF MODIFICATION***************/
 
         return;
     
 }
 
 
 /**
  * 处理merge request事件
  * @param ctx koa context
  */
 async function handleMR(body, robotid) {
     const robot = new ChatRobot(
         robotid || config.chatid
     );
     const {user, object_attributes} = body;
     const attr = object_attributes;
     const mdMsg = `${user.name} at [${attr.source.name}](${attr.source.web_url}) ${actionWords[attr.action]} merge request
                     标题：${attr.title}
                     source branch ${attr.source_branch}
                     target branch：${attr.target_branch}
                     [details](${attr.url})`;
     await robot.sendMdMsg(mdMsg);
     return;
 }
 
 

 
 async function handleDefault(event) {
     const msg = `Sorry，暂时还没有处理${event}事件`;
     console.log(msg)
     return;
 }
 
 exports.main_handler = async (event, context, callback) => {
     console.log('event', event);
     const gitEvent = event.headers[HEADER_KEY] || event.headers[HEADER_KEY_V2];
     if (!event) {
         return `Sorry，这可能不是一个gitlab的webhook请求`;
     }
     const robotid = event.queryString.id;
     const payload = JSON.parse(event.body); // 我的天啊腾讯云竟然在这里返回一个 string
     console.log('payload', payload);
     // 检查是否是test事件
     if (event.headers["x-event-test"] == "true") {
         // test事件中仅处理push，否则推送太多
         if (EVENTS[gitEvent] == "push") {
             return await handleTest(payload, robotid);
         } else {
             console.log("其他test请求我可不会管");
             return;
         }
     }
     switch (EVENTS[gitEvent]) {
         case "push":
             return await handlePush(payload, robotid);
         case "merge_request":
             return await handleMR(payload, robotid);
         default:
             return await handleDefault(gitEvent);
     }
 }