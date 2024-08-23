"use client";
import Button from "@/components/Button";
import CartCard from "@/components/CartCard";
import { useProductStore } from "@/zustand/Store";

export default function CartPage({ cartData }) {
  const { _id, name, brewery, alcohol, price, quantity, setQuantity, image } = useProductStore(
    (state) => ({
      _id: state._id,
      name: state.name,
      brewery: state.brewery,
      alcohol: state.alcohol,
      price: state.price,
      quantity: state.quantity,
      setQuantity: state.setQuantity,
      image: state.image,
    }),
  );
  console.log(cartData);

  return (
    <div className="flex flex-col  mx-[25px] mt-9">
      <div className="mb-5 subTitleMedium">담은술</div>
      <div className="flex flex-col">
        <div className="h-[500px] overflow-y-auto hide-scrollbar">
          {cartData ? (
            cartData.map((item, index) => (
              <CartCard
                key={index}
                name={item.product.name}
                brewery={item.product.extra.brewery}
                price={item.product.price}
                alcohol={item.product.extra.taste.alcohol}
                quantity={item.quantity}
                image={item.product.image.path}
                // setQuantity={setQuantity}
              />
            ))
          ) : (
            <div>장바구니가 비어 있습니다.</div> // 데이터가 비었을 때의 처리
          )}
        </div>
        <div className="mt-12">
          <div className="flex content justify-between mb-[28px]">
            <span>총 상품 금액</span>
            <span>50,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>배송비</span>
            <span>3,000원</span>
          </div>
          <div className="flex content justify-between mb-[28px]">
            <span>총 결제 금액</span>
            <span className="text-primary contentMedium">53,000원</span>
          </div>
          <Button color={"fill"} className="w-[378px] h-[62px] subTitle">
            총 53,000원 결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
