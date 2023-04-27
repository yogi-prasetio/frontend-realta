import { convertPrice } from "@/utils/helpers";
import { DatePicker, Space } from "antd";
import React, { useState } from "react";

export default function OrderSummary(props: any) {
  const [couponDiscount, setCouponDiscount] = useState({
    spofId: 0,
    spofName: "",
    spofDescription: "",
    spofType: "",
    spofDiscount: "",
    spofStartDate: "",
    spofEndDate: "",
    spofMinQty: 0,
    spofMaxQty: 0,
    spofModifiedDate: "",
  });
  const { labelBtn, coupon, faciLowPrice, faciName } = props;
  const { RangePicker } = DatePicker;

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const onClear = () => {
    setCouponDiscount({
      spofId: 0,
      spofName: "",
      spofDescription: "",
      spofType: "",
      spofDiscount: "",
      spofStartDate: "",
      spofEndDate: "",
      spofMinQty: 0,
      spofMaxQty: 0,
      spofModifiedDate: "",
    });
    setOpenModal(!openModal);
  };

  return (
    <div className="flex flex-col gap-5 rounded-xl w-[100%] h-96 bg-white shadow-xl p-4">
      <Space direction="vertical">
        <RangePicker style={{ width: "100%" }} />
      </Space>
      <div>
        <p className="card-title">{`Rp. ${convertPrice(faciLowPrice)}`}</p>
        <p className="text-sm font-thin">termasuk pajak</p>
        <p className="text-sm font-thin">{faciName}</p>
      </div>
      <div className="flex justify-between items-center border p-4">
        <span className="w-full cursor-pointer" onClick={handleOpenModal}>
          {couponDiscount.spofName ? couponDiscount.spofName : "Get Coupon"}
        </span>
        <input
          type="checkbox"
          checked={openModal}
          onChange={handleOpenModal}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box w-[20%]">
            <p className="font-bold text-xl mb-4">Coupon</p>
            <div className="flex flex-col gap-3">
              {coupon.map(
                (item: any, index: number) =>
                  index <= 5 && (
                    <label>
                      <input
                        className="mr-4"
                        type="radio"
                        name="coupon"
                        checked={couponDiscount.spofName == item.spofName}
                        value={JSON.stringify(item)}
                        onChange={(e) =>
                          setCouponDiscount(JSON.parse(e.target.value))
                        }
                        onClick={handleOpenModal}
                      />
                      {item.spofName}
                    </label>
                  )
              )}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={onClear}>
                Cancel
              </button>
              {/* <button className="btn" onClick={handleOpenModal}>
                Save
              </button> */}
            </div>
          </div>
        </div>
        <span className="text-sm">
          {couponDiscount.spofDiscount
            ? `Rp.${convertPrice(couponDiscount.spofDiscount)}`
            : "Rp.0"}
        </span>
      </div>
      <div className="summary-order">
        <div className="flex justify-between items-center">
          <p className="card-title">Your savings</p>
          <p className="text-sm">
            {couponDiscount.spofDiscount
              ? `Rp. ${convertPrice(couponDiscount.spofDiscount)}`
              : "Rp. 0"}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="card-title">Total Price</p>
          <p className="text-sm">
            {couponDiscount.spofDiscount !== ""
              ? `Rp. ${
                  convertPrice(faciLowPrice) -
                  convertPrice(couponDiscount.spofDiscount)
                }`
              : `Rp. ${convertPrice(faciLowPrice)}`}
          </p>
        </div>
      </div>
      <div className="card-actions">
        <button className="btn w-full">{labelBtn}</button>
      </div>
    </div>
  );
}
