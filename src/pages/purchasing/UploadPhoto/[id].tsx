// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import {
// //   GetFacilityPhotosRequest,
// //   AddFacilityPhotosRequest,
// //   DelFacilityPhotosRequest,
// // } from "../../../redux/action/hotel/facilityPhotosAction";
// import { useFormik, FormikProvider, Field } from "formik";
// import DisplayImage from "./DisplayImage";
// import PhotoPrimary from "./PhotoPrimary";
// import { AddStockPhotoRequest, DelStockPhotoRequest, FindStockPhotoRequest, GetStockPhotoRequest } from "@/redux-saga/action/stockPhotoAction";
// import { useRouter } from "next/router";

// export default function AddPhoto(props: any) {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { id } = router.query;
//   const [showModal, setShowModal] = useState(false);
//   const [previewImg, setPreviewImg] = useState<any>();
//   const [refresh, setRefresh] = useState(false);
//   const [upload, setUpload] = useState(false);
//   // const { facilityPhotos } = useSelector((state: any) => state.facilityPhotosState);
//   const { stockPhoto } = useSelector((state: any) => state.StockPhotoState);

//   console.log(stockPhoto);

//   useEffect(() => {
//     if (router.isReady) {
//       dispatch(FindStockPhotoRequest(id));
//       setRefresh(false);
//     }
//   }, [router.isReady, dispatch, id, refresh]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       sphoPrimary: "0",
//       file: "",
//       stockId: id,
//       sphoUrl: "cc",
//       // sphoUrl: id,
//     },
//     onSubmit: async (values) => {
//       let payload = new FormData();
//       payload.append("sphoPrimary", values.sphoPrimary);
//       payload.append("sphoUrl", values.sphoUrl);
//       payload.append("stockId", String(values.stockId));
//       payload.append("file", values.file);

//       console.log(payload);

//       dispatch(AddStockPhotoRequest(payload));
//       window.alert("Data Successfully Insert");
//     },
//   });

//   const uploadConfig = (name: any) => (event: any) => {
//     let reader = new FileReader();
//     const file = event.target.files[0];
//     console.log(event.target.files);
//     reader.onload = () => {
//       formik.setFieldValue("file", file);
//       setPreviewImg(reader.result);
//     };
//     reader.readAsDataURL(file);
//     setUpload(true);
//   };

//   const onClear = (event: any) => {
//     event.preventDefault();
//     setPreviewImg(null);
//     setUpload(false);
//   };

//   const onDelete = async (id: any) => {
//     dispatch(DelStockPhotoRequest(id));
//     setRefresh(true);
//   };

//   const modal = () => {
//     // props.setRefresh(true);
//     setShowModal(false);
//   };

//   return (
//     <>
//       {/* <button className="p-3 hover:bg-coldBlue hover:text-white w-full" type="button" onClick={() => setShowModal(true)}>
//         Upload Photos
//       </button>
//       {showModal ? ( */}
//       <>
//         <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//           <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-96 overflow-y-scroll">
//             {/*content*/}
//             <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//               {/*header*/}
//               <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                 <h3 className="text-3xl font-semibold">Stock Photos{id}</h3>
//                 <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>
//                   <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
//                 </button>
//               </div>
//               {/*body*/}
//               <div className="relative p-6 flex-auto">
//                 <div className="flex justify-center items-center ">
//                   <div className="grid grid-cols-3 gap-10 my-5">
//                     {(stockPhoto || []).map((item: any) => (
//                       <div key={item.sphoId}>
//                         <DisplayImage imageSrc={`http://localhost:3002/stockPhoto/image/${item.sphoPhotoFilename}`} fallbackImage={"/static/images/defaultImage.png"} />
//                         <p>{item.sphoThumbnailFilename || "Photo"}</p>
//                         <div>
//                           <PhotoPrimary id={item.sphoId} primary={item.sphoPrimary} setRefresh={setRefresh} />
//                         </div>

//                         <button onClick={() => onDelete(item.sphoId)} className="text-red-600">
//                           X Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="bg-grey-500 ">
//                   <div className="my-5">
//                     <div className="w-96 mx-auto bg-white rounded shadow border-slate-900">
//                       <div className="py-4 px-8 text-black text-xl font-bold border-b border-grey-500 text-center">
//                         <h1>Upload Photos</h1>
//                       </div>
//                       <form onSubmit={formik.handleSubmit}>
//                         <div className="py-4 px-8">
//                           <div className="col-span-full mb-4">
//                             <div className="mt-2  rounded-lg border border-dashed border-gray-900/25 px-6 pt-10 pb-4">
//                               {upload === false ? (
//                                 <>
//                                   <span>Kosong</span>
//                                 </>
//                               ) : (
//                                 <div className="flex justify-center items-center">
//                                   <img src={previewImg} alt="img" className="max-w-xs" width={200} />
//                                 </div>
//                               )}
//                               <div className="text-center flex justify-center items-center">
//                                 <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                                   <label
//                                     htmlFor="file-upload"
//                                     className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//                                   >
//                                     <span>Upload a file</span>
//                                     <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadConfig("file")} />
//                                   </label>
//                                 </div>
//                               </div>
//                               <span onClick={onClear} className="text-red-500 text-center flex justify-center items-center pt-2 cursor-pointer">
//                                 Remove
//                               </span>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <button className="w-full mb-3 rounded-full py-1 px-24 bg-transparent text-slate-900 font-semibold border border-slate-900 hover:bg-slate-900 hover:text-white hover:border-transparent " type="submit">
//                               Save
//                             </button>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                   <button
//                     className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                     type="button"
//                     onClick={modal}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
//       </>
//       {/* ) : null} */}
//     </>
//   );
// }
