//const str = 'table football';

//const regex = new RegExp('foo*');
//const globalRegex = new RegExp('foo*', 'g');

//console.log(regex.test(str));
// expected output: true

//console.log(globalRegex.lastIndex);
// expected output: 0

//console.log(globalRegex.test(str));
// expected output: true

//console.log(globalRegex.lastIndex);
// expected output: 9

//console.log(globalRegex.test(str));
// expected output: false

let ASW_Index = new RegExp('asw*');
let SWC_Index = new RegExp('SWCD*');
let File_Name;
let File_array = []; 
let modified = ["fnbms_bsw_ES11_B/BMS_FlatMap.arxml","fnbms_bsw_ES11_B/asw/CANRx_SWCD.arxml","fnbms_bsw_ES11_B/asw/CANTx_DEBUG_SWCD.arxml",
          "fnbms_bsw_ES11_B/asw/CANTx_SWCD.arxml","fnbms_bsw_ES11_B/asw/DiagMonitor.arxml","fnbms_bsw_ES11_B/asw/NM_SWCD.arxml","fnbms_bsw_ES11_B/asw/TRA_SWCD.arxml",
          "fnbms_bsw_ES11_B/asw/TopComposition.arxml"];

let i = modified.length;
let l = 0;
let length_m = modified.length;

          while(i--){
            if(ASW_Index.test(modified[i]) && SWC_Index.test(modified[i])){
              	
              	File_Name = modified[i].replace("fnbms_bsw_ES11_B/asw/", "");
              	File_Name = File_Name.replace("_SWCD.arxml", "");       //删除文件头尾无效信息
              	File_array.push(File_Name); //存入File_Name 数组
                console.log(File_Name);
              	
				l++;        //记录新数组的长度
            }
          }

for(i = 0; i < l; i++){
	console.log(File_array[i]);
}



        

        


        