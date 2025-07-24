"use client";

import { AddCategory } from "@/components/AddCategory";
import { CategoryCard } from "@/components/Categorycard";
import { Title } from "@/components/Title";
import { useUser } from "@/context/UserContext";

export default function Category() {
  const { categories } = useUser();

  return (
    <section>
      <div className="flex justify-between items-center">
        <Title title={"All category"} />
        <AddCategory />
      </div>
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
      >
        {categories?.map((item, index) => (
          <CategoryCard item={item} key={`${item.name}-${index}`} />
        ))}
      </div>
    </section>
  );
}
