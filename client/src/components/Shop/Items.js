import styles from "./items.module.scss";
import { CartState } from "../../contexts/CartContext";
import { FilterState } from "../../contexts/FilterContext";
import ShopCard from "./ShopCard";
import { useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import useState from "react-usestateref";
import "./page.css";
import CardSkeleton from "../loading/CardSkeleton";
const Items = ({ searchTerm, gender, category, sortBy }) => {
  const { state, dispatch } = CartState();
  const { filterState } = FilterState();
  const [, setPagination, pagination] = useState({});
  const [, setPage, page] = useState(0);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    setLoading(true);
    let params = new URLSearchParams();
    if (searchTerm) {
      params.append("searchString", searchTerm);
    }
    if (filterState.filterByBrand.length > 0) {
      params.append("brands", filterState.filterByBrand.toString());
    }
    if (gender) {
      params.append("Gender", gender);
    }
    if (category && category !== "Clothes") {
      params.append("categories", category);
    }

    if (filterState.filterByCollection.length > 0) {
      params.append("categories", filterState.filterByCollection.toString());
    }

    if (filterState.filterByOccasion.length > 0) {
      params.append("occasions", filterState.filterByOccasion.toString());
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }
    if (filterState.lowerBound !== 0) {
      params.append("PriceLowerBound", filterState.lowerBound);
    }
    if (filterState.upperBound !== 1000) {
      params.append("PriceUpperBound", filterState.upperBound);
    }
    if (page.current !== 0) {
      params.append("PageNumber", page.current + 1);
    }

    await axios
      .get("http://localhost:5164/Store", {
        params: params,
      })
      .then(({ headers, data }) => {
        setPagination(JSON.parse(headers.pagination));
        setPage(pagination.current.currentPage - 1);
        dispatch({
          type: "SET_PRODUCTS",
          payload: data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, [filterState, sortBy, page.current]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <div className={styles.items}>
        {!loading
          ? state.products.map((product, index) => {
              return <ShopCard product={product} key={index} />;
            })
          : [...Array(16)].map(() => {
              return <CardSkeleton />;
            })}
      </div>
      {!loading && (
        <div className="page-container">
          {pagination?.current?.totalPages > 0 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="»"
              onPageChange={handlePageClick}
              pageCount={pagination?.current?.totalPages}
              previousLabel="«"
              renderOnZeroPageCount={true}
              containerClassName={"pagination-container"}
              activeClassName={"active-page"}
              pageClassName={"page"}
              previousClassName={"page-prev"}
              nextClassName={"page-next"}
              forcePage={page.current}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Items;
