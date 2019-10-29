import Swal from "sweetalert2";

export default {
     notRegAlert,
     toggleLsnSub,
     successMsg
}

async function notRegAlert(msg){
    const result = await Swal.fire({
          title: `You must login to ${msg}.` ,
          text: "Lets login?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          background: "rgba(191,211,196)",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          backdrop: `rgba(191,211,196,0.4)`
        })
        if (result.value) return true;
}

async function toggleLsnSub(msg){
     const result =await Swal.fire({
          title: `${msg}`,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          background: "rgba(191,211,196)",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
          backdrop: `rgba(191,211,196,0.4)`
        })
        if (result.value) {
          return true;}
}

async function successMsg(msg){
     Swal.fire({
          type: "success",
          showConfirmButton: false,
          timer: 2000,
          title: ` ${msg} `,
          background: "rgba(191,211,196)",
          backdrop: `rgba(191,211,196,0.4)`
        });   
}