import ProductCard from "@/components/product/ProductCard";
import TagsList from "@/components/tag/TagList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const tag = await getTag(resolvedParams?.slug);

  return {
    title: tag?.name,
    description: `Best selling products with the tag of "${tag?.name}" in category "${tag?.parentCategory?.name}" `,
  };
}

async function getTag(slug) {
  try {
    const response = await fetch(`${process.env.API}/tag/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("tags page response ====> ", data);

    return data;
  } catch (err) {
    console.log("Error fetching search results", err);
  }
}

export default async function TagViewPage({ params }) {
  const resolvedParams = await params;
  const { tag, products } = await getTag(resolvedParams?.slug);

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <div className="btn btn-raised border-20 col p-4 mb-3">
              {tag?.name} /{" "}
              <Link
                href={`/category/${tag?.parentCategory?.slug}`}
                className="text-dark"
              >
                {tag?.parentCategory?.name}
              </Link>
            </div>
          </div>

          <div className="col-lg-9">
            <p className="text-center lead fw-bold">
              Products with tag "{tag?.name}" from category "
              {tag?.parentCategory?.name}"
            </p>
            <div className="row">
              {products?.map((product) => (
                <div className="col-lg-4" key={product?._id}>
                  <ProductCard key={product?._id} product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
