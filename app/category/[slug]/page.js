import ProductCard from "@/components/product/ProductCard";
import TagList from "@/components/tag/TagList";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const category = await getCategory(slug);
  return {
    title: category?.name,
    description: `Best selling products on category ${category?.name}`,
  };
}

async function getCategory(slug) {
  try {

    const response = await fetch(`${process.env.API}/category/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      console.log("Fetch error:", response.status);
      return null;
    }
    const data = await response.json();

    console.log("category data ========> ", data);
    

    return data;
  } catch (err) {
    console.log(err);
  }
}

export default async function CategoryViewPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { category, products } = await getCategory(slug);

  return (
    <main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <div className="btn btn-raised border-20 col p-4 mb-3">
              {category?.name}
              <div className="mt-4">
                <TagList category={category} />
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <p className="text-center lead fw-bold">
              Products in category "{category?.name}"
            </p>
            <div className="row">
              {products?.map((product) => (
                <div key={product?._id} className="col-lg-4">
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
