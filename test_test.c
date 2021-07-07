/*****本部分仅用于测试平台使用******/

#include <stdio.h>


/*****本部分仅用于测试平台使用******/

typedef unsigned int  UINT16;
//typedef unsigned short   UINT16;
typedef unsigned long    UINT32;
typedef unsigned char   UINT8;
typedef float  FP32;

typedef union {
    struct{

        UINT16 Maxi_Cell_Vol;
        UINT16 Mini_Cell_Vol;
        UINT16 Maxi_Cell_Temp;
        UINT16 Mini_Cell_Temp;
        UINT16 Pack_End_Vol;
        UINT16 Real_Cur;
        UINT8 Chg_Status;
        UINT16 Currt_Soc;
        UINT16 Currt_MaxSoc;
        int Module_Current;

    }member;


}SYS_INFO;sdassss12313

123
123451123