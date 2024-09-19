"use client";
import { ProductDetail } from "@/app/detail/[id]/page";
import Card from "@/components/Card";
import { ComboboxDemo } from "../SortDropdownMenu";
import { useEffect, useState } from "react";

async function fetchProductList(params?: string[][]): Promise<ProductDetail[]> {
  const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const searchParams = new URLSearchParams(params);
  const url = `${API_SERVER}/products?showSoldOut=true${"&" + searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      "client-id": `${CLIENT_ID}`,
    },
  });
  const resJson = await res.json();
  if (!resJson.ok) {
    throw new Error("error");
  }
  return resJson.item;
}
export default function Page() {
  const [wineProduct, setWineProduct] = useState<ProductDetail[]>([]);
  const [sortItem, setSortItem] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProductList([["custom", '{ "extra.category": "PC04" }']]);
      setWineProduct(products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let sortedProducts = [...wineProduct];

    if (sortItem === "upPrice") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price); // 높은 가격순
    } else if (sortItem === "downPrice") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price); // 낮은 가격순
    } else if (sortItem === "best") {
      sortedProducts = sortedProducts.sort((a, b) => a.quantity - b.quantity); // 판매량 순 (남은 수량 많은 순)
    } else if (sortItem === "new") {
      sortedProducts = sortedProducts.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(), // 최신순
      );
    }

    setWineProduct(sortedProducts);
  }, [sortItem]);
  return (
    <div className="flex flex-col">
      <div className="flex justify-end mr-6">
        <ComboboxDemo onSelectSort={setSortItem} />
      </div>
      <ul className="flex flex-wrap justify-start gap-4 px-[25px] pb-3">
        {wineProduct &&
          wineProduct.map((item) => {
            return (
              <li key={item._id} className="w-[calc(50%-8px)]">
                <Card data={item} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
